# Le Château de Jolyne — Roadmap

> Reference docs: `docs/ANDROID_PLAN.md`

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
| F4 | Deusgames intro/logo scene | new `IntroScene.js`; register in `main.js`; boot chain: Boot → IntroScene → Preloader | S | 2–3 s logo animation on first launch (or every launch); skippable on tap |
| F5 | End-game cinematic (all stars) | `EndingScene.js`, `AchievementChecks.js` | M | ✅ Done — cinematic plays once on 100 % completion via `checkAllStars()`; `ENDING_SEEN_KEY` prevents re-trigger |
| F6 | MathDungeon atmosphere improvements | `MathDungeon.js` | M | ✅ Done — 3-layer parallax, stone-door entrance animation, per-frame torch flicker |

---

## 3. UX / Polish

| # | Description | Effort |
|---|-------------|--------|
| D1 | Debug cheat keys — win level (A), unlock achievement (B), grant item (C) | S |
| D2 | German language support (DE button in language selector) | M |
| D3 | Math monster assets in `gallery.html` | S |
| D4 | Remove premium lock icon from main menu | XS |
| D5 | Red delete button in spelling game is too wide for long words | XS |

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
| F3 | Infinite math mode | `InfiniteMathScene.js` (exists); `MathWorldSelectScene.js` entry | M | ✅ Done — registered in `main.js`; accessible from world select |

---

## 6. Analytics & Security

| # | Description | Effort |
|---|-------------|--------|
| S1 | Replace third-party trackers / ads with self-hosted analytics (user habits, no PII sent out) | M |

## 2. Content & Assets

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| C2 | Update / refresh sprites | `WordData.js`, `ItemData.js` drawPicture functions | M–L | Visual pass on each `drawPicture` fn, child-test approved |

---

## 4. Platform & Monetisation

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| M1 | Google Play Store release | `docs/ANDROID_PLAN.md`; `capacitor.config.ts`, `android/` directory | XL | Signed AAB in Play Console; app passes review |
| F4 | Deusgames intro/logo scene | new `IntroScene.js`; register in `main.js`; boot chain: Boot → IntroScene → Preloader | S | 2–3 s logo animation on first launch (or every launch); skippable on tap |
| M2 | Google Sign-In | `@codetrix-studio/capacitor-google-auth` (already in deps); `AuthService.js` | M | User can sign in with Google on Android; progress syncs to Firestore |
| M3 | Advertisements (AdMob) | `AdService.js` already exists; wire interstitial between levels / after game over | S | Ad shown at appropriate moments; parental gate bypasses ads |
| P1 | Premium skins (girl / boy variants) | `ItemData.js` (new RARITY entries), `CollectionScene.js` skin renderer | S | 2+ new skins visible in Collection tab 0; IAP gate respected |
| F3 | Infinite math mode | new `InfiniteMathScene.js`; add entry in `MathWorldSelectScene.js`; register in `main.js` | M | Endless problem stream, score counter, exits cleanly to MathWorldSelectScene |
| M4 | Facebook Sign-In | new Capacitor plugin + `AuthService.js` extension | M | User can sign in with Facebook; same Firestore sync as Google |
| M5 | iOS App (paid or ads) | `ios/` Capacitor target; App Store Connect | XL | App passes App Store review; monetisation model chosen |

---

## Effort key

`XS` < 1 h · `S` 1–4 h · `M` 4–16 h · `L` 16–40 h · `XL` > 40 h


