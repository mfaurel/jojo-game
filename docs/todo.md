# Le Château de Jolyne — Roadmap

### ✅ Done
| A5 | Math emoji icons cropped at top in Collection tabs | Resized 40px→32px, shifted down 4px |
| A7 | Debug inputs only after Konami code | Keys A/B/C gated behind `_debugUnlocked` flag set by UP UP |
| C2 | Math monster assets in `gallery.html` | Added full 6-world × 3-monster section + `lineBetween` adapter to `docs/gallery.html` |
| D4 | Remove Sign-in button 👤 | Removed button and AuthService import from MainMenu |
| D5 | Red buttons in SpellingScene grow too wide on hover | Changed `setScale(1.1)` to `setAlpha(0.75)` on hover |
| D5 | Confirm-quit popin style inconsistent | Rewritten to match the standard dark rounded-rect + gold border layout |
| F5 | End-game cinematic playable from collection bonus | Fixed by A4 — removing `_drawSpecialRewards()` eliminated the only replay path |
| F6 | MathDungeon parallax goes down instead of forward | Rewritten with zoom-from-center expanding frames for a true forward-perspective effect |

## 2. Content & Assets

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| A2 | Collection layout not centered on large screens | All tab Y positions made height-proportional (`height * fraction`) in CollectionScene |
| A7 | Debug inputs only after Konami code | Keys A/B/C gated behind `_debugUnlocked` flag set by UP UP | Use A to unlock every level of spelling, Add B to unlock every level of Mathematics, C to unlock every level of Memory, D for memo counting, E for achievements
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

---

## Effort key

`XS` < 1 h · `S` 1–4 h · `M` 4–16 h · `L` 16–40 h · `XL` > 40 h
