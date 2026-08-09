(function () {
  "use strict";

  var doc = document;

  function normalizePath(p) {
    return p
      .replace(/\/index\.html$/, "/")
      .replace(/\.html$/, "")
      .replace(/\/$/, "");
  }

  var current = normalizePath(location.pathname);

  // Highlight the nav link for the page we are on (cross-page links only).
  var appNav = doc.querySelector(".app-nav");

  if (appNav) {
    var topLevel = Array.prototype.filter.call(appNav.children, function (el) {
      return el.tagName === "A";
    });

    topLevel.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      var a = doc.createElement("a");
      a.href = link.href;
      if (normalizePath(a.pathname) === current) {
        link.classList.add("active");
      }
    });

    // Scrollspy for in-page hash links.
    var spyLinks = [];

    topLevel.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      var target = doc.querySelector(href);
      if (target) {
        spyLinks.push({ link: link, target: target });
      }
    });

    if (spyLinks.length) {
      var ticking = false;

      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          var pos = window.scrollY + 80;
          var active = null;

          if (window.scrollY <= 2 && spyLinks.length) {
            active = spyLinks[0].link;
          }

          for (var i = 0; i < spyLinks.length; i++) {
            if (spyLinks[i].target.offsetTop <= pos) {
              active = spyLinks[i].link;
            } else {
              break;
            }
          }
          spyLinks.forEach(function (s) {
            s.link.classList.toggle("active", s.link === active);
          });
        });
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }
})();
