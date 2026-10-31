# Adpreventer-Skipeer 🛡️🚀
**Bypass Anti-Adblock, Anti-Brave Detectors, Aggressive Popups, Telegram Betting Overlays & Inspection Traps**

An open-source browser extension (Chrome / Brave / Edge) designed to bypass anti-adblock detection, Anti-Brave browser verification, floating Telegram betting ads (`tg-ad-notification`), in-player banner overlays, DevTools traps, and aggressive popups/click-shields on sports streaming and media websites.

---

## ✨ Features

- **📱 Telegram Betting Ad & Video Overlay Killer (New in v1.2.0):**
  Instantly destroys floating Telegram channel promotions, betting notification boxes (`#tgAdNotification`, `#tgAdBox`, `.tg-ad-notification`), and in-player banners (such as KoraPlus app banners) before they can render or block video controls.
- **🛡️ Anti-Brave Detection Bypass:**
  Spoofs `navigator.brave.isBrave()` so protected sites think you are using a standard browser without shields.
- **🚫 Anti-Adblock & DNS Bait Defeat:**
  Fakes Google AdSense test images and bait boxes (`.adsbox`, `.ad-bait`), preventing "Adblock Detected" modals from rendering.
- **⚡ Instant Popup & Click-Shield Neutralizer:**
  Eliminates `#antiAdblockPopup`, `#alba-click-shield`, and transparent clickjacking overlays covering video players.
- **🛑 Popup & Redirect Blocker:**
  Intercepts aggressive `window.open` calls to ad networks and redirect trackers (`al5sm`, `profiton`, betting links, etc.).
- **🔓 Re-Enable Control:**
  Restores right-click (`contextmenu`), `F12`, `Ctrl+Shift+I` (Inspect), and `Ctrl+U` (View Source).
- **📺 Smart Stream Enhancer:**
  Auto-injects working live stream server buttons directly when streaming search proxies fail.

---

## 🚀 Installation Guide

### For Brave / Google Chrome / Microsoft Edge:

1. Download or clone this repository:
   ```bash
   git clone https://github.com/DevErrorX/Adpreventer-Skipeer.git
   ```
2. Open your browser and navigate to the Extensions page:
   - **Brave:** `brave://extensions/`
   - **Chrome:** `chrome://extensions/`
   - **Edge:** `edge://extensions/`
3. Enable **Developer mode** (toggle in the top corner).
4. Click **Load unpacked** (تحميل إضافة لم يتم حزمها).
5. Select the folder containing `manifest.json`.
6. (If already installed): Click the **Update** or **Reload (⟳)** button on the extension card.
7. Enjoy clean, uninterrupted streaming!

---

## 📁 Project Structure

```
├── manifest.json       # Manifest V3 extension configuration
├── bypass.js           # Content script injecting the early DOM guard & MutationObserver
├── injected.js         # Core bypass logic executed in the page's main world
├── icon.png            # Extension icon
└── README.md           # Documentation
```

---

## ⚖️ License
MIT License. Free to use, modify, and distribute.
