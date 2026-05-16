# Le Château de Jolyne — Roadmap

> Reference docs: `docs/achievement_plann.md` · `docs/ANDROID_PLAN.md`

| F2 | Browser locale auto-detect | `I18n.js` (`getLang`) | XS | ✅ Fixed — detects `navigator.language` on first launch |
| F5 | End-game cinematic (all stars) | `EndingScene.js` | M | ✅ Done — star rain, Jolyne reveal, auto-return; triggered once on 100% |
| F6 | MathDungeon atmosphere improvements | `MathDungeon.js` | M | ✅ Done — 3-layer parallax, stone-door entrance, triple-sine torch flicker |
| B1 | Bonus star (31st) clipped top-right in CollectionScene | `CollectionScene.js` | XS | ✅ Fixed — star moved to y=40 |
| B2 | Stars clipped during Félicitations phase in VictoryScene | `VictoryScene.js` | XS | ✅ Fixed — `setOrigin(0.5, 0)` applied |
| B11 | Victory transition too fast in MemoryScene (mémo chiffres) | `MemoryScene.js` | XS | ✅ Fixed — `delayedCall` 1400ms → 3000ms |

---

## 1. Bugs

| # | Description | Key files | Effort | Status |
|---|-------------|-----------|--------|--------|
| B5 | Collection layout not centered at large window widths | `CollectionScene.js` | XS | ✅ Fixed — resize handler context-bound; layout uses camera viewport |
| B8 | bg_spelling always unlocked in Special Rewards, not equippable | `ItemData.js`, `CollectionScene.js` | XS | ✅ Fixed — `isBackground` removed; no Équiper button shown |
| B10 | Math emoji icons cropped at top in collection | `CollectionScene.js` | XS | ✅ Fixed — `setOrigin(0.5, 0)` + y+12 offset |
| B13 | "Succès débloqués" hidden behind achievements grid | `CollectionScene.js` | XS | ✅ Fixed — progress text y=140, grid startY=200 |
| B14 | No achievement toast when opening collection; disappears fast on lang change | `CollectionScene.js`, `AchievementToast.js` | S | open |

## 2. Content & Assets

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| C1 | Asset gallery HTML page | new `docs/gallery.html`; inline `WordData.js` / `ItemData.js` drawPicture calls via Canvas | M | Single static page renders every word sprite + item sprite in a grid — no server needed |
| C2 | Update / refresh sprites | `WordData.js`, `ItemData.js` drawPicture functions | M–L | Visual pass on each `drawPicture` fn, child-test approved |

---

## 3. Core Features

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| F3 | Infinite math mode | `InfiniteMathScene.js`, `MathWorldSelectScene.js` | M | ✅ Done — 3 lives, score, streak combo, difficulty scaling, "Infini ∞" button in world select |
| F4 | Deusgames intro/logo scene | new `IntroScene.js`; register in `main.js`; boot chain: Boot → IntroScene → Preloader | S | 2–3 s logo animation on first launch (or every launch); skippable on tap |

---

## 4. Premium Content

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| P1 | Premium skins (girl / boy variants) | `ItemData.js` (new RARITY entries), `CollectionScene.js` skin renderer | S | 2+ new skins visible in Collection tab 0; IAP gate respected |

---

## 5. Localisation

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| L1 | German (de) | `I18n.js`, `I18n.test.js` | L | ✅ Done — full 110+ key translation; cycle is fr→en→es→de→fr |

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


