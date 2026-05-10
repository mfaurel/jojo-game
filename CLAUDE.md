# Le Château de Jolyne — Claude Guidelines

Educational Phaser 4 spelling/math/memory RPG for children. Vite + ES modules, Firebase backend, Capacitor for Android, deployed on GitHub Pages.

## Build Verification

After any multi-file edit to scenes, data files, or game logic, run `npm run build-nolog` and check for:
- Stray syntax or missing imports
- Unregistered scenes (all scenes must be listed in `src/game/main.js`)
- Broken i18n keys (every new string must be added to all three locales: `fr`, `en`, `es` in `I18n.js`)

If the build fails, fix root causes — do not skip or suppress errors.

## Testing

Run `npm run test:run` after changes to data modules, systems, or services. Tests live in `__tests__/` subdirectories next to their source files. Use Vitest — not Jest.

This is a **Windows environment**. Use PowerShell syntax in shell commands (`$env:VAR`, backtick for line continuation, `;` not `&&`). The Bash tool is available for POSIX scripts when needed.

## Architecture

- **Data modules** (`src/game/data/`): Pure JS, no Phaser dependency. Add new words in `WordData.js`, new levels as entries in `LevelData.js` / `MemoryData.js` / `MathWorldData.js` / `CountingData.js`.
- **Scenes** (`src/game/scenes/`): Phaser Scene classes. All must be registered in `src/game/main.js`.
- **Systems** (`src/game/systems/`): Reusable Phaser helpers (player, map, gates, loot, audio).
- **Services** (`src/game/services/`): Firebase auth/save, AdMob, IAP, back button, i18n, child name.
- **i18n**: All user-visible strings go through `t()` from `I18n.js`. Three locales: `fr` (default), `en`, `es`.

## Adding Content

**New spelling level**: add an entry to `LEVELS` in `LevelData.js` + a map layout in `MapData.js` (must have exactly 5 gate positions matching the 5 words).

**New word**: add to `WORD_CONCEPTS` in `WordData.js` with `fr`/`en`/`es` variants and a `drawPicture(gfx, cx, cy, r)` function.

**New i18n key**: add to all three locale objects in `I18n.js` simultaneously.

**New item/skin/background**: add to `ITEMS` in `ItemData.js` with a valid `rarity` from the `RARITY` enum.

## Visual & Layout Changes

Default to **larger, bolder** values for tiles, sprites, and UI elements — small initial sizes have repeatedly required rework. When modifying layout or scaling, verify with a Playwright screenshot before declaring done.

## Phaser API Usage

Before using a Phaser method, verify it exists in **Phaser 4** (not Phaser 3 — the API changed). Known pitfalls:
- `Graphics.setTint` does not exist on Graphics objects
- Particle emitter API changed significantly between v3 and v4
- Method chaining on emitter events can crash silently at runtime

## DOM / Scraping / Extensions

Before writing selectors for scraping or Chrome extensions, fetch and inspect the actual HTML structure. Do not assume class placement on parent elements.

## Dependencies

- Capacitor is pinned to **v8**. All `@capacitor/*` packages must stay on v8.
- `@codetrix-studio/capacitor-google-auth` is stuck at v3 (Capacitor 6 only) — suppressed via `npm overrides` in `package.json`. Do not upgrade it without checking for a v4+ release.
- Use `npm ci` (not `npm install`) in CI. The lock file must be committed and up to date.
