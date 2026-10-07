// Mobile nav toggle and footer year.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-right");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("open", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
