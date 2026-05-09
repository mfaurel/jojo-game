import { Boot }          from './scenes/Boot';
import { Preloader }      from './scenes/Preloader';
import { MainMenu }       from './scenes/MainMenu';
import { SpellingMenu }   from './scenes/SpellingMenu';
import { MemoryMenuScene } from './scenes/MemoryMenuScene';
import { MemoryScene }    from './scenes/MemoryScene';
import { CountingMenuScene } from './scenes/CountingMenuScene';
import { CountingScene }  from './scenes/CountingScene';
import { MathWorldSelectScene } from './scenes/MathWorldSelectScene';
import { MathDungeon }    from './scenes/MathDungeon';
import { MathProblemScene } from './scenes/MathProblemScene';
import { MathVictoryScene } from './scenes/MathVictoryScene';
import { CastleScene }    from './scenes/CastleScene';
import { SpellingScene }  from './scenes/SpellingScene';
import { VictoryScene }   from './scenes/VictoryScene';
import { RewardPopup }    from './scenes/RewardPopup';
import { CollectionScene } from './scenes/CollectionScene';
import { AUTO, Game, Scale } from 'phaser';

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
        Preloader,
        MainMenu,
        SpellingMenu,
        MemoryMenuScene,
        MemoryScene,
        CountingMenuScene,
        CountingScene,
        MathWorldSelectScene,
        MathDungeon,
        MathProblemScene,
        MathVictoryScene,
        CastleScene,
        SpellingScene,
        VictoryScene,
        RewardPopup,
        CollectionScene,
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
};

export default StartGame;
