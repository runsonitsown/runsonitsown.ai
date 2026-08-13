import Script from "next/script";

const loader = `
(function () {
  if (window.__rioGhlTrackingRequested) return;
  window.__rioGhlTrackingRequested = true;
  fetch('/api/ghl-tracking-config', { credentials: 'same-origin' })
    .then(function (response) { return response.ok ? response.json() : null; })
    .then(function (config) {
      if (!config || !config.trackingId) return;
      var script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/external-tracking.js';
      script.setAttribute('data-tracking-id', config.trackingId);
      script.async = true;
      document.head.appendChild(script);
    })
    .catch(function () {});
})();`;

export function GhlTracking() {
  return (
    <Script id="ghl-external-tracking-loader" strategy="beforeInteractive">
      {loader}
    </Script>
  );
}
