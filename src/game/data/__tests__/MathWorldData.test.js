import { beforeEach, describe, expect, it } from 'vitest';
import {
    MATH_WORLDS,
    getMathProgress,
    getMathUnlocked,
    saveMathProgress,
} from '../MathWorldData.js';

beforeEach(() => localStorage.clear());

describe('MATH_WORLDS', () => {
    it('has exactly 6 worlds', () => {
        expect(MATH_WORLDS).toHaveLength(6);
    });

    it('each world has required fields', () => {
        for (const world of MATH_WORLDS) {
            expect(world).toHaveProperty('id');
            expect(world).toHaveProperty('nameKey');
            expect(world).toHaveProperty('emoji');
            expect(world).toHaveProperty('monsters');
            expect(world).toHaveProperty('numMax');
            expect(world).toHaveProperty('pointsNeeded');
        }
    });

    it('world ids are sequential from 0 to 5', () => {
        MATH_WORLDS.forEach((world, i) => expect(world.id).toBe(i));
    });

    it('each world has exactly 3 monsters', () => {
        for (const world of MATH_WORLDS) {
            expect(world.monsters).toHaveLength(3);
        }
    });

    it('all worlds have pointsNeeded of 1200', () => {
        for (const world of MATH_WORLDS) {
            expect(world.pointsNeeded).toBe(1200);
        }
    });

    it('each world yields exactly 6 rounds (pointsNeeded / 200)', () => {
        for (const world of MATH_WORLDS) {
            expect(Math.round(world.pointsNeeded / 200)).toBe(6);
        }
    });

    it('numMax increases with world difficulty', () => {
        expect(MATH_WORLDS[0].numMax).toBeLessThan(MATH_WORLDS[5].numMax);
    });

    it('has 3 addition worlds and 3 subtraction worlds', () => {
        const addCount = MATH_WORLDS.filter(w => (w.operation ?? 'add') === 'add').length;
        const subCount = MATH_WORLDS.filter(w => w.operation === 'sub').length;
        expect(addCount).toBe(3);
        expect(subCount).toBe(3);
    });
});

describe('getMathProgress / saveMathProgress', () => {
    it('returns empty object when nothing saved', () => {
        expect(getMathProgress()).toEqual({});
    });

    it('saves and retrieves world completion', () => {
        saveMathProgress(0);
        expect(getMathProgress()[0]).toBe(true);
    });

    it('accumulates progress across worlds', () => {
        saveMathProgress(1);
        saveMathProgress(4);
        const p = getMathProgress();
        expect(p[1]).toBe(true);
        expect(p[4]).toBe(true);
        expect(p[0]).toBeUndefined();
    });

    it('handles corrupted localStorage gracefully', () => {
        localStorage.setItem('math_progress', 'not-valid-json');
        expect(getMathProgress()).toEqual({});
    });
});

describe('getMathUnlocked', () => {
    it('world 0 is always unlocked', () => {
        expect(getMathUnlocked(0)).toBe(true);
    });

    it('world 3 is always unlocked (separate difficulty curve)', () => {
        expect(getMathUnlocked(3)).toBe(true);
    });

    it('world 1 is locked without prior progress', () => {
        expect(getMathUnlocked(1)).toBe(false);
    });

    it('world 1 unlocks after completing world 0', () => {
        saveMathProgress(0);
        expect(getMathUnlocked(1)).toBe(true);
    });

    it('world 2 requires world 1 completed', () => {
        expect(getMathUnlocked(2)).toBe(false);
        saveMathProgress(1);
        expect(getMathUnlocked(2)).toBe(true);
    });

    it('world 4 requires world 3 completed', () => {
        expect(getMathUnlocked(4)).toBe(false);
        saveMathProgress(3);
        expect(getMathUnlocked(4)).toBe(true);
    });

    it('world 5 requires world 4 completed', () => {
        expect(getMathUnlocked(5)).toBe(false);
        saveMathProgress(4);
        expect(getMathUnlocked(5)).toBe(true);
    });
});
