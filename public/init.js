(() => {
  const init = () => {
    if (window.welpodron && window.welpodron.collapse) {
      console.log(1);
      document.querySelectorAll('[data-w-collapse]').forEach((element) => {
        new welpodron.collapse({
          element,
        });
      });
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
