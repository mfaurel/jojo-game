import { App } from '@capacitor/app';

// Maps a running scene key to the scene it should navigate back to.
// Scenes that handle their own back (SpellingScene, MathProblemScene) are omitted.
const BACK_MAP = {
    SpellingMenu:          'MainMenu',
    CastleScene:           'SpellingMenu',
    MemoryMenuScene:       'MainMenu',
    MemoryScene:           'MemoryMenuScene',
    CountingMenuScene:     'MainMenu',
    CountingScene:         'CountingMenuScene',
    MathWorldSelectScene:  'MainMenu',
    MathDungeon:           'MathWorldSelectScene',
    MathVictoryScene:      'MathWorldSelectScene',
    CollectionScene:       'MainMenu',
};

export function initBackButton(game) {
    App.addListener('backButton', () => {
        const scenes = game.scene.scenes;

        // ExitConfirmScene is already open — do nothing (its "Non" button closes it)
        if (scenes.some(s => s.sys.settings.key === 'ExitConfirmScene' && s.sys.settings.active)) {
            return;
        }

        // ParentalGateScene is open — close it
        const gate = scenes.find(s => s.sys.settings.key === 'ParentalGateScene' && s.sys.settings.active);
        if (gate) { gate.scene.stop('ParentalGateScene'); return; }

        // Find the topmost active non-Boot/non-Preloader scene
        const active = scenes.filter(s =>
            s.sys.settings.active &&
            !['Boot', 'Preloader'].includes(s.sys.settings.key)
        );

        if (active.length === 0) return;

        // Sort by scene index (higher index = on top)
        active.sort((a, b) => game.scene.getIndex(b) - game.scene.getIndex(a));
        const top = active[0].sys.settings.key;

        if (top === 'MainMenu') {
            game.scene.launch('ExitConfirmScene');
            return;
        }

        const dest = BACK_MAP[top];
        if (dest) {
            game.scene.start(dest);
        }
    });
}
