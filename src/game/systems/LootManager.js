import { ITEMS } from '../data/ItemData.js';
import { getInventory, addToInventory } from '../data/LevelData.js';

export class LootManager {
    static rollLoot() {
        let selectedRarity = 'COMMON';

        const roll = Math.random();
        if (roll < 0.03) selectedRarity = 'LEGENDARY';
        else if (roll < 0.10) selectedRarity = 'EPIC';
        else if (roll < 0.25) selectedRarity = 'RARE';
        else if (roll < 0.50) selectedRarity = 'UNCOMMON';
        else selectedRarity = 'COMMON';

        const inventory = getInventory();
        
        // Find items of this rarity that are NOT in inventory
        let possibleItems = ITEMS.filter(item => item.rarity === selectedRarity && !inventory.includes(item.id));

        // If no items in this rarity, try lower rarities sequentially
        if (possibleItems.length === 0) {
            const tiers = ['LEGENDARY', 'EPIC', 'RARE', 'UNCOMMON', 'COMMON'];
            const startIndex = tiers.indexOf(selectedRarity);
            for (let i = startIndex + 1; i < tiers.length; i++) {
                possibleItems = ITEMS.filter(item => item.rarity === tiers[i] && !inventory.includes(item.id));
                if (possibleItems.length > 0) break;
            }
        }

        if (possibleItems.length > 0) {
            const wonItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
            addToInventory(wonItem.id);
            return wonItem;
        }

        return null; // All items unlocked!
    }
}
