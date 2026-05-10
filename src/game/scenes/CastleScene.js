import { Scene } from 'phaser';
import { MapBuilder } from '../systems/MapBuilder.js';
import { PlayerController } from '../systems/PlayerController.js';
import { GateManager } from '../systems/GateManager.js';
import { LEVEL_MAPS, tileToPx } from '../data/MapData.js';
import { LEVELS } from '../data/LevelData.js';
import { t } from '../data/I18n.js';

export class CastleScene extends Scene {
    constructor() {
        super('CastleScene');
    }

    init(data) {
        this.levelIndex = data?.levelIndex ?? 0;
    }

    create() {
        const level   = LEVELS[this.levelIndex];
        const mapData = LEVEL_MAPS[this.levelIndex];
        this.cameras.main.setBackgroundColor(level.bg);

        const grid = mapData.grid.map(row => [...row]);

        const mapBuilder = new MapBuilder(this);
        mapBuilder.build(grid);

        const gates = mapData.gatePositions.map((pos, i) => ({
            ...pos,
            wordKey: level.words[i],
        }));

        this.gateManager = new GateManager(this, gates, grid);
        this.player      = new PlayerController(this, mapData.playerStart.col, mapData.playerStart.row, grid);

        const goalPos = tileToPx(mapData.goalTile.col, mapData.goalTile.row);
        const goalIcon = this.add.text(goalPos.x, goalPos.y - 20, '🏆', {
            fontSize: '36px'
        }).setOrigin(0.5).setDepth(8);
        this.tweens.add({
            targets: goalIcon,
            y: goalPos.y - 34,
            duration: 700,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.InOut'
        });

        this.gatesUnlocked = 0;
        this.totalGates    = gates.length;

        this._buildHUD(t(level.nameKey));
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

        const menuBtn = this.add.text(14, 14, t('menuBtn'), {
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#2a2a88',
            padding: { x: 10, y: 5 },
        }).setOrigin(0, 0).setScrollFactor(0).setDepth(30)
            .setInteractive({ useHandCursor: true });

        menuBtn.on('pointerup', () => this._showConfirmQuit());
    }

    _showConfirmQuit() {
        const { width, height } = this.cameras.main;
        const cx = width / 2, cy = height / 2;
        const elems = [];
        const dismiss = () => elems.forEach(e => { if (e.active) e.destroy(); });

        elems.push(
            this.add.rectangle(cx, cy, width, height, 0x000000, 0.75)
                .setScrollFactor(0).setDepth(50).setInteractive()
        );

        const panel = this.add.graphics().setScrollFactor(0).setDepth(51);
        panel.fillStyle(0x1a1a5e, 1);
        panel.fillRoundedRect(cx - 200, cy - 80, 400, 160, 16);
        panel.lineStyle(3, 0x4444aa, 1);
        panel.strokeRoundedRect(cx - 200, cy - 80, 400, 160, 16);
        elems.push(panel);

        elems.push(
            this.add.text(cx, cy - 32, t('confirmQuit'), {
                fontSize: '28px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#ffffff',
                stroke: '#000',
                strokeThickness: 4,
            }).setOrigin(0.5).setScrollFactor(0).setDepth(52)
        );

        const makeBtn = (bx, color, labelKey, onClick) => {
            const bg = this.add.rectangle(bx, cy + 38, 140, 52, color, 1)
                .setScrollFactor(0).setDepth(52).setInteractive({ useHandCursor: true });
            const txt = this.add.text(bx, cy + 38, t(labelKey), {
                fontSize: '24px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#ffffff',
            }).setOrigin(0.5).setScrollFactor(0).setDepth(53);
            bg.on('pointerup', onClick);
            elems.push(bg, txt);
        };

        makeBtn(cx - 80, 0x226622, 'confirmYes', () => {
            dismiss();
            this.scene.start('SpellingMenu');
        });
        makeBtn(cx + 80, 0x882222, 'confirmNo', () => dismiss());
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
            this.scene.start('VictoryScene', { levelIndex: this.levelIndex, gameType: 'spelling' });
        });
    }

    update() {
        this.player.update();
    }
}
