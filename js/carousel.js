// Media carousel: CSS scroll-snap scroller plus buttons, dots, counter and keyboard.
import { el, prefersReducedMotion } from "./dom.js";
import { openLightbox } from "./lightbox.js";

const ARROW = {
  prev: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'
};

function missingBlock() {
  return el("div", "media-missing", "Media unavailable (TODO: add the file)");
}

function iconButton(className, label, svg) {
  const b = el("button", className);
  b.type = "button";
  b.setAttribute("aria-label", label);
  b.innerHTML = svg;
  return b;
}

function buildSlide(item, index, total, eager, openImage) {
  const slide = el("div", "slide");
  slide.setAttribute("role", "group");
  slide.setAttribute("aria-roledescription", "slide");
  slide.setAttribute("aria-label", index + 1 + " of " + total);

  const fail = () => {
    item.failed = true;
    slide.replaceChildren(missingBlock());
  };

  if (item.type === "video") {
    const video = el("video");
    video.controls = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    if (item.poster) video.poster = item.poster;
    if (item.alt) video.setAttribute("aria-label", item.alt);
    video.addEventListener("error", fail);
    video.src = item.src;
    slide.appendChild(video);
  } else {
    const button = el("button", "slide-open");
    button.type = "button";
    button.setAttribute("aria-label", "Enlarge image: " + (item.alt || "screenshot"));
    const img = el("img");
    img.alt = item.alt || "";
    img.loading = eager ? "eager" : "lazy";
    img.decoding = "async";
    img.addEventListener("error", fail);
    img.src = item.src;
    button.appendChild(img);
    button.addEventListener("click", () => openImage(item, button));
    slide.appendChild(button);
  }
  return slide;
}

export function createCarousel(media, label, eagerFirst) {
  const root = el("div", "carousel");
  root.tabIndex = 0;
  root.setAttribute("role", "region");
  root.setAttribute("aria-roledescription", "carousel");
  root.setAttribute("aria-label", label);

  const scroller = el("div", "slides");
  root.appendChild(scroller);

  if (!media.length) {
    const slide = el("div", "slide");
    slide.appendChild(missingBlock());
    scroller.appendChild(slide);
    return root;
  }

  const openImage = (item, trigger) => {
    const images = media.filter((m) => m.type !== "video" && !m.failed);
    openLightbox(images, images.indexOf(item), trigger);
  };
  const slides = media.map((item, i) => buildSlide(item, i, media.length, eagerFirst && i === 0, openImage));
  slides.forEach((s) => scroller.appendChild(s));

  const hasCaptions = media.some((m) => m.caption);
  const caption = hasCaptions ? el("p", "caption") : null;

  let current = 0;
  let update = () => {};

  if (media.length > 1) {
    const bar = el("div", "carousel-bar");
    const prev = iconButton("arrow", "Previous slide", ARROW.prev);
    const next = iconButton("arrow", "Next slide", ARROW.next);
    const dots = el("div", "dots");
    const counter = el("span", "counter");
    counter.setAttribute("aria-live", "polite");

    const dotButtons = media.map((_, i) => {
      const d = el("button", "dot");
      d.type = "button";
      d.setAttribute("aria-label", "Go to slide " + (i + 1));
      d.addEventListener("click", () => goTo(i));
      dots.appendChild(d);
      return d;
    });

    prev.addEventListener("click", () => goTo(current - 1));
    next.addEventListener("click", () => goTo(current + 1));
    bar.append(prev, dots, counter, next);
    root.appendChild(bar);

    update = () => {
      counter.textContent = current + 1 + " / " + media.length;
      dotButtons.forEach((d, i) => {
        if (i === current) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
      prev.disabled = current === 0;
      next.disabled = current === media.length - 1;
    };

    root.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      // Leave arrow keys alone inside video controls.
      if (e.target !== root && !e.target.closest(".carousel-bar")) return;
      e.preventDefault();
      goTo(current + (e.key === "ArrowRight" ? 1 : -1));
    });
  }

  function goTo(i) {
    const target = Math.max(0, Math.min(media.length - 1, i));
    scroller.scrollTo({ left: target * scroller.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  function sync() {
    const width = scroller.clientWidth || 1;
    current = Math.max(0, Math.min(media.length - 1, Math.round(scroller.scrollLeft / width)));
    update();
    if (caption) caption.textContent = media[current].caption || "";
    slides.forEach((s, i) => {
      if (i !== current) s.querySelectorAll("video").forEach((v) => v.pause());
    });
  }

  let frame = 0;
  scroller.addEventListener("scroll", () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(sync);
  });
  window.addEventListener("resize", () => {
    scroller.scrollTo({ left: current * scroller.clientWidth, behavior: "auto" });
  });

  if (caption) root.appendChild(caption);
  sync();
  return root;
}
