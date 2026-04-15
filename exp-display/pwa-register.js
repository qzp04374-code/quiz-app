(function () {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("./service-worker.js");
      console.log("[PWA] service worker registered:", reg.scope);
    } catch (err) {
      console.error("[PWA] service worker registration failed:", err);
    }
  });

  function updatePwaModeClass() {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    document.documentElement.classList.toggle("pwa-standalone", isStandalone);
    document.documentElement.classList.toggle("pwa-browser", !isStandalone);
  }

  window.addEventListener("DOMContentLoaded", updatePwaModeClass);

  const media = window.matchMedia("(display-mode: standalone)");
  if (media.addEventListener) {
    media.addEventListener("change", updatePwaModeClass);
  } else if (media.addListener) {
    media.addListener(updatePwaModeClass);
  }

  window.addEventListener("online", () => {
    document.documentElement.classList.remove("is-offline");
    document.documentElement.classList.add("is-online");
  });

  window.addEventListener("offline", () => {
    document.documentElement.classList.remove("is-online");
    document.documentElement.classList.add("is-offline");
  });
})();