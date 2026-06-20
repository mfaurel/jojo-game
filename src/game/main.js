import { Boot }          from './scenes/Boot';
import { IntroScene }    from './scenes/IntroScene';
import { Preloader }      from './scenes/Preloader';
import { MainMenu }       from './scenes/MainMenu';
import { SpellingMenu }   from './scenes/SpellingMenu';
import { MemoryMenuScene } from './scenes/MemoryMenuScene';
import { MemoryScene }    from './scenes/MemoryScene';
import { CountingMenuScene } from './scenes/CountingMenuScene';
import { CountingScene }  from './scenes/CountingScene';
import { MathWorldSelectScene } from './scenes/MathWorldSelectScene';
import { InfiniteMathScene } from './scenes/InfiniteMathScene';
import { MathDungeon }    from './scenes/MathDungeon';
import { MathProblemScene } from './scenes/MathProblemScene';
import { MathVictoryScene } from './scenes/MathVictoryScene';
import { CastleScene }    from './scenes/CastleScene';
import { SpellingScene }  from './scenes/SpellingScene';
import { VictoryScene }   from './scenes/VictoryScene';
import { RewardPopup }    from './scenes/RewardPopup';
import { CollectionScene } from './scenes/CollectionScene';
import { ParentalGateScene } from './scenes/ParentalGateScene';
import { ExitConfirmScene }  from './scenes/ExitConfirmScene';
import { EndingScene }       from './scenes/EndingScene';
import { AUTO, Game, Scale } from 'phaser';
import { initAds }        from './services/AdService.js';
import { initIAP }        from './services/IAPService.js';
import { initBackButton } from './services/BackButtonHandler.js';
import { auth }           from './services/firebase.js';
import { loadFromCloud, applySaveSnapshot, buildSaveSnapshot, syncSave } from './services/SaveService.js';

const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#1a1a5e',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
        fullscreenTarget: 'game-container',
    },
    scene: [
        Boot,
        IntroScene,
        Preloader,
        MainMenu,
        SpellingMenu,
        MemoryMenuScene,
        MemoryScene,
        CountingMenuScene,
        CountingScene,
        MathWorldSelectScene,
        InfiniteMathScene,
        MathDungeon,
        MathProblemScene,
        MathVictoryScene,
        CastleScene,
        SpellingScene,
        VictoryScene,
        RewardPopup,
        CollectionScene,
        ParentalGateScene,
        ExitConfirmScene,
        EndingScene,
    ]
};

const StartGame = (parent) => {
    const game = new Game({ ...config, parent });

    initAds();
    initIAP();
    initBackButton(game);
    auth.onAuthStateChanged(async user => {
        if (user) {
            const cloud = await loadFromCloud();
            if (cloud && cloud.updatedAt > (buildSaveSnapshot().updatedAt || 0)) {
                applySaveSnapshot(cloud);
            } else {
                await syncSave();
            }
        }
    });

    // Chrome completes fullscreen transitions asynchronously; a delayed refresh
    // ensures Phaser recalculates the FIT dimensions in both directions.
    const onFullscreenChange = () => setTimeout(() => { game.scale.refresh(); }, 120);
    game.scale.on('enterfullscreen', onFullscreenChange);
    game.scale.on('leavefullscreen', onFullscreenChange);
    document.addEventListener('fullscreenchange',       onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);

    window.addEventListener('resize', () => { game.scale.refresh(); });

    window.addEventListener('orientationchange', () => {
        setTimeout(() => { game.scale.refresh(); }, 300);
    });

    return game;
};

export default StartGame;
