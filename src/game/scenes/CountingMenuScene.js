import { Scene } from 'phaser';
import { COUNTING_LEVELS, getCountingProgress, isCountingUnlocked } from '../data/CountingData.js';
import { t } from '../data/I18n.js';

const CARD_COLORS = [0x1a4a2a, 0x1a3a6a, 0x4a1a6a, 0x4a2a1a, 0x2a4a1a];

// Emoji themes matching each counting level's object pool
const LEVEL_EMOJI = [
    '🐱🐻',  // 0: animals (cats, bears, rabbits, cows, dogs)
    '🐄🐴',  // 1: farm animals (cows, rabbits, ponies, chickens, dogs)
    '🐱🐰',  // 2: mixed animals (cats, bears, rabbits, cows, dogs)
    '🍎🥝',  // 3: fruits (kiwi, apple, pear, fig, plum)
    '🐱🍎',  // 4: mixed animals + fruits
];

export class CountingMenuScene extends Scene {
    constructor() {
        super('CountingMenuScene');
    }

    create() {
        this._drawBackground();

        this.add.text(512, 44, t('countingTitle'), {
            fontSize: '44px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#2a0055',
            strokeThickness: 6,
        }).setOrigin(0.5);

        this.add.text(512, 96, t('countingChoose'), {
            fontSize: '24px',
            color: '#aaffcc',
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

    _drawBackground() {
        const { width, height } = this.cameras.main;
        this.cameras.main.setBackgroundColor(0x030d05);
        document.body.style.backgroundColor = '#030d05';

        const g = this.add.graphics();

        // Green glow layers — "counting numbers in nature" feel
        const glows = [
            { x: width * 0.5,  y: height * 0.50, r: 340, c: 0x00cc44, a: 0.04 },
            { x: width * 0.5,  y: height * 0.50, r: 210, c: 0x22dd55, a: 0.07 },
            { x: width * 0.5,  y: height * 0.50, r: 120, c: 0x44ff88, a: 0.09 },
            { x: width * 0.20, y: height * 0.30, r: 110, c: 0x00aa33, a: 0.05 },
            { x: width * 0.80, y: height * 0.70, r: 100, c: 0x00cc44, a: 0.05 },
        ];
        glows.forEach(gl => {
            g.fillStyle(gl.c, gl.a);
            g.fillCircle(gl.x, gl.y, gl.r);
        });

        // Floating digit dots (number theme)
        const digits = ['1', '2', '3', '4', '5'];
        for (let i = 0; i < 16; i++) {
            const sx = 40 + Math.random() * (width - 80);
            const sy = 40 + Math.random() * (height - 80);
            const d  = digits[Math.floor(Math.random() * digits.length)];
            const alpha = 0.05 + Math.random() * 0.10;
            const fsize = Math.floor(20 + Math.random() * 30);
            const dt = this.add.text(sx, sy, d, {
                fontSize: `${fsize}px`,
                fontFamily: 'Arial Black, monospace',
                color: '#44ff88',
            }).setAlpha(alpha).setOrigin(0.5);
            this.tweens.add({
                targets: dt, alpha: alpha * 0.15,
                duration: 1600 + Math.random() * 2200,
                yoyo: true, repeat: -1, delay: Math.random() * 2000,
            });
        }

        // Stars with cool green tint
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = 0.5 + Math.random() * 1.5;
            const cool = Math.random() < 0.3;
            const c = cool ? 0x88ffcc : 0xffffff;
            const s = this.add.circle(x, y, r, c, 0.3 + Math.random() * 0.4);
            this.tweens.add({
                targets: s, alpha: 0.03 + Math.random() * 0.10,
                duration: 1200 + Math.random() * 2500,
                yoyo: true, repeat: -1, delay: Math.random() * 2000,
            });
        }
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
                this.add.text(cx, cy - 8, '🔒', { fontSize: '30px', padding: { top: 8, bottom: 4 } }).setOrigin(0.5).setDepth(13);
                this.add.text(cx, cy + 28, t('completePrevWorld'), {
                    fontSize: '11px', color: '#ffaaaa', align: 'center',
                }).setOrigin(0.5).setDepth(13);
                return;
            }

            // Theme emoji for the level
            this.add.text(cx, cy - 62, LEVEL_EMOJI[i] ?? '🔢', {
                fontSize: '28px',
                padding: { top: 4, bottom: 4 },
            }).setOrigin(0.5).setDepth(10);

            this.add.text(cx, cy - 20, t('levelLabel', level.id + 1), {
                fontSize: '20px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#ffffff',
                stroke: '#000',
                strokeThickness: 3,
            }).setOrigin(0.5).setDepth(10);

            const diffStars = level.types === 1 ? '⭐' : level.types === 2 ? '⭐⭐' : '⭐⭐⭐';
            const infoLine = `${diffStars}  ×${level.maxCount}`;
            this.add.text(cx, cy + 18, infoLine, {
                fontSize: '15px',
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
}
