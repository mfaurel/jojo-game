import { getChildName } from '../services/NameService.js';

const STRINGS = {
    fr: {
        gameTitle:        'Le Monde de {name}',
        gameSubtitle:     'Choisis ton aventure !',
        btnSpelling:      '🏰 Orthographe',
        btnMath:          '🔢 Mathématiques',
        btnCollection:    '🎁 Collection',
        spellingProgress: (d, t) => `⭐ ${d} / ${t} niveaux`,
        mathProgress:     (d, t) => `⭐ ${d} / ${t} mondes`,

        spellingTitle:    'Le Château de {name}',
        spellingSubtitle: 'Apprends à épeler en français !',
        chooseLevel:      'Choisis ton niveau !',
        levelLabel:       (n) => `NIVEAU ${n}`,
        back:             '⬅ Retour',

        spellWord:        'Épelle le mot !',
        clickInOrder:     "Clique sur les lettres dans l'ordre",
        bravo:            'BRAVO ! 🌟',
        tryAgain:         'Essaie encore ! 💛',

        helpJolyne:       'Aide {name} ! ✨',
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
        level_famille:    'La Famille',
        level_couleurs:   'Les Couleurs',
        level_corps:      'Le Corps',
        level_fruits:     'Les Fruits',
        level_ferme:      'La Ferme',

        spellingRow1:     'Niveaux 1 à 5',
        spellingRow2:     'Niveaux 6 à 10',

        // ── Math world names ─────────────────────────────────────────────────
        world_toundra:    'La Toundra',
        world_sucre:      'Le Pays Sucré',
        world_prairie:    'La Prairie',
        world_volcan:     'Le Volcan',
        world_ocean:      "L'Océan",
        world_espace:     "L'Espace",

        // ── Section labels ───────────────────────────────────────────────────
        additionSection:     'Addition ➕',
        subtractionSection:  'Soustraction ➖',

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
        monster_dragon:      'Dragon',
        monster_lava_golem:  'Golem de Lave',
        monster_phoenix:     'Phénix',
        monster_shark:       'Requin',
        monster_octopus:     'Pieuvre',
        monster_jellyfish:   'Méduse',
        monster_alien:       'Alien',
        monster_robot:       'Robot',
        monster_ufo:         'OVNI',

        // ── Rarity labels ────────────────────────────────────────────────────
        rarity_common:    'Commun',
        rarity_uncommon:  'Peu Commun',
        rarity_rare:      'Rare',
        rarity_epic:      'Épique',
        rarity_legendary: 'Légendaire',

        // ── Item names ───────────────────────────────────────────────────────
        item_skin_default: '{name} Pixel',
        item_skin_pink:    'Robe Rose',
        item_skin_gold:    "Princesse d'Or",
        item_bg_night:     'Nuit Étoilée',
        item_bg_castle:    'Château Royal',
        item_bg_galaxy:    'Galaxie Rose',
        item_bg_spelling:  'Classe de {name}',
        item_bear:         'Ourson',
        item_flower:       'Bouquet de Fleurs',
        item_shield:       'Bouclier de Bois',
        item_magic_glove:  'Gant Magique',
        item_sword:        'Épée de Fer',
        item_wand:         "Baguette d'Étoile",
        item_candy_cane:   'Canne en Sucre',
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
        mathWorldTitle:    '🔢 Le Donjon des Maths',
        chooseMathWorld:   'Choisis ton monde !',
        completePrevWorld: 'Terminer le\nmonde précédent',
        worldLabel:        (n) => `MONDE ${n}`,
        roundLabel:        (n, tot) => `⚔️ Manche ${n} / ${tot}`,

        // ── Collection screen ────────────────────────────────────────────────
        collectionTitle:     'Ma Collection ✨',
        backMenu:            '⬅ Menu',
        chooseSkin:          'Choisir un personnage pour {name}',
        mathEquipment:       'Équipement pour le jeu de Mathématiques',
        leftArm:             'Bras Gauche',
        rightArm:            'Bras Droit',
        chooseBg:            'Choisir le fond du Menu Principal',
        equipped:            '✔ ÉQUIPÉ',
        equip:               'Équiper',
        specialRewardsTitle: '— Récompenses Spéciales —',
        tabSpelling:         '🏰 Orthographe',
        tabMath:             '❄️ Mathématiques',
        tabBonus:            '🌟 Bonus',
        tabMemory:           '🃏 Mémoire',
        chooseCardBack:      'Dos des cartes Mémoire',
        item_card_back_jolyne:  'Jolyne',
        item_card_back_stars:   'Nuit Cosmos',
        item_card_back_rainbow: 'Arc-en-ciel',

        // ── Reward popup ─────────────────────────────────────────────────────
        newContent:   'NOUVEAU CONTENU !',
        great:        'GÉNIAL !',

        // ── Leaderboard ──────────────────────────────────────────────────────
        leaderboardTitle:   '⭐ Mes étoiles',
        leaderboardTotal:   (tt, m) => `Total : ${tt} / ${m} ⭐`,
        leaderboardMathRow: '🔢 Mathématiques',

        // ── HUD / misc ───────────────────────────────────────────────────────
        pointsLabel:   'Points',
        cheatUnlocked: '✨ TOUT DÉBLOQUÉ ! ✨',

        // ── Confirmation dialog ──────────────────────────────────────────────
        confirmQuit: 'Êtes-vous sûr ?',
        confirmYes:  'Oui',
        confirmNo:   'Non',

        // ── Memory game ──────────────────────────────────────────────────────
        btnMemory:       '🃏 Mémoire',
        memoryTitle:     'Jeu de Mémoire',
        memoryInstruct:  'Retrouve les paires !',
        memoryChoose:    'Choisis un niveau !',
        memoryRow1:      'Grille 4×2',
        memoryRow2:      'Grille 4×3',
        memoryRow3:      'Grille 4×4',
        memoryProgress:  (d, t) => `⭐ ${d} / ${t} niveaux`,

        // ── Counting game ────────────────────────────────────────────────────
        btnCounting:      '🧮 Mémo-Chiffres',
        countingTitle:    'Mémo-Chiffres',
        countingChoose:   'Choisis un niveau !',
        countingMemoise:  'Mémorise !',
        countingQuestion: 'Combien ?',
        countingCorrect:  'Bravo ! 🌟',
        countingProgress: (d, t) => `⭐ ${d} / ${t} niveaux`,
        countingScore:    (d, tot) => `${d} / ${tot}`,
        countingRound:    (n, tot) => `Manche ${n} / ${tot}`,
        countingGood:     'Bravo ! Tu es formidable ! 🌟',
        countingBad:      'Continue à essayer, tu vas y arriver ! 💛',
    },

    en: {
        gameTitle:        "{name}'s World",
        gameSubtitle:     'Choose your adventure!',
        btnSpelling:      '🏰 Spelling',
        btnMath:          '🔢 Mathematics',
        btnCollection:    '🎁 Collection',
        spellingProgress: (d, t) => `⭐ ${d} / ${t} levels`,
        mathProgress:     (d, t) => `⭐ ${d} / ${t} worlds`,

        spellingTitle:    "{name}'s Castle",
        spellingSubtitle: 'Learn to spell in English!',
        chooseLevel:      'Choose your level!',
        levelLabel:       (n) => `LEVEL ${n}`,
        back:             '⬅ Back',

        spellWord:        'Spell the word!',
        clickInOrder:     'Click the letters in order',
        bravo:            'BRAVO! 🌟',
        tryAgain:         'Try again! 💛',

        helpJolyne:       'Help {name}! ✨',
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
        level_famille:    'The Family',
        level_couleurs:   'Colors',
        level_corps:      'The Body',
        level_fruits:     'Fruits',
        level_ferme:      'The Farm',

        spellingRow1:     'Levels 1 to 5',
        spellingRow2:     'Levels 6 to 10',

        world_toundra:    'The Tundra',
        world_sucre:      'Candy Land',
        world_prairie:    'The Meadow',
        world_volcan:     'The Volcano',
        world_ocean:      'The Ocean',
        world_espace:     'Space',

        additionSection:     'Addition ➕',
        subtractionSection:  'Subtraction ➖',

        monster_snowman:     'Snowman',
        monster_ice_golem:   'Ice Golem',
        monster_polar_bear:  'Polar Bear',
        monster_lollipop:    'Lollipop',
        monster_teddy:       'Teddy Bear',
        monster_candy_cane:  'Candy Cane',
        monster_bee:         'Bee',
        monster_butterfly:   'Butterfly',
        monster_ladybug:     'Ladybug',
        monster_dragon:      'Dragon',
        monster_lava_golem:  'Lava Golem',
        monster_phoenix:     'Phoenix',
        monster_shark:       'Shark',
        monster_octopus:     'Octopus',
        monster_jellyfish:   'Jellyfish',
        monster_alien:       'Alien',
        monster_robot:       'Robot',
        monster_ufo:         'UFO',

        rarity_common:    'Common',
        rarity_uncommon:  'Uncommon',
        rarity_rare:      'Rare',
        rarity_epic:      'Epic',
        rarity_legendary: 'Legendary',

        item_skin_default: '{name} Pixel',
        item_skin_pink:    'Pink Dress',
        item_skin_gold:    'Golden Princess',
        item_bg_night:     'Starry Night',
        item_bg_castle:    'Royal Castle',
        item_bg_galaxy:    'Pink Galaxy',
        item_bg_spelling:  "{name}'s Classroom",
        item_bear:         'Teddy Bear',
        item_flower:       'Flower Bouquet',
        item_shield:       'Wooden Shield',
        item_magic_glove:  'Magic Glove',
        item_sword:        'Iron Sword',
        item_wand:         'Star Wand',
        item_candy_cane:   'Candy Cane',
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

        mathWorldTitle:    '🔢 The Math Dungeon',
        chooseMathWorld:   'Choose your world!',
        completePrevWorld: 'Complete the\nprevious world',
        worldLabel:        (n) => `WORLD ${n}`,
        roundLabel:        (n, tot) => `⚔️ Round ${n} / ${tot}`,

        collectionTitle:     'My Collection ✨',
        backMenu:            '⬅ Menu',
        chooseSkin:          "Choose {name}'s outfit",
        mathEquipment:       'Equipment for the Math game',
        leftArm:             'Left Arm',
        rightArm:            'Right Arm',
        chooseBg:            'Choose the Main Menu background',
        equipped:            '✔ EQUIPPED',
        equip:               'Equip',
        specialRewardsTitle: '— Special Rewards —',
        tabSpelling:         '🏰 Spelling',
        tabMath:             '❄️ Mathematics',
        tabBonus:            '🌟 Bonus',
        tabMemory:           '🃏 Memory',
        chooseCardBack:      'Memory card back',
        item_card_back_jolyne:  'Jolyne',
        item_card_back_stars:   'Cosmos Night',
        item_card_back_rainbow: 'Rainbow',

        newContent:   'NEW CONTENT!',
        great:        'AMAZING!',

        leaderboardTitle:   '⭐ My Stars',
        leaderboardTotal:   (tt, m) => `Total: ${tt} / ${m} ⭐`,
        leaderboardMathRow: '🔢 Mathematics',

        pointsLabel:   'Points',
        cheatUnlocked: '✨ ALL UNLOCKED! ✨',

        // ── Confirmation dialog ──────────────────────────────────────────────
        confirmQuit: 'Are you sure?',
        confirmYes:  'Yes',
        confirmNo:   'No',

        // ── Memory game ──────────────────────────────────────────────────────
        btnMemory:       '🃏 Memory',
        memoryTitle:     'Memory Game',
        memoryInstruct:  'Find the pairs!',
        memoryChoose:    'Choose a level!',
        memoryRow1:      '4×2 Grid',
        memoryRow2:      '4×3 Grid',
        memoryRow3:      '4×4 Grid',
        memoryProgress:  (d, t) => `⭐ ${d} / ${t} levels`,

        // ── Counting game ────────────────────────────────────────────────────
        btnCounting:      '🧮 Count-Memo',
        countingTitle:    'Count-Memo',
        countingChoose:   'Choose a level!',
        countingMemoise:  'Memorise!',
        countingQuestion: 'How many?',
        countingCorrect:  'Bravo! 🌟',
        countingProgress: (d, t) => `⭐ ${d} / ${t} levels`,
        countingScore:    (d, tot) => `${d} / ${tot}`,
        countingRound:    (n, tot) => `Round ${n} / ${tot}`,
        countingGood:     'Amazing! You are great! 🌟',
        countingBad:      'Keep trying, you can do it! 💛',
    },

    es: {
        gameTitle:        'El Mundo de {name}',
        gameSubtitle:     '¡Elige tu aventura!',
        btnSpelling:      '🏰 Ortografía',
        btnMath:          '🔢 Matemáticas',
        btnCollection:    '🎁 Colección',
        spellingProgress: (d, t) => `⭐ ${d} / ${t} niveles`,
        mathProgress:     (d, t) => `⭐ ${d} / ${t} mundos`,

        spellingTitle:    'El Castillo de {name}',
        spellingSubtitle: '¡Aprende a deletrear en español!',
        chooseLevel:      '¡Elige tu nivel!',
        levelLabel:       (n) => `NIVEL ${n}`,
        back:             '⬅ Volver',

        spellWord:        '¡Deletrea la palabra!',
        clickInOrder:     'Haz clic en las letras en orden',
        bravo:            '¡BRAVO! 🌟',
        tryAgain:         '¡Inténtalo! 💛',

        helpJolyne:       '¡Ayuda a {name}! ✨',
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
        level_famille:    'La Familia',
        level_couleurs:   'Los Colores',
        level_corps:      'El Cuerpo',
        level_fruits:     'Las Frutas',
        level_ferme:      'La Granja',

        spellingRow1:     'Niveles 1 a 5',
        spellingRow2:     'Niveles 6 a 10',

        world_toundra:    'La Tundra',
        world_sucre:      'El País Dulce',
        world_prairie:    'La Pradera',
        world_volcan:     'El Volcán',
        world_ocean:      'El Océano',
        world_espace:     'El Espacio',

        additionSection:     'Suma ➕',
        subtractionSection:  'Resta ➖',

        monster_snowman:     'Muñeco de Nieve',
        monster_ice_golem:   'Gólem de Hielo',
        monster_polar_bear:  'Oso Polar',
        monster_lollipop:    'Piruleta',
        monster_teddy:       'Osito',
        monster_candy_cane:  'Bastón de Caramelo',
        monster_bee:         'Abeja',
        monster_butterfly:   'Mariposa',
        monster_ladybug:     'Mariquita',
        monster_dragon:      'Dragón',
        monster_lava_golem:  'Gólem de Lava',
        monster_phoenix:     'Fénix',
        monster_shark:       'Tiburón',
        monster_octopus:     'Pulpo',
        monster_jellyfish:   'Medusa',
        monster_alien:       'Alien',
        monster_robot:       'Robot',
        monster_ufo:         'OVNI',

        rarity_common:    'Común',
        rarity_uncommon:  'Poco Común',
        rarity_rare:      'Raro',
        rarity_epic:      'Épico',
        rarity_legendary: 'Legendario',

        item_skin_default: '{name} Pixel',
        item_skin_pink:    'Vestido Rosa',
        item_skin_gold:    'Princesa de Oro',
        item_bg_night:     'Noche Estrellada',
        item_bg_castle:    'Castillo Real',
        item_bg_galaxy:    'Galaxia Rosa',
        item_bg_spelling:  'Clase de {name}',
        item_bear:         'Osito',
        item_flower:       'Ramo de Flores',
        item_shield:       'Escudo de Madera',
        item_magic_glove:  'Guante Mágico',
        item_sword:        'Espada de Hierro',
        item_wand:         'Varita Estrella',
        item_candy_cane:   'Bastón de Caramelo',
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

        mathWorldTitle:    '🔢 El Calabozo de Mates',
        chooseMathWorld:   '¡Elige tu mundo!',
        completePrevWorld: 'Completa el\nmundo anterior',
        worldLabel:        (n) => `MUNDO ${n}`,
        roundLabel:        (n, tot) => `⚔️ Manche ${n} / ${tot}`,

        collectionTitle:     'Mi Colección ✨',
        backMenu:            '⬅ Menú',
        chooseSkin:          'Elige el personaje de {name}',
        mathEquipment:       'Equipamiento para Matemáticas',
        leftArm:             'Brazo Izquierdo',
        rightArm:            'Brazo Derecho',
        chooseBg:            'Elige el fondo del Menú Principal',
        equipped:            '✔ EQUIPADO',
        equip:               'Equipar',
        specialRewardsTitle: '— Recompensas Especiales —',
        tabSpelling:         '🏰 Ortografía',
        tabMath:             '❄️ Matemáticas',
        tabBonus:            '🌟 Bonus',
        tabMemory:           '🃏 Memoria',
        chooseCardBack:      'Dorso de las cartas',
        item_card_back_jolyne:  'Jolyne',
        item_card_back_stars:   'Noche Cosmos',
        item_card_back_rainbow: 'Arco Iris',

        newContent:   '¡NUEVO CONTENIDO!',
        great:        '¡GENIAL!',

        leaderboardTitle:   '⭐ Mis Estrellas',
        leaderboardTotal:   (tt, m) => `Total: ${tt} / ${m} ⭐`,
        leaderboardMathRow: '🔢 Matemáticas',

        pointsLabel:   'Puntos',
        cheatUnlocked: '✨ ¡TODO DESBLOQUEADO! ✨',

        // ── Confirmation dialog ──────────────────────────────────────────────
        confirmQuit: '¿Estás seguro?',
        confirmYes:  'Sí',
        confirmNo:   'No',

        // ── Memory game ──────────────────────────────────────────────────────
        btnMemory:       '🃏 Memoria',
        memoryTitle:     'Juego de Memoria',
        memoryInstruct:  '¡Encuentra las parejas!',
        memoryChoose:    '¡Elige un nivel!',
        memoryRow1:      'Cuadrícula 4×2',
        memoryRow2:      'Cuadrícula 4×3',
        memoryRow3:      'Cuadrícula 4×4',
        memoryProgress:  (d, t) => `⭐ ${d} / ${t} niveles`,

        // ── Counting game ────────────────────────────────────────────────────
        btnCounting:      '🧮 Memo-Números',
        countingTitle:    'Memo-Números',
        countingChoose:   '¡Elige un nivel!',
        countingMemoise:  '¡Memoriza!',
        countingQuestion: '¿Cuántos?',
        countingCorrect:  '¡Bravo! 🌟',
        countingProgress: (d, t) => `⭐ ${d} / ${t} niveles`,
        countingScore:    (d, tot) => `${d} / ${tot}`,
        countingRound:    (n, tot) => `Manche ${n} / ${tot}`,
        countingGood:     '¡Fantástico! ¡Eres increíble! 🌟',
        countingBad:      '¡Sigue intentándolo, puedes hacerlo! 💛',
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
    const result = typeof val === 'function' ? val(...args) : val;
    return typeof result === 'string' ? result.replace(/\{name\}/g, getChildName()) : result;
}
