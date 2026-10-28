// Stream Guard Content Script
(function() {
    'use strict';

    // Inject CSS immediately before DOM loads
    const css = `
        #antiAdblockPopup, div:has(#reloadBtn), #alba-click-shield {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            width: 0 !important;
            height: 0 !important;
            z-index: -99999 !important;
        }
        body {
            overflow: auto !important;
        }
        .adsbox {
            display: block !important;
            height: 1px !important;
            visibility: visible !important;
        }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);

    // Inject the main-world script
    function injectScript(file) {
        const s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', chrome.runtime.getURL(file));
        (document.head || document.documentElement).appendChild(s);
        s.onload = () => s.remove();
    }

    injectScript('injected.js');

    // DOM killer loop
    const interval = setInterval(() => {
        const popup = document.getElementById('antiAdblockPopup');
        if (popup) {
            popup.remove();
            document.body.style.overflow = 'auto';
        }
        const shield = document.getElementById('alba-click-shield');
        if (shield) shield.remove();
    }, 50);

    window.addEventListener('load', () => {
        setTimeout(() => clearInterval(interval), 15000);
    });
})();
