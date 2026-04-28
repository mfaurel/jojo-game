// Central definition of all 5 levels.
// words[i] maps 1-to-1 with GATE_POSITIONS[i] from MapData.js.

export const LEVELS = [
    {
        id: 0,
        name: 'Le Château',
        emoji: '🏰',
        bg: 0x1a1a5e,
        btnColor: 0x2a2a88,
        words: ['ROI', 'CHAT', 'TOUR', 'OURS', 'LUNE'],
    },
    {
        id: 1,
        name: 'Les Animaux',
        emoji: '🐾',
        bg: 0x0f2818,
        btnColor: 0x1a4a28,
        words: ['COQ', 'OIE', 'LION', 'LOUP', 'CERF'],
    },
    {
        id: 2,
        name: 'La Nature',
        emoji: '🌿',
        bg: 0x061830,
        btnColor: 0x103060,
        words: ['EAU', 'BOIS', 'MONT', 'VENT', 'CIEL'],
    },
    {
        id: 3,
        name: 'La Cuisine',
        emoji: '🍞',
        bg: 0x2a1208,
        btnColor: 0x44220e,
        words: ['PAIN', 'LAIT', 'NOIX', 'MIEL', 'OEUF'],
    },
    {
        id: 4,
        name: 'La Maison',
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
        return JSON.parse(localStorage.getItem(INVENTORY_KEY)) || ['skin_default', 'bg_night'];
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
