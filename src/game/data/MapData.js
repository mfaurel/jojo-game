export const TILE_SIZE = 64;
export const MAP_COLS = 16;
export const MAP_ROWS = 12;

export const TILE = { FLOOR: 0, WALL: 1, START: 2, GATE: 3, GOAL: 4 };

// Snake-path labyrinth:
// Upper corridor (row 2, left→right): 3 gates at cols 3, 7, 11
// Right-side connector (col 14, rows 2→7)
// Lower corridor (row 7, right→left): 2 gates at cols 8, 6
// Left-side connector (col 2, rows 7→9)
// Bottom corridor (row 9, left→right): goal at col 14
export const MAP_GRID = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 0
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], // row 1
    [1, 2, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1], // row 2  (2=start, 3=gate)
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], // row 3
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], // row 4  (right connector)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], // row 5
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], // row 6  (left connector top)
    [1, 1, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 1], // row 7  (gates at 6 and 8)
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 8  (left connector bottom)
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1], // row 9  (4=goal at col 14)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 10
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 11
];

// Gates ordered easy→hard: ROI (3 letters) first, then 4-letter words
export const GATES = [
    { col: 3,  row: 2, wordKey: 'ROI'  },
    { col: 7,  row: 2, wordKey: 'CHAT' },
    { col: 11, row: 2, wordKey: 'TOUR' },
    { col: 8,  row: 7, wordKey: 'OURS' },
    { col: 6,  row: 7, wordKey: 'LUNE' },
];

export const PLAYER_START = { col: 1, row: 2 };
export const GOAL_TILE    = { col: 14, row: 9 };

export function tileToPx(col, row) {
    return { x: col * TILE_SIZE + TILE_SIZE / 2, y: row * TILE_SIZE + TILE_SIZE / 2 };
}
