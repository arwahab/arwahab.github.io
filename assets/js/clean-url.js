(function () {
  function cleanUrl() {
    try {
      var path = location.pathname;
      if (!path.endsWith(".html")) return;
      var clean = path.slice(0, -5);
      if (clean.endsWith("index")) {
        clean = clean.slice(0, -5);
      }
      var next = clean + location.search + location.hash;
      var current = path + location.search + location.hash;
      if (next !== current) {
        history.replaceState(null, "", next);
      }
    } catch (e) {
      // Some contexts (e.g. file://) may block history changes; ignore.
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanUrl);
  } else {
    cleanUrl();
  }
})();
