// Shared tech lookup (data/tech.json) and the single-color icon element.
import { el, getJSON } from "./dom.js";

export const techMap = getJSON("data/tech.json").catch((err) => {
  console.error(err);
  return {};
});

// Icon drawn with a CSS mask so it follows currentColor. Returns null without an icon.
export function iconNode(tech, className) {
  if (!tech || !tech.icon) return null;
  const icon = el("span", className);
  // Resolve against the page: var() URLs otherwise resolve relative to the stylesheet.
  icon.style.setProperty("--icon", 'url("' + new URL(tech.icon, document.baseURI).href + '")');
  icon.setAttribute("aria-hidden", "true");
  return icon;
}
