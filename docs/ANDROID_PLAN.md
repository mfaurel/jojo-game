# Plan: Le Château de Jolyne — Android / Google Play

## Context

The game is a functional Phaser 4 + Vite 6 PWA. The goal is to wrap it as a real Android app, publish it on the Google Play Store, and add: Google Sign-In with cloud saves, AdMob advertising, and two IAP tiers (name unlock + premium bundle). Sign-in is optional — the game must be fully playable offline.

---

## Manual Setup (Developer does these in external dashboards first)

### Google Play Console
1. Create developer account (play.google.com/console, $25 one-time).
2. New app → "Le Château de Jolyne", Free, Game.
3. Choose **Application ID**: `fr.esante.lechateaudejolyne` (used everywhere).
4. App content → declare **Designed for Families**, COPPA compliant, age 5–8. This is required before any build upload.
5. In-app products → create two one-time products:
   - `unlock_child_name` — name customization (~1 €)
   - `premium_bundle` — name + cosmetics pack 1 (~3–5 €)

### Firebase Project
1. console.firebase.google.com → new project `jojo-game`.
2. Authentication → enable **Google** sign-in provider.
3. Firestore → create database, region `europe-west1`, production mode.
4. Project Settings → add **Android app** (package = `fr.esante.lechateaudejolyne`). Download `google-services.json` → place at `android/app/google-services.json` after Capacitor generates the Android folder.
5. Project Settings → add **Web app**. Copy the `firebaseConfig` object.
6. Deploy Firestore security rules (see Phase 5 below).

### AdMob
1. admob.google.com → link to Firebase project above.
2. Add Android app → get **AdMob App ID** (`ca-app-pub-XXXXXXXX~YYYYYYYYYY`).
3. Create ad units:
   - **Banner** "MainMenu Banner" → ad unit ID
   - **Rewarded** "Hint Reward" → ad unit ID
4. Mark app as COPPA / Designed for Families (forces non-personalized ads).
5. Keep Google's test IDs for development (in code, switched via `import.meta.env.DEV`).

---

## Phase 1 — Capacitor Setup

### Packages to install
```
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install @capacitor/app @capacitor/splash-screen @capacitor/status-bar
npm install @capacitor-community/admob
npm install @codetrix-studio/capacitor-google-auth
npm install @capgo/native-purchases
npm install firebase
```
Pin all `@capacitor/*` to the same major version (currently 6.x).

### New file: `capacitor.config.ts` (project root)
```ts
import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'fr.esante.lechateaudejolyne',
  appName: 'Le Château de Jolyne',
  webDir: 'dist',
  server: { androidScheme: 'https' },  // required: localStorage fails on API ≥31 without this
  plugins: {
    SplashScreen: { launchShowDuration: 2000, backgroundColor: '#000000', showSpinner: false },
    StatusBar: { style: 'Dark', backgroundColor: '#000000' },
  },
};
export default config;
```

### Run once
```
npx cap add android
# Then place google-services.json at android/app/google-services.json
```

### Modify `vite/config.prod.mjs`
In `manualChunks`, add Firebase alongside Phaser:
```js
manualChunks: {
  phaser:   ['phaser'],
  firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
}
```

### Build pipeline (repeat for every release)
```
npm run build
npx cap sync android
npx cap open android   # then Build → Generate Signed Bundle in Android Studio
```

---

## Phase 2 — Android Native Config

After `npx cap add android`, edit these generated files:

**`android/app/src/main/AndroidManifest.xml`**
- Add `android:screenOrientation="portrait"` to `<activity>`.
- Add inside `<application>`:
  ```xml
  <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID"
             android:value="ca-app-pub-XXXXXXXX~YYYYYYYYYY"/>
  ```

**`android/app/build.gradle`**
- `minSdkVersion 22`, `targetSdkVersion 34`, `compileSdkVersion 34`
- Add dependency: `implementation 'com.google.android.gms:play-services-ads:23.0.0'`

**App icons**: generate all mipmap densities (48/72/96/144/192 px) from `public/icon-512.png`.

**Splash screen**: solid `#000000` PNG at `android/app/src/main/res/drawable/splash.png`.

---

## Phase 3 — New Service Files (`src/game/services/`)

### `firebase.js`
Initializes Firebase app; exports `auth` and `db`.
Uses modular Firebase v10 SDK (`firebase/app`, `firebase/auth`, `firebase/firestore`).
Contains the `firebaseConfig` object copied from Firebase console Web app.

### `NameService.js`
Single responsibility: get/set child name and unlock status.
- `getChildName()` → `localStorage['jolyne_child_name']` || `'Jolyne'`
- `setChildName(name)` → trims to 20 chars
- `isNameUnlocked()` → `localStorage['jolyne_name_unlocked'] === 'true'`
- `unlockName()` → sets flag

### `SaveService.js`
Wraps all 6 existing `localStorage` keys (`jolyne_progress`, `jolyne_inventory`, `jolyne_equipment`, `jolyne_memory_progress`, `jolyne_counting_progress`, `math_progress`) plus the two new name keys.
- `buildSaveSnapshot()` → reads all keys, returns one object with `updatedAt: Date.now()`
- `applySaveSnapshot(data)` → writes all keys back from a cloud/restored object
- `loadFromCloud()` → Firestore `getDoc(users/{uid}/saves/gamestate)`
- `saveToCloud(data)` → Firestore `setDoc(..., data, { merge: true })`
- `syncSave()` → `saveToCloud(buildSaveSnapshot())` — called after each level completion

**Merge strategy on login**: cloud wins if `cloudData.updatedAt > localSnapshot.updatedAt`; otherwise upload local.

**Existing data modules are untouched** — `SaveService` reads from localStorage that they already write to.

### `AuthService.js`
- `signInWithGoogle()` → `GoogleAuth.signIn()` → `signInWithCredential(auth, credential)` → apply/upload save
- `signOutUser()` → flush save → `signOut(auth)`
- `getCurrentUser()` → `auth.currentUser`
- Firebase `onAuthStateChanged` listener registered in `src/game/main.js` applies cloud save on login

Note: add SHA-1 certificate fingerprint to Firebase console (get via `keytool -list -v -keystore release.keystore`).

### `AdService.js`
- `initAds()` → `AdMob.initialize({ initializeForChild: true })` — COPPA mode
- `showBanner()` / `hideBanner()` → Banner ad at bottom of screen, `npa: '1'` (non-personalized, always)
- `showRewardedAd()` → returns Promise; resolves on reward, rejects on failure
- All ad unit IDs switched between test (dev) and real (prod) via `import.meta.env.DEV`

### `IAPService.js`
- `initIAP()` → `NativePurchases.setup()`
- `purchaseProduct(sku)` → triggers Play Billing for `'unlock_child_name'` or `'premium_bundle'`
- `restorePurchases()` → checks for existing purchases and sets localStorage flags
- After successful `premium_bundle` purchase: call `unlockName()` and set `jolyne_cosmetics1_unlocked = 'true'`

### `BackButtonHandler.js`
- `initBackButton(game)` → `App.addListener('backButton', ...)` 
- Routes back button to parent scene based on a static map (SpellingMenu→MainMenu, CastleScene→SpellingMenu, etc.)
- On MainMenu: launches `ExitConfirmScene` (small overlay with "Quitter le jeu ?" + Yes/No buttons)

---

## Phase 4 — New Scene Files

### `src/game/scenes/ParentalGateScene.js`
Overlay scene (semi-transparent dark background) showing a random single-digit addition challenge (e.g., "3 + 7 = ?") with 4 answer buttons. Required before any IAP trigger.
- On correct answer → `this.scene.stop()` then `this.onSuccess()`
- On wrong answer → shake animation on button, no hints
- Launched via: `scene.launch('ParentalGateScene', { onSuccess: () => IAPService.purchaseProduct('unlock_child_name') })`

### `src/game/scenes/ExitConfirmScene.js`
Minimal overlay: "Quitter ?" + "Oui" (calls `App.exitApp()`) + "Non" (stops self). Launched by `BackButtonHandler` from `MainMenu`.

---

## Phase 5 — Firestore Structure & Rules

**Document path**: `users/{uid}/saves/gamestate`

```json
{
  "updatedAt": 1714000000000,
  "childName": "Emma",
  "namePurchased": true,
  "premiumPurchased": false,
  "lang": "fr",
  "progress": { "0": true, "1": true },
  "memory":   { "0": true },
  "counting": {},
  "math":     {},
  "inventory": ["skin_default", "bg_castle"],
  "equipment": { "skin": "skin_default", "background": "bg_castle", "item_left": null, "item_right": null, "card_back": "card_back_jolyne" }
}
```

**Security rules** (`firestore.rules`):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/saves/{document} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} { allow read, write: if false; }
  }
}
```

---

## Phase 6 — Existing Files to Modify

### `src/game/data/I18n.js`
1. Import `getChildName` from `NameService.js`.
2. In `t()`, after resolving the string, add: `.replace(/\{name\}/g, getChildName())`
3. Replace every literal `"Jolyne"` in the string table with `"{name}"` (affects ~14 strings across fr/en/es).

### `src/game/main.js`
Add after `const game = new Game(config)`:
```js
import { initAds }        from './services/AdService.js';
import { initIAP }        from './services/IAPService.js';
import { initBackButton } from './services/BackButtonHandler.js';
import { auth }           from './services/firebase.js';
import { loadFromCloud, applySaveSnapshot, buildSaveSnapshot, syncSave } from './services/SaveService.js';

initAds();
initIAP();
initBackButton(game);
auth.onAuthStateChanged(async user => {
  if (user) {
    const cloud = await loadFromCloud();
    if (cloud && cloud.updatedAt > (buildSaveSnapshot().updatedAt || 0)) applySaveSnapshot(cloud);
    else await syncSave();
  }
});
```
Register `ParentalGateScene` and `ExitConfirmScene` in the scenes array.

### `src/game/scenes/MainMenu.js`
1. In `create()`: call `showBanner()` after UI is drawn.
2. In each button's navigation handler: call `hideBanner()` before `this.scene.start(...)`.
3. Add small top-right "Sign In" / username button: optional, non-blocking. Shows `👤 Prénom` if signed in, `🔐` if not.

### `src/game/scenes/CollectionScene.js`
In the Bonus tab, add a "Personnaliser le prénom" row:
- If `isNameUnlocked()` → show an `<input>` HTML overlay for name entry (positioned over canvas, destroyed on blur/enter).
- If not unlocked → show a purchase button that launches `ParentalGateScene` → `IAPService.purchaseProduct('unlock_child_name')`.
- Also show "Pack Premium" button for `premium_bundle` purchase.

### `src/game/scenes/SpellingScene.js` and `MathProblemScene.js`
After `_failCount >= 2`, show a hint button:
```js
_showHintButton() {
  const btn = this.add.text(512, 700, '💡 Indice (vidéo)', { ... }).setInteractive();
  btn.on('pointerup', async () => {
    btn.destroy();
    try { await showRewardedAd(); } catch { /* ad unavailable — give hint anyway */ }
    this._revealHint();
  });
}
```
This is opt-in, value-providing, and never interrupts gameplay — compliant with Play Family policy.

### `index.html`
Add to `<style>` or `style.css` on `#game-container`: `touch-action: none;` — eliminates 300ms tap delay on Android WebView.

---

## Phase 7 — Implementation Order

1. Install packages, create `capacitor.config.ts`, run `npx cap add android` → verify empty game loads in emulator.
2. Update `vite/config.prod.mjs` (manualChunks). Run build + sync. Verify.
3. Create `NameService.js`. Update `I18n.js` with `{name}` tokens. Test in browser — default shows "Jolyne".
4. Create `firebase.js` + `SaveService.js`. Test save/load round-trip in browser.
5. Create `AuthService.js`. Add sign-in button to `MainMenu`. Test sign-in in Android emulator.
6. Create `AdService.js`. Add banner to `MainMenu`. Test with Google test ad IDs in emulator.
7. Create `ParentalGateScene.js` + `ExitConfirmScene.js`. Register in `main.js`.
8. Create `IAPService.js`. Wire gate → IAP → unlock. Test with Play Store test account.
9. Create `BackButtonHandler.js`. Test all scene back-navigation paths.
10. Add hint button + rewarded ad to `SpellingScene` and `MathProblemScene`.
11. Name customization UI in `CollectionScene`.
12. Generate release keystore: `keytool -genkey -v -keystore release.keystore -alias jojo-key -keyalg RSA -keysize 2048 -validity 10000`. **Keep this file and its password safe — losing it blocks future updates.**
13. Set AdMob App ID in `AndroidManifest.xml`. Configure icons + splash screen.
14. Build release AAB via Android Studio → upload to Play Console internal testing track. Test on physical device.
15. Complete Play Console content declarations (privacy policy URL, content rating questionnaire, Designed for Families declaration).

---

## Critical Files

| File | Why it matters |
|---|---|
| `src/game/data/I18n.js` | All "Jolyne" strings live here — single edit point for name personalization |
| `src/game/main.js` | Bootstrap point for all new services |
| `src/game/scenes/MainMenu.js` | Only place banner ad shows; also sign-in entry point |
| `src/game/scenes/CollectionScene.js` | IAP purchase UI entry point |
| `vite/config.prod.mjs` | Controls build output consumed by Capacitor |
| `android/app/google-services.json` | Generated by Firebase setup step; required for Google Auth + Firestore |

---

## Verification

- Browser (`npm run dev`): game works, name shows "Jolyne" by default, no ads/IAP (they are no-ops on web).
- Android emulator: game loads, banner test ad shows, back button navigates correctly, sign-in flow works.
- Physical device: touch targets work, orientation locked to portrait, audio plays on first tap.
- Play Console internal test: purchase flows complete (test card), save syncs across devices after sign-in, rewarded ad triggers hint.
