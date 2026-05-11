import { Scene } from 'phaser';
import { MEMORY_LEVELS, getMemoryProgress, isMemoryUnlocked } from '../data/MemoryData.js';
import { t } from '../data/I18n.js';

const ROW_LABELS = ['memoryRow1', 'memoryRow2', 'memoryRow3'];
const ROW_COLORS = [0x1a3a8a, 0x1a5a3a, 0x5a1a6a];

// Theme emoji for each level based on its word pool
const LEVEL_THEME_EMOJI = [
    '🐱🐻', // 0: animals
    '🍎🥝', // 1: fruits
    '👨👩', // 2: family
    '🐱🐮', // 3: animals+
    '🍎👑', // 4: fruits + roi
    '👩🌙', // 5: family + lune
    '🐱🐺', // 6: animals++
    '🍎🍐', // 7: fruits++
    '👶🐱', // 8: family + animals
];

export class MemoryMenuScene extends Scene {
    constructor() {
        super('MemoryMenuScene');
    }

    create() {
        this._drawBackground();

        this.add.text(512, 44, t('memoryTitle'), {
            fontSize: '44px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#2a0055',
            strokeThickness: 6,
        }).setOrigin(0.5);

        this.add.text(512, 96, t('memoryChoose'), {
            fontSize: '24px',
            color: '#ffcc88',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5);

        this._buildGrid();

        const backBtn = this.add.text(18, 18, t('back'), {
            fontSize: '22px',
            color: '#ffffff',
            backgroundColor: '#2a2a88',
            padding: { x: 10, y: 5 },
        }).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.scene.start('MainMenu'));

        const progress  = getMemoryProgress();
        const doneCnt   = MEMORY_LEVELS.filter(l => progress[l.id]).length;
        if (doneCnt > 0) {
            this.add.text(512, 128, t('memoryProgress', doneCnt, MEMORY_LEVELS.length), {
                fontSize: '18px',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 2,
            }).setOrigin(0.5);
        }
    }

    _drawBackground() {
        const { width, height } = this.cameras.main;
        this.cameras.main.setBackgroundColor(0x08040f);

        const g = this.add.graphics();

        // Deep warm glow layers — orange/amber theme for "memory"
        const glows = [
            { x: width * 0.5,  y: height * 0.48, r: 340, c: 0xff5500, a: 0.04 },
            { x: width * 0.5,  y: height * 0.48, r: 220, c: 0xff7700, a: 0.07 },
            { x: width * 0.5,  y: height * 0.48, r: 120, c: 0xffaa00, a: 0.10 },
            { x: width * 0.22, y: height * 0.28, r: 110, c: 0xff4400, a: 0.05 },
            { x: width * 0.78, y: height * 0.68, r: 100, c: 0xff6600, a: 0.05 },
        ];
        glows.forEach(gl => {
            g.fillStyle(gl.c, gl.a);
            g.fillCircle(gl.x, gl.y, gl.r);
        });

        // Neural-network suggestion lines (memory theme)
        g.lineStyle(1, 0xff8800, 0.10);
        const nodes = [
            [width * 0.15, height * 0.12], [width * 0.50, height * 0.07],
            [width * 0.85, height * 0.18], [width * 0.08, height * 0.50],
            [width * 0.92, height * 0.44], [width * 0.28, height * 0.82],
            [width * 0.72, height * 0.88], [width * 0.50, height * 0.96],
        ];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i][0] - nodes[j][0];
                const dy = nodes[i][1] - nodes[j][1];
                if (dx * dx + dy * dy < 140000) {
                    g.lineBetween(nodes[i][0], nodes[i][1], nodes[j][0], nodes[j][1]);
                }
            }
        }
        nodes.forEach(([nx, ny]) => {
            g.fillStyle(0xff9900, 0.25);
            g.fillCircle(nx, ny, 3);
        });

        // Stars with warm tones
        for (let i = 0; i < 55; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = 0.5 + Math.random() * 1.5;
            const warm = Math.random() < 0.35;
            const c = warm ? 0xffbb44 : 0xffffff;
            const s = this.add.circle(x, y, r, c, 0.3 + Math.random() * 0.5);
            this.tweens.add({
                targets: s, alpha: 0.04 + Math.random() * 0.12,
                duration: 1000 + Math.random() * 2500,
                yoyo: true, repeat: -1, delay: Math.random() * 2000,
            });
        }
    }

    _buildGrid() {
        const progress  = getMemoryProgress();
        const cardW = 260;
        const cardH = 130;
        const gapX  = 28;

        const totalW = 3 * cardW + 2 * gapX;
        const startX = (1024 - totalW) / 2 + cardW / 2;
        const rowYs  = [230, 390, 550];

        // Row headers
        rowYs.forEach((ry, rowIdx) => {
            this.add.text(512, ry - 54, t(ROW_LABELS[rowIdx]), {
                fontSize: '17px',
                color: '#ffcc88',
                stroke: '#000',
                strokeThickness: 2,
            }).setOrigin(0.5).setDepth(1);

            const div = this.add.graphics().setDepth(0);
            div.lineStyle(1, 0x664422, 0.5);
            div.lineBetween(80, ry - 72, 944, ry - 72);
        });

        MEMORY_LEVELS.forEach((level, i) => {
            const col     = i % 3;
            const row     = Math.floor(i / 3);
            const cx      = startX + col * (cardW + gapX);
            const cy      = rowYs[row];
            const done    = !!progress[level.id];
            const locked  = !isMemoryUnlocked(level.id);
            const color   = locked ? 0x333344 : ROW_COLORS[row];

            if (done) {
                const border = this.add.rectangle(cx, cy, cardW + 6, cardH + 6, 0xffd700, 1).setDepth(8);
                this.tweens.add({
                    targets: border, alpha: 0.4, duration: 900,
                    yoyo: true, repeat: -1, ease: 'Sine.InOut',
                });
            }

            const bg = this.add.rectangle(cx, cy, cardW, cardH, color, 1).setDepth(9);

            if (!locked) {
                bg.setInteractive({ useHandCursor: true });
                bg.on('pointerover', () => bg.setFillStyle(color + 0x111111, 1));
                bg.on('pointerout',  () => bg.setFillStyle(color, 1));
                bg.on('pointerup',   () => this._start(level.id));
            }

            if (locked) {
                this.add.rectangle(cx, cy, cardW, cardH, 0x000000, 0.5).setDepth(12);
                this.add.text(cx, cy - 6, '🔒', { fontSize: '30px', padding: { top: 8, bottom: 4 } }).setOrigin(0.5).setDepth(13);
                this.add.text(cx, cy + 26, t('completePrevWorld'), {
                    fontSize: '11px', color: '#ffaaaa', align: 'center',
                }).setOrigin(0.5).setDepth(13);
                return;
            }

            // Label: grid size
            const gridLabel = `${level.cols}×${level.rows}`;
            this.add.text(cx - 60, cy - 28, gridLabel, {
                fontSize: '28px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 3,
            }).setOrigin(0.5).setDepth(10);

            // Theme emoji
            this.add.text(cx + 60, cy - 20, LEVEL_THEME_EMOJI[i], {
                fontSize: '28px',
                padding: { top: 6, bottom: 4 },
            }).setOrigin(0.5).setDepth(10);

            this.add.text(cx, cy + 16, t('levelLabel', level.id + 1), {
                fontSize: '13px',
                color: '#aaccff',
            }).setOrigin(0.5).setDepth(10);

            if (done) {
                this.add.text(cx + cardW / 2 - 16, cy - cardH / 2 + 12, '★', {
                    fontSize: '20px', color: '#ffd700',
                }).setOrigin(0.5).setDepth(11);
            }
        });
    }

    _start(levelId) {
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('MemoryScene', { levelIndex: levelId });
        });
    }
}
