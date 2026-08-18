import { contactServices } from "@/lib/site-data";

export const runtime = "nodejs";

const MAX_FILES = 4;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const preferredSupportOptions = new Set(["On-site", "Remote", "Collection/drop-off", "Not sure"]);
const serviceOptions = new Set(contactServices);

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = rateLimit.get(key);
  if (!current || current.resetAt < now) {
    rateLimit.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_REQUESTS) {
    return false;
  }
  current.count += 1;
  return true;
}

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validateContactForm(formData: FormData) {
  const values = {
    name: getText(formData, "name"),
    email: getText(formData, "email"),
    phone: getText(formData, "phone"),
    suburb: getText(formData, "suburb"),
    service: getText(formData, "service"),
    message: getText(formData, "message"),
    device: getText(formData, "device"),
    preferredSupport: getText(formData, "preferredSupport"),
    companyWebsite: getText(formData, "companyWebsite"),
  };
  const errors: Record<string, string[]> = {};

  const addError = (field: string, message: string) => {
    errors[field] = [...(errors[field] ?? []), message];
  };

  if (values.companyWebsite) addError("companyWebsite", "Invalid submission.");
  if (values.name.length < 2 || values.name.length > 120) addError("name", "Enter a valid name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 180) addError("email", "Enter a valid email address.");
  if (values.phone.length > 40) addError("phone", "Phone number is too long.");
  if (values.suburb.length < 2 || values.suburb.length > 80) addError("suburb", "Enter a valid suburb.");
  if (!serviceOptions.has(values.service)) addError("service", "Choose a valid service.");
  if (values.message.length < 15 || values.message.length > 4000) addError("message", "Message must be between 15 and 4000 characters.");
  if (values.device.length > 180) addError("device", "Device details are too long.");
  if (!preferredSupportOptions.has(values.preferredSupport)) addError("preferredSupport", "Choose a valid support option.");

  return { success: Object.keys(errors).length === 0, errors };
}

async function forwardToInternalIntake(formData: FormData, request: Request) {
  const intakeUrl = process.env.INTERNAL_INTAKE_API_URL || process.env.SCT_INTERNAL_INTAKE_URL;
  const intakeSecret = process.env.PUBLIC_INTAKE_SECRET || process.env.SCT_PUBLIC_INTAKE_SECRET;

  if (!intakeUrl || !intakeSecret) {
    return {
      ok: false,
      status: 503,
      message: "Enquiries are not connected yet. Please call or email Sunset Country Tech directly.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch(intakeUrl, {
      method: "POST",
      body: formData,
      headers: {
        "x-sct-public-intake-secret": intakeSecret,
        "x-sct-public-source": "sunset-country-tech-public-web",
        "x-forwarded-for": getClientKey(request),
      },
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => null) as { message?: string } | null;

    if (!response.ok) {
      return {
        ok: false,
        status: response.status >= 400 && response.status < 500 ? 400 : 502,
        message: payload?.message ?? "The enquiry could not be sent. Please try again shortly.",
      };
    }

    return {
      ok: true,
      status: 200,
      message: payload?.message ?? "Enquiry received.",
    };
  } catch {
    return {
      ok: false,
      status: 502,
      message: "The enquiry could not be sent. Please try again shortly.",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (!checkRateLimit(clientKey)) {
    return Response.json({ ok: false, message: "Please wait a moment before sending another enquiry." }, { status: 429 });
  }

  const formData = await request.formData();
  const parsed = validateContactForm(formData);
  if (!parsed.success) {
    return Response.json({ ok: false, errors: parsed.errors }, { status: 400 });
  }

  const files = formData.getAll("photos").filter((file): file is File => file instanceof File && file.size > 0);
  if (files.length > MAX_FILES) {
    return Response.json({ ok: false, message: `Please upload no more than ${MAX_FILES} photos.` }, { status: 400 });
  }
  for (const file of files) {
    if (file.size > MAX_FILE_SIZE || !ALLOWED_FILE_TYPES.has(file.type)) {
      return Response.json({ ok: false, message: "Photos must be PNG, JPEG or WebP images under 5MB each." }, { status: 400 });
    }
  }

  const forwarded = await forwardToInternalIntake(formData, request);
  return Response.json({ ok: forwarded.ok, message: forwarded.message }, { status: forwarded.status });
}
