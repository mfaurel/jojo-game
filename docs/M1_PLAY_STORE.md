# M1 — Google Play Store Release

> **Legend**  
> 🔧 **You do this manually** (console, terminal, or Android Studio)  
> 🤖 **Claude automates this** (just give me the values)

---

## Prerequisites

Make sure these are installed before starting:

| Tool | Purpose |
|------|---------|
| [Android Studio](https://developer.android.com/studio) | Build + sign the AAB |
| JDK 17+ | Ships with Android Studio; `keytool` is part of it |
| Node.js 20+ | Already installed |
| Capacitor CLI | Already in `node_modules/.bin/cap` |

---

## Step 1 — Google Play Console 🔧

1. Go to [play.google.com/console](https://play.google.com/console) and pay the **$25 one-time registration fee**.
2. Once inside, click **Create app**.
3. Fill in:
   - **App name**: `Le Château de Jolyne`
   - **Default language**: French
   - **App or game**: Game
   - **Free or paid**: Free (ads-supported)
4. Under **Store Presence → App content**:
   - Declare **Designed for Families** (COPPA — the game targets children)
   - Complete the **content rating questionnaire**: choose "Educational" content, no violence, no user communication
5. Keep the Play Console tab open — you'll need it later for uploads and store listings.

---

## Step 2 — Firebase project 🔧

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
2. Name it `lechateaudejolyne`, disable Google Analytics (not needed), click **Create project**.
3. Inside the project, click **Add app → Android** (the Android robot icon).
   - Package name: `fr.esante.lechateaudejolyne`
   - App nickname: `Le Château de Jolyne`
   - Leave SHA-1 blank for now (you'll add it in Step 4)
4. **Download `google-services.json`** → move it to `android/app/google-services.json`.
5. Enable **Authentication**:
   - Firebase Console → Build → Authentication → Get started
   - Sign-in method tab → **Google** → Enable → Save
6. Enable **Firestore**:
   - Firebase Console → Build → Firestore Database → Create database
   - Choose **Production mode** → pick a region close to your users (e.g. `europe-west1`)
   - After creation, go to **Rules** tab and replace with:
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /users/{uid}/{document=**} {
           allow read, write: if request.auth != null && request.auth.uid == uid;
         }
       }
     }
     ```
   - Click **Publish**.
7. Go to **Project Settings** (gear icon) → **General** → scroll to **Your apps** → select the Android app.
8. Copy the **7 config values** (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId) — give them to Claude to fill in `src/game/services/firebase.js`.

---

## Step 3 — Release keystore 🔧

> ⚠️ **Critical**: This keystore file is required for every future update. **Back it up in a safe location outside the git repo** (e.g. a password manager, USB drive, or private cloud). Losing it means you can never update the app on the Play Store.

Run this command **once**, replacing the path with where you want to store the file:

```bash
keytool -genkey -v \
  -keystore C:\keys\jojo\release.keystore \
  -alias jojo-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

You'll be prompted for:
- A **keystore password** (remember it)
- Your name, organisation, city, country
- A **key password** (can be the same as keystore password)

Keep a note of:
- `storeFile` path: `C:\keys\jojo\release.keystore`
- `storePassword`: your keystore password
- `keyAlias`: `jojo-key`
- `keyPassword`: your key password

---

## Step 4 — SHA-1 fingerprint 🔧

Run:

```bash
keytool -list -v \
  -keystore C:\keys\jojo\release.keystore \
  -alias jojo-key
```

Copy the **SHA-1** line (looks like `AB:CD:EF:...`).

Paste it into Firebase Console:
- Project Settings → Your apps → Android app → **Add fingerprint** → paste SHA-1 → Save.

This is required for Google Sign-In (M2) to work on the release build.

---

## Step 5 — Fill in Firebase config 🤖

Give Claude the 7 values from Step 2 and ask:

> "Fill in firebase.js with these values: apiKey=..., authDomain=..., projectId=..., storageBucket=..., messagingSenderId=..., appId=..., measurementId=..."

Claude will update `src/game/services/firebase.js`.

---

## Step 6 — Fill in signing config 🤖

The `android/app/build.gradle` already has a `signingConfigs.release` block that reads from environment variables. You have two options:

**Option A — environment variables (recommended for CI):**
```powershell
$env:JOJO_KEYSTORE_PATH = "C:\keys\jojo\release.keystore"
$env:JOJO_STORE_PASS    = "your-store-password"
$env:JOJO_KEY_PASS      = "your-key-password"
```

**Option B — let Claude fill in the values directly:**
Give Claude the three values and ask it to hardcode them in `build.gradle`.

> ⚠️ If you hardcode passwords, add `android/app/build.gradle` to `.gitignore` or use a local `keystore.properties` file — never commit passwords to git.

---

## Step 7 — App icons 🔧 / 🤖

The source icon is at `public/icon-512.png`.

You need mipmap PNGs at these sizes:

| Folder | Size |
|--------|------|
| `mipmap-mdpi` | 48×48 |
| `mipmap-hdpi` | 72×72 |
| `mipmap-xhdpi` | 96×96 |
| `mipmap-xxhdpi` | 144×144 |
| `mipmap-xxxhdpi` | 192×192 |

**Option A — online tool (easiest):** Use [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html) → upload `public/icon-512.png` → download ZIP → copy files into `android/app/src/main/res/`.

**Option B — ask Claude:** Claude can write the ImageMagick commands to generate all sizes at once.

---

## Step 8 — Build and sync 🔧

```powershell
npm run build
npx cap sync android
npx cap open android
```

`npx cap open android` opens the project in Android Studio.

---

## Step 9 — Generate signed AAB 🔧

In Android Studio:

1. **Build → Generate Signed Bundle / APK**
2. Choose **Android App Bundle**
3. Select your keystore file, enter alias and passwords
4. Choose **release** build variant
5. Click **Finish** — the `.aab` file is generated in `android/app/release/`

---

## Step 10 — Upload to Play Console 🔧

1. Play Console → your app → **Testing → Internal testing → Create new release**
2. Upload the `.aab` file
3. Add release notes (in French and English)
4. **Save and roll out**
5. Under **Testers**, add your own Google account email
6. Follow the opt-in link that appears → install the app on a physical Android device
7. Smoke test: complete a level, check sign-in, check that ads load (if M3 is done)

---

## Step 11 — Store listing 🔧

Play Console → **Store Presence → Main store listing**:

| Field | Content |
|-------|---------|
| App name | Le Château de Jolyne |
| Short description | Jeu éducatif d'orthographe et de maths pour enfants (max 80 chars) |
| Full description | (see below) |
| Screenshots (phone) | At least 2, 16:9, 1080×1920 recommended |
| Screenshots (7" tablet) | At least 1 |
| Feature graphic | 1024×500 px (banner image) |
| App icon | 512×512 px (same as `public/icon-512.png`) |

**Privacy policy URL** (required for children's apps): host a simple page on GitHub Pages or any static host. Minimum content: what data you collect (none beyond Firebase Auth), COPPA statement, contact email.

---

## Step 12 — Submit for review 🔧

1. **App content** section: fill in all questionnaires (ads, target audience, content rating)
2. Make sure all green checkmarks are showing in the Dashboard
3. Click **Submit for review**

Google typically reviews children's apps within **3–7 days**.

---

## Checklist

- [ ] Play Console account created ($25)
- [ ] Firebase project created
- [ ] `google-services.json` placed at `android/app/google-services.json`
- [ ] Firestore security rules published
- [ ] Release keystore generated and backed up
- [ ] SHA-1 added to Firebase Console
- [ ] `firebase.js` filled in with real config
- [ ] `build.gradle` signing config working
- [ ] App icons in all mipmap folders
- [ ] Signed AAB generated
- [ ] AAB uploaded to Internal Testing track
- [ ] Tested on physical device
- [ ] Store listing complete (screenshots, descriptions, icon, feature graphic)
- [ ] Privacy policy URL added
- [ ] Submitted for review
