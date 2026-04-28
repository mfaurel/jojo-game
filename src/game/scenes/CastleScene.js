import { Scene } from 'phaser';
import { MapBuilder } from '../systems/MapBuilder.js';
import { PlayerController } from '../systems/PlayerController.js';
import { GateManager } from '../systems/GateManager.js';
import { MAP_GRID, GATES, PLAYER_START } from '../data/MapData.js';

export class CastleScene extends Scene {
    constructor() {
        super('CastleScene');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x1a1a5e);

        // Build static castle map
        const mapBuilder = new MapBuilder(this);
        mapBuilder.build(MAP_GRID);

        // Gates (must come before player so layering is correct)
        this.gateManager = new GateManager(this, GATES);

        // Jolyne player
        this.player = new PlayerController(this, PLAYER_START.col, PLAYER_START.row);

        // HUD
        this._buildHUD();

        this.gatesUnlocked = 0;
        this.totalGates    = GATES.length;

        // Brief intro fade
        this.cameras.main.fadeIn(600);
    }

    _buildHUD() {
        // Title bar (scrollFactor 0 = fixed on screen)
        this.add.text(512, 14, '🏰 Le Château de Jolyne', {
            fontSize: '20px',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(30);

        // Gate counter stars
        this.starIcons = [];
        for (let i = 0; i < GATES.length; i++) {
            const star = this.add.text(860 + i * 30, 8, '☆', {
                fontSize: '22px',
                color: '#555577',
            }).setScrollFactor(0).setDepth(30);
            this.starIcons.push(star);
        }
    }

    onGateUnlocked() {
        const idx = this.gatesUnlocked;
        this.starIcons[idx].setText('★').setColor('#ffd700');
        this.gatesUnlocked++;
    }

    onGoalReached() {
        if (this.gatesUnlocked < this.totalGates) return; // not all solved yet

        this.cameras.main.fadeOut(800, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('VictoryScene');
        });
    }

    update() {
        this.player.update();
    }
}
