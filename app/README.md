# BrickedUp for iOS

The iPhone app wraps the same `index.html` that runs the website, using [Capacitor](https://capacitorjs.com). There is still only one copy of the game: change `../index.html` and both the website and the app get it (the app on its next App Store release).

**First time on the App Store?** Follow [`store/CHECKLIST.md`](store/CHECKLIST.md) step by step. Store text is in [`store/LISTING.md`](store/LISTING.md) and screenshots are in `store/screenshots/`.

## Commands (run inside this `app` folder)

| Command | What it does |
|---|---|
| `npm install` | Installs Capacitor. Run once, and again after pulling changes to `package.json`. |
| `npm run sync` | Builds `www/` from `../index.html` and copies it, plus plugins, into the Xcode project. Run after every change to the game. |
| `npm run open` | Opens the Xcode project (`ios/App/App.xcodeproj`). |

## What the app build changes

`scripts/build-www.mjs` makes an offline, private copy of the website's `index.html`:

- Removes GoatCounter analytics, so the app collects no data ("Data Not Collected" on the App Store).
- Replaces Google Fonts with the bundled Bungee and Rubik files in `fonts/` (SIL Open Font License, licences included).
- Drops web-only tags (manifest, favicons, social previews) and adds a Content-Security-Policy that blocks all network access.
- Points the Privacy link at `https://brickedup.slamdunk.studio/privacy.html`, which opens in Safari.

It fails loudly if any of those parts of `index.html` change shape, so a future edit can't quietly put analytics or web fonts back into the app.

## Native behaviour

- **Silent switch:** `AppDelegate.swift` sets the audio session to `.ambient`, so sound follows the Ring/Silent switch and mixes with the player's music. The game also sets `navigator.audioSession.type = 'ambient'`.
- **Haptics:** `index.html` calls `@capacitor/haptics` on smashes, specials, level-ups and game over. On the website `NATIVE` is false and nothing happens.
- **Safe areas:** the web view runs edge to edge (`contentInset: never`) and the page pads itself with `env(safe-area-inset-*)`.
- **iPhone only, portrait only** (`TARGETED_DEVICE_FAMILY = 1`, `Info.plist`). It still runs on iPads in iPhone mode.
- **Launch screen and icon** are rendered from `resources/icon.svg` and `resources/splash.svg` into `ios/App/App/Assets.xcassets`.
- **Privacy manifest:** `ios/App/App/PrivacyInfo.xcprivacy` declares no tracking and no collected data.
- The website's "reload when a new build is live" check only runs on `http(s)`, so it never fires inside the app.

App ID: `com.itschefff.brickedup`. The Xcode project uses Swift Package Manager, so there's no CocoaPods step.
