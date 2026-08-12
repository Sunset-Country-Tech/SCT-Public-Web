import { z } from "zod";
import { contactServices } from "@/lib/site-data";

export const runtime = "nodejs";

const MAX_FILES = 4;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(180),
  phone: z.string().trim().max(40).optional(),
  suburb: z.string().trim().min(2).max(80),
  service: z.enum(contactServices as [string, ...string[]]),
  message: z.string().trim().min(15).max(4000),
  device: z.string().trim().max(180).optional(),
  preferredSupport: z.enum(["On-site", "Remote", "Collection/drop-off", "Not sure"]),
  companyWebsite: z.string().max(0).optional(),
});

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

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (!checkRateLimit(clientKey)) {
    return Response.json({ ok: false, message: "Please wait a moment before sending another enquiry." }, { status: 429 });
  }

  const formData = await request.formData();
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return Response.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
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

  return Response.json({
    ok: true,
    message: "Enquiry received.",
  });
}
