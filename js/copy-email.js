// Copy-email button with a short "Copied" confirmation.
import { profile, isTodo } from "./profile.js";

const button = document.getElementById("copy-email");
const status = document.getElementById("copy-status");
let timer = 0;
let address = "";

function say(message) {
  status.textContent = message;
  clearTimeout(timer);
  timer = setTimeout(() => { status.textContent = ""; }, 1800);
}

profile.then((p) => {
  if (isTodo(p.email)) {
    button.hidden = true;
    return;
  }
  address = p.email;
});

button.addEventListener("click", () => {
  if (!navigator.clipboard) return say("Copy failed");
  navigator.clipboard.writeText(address).then(() => say("Copied"), () => say("Copy failed"));
});
