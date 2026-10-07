// Copy-email button with a short "Copied" confirmation.
const button = document.getElementById("copy-email");
const status = document.getElementById("copy-status");
const address = document.getElementById("email-link").textContent.trim();
let timer = 0;

function say(message) {
  status.textContent = message;
  clearTimeout(timer);
  timer = setTimeout(() => { status.textContent = ""; }, 1800);
}

button.addEventListener("click", () => {
  if (!navigator.clipboard) return say("Copy failed");
  navigator.clipboard.writeText(address).then(() => say("Copied"), () => say("Copy failed"));
});
