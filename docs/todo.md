# Le Château de Jolyne — Roadmap

### ✅ Done
| A5 | Math emoji icons cropped at top in Collection tabs | Resized 40px→32px, shifted down 4px |

## 2. Content & Assets

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|

Rewrite all 18 monster variants (2 new designs each: detailed & kawaii) and all 50 word 
     variants (2 structurally different icon shapes each). Takes longer but gives real 
     alternatives.

| A2 | Collection layout not centered on large screens | All tab Y positions made height-proportional (`height * fraction`) in CollectionScene |
| A7 | Debug inputs only after Konami code | Keys A/B/C gated behind `_debugUnlocked` flag set by UP UP | Use A to unlock every level of spelling, Add B to unlock every level of Mathematics, C to unlock every level of Memory, D for memo counting, E for achievements
| F6 | MathDungeon parallax goes down instead of forward | Rewritten with zoom-from-center expanding frames for a true forward-perspective effect | Ok but monster should be au premier plan
| C2 | Update / refresh sprites | `WordData.js`, `ItemData.js` drawPicture functions | M–L | Visual pass on each `drawPicture` fn, child-test approved |

---

## 3. Platform & Monetisation

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| M1 | Google Play Store release | `docs/ANDROID_PLAN.md`; `capacitor.config.ts`, `android/` | XL | Signed AAB in Play Console; app passes review |
| M2 | Google Sign-In | `@codetrix-studio/capacitor-google-auth`; `AuthService.js` | M | User can sign in with Google on Android; progress syncs to Firestore |
| M3 | Advertisements (AdMob) | `AdService.js` — wire interstitial between levels / after game over | S | Ad shown at appropriate moments; parental gate bypasses ads |
| M4 | Facebook Sign-In | new Capacitor plugin + `AuthService.js` extension | M | User can sign in with Facebook; same Firestore sync as Google |
| M5 | iOS App (paid or ads) | `ios/` Capacitor target; App Store Connect | XL | App passes App Store review; monetisation model chosen |
| P1 | Premium skins (girl / boy variants) | `ItemData.js`, `CollectionScene.js` | S | 2+ new skins visible in Collection tab 0; IAP gate respected |
| S1 | Replace third-party trackers / ads with self-hosted analytics (user habits, no PII sent out) | M |
