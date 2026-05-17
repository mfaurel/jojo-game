# M2 — Google Sign-In

> **Legend**  
> 🔧 **You do this manually** (console or device)  
> 🤖 **Claude automates this** (just give me the value)

> **Prerequisite**: M1 Steps 1–4 must be complete (Firebase project exists, SHA-1 registered).

---

## How it works

```
User taps 👤
    │
    ▼
@codetrix-studio/capacitor-google-auth
    │  GoogleAuth.signIn() → idToken
    ▼
Firebase Auth
    │  signInWithCredential(GoogleAuthProvider.credential(idToken))
    ▼
Firestore save sync
    │  compare cloud.updatedAt vs local.updatedAt → apply newest
    ▼
Scene restarts — button shows "👤 [FirstName]"
```

**On sign-out**: local save is synced to cloud first, then Firebase + Google Auth are signed out.

---

## Key files

| File | Role |
|------|------|
| `src/game/services/AuthService.js` | `signInWithGoogle()`, `signOutUser()`, `getCurrentUser()` |
| `src/game/services/SaveService.js` | `buildSaveSnapshot()`, `applySaveSnapshot()`, `loadFromCloud()`, `syncSave()` |
| `src/game/services/firebase.js` | Firebase app init — **fill in real config values here (M1 Step 5)** |
| `src/game/scenes/MainMenu.js` | `_createSignInButton()` — handles sign-in/out UI and scene restart |
| `capacitor.config.ts` | `GoogleAuth.serverClientId` — **fill in your Web Client ID (Step 3 below)** |

---

## Step 1 — Enable Google Sign-In in Firebase 🔧

1. Firebase Console → your project → **Build → Authentication → Get started**
2. **Sign-in method** tab → **Google** → click to enable
3. Set the **Project support email** to your email address
4. Click **Save**

Firebase automatically creates an OAuth 2.0 client in your Google Cloud project.

---

## Step 2 — Get the Web Client ID 🔧

The Web Client ID is **not** the Android client — it's the "Web application" one, created automatically by Firebase.

1. Go to [Google Cloud Console](https://console.cloud.google.com) → select your Firebase project
2. **APIs & Services → Credentials**
3. Under **OAuth 2.0 Client IDs**, find the entry of type **Web application** (name usually contains "Web client (auto created by Google Service)")
4. Copy the **Client ID** — it ends in `.apps.googleusercontent.com`

---

## Step 3 — Fill in capacitor.config.ts 🤖

Give Claude the Client ID from Step 2:

> "Fill in the GoogleAuth serverClientId in capacitor.config.ts with: 12345678-abcdefg.apps.googleusercontent.com"

Claude will update the `GoogleAuth.serverClientId` field. The section already exists:

```ts
GoogleAuth: {
  scopes: ['profile', 'email'],
  serverClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',  // ← replace this
  forceCodeForRefreshToken: false,
},
```

---

## Step 4 — Build and sync 🔧

```powershell
npm run build
npx cap sync android
```

This pushes the updated `capacitor.config.ts` into the Android native project.

---

## Step 5 — Test on physical device 🔧

> ⚠️ Google Sign-In does **not** work on emulators. You must use a real Android device.

1. Connect your Android device via USB (enable Developer Options + USB Debugging)
2. In Android Studio, select your device from the device dropdown → click **Run**
3. Or install the APK/AAB from the Internal Testing track (M1 Step 10)

**Test flow:**
1. Tap the **👤** button in the top-right of the main menu
2. The Google account picker appears
3. Select your Google account
4. The scene restarts — the button now shows **👤 [Your first name]**
5. Tap the button again → you are signed out → button shows **👤** again

**Verify Firestore sync:**
1. Sign in on device A → play a few levels
2. Open [Firebase Console → Firestore](https://console.firebase.google.com) → check `users/{uid}/saves/gamestate` has a document
3. Sign in on device B (or reinstall app) → sign in with the same account → progress from device A should appear

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `10: DEVELOPER_ERROR` | SHA-1 not registered in Firebase | Add the release keystore SHA-1 to Firebase Console (M1 Step 4) |
| Account picker doesn't appear | `serverClientId` missing or wrong | Re-check `capacitor.config.ts` and `npx cap sync android` |
| Sign-in succeeds but Firestore isn't written | Firebase rules too restrictive | Check Firestore security rules allow `request.auth.uid == uid` |
| Sign-in fails silently | Error swallowed in `_createSignInButton` try-catch | Check Android logcat for the real error |

---

## Checklist

- [ ] Google Sign-In enabled in Firebase Authentication
- [ ] Web Client ID obtained from Google Cloud Console
- [ ] `capacitor.config.ts` `serverClientId` filled in
- [ ] `npm run build && npx cap sync android` run
- [ ] Tested sign-in flow on physical Android device
- [ ] Verified Firestore `users/{uid}/saves/gamestate` document written
- [ ] Verified cloud save round-trip (two devices or reinstall)
