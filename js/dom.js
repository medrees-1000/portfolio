// Small shared helpers.
export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

export function getJSON(url) {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  });
}

export function prefersReducedMotion() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// True when the URL answers 2xx with something other than an HTML fallback page.
export function fileExists(url) {
  return fetch(url, { method: "HEAD" })
    .then((res) => res.ok && !/text\/html/.test(res.headers.get("content-type") || ""))
    .catch(() => false);
}
