# Le Château de Jolyne — Roadmap

> Reference docs: `docs/achievement_plann.md` · `docs/ANDROID_PLAN.md`

---

## 1. Bugs

| # | Description | Key files | Effort | Status |
|---|-------------|-----------|--------|--------|
| B1 | Bonus star (31st) clipped top-right in CollectionScene | `CollectionScene.js` | XS | ✅ Fixed — star moved to y=40 |
| B2 | Stars clipped during Félicitations phase in VictoryScene | `VictoryScene.js` | XS | ✅ Fixed — `setOrigin(0.5, 0)` applied |
| B3 | ⭐ star decoration on Collection button in MainMenu | `MainMenu.js` | XS | ✅ Fixed — star decoration removed from Collection button |
| B5 | Collection layout not re-centered on fullscreen/resize | `CollectionScene.js` | XS | ✅ Fixed — `this.scale.on('resize', ...)` restarts scene |
| B6 | Collection default active tab was Math (1) instead of Spelling (0) | `CollectionScene.js` | XS | ✅ Fixed — `data?.tab ?? 1` changed to `data?.tab ?? 0` |
| B7 | Animated bonus star in top-right corner of CollectionScene | `CollectionScene.js` | S | ✅ Fixed — floating star removed; bonus triggered by clicking `collectionTitle` text |
| B8 | "Classe" background (bg_spelling) in Bonus tab should be always unlocked and in Special Rewards | `CollectionScene.js`, `ItemData.js` | S | ✅ Fixed — bg_spelling removed from ITEMS backgrounds, added to SPECIAL_REWARDS with `alwaysUnlocked: true` |
| B9 | First avatar in Spelling collection has no label | `CollectionScene.js`, `I18n.js` | XS | ✅ Fixed — `item_skin_default` i18n key updated to "Robe Classique" / "Classic Dress" / "Vestido Clásico" |
| B10 | Math emoji icons cropped at top in collection | `CollectionScene.js` | XS | ✅ Fixed — emoji y offset shifted down by 8px |
| B11 | Victory transition too fast in MemoryScene (mémo chiffres) | `MemoryScene.js` | XS | ✅ Fixed — `delayedCall` changed from 1400ms to 3000ms |
| B12 | Achievement toast display duration | `AchievementToast.js` | XS | ✅ No change needed — already 3500ms |
| B13 | Achievements grid not well centered in collection | `CollectionScene.js` | XS | ✅ Fixed — cardW adjusted to 450, colGap to 24, startY to 180 for better centering |

---

## 2. Content & Assets

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| C1 | Asset gallery HTML page | new `docs/gallery.html`; inline `WordData.js` / `ItemData.js` drawPicture calls via Canvas | M | Single static page renders every word sprite + item sprite in a grid — no server needed |
| C2 | Update / refresh sprites | `WordData.js`, `ItemData.js` drawPicture functions | M–L | Visual pass on each `drawPicture` fn, child-test approved |

---

## 3. Core Features

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| F2 | Browser locale auto-detect | `I18n.js:524–527` (`getLang`) | XS | First launch uses `navigator.language.slice(0,2)` if it matches a SUPPORTED locale, falls back to `'fr'` |
| F3 | Infinite math mode | new `InfiniteMathScene.js`; add entry in `MathWorldSelectScene.js`; register in `main.js` | M | Endless problem stream, score counter, exits cleanly to MathWorldSelectScene |
| F4 | Deusgames intro/logo scene | new `IntroScene.js`; register in `main.js`; boot chain: Boot → IntroScene → Preloader | S | 2–3 s logo animation on first launch (or every launch); skippable on tap |
| F5 | End-game cinematic (all stars) | new `EndingScene.js` or extend `CollectionScene.js`; trigger when all 30+1 stars earned | M | Cinematic plays once on 100 % completion; not re-triggered |
| F6 | MathDungeon atmosphere improvements | `MathDungeon.js` — parallax layers, entrance animation, smoother torch flicker | M | Children feel "in a dungeon"; validated with a child playtester |

---

## 4. Premium Content

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| P1 | Premium skins (girl / boy variants) | `ItemData.js` (new RARITY entries), `CollectionScene.js` skin renderer | S | 2+ new skins visible in Collection tab 0; IAP gate respected |

---

## 5. Localisation

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| L1 | German (de) | `I18n.js` — add `de` to SUPPORTED + full string object; update `I18n.test.js` | L | All `t()` keys return German strings; lang cycle includes `'de'` |
| L2 | Chinese Simplified (zh) | `I18n.js` — add `zh` locale; verify CJK font fallback on Android | L | All strings display correctly in zh; no font rendering issues on device |

---

## 6. Platform & Monetisation

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| M1 | Google Play Store release | `docs/ANDROID_PLAN.md`; `capacitor.config.ts`, `android/` directory | XL | Signed AAB in Play Console; app passes review |
| M2 | Google Sign-In | `@codetrix-studio/capacitor-google-auth` (already in deps); `AuthService.js` | M | User can sign in with Google on Android; progress syncs to Firestore |
| M3 | Advertisements (AdMob) | `AdService.js` already exists; wire interstitial between levels / after game over | S | Ad shown at appropriate moments; parental gate bypasses ads |
| M4 | Facebook Sign-In | new Capacitor plugin + `AuthService.js` extension | M | User can sign in with Facebook; same Firestore sync as Google |
| M5 | iOS App (paid or ads) | `ios/` Capacitor target; App Store Connect | XL | App passes App Store review; monetisation model chosen |

---

## Effort key

`XS` < 1 h · `S` 1–4 h · `M` 4–16 h · `L` 16–40 h · `XL` > 40 h


