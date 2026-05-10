# Plan: Le Château de Jolyne — Android / Google Play

## Context

The game is a functional Phaser 4 + Vite 6 PWA (confirmed: `"phaser": "4.0.0"`, `"vite": "^6.3.1"`).  
Goal: wrap as a real Android app via Capacitor, publish on Google Play, and add Google Sign-In + cloud saves, AdMob ads, and two IAP tiers. Sign-in is optional; the game must be fully playable offline.

---

## Manual Setup (external dashboards — done before any build)

### Google Play Console
1. Create developer account, new app "Le Château de Jolyne", Free, Game.
2. Application ID: `fr.esante.lechateaudejolyne` (used everywhere).
3. App content → declare Designed for Families, COPPA, age 5–8.
4. In-app products → two one-time products:
   - `unlock_child_name` (~1 €)
   - `premium_bundle` (~3–5 €)

### Firebase
1. New project `jojo-game`, enable Google Auth, create Firestore (`europe-west1`, production mode).
2. Add Android app (package `fr.esante.lechateaudejolyne`); download `google-services.json` → `android/app/google-services.json`.
3. Add Web app; copy `firebaseConfig` object into `src/game/services/firebase.js`.
4. Deploy Firestore security rules (see Phase 5).

### AdMob
1. Link to Firebase project; add Android app → get **AdMob App ID**.
2. Create ad units: Banner "MainMenu Banner", Rewarded "Hint Reward".
3. Mark COPPA / Designed for Families (forces non-personalized ads).
4. Use Google test IDs in dev, switched via `import.meta.env.DEV` (Vite production builds set this to `false`).

---

## Phase 1 — Capacitor Setup

### Install

```
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install @capacitor/app @capacitor/splash-screen @capacitor/status-bar
npm install @capacitor-community/admob
npm install @codetrix-studio/capacitor-google-auth
npm install @capgo/native-purchases
npm install firebase
```

Pin all `@capacitor/*` to the same major (currently 6.x).

### New file: `capacitor.config.ts` (project root)

```ts
import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'fr.esante.lechateaudejolyne',
  appName: 'Le Château de Jolyne',
  webDir: 'dist',
  server: { androidScheme: 'https' },  // localStorage broken on API ≥31 without this
  plugins: {
    SplashScreen: { launchShowDuration: 2000, backgroundColor: '#000000', showSpinner: false },
    StatusBar:    { style: 'Dark', backgroundColor: '#000000' },
  },
};
export default config;
```

### Run once
```
npx cap add android
# then place google-services.json at android/app/google-services.json
```

### Modify `vite/config.prod.mjs`

In the existing `manualChunks` object (currently only `phaser`), add:

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
npx cap open android   # then Build → Generate Signed Bundle
```

---

## Phase 2 — Android Native Config

After `npx cap add android`:

**`android/app/src/main/AndroidManifest.xml`**
- Add `android:screenOrientation="portrait"` to `<activity>`.
- Add inside `<application>`:
  ```xml
  <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID"
             android:value="ca-app-pub-XXXXXXXX~YYYYYYYYYY"/>
  ```

**`android/app/build.gradle`**
- `minSdkVersion 22`, `targetSdkVersion 34`, `compileSdkVersion 34`
- Add: `implementation 'com.google.android.gms:play-services-ads:23.0.0'`

**Assets**: generate mipmap icons (48/72/96/144/192 px) from `public/icon-512.png`; solid `#000000` PNG for splash.

---

## Phase 3 — New Service Files (`src/game/services/`)

```
src/game/services/
  firebase.js
  NameService.js
  SaveService.js
  AuthService.js
  AdService.js
  IAPService.js
  BackButtonHandler.js
```

### `firebase.js`
Initializes modular Firebase v10 SDK; exports `auth` (Firebase Auth) and `db` (Firestore).  
Paste `firebaseConfig` from Firebase Console Web app here.

### `NameService.js`
```js
export const getChildName  = () => localStorage.getItem('jolyne_child_name')?.slice(0,20) || 'Jolyne';
export const setChildName  = (n) => localStorage.setItem('jolyne_child_name', String(n).slice(0,20));
export const isNameUnlocked= () => localStorage.getItem('jolyne_name_unlocked') === 'true';
export const unlockName    = () => localStorage.setItem('jolyne_name_unlocked', 'true');
```

### `SaveService.js`
Wraps all localStorage keys without touching existing data modules.

Confirmed keys (from codebase):
- `jolyne_progress`, `jolyne_inventory`, `jolyne_equipment` (LevelData.js)
- `jolyne_memory_progress` (MemoryData.js)
- `jolyne_counting_progress` (CountingData.js)
- `math_progress` (MathWorldData.js)
- `jolyne_lang` (I18n.js)
- `jolyne_easter_star` (MainMenu.js)
- `jolyne_child_name`, `jolyne_name_unlocked` (NameService.js — new)

```js
export function buildSaveSnapshot() {
  const keys = ['jolyne_progress','jolyne_inventory','jolyne_equipment',
                 'jolyne_memory_progress','jolyne_counting_progress','math_progress',
                 'jolyne_lang','jolyne_easter_star','jolyne_child_name','jolyne_name_unlocked'];
  const snap = { updatedAt: Date.now() };
  keys.forEach(k => { const v = localStorage.getItem(k); if (v !== null) snap[k] = v; });
  return snap;
}

export function applySaveSnapshot(data) {
  const { updatedAt, ...keys } = data;
  Object.entries(keys).forEach(([k, v]) => localStorage.setItem(k, v));
}

export async function loadFromCloud() { /* Firestore getDoc users/{uid}/saves/gamestate */ }
export async function saveToCloud(data) { /* Firestore setDoc with merge:true */ }
export async function syncSave() { return saveToCloud(buildSaveSnapshot()); }
```

**Merge on login**: if `cloud.updatedAt > buildSaveSnapshot().updatedAt` → applySaveSnapshot(cloud), else syncSave().

### `AuthService.js`
- `signInWithGoogle()` → `GoogleAuth.signIn()` → `signInWithCredential` → merge/upload save
- `signOutUser()` → `syncSave()` → `signOut(auth)`
- `getCurrentUser()` → `auth.currentUser`

Note: add SHA-1 fingerprint to Firebase Console after generating keystore.

### `AdService.js`
- `initAds()` → `AdMob.initialize({ initializeForChild: true })` — forces COPPA mode
- `showBanner()` / `hideBanner()` — banner at bottom, `npa: '1'` always
- `showRewardedAd()` → returns Promise; resolves on reward, rejects on failure/no fill
- Ad unit IDs: `import.meta.env.DEV ? TEST_ID : PROD_ID`

### `IAPService.js`
- `initIAP()` → `NativePurchases.setup()`
- `purchaseProduct(sku)` → Play Billing for `'unlock_child_name'` or `'premium_bundle'`
- `restorePurchases()` → checks existing purchases, sets localStorage flags
- After `premium_bundle` purchase: `unlockName()` + `localStorage.setItem('jolyne_cosmetics1_unlocked','true')`

### `BackButtonHandler.js`
Uses `App.addListener('backButton', ...)` from `@capacitor/app`.

Full back-navigation map:
```
SpellingMenu       → MainMenu
SpellingScene      → (stop self, resume CastleScene — already handled by _close())
CastleScene        → SpellingMenu
MemoryMenuScene    → MainMenu
MemoryScene        → MemoryMenuScene
CountingMenuScene  → MainMenu
CountingScene      → CountingMenuScene
MathWorldSelectScene → MainMenu
MathDungeon        → MathWorldSelectScene
MathProblemScene   → (stop self, resume MathDungeon — handled by _showSuccess/_close)
MathVictoryScene   → MathWorldSelectScene
CollectionScene    → MainMenu
MainMenu           → launch ExitConfirmScene
```

---

## Phase 4 — New Scene Files

### `src/game/scenes/ParentalGateScene.js`
Overlay (semi-transparent dark bg) with a random single-digit addition (0–9 + 0–9).  
4 answer buttons. On correct → `this.scene.stop(); this.scene.get('...').onSuccess()`.  
On wrong → shake animation, no hints. Launched via `scene.launch('ParentalGateScene', { onSuccess })`.

### `src/game/scenes/ExitConfirmScene.js`
Minimal overlay: "Quitter ?" + "Oui" (calls `App.exitApp()`) + "Non" (stops self).  
`App.exitApp()` is a no-op on browser/web — only exits on Android.

---

## Phase 5 — Firestore Structure & Rules

Document path: `users/{uid}/saves/gamestate`

```json
{
  "updatedAt": 1714000000000,
  "jolyne_child_name": "Emma",
  "jolyne_name_unlocked": "true",
  "jolyne_progress": "{...}",
  "jolyne_inventory": "[...]",
  "jolyne_equipment": "{...}",
  "jolyne_memory_progress": "{...}",
  "jolyne_counting_progress": "{...}",
  "math_progress": "{...}",
  "jolyne_lang": "fr",
  "jolyne_easter_star": "true"
}
```

**`firestore.rules`** (deploy with Firebase CLI):
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

**1. Import NameService** at top:
```js
import { getChildName } from '../services/NameService.js';
```

**2. Patch `t()` to interpolate `{name}`** on the final resolved string (works for both plain strings and function-return values):

```js
export function t(key, ...args) {
  const lang = getLang();
  const val = (STRINGS[lang] ?? STRINGS.fr)[key] ?? STRINGS.fr[key];
  if (val === undefined) return key;
  const result = typeof val === 'function' ? val(...args) : val;
  return typeof result === 'string' ? result.replace(/\{name\}/g, getChildName()) : result;
}
```

**3. Replace literal `'Jolyne'` in string values with `'{name}'`** in all three locales.

Affected string keys (scan each locale):
- `gameTitle` — "Le Monde de Jolyne" → "Le Monde de {name}"
- `spellingTitle` — "Le Château de Jolyne" → "Le Château de {name}"
- `spellingSubtitle` — "Apprends à épeler en français !" (fr has no Jolyne; en: "Learn to spell" — no Jolyne either; skip)
- `helpJolyne` — "Aide Jolyne ! ✨" → "Aide {name} ! ✨"
- `chooseSkin` — "Choisir un personnage pour Jolyne" → "…pour {name}"
- `item_bg_spelling` — "Classe de Jolyne" → "Classe de {name}"
- `item_skin_default` — "Jolyne Pixel" → "{name} Pixel"

That's 7 keys × 3 locales = ~21 occurrences, though not all locales use "Jolyne" in every string. Scan with `grep -n 'Jolyne' src/game/data/I18n.js` and replace each occurrence.

> Default `getChildName()` returns `'Jolyne'`, so without IAP the game looks identical to today.

### `src/game/main.js`

Add imports at top:
```js
import { initAds }        from './services/AdService.js';
import { initIAP }        from './services/IAPService.js';
import { initBackButton } from './services/BackButtonHandler.js';
import { auth }           from './services/firebase.js';
import { loadFromCloud, applySaveSnapshot, buildSaveSnapshot, syncSave } from './services/SaveService.js';
```

Inside `StartGame()`, after `const game = new Game({ ...config, parent })`:
```js
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

Add `ParentalGateScene` and `ExitConfirmScene` to the `scene` array in `config`.

### `src/game/scenes/MainMenu.js`

1. In `create()`: call `showBanner()` from AdService after UI is drawn.
2. Before each `this.scene.start(...)` call in button handlers: call `hideBanner()`.
3. Add small top-right sign-in button (optional, non-blocking): shows username if signed in, lock icon if not.

### `src/game/scenes/CollectionScene.js`

In `_drawBonusTab()`, after the background items, add a "Personnaliser le prénom" section:
- If `isNameUnlocked()` → show an HTML overlay `<input>` (positioned over canvas via `document.createElement`, destroyed on blur/Enter) that calls `setChildName()`.
- If not unlocked → show a purchase button that launches `ParentalGateScene` → `IAPService.purchaseProduct('unlock_child_name')`.
- Show a second "Pack Premium" button for `premium_bundle`.

### `src/game/scenes/SpellingScene.js`

The existing code already calls `_showFirstLetterHint()` automatically at `_failCount >= 2` (line 425–427 in `_showRetry()`). **Replace** the auto-hint call with an opt-in rewarded ad button:

Current (`_showRetry()` lines ~421–427):
```js
if (this._failCount >= 2) {
    this._showFirstLetterHint();
}
```

Replace with:
```js
if (this._failCount >= 2 && !this._hintButtonShown) {
    this._showHintButton();
}
```

Add `_showHintButton()`:
```js
_showHintButton() {
  this._hintButtonShown = true;
  const btn = this.add.text(512, 700, '💡 Indice', { fontSize: '26px', color: '#ffd700',
    backgroundColor: '#3a0060', padding: { x: 16, y: 8 } })
    .setOrigin(0.5).setDepth(15).setInteractive({ useHandCursor: true });
  btn.on('pointerup', async () => {
    btn.destroy();
    try { await showRewardedAd(); } catch { /* no ad fill — give hint anyway */ }
    this._showFirstLetterHint();
  });
}
```

Import `showRewardedAd` from `AdService.js` at the top of `SpellingScene.js`.  
Initialize `this._hintButtonShown = false` in `init()`.

### `src/game/scenes/MathProblemScene.js`

No fail count currently exists. Add `this._failCount = 0` in `init()`.  
In `_handleInput()`, after `this.cameras.main.shake(150, 0.005)` on wrong answer:
```js
this._failCount++;
if (this._failCount >= 2 && !this._hintButtonShown) this._showHintButton();
```

Add `_showHintButton()` (reveals the correct answer after rewarded ad, same pattern as SpellingScene).

### `index.html`

Add `touch-action: none;` to `#game-container` in `public/style.css` — eliminates 300 ms tap delay on Android WebView.

---

## Dependency / Data Flow

```
npm run build → dist/
     ↓
npx cap sync android → android/ (Capacitor copies dist)
     ↓
Android Studio → signed AAB → Play Console

Runtime (Android):
  StartGame()
    ├─ initAds()           AdMob SDK init (COPPA mode)
    ├─ initIAP()           Play Billing setup
    ├─ initBackButton()    Capacitor App back listener
    └─ auth.onAuthStateChanged
          └─ if signed in: loadFromCloud() ↔ Firestore
                           vs buildSaveSnapshot() ↔ localStorage

localStorage keys:          Firestore: users/{uid}/saves/gamestate
  jolyne_progress             (same keys, serialized as strings)
  jolyne_inventory
  jolyne_equipment
  jolyne_memory_progress
  jolyne_counting_progress
  math_progress
  jolyne_lang
  jolyne_easter_star
  jolyne_child_name   ← new
  jolyne_name_unlocked← new

IAP flow:
  CollectionScene Bonus tab
    → ParentalGateScene (random addition gate)
        → IAPService.purchaseProduct('unlock_child_name')
            → unlockName() → NameService
                → I18n.t() uses getChildName() for {name} tokens
```

---

## Phase 7 — Implementation Order

1. Install packages, create `capacitor.config.ts`, run `npx cap add android`. Verify blank game loads in emulator.
2. Update `vite/config.prod.mjs` manualChunks. Build + sync. Verify.
3. Create `NameService.js`. Update `I18n.js` ({name} tokens + patched `t()`). Test in browser: default shows "Jolyne".
4. Create `firebase.js` + `SaveService.js`. Test save/load round-trip in browser console.
5. Create `AuthService.js`. Add sign-in button to `MainMenu.js`. Test in Android emulator.
6. Create `AdService.js`. Add banner to `MainMenu`. Test with Google test IDs in emulator.
7. Create `ParentalGateScene.js` + `ExitConfirmScene.js`. Register in `main.js` scene array.
8. Create `IAPService.js`. Wire ParentalGate → IAP → unlock. Test with Play Store test account.
9. Create `BackButtonHandler.js`. Test all scene back-navigation paths on device.
10. Add `_showHintButton()` + rewarded ad to `SpellingScene` and `MathProblemScene`.
11. Name customization UI in `CollectionScene` Bonus tab.
12. Generate release keystore: `keytool -genkey -v -keystore release.keystore -alias jojo-key -keyalg RSA -keysize 2048 -validity 10000`. **Keep this file safe — losing it blocks future updates.**
13. Set AdMob App ID in `AndroidManifest.xml`. Generate icons + splash screen.
14. Build release AAB via Android Studio → upload to Play Console internal testing track. Test on physical device.
15. Complete Play Console declarations (privacy policy URL, content rating questionnaire, Designed for Families).

---

## Critical Files

| File | Change |
|---|---|
| `src/game/data/I18n.js` | Add `{name}` tokens in all 3 locales; patch `t()` to call `getChildName()` |
| `src/game/main.js` | Add 5 service imports + init calls inside `StartGame()` |
| `src/game/scenes/MainMenu.js` | `showBanner()` / `hideBanner()` around navigations; sign-in button |
| `src/game/scenes/CollectionScene.js` | Name customization + IAP purchase UI in Bonus tab |
| `src/game/scenes/SpellingScene.js` | Replace auto-hint at `_failCount≥2` with opt-in rewarded ad button |
| `src/game/scenes/MathProblemScene.js` | Add `_failCount` + hint button (same pattern) |
| `vite/config.prod.mjs` | Add `firebase` manualChunk |
| `public/style.css` | `touch-action: none` on `#game-container` |
| `capacitor.config.ts` | New file |
| `android/app/google-services.json` | Placed after `npx cap add android` |
| `firestore.rules` | New file for deploy |

---

## Verification

- **Browser** (`npm run dev`): game runs, name shows "Jolyne" by default, ads/IAP are no-ops (Capacitor plugins return errors gracefully on web).
- **Android emulator**: game loads, banner test ad shows, back button navigates correctly, sign-in flow completes.
- **Physical device**: touch targets work, orientation locked to portrait, audio plays on first tap.
- **Play Console internal test**: purchase flows complete (test card), save syncs across devices after sign-in, rewarded ad triggers hint in SpellingScene.