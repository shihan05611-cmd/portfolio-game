// Busuanzi site-wide counters; local previews must not pollute live totals.
(() => {
  const root = document.querySelector('.visit-stats');
  if (!root) return;
  const status = root.querySelector('.visit-stats-status');
  const host = location.hostname;
  const local = host === 'localhost' || host.endsWith('.localhost') || host === '[::1]' || /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host);
  if (!/^https?:$/.test(location.protocol) || local) {
    status.textContent = '本地预览不计数';
    return;
  }
  status.textContent = '访问统计加载中';
  let timeout;
  const observer = new MutationObserver(() => {
    const values = [...root.querySelectorAll('[id^="busuanzi_value_"]')];
    if (values.every(value => /^\d+$/.test(value.textContent.trim()))) {
      status.hidden = true;
      clearTimeout(timeout);
      observer.disconnect();
    }
  });
  observer.observe(root, { childList: true, subtree: true, characterData: true });
  const unavailable = () => { if (!status.hidden) status.textContent = '访问统计暂不可用'; };
  timeout = setTimeout(unavailable, 10000);
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
  script.onerror = unavailable;
  document.head.append(script);
})();
