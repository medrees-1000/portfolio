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

// Highlight the nav link for the section currently in view.
const ids = ["top", "projects", "about", "contact"];
const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

function setActive(id) {
  document.querySelectorAll('.nav a[href^="#"]').forEach((a) => {
    if (a.getAttribute("href") === "#" + id && id !== "top") a.setAttribute("aria-current", "location");
    else a.removeAttribute("aria-current");
  });
}

const spy = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => spy.observe(s));
