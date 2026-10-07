// Navbar logo: uses assets/images/logo.svg when it exists (also as favicon),
// otherwise the initials wordmark from profile.json stays in place.
import { el, fileExists } from "./dom.js";
import { profile } from "./profile.js";

const LOGO = "assets/images/logo.svg";
const link = document.querySelector(".logo");

profile.then(async (p) => {
  if (p.name) link.setAttribute("aria-label", p.name + ", back to top");
  if (!(await fileExists(LOGO))) return;

  const img = el("img", "logo-img");
  img.src = LOGO;
  img.alt = "";
  img.height = 40;
  link.replaceChildren(img);

  const icon = document.querySelector('link[rel="icon"]');
  if (icon) {
    icon.href = LOGO;
    icon.type = "image/svg+xml";
  }
});
