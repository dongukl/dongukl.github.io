/* dongukl.github.io — theme toggle + inline video facade */
(function () {
  "use strict";

  var root = document.documentElement;

  function store(v) {
    try { localStorage.setItem("theme", v); } catch (e) {}
  }

  function paint(btn) {
    if (!btn) return;
    var dark = root.getAttribute("data-theme") === "dark";
    btn.textContent = dark ? "☀️" : "🌙";
    btn.setAttribute("aria-label", dark ? "라이트 모드로 전환" : "다크 모드로 전환");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    paint(btn);
    if (btn) {
      btn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        store(next);
        paint(btn);
      });
    }

    /* inline video facade — detail pages only */
    document.querySelectorAll("[data-video]").forEach(function (el) {
      el.addEventListener("click", function () {
        if (el.classList.contains("is-playing")) return;
        var id = el.getAttribute("data-video");
        el.classList.add("is-playing");
        el.innerHTML =
          '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
          '?autoplay=1&rel=0" title="시연 영상" allow="accelerometer; autoplay; ' +
          'clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
          'allowfullscreen></iframe>';
      });
    });
  });
})();
