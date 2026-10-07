// Resume buttons: enabled only when the PDF from profile.json exists.
import { profile, isTodo } from "./profile.js";
import { fileExists } from "./dom.js";

function disable(link) {
  link.removeAttribute("href");
  link.removeAttribute("download");
  link.removeAttribute("target");
  link.setAttribute("aria-disabled", "true");
}

profile.then(async (p) => {
  if (isTodo(p.resume)) return; // profile.js already hid the links
  if (await fileExists(p.resume)) return;

  document.querySelectorAll('[data-profile-link="resume"]').forEach(disable);
  document.querySelectorAll(".resume-note").forEach((note) => {
    note.textContent = "TODO: add " + p.resume;
    note.hidden = false;
  });
});
