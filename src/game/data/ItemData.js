export const RARITY = {
    COMMON:    { label: 'Commun',    chance: 0.50, color: '#ffffff' },
    UNCOMMON:  { label: 'Peu Commun', chance: 0.25, color: '#1eff00' },
    RARE:      { label: 'Rare',      chance: 0.15, color: '#0070dd' },
    EPIC:      { label: 'Épique',    chance: 0.07, color: '#a335ee' },
    LEGENDARY: { label: 'Légendaire', chance: 0.03, color: '#ff8000' }
};

export const ITEMS = [
    // --- SKINS (Spelling & Math character) ---
    { id: 'skin_default', category: 'skin', name: 'Jolyne Pixel',     rarity: 'COMMON',   asset: 'jojo_pixel', tint: null       },
    { id: 'skin_pink',    category: 'skin', name: 'Robe Rose',        rarity: 'UNCOMMON', asset: 'jojo_pixel', tint: 0xff88cc   },
    { id: 'skin_gold',    category: 'skin', name: 'Princesse d\'Or',  rarity: 'EPIC',     asset: 'jojo_pixel', tint: 0xffd700   },

    // --- BACKGROUNDS (Main Menu) ---
    { id: 'bg_night',   category: 'background', name: 'Nuit Étoilée',  rarity: 'COMMON',    asset: 'bg_night',   bgColor: 0x1a1a5e },
    { id: 'bg_castle',  category: 'background', name: 'Château Royal', rarity: 'RARE',      asset: 'bg_castle',  bgColor: 0x2a0055 },
    { id: 'bg_galaxy',  category: 'background', name: 'Galaxie Rose',  rarity: 'LEGENDARY', asset: 'bg_galaxy',  bgColor: 0x000022 },

    // --- MATH ITEMS (Left Arm) ---
    { id: 'item_L_shield', category: 'item_left',  name: 'Bouclier de Bois',    rarity: 'COMMON', asset: 'shield_wood',  emoji: '🛡️' },
    { id: 'item_L_magic',  category: 'item_left',  name: 'Gant Magique',        rarity: 'RARE',   asset: 'glove_magic',  emoji: '🧤' },

    // --- MATH ITEMS (Right Arm) ---
    { id: 'item_R_sword',  category: 'item_right', name: 'Épée de Fer',         rarity: 'UNCOMMON', asset: 'sword_iron',  emoji: '⚔️' },
    { id: 'item_R_wand',   category: 'item_right', name: 'Baguette d\'Étoile',  rarity: 'EPIC',     asset: 'wand_star',   emoji: '⭐' },
];

export const SPECIAL_REWARDS = {
    MATH_ALL: { id: 'special_math', name: 'Maître des Maths', asset: 'jojopixelart_maths' },
    SPELLING_ALL: { id: 'special_spelling', name: 'Expert en Orthographe', asset: 'jojopixelart_spelling' }
};
