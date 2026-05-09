# Game Modes — Design Notes

## Jeu de Mémoire (Memory)

Classic flip-card matching for 4–5 year olds. Cards grow in difficulty across 9 levels.

### Grid sizes
| Levels | Grid | Cards | Card px | Gap |
|--------|------|-------|---------|-----|
| 0–2    | 4×2  | 8     | 160     | 18  |
| 3–5    | 4×3  | 12    | 140     | 16  |
| 6–8    | 4×4  | 16    | 118     | 14  |

### Gameplay loop
1. Cards start face-down with a star pattern.
2. Child taps a card → it flips (scaleX 0→1 tween, front revealed at midpoint).
3. Child taps a second card → if same picture: both glow green and stay face-up; if different: both shake and flip back after 900 ms.
4. All pairs matched → star rain + victory music + loot roll → back to menu.

### Technical notes
- Each card is a Phaser Container with two Graphics children (`backGfx`, `frontGfx`).
- Pictures use the existing `drawPicture(gfx, cx, cy, r)` system from `WordData.js`.
- Flip animation: tween `scaleX` to 0, swap `setVisible`, tween `scaleX` back to 1.
- Progress stored in `localStorage` key `jolyne_memory_progress`.

---

## Mémo-Chiffres (Count-Memo)

Object-counting memory game. Shows items on screen, hides them, child must remember how many of a specific type there were.

### Levels
| Level | Types shown | Max count | Show time |
|-------|-------------|-----------|-----------|
| 0     | 1           | 3         | 4 s       |
| 1     | 2           | 4         | 4 s       |
| 2     | 3           | 5         | 5 s       |
| 3     | 3 (fruits)  | 5         | 5 s       |
| 4     | 3 (mixed)   | 5         | 4 s       |

### Round flow
1. **Memorise**: N object types appear on screen, each appearing 1–maxCount times. A green countdown bar depletes.
2. **Hide**: All objects fly upward and fade out (500 ms tween).
3. **Quiz**: One object type shown large at centre; large number buttons (1–maxCount) appear at bottom.
4. **Feedback**: Correct → burst + score++; Wrong → wrong button red, correct button green for 1.5 s.
5. After 8 correct answers → victory.

### Object layout
Screen divided into 6×3 zone grid. Each object type is assigned 2 columns of zones so types are spatially separated (helps children distinguish them). Objects placed at zone centre ± 28 px jitter.

### Technical notes
- Number buttons: 120×120 px for ≤4 choices, 100×100 px for 5 choices.
- No penalty for wrong answers — child sees the right answer and moves on.
- Progress stored in `localStorage` key `jolyne_counting_progress`.

---

## Integration

Both modes appear on the main menu in a 2×2 grid alongside Spelling and Math.
Both reuse the existing `LootManager`, `RewardPopup`, and audio system.
