# Le Château de Jolyne — Roadmap

> Reference docs: `docs/achievement_plann.md` · `docs/ANDROID_PLAN.md`

| F2 | Browser locale auto-detect | `I18n.js:524–527` (`getLang`) | XS | First launch uses `navigator.language.slice(0,2)` if it matches a SUPPORTED locale, falls back to `'fr'` |
| F5 | End-game cinematic (all stars) | new `EndingScene.js` or extend `CollectionScene.js`; trigger when all 30+1 stars earned | M | Cinematic plays once on 100 % completion; not re-triggered |
| F6 | MathDungeon atmosphere improvements | `MathDungeon.js` — parallax layers, entrance animation, smoother torch flicker | M | Children feel "in a dungeon"; validated with a child playtester |
| B2 | Stars clipped during Félicitations phase in VictoryScene | `VictoryScene.js` | XS | ✅ Fixed — `setOrigin(0.5, 0)` applied |
| B11 | Victory transition too fast in MemoryScene (mémo chiffres) | `MemoryScene.js` | XS | ✅ Fixed — `delayedCall` changed from 1400ms to 3000ms |

---

## 1. Bugs

| # | Description | Key files | Effort | Status |
|---|-------------|-----------|--------|--------|
| B8 | "Classe" background (bg_spelling) in Bonus tab should be always unlocked and in Special Rewards but shouldn't be a background
| B10 | Math emoji icons cropped at top in collection | `CollectionScene.js` | XS | 
No achievement shown when clicking onn collection. Achievement disappear quickly when changing language
| B5 | When on full page (no full screen) Collection layout not centered. It seems not working when width is big
| B13 | Achievements grid not well centered in collection | `CollectionScene.js` | The small info "succès débloqués" is not visible because of the achievements box.

--

Avoir le bouton DE dans le choix des langues pour passer en allemand
Avoir les assets des monstres des mathematiques dans la gallery.html
Enlever le premium dans le bonus
Enlever le cadenas du mainn mennu
Bouton rouge pour effacer dans le spelling game prend un peu trop de place pour les mots les plus longs

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


