// Fade-and-rise reveal for sections. CSS disables it under prefers-reduced-motion.
const items = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    io.unobserve(e.target);
  }),
  { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
);
items.forEach((i) => io.observe(i));
