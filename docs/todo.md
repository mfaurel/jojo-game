# Le Château de Jolyne — Roadmap

### ✅ Done

## 2. 260607 15h20 current Content & Assets

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
Put at the end of gallery.html the sprites of items for right hand and left hand of mathematics game

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
