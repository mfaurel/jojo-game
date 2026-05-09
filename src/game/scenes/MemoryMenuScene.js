import { Scene } from 'phaser';
import { MEMORY_LEVELS, getMemoryProgress, isMemoryUnlocked } from '../data/MemoryData.js';
import { t } from '../data/I18n.js';

const ROW_LABELS = ['memoryRow1', 'memoryRow2', 'memoryRow3'];
const ROW_COLORS = [0x1a3a8a, 0x1a5a3a, 0x5a1a6a];

export class MemoryMenuScene extends Scene {
    constructor() {
        super('MemoryMenuScene');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x0a1830);

        this._drawStars();

        this.add.text(512, 44, t('memoryTitle'), {
            fontSize: '44px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#2a0055',
            strokeThickness: 6,
        }).setOrigin(0.5);

        this.add.text(512, 96, t('memoryChoose'), {
            fontSize: '24px',
            color: '#ddaaff',
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

    _buildGrid() {
        const progress  = getMemoryProgress();
        const cardW = 260;
        const cardH = 130;
        const gapX  = 28;
        const gapY  = 20;

        // 3 rows of 3 cards each (rows × 3 levels per row)
        const totalW = 3 * cardW + 2 * gapX;
        const startX = (1024 - totalW) / 2 + cardW / 2;
        const rowYs  = [230, 390, 550];

        // Row headers
        rowYs.forEach((ry, rowIdx) => {
            this.add.text(512, ry - 54, t(ROW_LABELS[rowIdx]), {
                fontSize: '17px',
                color: '#aaddff',
                stroke: '#000',
                strokeThickness: 2,
            }).setOrigin(0.5).setDepth(1);

            const div = this.add.graphics().setDepth(0);
            div.lineStyle(1, 0x445566, 0.5);
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
                this.add.text(cx, cy - 10, '🔒', { fontSize: '30px' }).setOrigin(0.5).setDepth(13);
                this.add.text(cx, cy + 24, t('completePrevWorld'), {
                    fontSize: '11px', color: '#ffaaaa', align: 'center',
                }).setOrigin(0.5).setDepth(13);
                return;
            }

            // Label: grid size + number
            const gridLabel = `${level.cols}×${level.rows}`;
            this.add.text(cx, cy - 28, gridLabel, {
                fontSize: '28px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 3,
            }).setOrigin(0.5).setDepth(10);

            this.add.text(cx, cy + 12, t('levelLabel', level.id + 1), {
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

    _drawStars() {
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 768;
            const r = 0.5 + Math.random() * 1.5;
            const s = this.add.circle(x, y, r, 0xffffff, 0.5 + Math.random() * 0.5);
            this.tweens.add({
                targets: s, alpha: 0.05 + Math.random() * 0.15,
                duration: 1000 + Math.random() * 2500,
                yoyo: true, repeat: -1, delay: Math.random() * 2000,
            });
        }
    }
}
