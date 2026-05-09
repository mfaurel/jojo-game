// nameKey and labelKey reference i18n keys in I18n.js.

export const RARITY = {
    COMMON:    { labelKey: 'rarity_common',    chance: 0.50, color: '#ffffff' },
    UNCOMMON:  { labelKey: 'rarity_uncommon',  chance: 0.25, color: '#1eff00' },
    RARE:      { labelKey: 'rarity_rare',      chance: 0.15, color: '#0070dd' },
    EPIC:      { labelKey: 'rarity_epic',      chance: 0.07, color: '#a335ee' },
    LEGENDARY: { labelKey: 'rarity_legendary', chance: 0.03, color: '#ff8000' }
};

export const ITEMS = [
    // --- SKINS (Spelling & Math character) ---
    { id: 'skin_default', category: 'skin',       nameKey: 'item_skin_default', rarity: 'COMMON',   asset: 'jojo_pixel', tint: null       },
    { id: 'skin_pink',    category: 'skin',       nameKey: 'item_skin_pink',    rarity: 'UNCOMMON', asset: 'jojo_pixel', tint: 0xff88cc   },
    { id: 'skin_gold',    category: 'skin',       nameKey: 'item_skin_gold',    rarity: 'EPIC',     asset: 'jojo_pixel', tint: 0xffd700   },

    // --- BACKGROUNDS (Main Menu) ---
    { id: 'bg_night',    category: 'background', nameKey: 'item_bg_night',    rarity: 'COMMON',    asset: 'bg_night',              bgColor: 0x1a1a5e },
    { id: 'bg_castle',  category: 'background', nameKey: 'item_bg_castle',   rarity: 'RARE',      asset: 'bg_castle',             bgColor: 0x2a0055 },
    { id: 'bg_galaxy',  category: 'background', nameKey: 'item_bg_galaxy',   rarity: 'LEGENDARY', asset: 'bg_galaxy',             bgColor: 0x000022 },
    { id: 'bg_spelling', category: 'background', nameKey: 'item_bg_spelling', rarity: 'EPIC',     asset: 'jojopixelart_spelling', bgColor: 0x8b5a2b },

    // --- MATH ITEMS (Left Arm) ---
    { id: 'item_L_shield', category: 'item_left',  nameKey: 'item_shield',      rarity: 'COMMON',   asset: 'shield_wood', emoji: '🛡️' },
    { id: 'item_L_magic',  category: 'item_left',  nameKey: 'item_magic_glove', rarity: 'RARE',     asset: 'glove_magic', emoji: '🧤' },

    // --- MATH ITEMS (Right Arm) ---
    { id: 'item_R_sword',  category: 'item_right', nameKey: 'item_sword',       rarity: 'UNCOMMON', asset: 'sword_iron',  emoji: '⚔️' },
    { id: 'item_R_wand',   category: 'item_right', nameKey: 'item_wand',        rarity: 'EPIC',     asset: 'wand_star',   emoji: '⭐' },
];

// Card backs — exclusive to the Memory game loot pool
export const CARD_BACK_ITEMS = [
    { id: 'card_back_jolyne',  category: 'card_back', nameKey: 'item_card_back_jolyne',  rarity: 'COMMON' },
    { id: 'card_back_stars',   category: 'card_back', nameKey: 'item_card_back_stars',   rarity: 'RARE'   },
    { id: 'card_back_rainbow', category: 'card_back', nameKey: 'item_card_back_rainbow', rarity: 'EPIC'   },
];

export const SPECIAL_REWARDS = {
    MATH_ALL:     { id: 'special_math',     nameKey: 'special_math',     asset: 'jojopixelart_maths'   },
    SPELLING_ALL: { id: 'special_spelling', nameKey: 'special_spelling', asset: 'jojopixelart_spelling' }
};
