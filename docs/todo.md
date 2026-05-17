# Le Château de Jolyne — Roadmap

## To Verify

| # | Description | Key files | Status |
|---|-------------|-----------|--------|
| B5 | Collection layout not centered when not fullscreen (wide widths) | `CollectionScene.js` | Resize-restart handler was already in place — verify centering at various viewport widths |
| B8 | "Classe" background (bg_spelling) in Bonus tab should always be unlocked + equippable | `ItemData.js` | Added `isBackground: true` to `SPECIAL_REWARDS.BG_SPELLING` |
| B10 | Math emoji icons cropped at top; no achievement shown on click; achievements disappear on language change | `CollectionScene.js`, `MainMenu.js` | Emoji origin fixed; explorer/linguist toasts queued via registry and flushed after scene restarts |
| B13 | Achievements grid not centred; "succès débloqués" info hidden behind grid | `CollectionScene.js` | Vertical spacing increased; click-to-reveal detail modal added |
| F4 | Deusgames intro/logo scene | `IntroScene.js`, `main.js`, `Boot.js` | New scene with 2–3 s logo animation (skippable); Boot → IntroScene → Preloader chain |
| D1 | Debug cheat keys — win level (A), unlock achievement (B), grant item (C) | `MainMenu.js` | A/B/C keyboard shortcuts added in `_initCheatCode()`; `_debugWinLevel/Achievement/Item()` helpers |
| D2 | German language support (DE button in language selector) | `I18n.js` | Already fully implemented — 4 locales: fr, en, es, de |
| D3 | Math monster assets in `gallery.html` | `public/gallery.html` | New standalone gallery page; 18 monsters in 6 worlds rendered via Canvas2D adapter |
| D4 | Remove premium lock icon from main menu | `MainMenu.js` | Sign-in button changed from 🔐 to 👤 |
| D5 | Red delete button in spelling game is too wide for long words | `SpellingScene.js` | Backspace button moved from x=880 to x=950, size 70→55 px |

---

## 1. Bugs

| # | Description | Key files | Effort | Status |
|---|-------------|-----------|--------|--------|
| B5 | Collection layout not centered when not fullscreen (wide widths) | `CollectionScene.js` | S | Layout centers correctly at all viewport widths |
| B8 | "Classe" background (bg_spelling) in Bonus tab should always be unlocked + in Special Rewards, but not a background | `ItemData.js`, `CollectionScene.js` | S | Correct categorisation; always visible |
| B10 | Math emoji icons cropped at top in collection; no achievement shown on click; achievements disappear on language change | `CollectionScene.js` | S | Icons fully visible; achievements persist across lang changes |
| B13 | Achievements grid not centred; "succès débloqués" info hidden behind grid | `CollectionScene.js` | S | Grid centred; info text always visible |

---

## 2. Features

| # | Description | Key files | Effort | Status |
|---|-------------|-----------|--------|--------|
| F3 | Infinite math mode | `InfiniteMathScene.js` (exists); `MathWorldSelectScene.js` entry | M | ✅ Done — registered in `main.js`; accessible from world select |
| F4 | Deusgames intro/logo scene | new `IntroScene.js`; register in `main.js`; boot chain: Boot → IntroScene → Preloader | S | 2–3 s logo animation on first launch (or every launch); skippable on tap |
| F5 | End-game cinematic (all stars) | `EndingScene.js`, `AchievementChecks.js` | M | ✅ Done — cinematic plays once on 100 % completion via `checkAllStars()`; `ENDING_SEEN_KEY` prevents re-trigger |
| F6 | MathDungeon atmosphere improvements | `MathDungeon.js` | M | ✅ Done — 3-layer parallax, stone-door entrance animation, per-frame torch flicker |

---

## 3. UX / Polish

| # | Description | Effort | Status |
|---|-------------|--------|--------|
| D1 | Debug cheat keys — win level (A), unlock achievement (B), grant item (C) | S | Done |
| D2 | German language support (DE button in language selector) | M | Done |
| D3 | Math monster assets in `gallery.html` | S | Done |
| D4 | Remove premium lock icon from main menu | XS | Done |
| D5 | Red delete button in spelling game is too wide for long words | XS | Done |

---

## 4. Content & Assets

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| C2 | Update / refresh sprites | `WordData.js`, `ItemData.js` drawPicture functions | M–L | Visual pass on each `drawPicture` fn, child-test approved |

---

## 5. Platform & Monetisation

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| M1 | Google Play Store release | `docs/ANDROID_PLAN.md`; `capacitor.config.ts`, `android/` | XL | Signed AAB in Play Console; app passes review |
| M2 | Google Sign-In | `@codetrix-studio/capacitor-google-auth`; `AuthService.js` | M | User can sign in with Google on Android; progress syncs to Firestore |
| M3 | Advertisements (AdMob) | `AdService.js` — wire interstitial between levels / after game over | S | Ad shown at appropriate moments; parental gate bypasses ads |
| M4 | Facebook Sign-In | new Capacitor plugin + `AuthService.js` extension | M | User can sign in with Facebook; same Firestore sync as Google |
| M5 | iOS App (paid or ads) | `ios/` Capacitor target; App Store Connect | XL | App passes App Store review; monetisation model chosen |
| P1 | Premium skins (girl / boy variants) | `ItemData.js`, `CollectionScene.js` | S | 2+ new skins visible in Collection tab 0; IAP gate respected |

---

## 6. Analytics & Security

| # | Description | Effort |
|---|-------------|--------|
| S1 | Replace third-party trackers / ads with self-hosted analytics (user habits, no PII sent out) | M |

---

## Effort key

`XS` < 1 h · `S` 1–4 h · `M` 4–16 h · `L` 16–40 h · `XL` > 40 h
