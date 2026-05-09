export const TILE_SIZE = 64;
export const MAP_COLS  = 16;
export const MAP_ROWS  = 12;

export const TILE = { FLOOR: 0, WALL: 1, START: 2, GATE: 3, GOAL: 4 };

// Five distinct maze layouts — one per spelling level.
// gatePositions are listed in natural discovery order so words[i] matches the i-th gate the player reaches.
export const LEVEL_MAPS = [
    // ── Level 0 (Le Château) — classic S-shape ─────────────────────────────
    // Right along top row → down right side → left along middle row → down left side → right to goal
    {
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 0
            [1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1], // row 1
            [1,2,0,3,0,0,0,3,0,0,0,3,0,0,0,1], // row 2  start=col1, gates: 3,7,11
            [1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1], // row 3
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 4  right connector
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 5
            [1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 6  left connector top
            [1,1,0,0,0,0,3,0,3,0,0,0,0,0,0,1], // row 7  gates: 6,8
            [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 8  left connector bottom
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1], // row 9  goal=col14
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 10
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 11
        ],
        gatePositions: [
            { col:  3, row: 2 },
            { col:  7, row: 2 },
            { col: 11, row: 2 },
            { col:  8, row: 7 },
            { col:  6, row: 7 },
        ],
        playerStart: { col:  1, row: 2 },
        goalTile:    { col: 14, row: 9 },
    },

    // ── Level 1 (Les Animaux) — U-shape ────────────────────────────────────
    // Right along top row → down full right side → left along bottom row → goal at far left
    {
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 0
            [1,2,0,0,3,0,0,0,3,0,0,0,3,0,0,1], // row 1  start=col1, gates: 4,8,12
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 2  right connector
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 3
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 4
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 5
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 6
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 7
            [1,4,0,0,0,0,3,0,0,0,3,0,0,0,0,1], // row 8  goal=col1, gates: 6,10
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 9
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 10
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 11
        ],
        gatePositions: [
            { col:  4, row: 1 },
            { col:  8, row: 1 },
            { col: 12, row: 1 },
            { col: 10, row: 8 },
            { col:  6, row: 8 },
        ],
        playerStart: { col:  1, row: 1 },
        goalTile:    { col:  1, row: 8 },
    },

    // ── Level 2 (La Nature) — reverse-S ────────────────────────────────────
    // Start top-right, left along top → left connector down → right along middle → right connector down → left to goal
    {
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 0
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 1
            [1,0,0,0,3,0,0,0,3,0,0,0,3,0,2,1], // row 2  start=col14, gates: 12,8,4
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 3  left connector
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 4
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 5
            [1,0,0,0,0,3,0,0,0,3,0,0,0,0,0,1], // row 6  left entry=col1, gates: 5,9
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 7  right connector
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 8
            [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,1], // row 9  goal=col1
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 10
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 11
        ],
        gatePositions: [
            { col: 12, row: 2 },
            { col:  8, row: 2 },
            { col:  4, row: 2 },
            { col:  5, row: 6 },
            { col:  9, row: 6 },
        ],
        playerStart: { col: 14, row: 2 },
        goalTile:    { col:  1, row: 9 },
    },

    // ── Level 3 (La Cuisine) — vertical S ──────────────────────────────────
    // Down left column → right across bottom → up right column → goal top-right
    {
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 0
            [1,2,1,1,1,1,1,1,1,1,1,1,1,1,4,1], // row 1  start=col1, goal=col14
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 2
            [1,3,1,1,1,1,1,1,1,1,1,1,1,1,3,1], // row 3  gates: col1 and col14
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 4
            [1,3,1,1,1,1,1,1,1,1,1,1,1,1,3,1], // row 5  gates: col1 and col14
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 6
            [1,3,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 7  gate col1 only
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], // row 8  bottom connector
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 9
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 10
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 11
        ],
        gatePositions: [
            { col:  1, row: 3 },
            { col:  1, row: 5 },
            { col:  1, row: 7 },
            { col: 14, row: 5 },
            { col: 14, row: 3 },
        ],
        playerStart: { col:  1, row: 1 },
        goalTile:    { col: 14, row: 1 },
    },

    // ── Level 4 (La Maison) — box / perimeter ──────────────────────────────
    // Down right column → left along bottom → up left column → goal top-left
    {
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 0
            [1,1,4,1,1,1,1,1,1,1,1,1,1,1,2,1], // row 1  goal=col2, start=col14
            [1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 2
            [1,1,0,1,1,1,1,1,1,1,1,1,1,1,3,1], // row 3  gate col14
            [1,1,3,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 4  gate col2
            [1,1,0,1,1,1,1,1,1,1,1,1,1,1,3,1], // row 5  gate col14
            [1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 6
            [1,1,0,1,1,1,1,1,1,1,1,1,1,1,3,1], // row 7  gate col14
            [1,1,0,0,0,0,0,3,0,0,0,0,0,0,0,1], // row 8  gate col7
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 9
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 10
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 11
        ],
        gatePositions: [
            { col: 14, row: 3 },
            { col: 14, row: 5 },
            { col: 14, row: 7 },
            { col:  7, row: 8 },
            { col:  2, row: 4 },
        ],
        playerStart: { col: 14, row: 1 },
        goalTile:    { col:  2, row: 1 },
    },

    // ── Level 5 (La Famille) — Z shape ────────────────────────────────────────
    // Right along top row with 3 gates → right connector down → left along middle with 2 gates → left connector down → goal
    {
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 0
            [1,2,0,3,0,3,0,3,0,0,0,0,0,0,0,1], // row 1  start=col1, gates: 3,5,7
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 2  right connector
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 3
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 4
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 5
            [1,0,0,3,0,0,0,3,0,0,0,0,0,0,0,1], // row 6  gates: 3,7
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 7  left connector
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 8
            [1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 9  goal=col1
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 10
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 11
        ],
        gatePositions: [
            { col:  3, row: 1 },
            { col:  5, row: 1 },
            { col:  7, row: 1 },
            { col:  7, row: 6 },
            { col:  3, row: 6 },
        ],
        playerStart: { col:  1, row: 1 },
        goalTile:    { col:  1, row: 9 },
    },

    // ── Level 6 (Les Couleurs) — N shape ──────────────────────────────────────
    // Down left column with 2 gates → bottom connector right → up right column with 3 gates → goal top-right
    {
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 0
            [1,2,1,1,1,1,1,1,1,1,1,1,1,1,4,1], // row 1  start=col1, goal=col14
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 2
            [1,3,1,1,1,1,1,1,1,1,1,1,1,1,3,1], // row 3  gates col1,col14
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 4
            [1,3,1,1,1,1,1,1,1,1,1,1,1,1,3,1], // row 5  gates col1,col14
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 6
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1], // row 7  bottom connector, gate col14
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 8
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 9
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 10
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 11
        ],
        gatePositions: [
            { col:  1, row: 3 },
            { col:  1, row: 5 },
            { col: 14, row: 7 },
            { col: 14, row: 5 },
            { col: 14, row: 3 },
        ],
        playerStart: { col:  1, row: 1 },
        goalTile:    { col: 14, row: 1 },
    },

    // ── Level 7 (Le Corps) — reverse Z, start top-right ───────────────────────
    // Left along top row with 3 gates → left connector down → right along middle with 2 gates → right connector down → goal bottom-right
    {
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 0
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 1
            [1,0,0,0,3,0,0,3,0,0,0,3,0,0,2,1], // row 2  start=col14, gates: 11,7,4
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 3  left connector
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 4
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 5
            [1,0,0,0,0,3,0,3,0,0,0,0,0,0,0,1], // row 6  gates: 5,7
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 7  right connector
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 8
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1], // row 9  goal=col14
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 10
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 11
        ],
        gatePositions: [
            { col: 11, row: 2 },
            { col:  7, row: 2 },
            { col:  4, row: 2 },
            { col:  5, row: 6 },
            { col:  7, row: 6 },
        ],
        playerStart: { col: 14, row: 2 },
        goalTile:    { col: 14, row: 9 },
    },

    // ── Level 8 (Les Fruits) — S shape with 2 gates top, 3 gates bottom ───────
    // Right along top with 2 gates → right connector down → left along middle with 3 gates → left connector down → goal
    {
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 0
            [1,2,0,0,0,0,3,0,0,3,0,0,0,0,0,1], // row 1  start=col1, gates: 6,9
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 2  right connector
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 3
            [1,0,0,0,3,0,0,0,3,0,0,0,3,0,0,1], // row 4  gates: 12,8,4
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 5  left connector
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 6
            [1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 7  goal=col1
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 8
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 9
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 10
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 11
        ],
        gatePositions: [
            { col:  6, row: 1 },
            { col:  9, row: 1 },
            { col: 12, row: 4 },
            { col:  8, row: 4 },
            { col:  4, row: 4 },
        ],
        playerStart: { col:  1, row: 1 },
        goalTile:    { col:  1, row: 7 },
    },

    // ── Level 9 (La Ferme) — triple zigzag ────────────────────────────────────
    // Right with 2 gates → right connector → left with 2 gates → left connector → right with 1 gate → right connector → goal
    {
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 0
            [1,2,0,0,0,3,0,0,0,3,0,0,0,0,0,1], // row 1  start=col1, gates: 5,9
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 2  right connector
            [1,0,0,0,3,0,0,0,3,0,0,0,0,0,0,1], // row 3  gates: 8,4
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 4  left connector
            [1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,1], // row 5  gate: 7
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // row 6  right connector
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1], // row 7  goal=col14
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 8
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 9
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 10
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // row 11
        ],
        gatePositions: [
            { col:  5, row: 1 },
            { col:  9, row: 1 },
            { col:  8, row: 3 },
            { col:  4, row: 3 },
            { col:  7, row: 5 },
        ],
        playerStart: { col:  1, row: 1 },
        goalTile:    { col: 14, row: 7 },
    },
];

// Backward-compat aliases — point to level 0's data
export const MAP_GRID       = LEVEL_MAPS[0].grid;
export const GATE_POSITIONS = LEVEL_MAPS[0].gatePositions;
export const PLAYER_START   = LEVEL_MAPS[0].playerStart;
export const GOAL_TILE      = LEVEL_MAPS[0].goalTile;

export function createGrid(levelIndex = 0) {
    return LEVEL_MAPS[levelIndex ?? 0].grid.map(row => [...row]);
}

export function tileToPx(col, row) {
    return { x: col * TILE_SIZE + TILE_SIZE / 2, y: row * TILE_SIZE + TILE_SIZE / 2 };
}
