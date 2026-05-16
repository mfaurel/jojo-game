import { Scene } from 'phaser';
import { MATH_WORLDS, getMathProgress, getMathUnlocked } from '../data/MathWorldData.js';
import { t } from '../data/I18n.js';

export class MathWorldSelectScene extends Scene {
    constructor() {
        super('MathWorldSelectScene');
    }

    create() {
        const { width, height } = this.cameras.main;

        this.cameras.main.setBackgroundColor(0x08080f);
        document.body.style.backgroundColor = '#08080f';

        // Graph-paper grid background
        const gridGfx = this.add.graphics();
        gridGfx.lineStyle(1, 0x1a2a1a, 0.35);
        for (let x = 0; x < width; x += 48) gridGfx.lineBetween(x, 0, x, height);
        for (let y = 0; y < height; y += 48) gridGfx.lineBetween(0, y, width, y);

        // Yellow math glow at center
        const glow = this.add.graphics();
        glow.fillGradientStyle(0xffdd00, 0xffdd00, 0x08080f, 0x08080f, 0.22, 0.22, 0, 0);
        glow.fillCircle(width / 2, height / 2, 380);
        glow.setAlpha(0.45);

        // Floating math symbols
        const symbols = ['∑', 'π', '÷', '×', '=', '+', '−', '²', '√', '∞', '7', '3', '9', '%', '!'];
        for (let i = 0; i < 20; i++) {
            const sx = 40 + Math.random() * (width - 80);
            const sy = 40 + Math.random() * (height - 80);
            const sym = symbols[Math.floor(Math.random() * symbols.length)];
            const alpha = 0.08 + Math.random() * 0.14;
            const fsize = Math.floor(18 + Math.random() * 28);
            const symTxt = this.add.text(sx, sy, sym, {
                fontSize: `${fsize}px`,
                fontFamily: 'Arial Black, monospace',
                color: '#ffd700',
            }).setAlpha(alpha).setOrigin(0.5);
            this.tweens.add({
                targets: symTxt,
                alpha: alpha * 0.2,
                duration: 1800 + Math.random() * 2400,
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 2000,
            });
        }

        this.add.text(512, 55, t('mathWorldTitle'), {
            fontSize: '44px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#2a0055',
            strokeThickness: 6,
        }).setOrigin(0.5);

        this.add.text(512, 118, t('chooseMathWorld'), {
            fontSize: '24px',
            color: '#ddaaff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5);

        this._buildWorldCards();

        const backBtn = this.add.text(20, 20, t('back'), {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#2a2a88',
            padding: { x: 10, y: 5 }
        }).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.scene.start('MainMenu'));
    }

    _buildWorldCards() {
        const progress  = getMathProgress();
        const cardW     = 200;
        const cardH     = 155;
        const gap       = 40;
        const totalW    = 3 * cardW + 2 * gap;   // 680
        const startX    = (1024 - totalW) / 2;    // 172

        const addWorlds = MATH_WORLDS.filter(w => (w.operation ?? 'add') === 'add');
        const subWorlds = MATH_WORLDS.filter(w => w.operation === 'sub');

        // ── Section header: Addition ─────────────────────────────────────────
        this.add.text(512, 162, t('additionSection'), {
            fontSize: '20px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#aaddff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5);

        addWorlds.forEach((world, i) => {
            const cx = startX + i * (cardW + gap) + cardW / 2;
            this._buildCard(world, cx, 278, cardW, cardH, progress);
        });

        // ── Divider ──────────────────────────────────────────────────────────
        const div = this.add.graphics();
        div.lineStyle(1, 0x445566, 0.6);
        div.lineBetween(80, 375, 944, 375);

        // ── Section header: Soustraction ─────────────────────────────────────
        this.add.text(512, 390, t('subtractionSection'), {
            fontSize: '20px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffddaa',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5);

        subWorlds.forEach((world, i) => {
            const cx = startX + i * (cardW + gap) + cardW / 2;
            this._buildCard(world, cx, 510, cardW, cardH, progress);
        });
    }

    _buildCard(world, cx, cy, cardW, cardH, progress) {
        const done      = !!progress[world.id];
        const unlocked  = getMathUnlocked(world.id);
        const bgColor   = unlocked ? world.btnColor : 0x444444;

        if (done) {
            const border = this.add.rectangle(cx, cy, cardW + 6, cardH + 6, 0xffd700, 1)
                .setDepth(9);
            this.tweens.add({
                targets: border,
                alpha: 0.4,
                duration: 900,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.InOut',
            });
        }

        const bg = this.add.rectangle(cx, cy, cardW, cardH, bgColor, 1).setDepth(10);
        if (unlocked) bg.setInteractive({ useHandCursor: true });

        this.add.text(cx, cy - 20, world.emoji, { fontSize: '34px', padding: { top: 8, bottom: 4 } })
            .setOrigin(0.5).setDepth(11);

        this.add.text(cx, cy + 6, t(world.nameKey), {
            fontSize: '14px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5).setDepth(11);

        this.add.text(cx, cy + 26, t('worldLabel', world.id + 1), {
            fontSize: '12px',
            color: '#aaccff',
        }).setOrigin(0.5).setDepth(11);

        const formula = world.operation === 'sub'
            ? `1–${world.numMax} − 0–${world.numMax}`
            : `1–${world.numMax} + 1–${world.numMax}`;
        this.add.text(cx, cy + 46, formula, {
            fontSize: '11px',
            color: '#ffddaa',
        }).setOrigin(0.5).setDepth(11);

        if (done) {
            this.add.text(cx + cardW / 2 - 14, cy - cardH / 2 + 10, '★', {
                fontSize: '18px',
                color: '#ffd700',
            }).setOrigin(0.5).setDepth(12);
        }

        if (!unlocked) {
            this.add.rectangle(cx, cy, cardW, cardH, 0x000000, 0.5).setDepth(13);
            this.add.text(cx, cy - 10, '🔒', { fontSize: '36px', padding: { top: 8, bottom: 4 } })
                .setOrigin(0.5).setDepth(14);
            this.add.text(cx, cy + 32, t('completePrevWorld'), {
                fontSize: '11px',
                color: '#ffaaaa',
                align: 'center',
            }).setOrigin(0.5).setDepth(14);
        } else {
            bg.on('pointerover', () => bg.setFillStyle(world.btnColor + 0x101010, 1));
            bg.on('pointerout',  () => bg.setFillStyle(world.btnColor, 1));
            bg.on('pointerup',   () => this._startWorld(world.id));
        }
    }

    _startWorld(worldIndex) {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('MathDungeon', { worldIndex });
        });
    }
}
