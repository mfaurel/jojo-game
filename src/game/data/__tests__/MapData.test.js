import { describe, expect, it } from 'vitest';
import {
    GATE_POSITIONS,
    GOAL_TILE,
    LEVEL_MAPS,
    MAP_COLS,
    MAP_ROWS,
    PLAYER_START,
    TILE,
    TILE_SIZE,
    createGrid,
    tileToPx,
} from '../MapData.js';

describe('constants', () => {
    it('TILE_SIZE is 64', () => expect(TILE_SIZE).toBe(64));
    it('MAP_COLS is 16', () => expect(MAP_COLS).toBe(16));
    it('MAP_ROWS is 12', () => expect(MAP_ROWS).toBe(12));

    it('TILE enum has correct values', () => {
        expect(TILE.FLOOR).toBe(0);
        expect(TILE.WALL).toBe(1);
        expect(TILE.START).toBe(2);
        expect(TILE.GATE).toBe(3);
        expect(TILE.GOAL).toBe(4);
    });
});

describe('LEVEL_MAPS', () => {
    it('has 10 maps', () => expect(LEVEL_MAPS).toHaveLength(10));

    it('each map has grid, gatePositions, playerStart, goalTile', () => {
        for (const map of LEVEL_MAPS) {
            expect(map).toHaveProperty('grid');
            expect(map).toHaveProperty('gatePositions');
            expect(map).toHaveProperty('playerStart');
            expect(map).toHaveProperty('goalTile');
        }
    });

    it('each grid has MAP_ROWS rows', () => {
        for (const map of LEVEL_MAPS) {
            expect(map.grid).toHaveLength(MAP_ROWS);
        }
    });

    it('each grid row has MAP_COLS columns', () => {
        for (const map of LEVEL_MAPS) {
            for (const row of map.grid) {
                expect(row).toHaveLength(MAP_COLS);
            }
        }
    });

    it('each map has exactly 5 gate positions', () => {
        for (const map of LEVEL_MAPS) {
            expect(map.gatePositions).toHaveLength(5);
        }
    });

    it('grid values are only valid tile types (0–4)', () => {
        const validTiles = new Set(Object.values(TILE));
        for (const map of LEVEL_MAPS) {
            for (const row of map.grid) {
                for (const cell of row) {
                    expect(validTiles.has(cell)).toBe(true);
                }
            }
        }
    });

    it('playerStart col/row are within bounds', () => {
        for (const map of LEVEL_MAPS) {
            expect(map.playerStart.col).toBeGreaterThanOrEqual(0);
            expect(map.playerStart.col).toBeLessThan(MAP_COLS);
            expect(map.playerStart.row).toBeGreaterThanOrEqual(0);
            expect(map.playerStart.row).toBeLessThan(MAP_ROWS);
        }
    });

    it('goalTile col/row are within bounds', () => {
        for (const map of LEVEL_MAPS) {
            expect(map.goalTile.col).toBeGreaterThanOrEqual(0);
            expect(map.goalTile.col).toBeLessThan(MAP_COLS);
            expect(map.goalTile.row).toBeGreaterThanOrEqual(0);
            expect(map.goalTile.row).toBeLessThan(MAP_ROWS);
        }
    });

    it('gate positions correspond to GATE tiles in the grid', () => {
        for (const map of LEVEL_MAPS) {
            for (const { col, row } of map.gatePositions) {
                expect(map.grid[row][col]).toBe(TILE.GATE);
            }
        }
    });

    it('playerStart corresponds to START tile in the grid', () => {
        for (const map of LEVEL_MAPS) {
            const { col, row } = map.playerStart;
            expect(map.grid[row][col]).toBe(TILE.START);
        }
    });

    it('goalTile corresponds to GOAL tile in the grid', () => {
        for (const map of LEVEL_MAPS) {
            const { col, row } = map.goalTile;
            expect(map.grid[row][col]).toBe(TILE.GOAL);
        }
    });
});

describe('level 0 single-path invariant', () => {
    const grid = LEVEL_MAPS[0].grid;

    it('row 1 is all walls (no dead-end rooms above start row)', () => {
        expect(grid[1].every(t => t === TILE.WALL)).toBe(true);
    });

    it('row 3 has only col 14 open (right connector, no side rooms)', () => {
        const open = grid[3].map((t, i) => t !== TILE.WALL ? i : -1).filter(i => i >= 0);
        expect(open).toEqual([14]);
    });

    it('row 9 col 1 is a wall (no dead-end left of bottom path)', () => {
        expect(grid[9][1]).toBe(TILE.WALL);
    });

    it('row 9 col 2 is a floor (left edge of bottom path intact)', () => {
        expect(grid[9][2]).toBe(TILE.FLOOR);
    });
});

describe('backward-compat aliases', () => {
    it('GATE_POSITIONS matches LEVEL_MAPS[0]', () => {
        expect(GATE_POSITIONS).toEqual(LEVEL_MAPS[0].gatePositions);
    });

    it('PLAYER_START matches LEVEL_MAPS[0]', () => {
        expect(PLAYER_START).toEqual(LEVEL_MAPS[0].playerStart);
    });

    it('GOAL_TILE matches LEVEL_MAPS[0]', () => {
        expect(GOAL_TILE).toEqual(LEVEL_MAPS[0].goalTile);
    });
});

describe('createGrid', () => {
    it('returns a deep copy of the grid', () => {
        const grid = createGrid(0);
        grid[0][0] = 99;
        expect(LEVEL_MAPS[0].grid[0][0]).not.toBe(99);
    });

    it('defaults to level 0 when no argument given', () => {
        expect(createGrid()).toEqual(LEVEL_MAPS[0].grid);
    });

    it('returns the correct level grid', () => {
        expect(createGrid(2)).toEqual(LEVEL_MAPS[2].grid);
    });
});

describe('tileToPx', () => {
    it('converts (0, 0) to center of the first tile', () => {
        expect(tileToPx(0, 0)).toEqual({ x: 32, y: 32 });
    });

    it('converts (1, 0) correctly', () => {
        expect(tileToPx(1, 0)).toEqual({ x: 96, y: 32 });
    });

    it('converts (0, 1) correctly', () => {
        expect(tileToPx(0, 1)).toEqual({ x: 32, y: 96 });
    });

    it('formula: x = col * TILE_SIZE + TILE_SIZE/2', () => {
        const col = 5, row = 3;
        const { x, y } = tileToPx(col, row);
        expect(x).toBe(col * TILE_SIZE + TILE_SIZE / 2);
        expect(y).toBe(row * TILE_SIZE + TILE_SIZE / 2);
    });
});
