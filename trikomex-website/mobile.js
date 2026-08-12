(function () {
  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").catch(function (err) {
        console.warn("SW register failed:", err);
      });
    });
  }

  function setupInstallBanner() {
    var banner = document.getElementById("androidInstall");
    var btn = document.getElementById("androidInstallBtn");
    var close = document.getElementById("androidInstallClose");
    if (!banner || !btn) return;

    var deferred = null;
    var dismissed = localStorage.getItem("trikomex_install_dismissed") === "1";

    window.addEventListener("beforeinstallprompt", function (event) {
      event.preventDefault();
      deferred = event;
      if (!dismissed && !window.matchMedia("(display-mode: standalone)").matches) {
        banner.hidden = false;
      }
    });

    btn.addEventListener("click", function () {
      if (!deferred) return;
      deferred.prompt();
      deferred.userChoice.finally(function () {
        deferred = null;
        banner.hidden = true;
      });
    });

    if (close) {
      close.addEventListener("click", function () {
        localStorage.setItem("trikomex_install_dismissed", "1");
        banner.hidden = true;
      });
    }
  }

  function setupAndroidUi() {
    document.documentElement.classList.add("is-mobile-ready");

    if (/Android/i.test(navigator.userAgent)) {
      document.documentElement.classList.add("is-android");
    }

    var bottomNav = document.getElementById("androidNav");
    if (!bottomNav) return;

    var links = bottomNav.querySelectorAll("a");
    function syncActive() {
      var hash = window.location.hash || "#accueil";
      links.forEach(function (link) {
        var href = link.getAttribute("href") || "";
        var active = href === hash || (href.charAt(0) !== "#" && location.pathname.endsWith(href.replace(/^\//, "")));
        link.classList.toggle("is-active", active);
      });
    }

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        setTimeout(syncActive, 50);
      });
    });

    window.addEventListener("hashchange", syncActive);
    syncActive();
  }

  registerServiceWorker();
  document.addEventListener("DOMContentLoaded", function () {
    setupInstallBanner();
    setupAndroidUi();
  });
})();
