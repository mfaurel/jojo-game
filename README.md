# 🏰 Le Château de Jolyne

An educational 2D RPG game built with **Phaser 4** for a 4-year-old French child learning to spell. The princess Jolyne is trapped in a castle labyrinth — she can only pass through locked gates by correctly spelling the word shown in a picture.

## Gameplay

- Move Jolyne with **arrow keys**, **WASD**, or the **on-screen D-pad** (touch/tablet friendly)
- Walk into a locked gate to trigger a spelling challenge
- **Tap the letter tiles** in the correct order to spell the word shown in the picture
- Unlock all 5 gates to reach the throne room and win

The first level features 5 French words ordered by difficulty:

| Gate | Word | Meaning |
|------|------|---------|
| 1 | ROI | King |
| 2 | CHAT | Cat |
| 3 | TOUR | Tower |
| 4 | OURS | Bear |
| 5 | LUNE | Moon |

No punishment on wrong answers — just a gentle "Essaie encore ! 💛" and a retry.

## Technical notes

- **No external assets** — every visual is drawn with the Phaser `Graphics` API
- **No audio files** — all sounds are generated at runtime via the Web Audio API
- Grid-based movement (16 × 12 tiles at 64 px = exactly 1024 × 768, no camera scroll)
- Spelling challenge runs as an overlay scene on top of the castle scene
- Vocabulary is fully defined in `src/game/data/WordData.js` — add new words there
- New levels can be added as new `MapData` files without touching any other system

## Project structure

```
src/
  main.js                    # DOM bootstrap
  game/
    main.js                  # Phaser game config + scene registry
    data/
      MapData.js             # Tile grid, gate positions, constants
      WordData.js            # French word list + picture draw functions
    scenes/
      Boot.js                # First scene — sets background
      Preloader.js           # Generates shared textures
      MainMenu.js            # Castle title screen
      CastleScene.js         # Main gameplay (orchestrator)
      SpellingScene.js       # Spelling challenge overlay
      VictoryScene.js        # End-of-level celebration
    systems/
      MapBuilder.js          # Draws castle tiles with Graphics API
      PlayerController.js    # Jolyne sprite, grid movement, D-pad
      GateManager.js         # Gate graphics, unlock logic
      AudioManager.js        # Web Audio tone generator
```

## Requirements

[Node.js](https://nodejs.org) (v18 or later)

## Local development

```bash
npm install
npm run dev-nolog
```

Open **http://localhost:8080** in your browser.

Live-reload is enabled — editing any file in `src/` will instantly refresh the page.

## Production build

```bash
npm run build-nolog
```

The output is written to the `dist/` folder. Upload its contents to any static web host.

## Deploying to GitHub Pages

Push the repository to GitHub, then enable **GitHub Pages** in the repository settings:

1. Go to **Settings → Pages**
2. Under *Source*, select **GitHub Actions**

The included workflow (`.github/workflows/deploy.yml`) will automatically build and publish the game whenever you push to the `main` branch. Your game will be available at:

```
https://<your-github-username>.github.io/<repository-name>/
```

## Adding more words

Open `src/game/data/WordData.js` and add a new entry:

```js
export const WORDS = {
  // existing words…

  ARBRE: {
    answer: 'ARBRE',
    letters: ['A', 'R', 'B', 'R', 'E', 'T'],  // correct letters + distractors
    drawPicture(gfx, cx, cy, r) {
      // draw a tree using gfx.fillRect, gfx.fillCircle, etc.
    }
  },
};
```

Then reference the new word key in a gate definition inside `src/game/data/MapData.js`.

## Tech stack

| Library | Version |
|---------|---------|
| [Phaser](https://phaser.io) | 4.0.0 |
| [Vite](https://vitejs.dev) | 6.x |

## Credits
Thanks of visuals from Zsky https://www.patreon.com/Zsky
Thanks of visual frome Kenney.nl 