import { Scene } from 'phaser';
import { getEquipment, addToInventory, getProgress, LEVELS } from '../data/LevelData.js';
import { ITEMS } from '../data/ItemData.js';
import { getMathProgress, MATH_WORLDS } from '../data/MathWorldData.js';
import { getMemoryProgress, MEMORY_LEVELS } from '../data/MemoryData.js';
import { getCountingProgress, COUNTING_LEVELS } from '../data/CountingData.js';
import { t, cycleLang, getLang } from '../data/I18n.js';
import { showBanner, hideBanner } from '../services/AdService.js';
import { getCurrentUser, signInWithGoogle, signOutUser } from '../services/AuthService.js';

const EASTER_KEY = 'jolyne_easter_star';
function getEasterStar()  { try { return localStorage.getItem(EASTER_KEY) === 'true'; } catch { return false; } }
function saveEasterStar() { try { localStorage.setItem(EASTER_KEY, 'true'); } catch {} }

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

        // 2×2 grid of mode buttons (centers at 256 / 768 to ensure 62 px gap for 430 px wide buttons)
        this._createChoiceButton(256, 360, t('btnSpelling'), 0x2a2a88, 430, () => {
            hideBanner(); this.scene.start('SpellingMenu');
        });

        this._createChoiceButton(768, 360, t('btnMath'), 0xaa8800, 430, () => {
            hideBanner(); this.scene.start('MathWorldSelectScene');
        });

        this._createChoiceButton(256, 520, t('btnMemory'), 0xcc5500, 430, () => {
            hideBanner(); this.scene.start('MemoryMenuScene');
        });

        this._createChoiceButton(768, 520, t('btnCounting'), 0x1a6a2a, 430, () => {
            hideBanner(); this.scene.start('CountingMenuScene');
        });

        const progressStyle = { fontSize: '18px', color: '#ffd700', stroke: '#000', strokeThickness: 2 };

        const spellingDone = LEVELS.filter(l => getProgress()[l.id]).length;
        if (spellingDone > 0) {
            this.add.text(256, 400, t('spellingProgress', spellingDone, LEVELS.length), progressStyle).setOrigin(0.5, 0.5);
        }

        const mathDone = MATH_WORLDS.filter((_, i) => getMathProgress()[i]).length;
        if (mathDone > 0) {
            this.add.text(768, 400, t('mathProgress', mathDone, MATH_WORLDS.length), progressStyle).setOrigin(0.5, 0.5);
        }

        const memoryDone = MEMORY_LEVELS.filter((_, i) => getMemoryProgress()[i]).length;
        if (memoryDone > 0) {
            this.add.text(256, 560, t('memoryProgress', memoryDone, MEMORY_LEVELS.length), progressStyle).setOrigin(0.5, 0.5);
        }

        const countingDone = COUNTING_LEVELS.filter((_, i) => getCountingProgress()[i]).length;
        if (countingDone > 0) {
            this.add.text(768, 560, t('countingProgress', countingDone, COUNTING_LEVELS.length), progressStyle).setOrigin(0.5, 0.5);
        }

        this._createCollectionButton();

        this._drawLeaderboard();
        this._createLangButton();
        this._createFullscreenButton();
        this._createSignInButton();

        this._initCheatCode();

        showBanner();
    }

    // ── Background themes ─────────────────────────────────────────────────────

    _drawSpellingBg() {
        const { width, height } = this.cameras.main;
        this.cameras.main.setBackgroundColor(0x8b5a2b);
        this.add.image(width / 2, height / 2, 'jojopixelart_spelling')
            .setDisplaySize(width, height).setScrollFactor(0);
    }

    _drawNightBg() {
        const { width, height } = this.cameras.main;
        this.cameras.main.setBackgroundColor(0x1a1a5e);

        for (let i = 0; i < 70; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = 0.4 + Math.random() * 1.6;
            const star = this.add.circle(x, y, r, 0xffffff, 0.3 + Math.random() * 0.7).setScrollFactor(0);
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
                .setAlpha(0.5 + Math.random() * 0.5)
                .setScrollFactor(0);
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
        const moonGfx = this.add.graphics().setScrollFactor(0);
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
        const g = this.add.graphics().setScrollFactor(0);
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
            const tg = this.add.graphics().setScrollFactor(0);
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
        const g = this.add.graphics().setScrollFactor(0);
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
            const star = this.add.circle(x, y, r, c, 0.5 + Math.random() * 0.5).setScrollFactor(0);
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
            const dot  = this.add.circle(startX, startY, r, col, 1 - i * 0.08).setDepth(3).setScrollFactor(0);
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
        const supportsFullscreen = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
        const gameContainer = document.getElementById('game-container');
        let fakeFs = false;

        const icon = () => {
            const active = supportsFullscreen ? this.scale.isFullscreen : fakeFs;
            return active ? '⊡' : '⛶';
        };

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
            if (supportsFullscreen) {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            } else if (gameContainer) {
                fakeFs = !fakeFs;
                gameContainer.classList.toggle('fake-fullscreen', fakeFs);
                this.scale.refresh();
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
        const flash = this.add.rectangle(width / 2, height / 2, width, height, 0xffd700, 0.35).setDepth(50).setScrollFactor(0);
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

    _drawLeaderboard() {
        const spellingStars  = Object.values(getProgress()).filter(Boolean).length;
        const memoryStars    = Object.values(getMemoryProgress()).filter(Boolean).length;
        const countingStars  = Object.values(getCountingProgress()).filter(Boolean).length;
        const mathStars      = Object.values(getMathProgress()).filter(Boolean).length;

        const maxSpelling  = LEVELS.length;           // 10
        const maxMemory    = MEMORY_LEVELS.length;    // 9
        const maxCounting  = COUNTING_LEVELS.length;  // 5
        const maxMath      = MATH_WORLDS.length;      // 6

        const easterStar = getEasterStar() ? 1 : 0;
        const total    = spellingStars + memoryStars + countingStars + mathStars + easterStar;
        const maxTotal = maxSpelling + maxMemory + maxCounting + maxMath + easterStar;

        const px = 10, py = 595, pw = 270, ph = 158;

        const bg = this.add.graphics();
        bg.fillStyle(0x000000, 0.55);
        bg.fillRoundedRect(px, py, pw, ph, 10);
        bg.lineStyle(1, 0xffd700, 0.4);
        bg.strokeRoundedRect(px, py, pw, ph, 10);

        const base = { fontSize: '15px', fontFamily: 'Arial, sans-serif', color: '#ffffff', stroke: '#000', strokeThickness: 2 };
        const gold = { ...base, fontSize: '16px', color: '#ffd700', fontFamily: 'Arial Black, Arial, sans-serif' };

        this.add.text(px + pw / 2, py + 14, t('leaderboardTitle'), gold).setOrigin(0.5, 0.5);

        const sep = this.add.graphics();
        sep.lineStyle(1, 0xffd700, 0.3);
        sep.lineBetween(px + 6, py + 27, px + pw - 6, py + 27);

        const rows = [
            { label: t('btnSpelling'),         val: spellingStars,  max: maxSpelling },
            { label: t('leaderboardMathRow'),  val: mathStars,      max: maxMath },
            { label: t('btnMemory'),           val: memoryStars,    max: maxMemory },
            { label: t('btnCounting'),         val: countingStars,  max: maxCounting },
        ];

        rows.forEach((row, i) => {
            const y = py + 42 + i * 22;
            this.add.text(px + 10, y, row.label, base).setOrigin(0, 0.5);
            this.add.text(px + pw - 10, y, `${row.val}/${row.max} ⭐`, base).setOrigin(1, 0.5);
        });

        const sep2 = this.add.graphics();
        sep2.lineStyle(1, 0xffd700, 0.3);
        sep2.lineBetween(px + 6, py + 128, px + pw - 6, py + 128);

        this.add.text(px + pw / 2, py + 142, t('leaderboardTotal', total, maxTotal), gold).setOrigin(0.5, 0.5);
    }

    _createCollectionButton() {
        const earned = getEasterStar();

        this._createSmallButton(900, 710, t('btnCollection'), 0xaa00aa, () => {
            saveEasterStar();
            hideBanner();
            this.scene.start('CollectionScene');
        });

        if (earned) {
            const star = this.add.text(1008, 698, '⭐', { fontSize: '20px' })
                .setOrigin(0.5).setDepth(5);
            this.tweens.add({
                targets: star,
                scale: 1.25,
                duration: 900,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.InOut',
            });
        }
    }

    _createSmallButton(x, y, label, color, callback) {
        const btnW = 240;
        const btnH = 58;
        const r = 14;

        const shadow = this.add.graphics();
        shadow.fillStyle(0x000000, 0.35);
        shadow.fillRoundedRect(x - btnW / 2 + 4, y - btnH / 2 + 5, btnW, btnH, r);

        const gfx = this.add.graphics();
        const draw = (hover) => {
            gfx.clear();
            gfx.fillStyle(color, 1);
            gfx.fillRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, r);
            gfx.fillStyle(0xffffff, hover ? 0.22 : 0.14);
            gfx.fillRoundedRect(x - btnW / 2 + 3, y - btnH / 2 + 3, btnW - 6, btnH * 0.45, { tl: r - 1, tr: r - 1, bl: 0, br: 0 });
            gfx.lineStyle(2, 0xffd700, hover ? 0.9 : 0.55);
            gfx.strokeRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, r);
        };
        draw(false);

        this.add.text(x, y, label, {
            fontSize: '22px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#1a0033',
            strokeThickness: 3,
        }).setOrigin(0.5);

        const hit = this.add.rectangle(x, y, btnW, btnH, 0x000000, 0).setInteractive({ useHandCursor: true });
        hit.on('pointerover', () => draw(true));
        hit.on('pointerout',  () => draw(false));
        hit.on('pointerup',   callback);
    }

    _createSignInButton() {
        const user  = getCurrentUser();
        const label = user ? `👤 ${user.displayName?.split(' ')[0] ?? '…'}` : '🔐';
        const btn   = this.add.text(512, 35, label, {
            fontSize: '20px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            backgroundColor: '#334455',
            padding: { x: 12, y: 6 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => btn.setStyle({ color: '#ffd700' }));
        btn.on('pointerout',  () => btn.setStyle({ color: '#ffffff' }));
        btn.on('pointerup',   async () => {
            if (user) {
                await signOutUser();
            } else {
                try { await signInWithGoogle(); } catch {}
            }
            this.cameras.main.fadeOut(300, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => this.scene.restart());
        });
    }

    _createChoiceButton(x, y, label, color, widthOrCallback, callback) {
        let btnW, cb;
        if (typeof widthOrCallback === 'function') { btnW = 450; cb = widthOrCallback; }
        else { btnW = widthOrCallback; cb = callback; }
        const btnH = 120;
        const r = 18;

        // Drop shadow
        const shadow = this.add.graphics();
        shadow.fillStyle(0x000000, 0.35);
        shadow.fillRoundedRect(x - btnW / 2 + 5, y - btnH / 2 + 7, btnW, btnH, r);

        // Button body — redrawn on hover
        const gfx = this.add.graphics();
        const draw = (hover) => {
            gfx.clear();
            // Base fill
            gfx.fillStyle(color, 1);
            gfx.fillRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, r);
            // Glass highlight (top half)
            gfx.fillStyle(0xffffff, hover ? 0.20 : 0.13);
            gfx.fillRoundedRect(x - btnW / 2 + 3, y - btnH / 2 + 3, btnW - 6, btnH * 0.46,
                { tl: r - 1, tr: r - 1, bl: 0, br: 0 });
            // Depth shadow (bottom half)
            gfx.fillStyle(0x000000, hover ? 0.16 : 0.24);
            gfx.fillRoundedRect(x - btnW / 2 + 3, y + btnH * 0.08, btnW - 6, btnH * 0.38,
                { tl: 0, tr: 0, bl: r - 1, br: r - 1 });
            // Gold outer border
            gfx.lineStyle(2.5, 0xffd700, hover ? 0.95 : 0.60);
            gfx.strokeRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, r);
            // White inner border
            gfx.lineStyle(1, 0xffffff, hover ? 0.40 : 0.18);
            gfx.strokeRoundedRect(x - btnW / 2 + 2, y - btnH / 2 + 2, btnW - 4, btnH - 4, r - 1);
        };
        draw(false);

        const fontSize = btnW < 450 ? '34px' : '44px';
        const txt = this.add.text(x, y, label, {
            fontSize,
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#1a0033',
            strokeThickness: 5,
        }).setOrigin(0.5);

        // Transparent hit area on top (receives pointer events)
        const hit = this.add.rectangle(x, y, btnW, btnH, 0x000000, 0).setInteractive({ useHandCursor: true });
        hit.on('pointerover', () => { draw(true);  txt.setScale(1.04); });
        hit.on('pointerout',  () => { draw(false); txt.setScale(1); });
        hit.on('pointerup',   () => { this.cameras.main.fadeOut(500, 0, 0, 0); this.cameras.main.once('camerafadeoutcomplete', cb); });
    }
}
