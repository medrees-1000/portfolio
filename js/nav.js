// Mobile nav toggle.
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-right");

function setOpen(open) {
  toggle.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("open", open);
}

toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
