const STRINGS = {
    fr: {
        gameTitle:        'Le Monde de Jolyne',
        gameSubtitle:     'Choisis ton aventure !',
        btnSpelling:      '🏰 Orthographe',
        btnMath:          '❄️ Mathématiques',
        btnCollection:    '🎁 Collection',
        spellingProgress: (d, t) => `⭐ ${d} / ${t} niveaux`,
        mathProgress:     (d, t) => `⭐ ${d} / ${t} mondes`,

        spellingTitle:    'Le Château de Jolyne',
        spellingSubtitle: 'Apprends à épeler en français !',
        chooseLevel:      'Choisis ton niveau !',
        levelLabel:       (n) => `NIVEAU ${n}`,
        back:             '⬅ Retour',

        spellWord:        'Épelle le mot !',
        clickInOrder:     "Clique sur les lettres dans l'ordre",
        bravo:            'BRAVO ! 🌟',
        tryAgain:         'Essaie encore ! 💛',

        helpJolyne:       'Aide Jolyne ! ✨',
        magicChest:       'Coffre Magique ! 🎁',
        versus:           (name) => `⚔️ contre ${name}`,
        superText:        'SUPER ! 🌟',
        tryAgainMath:     'Essaie encore ! 💛',
        menuBtn:          'Menu',

        // ── Level names ──────────────────────────────────────────────────────
        level_chateau:    'Le Château',
        level_animaux:    'Les Animaux',
        level_nature:     'La Nature',
        level_cuisine:    'La Cuisine',
        level_maison:     'La Maison',

        // ── Math world names ─────────────────────────────────────────────────
        world_toundra:    'La Toundra',
        world_sucre:      'Le Pays Sucré',
        world_prairie:    'La Prairie',

        // ── Monster names ────────────────────────────────────────────────────
        monster_snowman:     'Bonhomme de Neige',
        monster_ice_golem:   'Golem de Glace',
        monster_polar_bear:  'Ours Polaire',
        monster_lollipop:    'Sucette',
        monster_teddy:       'Ourson',
        monster_candy_cane:  'Canne en Sucre',
        monster_bee:         'Abeille',
        monster_butterfly:   'Papillon',
        monster_ladybug:     'Coccinelle',

        // ── Rarity labels ────────────────────────────────────────────────────
        rarity_common:    'Commun',
        rarity_uncommon:  'Peu Commun',
        rarity_rare:      'Rare',
        rarity_epic:      'Épique',
        rarity_legendary: 'Légendaire',

        // ── Item names ───────────────────────────────────────────────────────
        item_skin_default: 'Jolyne Pixel',
        item_skin_pink:    'Robe Rose',
        item_skin_gold:    "Princesse d'Or",
        item_bg_night:     'Nuit Étoilée',
        item_bg_castle:    'Château Royal',
        item_bg_galaxy:    'Galaxie Rose',
        item_shield:       'Bouclier de Bois',
        item_magic_glove:  'Gant Magique',
        item_sword:        'Épée de Fer',
        item_wand:         "Baguette d'Étoile",
        special_math:      'Maître des Maths',
        special_spelling:  'Expert en Orthographe',

        // ── Victory / reward UI ──────────────────────────────────────────────
        gatesOpened:         '5 / 5 portes ouvertes !',
        congratulations:     '🎉 FÉLICITATIONS ! 🎉',
        mathVictorySubtitle: 'Tu as résolu tous les calculs !',
        masteredLevel:       (n) => `Tu as maîtrisé ${n} !`,
        chooseLevelBtn:      '▶  Choisir un niveau',
        mathBravo:           'BRAVO ! 🎉',
        worldComplete:       (n) => `Monde ${n} terminé !`,
        continueBtn:         'Continuer →',

        // ── Math world select ────────────────────────────────────────────────
        mathWorldTitle:    '🔢 Les Mondes des Maths',
        chooseMathWorld:   'Choisis ton monde !',
        completePrevWorld: 'Terminer le\nmonde précédent',
        worldLabel:        (n) => `MONDE ${n}`,

        // ── Collection screen ────────────────────────────────────────────────
        collectionTitle:     'Ma Collection ✨',
        backMenu:            '⬅ Menu',
        chooseSkin:          'Choisir un personnage pour Jolyne',
        mathEquipment:       'Équipement pour le jeu de Mathématiques',
        leftArm:             '🛡️ Bras Gauche',
        rightArm:            '⚔️ Bras Droit',
        chooseBg:            'Choisir le fond du Menu Principal',
        equipped:            '✔ ÉQUIPÉ',
        equip:               'Équiper',
        specialRewardsTitle: '— Récompenses Spéciales —',
        tabSpelling:         '🏰 Orthographe',
        tabMath:             '❄️ Mathématiques',
        tabBonus:            '🌟 Bonus',

        // ── Reward popup ─────────────────────────────────────────────────────
        newContent:   'NOUVEAU CONTENU !',
        great:        'GÉNIAL !',

        // ── HUD / misc ───────────────────────────────────────────────────────
        pointsLabel:   'Points',
        cheatUnlocked: '✨ TOUT DÉBLOQUÉ ! ✨',
    },

    en: {
        gameTitle:        "Jolyne's World",
        gameSubtitle:     'Choose your adventure!',
        btnSpelling:      '🏰 Spelling',
        btnMath:          '❄️ Mathematics',
        btnCollection:    '🎁 Collection',
        spellingProgress: (d, t) => `⭐ ${d} / ${t} levels`,
        mathProgress:     (d, t) => `⭐ ${d} / ${t} worlds`,

        spellingTitle:    "Jolyne's Castle",
        spellingSubtitle: 'Learn to spell in English!',
        chooseLevel:      'Choose your level!',
        levelLabel:       (n) => `LEVEL ${n}`,
        back:             '⬅ Back',

        spellWord:        'Spell the word!',
        clickInOrder:     'Click the letters in order',
        bravo:            'BRAVO! 🌟',
        tryAgain:         'Try again! 💛',

        helpJolyne:       'Help Jolyne! ✨',
        magicChest:       'Magic Chest! 🎁',
        versus:           (name) => `⚔️ vs ${name}`,
        superText:        'SUPER! 🌟',
        tryAgainMath:     'Try again! 💛',
        menuBtn:          'Menu',

        level_chateau:    'The Castle',
        level_animaux:    'The Animals',
        level_nature:     'Nature',
        level_cuisine:    'The Kitchen',
        level_maison:     'The House',

        world_toundra:    'The Tundra',
        world_sucre:      'Candy Land',
        world_prairie:    'The Meadow',

        monster_snowman:     'Snowman',
        monster_ice_golem:   'Ice Golem',
        monster_polar_bear:  'Polar Bear',
        monster_lollipop:    'Lollipop',
        monster_teddy:       'Teddy Bear',
        monster_candy_cane:  'Candy Cane',
        monster_bee:         'Bee',
        monster_butterfly:   'Butterfly',
        monster_ladybug:     'Ladybug',

        rarity_common:    'Common',
        rarity_uncommon:  'Uncommon',
        rarity_rare:      'Rare',
        rarity_epic:      'Epic',
        rarity_legendary: 'Legendary',

        item_skin_default: 'Jolyne Pixel',
        item_skin_pink:    'Pink Dress',
        item_skin_gold:    'Golden Princess',
        item_bg_night:     'Starry Night',
        item_bg_castle:    'Royal Castle',
        item_bg_galaxy:    'Pink Galaxy',
        item_shield:       'Wooden Shield',
        item_magic_glove:  'Magic Glove',
        item_sword:        'Iron Sword',
        item_wand:         'Star Wand',
        special_math:      'Math Master',
        special_spelling:  'Spelling Expert',

        gatesOpened:         '5 / 5 gates opened!',
        congratulations:     '🎉 CONGRATULATIONS! 🎉',
        mathVictorySubtitle: 'You solved all the maths!',
        masteredLevel:       (n) => `You mastered ${n}!`,
        chooseLevelBtn:      '▶  Choose a level',
        mathBravo:           'BRAVO! 🎉',
        worldComplete:       (n) => `World ${n} complete!`,
        continueBtn:         'Continue →',

        mathWorldTitle:    '🔢 Math Worlds',
        chooseMathWorld:   'Choose your world!',
        completePrevWorld: 'Complete the\nprevious world',
        worldLabel:        (n) => `WORLD ${n}`,

        collectionTitle:     'My Collection ✨',
        backMenu:            '⬅ Menu',
        chooseSkin:          "Choose Jolyne's outfit",
        mathEquipment:       'Equipment for the Math game',
        leftArm:             '🛡️ Left Arm',
        rightArm:            '⚔️ Right Arm',
        chooseBg:            'Choose the Main Menu background',
        equipped:            '✔ EQUIPPED',
        equip:               'Equip',
        specialRewardsTitle: '— Special Rewards —',
        tabSpelling:         '🏰 Spelling',
        tabMath:             '❄️ Mathematics',
        tabBonus:            '🌟 Bonus',

        newContent:   'NEW CONTENT!',
        great:        'AMAZING!',

        pointsLabel:   'Points',
        cheatUnlocked: '✨ ALL UNLOCKED! ✨',
    },

    es: {
        gameTitle:        'El Mundo de Jolyne',
        gameSubtitle:     '¡Elige tu aventura!',
        btnSpelling:      '🏰 Ortografía',
        btnMath:          '❄️ Matemáticas',
        btnCollection:    '🎁 Colección',
        spellingProgress: (d, t) => `⭐ ${d} / ${t} niveles`,
        mathProgress:     (d, t) => `⭐ ${d} / ${t} mundos`,

        spellingTitle:    'El Castillo de Jolyne',
        spellingSubtitle: '¡Aprende a deletrear en español!',
        chooseLevel:      '¡Elige tu nivel!',
        levelLabel:       (n) => `NIVEL ${n}`,
        back:             '⬅ Volver',

        spellWord:        '¡Deletrea la palabra!',
        clickInOrder:     'Haz clic en las letras en orden',
        bravo:            '¡BRAVO! 🌟',
        tryAgain:         '¡Inténtalo! 💛',

        helpJolyne:       '¡Ayuda a Jolyne! ✨',
        magicChest:       '¡Cofre Mágico! 🎁',
        versus:           (name) => `⚔️ contra ${name}`,
        superText:        '¡SUPER! 🌟',
        tryAgainMath:     '¡Inténtalo! 💛',
        menuBtn:          'Menú',

        level_chateau:    'El Castillo',
        level_animaux:    'Los Animales',
        level_nature:     'La Naturaleza',
        level_cuisine:    'La Cocina',
        level_maison:     'La Casa',

        world_toundra:    'La Tundra',
        world_sucre:      'El País Dulce',
        world_prairie:    'La Pradera',

        monster_snowman:     'Muñeco de Nieve',
        monster_ice_golem:   'Gólem de Hielo',
        monster_polar_bear:  'Oso Polar',
        monster_lollipop:    'Piruleta',
        monster_teddy:       'Osito',
        monster_candy_cane:  'Bastón de Caramelo',
        monster_bee:         'Abeja',
        monster_butterfly:   'Mariposa',
        monster_ladybug:     'Mariquita',

        rarity_common:    'Común',
        rarity_uncommon:  'Poco Común',
        rarity_rare:      'Raro',
        rarity_epic:      'Épico',
        rarity_legendary: 'Legendario',

        item_skin_default: 'Jolyne Pixel',
        item_skin_pink:    'Vestido Rosa',
        item_skin_gold:    'Princesa de Oro',
        item_bg_night:     'Noche Estrellada',
        item_bg_castle:    'Castillo Real',
        item_bg_galaxy:    'Galaxia Rosa',
        item_shield:       'Escudo de Madera',
        item_magic_glove:  'Guante Mágico',
        item_sword:        'Espada de Hierro',
        item_wand:         'Varita Estrella',
        special_math:      'Maestro de Mates',
        special_spelling:  'Experto en Ortografía',

        gatesOpened:         '¡5 / 5 puertas abiertas!',
        congratulations:     '🎉 ¡FELICIDADES! 🎉',
        mathVictorySubtitle: '¡Resolviste todos los cálculos!',
        masteredLevel:       (n) => `¡Dominaste ${n}!`,
        chooseLevelBtn:      '▶  Elegir nivel',
        mathBravo:           '¡BRAVO! 🎉',
        worldComplete:       (n) => `¡Mundo ${n} completado!`,
        continueBtn:         'Continuar →',

        mathWorldTitle:    '🔢 Mundos de Matemáticas',
        chooseMathWorld:   '¡Elige tu mundo!',
        completePrevWorld: 'Completa el\nmundo anterior',
        worldLabel:        (n) => `MUNDO ${n}`,

        collectionTitle:     'Mi Colección ✨',
        backMenu:            '⬅ Menú',
        chooseSkin:          'Elige el personaje de Jolyne',
        mathEquipment:       'Equipamiento para Matemáticas',
        leftArm:             '🛡️ Brazo Izquierdo',
        rightArm:            '⚔️ Brazo Derecho',
        chooseBg:            'Elige el fondo del Menú Principal',
        equipped:            '✔ EQUIPADO',
        equip:               'Equipar',
        specialRewardsTitle: '— Recompensas Especiales —',
        tabSpelling:         '🏰 Ortografía',
        tabMath:             '❄️ Matemáticas',
        tabBonus:            '🌟 Bonus',

        newContent:   '¡NUEVO CONTENIDO!',
        great:        '¡GENIAL!',

        pointsLabel:   'Puntos',
        cheatUnlocked: '✨ ¡TODO DESBLOQUEADO! ✨',
    },
};

const LANG_KEY = 'jolyne_lang';
const SUPPORTED = ['fr', 'en', 'es'];

export function getLang() {
    const stored = localStorage.getItem(LANG_KEY);
    return SUPPORTED.includes(stored) ? stored : 'fr';
}

export function setLang(lang) {
    if (SUPPORTED.includes(lang)) localStorage.setItem(LANG_KEY, lang);
}

export function cycleLang() {
    const next = SUPPORTED[(SUPPORTED.indexOf(getLang()) + 1) % SUPPORTED.length];
    setLang(next);
    return next;
}

export function t(key, ...args) {
    const lang = getLang();
    const val = (STRINGS[lang] ?? STRINGS.fr)[key] ?? STRINGS.fr[key];
    if (val === undefined) return key;
    return typeof val === 'function' ? val(...args) : val;
}
