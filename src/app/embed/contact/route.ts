export const runtime = "nodejs";

function getPublicOrigin(request: Request) {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const requestUrl = new URL(request.url);
  const forwardedHost = (request.headers.get("x-forwarded-host") || request.headers.get("host"))?.split(",")[0]?.trim();
  const forwardedProto = (request.headers.get("x-forwarded-proto") || requestUrl.protocol.replace(":", "")).split(",")[0]?.trim();

  if (forwardedHost && !forwardedHost.startsWith("0.0.0.0")) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  if (configuredSiteUrl) {
    return new URL(configuredSiteUrl).origin;
  }

  if (requestUrl.hostname === "0.0.0.0") {
    requestUrl.hostname = "localhost";
  }

  return requestUrl.origin;
}

export function GET(request: Request) {
  const origin = getPublicOrigin(request);
  const script = `(() => {
  const currentScript = document.currentScript;
  const iframe = document.createElement("iframe");
  iframe.src = currentScript?.dataset.src || "${origin}/contact-embed";
  iframe.title = "Sunset Country Tech contact form";
  iframe.loading = "lazy";
  iframe.style.width = "100%";
  iframe.style.minHeight = currentScript?.dataset.minHeight || "1120px";
  iframe.style.border = "0";
  iframe.style.display = "block";
  iframe.style.overflow = "hidden";
  iframe.setAttribute("scrolling", "no");

  const mount = currentScript?.dataset.mount ? document.querySelector(currentScript.dataset.mount) : null;
  (mount || currentScript?.parentNode || document.body).insertBefore(iframe, mount ? null : currentScript);

  window.addEventListener("message", (event) => {
    if (event.origin !== "${origin}") return;
    if (!event.data || event.data.type !== "sct-contact-embed-height") return;
    const nextHeight = Math.max(Number(event.data.height) || 0, 720);
    iframe.style.height = nextHeight + "px";
    iframe.style.minHeight = "0";
  });
})();`;

  return new Response(script, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
