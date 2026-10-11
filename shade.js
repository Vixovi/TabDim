(() => {
  if (window !== window.top || globalThis.__brilloPorPestana) return;
  globalThis.__brilloPorPestana = true;
  let value = 100;
  let layer;
  let observer;
  let scheduled = false;
  function render() {
    scheduled = false;
    if (value === 100) {
      observer?.disconnect();
      layer?.remove();
      layer = undefined;
      return;
    }
    if (!document.documentElement) return;
    if (!layer) {
      layer = document.createElement('div');
      layer.dataset.brilloPorPestana = '';
      layer.setAttribute('aria-hidden', 'true');
      layer.setAttribute('popover', 'manual');
    }
    // Popover enters the top layer without focus or a modal backdrop.
    const parent = document.fullscreenElement || document.documentElement;
    if (layer.parentNode !== parent) parent.appendChild(layer);
    layer.style.cssText = `all:initial!important;display:block!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;margin:0!important;border:0!important;padding:0!important;background:black!important;opacity:${1 - value / 100}!important;pointer-events:none!important;z-index:2147483647!important;visibility:visible!important;`;
    try { if (!layer.matches(':popover-open')) layer.showPopover(); } catch { /* fixed layer fallback */ }
    observer ||= new MutationObserver(() => {
      if (!scheduled && (layer?.parentNode !== (document.fullscreenElement || document.documentElement))) {
        scheduled = true;
        queueMicrotask(render);
      }
    });
    observer.observe(document, {childList: true, subtree: true});
  }
  function set(next) {
    if (!Number.isFinite(next)) return;
    value = Math.max(10, Math.min(100, Math.round(next)));
    render();
  }
  chrome.runtime.onMessage.addListener((message, sender, reply) => {
    if (sender.id === chrome.runtime.id && message.type === 'shade') { set(message.value); reply({ok: true}); }
  });
  document.addEventListener('fullscreenchange', render);
  document.addEventListener('DOMContentLoaded', render, {once: true});
  chrome.runtime.sendMessage({type: 'ready'}).then(result => set(result?.value ?? 100)).catch(() => {});
})();
