import { Scene } from 'phaser';
import { checkAndUnlock } from '../services/AchievementService.js';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    create ()
    {
        checkAndUnlock('welcome');
        this.cameras.main.setBackgroundColor(0x1a1a5e);
        this.scene.start('Preloader');
    }
}
