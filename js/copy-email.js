// Copy-email icon button: confirms with a check icon and a short "Copied" tag.
import { profile, isTodo } from "./profile.js";

const button = document.getElementById("copy-email");
const status = document.getElementById("copy-status");
const icon = button.querySelector("use");
let timer = 0;
let address = "";

function say(message, copied) {
  status.textContent = message;
  icon.setAttribute("href", copied ? "#i-check" : "#i-copy");
  clearTimeout(timer);
  timer = setTimeout(() => {
    status.textContent = "";
    icon.setAttribute("href", "#i-copy");
  }, 1800);
}

profile.then((p) => {
  if (isTodo(p.email)) return;
  address = p.email;
});

button.addEventListener("click", () => {
  if (!address || !navigator.clipboard) return say("Copy failed", false);
  navigator.clipboard.writeText(address).then(() => say("Copied", true), () => say("Copy failed", false));
});
