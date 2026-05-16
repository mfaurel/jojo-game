// Central definition of all spelling levels.
// words[i] maps 1-to-1 with GATE_POSITIONS[i] from MapData.js.
// nameKey references an i18n key in I18n.js.

export const LEVELS = [
    // ── Row 1 (always unlocked) ──────────────────────────────────────────────
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

    // ── Row 2 (level 5 always unlocked; 6–9 unlock one-by-one) ───────────────
    {
        id: 5,
        nameKey: 'level_famille',
        emoji: '👨‍👩‍👧',
        bg: 0x2a1040,
        btnColor: 0xcc4477,
        words: ['PAPA', 'MAMAN', 'BEBE', 'TATA', 'PAPI'],
    },
    {
        id: 6,
        nameKey: 'level_couleurs',
        emoji: '🌈',
        bg: 0x0a1040,
        btnColor: 0x7744cc,
        words: ['BLEU', 'ROSE', 'NOIR', 'VERT', 'GRIS'],
    },
    {
        id: 7,
        nameKey: 'level_corps',
        emoji: '🤸',
        bg: 0x1a2010,
        btnColor: 0xcc6622,
        words: ['NEZ', 'BRAS', 'MAIN', 'PIED', 'TETE'],
    },
    {
        id: 8,
        nameKey: 'level_fruits',
        emoji: '🍎',
        bg: 0x0a2010,
        btnColor: 0x448822,
        words: ['KIWI', 'POIRE', 'POMME', 'FIGUE', 'PRUNE'],
    },
    {
        id: 9,
        nameKey: 'level_ferme',
        emoji: '🐄',
        bg: 0x1a1008,
        btnColor: 0x885522,
        words: ['VACHE', 'LAPIN', 'POULE', 'CHIEN', 'PONEY'],
    },
];

export function getSpellingUnlocked(levelId) {
    if (levelId <= 5) return true;
    return !!getProgress()[levelId - 1];
}

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
            if (!inv.includes('skin_default'))     inv.push('skin_default');
            if (!inv.includes('bg_night'))         inv.push('bg_night');
            if (!inv.includes('card_back_jolyne')) inv.push('card_back_jolyne');
            if (!inv.includes('item_L_teddy'))     inv.push('item_L_teddy');
            if (!inv.includes('item_R_wand'))      inv.push('item_R_wand');
            return inv;
        }
        return ['skin_default', 'bg_night', 'card_back_jolyne', 'item_L_teddy', 'item_R_wand'];
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
            item_left: 'item_L_teddy',
            item_right: 'item_R_wand',
            card_back: 'card_back_jolyne',
        };
    } catch {
        return { skin: 'skin_default', background: 'bg_night', item_left: 'item_L_teddy', item_right: 'item_R_wand', card_back: 'card_back_jolyne' };
    }
}

export function setEquipment(category, itemId) {
    const equip = getEquipment();
    equip[category] = itemId;
    try {
        localStorage.setItem(EQUIP_KEY, JSON.stringify(equip));
    } catch { }
}

// ── Easter / bonus star ───────────────────────────────────────────────────────
const EASTER_KEY = 'jolyne_easter_star';
export function getEasterStar()  { try { return localStorage.getItem(EASTER_KEY) === 'true'; } catch { return false; } }
export function saveEasterStar() { try { localStorage.setItem(EASTER_KEY, 'true'); } catch {} }
