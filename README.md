# 🏰 Le Monde de Jolyne

An educational 2D RPG built with **Phaser 4** for a young French child learning to spell and do arithmetic. The princess Jolyne explores a castle labyrinth and an icy dungeon — unlocking gates by spelling words correctly and defeating monsters by solving additions.

[Accès au jeu](https://mfaurel.github.io/jojo-game/)

---

## Game modes

### 🏰 Orthographe — The Spelling Castle

Move Jolyne through a castle labyrinth with **arrow keys**, **WASD**, or the **on-screen D-pad** (touch/tablet friendly).

- Walk into a locked gate to trigger a spelling challenge
- **Tap the letter tiles** in the correct order to spell the word shown in the picture
- Unlock all 5 gates to reach the throne room and complete the level
- 5 themed levels, each with 5 French words ordered by difficulty

| Level | Theme | Words |
|-------|-------|-------|
| 1 | Le Château | ROI, CHAT, TOUR, OURS, LUNE |
| 2 | Les Animaux | COQ, OIE, LION, LOUP, CERF |
| 3 | La Nature | EAU, BOIS, MONT, VENT, CIEL |
| 4 | La Cuisine | PAIN, LAIT, NOIX, MIEL, OEUF |
| 5 | La Maison | VELO, AUTO, BAIN, FOUR, VASE |

No punishment on wrong answers — a gentle *"Essaie encore ! 💛"* and a retry.

---

### ❄️ Mathématiques — The Math Dungeon Crawler

A first-person dungeon crawler where Jolyne walks forward automatically and encounters monsters.

- **Defeat monsters** by solving an addition problem on a keypad (`num1 + num2 = ?`)
- **Open treasure chests** the same way for bonus points
- Reach the **points target** to complete the world and unlock the next
- 3 worlds of increasing difficulty:

| World | Theme | Range | Target |
|-------|-------|-------|--------|
| 1 | La Toundra ❄️ | 1–5 + 1–5 | 1200 pts |
| 2 | Le Pays Sucré 🍭 | 1–8 + 1–8 | 1200 pts |
| 3 | La Prairie 🌸 | 1–10 + 1–10 | 1200 pts |

Worlds unlock sequentially — complete one to access the next.

---

### 🎁 Collection & Récompenses — Reward System

After completing any level (spelling or math), Jolyne rolls for a **random loot drop**:

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

Items are organised into three categories in the **Collection** screen (`🎁 Collection` button on the main menu):

| Tab | Slot | Items |
|-----|------|-------|
| 🏰 Orthographe | Personnage | Jolyne Pixel (default), Robe Rose 🌸, Princesse d'Or 👑 |
| ❄️ Mathématiques | Bras Gauche | Bouclier de Bois 🛡️, Gant Magique 🧤 |
| ❄️ Mathématiques | Bras Droit | Épée de Fer ⚔️, Baguette d'Étoile ⭐ |
| 🌟 Bonus | Fond d'écran | Nuit Étoilée (default), Château Royal, Galaxie Rose |

Equipped items are applied immediately in-game:
- **Skin** — tints the Jolyne sprite (pink or gold) in the spelling castle, menu screens, and victory scenes
- **Bras Gauche / Droit** — replaces the dungeon crawler arm drawings (teddy bear → shield, wand → sword)
- **Fond d'écran** — changes the main menu background colour theme

#### Special completion rewards
Complete **all 5 spelling levels** to unlock the *Expert en Orthographe* artwork.
Complete **all 3 math worlds** to unlock the *Maître des Maths* artwork.
Both unlock a full-screen image viewable in the Collection screen.

---

## Cheat code

On the main menu, press **↑ ↑** to instantly unlock all items in the collection.

---

## Technical notes

- **No external assets** — every visual is drawn with the Phaser `Graphics` API or generated textures
- **No audio files** — all sounds synthesised at runtime via the Web Audio API
- **Pixel art sprite** (`jojopixelart_cut.png`) loaded from `public/resources/` and tinted at runtime for skins
- Grid-based movement (16 × 12 tiles × 64 px = 1024 × 768, no camera scroll)
- Spelling challenge and math problem run as overlay scenes on top of the main scene
- All progress and inventory stored in `localStorage` — survives page refresh

---

## Project structure

```
src/
  main.js                        # DOM bootstrap
  game/
    main.js                      # Phaser config + scene registry
    data/
      MapData.js                 # Tile grid, gate positions, constants
      WordData.js                # French word list + picture draw functions
      LevelData.js               # Spelling progress, inventory, equipment (localStorage)
      MathWorldData.js           # Math world definitions + progress (localStorage)
      ItemData.js                # All unlockable items with rarity, tint, emoji
    scenes/
      Boot.js                    # First scene
      Preloader.js               # Asset loading + particle texture generation
      MainMenu.js                # Title screen with background theming + cheat code
      SpellingMenu.js            # Level select for spelling
      CastleScene.js             # Spelling gameplay (orchestrator)
      SpellingScene.js           # Spelling challenge overlay
      VictoryScene.js            # Spelling end-of-level celebration
      MathWorldSelectScene.js    # World select for math
      MathDungeon.js             # Math dungeon crawler + procedural arm drawings
      MathProblemScene.js        # Math addition challenge overlay
      MathVictoryScene.js        # Math world completion celebration
      RewardPopup.js             # Loot reveal popup
      CollectionScene.js         # Tabbed inventory & equip screen
    systems/
      MapBuilder.js              # Draws castle tiles
      PlayerController.js        # Jolyne sprite, grid movement, D-pad
      GateManager.js             # Gate graphics and unlock logic
      AudioManager.js            # Web Audio tone generator
      LootManager.js             # Gacha roll logic with duplicate protection
public/
  assets/                        # SVG UI tiles
  resources/                     # Pixel art images (served as static assets)
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

Open `src/game/data/WordData.js` and add a new entry:

```js
ARBRE: {
  answer: 'ARBRE',
  letters: ['A', 'R', 'B', 'R', 'E', 'T'],  // correct letters + distractors
  drawPicture(gfx, cx, cy, r) {
    // draw using gfx.fillRect, gfx.fillCircle, etc.
  }
}
```

Then reference the key in a gate definition in `src/game/data/MapData.js`.

## Adding more levels

Create a new `MapDataN.js` file, define the tile grid and gate positions, then register the scene in `src/game/main.js`.

---

## Tech stack

| Library | Version |
|---------|---------|
| [Phaser](https://phaser.io) | 4.0.0 |
| [Vite](https://vitejs.dev) | 6.x |

## Credits

Pixel art visuals by Zsky — https://www.patreon.com/Zsky  
UI assets by Kenney.nl
