import { Scene } from 'phaser';
import { LEVELS, getProgress, getSpellingUnlocked, getEquipment } from '../data/LevelData.js';
import { ITEMS } from '../data/ItemData.js';
import { t } from '../data/I18n.js';

export class SpellingMenu extends Scene {
    constructor() {
        super('SpellingMenu');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x1a1a5e);

        // Night sky stars
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 420;
            const r = 1 + Math.random() * 2;
            const star = this.add.circle(x, y, r, 0xffffff, 0.6 + Math.random() * 0.4);
            this.tweens.add({
                targets: star,
                alpha: 0.1 + Math.random() * 0.3,
                duration: 1000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 1500,
            });
        }

        this._drawCastle();

        this.add.text(512, 55, t('spellingTitle'), {
            fontSize: '44px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#2a0055',
            strokeThickness: 6,
        }).setOrigin(0.5);

        this.add.text(512, 118, t('spellingSubtitle'), {
            fontSize: '24px',
            color: '#ddaaff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5);

        this._drawCharacter(512, 210);

        this.add.text(512, 290, t('chooseLevel'), {
            fontSize: '26px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5);

        this._buildLevelCards();

        // Back to main selection
        const backBtn = this.add.text(20, 20, t('back'), {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#2a2a88',
            padding: { x: 10, y: 5 }
        }).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.scene.start('MainMenu'));
    }

    _buildLevelCards() {
        const progress = getProgress();
        const cardW = 175;
        const cardH = 105;
        const gap   = 9;
        const row1Levels = LEVELS.slice(0, 5);
        const row2Levels = LEVELS.slice(5);
        const totalW  = 5 * cardW + 4 * gap;
        const startX  = (1024 - totalW) / 2;

        // ── Row 1 header ──────────────────────────────────────────────────────
        this.add.text(512, 332, t('spellingRow1'), {
            fontSize: '16px',
            color: '#aaddff',
            stroke: '#000',
            strokeThickness: 2,
        }).setOrigin(0.5).setDepth(10);

        row1Levels.forEach((level, i) => {
            const cx = startX + i * (cardW + gap) + cardW / 2;
            this._buildCard(level, cx, 400, cardW, cardH, progress, true);
        });

        // ── Divider ───────────────────────────────────────────────────────────
        const div = this.add.graphics().setDepth(9);
        div.lineStyle(1, 0x445566, 0.6);
        div.lineBetween(80, 460, 944, 460);

        // ── Row 2 header ──────────────────────────────────────────────────────
        this.add.text(512, 475, t('spellingRow2'), {
            fontSize: '16px',
            color: '#ffddaa',
            stroke: '#000',
            strokeThickness: 2,
        }).setOrigin(0.5).setDepth(10);

        row2Levels.forEach((level, i) => {
            const cx = startX + i * (cardW + gap) + cardW / 2;
            this._buildCard(level, cx, 545, cardW, cardH, progress, false);
        });
    }

    _buildCard(level, cx, cy, cardW, cardH, progress, alwaysUnlocked) {
        const done     = !!progress[level.id];
        const unlocked = alwaysUnlocked || getSpellingUnlocked(level.id);
        const color    = unlocked ? level.btnColor : 0x444444;

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

        const bg = this.add.rectangle(cx, cy, cardW, cardH, color, 1).setDepth(10);

        if (unlocked) {
            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerover', () => bg.setFillStyle(level.btnColor + 0x101010, 1));
            bg.on('pointerout',  () => bg.setFillStyle(level.btnColor, 1));
            bg.on('pointerup',   () => this._startLevel(level.id));
        }

        this.add.text(cx, cy - 28, level.emoji, {
            fontSize: '28px',
            padding: { top: 8, bottom: 4 },
        }).setOrigin(0.5).setDepth(11);

        if (!unlocked) {
            this.add.rectangle(cx, cy, cardW, cardH, 0x000000, 0.5).setDepth(13);
            this.add.text(cx, cy - 4, '🔒', { fontSize: '28px', padding: { top: 8, bottom: 4 } }).setOrigin(0.5).setDepth(14);
            this.add.text(cx, cy + 24, t('completePrevWorld'), {
                fontSize: '10px',
                color: '#ffaaaa',
                align: 'center',
            }).setOrigin(0.5).setDepth(14);
            return;
        }

        this.add.text(cx, cy + 4, t(level.nameKey), {
            fontSize: '14px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5).setDepth(11);

        this.add.text(cx, cy + 24, t('levelLabel', level.id + 1), {
            fontSize: '11px',
            color: '#aaccff',
        }).setOrigin(0.5).setDepth(11);

        if (done) {
            this.add.text(cx + cardW / 2 - 14, cy - cardH / 2 + 10, '★', {
                fontSize: '18px',
                color: '#ffd700',
            }).setOrigin(0.5).setDepth(12);
        }
    }

    _startLevel(levelIndex) {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('CastleScene', { levelIndex });
        });
    }

    _drawCastle() {
        const g = this.add.graphics();

        // Ground — dark hill extending to canvas bottom
        g.fillStyle(0x0e0830, 1);
        g.fillRect(0, 308, 1024, 460);

        // ── Curtain wall ──────────────────────────────────────────────────────
        g.fillStyle(0x221362, 1);
        g.fillRect(140, 252, 744, 56);
        for (let i = 0; i <= 19; i++) {
            if (i % 2 === 0) g.fillRect(140 + i * 39, 232, 22, 21);
        }

        // ── Left tower ────────────────────────────────────────────────────────
        g.fillStyle(0x1c1056, 1);
        g.fillRect(110, 188, 122, 120);
        for (let i = 0; i < 4; i++) {
            if (i % 2 === 0) g.fillRect(110 + i * 32, 170, 20, 19);
        }
        g.fillStyle(0xffffff, 1); g.fillRect(169, 148, 3, 24);
        g.fillStyle(0xcc1133, 1); g.fillTriangle(172, 148, 172, 172, 192, 160);

        // ── Right tower ───────────────────────────────────────────────────────
        g.fillStyle(0x1c1056, 1);
        g.fillRect(792, 188, 122, 120);
        for (let i = 0; i < 4; i++) {
            if (i % 2 === 0) g.fillRect(792 + i * 32, 170, 20, 19);
        }
        g.fillStyle(0xffffff, 1); g.fillRect(851, 148, 3, 24);
        g.fillStyle(0xcc1133, 1); g.fillTriangle(854, 148, 854, 172, 874, 160);

        // ── Central keep ──────────────────────────────────────────────────────
        g.fillStyle(0x170e4e, 1);
        g.fillRect(386, 158, 252, 150);
        for (let i = 0; i < 7; i++) {
            if (i % 2 === 0) g.fillRect(386 + i * 36, 140, 22, 19);
        }
        g.fillStyle(0xffffff, 1); g.fillRect(510, 137, 3, 25);
        g.fillStyle(0xcc1133, 1); g.fillTriangle(513, 137, 513, 162, 532, 149);

        // ── Gate arch ─────────────────────────────────────────────────────────
        g.fillStyle(0x060612, 1);
        g.fillRect(464, 252, 96, 56);
        g.fillCircle(512, 252, 48);

        // ── Windows ───────────────────────────────────────────────────────────
        g.fillStyle(0xffaa33, 0.8);
        g.fillCircle(448, 204, 11);
        g.fillCircle(576, 204, 11);
        g.fillStyle(0xffaa33, 0.6);
        g.fillCircle(171, 235, 9);
        g.fillCircle(853, 235, 9);
    }

    _drawCharacter(cx, cy) {
        if (!this.textures.exists('jojo_pixel')) return;

        const equip    = getEquipment();
        const skinItem = ITEMS.find(i => i.id === (equip.skin ?? 'skin_default'));
        const char     = this.add.image(cx, cy, 'jojo_pixel').setDisplaySize(120, 120);
        if (skinItem?.tint) char.setTint(skinItem.tint);

        this.tweens.add({
            targets: char,
            y: cy - 12,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.InOut',
        });
    }
}
