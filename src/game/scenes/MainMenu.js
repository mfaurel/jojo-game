import { Scene } from 'phaser';
import { getEquipment, addToInventory, getProgress, LEVELS } from '../data/LevelData.js';
import { ITEMS } from '../data/ItemData.js';
import { getMathProgress, MATH_WORLDS } from '../data/MathWorldData.js';
import { t, cycleLang, getLang } from '../data/I18n.js';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        const equip = getEquipment();

        if (equip.background === 'bg_castle') {
            this._drawCastleBg();
        } else if (equip.background === 'bg_galaxy') {
            this._drawGalaxyBg();
        } else if (equip.background === 'bg_spelling') {
            this._drawSpellingBg();
        } else {
            this._drawNightBg();
        }

        this.add.text(512, 150, t('gameTitle'), {
            fontSize: '64px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#2a0055',
            strokeThickness: 8,
        }).setOrigin(0.5);

        this.add.text(512, 230, t('gameSubtitle'), {
            fontSize: '28px',
            color: '#ddaaff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5);

        this._createChoiceButton(512, 380, t('btnSpelling'), 0x2a2a88, () => {
            this.scene.start('SpellingMenu');
        });

        this._createChoiceButton(512, 540, t('btnMath'), 0x2266aa, () => {
            this.scene.start('MathWorldSelectScene');
        });

        const spellingDone = LEVELS.filter(l => getProgress()[l.id]).length;
        if (spellingDone > 0) {
            this.add.text(512, 430, t('spellingProgress', spellingDone, LEVELS.length), {
                fontSize: '20px',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 3,
            }).setOrigin(0.5, 0);
        }

        const mathDone = MATH_WORLDS.filter((_, i) => getMathProgress()[i]).length;
        if (mathDone > 0) {
            this.add.text(512, 590, t('mathProgress', mathDone, MATH_WORLDS.length), {
                fontSize: '20px',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 3,
            }).setOrigin(0.5, 0);
        }

        this._createSmallButton(900, 710, t('btnCollection'), 0xaa00aa, () => {
            this.scene.start('CollectionScene');
        });

        this._createLangButton();
        this._createFullscreenButton();

        this._initCheatCode();
    }

    // ── Background themes ─────────────────────────────────────────────────────

    _drawSpellingBg() {
        const { width, height } = this.cameras.main;
        this.cameras.main.setBackgroundColor(0x8b5a2b);
        this.add.image(width / 2, height / 2, 'jojopixelart_spelling')
            .setDisplaySize(width, height);
    }

    _drawNightBg() {
        const { width, height } = this.cameras.main;
        this.cameras.main.setBackgroundColor(0x1a1a5e);

        for (let i = 0; i < 70; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = 0.4 + Math.random() * 1.6;
            const star = this.add.circle(x, y, r, 0xffffff, 0.3 + Math.random() * 0.7);
            this.tweens.add({
                targets: star,
                alpha: 0.05 + Math.random() * 0.15,
                duration: 900 + Math.random() * 2800,
                yoyo: true, repeat: -1,
                delay: Math.random() * 2000,
            });
        }
        // A few bright particle glows
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height * 0.7;
            this.add.image(x, y, 'particle')
                .setScale(0.15 + Math.random() * 0.25)
                .setAlpha(0.5 + Math.random() * 0.5);
        }
    }

    _drawCastleBg() {
        const { width, height } = this.cameras.main;
        this.cameras.main.setBackgroundColor(0x100028);

        // Static stars — no twinkling
        for (let i = 0; i < 35; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height * 0.65;
            const r = 0.4 + Math.random() * 1.1;
            this.add.circle(x, y, r, 0xffffff, 0.4 + Math.random() * 0.5);
        }

        // Moon on its own Graphics object so we can tween it independently.
        // All coordinates are relative to the object's origin (centre of moon).
        const moonGfx = this.add.graphics();
        moonGfx.fillStyle(0xfff8c0, 0.06); moonGfx.fillCircle(0, 0, 110);
        moonGfx.fillStyle(0xfff8c0, 0.08); moonGfx.fillCircle(0, 0, 80);
        moonGfx.fillStyle(0xffeebb, 1);    moonGfx.fillCircle(0, 0, 52);
        moonGfx.fillStyle(0xddbb88, 0.45); moonGfx.fillCircle(-16, -14, 9);
        moonGfx.fillStyle(0xddbb88, 0.35); moonGfx.fillCircle( 20,  14, 6);
        moonGfx.fillStyle(0xddbb88, 0.30); moonGfx.fillCircle(  4,  -2, 4);
        // Moonbeam column travels with the moon
        moonGfx.fillStyle(0xffeebb, 0.03); moonGfx.fillRect(-38, 0, 76, height);

        moonGfx.x = width * 0.82;
        moonGfx.y = 120;

        // Slow drift across the sky — 60 s one way, back, repeat
        this.tweens.add({
            targets:  moonGfx,
            x:        width * 0.18,
            duration: 60000,
            ease:     'Sine.InOut',
            yoyo:     true,
            repeat:   -1,
        });

        // Castle silhouette + windows (static, drawn after moon so it occludes it)
        const g = this.add.graphics();
        g.fillStyle(0x080018, 1);

        g.fillRect(0, height - 100, width, 100);
        g.fillRect(0, height - 185, width, 88);
        for (let i = 0; i < Math.ceil(width / 46); i++) {
            if (i % 2 === 0) g.fillRect(i * 46, height - 212, 28, 28);
        }

        g.fillRect(40, height - 390, 110, 250);
        for (let i = 0; i < 4; i++) {
            if (i % 2 === 0) g.fillRect(40 + i * 30, height - 412, 22, 24);
        }

        g.fillRect(width / 2 - 72, height - 460, 144, 320);
        for (let i = 0; i < 5; i++) {
            if (i % 2 === 0) g.fillRect(width / 2 - 72 + i * 32, height - 484, 24, 26);
        }

        g.fillRect(width - 150, height - 370, 110, 230);
        for (let i = 0; i < 4; i++) {
            if (i % 2 === 0) g.fillRect(width - 150 + i * 30, height - 392, 22, 24);
        }

        const winColor = 0xff9900;
        g.fillStyle(winColor, 0.55); g.fillRect(82, height - 348, 26, 36); g.fillCircle(95, height - 348, 13);
        g.fillStyle(winColor, 0.5);  g.fillRect(width / 2 - 17, height - 418, 34, 48); g.fillCircle(width / 2, height - 418, 17);
        g.fillStyle(winColor, 0.55); g.fillRect(width - 112, height - 326, 26, 36); g.fillCircle(width - 99, height - 326, 13);

        // Static torch flames — no animation
        const torchPositions = [
            { x: 160,         y: height - 205 },
            { x: width / 2,   y: height - 220 },
            { x: width - 160, y: height - 205 },
        ];
        torchPositions.forEach(pos => {
            const tg = this.add.graphics();
            tg.fillStyle(0x553311, 1);
            tg.fillRect(pos.x - 3, pos.y + 2, 6, 16);
            tg.fillStyle(0xff7700, 0.95);
            tg.fillEllipse(pos.x, pos.y - 6, 13, 22);
            tg.fillStyle(0xffdd00, 0.85);
            tg.fillEllipse(pos.x, pos.y - 8, 7, 14);
        });
    }

    _drawGalaxyBg() {
        const { width, height } = this.cameras.main;
        this.cameras.main.setBackgroundColor(0x080010);

        // Nebula clouds
        const g = this.add.graphics();
        [
            { x: width * 0.18, y: height * 0.30, rx: 210, ry: 120, c: 0xff44aa, a: 0.11 },
            { x: width * 0.72, y: height * 0.50, rx: 190, ry: 105, c: 0x9922ff, a: 0.10 },
            { x: width * 0.50, y: height * 0.18, rx: 260, ry: 130, c: 0xff6688, a: 0.08 },
            { x: width * 0.88, y: height * 0.28, rx: 140, ry: 85,  c: 0xcc44ff, a: 0.13 },
            { x: width * 0.35, y: height * 0.70, rx: 170, ry: 95,  c: 0xff2288, a: 0.07 },
        ].forEach(n => {
            g.fillStyle(n.c, n.a);
            g.fillEllipse(n.x, n.y, n.rx * 2, n.ry * 2);
        });

        // Colourful stars
        const starPalette = [0xffffff, 0xff99cc, 0xcc88ff, 0x88ddff, 0xffee66, 0xff44aa];
        for (let i = 0; i < 90; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = 0.3 + Math.random() * 1.4;
            const c = starPalette[Math.floor(Math.random() * starPalette.length)];
            const star = this.add.circle(x, y, r, c, 0.5 + Math.random() * 0.5);
            this.tweens.add({
                targets: star,
                alpha: 0.05 + Math.random() * 0.2,
                duration: 700 + Math.random() * 2500,
                yoyo: true, repeat: -1,
                delay: Math.random() * 2500,
            });
        }

        // Rainbow comet (fires once at start, then loops every ~5 s)
        this._spawnRainbowComet();
        this.time.addEvent({ delay: 5500, callback: this._spawnRainbowComet, callbackScope: this, loop: true });
    }

    _spawnRainbowComet() {
        const { width, height } = this.cameras.main;
        // Randomise start/end along the top-right → bottom-left diagonal
        const startX = width * (0.55 + Math.random() * 0.45);
        const startY = -20;
        const angle  = 0.9 + Math.random() * 0.4;   // radians ~50°-70° below horizontal
        const dist   = width * 1.3;
        const endX   = startX - dist * Math.cos(angle);
        const endY   = startY + dist * Math.sin(angle);
        const dur    = 1800 + Math.random() * 700;

        const rainbow = [0xff3333, 0xff9900, 0xffee00, 0x44ee44, 0x44aaff, 0xaa44ff, 0xff44cc];
        const segments = 10;
        for (let i = 0; i < segments; i++) {
            const r    = Math.max(1, 5 - i * 0.38);
            const col  = rainbow[i % rainbow.length];
            const dot  = this.add.circle(startX, startY, r, col, 1 - i * 0.08).setDepth(3);
            this.tweens.add({
                targets:  dot,
                x:        endX,
                y:        endY,
                alpha:    0,
                duration: dur,
                delay:    i * 30,
                ease:     'Linear',
                onComplete: () => dot.destroy(),
            });
        }
    }

    _createFullscreenButton() {
        const icon = () => this.scale.isFullscreen ? '⊡' : '⛶';

        const btn = this.add.text(64, 35, icon(), {
            fontSize: '26px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            backgroundColor: '#334455',
            padding: { x: 12, y: 6 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => btn.setStyle({ color: '#ffd700' }));
        btn.on('pointerout',  () => btn.setStyle({ color: '#ffffff' }));
        btn.on('pointerup',   () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
            this.time.delayedCall(150, () => btn.setText(icon()));
        });
    }

    _createLangButton() {
        const lang = getLang().toUpperCase();
        const btn = this.add.text(960, 35, lang, {
            fontSize: '22px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            backgroundColor: '#334455',
            padding: { x: 12, y: 6 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => btn.setStyle({ color: '#ffd700' }));
        btn.on('pointerout',  () => btn.setStyle({ color: '#ffffff' }));
        btn.on('pointerup',   () => {
            cycleLang();
            this.cameras.main.fadeOut(300, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => this.scene.restart());
        });
    }

    _initCheatCode() {
        const SEQUENCE = [38, 38]; // UP UP
        let progress = 0;

        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === SEQUENCE[progress]) {
                progress++;
                if (progress === SEQUENCE.length) {
                    progress = 0;
                    this._activateCheat();
                }
            } else {
                progress = event.keyCode === SEQUENCE[0] ? 1 : 0;
            }
        });
    }

    _activateCheat() {
        ITEMS.forEach(item => addToInventory(item.id));

        const { width, height } = this.cameras.main;
        const flash = this.add.rectangle(width / 2, height / 2, width, height, 0xffd700, 0.35).setDepth(50);
        this.tweens.add({ targets: flash, alpha: 0, duration: 600, onComplete: () => flash.destroy() });

        const msg = this.add.text(width / 2, height / 2, t('cheatUnlocked'), {
            fontSize: '52px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 8,
        }).setOrigin(0.5).setDepth(51).setScale(0);

        this.tweens.add({
            targets: msg,
            scale: 1,
            duration: 400,
            ease: 'Back.Out',
            onComplete: () => {
                this.time.delayedCall(1500, () => {
                    this.tweens.add({ targets: msg, alpha: 0, duration: 400, onComplete: () => msg.destroy() });
                });
            },
        });
    }

    _createSmallButton(x, y, label, color, callback) {
        const btnW = 220;
        const btnH = 60;

        let bg;
        if (this.textures.exists('ui_panel')) {
            bg = this.add.nineslice(x, y, 'ui_panel', 0, btnW, btnH, 40, 40, 40, 40).setTint(color);
        } else {
            bg = this.add.rectangle(x, y, btnW, btnH, color, 1);
        }

        bg.setInteractive({ useHandCursor: true });
        this.add.text(x, y, label, {
            fontSize: '22px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff'
        }).setOrigin(0.5);

        bg.on('pointerup', callback);
    }

    _createChoiceButton(x, y, label, color, callback) {
        const btnW = 450;
        const btnH = 120;

        let bg;
        if (this.textures.exists('ui_panel')) {
            bg = this.add.nineslice(x, y, 'ui_panel', 0, btnW, btnH, 40, 40, 40, 40).setTint(color);
        } else {
            bg = this.add.rectangle(x, y, btnW, btnH, color, 1).setStrokeStyle(6, 0xffffff);
        }

        bg.setInteractive({ useHandCursor: true });

        const txt = this.add.text(x, y, label, {
            fontSize: '44px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        bg.on('pointerover', () => { if (bg.setFillStyle) bg.setFillStyle(color + 0x111111); bg.setScale(1.05); txt.setScale(1.05); });
        bg.on('pointerout',  () => { if (bg.setFillStyle) bg.setFillStyle(color); bg.setScale(1); txt.setScale(1); });
        bg.on('pointerup',   () => { this.cameras.main.fadeOut(500, 0, 0, 0); this.cameras.main.once('camerafadeoutcomplete', callback); });
    }
}
