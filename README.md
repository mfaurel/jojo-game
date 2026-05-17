# 🏰 Le Monde de Jolyne

An educational 2D RPG built with **Phaser 4** for a young child (target age: 4+) learning to spell, recognise words, count, and do arithmetic. The princess Jolyne explores a castle labyrinth, an icy dungeon, a memory palace, and more — unlocking content by completing challenges.

[Accès au jeu](https://mfaurel.github.io/jojo-game/)

---

## Game modes

### 🏰 Orthographe — The Spelling Castle

Move Jolyne through a castle labyrinth with **arrow keys**, **WASD**, or the **on-screen D-pad** (touch/tablet friendly).

- Walk into a locked gate to trigger a spelling challenge
- **Tap the letter tiles** in the correct order to spell the word shown in the picture
- Unlock all 5 gates to reach the throne room and complete the level
- **10 themed levels, each with a distinct maze layout** for replayability
- A picture preview of the word to spell is shown above each gate
- After 2 failed attempts on the same word, the first correct letter flashes gold as a hint

| Level | Theme | Words (FR / EN / ES) |
|-------|-------|----------------------|
| 1 | Le Château 🏰 | ROI, CHAT, TOUR, OURS, LUNE |
| 2 | Les Animaux 🐾 | COQ, OIE, LION, LOUP, CERF |
| 3 | La Nature 🌿 | EAU, BOIS, MONT, VENT, CIEL |
| 4 | La Cuisine 🍞 | PAIN, LAIT, NOIX, MIEL, OEUF |
| 5 | La Maison 🏠 | VELO, AUTO, BAIN, FOUR, VASE |
| 6 | La Famille 👨‍👩‍👧 | PAPA, MAMAN, BEBE, TATA, PAPI |
| 7 | Les Couleurs 🌈 | BLEU, ROSE, NOIR, VERT, GRIS |
| 8 | Le Corps 🤸 | NEZ, BRAS, MAIN, PIED, TETE |
| 9 | Les Fruits 🍎 | KIWI, POIRE, POMME, FIGUE, PRUNE |
| 10 | La Ferme 🐄 | VACHE, LAPIN, POULE, CHIEN, PONEY |

Levels 1–6 are always unlocked; levels 7–10 unlock one-by-one after completing the previous level.

Each level uses a **different maze shape** (S-shape, U-shape, reverse-S, vertical S, perimeter box, …) so the path feels fresh every time.

No punishment on wrong answers — a gentle *"Essaie encore ! 💛"* and a retry.

---

### ❄️ Mathématiques — The Math Dungeon Crawler

A first-person dungeon crawler where Jolyne walks forward automatically and encounters monsters.

- **Defeat monsters** by solving an arithmetic problem on a keypad
- **Open treasure chests** the same way for bonus points
- Reach the **points target** to complete the world and unlock the next
- 6 worlds of increasing difficulty, split across two tracks:

| World | Theme | Range | Operation | Target |
|-------|-------|-------|-----------|--------|
| 1 | La Toundra ❄️ | 1–5 + 1–5 | Addition | 1200 pts |
| 2 | Le Pays Sucré 🍭 | 1–8 + 1–8 | Addition | 1200 pts |
| 3 | La Prairie 🌸 | 1–10 + 1–10 | Addition | 1200 pts |
| 4 | Le Volcan 🌋 | 1–5 − 1–5 | Subtraction | 1200 pts |
| 5 | L'Océan 🌊 | 1–10 − 1–10 | Subtraction | 1200 pts |
| 6 | L'Espace 🚀 | 1–15 − 1–15 | Subtraction | 1200 pts |

Worlds 1 and 4 are always unlocked; other worlds unlock sequentially within each track.

---

### 🃏 Mémoire — Memory Card Game

A classic flip-and-match memory game.

- Cards are laid face-down on a grid — tap two to flip them
- Pairs of cards show the **same picture** (language-independent concept drawings)
- Match all pairs to complete the level
- **9 levels** of increasing grid size:

| Levels | Grid | Pairs |
|--------|------|-------|
| 1–3 | 4 × 2 | 4 pairs (8 cards) |
| 4–6 | 4 × 3 | 6 pairs (12 cards) |
| 7–9 | 4 × 4 | 8 pairs (16 cards) |

Levels cover animal, fruit, and family themes. Card backs are customisable via the Collection.

---

### 🔢 Chiffres — Counting Game

A quick-fire counting game that trains number recognition.

- A group of objects (animals or fruits) is shown briefly on screen
- Then they disappear — tap the number button that matches how many you saw
- **5 levels** with increasing number of object types, higher counts, and shorter display times:

| Level | Object types | Count range | Show time |
|-------|-------------|-------------|-----------|
| 1 | 2 | 1–3 | 5 s |
| 2 | 2 | 1–4 | 5 s |
| 3 | 3 | 1–4 | 5 s |
| 4 | 3 | 1–5 | 5 s |
| 5 | 3 | 1–5 | 4 s |

Each level is 6 rounds; levels unlock one-by-one.

---

### 🎁 Collection & Récompenses — Reward System

After completing any level (spelling, math, memory, or counting), Jolyne rolls for a **random loot drop**:

#### Rarity tiers
| Rarity | Chance | Colour |
|--------|--------|--------|
| Commun | 50% | White |
| Peu Commun | 25% | Green |
| Rare | 15% | Blue |
| Épique | 7% | Purple |
| Légendaire | 3% | Orange |

Duplicate protection: the system never awards an item you already own. If a tier is exhausted it falls back to the next lower tier automatically.

#### Unlockable content

Items are organised into categories in the **Collection** screen (`🎁 Collection` button on the main menu):

| Tab | Slot | Items |
|-----|------|-------|
| 🏰 Orthographe | Personnage | Jolyne Pixel (default), Robe Rose 🌸, Princesse d'Or 👑 |
| ❄️ Mathématiques | Bras Gauche | Bouclier de Bois 🛡️, Gant Magique 🧤 |
| ❄️ Mathématiques | Bras Droit | Épée de Fer ⚔️, Baguette d'Étoile ⭐ |
| 🃏 Mémoire | Dos de carte | Jolyne (default), other card back designs |
| 🌟 Bonus | Fond d'écran | Nuit Étoilée (default), Château Royal, Galaxie Rose, Château d'Orthographe |

Equipped items are applied immediately in-game:
- **Skin** — tints the Jolyne sprite in the spelling castle, menu screens, and victory scenes
- **Bras Gauche / Droit** — replaces the dungeon crawler arm drawings
- **Dos de carte** — changes the card back design in the memory game
- **Fond d'écran** — changes the main menu background colour theme

#### Special completion rewards
Complete **all 10 spelling levels** to unlock the *Expert en Orthographe* artwork.
Complete **all 6 math worlds** to unlock the *Maître des Maths* artwork.
Both unlock a full-screen image viewable in the Collection screen.

---

## Stars leaderboard

A **⭐ Mes étoiles** panel in the bottom-left corner of the main menu tracks progress across every mode:

| Mode | Max stars |
|------|-----------|
| 🏰 Orthographe | 10 |
| 🃏 Mémoire | 9 |
| 🔢 Chiffres | 5 |
| ➕ Maths | 6 |

The panel shows stars earned per mode and the running total.

---

## Internationalisation (i18n)

The game supports **French, English, and Spanish**. A language toggle button (**FR / EN / ES**) in the top-right corner of the main menu cycles between languages. The selection persists via `localStorage`.

All word definitions carry FR / EN / ES spelling variants and letter pools. The picture drawn above each gate / on each memory card is language-independent (concept-based).

---

## 4-year-old UX features

- **Large D-pad buttons** (70 × 70 px) for small fingers
- **Instant audio feedback** on every letter tap, card flip, and step
- **Gate picture previews** at 44 px radius — large enough to recognise on a tablet
- **Pulsing 🏆 trophy** above the goal tile so the child knows where to aim
- **First-letter hint** flashes gold after 2 failed spelling attempts
- **"Essaie encore !"** text and screen shake on wrong math answers; input is locked briefly so button spam doesn't stack messages
- **Backspace** in math deletes one digit (not the whole answer)
- **Progress badges** on the main menu buttons once any level is completed
- **Fullscreen button** on the main menu for tablet play

---

## Cheat code

On the main menu, press **↑ ↑** to instantly unlock all items in the collection.

---

## Easter egg

A secret ⭐ star appears next to the Collection button. Visit the Collection screen once to reveal and unlock it — it is counted in the leaderboard total.

---

## Progressive Web App (PWA)

The game can be **installed** directly from the browser as a PWA (Add to Home Screen on mobile, or the install icon in desktop Chrome/Edge). It works offline after the first load.

---

## Android / Play Store

The game is wrapped as a native Android app via **Capacitor** (app ID `fr.esante.lechateaudejolyne`).

The Android build includes:

| Feature | Detail |
|---------|--------|
| AdMob | Banner ad at the bottom of the main menu + rewarded video |
| Google Sign-In | Optional account link to enable cloud saves |
| Firebase cloud saves | Progress synced to Firestore; merged on sign-in |
| In-App Purchases | `unlock_child_name` (personalise Jolyne's name), `premium_bundle` (cosmetics) |
| Parental gate | Simple arithmetic overlay guards IAP / sign-in flows from accidental taps |
| Back button | Hardware back navigates naturally; double-back from main menu shows exit confirmation |

To build the Android app:

```bash
npm run build-nolog
npx cap sync android
# then open android/ in Android Studio and run / release as usual
```

---

## Technical notes

- **No external assets** — every visual is drawn with the Phaser `Graphics` API or generated textures
- **No audio files** — all sounds synthesised at runtime via the Web Audio API
- **Pixel art sprite** (`jojopixelart_cut.png`) loaded from `public/resources/` and tinted at runtime for skins
- Grid-based movement (16 × 12 tiles × 64 px = 1024 × 768, no camera scroll)
- Spelling challenge and math problem run as overlay scenes on top of the main scene
- All progress and inventory stored in `localStorage` — survives page refresh
- On Android, progress is additionally synced to **Firestore** when signed in

---

## Project structure

```
src/
  main.js                          # DOM bootstrap
  game/
    main.js                        # Phaser config + scene registry
    data/
      MapData.js                   # Ten maze layouts (LEVEL_MAPS), gate positions, tile constants
      WordData.js                  # Word list with FR/EN/ES variants + language-agnostic picture draw functions
      I18n.js                      # i18n strings for FR/EN/ES, getLang/setLang/cycleLang/t()
      LevelData.js                 # Spelling progress, inventory, equipment (localStorage)
      MathWorldData.js             # Math world definitions + progress (localStorage)
      ItemData.js                  # All unlockable items with rarity, tint, emoji
      MemoryData.js                # Memory level definitions + progress (localStorage)
      CountingData.js              # Counting level definitions + progress (localStorage)
    scenes/
      Boot.js                      # First scene
      Preloader.js                 # Asset loading + particle texture generation
      MainMenu.js                  # Title screen with language toggle, background theming, leaderboard, cheat code
      SpellingMenu.js              # Level select for spelling (10 levels)
      CastleScene.js               # Spelling gameplay (orchestrator, picks maze by levelIndex)
      SpellingScene.js             # Spelling challenge overlay
      VictoryScene.js              # Spelling end-of-level celebration
      MathWorldSelectScene.js      # World select for math (6 worlds)
      MathDungeon.js               # Math dungeon crawler + procedural arm drawings
      MathProblemScene.js          # Math addition/subtraction challenge overlay
      MathVictoryScene.js          # Math world completion celebration
      MemoryMenuScene.js           # Level select for memory (9 levels)
      MemoryScene.js               # Memory card game
      CountingMenuScene.js         # Level select for counting (5 levels)
      CountingScene.js             # Counting game
      RewardPopup.js               # Loot reveal popup
      CollectionScene.js           # Tabbed inventory & equip screen
      ParentalGateScene.js         # Arithmetic overlay guarding IAP / sign-in
      ExitConfirmScene.js          # Android back-button exit confirmation
      EndingScene.js               # End-game cinematic (triggered on 100% completion)
      InfiniteMathScene.js         # Infinite math mode (endless problem stream)
    systems/
      MapBuilder.js                # Draws castle tiles
      PlayerController.js          # Jolyne sprite, grid movement, D-pad (70px buttons)
      GateManager.js               # Gate graphics and unlock logic (language-aware word lookup)
      AudioManager.js              # Web Audio tone generator (playLetterTap, playStep, playWrong, …)
      LootManager.js               # Gacha roll logic with duplicate protection
    services/
      AdService.js                 # AdMob banner + rewarded video (Capacitor)
      AuthService.js               # Google Sign-In (Capacitor)
      IAPService.js                # In-App Purchases (Capacitor / @capgo/native-purchases)
      SaveService.js               # Firebase Firestore cloud save sync
      NameService.js               # Child name customisation (unlocked via IAP)
      BackButtonHandler.js         # Android hardware back button routing
      firebase.js                  # Firebase app + Firestore init
      AchievementService.js        # Achievement catalogue, unlock logic, localStorage persistence
      AchievementChecks.js         # Cross-mode completion checks that trigger achievements
      AchievementToast.js          # In-game toast notification for newly unlocked achievements
public/
  assets/                          # SVG UI tiles
  resources/                       # Pixel art images (served as static assets)
android/                           # Capacitor Android project
```

---

## Requirements

[Node.js](https://nodejs.org) (v18 or later)

## Local development

```bash
npm install
npm run dev-nolog
```

Open **http://localhost:8080** in your browser. Live-reload is enabled.

## Production build

```bash
npm run build-nolog
```

Output is written to `dist/`. Upload its contents to any static web host.

## Deploying to GitHub Pages

Push to GitHub and enable **GitHub Pages** in repository settings:

1. **Settings → Pages**
2. Under *Source*, select **GitHub Actions**

The included workflow (`.github/workflows/deploy.yml`) builds and publishes automatically on every push to `main`. The game will be live at:

```
https://<your-github-username>.github.io/<repository-name>/
```

---

## Adding more words

Open `src/game/data/WordData.js` and add a new entry inside `WORD_CONCEPTS`:

```js
ARBRE: {
  fr: { answer: 'ARBRE', letters: ['A','R','B','R','E','T'] },
  en: { answer: 'TREE',  letters: ['T','R','E','E','A','O'] },
  es: { answer: 'ARBOL', letters: ['A','R','B','O','L','I'] },
  drawPicture(gfx, cx, cy, r) {
    // draw using gfx.fillRect, gfx.fillCircle, etc. (language-independent)
  }
}
```

Then reference the key in the `words` array of the relevant level in `src/game/data/LevelData.js`.

## Adding more spelling levels

Add a new entry to `LEVELS` in `LevelData.js` and a corresponding maze layout to `LEVEL_MAPS` in `MapData.js` (grid 16×12, gate positions, player start, goal tile).

## Adding more memory levels

Add an entry to `MEMORY_LEVELS` in `src/game/data/MemoryData.js`. Specify `cols`, `rows`, `cardSize`, `gap`, and the `words` array (keys from `WORD_CONCEPTS`).

## Adding more counting levels

Add an entry to `COUNTING_LEVELS` in `src/game/data/CountingData.js`. Specify `types` (number of distinct object types per round), `maxCount`, `showTime` (ms), and a `pool` of word keys.

---

## Tech stack

| Library | Version |
|---------|---------|
| [Phaser](https://phaser.io) | 4.0.0 |
| [Vite](https://vitejs.dev) | 6.x |
| [Capacitor](https://capacitorjs.com) | 8.x |
| @capacitor-community/admob | — |
| @capgo/native-purchases | — |
| Firebase (Firestore) | — |

## Credits

Pixel art visuals by Zsky — https://www.patreon.com/Zsky  
UI assets by Kenney.nl
