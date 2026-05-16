# Plan: Write docs/todo.md — Comprehensive Roadmap

## Context
`docs/Suitetodo.md` is a raw bullet-point scratch pad. The goal is to produce `docs/todo.md`: a clean, implementation-ready roadmap that every item has file paths, effort, and a "done" definition — usable without follow-up questions.

Existing planning docs to absorb:
- `docs/achievement_plann.md` — full achievement system plan (ready to implement)
- `docs/ANDROID_PLAN.md` — Android/Play Store plan

## What the file will contain

Sections (ordered by urgency inside each):

### 1. Bugs
| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| B1 | Bonus star (31st) clipped top-right in CollectionScene | `CollectionScene.js:63–108` | XS | Star fully visible + click works on all screen sizes |
| B2 | Stars clipped during Félicitations phase in VictoryScene | `VictoryScene.js:346–382` | XS | All 5 stars animate without overflow/clip at y=158 |

### 2. Content & Assets
| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| C1 | Asset gallery HTML page | new `docs/gallery.html`, reads `WordData.js` / `ItemData.js` drawPicture fns | M | Single static HTML page renders every word sprite + item sprite in a grid |
| C2 | Update / refresh sprites | `WordData.js`, `ItemData.js` drawPicture functions | M–L | Visual pass on each drawPicture fn, child-test approved |

### 3. Core Features
| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| F1 | Achievement system | See `docs/achievement_plann.md` for full spec; new `AchievementService.js`, `AchievementToast.js`, `AchievementChecks.js`; modify `CollectionScene.js`, `VictoryScene.js`, `MathVictoryScene.js`, `MemoryScene.js`, `CountingScene.js`, `Boot.js`, `MainMenu.js`, `SaveService.js`, `I18n.js` | L | 10 achievements unlock correctly; CollectionScene tab 5 renders; tests pass |
| F2 | Browser locale auto-detect | `I18n.js:524–527` (`getLang`) | XS | First launch uses `navigator.language.slice(0,2)` if it matches a SUPPORTED locale, falls back to 'fr' |
| F3 | Infinite math mode | new scene `InfiniteMathScene.js`; add entry in `MathWorldSelectScene.js`; register in `main.js` | M | Endless problem stream, score counter, exits cleanly to MathWorldSelectScene |
| F4 | Deusgames intro/logo scene | new `IntroScene.js`; register in `main.js`; boot chain: Boot → IntroScene → Preloader | S | 2-3 s logo animation on first launch (or every launch); skippable |
| F5 | End-game cinematic (all stars) | new `EndingScene.js` or extend `VictoryScene.js`; triggered from `CollectionScene.js` when all 30+1 stars earned | M | Cinematic plays once on 100% completion; not retriggered |
| F6 | MathDungeon atmosphere improvements | `MathDungeon.js` — parallax layers, torch flicker, entrance animation | M | Children feel "in a dungeon"; walkthrough test with a child |

### 4. Premium Content
| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| P1 | Premium skins (girl / boy variants) | `ItemData.js` (new RARITY entries), `CollectionScene.js` skin renderer | S | 2+ new skins visible in Collection; IAP gate respected |

### 5. Localisation
| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| L1 | German (de) | `I18n.js` — add `de` to SUPPORTED + full string object; `I18n.test.js` | L | All t() keys return German strings; lang cycle includes 'de' |
| L2 | Chinese Simplified (zh) | `I18n.js` — add `zh` locale; font fallback for CJK characters | L | All strings display correctly in zh; no font rendering issues on Android |

### 6. Platform & Monetisation
| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| M1 | Google Play Store release | see `docs/ANDROID_PLAN.md`; `capacitor.config.ts`, `android/` directory | XL | Signed APK/AAB in Play Console; app passes review |
| M2 | Google Sign-In | `@codetrix-studio/capacitor-google-auth` already in deps (v3, overridden); `AuthService.js` | M | User can sign in with Google on Android; progress syncs to Firestore |
| M3 | Advertisements (AdMob) | `AdMobService.js` already exists; wire interstitial after game-over / between levels | S | Ad shown at appropriate points; parental gate bypasses ads |
| M4 | Facebook Sign-In | new Capacitor plugin + `AuthService.js` extension | M | User can sign in with Facebook; same Firestore sync as Google |
| M5 | iOS App (paid or ads) | `ios/` Capacitor target; App Store Connect | XL | App passes App Store review; purchase or ad model chosen |

### 7 Reste à faire
Corriger les bugs
Ajouter du son
Mode de jeu infini pour les mathématiques
Render the dungeon crawler nicer - On the math world, I want you to propose some adjustment so the children thinks we are moving in a dungeon. Add some proper movement and make it better

## Effort key
XS < 1 h · S 1–4 h · M 4–16 h · L 16–40 h · XL > 40 h


