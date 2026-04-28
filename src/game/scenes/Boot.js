import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x1a1a5e);
        this.scene.start('Preloader');
    }
}
