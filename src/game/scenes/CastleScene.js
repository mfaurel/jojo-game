import { Scene } from 'phaser';
import { MapBuilder } from '../systems/MapBuilder.js';
import { PlayerController } from '../systems/PlayerController.js';
import { GateManager } from '../systems/GateManager.js';
import { GATE_POSITIONS, PLAYER_START, createGrid } from '../data/MapData.js';
import { LEVELS } from '../data/LevelData.js';

export class CastleScene extends Scene {
    constructor() {
        super('CastleScene');
    }

    init(data) {
        this.levelIndex = data?.levelIndex ?? 0;
    }

    create() {
        const level = LEVELS[this.levelIndex];
        this.cameras.main.setBackgroundColor(level.bg);

        const grid = createGrid();

        const mapBuilder = new MapBuilder(this);
        mapBuilder.build(grid);

        // Combine gate positions with this level's word keys
        const gates = GATE_POSITIONS.map((pos, i) => ({
            ...pos,
            wordKey: level.words[i],
        }));

        this.gateManager = new GateManager(this, gates, grid);
        this.player      = new PlayerController(this, PLAYER_START.col, PLAYER_START.row, grid);

        this.gatesUnlocked = 0;
        this.totalGates    = gates.length;

        this._buildHUD(level.name);
        this.cameras.main.fadeIn(600);
    }

    _buildHUD(levelName) {
        this.add.text(512, 14, `🏰 ${levelName}`, {
            fontSize: '20px',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(30);

        this.starIcons = [];
        for (let i = 0; i < this.totalGates; i++) {
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
        if (this.gatesUnlocked < this.totalGates) return;

        this.cameras.main.fadeOut(800, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('VictoryScene', { levelIndex: this.levelIndex });
        });
    }

    update() {
        this.player.update();
    }
}
