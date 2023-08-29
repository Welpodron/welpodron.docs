(() => {
  const init = () => {
    if (window.welpodron && window.welpodron.collapse) {
      document.querySelectorAll("[data-w-collapse]").forEach((element) => {
        new welpodron.collapse({
          element,
        });
      });
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
