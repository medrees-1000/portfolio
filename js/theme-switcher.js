// BEGIN TEMP SWITCHER
// Temporary theme picker. Remove this file with the matching HTML and CSS blocks.
(function () {
  var buttons = document.querySelectorAll("[data-theme-choice]");

  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.themeChoice === theme));
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      apply(b.dataset.themeChoice);
      try { localStorage.setItem("theme", b.dataset.themeChoice); } catch (e) {}
    });
  });

  apply(document.documentElement.dataset.theme);
})();
// END TEMP SWITCHER
