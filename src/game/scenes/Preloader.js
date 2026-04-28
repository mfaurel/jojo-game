import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    preload ()
    {
        // Load UI assets
        this.load.setPath('assets');
        
        // Load Vector SVGs
        this.load.svg('player', 'player.svg', { width: 128, height: 128 });
        this.load.svg('tile_floor', 'tile_floor.svg', { width: 128, height: 128 });
        this.load.svg('tile_wall', 'tile_wall.svg', { width: 128, height: 128 });
        this.load.svg('tile_goal', 'tile_goal.svg', { width: 128, height: 128 });
        this.load.svg('tile_gate', 'tile_gate.svg', { width: 128, height: 128 });

        // Load UI Assets
        this.load.svg('ui_panel', 'ui_panel.svg', { width: 600, height: 600 });
        this.load.svg('ui_button', 'ui_button.svg', { width: 100, height: 100 });
        this.load.svg('ui_button_red', 'ui_button_red.svg', { width: 100, height: 100 });
        this.load.svg('ui_tile', 'ui_tile.svg', { width: 128, height: 128 });
        this.load.svg('ui_slot', 'ui_slot.svg', { width: 128, height: 128 });
    }

    create ()
    {
        // Generate a small white circle texture for particle effects used in VictoryScene / GateManager
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xffffff, 1);
        g.fillCircle(8, 8, 8);
        g.generateTexture('particle', 16, 16);
        g.destroy();

        this.scene.start('MainMenu');
    }
}
