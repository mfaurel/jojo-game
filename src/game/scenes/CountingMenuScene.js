import { Scene } from 'phaser';
import { COUNTING_LEVELS, getCountingProgress, isCountingUnlocked } from '../data/CountingData.js';
import { t } from '../data/I18n.js';

const CARD_COLORS = [0x1a4a2a, 0x1a3a6a, 0x4a1a6a, 0x4a2a1a, 0x2a4a1a];

export class CountingMenuScene extends Scene {
    constructor() {
        super('CountingMenuScene');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x0b1a08);

        this._drawStars();

        this.add.text(512, 44, t('countingTitle'), {
            fontSize: '44px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#2a0055',
            strokeThickness: 6,
        }).setOrigin(0.5);

        this.add.text(512, 96, t('countingChoose'), {
            fontSize: '24px',
            color: '#ddffaa',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5);

        const progress = getCountingProgress();
        const doneCnt  = COUNTING_LEVELS.filter(l => progress[l.id]).length;
        if (doneCnt > 0) {
            this.add.text(512, 128, t('countingProgress', doneCnt, COUNTING_LEVELS.length), {
                fontSize: '18px',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 2,
            }).setOrigin(0.5);
        }

        this._buildCards(progress);

        const backBtn = this.add.text(18, 18, t('back'), {
            fontSize: '22px',
            color: '#ffffff',
            backgroundColor: '#224422',
            padding: { x: 10, y: 5 },
        }).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.scene.start('MainMenu'));
    }

    _buildCards(progress) {
        const cardW  = 160;
        const cardH  = 180;
        const gap    = 28;
        const totalW = COUNTING_LEVELS.length * cardW + (COUNTING_LEVELS.length - 1) * gap;
        const startX = (1024 - totalW) / 2 + cardW / 2;
        const cy     = 420;

        COUNTING_LEVELS.forEach((level, i) => {
            const cx      = startX + i * (cardW + gap);
            const done    = !!progress[level.id];
            const locked  = !isCountingUnlocked(level.id);
            const color   = locked ? 0x333333 : CARD_COLORS[i] ?? 0x224422;

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
                this.add.rectangle(cx, cy, cardW, cardH, 0x000000, 0.55).setDepth(12);
                this.add.text(cx, cy - 10, '🔒', { fontSize: '30px' }).setOrigin(0.5).setDepth(13);
                this.add.text(cx, cy + 28, t('completePrevWorld'), {
                    fontSize: '11px', color: '#ffaaaa', align: 'center',
                }).setOrigin(0.5).setDepth(13);
                return;
            }

            // Difficulty indicators
            const stars = level.types === 1 ? '★' : level.types === 2 ? '★★' : '★★★';
            this.add.text(cx, cy - 58, stars, {
                fontSize: '22px',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 2,
            }).setOrigin(0.5).setDepth(10);

            this.add.text(cx, cy - 20, t('levelLabel', level.id + 1), {
                fontSize: '20px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#ffffff',
                stroke: '#000',
                strokeThickness: 3,
            }).setOrigin(0.5).setDepth(10);

            // Show type count + max count info
            const infoLine = `${level.types} 🔢 → ${level.maxCount}`;
            this.add.text(cx, cy + 16, infoLine, {
                fontSize: '16px',
                color: '#ccffcc',
                stroke: '#000',
                strokeThickness: 2,
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
            this.scene.start('CountingScene', { levelIndex: levelId });
        });
    }

    _drawStars() {
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 768;
            const r = 0.5 + Math.random() * 1.5;
            const s = this.add.circle(x, y, r, 0xffffff, 0.4 + Math.random() * 0.5);
            this.tweens.add({
                targets: s, alpha: 0.05 + Math.random() * 0.1,
                duration: 1200 + Math.random() * 2500,
                yoyo: true, repeat: -1, delay: Math.random() * 2000,
            });
        }
    }
}
