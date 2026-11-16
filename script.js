(function () {
  "use strict";

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Light / dark mode toggle, remembered in localStorage */
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var stored = null;
  try { stored = localStorage.getItem("twilight-theme"); } catch (e) { /* private mode */ }
  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("twilight-theme", next); } catch (e) { /* private mode */ }
    });
  }

  /* Rough reach estimator — illustration only, never a promise. */
  var btn = document.getElementById("estimate-btn");
  var result = document.getElementById("estimate-result");
  if (btn && result) {
    btn.addEventListener("click", function () {
      var visitors = parseInt(document.getElementById("visitors").value, 10);
      var months = parseInt(document.getElementById("months").value, 10);
      if (isNaN(visitors) || visitors < 0) visitors = 0;
      if (isNaN(months) || months < 1) months = 6;
      /* Illustrative steady growth of 5% (low) to 12% (high) per month, compounded. */
      var low = Math.round(visitors * Math.pow(1.05, months));
      var high = Math.round(visitors * Math.pow(1.12, months));
      result.textContent = "Rough illustration: after " + months + " months of steady work, " +
        visitors.toLocaleString("en-US") + " monthly visitors could grow to roughly " +
        low.toLocaleString("en-US") + "–" + high.toLocaleString("en-US") +
        " per month. This is an estimate only — not a promise.";
    });
  }

  /* Free audit form -> opens the visitor's email app, pre-filled. */
  var form = document.getElementById("audit-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = document.getElementById("f-name").value.trim();
      var email = document.getElementById("f-email").value.trim();
      var site = document.getElementById("f-site").value.trim();
      var service = document.getElementById("f-service").value;
      var message = document.getElementById("f-message").value.trim();
      var subject = "Free Audit Request — Twilight Digital Marketing";
      var body = "Hi Twilight Digital Marketing,\n\n" +
        "I would like a free audit.\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Website / social link: " + (site || "—") + "\n" +
        "I need help with: " + service + "\n\n" +
        "About my business and goals:\n" + message + "\n";
      window.location.href = "mailto:tabassumshoshy@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
