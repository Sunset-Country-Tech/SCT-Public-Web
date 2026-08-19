"use client";

import { useEffect } from "react";

const embedScriptSrc = process.env.NODE_ENV === "development" ? "/embed/contact" : "https://sunsetcountry.tech/embed/contact";
const embedFrameSrc = process.env.NODE_ENV === "development" ? "/contact-embed" : "https://sunsetcountry.tech/contact-embed";
const mountSelector = "#sct-contact-form";
const embedFrameTitle = "Sunset Country Tech contact form";

export function HostedContactEmbed() {
  useEffect(() => {
    const mount = document.querySelector(mountSelector);
    const wrapper = mount?.parentElement;

    if (!mount || !wrapper) {
      return;
    }

    mount.replaceChildren();
    wrapper.querySelectorAll("script[data-sct-contact-embed-script]").forEach((script) => script.remove());

    const keepSingleEmbedFrame = () => {
      const frames = Array.from(mount.querySelectorAll<HTMLIFrameElement>(`iframe[title="${embedFrameTitle}"]`));
      frames.slice(0, -1).forEach((frame) => frame.remove());
    };

    const observer = new MutationObserver(keepSingleEmbedFrame);
    observer.observe(mount, { childList: true });

    const script = document.createElement("script");
    script.src = embedScriptSrc;
    script.async = true;
    script.dataset.src = embedFrameSrc;
    script.dataset.mount = mountSelector;
    script.dataset.minHeight = "1120px";
    script.dataset.sctContactEmbedScript = "true";
    script.addEventListener("load", keepSingleEmbedFrame);

    wrapper.appendChild(script);

    return () => {
      observer.disconnect();
      script.removeEventListener("load", keepSingleEmbedFrame);
      script.remove();
      mount.replaceChildren();
    };
  }, []);

  return (
    <div className="min-h-[1120px] overflow-hidden rounded-[8px]">
      <div id="sct-contact-form"></div>
    </div>
  );
}
