# Le Château de Jolyne — Roadmap

> Reference docs: `docs/achievement_plann.md` · `docs/ANDROID_PLAN.md`

---

## 1. Bugs

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| B1 | Bonus star (31st) clipped top-right in CollectionScene | `CollectionScene.js:63–108` | XS | ✅ **Fixed** — star moved to y=40 |
| B2 | Stars clipped during Félicitations phase in VictoryScene | `VictoryScene.js:361–382` | XS | ✅ **Fixed** — `setOrigin(0.5, 0)` applied |

---

## 2. Content & Assets

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| C1 | Asset gallery HTML page | new `docs/gallery.html`; inline `WordData.js` / `ItemData.js` drawPicture calls via Canvas | M | Single static page renders every word sprite + item sprite in a grid — no server needed |
| C2 | Update / refresh sprites | `WordData.js`, `ItemData.js` drawPicture functions | M–L | Visual pass on each `drawPicture` fn, child-test approved |

---

## 3. Core Features

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| F2 | Browser locale auto-detect | `I18n.js:524–527` (`getLang`) | XS | First launch uses `navigator.language.slice(0,2)` if it matches a SUPPORTED locale, falls back to `'fr'` |
| F3 | Infinite math mode | new `InfiniteMathScene.js`; add entry in `MathWorldSelectScene.js`; register in `main.js` | M | Endless problem stream, score counter, exits cleanly to MathWorldSelectScene |
| F4 | Deusgames intro/logo scene | new `IntroScene.js`; register in `main.js`; boot chain: Boot → IntroScene → Preloader | S | 2–3 s logo animation on first launch (or every launch); skippable on tap |
| F5 | End-game cinematic (all stars) | new `EndingScene.js` or extend `CollectionScene.js`; trigger when all 30+1 stars earned | M | Cinematic plays once on 100 % completion; not re-triggered |
| F6 | MathDungeon atmosphere improvements | `MathDungeon.js` — parallax layers, entrance animation, smoother torch flicker | M | Children feel "in a dungeon"; validated with a child playtester |

---

## 4. Premium Content

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| P1 | Premium skins (girl / boy variants) | `ItemData.js` (new RARITY entries), `CollectionScene.js` skin renderer | S | 2+ new skins visible in Collection tab 0; IAP gate respected |

---

## 5. Localisation

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| L1 | German (de) | `I18n.js` — add `de` to SUPPORTED + full string object; update `I18n.test.js` | L | All `t()` keys return German strings; lang cycle includes `'de'` |
| L2 | Chinese Simplified (zh) | `I18n.js` — add `zh` locale; verify CJK font fallback on Android | L | All strings display correctly in zh; no font rendering issues on device |

---

## 6. Platform & Monetisation

| # | Item | Key files | Effort | Done when |
|---|------|-----------|--------|-----------|
| M1 | Google Play Store release | `docs/ANDROID_PLAN.md`; `capacitor.config.ts`, `android/` directory | XL | Signed AAB in Play Console; app passes review |
| M2 | Google Sign-In | `@codetrix-studio/capacitor-google-auth` (already in deps); `AuthService.js` | M | User can sign in with Google on Android; progress syncs to Firestore |
| M3 | Advertisements (AdMob) | `AdService.js` already exists; wire interstitial between levels / after game over | S | Ad shown at appropriate moments; parental gate bypasses ads |
| M4 | Facebook Sign-In | new Capacitor plugin + `AuthService.js` extension | M | User can sign in with Facebook; same Firestore sync as Google |
| M5 | iOS App (paid or ads) | `ios/` Capacitor target; App Store Connect | XL | App passes App Store review; monetisation model chosen |

### 7 Reste à faire
Corriger les bugs
Sur la page d'accueil, enlever l'étoile à Collection
Dans les jeux Orthographe, vérifier les images et les mettre à jour
Dans la collection, ce n'est pas bien centré. Centre correctement que ça soit quand on met en full screenn, qu'on sorte du full screen ou qu'on resize la fenetre
Dans la collection, je veux que ça soit l'onglet Orthographe par défaut
Dans la collection, supprime l'étoile qui bouge en haut à droite. Je veux que la 31ème étoile soit gagnée gâce à l'étoile présente dans le titre 'collectionTitle'
Dans la collection bonus, supprimme la classe dans les fonds de menu principal. Cette image doit être toujours gagnée et faire partie des "Récompenses Spéciales"
Dans la collection Orthographe, je veux qu'il y ait écrit "Robe classique" pour le premier avatar.
Dans la collection Mathématiques, certainns émojis sont coupé et one ne voit pas le haut de l'émoji de quelques pixels. Il faut corriger ça.
Dans le jeu mémo chiffres, le passage à l'écran suivant va trop vite quand on gagne, laisse savourer le joueur.
Monntrer l'achievement qui apparait plus longtemps (3 secondes)
Mieux centrer les achievements dans la collection
---

## Effort key

`XS` < 1 h · `S` 1–4 h · `M` 4–16 h · `L` 16–40 h · `XL` > 40 h
Effort key
XS < 1 h · S 1–4 h · M 4–16 h · L 16–40 h · XL > 40 h


