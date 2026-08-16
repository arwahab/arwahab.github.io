(function () {
  "use strict";

  var doc = document;

  var NAV = {
    version: "1.3",
    groups: [
      {
        label: "Overview",
        items: [
          { page: "overview.html", title: "Overview" },
          { page: "tour.html", title: "Narrated tour" },
          { page: "architecture.html", title: "System architecture" }
        ]
      },
      {
        label: "Guides",
        items: [
          { page: "domain-context-learner.html", title: "Learn your domain" },
          { page: "architect.html", title: "Evaluate architectures" },
          { page: "reviewer.html", title: "Review a design" }
        ]
      },
      {
        label: "Examples",
        items: [
          { page: "example-ecommerce.html", title: "E-commerce order platform" },
          { page: "example-streaming.html", title: "Media event pipeline" }
        ]
      },
      {
        label: "References",
        items: [{ page: "release-notes.html", title: "Release notes" }]
      }
    ],
    order: [
      "overview.html",
      "tour.html",
      "architecture.html",
      "domain-context-learner.html",
      "architect.html",
      "reviewer.html",
      "example-ecommerce.html",
      "example-streaming.html",
      "release-notes.html"
    ],
    resources: [
      { href: "../index.html", title: "Product line" },
      { href: "../about.html", title: "About" },
      { href: "https://github.com/arwahab", title: "GitHub", external: true },
      { href: "https://www.linkedin.com/in/arwahab/", title: "LinkedIn", external: true }
    ]
  };

  var TITLES = {};

  NAV.groups.forEach(function (g) {
    g.items.forEach(function (i) {
      TITLES[i.page] = i.title;
    });
  });

  function normalizePath(p) {
    return p
      .replace(/\/index\.html$/, "/")
      .replace(/\.html$/, "")
      .replace(/\/$/, "");
  }

  function pageName(p) {
    var parts = p.split("/");
    return parts[parts.length - 1] || "";
  }

  var CURRENT_NAME = pageName(normalizePath(location.pathname));

  function isCurrent(page) {
    return pageName(normalizePath(page)) === CURRENT_NAME;
  }

  function buildSidebar() {
    var host = doc.getElementById("docs-nav");
    if (!host) return;

    var html =
      '<div class="docs-nav-brand">' +
      '<a class="docs-nav-home" href="index.html">Documentation</a>' +
      '<a class="docs-version" href="release-notes.html">v' +
      NAV.version +
      " · latest</a>" +
      "</div>" +
      '<div class="docs-nav-groups">';

    NAV.groups.forEach(function (g) {
      html += '<div class="docs-nav-group">';
      html += '<div class="docs-nav-label">' + g.label + "</div><ul>";
      g.items.forEach(function (i) {
        var active = isCurrent(i.page) ? " active" : "";
        html +=
          '<li><a class="docs-nav-link' +
          active +
          '" href="' +
          i.page +
          '">' +
          i.title +
          "</a></li>";
      });
      html += "</ul></div>";
    });

    html += "</div>";
    html += '<div class="docs-nav-resources"><div class="docs-nav-label">Resources</div><ul>';

    NAV.resources.forEach(function (r) {
      var ext = r.external ? ' target="_blank" rel="noopener"' : "";
      html +=
        '<li><a class="docs-nav-link" href="' +
        r.href +
        '"' +
        ext +
        ">" +
        r.title +
        "</a></li>";
    });

    html += "</ul></div>";

    host.innerHTML = html;
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function buildToc() {
    var host = doc.getElementById("docs-toc");
    if (!host) return;

    var scope = doc.querySelector(".doc-prose");
    if (!scope) {
      host.remove();
      return;
    }

    var heads = Array.prototype.slice.call(scope.querySelectorAll("h2, h3"));
    if (heads.length < 2) {
      host.remove();
      return;
    }

    var html = '<div class="docs-toc-title">On this page</div><ul>';

    heads.forEach(function (h) {
      if (!h.id) h.id = slugify(h.textContent);
      var cls = h.tagName === "H3" ? "toc-l3" : "toc-l2";
      html +=
        '<li class="' +
        cls +
        '"><a href="#' +
        h.id +
        '">' +
        h.textContent +
        "</a></li>";
    });

    html += "</ul>";
    host.innerHTML = html;

    var links = host.querySelectorAll("li a");
    var targets = heads;

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var idx = targets.indexOf(entry.target);
              links.forEach(function (a) {
                a.classList.toggle("active", a === links[idx]);
              });
            }
          });
        },
        { rootMargin: "-64px 0px -70% 0px", threshold: 0 }
      );
      targets.forEach(function (h) {
        io.observe(h);
      });
    }
  }

  function buildPager() {
    var idx = -1;

    NAV.order.forEach(function (page, i) {
      if (isCurrent(page)) idx = i;
    });

    if (idx === -1) return;

    var prev, next;

    if (idx === 0) {
      prev = { href: "index.html", title: "Docs home" };
    } else {
      prev = { href: NAV.order[idx - 1], title: TITLES[NAV.order[idx - 1]] };
    }

    if (idx < NAV.order.length - 1) {
      next = { href: NAV.order[idx + 1], title: TITLES[NAV.order[idx + 1]] };
    }

    var html =
      '<nav class="docs-pager" aria-label="Pagination">' +
      (prev
        ? '<a class="docs-pager-item prev" href="' +
          prev.href +
          '"><span class="docs-pager-dir">Previous</span><span class="docs-pager-title">' +
          prev.title +
          "</span></a>"
        : '<span class="docs-pager-item empty"></span>') +
      (next
        ? '<a class="docs-pager-item next" href="' +
          next.href +
          '"><span class="docs-pager-dir">Next</span><span class="docs-pager-title">' +
          next.title +
          "</span></a>"
        : '<span class="docs-pager-item empty"></span>') +
      "</nav>";

    var target = doc.querySelector(".doc-page") || doc.querySelector(".tour-stage");
    if (target) {
      target.insertAdjacentHTML("afterend", html);
    }
  }

  buildSidebar();
  buildToc();
  buildPager();
})();
