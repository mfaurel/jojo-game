import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../../data/LevelData.js', () => ({
    addToInventory: vi.fn(),
    getProgress:    vi.fn(() => ({})),
    LEVELS:         Array.from({ length: 10 }, (_, i) => ({ id: i })),
}));

import {
    ACHIEVEMENTS,
    getAchievements,
    isUnlocked,
    unlockAchievement,
    checkAndUnlock,
    getUnlockedCount,
    getProgress,
} from '../AchievementService.js';
import { addToInventory } from '../../data/LevelData.js';

beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
});

// ── Catalogue shape ──────────────────────────────────────────────────────────

describe('ACHIEVEMENTS catalogue', () => {
    it('has exactly 10 entries', () => {
        expect(ACHIEVEMENTS).toHaveLength(10);
    });

    it('each entry has required fields', () => {
        for (const a of ACHIEVEMENTS) {
            expect(a).toHaveProperty('id');
            expect(a).toHaveProperty('nameKey');
            expect(a).toHaveProperty('descKey');
            expect(a).toHaveProperty('reward');
        }
    });

    it('ids are unique', () => {
        const ids = ACHIEVEMENTS.map(a => a.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});

// ── getAchievements ──────────────────────────────────────────────────────────

describe('getAchievements', () => {
    it('returns all 10 ids defaulted to unlocked:false when storage is empty', () => {
        const map = getAchievements();
        expect(Object.keys(map)).toHaveLength(10);
        for (const v of Object.values(map)) {
            expect(v.unlocked).toBe(false);
            expect(v.unlockedAt).toBeNull();
        }
    });

    it('returns defaults when storage contains invalid JSON', () => {
        localStorage.setItem('jolyne_achievements', 'not-json{{{');
        const map = getAchievements();
        expect(Object.values(map).every(v => v.unlocked === false)).toBe(true);
    });

    it('returns defaults when storage contains a non-object value', () => {
        localStorage.setItem('jolyne_achievements', '"a string"');
        const map = getAchievements();
        expect(Object.values(map).every(v => v.unlocked === false)).toBe(true);
    });

    it('normalises partial data — unknown keys are ignored', () => {
        localStorage.setItem('jolyne_achievements', JSON.stringify({ unknown_key: { unlocked: true, unlockedAt: 1 } }));
        const map = getAchievements();
        expect(map['unknown_key']).toBeUndefined();
        expect(map['welcome'].unlocked).toBe(false);
    });
});

// ── isUnlocked ───────────────────────────────────────────────────────────────

describe('isUnlocked', () => {
    it('returns false for a fresh achievement', () => {
        expect(isUnlocked('welcome')).toBe(false);
    });

    it('returns true after unlocking', () => {
        unlockAchievement('welcome');
        expect(isUnlocked('welcome')).toBe(true);
    });

    it('returns false for an unknown id', () => {
        expect(isUnlocked('does_not_exist')).toBe(false);
    });
});

// ── unlockAchievement ────────────────────────────────────────────────────────

describe('unlockAchievement', () => {
    it('returns wasNew:true on first unlock', () => {
        const result = unlockAchievement('welcome');
        expect(result.wasNew).toBe(true);
    });

    it('returns wasNew:false when already unlocked (idempotent)', () => {
        unlockAchievement('welcome');
        const result = unlockAchievement('welcome');
        expect(result.wasNew).toBe(false);
    });

    it('sets a numeric unlockedAt timestamp', () => {
        const before = Date.now();
        unlockAchievement('welcome');
        const after  = Date.now();
        const map    = getAchievements();
        expect(map['welcome'].unlockedAt).toBeGreaterThanOrEqual(before);
        expect(map['welcome'].unlockedAt).toBeLessThanOrEqual(after);
    });

    it('does not call addToInventory for achievements without reward', () => {
        unlockAchievement('welcome');
        expect(addToInventory).not.toHaveBeenCalled();
    });

    it('calls addToInventory with correct item id for reward achievements', () => {
        unlockAchievement('first_spell');
        expect(addToInventory).toHaveBeenCalledWith('bg_castle');
    });

    it('returns the correct rewardItemId', () => {
        const result = unlockAchievement('first_spell');
        expect(result.rewardItemId).toBe('bg_castle');
    });

    it('returns rewardItemId:null for no-reward achievements', () => {
        const result = unlockAchievement('welcome');
        expect(result.rewardItemId).toBeNull();
    });

    it('does not call addToInventory again on duplicate unlock', () => {
        unlockAchievement('first_spell');
        unlockAchievement('first_spell');
        expect(addToInventory).toHaveBeenCalledTimes(1);
    });

    it('returns wasNew:false for unknown id', () => {
        const result = unlockAchievement('nonexistent');
        expect(result.wasNew).toBe(false);
        expect(result.rewardItemId).toBeNull();
    });

    it('persists unlock across getAchievements calls', () => {
        unlockAchievement('explorer');
        const map = getAchievements();
        expect(map['explorer'].unlocked).toBe(true);
    });
});

// ── checkAndUnlock (alias) ───────────────────────────────────────────────────

describe('checkAndUnlock', () => {
    it('is the same function as unlockAchievement', () => {
        expect(checkAndUnlock).toBe(unlockAchievement);
    });
});

// ── getUnlockedCount ─────────────────────────────────────────────────────────

describe('getUnlockedCount', () => {
    it('returns 0 with empty storage', () => {
        expect(getUnlockedCount()).toBe(0);
    });

    it('increments correctly as achievements are unlocked', () => {
        unlockAchievement('welcome');
        expect(getUnlockedCount()).toBe(1);
        unlockAchievement('linguist');
        expect(getUnlockedCount()).toBe(2);
    });
});

// ── getProgress ──────────────────────────────────────────────────────────────

describe('getProgress', () => {
    it('returns { unlocked: 0, total: 10 } initially', () => {
        const p = getProgress();
        expect(p.unlocked).toBe(0);
        expect(p.total).toBe(10);
    });

    it('reflects correctly after unlocks', () => {
        unlockAchievement('welcome');
        unlockAchievement('linguist');
        const p = getProgress();
        expect(p.unlocked).toBe(2);
        expect(p.total).toBe(10);
    });
});
