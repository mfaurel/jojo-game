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
        }).setOrigin(0.5).setDepth(11);

        if (!unlocked) {
            this.add.rectangle(cx, cy, cardW, cardH, 0x000000, 0.5).setDepth(13);
            this.add.text(cx, cy - 8, '🔒', { fontSize: '28px' }).setOrigin(0.5).setDepth(14);
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

        g.fillStyle(0x2a1a6a, 1);
        g.fillRect(0, 620, 1024, 148);

        g.fillStyle(0x3a2a7a, 1);
        g.fillRect(312, 460, 400, 160);

        g.fillRect(250, 400, 100, 220);
        g.fillRect(674, 400, 100, 220);

        for (let i = 0; i < 7; i++) {
            g.fillRect(312 + i * 58, 440, 30, 22);
        }
        for (let i = 0; i < 3; i++) {
            g.fillRect(250 + i * 35, 378, 22, 24);
            g.fillRect(674 + i * 35, 378, 22, 24);
        }

        g.fillStyle(0x111122, 1);
        g.fillRect(448, 520, 128, 100);
        g.fillCircle(512, 520, 64);

        g.fillStyle(0x8899ff, 0.5);
        g.fillRect(280, 430, 30, 40);
        g.fillCircle(295, 430, 15);
        g.fillRect(704, 430, 30, 40);
        g.fillCircle(719, 430, 15);

        g.fillStyle(0xff4466, 1);
        g.fillTriangle(250, 370, 250, 340, 278, 355);
        g.fillStyle(0xffffff, 1);
        g.fillRect(248, 330, 4, 45);

        g.fillStyle(0xff4466, 1);
        g.fillTriangle(774, 370, 774, 340, 746, 355);
        g.fillStyle(0xffffff, 1);
        g.fillRect(772, 330, 4, 45);
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
