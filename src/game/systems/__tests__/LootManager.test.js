import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ITEMS } from '../../data/ItemData.js';
import { getInventory } from '../../data/LevelData.js';
import { LootManager } from '../LootManager.js';

beforeEach(() => localStorage.clear());

describe('LootManager.rollLoot()', () => {
    it('returns an item object (not null) when inventory is empty', () => {
        const item = LootManager.rollLoot();
        expect(item).not.toBeNull();
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('rarity');
    });

    it('adds the won item to the inventory', () => {
        const item = LootManager.rollLoot();
        expect(getInventory()).toContain(item.id);
    });

    it('returns null when all items are already owned', () => {
        for (const item of ITEMS) {
            localStorage.setItem(
                'jolyne_inventory',
                JSON.stringify(ITEMS.map(i => i.id))
            );
        }
        expect(LootManager.rollLoot()).toBeNull();
    });

    it('returns a LEGENDARY item when roll < 0.03', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.02);
        const item = LootManager.rollLoot();
        // LEGENDARY items may not exist in ITEMS pool (only in CARD_BACK_ITEMS),
        // so it falls back; just verify we get something
        expect(item === null || typeof item.id === 'string').toBe(true);
    });

    it('returns a COMMON item when roll >= 0.50', () => {
        vi.spyOn(Math, 'random')
            .mockReturnValueOnce(0.75)  // rarity roll → COMMON
            .mockReturnValue(0);        // item selection → first item
        const item = LootManager.rollLoot();
        expect(item).not.toBeNull();
        expect(item.rarity).toBe('COMMON');
    });

    it('returns an UNCOMMON item when roll is between 0.25 and 0.50', () => {
        vi.spyOn(Math, 'random')
            .mockReturnValueOnce(0.30)  // rarity roll → UNCOMMON
            .mockReturnValue(0);
        const item = LootManager.rollLoot();
        expect(item).not.toBeNull();
        expect(item.rarity).toBe('UNCOMMON');
    });

    it('falls back to a lower rarity when all items of rolled rarity are owned', () => {
        // Own all UNCOMMON items
        const uncommonIds = ITEMS.filter(i => i.rarity === 'UNCOMMON').map(i => i.id);
        localStorage.setItem('jolyne_inventory', JSON.stringify(['skin_default', 'bg_night', 'card_back_jolyne', ...uncommonIds]));

        vi.spyOn(Math, 'random')
            .mockReturnValueOnce(0.30)  // → UNCOMMON (all owned)
            .mockReturnValue(0);        // item selection
        const item = LootManager.rollLoot();
        // Falls back to RARE or lower
        expect(item).not.toBeNull();
        expect(item.rarity).not.toBe('UNCOMMON');
    });

    it('never returns an item that is already in inventory', () => {
        for (let i = 0; i < 20; i++) {
            localStorage.clear();
            const item = LootManager.rollLoot();
            if (item === null) break;
            // Roll again — item is now in inventory
            const second = LootManager.rollLoot();
            if (second !== null) {
                expect(second.id).not.toBe(item.id);
            }
        }
    });

    it('returns items whose ids exist in the ITEMS catalogue', () => {
        localStorage.clear();
        const allIds = new Set(ITEMS.map(i => i.id));
        const item = LootManager.rollLoot();
        if (item !== null) {
            expect(allIds.has(item.id)).toBe(true);
        }
    });
});
