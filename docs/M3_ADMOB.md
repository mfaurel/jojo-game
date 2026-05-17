# M3 — AdMob Advertisements

> **Legend**  
> 🔧 **You do this manually** (console or device)  
> 🤖 **Claude automates this** (just give me the values)

> **Prerequisite**: M1 Steps 1–2 must be complete (Firebase project exists).

---

## How it works

Three ad types are implemented:

| Ad type | When it shows | Where implemented |
|---------|--------------|-------------------|
| **Banner** | Always visible on the main menu | `MainMenu.js` → `showBanner()` on create; `hideBanner()` when entering any game mode |
| **Interstitial** | After a spelling level or math world completes, before the reward popup | `VictoryScene.js` and `MathVictoryScene.js` → `showInterstitialIfReady()` |
| **Rewarded** | Optional — API ready but not wired to a trigger yet | `AdService.js` → `showRewardedAd()` |

**COPPA compliance**: AdMob is initialized with `initializeForChild: true` and all ad requests use `npa: true` (Non-Personalized Ads). This is required because the app targets children.

**Premium bypass**: Users who own the `premium_bundle` IAP skip all interstitials automatically (checked via `jolyne_cosmetics1_unlocked` in localStorage).

---

## Key files

| File | Role |
|------|------|
| `src/game/services/AdService.js` | All ad logic — init, banner, interstitial, rewarded |
| `android/app/src/main/AndroidManifest.xml` | AdMob App ID meta-data — **fill this in (Step 2)** |
| `src/game/scenes/VictoryScene.js` | Calls `showInterstitialIfReady()` after spelling level cinematic |
| `src/game/scenes/MathVictoryScene.js` | Calls `showInterstitialIfReady()` after math world cinematic |

---

## Step 1 — AdMob Console setup 🔧

1. Go to [admob.google.com](https://admob.google.com) → sign in with your Google account
2. **Link your Firebase project**: Apps → Add app → "Are you using Firebase?" → Yes → select your Firebase project
3. Your app appears with an **AdMob App ID** (format: `ca-app-pub-XXXXXXXX~YYYYYYYYYY`) — note it down
4. Create **3 ad units** (Apps → your app → Ad units → Add ad unit):

   | Name | Type | Note it as |
   |------|------|-----------|
   | `jojo_banner` | Banner | BANNER_ID |
   | `jojo_interstitial` | Interstitial | INTERSTITIAL_ID |
   | `jojo_rewarded` | Rewarded | REWARDED_ID |

   Each ad unit gets a Unit ID like `ca-app-pub-XXXXXXXX/YYYYYYYYYY`.

5. For a children's app, set **Maximum ad content rating** to G (General Audiences) in AdMob → Settings → Blocking controls.

---

## Step 2 — Fill in AdMob App ID 🤖

Give Claude the App ID from Step 1:

> "Fill in the AdMob App ID in AndroidManifest.xml with: ca-app-pub-1234567890~0987654321"

Claude will replace the placeholder in `android/app/src/main/AndroidManifest.xml`:

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXX~YYYYYYYYYY"/>  <!-- ← replace this -->
```

---

## Step 3 — Fill in ad unit IDs 🤖

Give Claude the 3 unit IDs from Step 1:

> "Fill in AdService.js with these ad unit IDs: banner=ca-app-pub-.../..., interstitial=ca-app-pub-.../..., rewarded=ca-app-pub-.../.."

Claude will replace the 3 `YOUR_*_AD_UNIT_ID` placeholders in `src/game/services/AdService.js`.

---

## Step 4 — DEV vs PROD toggle (automatic)

`AdService.js` uses `import.meta.env.DEV` to switch between Google's official test IDs and your real IDs:

```js
const BANNER_ID = import.meta.env.DEV
    ? 'ca-app-pub-3940256099942544/6300978111'  // Google test banner
    : 'YOUR_BANNER_AD_UNIT_ID';                  // your real ID
```

- **`npm run dev`** → always uses Google test IDs (safe, no policy risk)
- **`npm run build`** → uses your real production IDs

> ⚠️ Never use real ad unit IDs in debug/development builds — it violates AdMob policy and can get your account banned.

---

## Step 5 — Build and sync 🔧

```powershell
npm run build
npx cap sync android
```

---

## Step 6 — Test on device 🔧

Run the app on a physical Android device (the AdMob SDK logs to logcat but doesn't require special setup for test ads).

**Banner test:**
1. Open the app → main menu appears
2. A banner ad should be visible at the bottom of the screen
3. Enter any game mode → banner should disappear
4. Return to main menu → banner reappears

**Interstitial test:**
1. Complete any spelling level (or use the debug shortcut: press **A** on keyboard to instantly win a level)
2. After the victory cinematic ends, a full-screen interstitial ad appears
3. Close the ad → the reward popup or star screen appears

**Rewarded ad test** (not wired to a trigger yet — call directly from browser console for testing):
```js
// In the browser dev console during development:
import('/src/game/services/AdService.js').then(m => m.showRewardedAd())
```

**Logcat filter** to see ad events on device:
```
adb logcat -s "Ads"
```

---

## Ad placement logic

### VictoryScene (spelling)

```
Cinematic (8.5 s)
    │
    ▼  ← showInterstitialIfReady() fires here (skipped if all-stars ending)
Reward UI (Jolyne dancing + stars)
    │
    ├── Achievement toasts (if new achievements unlocked)
    └── Reward popup / continue button
```

### MathVictoryScene (math)

```
Cinematic (1.8 s)
    │
    ├── If all-stars ending or achievement toasts → no interstitial
    │
    └── Otherwise: showInterstitialIfReady() fires here
            │
            ├── RewardPopup (if loot dropped)
            └── Continue button (auto-advances after 1.7 s)
```

---

## Premium bypass

Users who purchased `premium_bundle` (IAP) have `jolyne_cosmetics1_unlocked=true` in localStorage. `AdService.js` checks this automatically:

```js
function _isPremium() {
    try { return localStorage.getItem('jolyne_cosmetics1_unlocked') === 'true'; } catch { return false; }
}

export async function showInterstitialIfReady() {
    if (!_initialized || _isPremium()) return;  // ← premium users skip ads
    // ...
}
```

No extra wiring needed — it works automatically once `premium_bundle` is purchased via IAP.

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Banner not appearing | AdMob App ID placeholder still in Manifest | Fill in Step 2 and rebuild |
| "Failed to load ad" in logcat | Wrong ad unit ID | Verify unit IDs match the AdMob Console |
| Interstitial not showing | `_initialized` is false | Check `initAds()` is called at startup (it is, in `main.js`) |
| Ads showing in dev mode | Wrong build | Run `npm run build` not `npm run dev` for production ad IDs |
| Policy violation email from Google | Used real IDs in debug build | Revert to test IDs in dev, rebuild |

---

## Checklist

- [ ] AdMob account created and linked to Firebase project
- [ ] AdMob App ID noted and filled in `AndroidManifest.xml`
- [ ] 3 ad units created (banner, interstitial, rewarded)
- [ ] All 3 unit IDs filled in `AdService.js`
- [ ] `npm run build && npx cap sync android` run
- [ ] Banner visible on main menu, hidden during gameplay (tested on device)
- [ ] Interstitial appears after spelling level completion (tested on device)
- [ ] Interstitial appears after math world completion (tested on device)
- [ ] Production build uses real ad IDs, dev build uses test IDs
