import { beforeEach, describe, expect, it } from 'vitest';
import {
    COUNTING_LEVELS,
    getCountingProgress,
    isCountingUnlocked,
    saveCountingProgress,
} from '../CountingData.js';

beforeEach(() => localStorage.clear());

describe('COUNTING_LEVELS', () => {
    it('has exactly 5 levels', () => {
        expect(COUNTING_LEVELS).toHaveLength(5);
    });

    it('each level has required fields', () => {
        for (const level of COUNTING_LEVELS) {
            expect(level).toHaveProperty('id');
            expect(level).toHaveProperty('types');
            expect(level).toHaveProperty('maxCount');
            expect(level).toHaveProperty('showTime');
            expect(level).toHaveProperty('pool');
        }
    });

    it('level ids are sequential from 0 to 4', () => {
        COUNTING_LEVELS.forEach((level, i) => expect(level.id).toBe(i));
    });

    it('pools are non-empty arrays of uppercase strings', () => {
        for (const level of COUNTING_LEVELS) {
            expect(level.pool.length).toBeGreaterThan(0);
            for (const word of level.pool) {
                expect(word).toBe(word.toUpperCase());
            }
        }
    });

    it('difficulty increases: maxCount and types grow or stay', () => {
        for (let i = 1; i < COUNTING_LEVELS.length; i++) {
            expect(COUNTING_LEVELS[i].maxCount).toBeGreaterThanOrEqual(COUNTING_LEVELS[i - 1].maxCount);
        }
    });

    it('showTime for all levels is at most 4000ms', () => {
        for (const level of COUNTING_LEVELS) {
            expect(level.showTime).toBeLessThanOrEqual(4000);
        }
    });

    it('showTime for all levels is at least 1000ms', () => {
        for (const level of COUNTING_LEVELS) {
            expect(level.showTime).toBeGreaterThanOrEqual(1000);
        }
    });
});

describe('getCountingProgress / saveCountingProgress', () => {
    it('returns empty object when nothing saved', () => {
        expect(getCountingProgress()).toEqual({});
    });

    it('saves and retrieves level completion', () => {
        saveCountingProgress(0);
        expect(getCountingProgress()[0]).toBe(true);
    });

    it('accumulates progress across levels', () => {
        saveCountingProgress(2);
        saveCountingProgress(4);
        const p = getCountingProgress();
        expect(p[2]).toBe(true);
        expect(p[4]).toBe(true);
        expect(p[0]).toBeUndefined();
    });

    it('handles corrupted localStorage gracefully', () => {
        localStorage.setItem('jolyne_counting_progress', '!!bad!!');
        expect(getCountingProgress()).toEqual({});
    });
});

describe('isCountingUnlocked', () => {
    it('level 0 is always unlocked', () => {
        expect(isCountingUnlocked(0)).toBe(true);
    });

    it('level 1 is locked without prior progress', () => {
        expect(isCountingUnlocked(1)).toBe(false);
    });

    it('level 1 unlocks after completing level 0', () => {
        saveCountingProgress(0);
        expect(isCountingUnlocked(1)).toBe(true);
    });

    it('level 4 requires level 3 completed', () => {
        expect(isCountingUnlocked(4)).toBe(false);
        saveCountingProgress(3);
        expect(isCountingUnlocked(4)).toBe(true);
    });
});
