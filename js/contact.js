// Contact form: posts to Formspree and shows inline success or error.

// TODO: replace with your Formspree endpoint, e.g. "https://formspree.io/f/abcdwxyz"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/TODO";

(function () {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var button = form.querySelector("button[type=submit]");

  function show(kind, message) {
    status.className = "status " + kind;
    status.textContent = message;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (FORMSPREE_ENDPOINT.indexOf("TODO") !== -1) {
      show("err", "The contact form is not set up yet. Please email me instead.");
      return;
    }

    button.disabled = true;
    show("", "Sending...");

    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        show("ok", "Thanks, your message was sent.");
      })
      .catch(function () {
        show("err", "Something went wrong. Please try again or email me directly.");
      })
      .then(function () { button.disabled = false; });
  });
})();
