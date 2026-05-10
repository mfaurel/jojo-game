# Plan: Achievement System

## Context
The game has no achievement system. Adding one increases replayability, rewards exploration (trivial achievements), and gives players clear goals for completionists. The deliverables are: a design doc `achievement.md` at the repo root, a pure-JS `AchievementService`, a Phaser toast helper, a 5th "Achievements" tab in CollectionScene, I18n keys in all 3 locales, Vitest tests, and integration into 6 existing scenes.

---

## The 10 Achievements

| ID | Name (FR) | Condition | Reward | Difficulty |
|----|-----------|-----------|--------|------------|
| `welcome` | Bienvenue ! | First game launch (Boot.js) | Badge only | Trivial |
| `linguist` | Linguiste | Switch language once | Badge only | Trivial |
| `explorer` | Exploratrice | Open Collection screen | Badge only | Trivial |
| `first_spell` | Premiers Mots | Complete ≥1 spelling level | Grants `bg_castle` | Easy |
| `first_memory` | Première Mémoire | Complete ≥1 memory level | Grants `card_back_stars` | Easy |
| `all_counting` | Maître·sse des Chiffres | Complete all 5 counting levels | Grants `bg_galaxy` | Medium |
| `all_spelling` | Reine des Mots | Complete all 10 spelling levels | Badge only (special_spelling already auto-granted) | Hard |
| `all_memory` | Mémoire de Champion | Complete all 9 memory levels | Grants `card_back_rainbow` | Hard |
| `all_math` | Mathématicien·ne | Complete all 6 math worlds | Badge only (special_math already auto-granted) | Hard |
| `all_stars` | Toutes les Étoiles | 100 % all 4 games (30 stars) | Grants `skin_gold` | Perfectionist |

---

## Data Model

**localStorage key:** `jolyne_achievements`
**Schema:** `{ [achievementId]: { unlocked: boolean, unlockedAt: number|null } }`
Missing ids normalised to `{ unlocked: false, unlockedAt: null }` on read.

Add `'jolyne_achievements'` to the `SAVE_KEYS` array in `SaveService.js` — it is then automatically included in Firestore cloud sync.

---

## Files to Create

### `src/game/services/AchievementService.js`
Pure JS (no Phaser). Imports only `addToInventory` from `../data/LevelData.js`.

Exports:
- `ACHIEVEMENTS` — static array of 10 `{ id, nameKey, descKey, reward }` objects
- `getAchievements()` — returns normalised map from localStorage
- `isUnlocked(id)` → boolean
- `unlockAchievement(id)` → `{ wasNew, rewardItemId }` — writes localStorage, calls `addToInventory` if reward && wasNew
- `checkAndUnlock(id)` — alias for `unlockAchievement`
- `getUnlockedCount()` → number
- `getProgress()` → `{ unlocked, total }`

### `src/game/services/AchievementToast.js`
Phaser display helper. `showAchievementToast(scene, achievementId, rewardItemId)`.
- Semi-transparent panel at `(cameras.main.width/2, 90)`, depth 200
- Trophy `🏆`, achievement name (gold), description (lilac), optional reward line
- Slides in with `Back.Out` (300 ms), auto-destroys after 3 s
- Module-level `_toastQueue` counter offsets `y` by 90 per stacked toast

### `src/game/services/AchievementChecks.js`
Shared helper to avoid duplicating the `all_stars` logic across 4 scenes.

```js
export function checkAllStars() {
    const spellingDone = Object.keys(getProgress()).length >= LEVELS.length;
    const mathDone     = MATH_WORLDS.every((_, i) => getMathProgress()[i]);
    const memDone      = MEMORY_LEVELS.every((_, i) => getMemoryProgress()[i]);
    const countDone    = COUNTING_LEVELS.every((_, i) => getCountingProgress()[i]);
    if (spellingDone && mathDone && memDone && countDone)
        return checkAndUnlock('all_stars');
    return null;
}
```

### `src/game/services/__tests__/AchievementService.test.js`
Mock `addToInventory` via `vi.mock('../../data/LevelData.js', ...)`.
~28 test cases covering: catalogue shape, `getAchievements` defaults + corruption handling, `isUnlocked`, `unlockAchievement` (wasNew/idempotency, timestamps, reward mapping, addToInventory calls), `getUnlockedCount`, `getProgress`.

### `achievement.md` (repo root)
Design doc — see "achievement.md content" section below.

---

## Files to Modify

### `src/game/services/SaveService.js`
Add `'jolyne_achievements'` to the `SAVE_KEYS` array. That's the only change.

### `src/game/data/I18n.js`
Add 22 keys to each of the 3 locale objects (fr, en, es) after the `countingScore` entry:

```
tabAchievements, achProgress (fn),
ach_welcome, ach_linguist, ach_explorer,
ach_first_spell, ach_first_memory, ach_all_counting,
ach_all_spelling, ach_all_memory, ach_all_math, ach_all_stars,
ach_welcome_desc … ach_all_stars_desc (×10),
ach_unlocked, ach_reward_granted
```

### `src/game/scenes/Boot.js`
In `create()`, before `this.scene.start('Preloader')`:
```js
import { checkAndUnlock } from '../services/AchievementService.js';
checkAndUnlock('welcome');  // silent — no toast in Boot
```

### `src/game/scenes/MainMenu.js`
- Import `checkAndUnlock`, `showAchievementToast`
- `_createLangButton` pointerup: after `cycleLang()`, before `fadeOut` — call `checkAndUnlock('linguist')`, show toast if `wasNew`
- `_createCollectionButton` callback: before `scene.start('CollectionScene')` — call `checkAndUnlock('explorer')` (no toast, navigating away)

### `src/game/scenes/VictoryScene.js`
In `_checkLoot()`, after `saveProgress` / special reward grant:
- Check `first_spell` (if any progress), `all_spelling` (if `allDone`), `checkAllStars()`
- Store results in `this._achResults`

In `_showRewardUI()` inside the `time.delayedCall(800, ...)` callback, after existing reward popup:
```js
(this._achResults ?? []).forEach((a, i) =>
    this.time.delayedCall(i * 2000, () => showAchievementToast(this, a.id, a.reward))
);
```

### `src/game/scenes/MathVictoryScene.js`
Same pattern: check `all_math` + `checkAllStars()` in `_checkLoot()`, show toasts in the existing `time.delayedCall(1800, ...)`.

### `src/game/scenes/MemoryScene.js`
In `_victory()` after `saveMemoryProgress`: check `first_memory`, `all_memory`, `checkAllStars()`. Show toasts in the `time.delayedCall(1400, ...)` block.

### `src/game/scenes/CountingScene.js`
In `_endGame()` inside `if (perfect)` after `saveCountingProgress`: check `all_counting`, `checkAllStars()`. Show toasts in `time.delayedCall(2000, ...)`.

### `src/game/scenes/CollectionScene.js`
1. Add import: `import { ACHIEVEMENTS, getAchievements } from '../services/AchievementService.js';`
2. Add 5th entry to `TABS` array: `{ labelKey: 'tabAchievements', categories: [] }`
3. Update tab width formula: `const tabW = TABS.length <= 4 ? 220 : 170;`
4. Add `else` branch in `_drawTabContent()` for `this.activeTab === 4 → this._drawAchievementsTab()`
5. Implement `_drawAchievementsTab()`: 2-column × 5-row grid of cards (440×90), locked/unlocked styling, progress counter at top

---

## `achievement.md` Content (repo root)

Sections:
1. **Overview** — purpose and motivation
2. **Data Model** — localStorage key, schema, cloud sync note
3. **Achievement Catalogue** — full 10-row table (ID | Condition | Reward | Difficulty)
4. **Service API** — list of all exported functions from AchievementService.js
5. **Scene Integration Map** — table of Scene → Achievement → Trigger point
6. **Toast Notification** — visual spec (position, duration, stacking)
7. **Collection Tab** — layout description for the 5th tab
8. **i18n Keys** — full list of 22 keys
9. **Reward Item Reference** — maps each reward to its rarity and existing item pool entry

---

## Verification

```powershell
npm run test:run          # all tests pass (was 161, will be ~189)
npm run build-nolog       # clean build, no missing imports
```

Manual checks:
- Open game → CollectionScene shows 5 tabs; Achievements tab shows 10 cards (1 already unlocked: `welcome`)
- Switch language → `linguist` toast appears on MainMenu before fade
- Complete a spelling level → `first_spell` toast, `bg_castle` item granted; check CollectionScene Bonus tab
- Complete all counting levels → `all_counting` toast, `bg_galaxy` item granted
- Complete all 4 games → `all_stars` toast, `skin_gold` available in CollectionScene
