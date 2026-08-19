import { contactServices } from "@/lib/site-data";

export const runtime = "nodejs";

const supportOptions = ["On-site", "Remote", "Collection/drop-off", "Not sure"];

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function optionList(values: string[], placeholder?: string) {
  const options = values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
  return placeholder ? `<option value="" disabled selected>${escapeHtml(placeholder)}</option>${options}` : options;
}

const html = String.raw;

export function GET() {
  return new Response(html`<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <title>Sunset Country Tech Contact Form</title>
  <style>
    :root {
      --midnight: #0d1220;
      --panel: #111a2a;
      --orange: #ff8a00;
      --gold: #ffa733;
      --coral: #ff5e7d;
      --purple: #7861ff;
      --ink: #101828;
      --muted: #667085;
      --line: #d0d5dd;
      --soft: #fff7ed;
    }

    * { box-sizing: border-box; }

    html {
      background: transparent;
      color-scheme: light;
      font-family: "Space Grotesk", "Exo 2", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    body {
      margin: 0;
      background:
        radial-gradient(circle at 12% 0%, rgba(255, 138, 0, 0.2), transparent 28rem),
        radial-gradient(circle at 95% 12%, rgba(120, 97, 255, 0.18), transparent 30rem),
        var(--midnight);
      color: white;
    }

    .shell {
      min-height: 100vh;
      padding: clamp(18px, 4vw, 38px);
    }

    .wrap {
      display: grid;
      gap: 26px;
      max-width: 1060px;
      margin: 0 auto;
    }

    .intro {
      display: grid;
      gap: 14px;
    }

    .eyebrow {
      margin: 0;
      color: var(--orange);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      max-width: 760px;
      font-size: clamp(34px, 7vw, 62px);
      line-height: 0.98;
      letter-spacing: 0;
    }

    .lead {
      margin: 0;
      max-width: 760px;
      color: #d0d5dd;
      font-size: clamp(16px, 2vw, 19px);
      line-height: 1.65;
    }

    form {
      display: grid;
      gap: 20px;
      padding: clamp(18px, 4vw, 30px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      background: #ffffff;
      color: var(--ink);
      box-shadow: 0 22px 70px rgba(0, 0, 0, 0.32);
    }

    .grid {
      display: grid;
      gap: 18px;
    }

    label,
    fieldset {
      display: grid;
      gap: 8px;
      min-width: 0;
      margin: 0;
      border: 0;
      padding: 0;
      color: #182230;
      font-size: 14px;
      font-weight: 800;
    }

    input,
    select,
    textarea {
      width: 100%;
      min-height: 48px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: white;
      color: var(--ink);
      font: inherit;
      font-size: 16px;
      font-weight: 500;
      outline: none;
      padding: 12px 14px;
      transition: border-color 160ms ease, box-shadow 160ms ease;
    }

    textarea {
      min-height: 150px;
      resize: vertical;
      line-height: 1.5;
    }

    input:focus,
    select:focus,
    textarea:focus {
      border-color: var(--orange);
      box-shadow: 0 0 0 4px rgba(255, 167, 51, 0.26);
    }

    input[type="file"] {
      padding: 11px;
      color: var(--muted);
    }

    .hp {
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }

    .support-grid {
      display: grid;
      gap: 10px;
    }

    .choice {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 48px;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 12px;
      font-size: 14px;
      font-weight: 700;
    }

    .choice input {
      width: 16px;
      min-height: 16px;
      accent-color: var(--orange);
    }

    .note {
      margin: 0;
      border-radius: 8px;
      background: var(--soft);
      color: #475467;
      padding: 14px 16px;
      font-size: 14px;
      line-height: 1.6;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 14px;
    }

    button {
      display: inline-flex;
      min-height: 50px;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border: 0;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--orange), var(--coral), var(--purple));
      color: white;
      cursor: pointer;
      font: inherit;
      font-size: 16px;
      font-weight: 900;
      padding: 13px 24px;
      transition: transform 160ms ease, filter 160ms ease, opacity 160ms ease;
    }

    button:hover { transform: translateY(-1px); filter: brightness(1.04); }
    button:disabled { cursor: not-allowed; opacity: 0.65; transform: none; }

    .status {
      min-height: 22px;
      margin: 0;
      font-size: 14px;
      font-weight: 800;
      line-height: 1.45;
    }

    .status.success { color: #047857; }
    .status.error { color: #b42318; }

    @media (min-width: 720px) {
      .wrap {
        grid-template-columns: 0.82fr 1.18fr;
        align-items: start;
      }

      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .wide {
        grid-column: 1 / -1;
      }

      .support-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
  </style>
</head>
<body>
  <main class="shell">
    <div class="wrap">
      <section class="intro" aria-label="Contact Sunset Country Tech">
        <p class="eyebrow">Contact</p>
        <h1>What can we help with?</h1>
        <p class="lead">Not sure which service you need? Describe what is happening and Sunset Country Tech will point you in the right direction.</p>
      </section>

      <form id="sct-contact-form" action="/api/contact" method="post" enctype="multipart/form-data">
        <input class="hp" type="text" name="companyWebsite" tabindex="-1" autocomplete="off" aria-hidden="true" />

        <div class="grid">
          <label>Name *
            <input required name="name" autocomplete="name" placeholder="Your name" minlength="2" maxlength="120" />
          </label>
          <label>Email *
            <input required name="email" type="email" autocomplete="email" placeholder="you@example.com" />
          </label>
          <label>Phone
            <input name="phone" type="tel" autocomplete="tel" placeholder="Add your phone number" maxlength="40" />
          </label>
          <label>Suburb *
            <input required name="suburb" autocomplete="address-level2" placeholder="Mildura, Irymple, Red Cliffs..." maxlength="120" />
          </label>
          <label class="wide">Service *
            <select required name="service">
              ${optionList(contactServices, "Select a service")}
            </select>
          </label>
          <label class="wide">Tell us what is happening *
            <textarea required name="message" minlength="15" maxlength="4000" placeholder="Describe what is happening, what device is involved, and anything you have already tried."></textarea>
          </label>
          <label class="wide">Device / Equipment
            <input name="device" placeholder="Computer model, printer, router, camera, phone..." maxlength="180" />
          </label>
          <label class="wide">Add photos
            <input name="photos" type="file" accept="image/png,image/jpeg,image/webp" multiple />
          </label>
          <fieldset class="wide">
            <legend>Preferred support</legend>
            <div class="support-grid">
              ${supportOptions.map((option) => `<label class="choice"><input type="radio" name="preferredSupport" value="${escapeHtml(option)}"${option === "Not sure" ? " checked" : ""} />${escapeHtml(option)}</label>`).join("")}
            </div>
          </fieldset>
        </div>

        <p class="note">No problem is too simple to ask about. If you are unsure what service you need, just describe what is happening.</p>

        <div class="actions">
          <button type="submit" id="submit-button">Send Enquiry</button>
          <p class="status" id="status" aria-live="polite"></p>
        </div>
      </form>
    </div>
  </main>

  <script>
    const form = document.getElementById("sct-contact-form");
    const button = document.getElementById("submit-button");
    const status = document.getElementById("status");

    function sendHeight() {
      window.parent.postMessage({ type: "sct-contact-embed-height", height: document.documentElement.scrollHeight }, "*");
    }

    function setStatus(kind, message) {
      status.className = "status " + kind;
      status.textContent = message;
      sendHeight();
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      button.disabled = true;
      button.textContent = "Sending...";
      setStatus("", "");

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        const payload = await response.json().catch(() => null);
        if (!response.ok) {
          const errors = payload && payload.errors ? Object.values(payload.errors).flat().join(" ") : "";
          throw new Error((payload && payload.message) || errors || "Form submission failed. Please check the fields and try again.");
        }
        form.reset();
        setStatus("success", (payload && payload.message) || "Thanks. Your enquiry has been received.");
      } catch (error) {
        setStatus("error", error instanceof Error ? error.message : "Something went wrong sending the form. Please try again.");
      } finally {
        button.disabled = false;
        button.textContent = "Send Enquiry";
      }
    });

    window.addEventListener("load", sendHeight);
    new ResizeObserver(sendHeight).observe(document.body);
  </script>
</body>
</html>`, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; font-src 'self' data:; form-action 'self'; base-uri 'none'; frame-ancestors 'self' https://sunsetcountry.tech https://www.sunsetcountry.tech;",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
