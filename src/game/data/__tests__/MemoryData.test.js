import { beforeEach, describe, expect, it } from 'vitest';
import {
    MEMORY_LEVELS,
    getMemoryProgress,
    isMemoryUnlocked,
    saveMemoryProgress,
} from '../MemoryData.js';

beforeEach(() => localStorage.clear());

describe('MEMORY_LEVELS', () => {
    it('has exactly 9 levels', () => {
        expect(MEMORY_LEVELS).toHaveLength(9);
    });

    it('each level has required fields', () => {
        for (const level of MEMORY_LEVELS) {
            expect(level).toHaveProperty('id');
            expect(level).toHaveProperty('cols');
            expect(level).toHaveProperty('rows');
            expect(level).toHaveProperty('cardSize');
            expect(level).toHaveProperty('gap');
            expect(level).toHaveProperty('words');
        }
    });

    it('level ids are sequential from 0 to 8', () => {
        MEMORY_LEVELS.forEach((level, i) => expect(level.id).toBe(i));
    });

    it('word count matches cols × rows / 2 (pairs)', () => {
        for (const level of MEMORY_LEVELS) {
            const pairs = (level.cols * level.rows) / 2;
            expect(level.words).toHaveLength(pairs);
        }
    });

    it('grid sizes increase progressively', () => {
        const sizes = MEMORY_LEVELS.map(l => l.cols * l.rows);
        for (let i = 1; i < sizes.length; i++) {
            expect(sizes[i]).toBeGreaterThanOrEqual(sizes[i - 1]);
        }
    });
});

describe('getMemoryProgress / saveMemoryProgress', () => {
    it('returns empty object when nothing saved', () => {
        expect(getMemoryProgress()).toEqual({});
    });

    it('saves and retrieves level completion', () => {
        saveMemoryProgress(0);
        expect(getMemoryProgress()[0]).toBe(true);
    });

    it('accumulates progress across levels', () => {
        saveMemoryProgress(1);
        saveMemoryProgress(3);
        const p = getMemoryProgress();
        expect(p[1]).toBe(true);
        expect(p[3]).toBe(true);
        expect(p[0]).toBeUndefined();
    });

    it('handles corrupted localStorage gracefully', () => {
        localStorage.setItem('jolyne_memory_progress', '{bad}');
        expect(getMemoryProgress()).toEqual({});
    });
});

describe('isMemoryUnlocked', () => {
    it('level 0 is always unlocked', () => {
        expect(isMemoryUnlocked(0)).toBe(true);
    });

    it('level 1 is locked without prior progress', () => {
        expect(isMemoryUnlocked(1)).toBe(false);
    });

    it('level 1 unlocks after completing level 0', () => {
        saveMemoryProgress(0);
        expect(isMemoryUnlocked(1)).toBe(true);
    });

    it('level 5 requires level 4 completed', () => {
        expect(isMemoryUnlocked(5)).toBe(false);
        saveMemoryProgress(4);
        expect(isMemoryUnlocked(5)).toBe(true);
    });

    it('level 8 requires level 7 completed', () => {
        expect(isMemoryUnlocked(8)).toBe(false);
        saveMemoryProgress(7);
        expect(isMemoryUnlocked(8)).toBe(true);
    });
});
