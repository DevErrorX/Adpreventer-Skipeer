// Stream Guard Content Script - Document Start Guard
(function() {
    'use strict';

    // 1. Inject Comprehensive Anti-Ad & Anti-Popup CSS immediately
    const css = `
        /* === Telegram Betting Ad & Floating Video Overlays === */
        #tgAdNotification,
        .tg-ad-notification,
        #tgAdBox,
        .tg-ad-box,
        [id*="tgAd"],
        [id*="tg-ad"],
        [class*="tg-ad"],
        .tg-ad-badge,
        .tg-ad-header,
        .tg-ad-stats,
        .tg-ad-features,
        .tg-ad-btn,
        .tg-ad-close,
        div:has(> #tgAdBox),
        div:has(> .tg-ad-box),
        div:has(> .tg-ad-badge),

        /* === In-Player Floating App Banners (e.g., KoraPlus) === */
        div[class*="koraplus"],
        div[id*="koraplus"],
        a[href*="koraplus"],
        div:has(> img[alt*="KoraPlus"]),
        div:has(> a[href*="play.google.com/store/apps/details?id=com.kora"]),

        /* === Anti-Adblock & Click-Shield Modals === */
        #antiAdblockPopup,
        div:has(#reloadBtn),
        #alba-click-shield,
        .adblock-overlay,
        div[style*="z-index: 999999"]:has(b:contains("مانع")),
        div[style*="z-index: 999999"]:has(*:contains("Brave")) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            width: 0 !important;
            height: 0 !important;
            max-width: 0 !important;
            max-height: 0 !important;
            overflow: hidden !important;
            position: absolute !important;
            top: -99999px !important;
            left: -99999px !important;
            z-index: -9999999 !important;
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

    function injectStyle() {
        const style = document.createElement('style');
        style.id = 'stream-guard-core-style';
        style.textContent = css;
        const target = document.head || document.documentElement || document.body;
        if (target) {
            target.appendChild(style);
        }
    }

    injectStyle();
    if (!document.head) {
        document.addEventListener('DOMContentLoaded', injectStyle, { once: true });
    }

    // 2. Inject Main-World Script
    function injectScript(file) {
        const s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', chrome.runtime.getURL(file));
        const target = document.head || document.documentElement;
        if (target) {
            target.appendChild(s);
            s.onload = () => s.remove();
        }
    }

    injectScript('injected.js');

    // 3. Relentless DOM Scanner & MutationObserver to eliminate ads instantly
    function purgeAdElements(root) {
        if (!root) return;

        // Targeted selector purge
        const selectors = [
            '#tgAdNotification',
            '.tg-ad-notification',
            '#tgAdBox',
            '.tg-ad-box',
            '[id*="tgAd"]',
            '[id*="tg-ad"]',
            '[class*="tg-ad"]',
            '#antiAdblockPopup',
            '#alba-click-shield',
            'div:has(#reloadBtn)'
        ];

        try {
            const elements = (root.querySelectorAll ? root.querySelectorAll(selectors.join(',')) : []);
            elements.forEach(el => {
                try { el.remove(); } catch(e) {}
            });
        } catch(e) {}

        // Text & Content heuristic check (for Telegram betting banners & KoraPlus overlays)
        const floatingDivs = root.querySelectorAll ? root.querySelectorAll('div[style*="fixed"], div[style*="absolute"], div.show') : [];
        floatingDivs.forEach(div => {
            const txt = div.innerText || '';
            if (
                txt.includes('قناة المراهنات') ||
                txt.includes('مراهنات كرة القدم') ||
                txt.includes('توقعات مجانية') ||
                txt.includes('حمل KoraPlus') ||
                txt.includes('تم اكتشاف مانع إعلانات') ||
                txt.includes('متصفح Brave مع الحماية')
            ) {
                try {
                    div.remove();
                    if (document.body) document.body.style.overflow = 'auto';
                } catch(e) {}
            }
        });
    }

    // Immediate MutationObserver: Kills elements the exact millisecond they are added
    const observer = new MutationObserver(mutations => {
        for (let i = 0; i < mutations.length; i++) {
            const added = mutations[i].addedNodes;
            for (let j = 0; j < added.length; j++) {
                const node = added[j];
                if (node.nodeType === 1) { // Element node
                    // Check node itself
                    if (
                        node.id === 'tgAdNotification' ||
                        node.id === 'tgAdBox' ||
                        (node.classList && (node.classList.contains('tg-ad-notification') || node.classList.contains('tg-ad-box')))
                    ) {
                        node.remove();
                        continue;
                    }
                    purgeAdElements(node);
                }
            }
        }
    });

    const targetObs = document.documentElement || document;
    observer.observe(targetObs, { childList: true, subtree: true });

    // Periodic sweep that runs continuously (no timeout)
    setInterval(() => {
        purgeAdElements(document);
    }, 200);

})();
