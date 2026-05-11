import { beforeEach, describe, expect, it } from 'vitest';
import {
    LEVELS,
    addToInventory,
    getEquipment,
    getInventory,
    getProgress,
    getSpellingUnlocked,
    saveProgress,
    setEquipment,
} from '../LevelData.js';

beforeEach(() => localStorage.clear());

describe('LEVELS', () => {
    it('has exactly 10 levels', () => {
        expect(LEVELS).toHaveLength(10);
    });

    it('each level has required fields', () => {
        for (const level of LEVELS) {
            expect(level).toHaveProperty('id');
            expect(level).toHaveProperty('nameKey');
            expect(level).toHaveProperty('words');
            expect(Array.isArray(level.words)).toBe(true);
            expect(level.words).toHaveLength(5);
        }
    });

    it('level ids are sequential from 0 to 9', () => {
        LEVELS.forEach((level, i) => expect(level.id).toBe(i));
    });

    it('all words are uppercase strings', () => {
        for (const level of LEVELS) {
            for (const word of level.words) {
                expect(word).toBe(word.toUpperCase());
                expect(typeof word).toBe('string');
            }
        }
    });
});

describe('getProgress / saveProgress', () => {
    it('returns empty object when nothing saved', () => {
        expect(getProgress()).toEqual({});
    });

    it('saves and retrieves level progress', () => {
        saveProgress(0);
        expect(getProgress()[0]).toBe(true);
    });

    it('accumulates multiple saved levels', () => {
        saveProgress(2);
        saveProgress(5);
        const p = getProgress();
        expect(p[2]).toBe(true);
        expect(p[5]).toBe(true);
        expect(p[0]).toBeUndefined();
    });

    it('handles corrupted localStorage gracefully', () => {
        localStorage.setItem('jolyne_progress', 'not-json');
        expect(getProgress()).toEqual({});
    });
});

describe('getSpellingUnlocked', () => {
    it('levels 0–5 are always unlocked', () => {
        for (let i = 0; i <= 5; i++) {
            expect(getSpellingUnlocked(i)).toBe(true);
        }
    });

    it('level 6 is locked without progress on level 5', () => {
        expect(getSpellingUnlocked(6)).toBe(false);
    });

    it('level 6 unlocks after completing level 5', () => {
        saveProgress(5);
        expect(getSpellingUnlocked(6)).toBe(true);
    });

    it('level 9 unlocks after completing level 8', () => {
        saveProgress(8);
        expect(getSpellingUnlocked(9)).toBe(true);
    });
});

describe('getInventory', () => {
    it('returns default items when nothing saved', () => {
        const inv = getInventory();
        expect(inv).toContain('skin_default');
        expect(inv).toContain('bg_night');
        expect(inv).toContain('card_back_jolyne');
        expect(inv).toContain('item_L_teddy');
        expect(inv).toContain('item_R_wand');
    });

    it('always injects mandatory defaults even if missing from storage', () => {
        localStorage.setItem('jolyne_inventory', JSON.stringify(['skin_pink']));
        const inv = getInventory();
        expect(inv).toContain('skin_default');
        expect(inv).toContain('bg_night');
        expect(inv).toContain('card_back_jolyne');
        expect(inv).toContain('item_L_teddy');
        expect(inv).toContain('item_R_wand');
        expect(inv).toContain('skin_pink');
    });

    it('handles corrupted localStorage gracefully', () => {
        localStorage.setItem('jolyne_inventory', 'bad-json');
        const inv = getInventory();
        expect(Array.isArray(inv)).toBe(true);
    });
});

describe('addToInventory', () => {
    it('adds a new item to inventory', () => {
        addToInventory('skin_gold');
        expect(getInventory()).toContain('skin_gold');
    });

    it('does not duplicate an existing item', () => {
        addToInventory('skin_gold');
        addToInventory('skin_gold');
        const count = getInventory().filter(id => id === 'skin_gold').length;
        expect(count).toBe(1);
    });
});

describe('getEquipment / setEquipment', () => {
    it('returns default equipment when nothing saved', () => {
        const eq = getEquipment();
        expect(eq.skin).toBe('skin_default');
        expect(eq.background).toBe('bg_night');
        expect(eq.item_left).toBe('item_L_teddy');
        expect(eq.item_right).toBe('item_R_wand');
        expect(eq.card_back).toBe('card_back_jolyne');
    });

    it('persists equipment changes', () => {
        setEquipment('skin', 'skin_pink');
        expect(getEquipment().skin).toBe('skin_pink');
    });

    it('only updates the specified category', () => {
        setEquipment('skin', 'skin_gold');
        const eq = getEquipment();
        expect(eq.background).toBe('bg_night');
        expect(eq.item_left).toBe('item_L_teddy');
    });

    it('handles corrupted equipment storage gracefully', () => {
        localStorage.setItem('jolyne_equipment', 'not-json');
        const eq = getEquipment();
        expect(eq).toHaveProperty('skin');
    });
});
