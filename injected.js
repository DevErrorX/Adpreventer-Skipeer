// Stream Guard Injected Script (Main World) - Universal Sports & Anti-Adblock Edition
(function() {
    'use strict';

    // 1. Spoof navigator.brave to always report false
    try {
        if (navigator.brave) {
            navigator.brave.isBrave = function() {
                return Promise.resolve(false);
            };
        }
    } catch(e) {}

    // 2. Bypass Google AdSense / DNS fake image checks
    try {
        const OrigImg = window.Image;
        window.Image = function() {
            const img = new OrigImg();
            let fakeSrc = '';
            Object.defineProperty(img, 'src', {
                get: function() { return fakeSrc; },
                set: function(val) {
                    fakeSrc = val;
                    if (typeof val === 'string' && (val.includes('googlesyndication') || val.includes('pagead') || val.includes('adservice'))) {
                        setTimeout(() => {
                            if (typeof img.onload === 'function') {
                                img.onload();
                            }
                        }, 5);
                        return;
                    }
                    img.setAttribute('src', val);
                }
            });
            return img;
        };
    } catch(e) {}

    // 3. Bypass .adsbox bait check
    try {
        const origOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
        if (origOffsetHeight) {
            Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
                get: function() {
                    if (this.classList && (this.classList.contains('adsbox') || this.classList.contains('ad-bait'))) {
                        return 1;
                    }
                    return origOffsetHeight.get.call(this);
                }
            });
        }
    } catch(e) {}

    // 4. Neutralize Anti-DevTools Image.id Trap
    const origLog = console.log;
    console.log = function(...args) {
        for (let i = 0; i < args.length; i++) {
            if (args[i] instanceof Image) return;
        }
        return origLog.apply(console, args);
    };
    console.clear = function() {};

    // 5. Block Ad Popups & Redirects on Streaming Sites
    const origOpen = window.open;
    window.open = function(url, target, features) {
        if (url && (
            url.includes('al5sm') ||
            url.includes('profiton') ||
            url.includes('pop') ||
            url.includes('ad') ||
            url.includes('track') ||
            url.includes('click') ||
            url.includes('wugroan')
        )) {
            console.warn('[Stream Guard] Blocked ad popup:', url);
            return null;
        }
        // If empty URL or ad-like call
        if (!url || url === 'about:blank' || features) {
            console.warn('[Stream Guard] Blocked blank/suspicious popup');
            return null;
        }
        return origOpen.apply(window, arguments);
    };

    // 6. Restore Context Menu & Keys
    const origAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'contextmenu') return;
        if (type === 'keydown' || type === 'keyup') {
            const safeListener = function(e) {
                if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67))) {
                    return true;
                }
                return listener.apply(this, arguments);
            };
            return origAddEventListener.call(this, type, safeListener, options);
        }
        return origAddEventListener.call(this, type, listener, options);
    };

    // 7. Inject Global Anti-Popup CSS
    const css = `
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
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    (document.head || document.documentElement).appendChild(styleEl);

    // 8. Relentless Removal of Anti-Adblock Overlays
    function purgeOverlays() {
        const popup = document.getElementById('antiAdblockPopup');
        if (popup) {
            popup.remove();
            document.body.style.overflow = 'auto';
        }
        const shield = document.getElementById('alba-click-shield');
        if (shield) shield.remove();

        const reloadBtn = document.getElementById('reloadBtn');
        if (reloadBtn) {
            const parent = reloadBtn.closest('div');
            if (parent) parent.remove();
            document.body.style.overflow = 'auto';
        }

        // Generic check for any popup mentioning adblock / brave
        const popups = document.querySelectorAll('div[style*="fixed"]');
        popups.forEach(p => {
            if (p.innerText && (
                p.innerText.includes('تم اكتشاف مانع إعلانات') ||
                p.innerText.includes('Brave مع الحماية') ||
                p.innerText.includes('تعطيل الحماية أو تغيير المتصفح')
            )) {
                p.remove();
                document.body.style.overflow = 'auto';
            }
        });
    }

    purgeOverlays();
    setInterval(purgeOverlays, 100);

    // 9. Fix Koora Online auto-search fallback
    function fixKooraOnline() {
        const statusEl = document.getElementById('alba-status');
        const container = document.getElementById('alba-player-container');
        if (statusEl && statusEl.innerHTML.includes('لم يتم العثور على بث')) {
            statusEl.style.display = 'none';

            let bar = document.getElementById('alba-servers-bar');
            let iframe = document.getElementById('alba-iframe');
            let wrapper = document.getElementById('alba-iframe-wrapper');

            if (!bar && container) {
                bar = document.createElement('div');
                bar.id = 'alba-servers-bar';
                bar.style = 'display:flex; gap:10px; justify-content:center; margin-bottom:12px; flex-wrap:wrap;';
                container.insertBefore(bar, container.firstChild);
            }
            if (wrapper) wrapper.style.display = 'block';

            const streams = [
                { name: '📺 قناة الكأس 1 HD', url: 'https://1cdn.syria-player.info/alkass1' },
                { name: '📺 قناة الكأس 2 HD', url: 'https://1cdn.syria-player.info/alkass2' },
                { name: '📺 سيرفر مباشر SSC 2', url: 'https://tv.kora-live-tv-eg.com/albaplayer/ssc-2/' }
            ];

            if (bar && bar.children.length === 0) {
                streams.forEach((s, idx) => {
                    const btn = document.createElement('button');
                    btn.className = 'alba-btn';
                    btn.style = 'background:#931800; color:#fff; border:none; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;';
                    btn.innerText = s.name;
                    btn.onclick = () => {
                        if (iframe) iframe.src = s.url;
                    };
                    bar.appendChild(btn);
                    if (idx === 0 && iframe) iframe.src = s.url;
                });
            }
        }
    }

    setInterval(fixKooraOnline, 1000);
})();
