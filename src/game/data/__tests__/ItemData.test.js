import { describe, expect, it } from 'vitest';
import { CARD_BACK_ITEMS, ITEMS, RARITY, SPECIAL_REWARDS } from '../ItemData.js';

describe('RARITY', () => {
    const rarities = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY'];

    it('has all five tiers', () => {
        for (const r of rarities) expect(RARITY).toHaveProperty(r);
    });

    it('each tier has labelKey, chance, and color', () => {
        for (const r of rarities) {
            expect(RARITY[r]).toHaveProperty('labelKey');
            expect(RARITY[r]).toHaveProperty('chance');
            expect(RARITY[r]).toHaveProperty('color');
        }
    });

    it('chances sum to 1.00', () => {
        const total = Object.values(RARITY).reduce((s, r) => s + r.chance, 0);
        expect(total).toBeCloseTo(1.0);
    });

    it('LEGENDARY chance is the smallest', () => {
        const chances = Object.values(RARITY).map(r => r.chance);
        expect(RARITY.LEGENDARY.chance).toBe(Math.min(...chances));
    });

    it('COMMON chance is the largest', () => {
        const chances = Object.values(RARITY).map(r => r.chance);
        expect(RARITY.COMMON.chance).toBe(Math.max(...chances));
    });
});

describe('ITEMS', () => {
    it('has at least one item of each rarity', () => {
        const rarities = new Set(ITEMS.map(i => i.rarity));
        expect(rarities.has('COMMON')).toBe(true);
        expect(rarities.has('UNCOMMON')).toBe(true);
        expect(rarities.has('RARE')).toBe(true);
        expect(rarities.has('EPIC')).toBe(true);
    });

    it('each item has id, category, nameKey, rarity', () => {
        for (const item of ITEMS) {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('category');
            expect(item).toHaveProperty('nameKey');
            expect(item).toHaveProperty('rarity');
        }
    });

    it('all item ids are unique', () => {
        const ids = ITEMS.map(i => i.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('categories are from the expected set', () => {
        const validCategories = new Set(['skin', 'background', 'item_left', 'item_right']);
        for (const item of ITEMS) {
            expect(validCategories.has(item.category)).toBe(true);
        }
    });

    it('rarity values reference valid tiers', () => {
        const validRarities = new Set(Object.keys(RARITY));
        for (const item of ITEMS) {
            expect(validRarities.has(item.rarity)).toBe(true);
        }
    });

    it('item_L_teddy exists as a COMMON left-arm item', () => {
        const teddy = ITEMS.find(i => i.id === 'item_L_teddy');
        expect(teddy).toBeDefined();
        expect(teddy.category).toBe('item_left');
        expect(teddy.rarity).toBe('COMMON');
    });

    it('item_L_flower exists as an UNCOMMON left-arm item', () => {
        const flower = ITEMS.find(i => i.id === 'item_L_flower');
        expect(flower).toBeDefined();
        expect(flower.category).toBe('item_left');
        expect(flower.rarity).toBe('UNCOMMON');
    });

    it('item_R_wand exists as a COMMON right-arm item', () => {
        const wand = ITEMS.find(i => i.id === 'item_R_wand');
        expect(wand).toBeDefined();
        expect(wand.category).toBe('item_right');
        expect(wand.rarity).toBe('COMMON');
    });

    it('item_R_candy exists as an UNCOMMON right-arm item', () => {
        const candy = ITEMS.find(i => i.id === 'item_R_candy');
        expect(candy).toBeDefined();
        expect(candy.category).toBe('item_right');
        expect(candy.rarity).toBe('UNCOMMON');
    });

    it('each item with an emoji has a string emoji', () => {
        for (const item of ITEMS) {
            if (item.emoji !== undefined) {
                expect(typeof item.emoji).toBe('string');
            }
        }
    });

    it('skin items with nameColor have it as a string', () => {
        const skins = ITEMS.filter(i => i.category === 'skin' && i.nameColor != null);
        expect(skins.length).toBeGreaterThan(0);
        for (const skin of skins) {
            expect(typeof skin.nameColor).toBe('string');
            expect(skin.nameColor).toMatch(/^#[0-9a-fA-F]{6}$/);
        }
    });
});

describe('CARD_BACK_ITEMS', () => {
    it('has exactly 3 card backs', () => {
        expect(CARD_BACK_ITEMS).toHaveLength(3);
    });

    it('each card back has id, category, nameKey, rarity', () => {
        for (const item of CARD_BACK_ITEMS) {
            expect(item.category).toBe('card_back');
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('nameKey');
            expect(item).toHaveProperty('rarity');
        }
    });

    it('card back ids are unique', () => {
        const ids = CARD_BACK_ITEMS.map(i => i.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('card_back_rainbow has rainbowName: true', () => {
        const rainbow = CARD_BACK_ITEMS.find(i => i.id === 'card_back_rainbow');
        expect(rainbow).toBeDefined();
        expect(rainbow.rainbowName).toBe(true);
    });
});

describe('SPECIAL_REWARDS', () => {
    it('has MATH_ALL and SPELLING_ALL entries', () => {
        expect(SPECIAL_REWARDS).toHaveProperty('MATH_ALL');
        expect(SPECIAL_REWARDS).toHaveProperty('SPELLING_ALL');
    });

    it('each special reward has id, nameKey, asset', () => {
        for (const reward of Object.values(SPECIAL_REWARDS)) {
            expect(reward).toHaveProperty('id');
            expect(reward).toHaveProperty('nameKey');
            expect(reward).toHaveProperty('asset');
        }
    });
});
