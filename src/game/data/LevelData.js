// Central definition of all 5 levels.
// words[i] maps 1-to-1 with GATE_POSITIONS[i] from MapData.js.
// nameKey references an i18n key in I18n.js.

export const LEVELS = [
    {
        id: 0,
        nameKey: 'level_chateau',
        emoji: '🏰',
        bg: 0x1a1a5e,
        btnColor: 0x2a2a88,
        words: ['ROI', 'CHAT', 'TOUR', 'OURS', 'LUNE'],
    },
    {
        id: 1,
        nameKey: 'level_animaux',
        emoji: '🐾',
        bg: 0x0f2818,
        btnColor: 0x1a4a28,
        words: ['COQ', 'OIE', 'LION', 'LOUP', 'CERF'],
    },
    {
        id: 2,
        nameKey: 'level_nature',
        emoji: '🌿',
        bg: 0x061830,
        btnColor: 0x103060,
        words: ['EAU', 'BOIS', 'MONT', 'VENT', 'CIEL'],
    },
    {
        id: 3,
        nameKey: 'level_cuisine',
        emoji: '🍞',
        bg: 0x2a1208,
        btnColor: 0x44220e,
        words: ['PAIN', 'LAIT', 'NOIX', 'MIEL', 'OEUF'],
    },
    {
        id: 4,
        nameKey: 'level_maison',
        emoji: '🏠',
        bg: 0x1e0a2e,
        btnColor: 0x381850,
        words: ['VELO', 'AUTO', 'BAIN', 'FOUR', 'VASE'],
    },
];

const SAVE_KEY = 'jolyne_progress';
const INVENTORY_KEY = 'jolyne_inventory';
const EQUIP_KEY = 'jolyne_equipment';

export function getProgress() {
    try {
        return JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
    } catch {
        return {};
    }
}

export function saveProgress(levelId) {
    const p = getProgress();
    p[levelId] = true;
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(p));
    } catch { /* storage unavailable */ }
}

// --- Inventory & Equipment ---

export function getInventory() {
    try {
        const inv = JSON.parse(localStorage.getItem(INVENTORY_KEY));
        if (inv && Array.isArray(inv)) {
            if (!inv.includes('skin_default')) inv.push('skin_default');
            if (!inv.includes('bg_night')) inv.push('bg_night');
            return inv;
        }
        return ['skin_default', 'bg_night'];
    } catch {
        return ['skin_default', 'bg_night'];
    }
}

export function addToInventory(itemId) {
    const inv = getInventory();
    if (!inv.includes(itemId)) {
        inv.push(itemId);
        try {
            localStorage.setItem(INVENTORY_KEY, JSON.stringify(inv));
        } catch { }
    }
}

export function getEquipment() {
    try {
        return JSON.parse(localStorage.getItem(EQUIP_KEY)) || {
            skin: 'skin_default',
            background: 'bg_night',
            item_left: null,
            item_right: null
        };
    } catch {
        return { skin: 'skin_default', background: 'bg_night', item_left: null, item_right: null };
    }
}

export function setEquipment(category, itemId) {
    const equip = getEquipment();
    equip[category] = itemId;
    try {
        localStorage.setItem(EQUIP_KEY, JSON.stringify(equip));
    } catch { }
}
