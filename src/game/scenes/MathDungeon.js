import { Scene } from 'phaser';
import { MATH_WORLDS } from '../data/MathWorldData.js';
import { getEquipment } from '../data/LevelData.js';
import { t } from '../data/I18n.js';

export class MathDungeon extends Scene {
    constructor() {
        super('MathDungeon');
        this.distance = 0;
        this.isWalking = true;
        this.encounterThreshold = 500;
        this.nextEncounter = 150;
        this.decorations = [];
    }

    init(data) {
        this.worldIndex  = data.worldIndex ?? 0;
        this.worldConfig = MATH_WORLDS[this.worldIndex];
        this.roundCount  = 0;
        this.totalRounds = Math.round(this.worldConfig.pointsNeeded / 200);
    }

    create() {
        const { width, height } = this.cameras.main;

        this.cameras.main.setBackgroundColor(this.worldConfig.skyTop);
        this._envObjects = [];

        this._drawEnvironment(width, height);

        this.lines = this.add.graphics().setScrollFactor(0).setDepth(1);

        this._createWorldParticles(width, height);

        this.worldGroup = this.add.group();

        this._drawArms(width, height);

        // Torch flame graphics (updated every frame)
        this.torchGfx = this.add.graphics().setScrollFactor(0).setDepth(7);

        this._createUI(width, height);

        this.distance = 0;
        this.nextEncounter = 450;
        this.isWalking = true;

        this.scale.on('resize', this._onResize, this);
        this.events.once('shutdown', () => this.scale.off('resize', this._onResize, this));
    }

    _drawEnvironment(w, h) {
        // Destroy previous env objects on resize
        if (this._envObjects) {
            this._envObjects.forEach(o => { if (o?.active) o.destroy(); });
        }
        this._envObjects = [];

        const vanishingY = h * 0.5;
        const wc = this.worldConfig;
        const PAD = 800;

        const ceiling = this.add.graphics().setScrollFactor(0).setDepth(0);
        ceiling.fillGradientStyle(wc.skyTop, wc.skyTop, wc.skyBottom, wc.skyBottom, 1);
        ceiling.fillRect(-PAD, -PAD, w + PAD * 2, vanishingY + PAD);
        this._envObjects.push(ceiling);

        const floor = this.add.graphics().setScrollFactor(0).setDepth(0);
        floor.fillGradientStyle(wc.floorTop, wc.floorTop, wc.floorBottom, wc.floorBottom, 1);
        floor.fillRect(-PAD, vanishingY, w + PAD * 2, h - vanishingY + PAD);
        this._envObjects.push(floor);

        // Stone wall side panels
        const walls = this.add.graphics().setScrollFactor(0).setDepth(2);
        walls.fillStyle(0x111008, 1);
        walls.fillRect(-PAD, -PAD, w * 0.17 + PAD, h + PAD * 2);
        walls.fillRect(w * 0.83, -PAD, w * 0.17 + PAD, h + PAD * 2);

        // Brickwork texture on walls
        walls.lineStyle(1, 0x221a08, 0.55);
        for (let row = 0; row < Math.ceil(h / 42); row++) {
            const yy = row * 42;
            const xOff = (row % 2) * 22;
            for (let col = -1; col < 5; col++) {
                walls.strokeRect(xOff + col * 44, yy, 44, 42);
                walls.strokeRect(w * 0.83 + xOff + col * 44, yy, 44, 42);
            }
        }
        this._envObjects.push(walls);

        // Subtle corner darkness
        const corner = this.add.graphics().setScrollFactor(0).setDepth(3);
        corner.fillStyle(0x000000, 1);
        corner.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0.7, 0, 0.7, 0);
        corner.fillRect(-PAD, -PAD, w * 0.17 + PAD, h + PAD * 2);
        corner.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0, 0.7, 0, 0.7);
        corner.fillRect(w * 0.83, -PAD, w * 0.17 + PAD, h + PAD * 2);
        this._envObjects.push(corner);

        // Torch holders (static wall fixtures)
        const torchHolders = this.add.graphics().setScrollFactor(0).setDepth(6);
        torchHolders.fillStyle(0x3a2a10, 1);
        const lx = w * 0.175, rx = w * 0.825, ty = h * 0.36;
        torchHolders.fillRect(lx - 4, ty, 8, 20);
        torchHolders.fillRect(lx - 8, ty + 18, 16, 6);
        torchHolders.fillRect(rx - 4, ty, 8, 20);
        torchHolders.fillRect(rx - 8, ty + 18, 16, 6);
        this._envObjects.push(torchHolders);

        const fog = this.add.graphics().setScrollFactor(0).setDepth(4);
        const fc = wc.fogColor;
        fog.fillGradientStyle(fc, fc, fc, fc, 0, 0, 0.8, 0.8);
        fog.fillCircle(w / 2, vanishingY, 160);
        fog.setAlpha(0.35);
        this._envObjects.push(fog);
    }

    _createWorldParticles(w, h) {
        const type = this.worldConfig.particles;

        if (type === 'snow') {
            const snow = this.add.particles(0, 0, 'particle', {
                x: { min: 0, max: w },
                y: -10,
                lifespan: 5000,
                speedY: { min: 50, max: 150 },
                speedX: { min: -20, max: 20 },
                scale: { start: 0.1, end: 0.3 },
                alpha: { start: 0.6, end: 0 },
                frequency: 100,
                blendMode: 'ADD'
            });
            snow.setDepth(5).setScrollFactor(0);
        } else if (type === 'candy') {
            const candy = this.add.particles(0, 0, 'particle', {
                x: { min: 0, max: w },
                y: -10,
                lifespan: 3500,
                speedY: { min: 30, max: 80 },
                speedX: { min: -30, max: 30 },
                scale: { start: 0.25, end: 0.05 },
                alpha: { start: 0.9, end: 0 },
                frequency: 70,
                blendMode: 'ADD'
            });
            candy.setDepth(5).setScrollFactor(0);
        } else if (type === 'petal') {
            const petal = this.add.particles(0, 0, 'particle', {
                x: { min: 0, max: w },
                y: -10,
                lifespan: 7000,
                speedY: { min: 20, max: 50 },
                speedX: { min: -50, max: 50 },
                scale: { start: 0.15, end: 0.3 },
                alpha: { start: 0.7, end: 0 },
                frequency: 130,
                blendMode: 'ADD'
            });
            petal.setDepth(5).setScrollFactor(0);
        } else if (type === 'ember') {
            const ember = this.add.particles(0, 0, 'particle', {
                x: { min: 0, max: w },
                y: -10,
                lifespan: 3000,
                speedY: { min: 80, max: 200 },
                speedX: { min: -50, max: 50 },
                scale: { start: 0.18, end: 0.04 },
                alpha: { start: 1, end: 0 },
                frequency: 55,
                blendMode: 'ADD'
            });
            ember.setDepth(5).setScrollFactor(0);
        } else if (type === 'bubble') {
            const bubble = this.add.particles(0, h + 10, 'particle', {
                x: { min: 0, max: w },
                lifespan: 5000,
                speedY: { min: -100, max: -30 },
                speedX: { min: -15, max: 15 },
                scale: { start: 0.05, end: 0.2 },
                alpha: { start: 0.6, end: 0 },
                frequency: 100,
                blendMode: 'ADD'
            });
            bubble.setDepth(5).setScrollFactor(0);
        } else if (type === 'spark') {
            const spark = this.add.particles(0, 0, 'particle', {
                x: { min: 0, max: w },
                y: { min: 0, max: h },
                lifespan: 2500,
                speedY: { min: -40, max: 40 },
                speedX: { min: -40, max: 40 },
                scale: { start: 0.1, end: 0 },
                alpha: { start: 0.9, end: 0 },
                frequency: 45,
                blendMode: 'ADD'
            });
            spark.setDepth(5).setScrollFactor(0);
        }
    }

    _createUI(w, h) {
        // Round counter HUD (top-left)
        this.add.rectangle(95, 30, 176, 40, 0x000000, 0.55)
            .setDepth(199).setScrollFactor(0);

        this.roundText = this.add.text(14, 10, t('roundLabel', 0, this.totalRounds), {
            fontSize: '20px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 3,
        }).setDepth(200).setScrollFactor(0);

        // World name badge top-centre
        this.worldNameText = this.add.text(w / 2, 12, t(this.worldConfig.nameKey), {
            fontSize: '20px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5, 0).setDepth(200).setScrollFactor(0);

        this.menuBtn = this.add.text(w - 14, 14, 'Menu', {
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#004488',
            padding: { x: 12, y: 6 }
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true }).setDepth(200).setScrollFactor(0);

        this.menuBtn.on('pointerup', () => this._showConfirmQuit());
    }

    _onResize() {
        const { width, height } = this.cameras.main;
        this._drawEnvironment(width, height);
        if (this.worldNameText) this.worldNameText.setX(width / 2);
        if (this.menuBtn)       this.menuBtn.setX(width - 14);
    }

    _showConfirmQuit() {
        const { width, height } = this.cameras.main;
        const cx = width / 2, cy = height / 2;
        const elems = [];

        elems.push(this.add.rectangle(cx, cy, width, height, 0x000000, 0.78)
            .setDepth(300).setScrollFactor(0));

        const g = this.add.graphics().setDepth(301).setScrollFactor(0);
        g.fillStyle(0x1a0a2e, 0.97);
        g.fillRoundedRect(cx - 190, cy - 100, 380, 200, 18);
        g.lineStyle(4, 0x4488ff, 1);
        g.strokeRoundedRect(cx - 190, cy - 100, 380, 200, 18);
        elems.push(g);

        elems.push(this.add.text(cx, cy - 38, t('confirmQuit'), {
            fontSize: '28px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5).setDepth(302).setScrollFactor(0));

        const dismiss = () => elems.forEach(e => { if (e?.active) e.destroy(); });

        [
            { bx: cx - 80, color: 0x228822, key: 'confirmYes', fn: () => { dismiss(); this.scene.start('MathWorldSelectScene'); } },
            { bx: cx + 80, color: 0x882222, key: 'confirmNo',  fn: () => dismiss() },
        ].forEach(({ bx, color, key, fn }) => {
            const btn = this.add.rectangle(bx, cy + 38, 130, 52, color, 1)
                .setDepth(302).setScrollFactor(0)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => btn.setAlpha(0.8))
                .on('pointerout',  () => btn.setAlpha(1))
                .on('pointerup',   fn);
            elems.push(btn);
            elems.push(this.add.text(bx, cy + 38, t(key), {
                fontSize: '22px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#fff',
                stroke: '#000',
                strokeThickness: 3,
            }).setOrigin(0.5).setDepth(303).setScrollFactor(0));
        });
    }

    _updateRoundHUD(newRound) {
        this.roundCount = newRound;
        this.roundText.setText(t('roundLabel', newRound, this.totalRounds));
    }

    update(time, delta) {
        this._updateTorches(time);

        if (!this.isWalking) return;

        this.distance += delta * 0.35;

        this._updatePerspective();

        if (this.distance >= this.nextEncounter) {
            this._triggerEncounter();
        }

        this._animateArms(time);
    }

    _updateTorches(time) {
        if (!this.torchGfx) return;
        const { width, height } = this.cameras.main;
        const flicker = Math.sin(time * 0.012) * 0.35 + Math.sin(time * 0.019) * 0.25 + 0.7;
        const r = 18 + flicker * 10;
        const lx = width * 0.175;
        const rx = width * 0.825;
        const ty = height * 0.345;

        this.torchGfx.clear();

        // Warm glow halos on walls
        this.torchGfx.fillStyle(0xff6600, 0.12 * flicker);
        this.torchGfx.fillCircle(lx, ty, r * 2.8);
        this.torchGfx.fillCircle(rx, ty, r * 2.8);

        // Outer flame (orange)
        this.torchGfx.fillStyle(0xff6600, 0.75 * flicker);
        this.torchGfx.fillEllipse(lx, ty - r * 0.3, r * 1.1, r * 1.8);
        this.torchGfx.fillEllipse(rx, ty - r * 0.3, r * 1.1, r * 1.8);

        // Inner flame (yellow)
        this.torchGfx.fillStyle(0xffdd00, 0.9 * flicker);
        this.torchGfx.fillEllipse(lx, ty - r * 0.5, r * 0.6, r * 1.2);
        this.torchGfx.fillEllipse(rx, ty - r * 0.5, r * 0.6, r * 1.2);

        // White-hot core
        this.torchGfx.fillStyle(0xffffff, 0.6 * flicker);
        this.torchGfx.fillCircle(lx, ty - r * 0.5, r * 0.22);
        this.torchGfx.fillCircle(rx, ty - r * 0.5, r * 0.22);
    }

    _updatePerspective() {
        const { width, height } = this.cameras.main;
        const vX = width / 2;
        const bob = this.isWalking ? Math.sin(this.distance * 0.08) * 6 : 0;
        const vY = height * 0.5 + bob;
        const gc = this.worldConfig.gridColor;

        this.lines.clear();

        // Corner rays to vanishing point
        this.lines.lineStyle(2, gc, 0.2);
        this.lines.lineBetween(0, 0, vX, vY);
        this.lines.lineBetween(width, 0, vX, vY);
        this.lines.lineBetween(0, height, vX, vY);
        this.lines.lineBetween(width, height, vX, vY);

        // Receding depth rectangles
        const offset = (this.distance % 150) / 150;
        for (let i = 0; i < 8; i++) {
            const z = i - offset;
            if (z <= 0) continue;
            const scale = 1 / z;
            const rw = width * scale;
            const rh = height * scale;
            if (rw < 5000) {
                this.lines.lineStyle(1.5, gc, 0.3 * (1 - i / 8));
                this.lines.strokeRect(vX - rw / 2, vY - rh / 2, rw, rh);
            }
        }

        // Scrolling floor grid lines (give sense of forward movement)
        const floorOffset = (this.distance % 80) / 80;
        for (let i = 0; i < 8; i++) {
            const zFrac = (i + floorOffset) / 8;
            const y = vY + (height - vY) * zFrac;
            if (y > vY && y <= height) {
                this.lines.lineStyle(1, gc, 0.14 * (1 - zFrac * 0.6));
                this.lines.lineBetween(0, y, width, y);
            }
        }

        // Scrolling ceiling grid lines (mirror of floor)
        for (let i = 0; i < 6; i++) {
            const zFrac = (i + floorOffset) / 6;
            const y = vY - vY * zFrac;
            if (y < vY && y >= 0) {
                this.lines.lineStyle(1, gc, 0.10 * (1 - zFrac * 0.6));
                this.lines.lineBetween(0, y, width, y);
            }
        }
    }

    _drawArms(w, h) {
        const equip = getEquipment();

        this.magicTrail = this.add.particles(0, 0, 'particle', {
            speed: { min: 20, max: 60 },
            scale: { start: 0.4, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 800,
            blendMode: 'ADD',
            frequency: 20,
            follow: null
        }).setScrollFactor(0);

        // Left arm — shield if equipped, teddy bear by default
        this.teddyArm = this.add.container(w * 0.2, h * 0.85).setScrollFactor(0);
        const leftG = this.add.graphics();
        if (equip.item_left === 'item_L_shield') {
            this._drawShield(leftG);
        } else if (equip.item_left === 'item_L_magic') {
            this._drawMagicGlove(leftG);
        } else {
            this._drawDetailedTeddy(leftG);
        }
        this.teddyArm.add(leftG);
        this.teddyArm.setDepth(150);

        // Right arm — sword if equipped, wand by default
        this.wandArm = this.add.container(w * 0.8, h * 0.85).setScrollFactor(0);
        const rightG = this.add.graphics();
        const showWand = !equip.item_right || equip.item_right === 'item_R_wand';
        if (equip.item_right === 'item_R_sword') {
            this._drawSword(rightG);
        } else {
            this._drawDetailedWand(rightG);
        }
        this.wandArm.add(rightG);
        this.wandArm.setDepth(150);

        if (showWand) {
            this.magicTrail.startFollow(this.wandArm, 0, -180);
        }
    }

    _drawShield(g) {
        // Shadow
        g.fillStyle(0x3d1a00, 0.5);
        g.beginPath();
        g.moveTo(-52, -68);
        g.lineTo(57, -68);
        g.lineTo(57, 33);
        g.lineTo(2, 83);
        g.lineTo(-52, 33);
        g.closePath();
        g.fillPath();

        // Main body
        g.fillStyle(0x8b4513, 1);
        g.beginPath();
        g.moveTo(-55, -70);
        g.lineTo(55, -70);
        g.lineTo(55, 30);
        g.lineTo(0, 80);
        g.lineTo(-55, 30);
        g.closePath();
        g.fillPath();

        // Inner panel
        g.fillStyle(0xcd853f, 1);
        g.beginPath();
        g.moveTo(-38, -55);
        g.lineTo(38, -55);
        g.lineTo(38, 22);
        g.lineTo(0, 60);
        g.lineTo(-38, 22);
        g.closePath();
        g.fillPath();

        // Decorative cross
        g.fillStyle(0xffd700, 1);
        g.fillRect(-5, -50, 10, 115);
        g.fillRect(-38, -8, 76, 10);

        // Boss (center knob)
        g.fillStyle(0xffd700, 1);
        g.fillCircle(0, 0, 14);
        g.fillStyle(0xffee88, 1);
        g.fillCircle(-3, -3, 5);

        // Rim
        g.lineStyle(4, 0x5d2e0c, 1);
        g.beginPath();
        g.moveTo(-55, -70);
        g.lineTo(55, -70);
        g.lineTo(55, 30);
        g.lineTo(0, 80);
        g.lineTo(-55, 30);
        g.closePath();
        g.strokePath();
    }

    _drawMagicGlove(g) {
        // Purple glove base
        g.fillStyle(0x6a0dad, 1);
        g.fillEllipse(0, 20, 110, 150);

        // Fingers
        g.fillStyle(0x7b14c4, 1);
        for (let i = 0; i < 4; i++) {
            g.fillRoundedRect(-44 + i * 28, -70, 22, 60, 10);
        }
        // Thumb
        g.fillRoundedRect(-62, -40, 22, 50, 10);

        // Magic runes on back
        g.lineStyle(2, 0xff88ff, 0.8);
        g.strokeCircle(0, 30, 28);
        g.lineStyle(2, 0xffccff, 0.6);
        g.lineBetween(-20, 10, 20, 50);
        g.lineBetween(20, 10, -20, 50);

        // Glow sparkles
        g.fillStyle(0xff88ff, 0.9);
        g.fillCircle(-30, -80, 7);
        g.fillCircle(35, -90, 5);
        g.fillCircle(0, -100, 9);
    }

    _drawSword(g) {
        // Blade
        g.fillStyle(0xaaaaaa, 1);
        g.fillTriangle(-10, -60, 10, -60, 0, -200);
        g.fillRect(-10, -60, 20, 120);

        // Blade edge highlights
        g.fillStyle(0xeeeeee, 1);
        g.fillTriangle(-2, -60, 4, -60, 0, -195);
        g.fillRect(-2, -60, 6, 120);

        // Crossguard
        g.fillStyle(0xffd700, 1);
        g.fillRect(-50, 55, 100, 18);
        g.fillCircle(-50, 64, 10);
        g.fillCircle(50, 64, 10);

        // Handle
        g.fillStyle(0x5d2e0c, 1);
        g.fillRect(-12, 73, 24, 80);

        // Handle wrapping
        g.lineStyle(3, 0x3d1a00, 0.7);
        for (let i = 0; i < 5; i++) {
            g.lineBetween(-12, 80 + i * 14, 12, 80 + i * 14);
        }

        // Pommel
        g.fillStyle(0xffd700, 1);
        g.fillCircle(0, 160, 16);
        g.fillStyle(0xffee88, 1);
        g.fillCircle(-4, 156, 6);
    }

    _drawDetailedTeddy(g) {
        g.fillStyle(0x5d2e0c, 1);
        g.fillEllipse(5, 5, 130, 170);

        g.fillStyle(0x8b4513, 1);
        g.fillEllipse(0, 0, 130, 170);

        g.fillStyle(0xa0522d, 1);
        g.fillCircle(-40, -60, 45);
        g.lineStyle(3, 0x5d2e0c, 1);
        g.strokeCircle(-40, -60, 45);

        g.fillStyle(0xcd853f, 0.4);
        g.fillCircle(-30, -70, 15);

        g.fillStyle(0x8b4513, 1);
        g.fillCircle(-75, -95, 22);
        g.fillCircle(-5, -95, 22);

        g.fillStyle(0x000000, 1);
        g.fillCircle(-55, -65, 6);
        g.fillCircle(-25, -65, 6);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(-57, -67, 2);
        g.fillCircle(-27, -67, 2);
    }

    _drawDetailedWand(g) {
        g.fillStyle(0xbb8a6a, 1);
        g.fillCircle(5, 5, 45);
        g.fillStyle(0xffe4b5, 1);
        g.fillCircle(0, 0, 45);

        g.fillStyle(0x2b1e1e, 1);
        g.fillRect(-3, -160, 12, 160);
        g.fillStyle(0x4b2e1e, 1);
        g.fillRect(-6, -160, 10, 160);

        g.fillStyle(0xffa500, 1);
        this._drawStar(g, 0, -170, 5, 45, 20);
        g.fillStyle(0xffd700, 1);
        this._drawStar(g, -2, -172, 5, 40, 18);
    }

    _drawStar(graphics, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;
        graphics.beginPath();
        graphics.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            graphics.lineTo(x, y);
            rot += step;
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            graphics.lineTo(x, y);
            rot += step;
        }
        graphics.lineTo(cx, cy - outerRadius);
        graphics.closePath();
        graphics.fillPath();
    }

    _animateArms(time) {
        const { width, height } = this.cameras.main;
        // Walking: arms swing in opposite phase; idle: gentle bob only
        const walk = Math.sin(this.distance * 0.09);
        const swingX = this.isWalking ? walk * 22 : Math.sin(time / 1400) * 6;
        const swingY = this.isWalking
            ? Math.abs(walk) * 14 + Math.cos(time / 800) * 4
            : Math.cos(time / 1000) * 6;

        this.wandArm.x  = width  * 0.82 + swingX;
        this.wandArm.y  = height * 0.88 + swingY + (this.isWalking ? -walk * 10 : 0);

        this.teddyArm.x = width  * 0.18 - swingX;
        this.teddyArm.y = height * 0.88 + swingY + (this.isWalking ?  walk * 10 : 0);
    }

    _triggerEncounter() {
        this.isWalking = false;
        const type = Math.random() > 0.3 ? 'monster' : 'chest';
        if (type === 'monster') this._spawnMonster();
        else this._spawnChest();
    }

    _spawnMonster() {
        const { width, height } = this.cameras.main;
        const monsters = this.worldConfig.monsters;
        const name = monsters[Math.floor(Math.random() * monsters.length)];

        const container = this.add.container(width / 2, height / 2).setScale(0.01).setScrollFactor(0);

        const shadow = this.add.ellipse(0, 80, 120, 40, 0x000000, 0.2);
        container.add(shadow);

        const g = this.add.graphics();
        this._drawDetailedMonster(g, name);
        container.add(g);

        const title = this.add.text(0, -160, t(name), {
            fontSize: '44px',
            color: '#ffffff',
            stroke: '#004488',
            strokeThickness: 6,
            fontFamily: 'Arial Black'
        }).setOrigin(0.5);
        container.add(title);

        this.tweens.add({
            targets: container,
            scale: 1.5,
            duration: 2000,
            ease: 'Cubic.Out',
            onComplete: () => {
                this.scene.pause();
                this.scene.launch('MathProblemScene', {
                    numMax:    this.worldConfig.numMax,
                    operation: this.worldConfig.operation ?? 'add',
                    monsterName: name,
                    onSuccess: () => {
                        const newRound = this.roundCount + 1;
                        this._updateRoundHUD(newRound);
                        if (newRound >= this.totalRounds) {
                            this._triggerWorldComplete();
                        } else {
                            this._handleMonsterDefeat(container);
                        }
                    }
                });
            }
        });
    }

    _drawDetailedMonster(g, name) {
        if (name === 'monster_snowman') {
            g.fillStyle(0xe0e0e0, 1);
            g.fillCircle(0, 50, 70);
            g.fillCircle(0, -30, 50);
            g.fillStyle(0xffffff, 1);
            g.fillCircle(-10, 40, 60);
            g.fillCircle(-8, -35, 42);
            g.fillStyle(0xd35400, 1);
            g.fillTriangle(0, -35, 0, -25, 40, -30);
            g.fillStyle(0x2c3e50, 1);
            g.fillCircle(-15, -45, 6);
            g.fillCircle(15, -45, 6);
        } else if (name === 'monster_ice_golem') {
            g.fillStyle(0x2980b9, 1);
            g.fillRect(-70, -100, 140, 200);
            g.fillStyle(0x3498db, 1);
            g.fillRect(-60, -90, 120, 180);
            g.fillStyle(0x00ffff, 1);
            g.fillRect(-45, -70, 25, 25);
            g.fillRect(20, -70, 25, 25);
            g.lineStyle(2, 0xffffff, 0.5);
            g.lineBetween(-30, 10, 20, 50);
            g.lineBetween(40, -20, 60, 20);
        } else if (name === 'monster_polar_bear') {
            g.fillStyle(0xdcdde1, 1);
            g.fillEllipse(0, 0, 160, 110);
            g.fillCircle(90, -40, 50);
            g.fillStyle(0xffffff, 1);
            g.fillEllipse(-10, -5, 140, 90);
            g.fillStyle(0x2f3640, 1);
            g.fillCircle(115, -45, 6);
            g.fillCircle(130, -35, 10);
        } else if (name === 'monster_lollipop') {
            // Stick with candy stripes
            g.fillStyle(0xffffff, 1);
            g.fillRect(-7, 0, 14, 120);
            g.fillStyle(0xff4444, 1);
            for (let i = 0; i < 5; i++) {
                g.fillRect(-7, i * 24, 14, 12);
            }
            // Head
            g.fillStyle(0xff69b4, 1);
            g.fillCircle(0, -60, 70);
            // Spiral
            g.lineStyle(7, 0xffffff, 0.8);
            g.beginPath();
            for (let a = 0; a < Math.PI * 2.5; a += 0.15) {
                const r = a * 9;
                const px = Math.cos(a) * r;
                const py = Math.sin(a) * r - 60;
                if (a === 0) g.moveTo(px, py);
                else g.lineTo(px, py);
            }
            g.strokePath();
            // Eyes and smile
            g.fillStyle(0x2c3e50, 1);
            g.fillCircle(-22, -72, 7);
            g.fillCircle(22, -72, 7);
            g.lineStyle(5, 0x2c3e50, 1);
            g.beginPath();
            g.arc(0, -55, 18, 0.2, Math.PI - 0.2, false);
            g.strokePath();
        } else if (name === 'monster_teddy') {
            // Body
            g.fillStyle(0xff6644, 1);
            g.fillEllipse(0, 30, 110, 130);
            // Head
            g.fillCircle(0, -50, 55);
            // Glossy highlight
            g.fillStyle(0xff9977, 0.5);
            g.fillCircle(-18, -65, 20);
            // Ears
            g.fillStyle(0xff6644, 1);
            g.fillCircle(-38, -95, 18);
            g.fillCircle(38, -95, 18);
            // Eyes
            g.fillStyle(0x2c3e50, 1);
            g.fillCircle(-18, -55, 7);
            g.fillCircle(18, -55, 7);
            g.fillStyle(0xffffff, 1);
            g.fillCircle(-20, -57, 3);
            g.fillCircle(16, -57, 3);
            // Smile
            g.lineStyle(4, 0x2c3e50, 1);
            g.beginPath();
            g.arc(0, -40, 16, 0.2, Math.PI - 0.2, false);
            g.strokePath();
        } else if (name === 'monster_candy_cane') {
            // White shaft
            g.fillStyle(0xffffff, 1);
            g.fillRect(-18, -60, 36, 160);
            // Red stripes
            g.fillStyle(0xdd1111, 1);
            for (let i = 0; i < 6; i++) {
                g.fillRect(-18, -60 + i * 27, 36, 13);
            }
            // Hook top (white base then stripes)
            g.fillStyle(0xffffff, 1);
            g.fillRect(-18, -88, 70, 30);
            g.fillRect(34, -88, 36, 60);
            g.fillStyle(0xdd1111, 1);
            g.fillRect(-18, -88, 70, 13);
            g.fillRect(34, -88, 36, 13);
            g.fillRect(34, -62, 36, 13);
            // Face on shaft
            g.fillStyle(0x2c3e50, 1);
            g.fillCircle(-6, 40, 5);
            g.fillCircle(6, 40, 5);
            g.lineStyle(4, 0x2c3e50, 1);
            g.beginPath();
            g.arc(0, 55, 10, 0.2, Math.PI - 0.2, false);
            g.strokePath();
        } else if (name === 'monster_bee') {
            // Striped body
            g.fillStyle(0xffd700, 1);
            g.fillEllipse(0, 20, 80, 120);
            g.fillStyle(0x1a1a1a, 1);
            g.fillRect(-40, 0, 80, 18);
            g.fillRect(-40, 36, 80, 18);
            g.fillRect(-40, 72, 80, 18);
            // Wings
            g.fillStyle(0xaaddff, 0.55);
            g.fillEllipse(-65, -30, 80, 50);
            g.fillEllipse(65, -30, 80, 50);
            // Head
            g.fillStyle(0xffd700, 1);
            g.fillCircle(0, -55, 38);
            // Eyes
            g.fillStyle(0x1a1a1a, 1);
            g.fillCircle(-13, -60, 7);
            g.fillCircle(13, -60, 7);
            // Antennae
            g.lineStyle(3, 0x1a1a1a, 1);
            g.lineBetween(-10, -90, -25, -118);
            g.lineBetween(10, -90, 25, -118);
            g.fillStyle(0x1a1a1a, 1);
            g.fillCircle(-25, -118, 5);
            g.fillCircle(25, -118, 5);
            // Smile
            g.lineStyle(3, 0x1a1a1a, 1);
            g.beginPath();
            g.arc(0, -46, 13, 0.2, Math.PI - 0.2, false);
            g.strokePath();
        } else if (name === 'monster_butterfly') {
            // Upper wings
            g.fillStyle(0x8833ff, 1);
            g.fillTriangle(-95, -65, -10, -55, -10, 60);
            g.fillTriangle(95, -65, 10, -55, 10, 60);
            // Lower wings
            g.fillStyle(0xbb88ff, 1);
            g.fillTriangle(-70, 65, -10, 10, -10, 115);
            g.fillTriangle(70, 65, 10, 10, 10, 115);
            // Wing highlights
            g.lineStyle(2, 0xffffff, 0.45);
            g.lineBetween(-55, -40, -20, 20);
            g.lineBetween(55, -40, 20, 20);
            // Body
            g.fillStyle(0x1a1a1a, 1);
            g.fillEllipse(0, 20, 16, 120);
            // Head
            g.fillCircle(0, -50, 18);
            // Antennae
            g.lineStyle(3, 0x1a1a1a, 1);
            g.lineBetween(-5, -65, -20, -100);
            g.lineBetween(5, -65, 20, -100);
            g.fillStyle(0x8833ff, 1);
            g.fillCircle(-20, -100, 6);
            g.fillCircle(20, -100, 6);
        } else if (name === 'monster_ladybug') {
            // Red body
            g.fillStyle(0xdd1111, 1);
            g.fillEllipse(0, 10, 140, 120);
            // Centre line
            g.lineStyle(4, 0x1a1a1a, 1);
            g.lineBetween(0, -50, 0, 70);
            // Spots (3 per side)
            g.fillStyle(0x1a1a1a, 1);
            g.fillCircle(-34, -12, 16);
            g.fillCircle(34, -12, 16);
            g.fillCircle(-32, 28, 13);
            g.fillCircle(32, 28, 13);
            g.fillCircle(-20, 58, 10);
            g.fillCircle(20, 58, 10);
            // Head
            g.fillStyle(0x1a1a1a, 1);
            g.fillCircle(0, -62, 36);
            // Eyes
            g.fillStyle(0xffffff, 1);
            g.fillCircle(-12, -68, 9);
            g.fillCircle(12, -68, 9);
            g.fillStyle(0x1a1a1a, 1);
            g.fillCircle(-12, -68, 5);
            g.fillCircle(12, -68, 5);
            // Antennae
            g.lineStyle(3, 0x1a1a1a, 1);
            g.lineBetween(-8, -94, -20, -122);
            g.lineBetween(8, -94, 20, -122);
        } else if (name === 'monster_dragon') {
            // Wings
            g.fillStyle(0x440000, 1);
            g.fillTriangle(-20, -20, -130, -100, -80, 60);
            g.fillTriangle(20, -20, 130, -100, 80, 60);
            // Body
            g.fillStyle(0x660000, 1);
            g.fillEllipse(0, 40, 120, 140);
            g.fillStyle(0x880000, 1);
            g.fillEllipse(-8, 30, 95, 115);
            // Neck
            g.fillStyle(0x770000, 1);
            g.fillRect(-16, -80, 32, 70);
            // Head
            g.fillStyle(0x990000, 1);
            g.fillEllipse(0, -100, 60, 48);
            // Snout
            g.fillStyle(0x660000, 1);
            g.fillRect(0, -108, 42, 18);
            // Fire breath
            g.fillStyle(0xff6600, 0.9);
            g.fillTriangle(42, -104, 60, -114, 105, -96);
            g.fillTriangle(42, -100, 58, -90, 108, -108);
            g.fillStyle(0xffcc00, 0.8);
            g.fillTriangle(48, -102, 62, -100, 96, -100);
            // Eye
            g.fillStyle(0xffff00, 1);
            g.fillCircle(-12, -100, 8);
            g.fillStyle(0x000000, 1);
            g.fillCircle(-12, -100, 4);
        } else if (name === 'monster_lava_golem') {
            // Stone body
            g.fillStyle(0x2d1a1a, 1);
            g.fillRect(-70, -100, 140, 200);
            g.fillStyle(0x4a2010, 1);
            g.fillRect(-60, -90, 120, 180);
            // Glowing cracks
            g.lineStyle(4, 0xff6600, 0.9);
            g.lineBetween(-30, -60, 10, -20);
            g.lineBetween(-10, -20, -35, 25);
            g.lineBetween(-35, 25, 20, 65);
            g.lineBetween(-50, 35, -5, 70);
            g.lineStyle(2, 0xffaa00, 0.6);
            g.lineBetween(-22, -52, 6, -14);
            g.lineBetween(-4, -14, -26, 20);
            // Eye slots
            g.fillStyle(0xff4400, 1);
            g.fillRect(-35, -72, 22, 18);
            g.fillRect(13, -72, 22, 18);
            g.fillStyle(0xffaa00, 0.7);
            g.fillRect(-29, -68, 12, 10);
            g.fillRect(17, -68, 12, 10);
        } else if (name === 'monster_phoenix') {
            // Tail feathers
            g.fillStyle(0xff2200, 1);
            g.fillTriangle(-18, 68, 2, 28, 22, 78);
            g.fillStyle(0xff6600, 1);
            g.fillTriangle(-28, 72, -4, 38, 6, 82);
            g.fillStyle(0xffaa00, 1);
            g.fillTriangle(12, 70, 22, 38, 36, 75);
            // Wings
            g.fillStyle(0xcc2200, 1);
            g.fillTriangle(-15, -20, -115, -80, -90, 55);
            g.fillTriangle(15, -20, 115, -80, 90, 55);
            g.fillStyle(0xff6600, 1);
            g.fillTriangle(-15, -20, -88, -58, -72, 40);
            g.fillTriangle(15, -20, 88, -58, 72, 40);
            // Body
            g.fillStyle(0xdd4400, 1);
            g.fillEllipse(0, 14, 78, 105);
            g.fillStyle(0xff6600, 1);
            g.fillEllipse(-6, 6, 58, 80);
            // Head
            g.fillStyle(0xff5500, 1);
            g.fillCircle(0, -54, 34);
            // Crest feathers
            g.fillStyle(0xffcc00, 1);
            g.fillTriangle(-6, -84, 0, -112, 6, -84);
            g.fillTriangle(-16, -80, -8, -106, 0, -80);
            g.fillTriangle(6, -80, 14, -106, 16, -80);
            // Eye + beak
            g.fillStyle(0xffee00, 1);
            g.fillCircle(-11, -57, 7);
            g.fillStyle(0x000000, 1);
            g.fillCircle(-11, -57, 3);
            g.fillStyle(0xffcc00, 1);
            g.fillTriangle(6, -54, 26, -50, 6, -44);
        } else if (name === 'monster_shark') {
            // Body
            g.fillStyle(0x5b7d8a, 1);
            g.fillEllipse(0, 0, 180, 78);
            g.fillStyle(0x7ab0c0, 1);
            g.fillEllipse(-8, -6, 148, 58);
            // Belly
            g.fillStyle(0xddeeff, 1);
            g.fillEllipse(5, 16, 115, 28);
            // Dorsal fin
            g.fillStyle(0x4a6a77, 1);
            g.fillTriangle(-8, -38, 18, -38, 8, -110);
            // Pectoral fins
            g.fillTriangle(-50, 8, -92, 58, -18, 48);
            g.fillTriangle(50, 8, 92, 48, 18, 48);
            // Tail
            g.fillTriangle(-80, -6, -115, -52, -115, 42);
            // Eye
            g.fillStyle(0x000000, 1);
            g.fillCircle(52, -16, 8);
            g.fillStyle(0xffffff, 1);
            g.fillCircle(54, -18, 3);
            // Teeth
            g.fillStyle(0xffffff, 1);
            for (let i = 0; i < 5; i++) {
                g.fillTriangle(-18 + i * 12, 4, -10 + i * 12, 4, -14 + i * 12, 22);
            }
        } else if (name === 'monster_octopus') {
            // Tentacles (behind head)
            g.fillStyle(0x5533aa, 1);
            g.fillRoundedRect(-58, 5, 22, 95, 11);
            g.fillRoundedRect(-28, 10, 20, 100, 10);
            g.fillRoundedRect(8, 10, 20, 100, 10);
            g.fillRoundedRect(36, 5, 22, 95, 11);
            // Suckers
            g.fillStyle(0xaa88ff, 1);
            for (let i = 0; i < 4; i++) {
                g.fillCircle(-47, 22 + i * 20, 5);
                g.fillCircle(-18, 28 + i * 20, 5);
                g.fillCircle(18, 28 + i * 20, 5);
                g.fillCircle(47, 22 + i * 20, 5);
            }
            // Head
            g.fillStyle(0x5533aa, 1);
            g.fillEllipse(0, -42, 125, 105);
            g.fillStyle(0x7755cc, 1);
            g.fillEllipse(-8, -48, 92, 78);
            // Eyes
            g.fillStyle(0xffeedd, 1);
            g.fillCircle(-20, -52, 15);
            g.fillCircle(20, -52, 15);
            g.fillStyle(0x1a0044, 1);
            g.fillCircle(-20, -52, 7);
            g.fillCircle(20, -52, 7);
            g.fillStyle(0xffffff, 1);
            g.fillCircle(-22, -54, 3);
            g.fillCircle(18, -54, 3);
        } else if (name === 'monster_jellyfish') {
            // Trailing tentacles
            g.lineStyle(3, 0xaabbff, 0.5);
            g.lineBetween(-42, 0, -62, 105);
            g.lineBetween(-58, -8, -75, 92);
            g.lineBetween(42, 0, 62, 105);
            g.lineBetween(58, -8, 75, 92);
            // Oral arms
            g.lineStyle(8, 0x7788ee, 0.7);
            g.lineBetween(-14, 2, -24, 82);
            g.lineBetween(2, 2, 10, 86);
            g.lineBetween(16, 2, 6, 78);
            // Bell/dome
            g.fillStyle(0x5588ff, 0.8);
            g.fillEllipse(0, -42, 140, 100);
            g.fillStyle(0x88aaff, 0.6);
            g.fillEllipse(-5, -50, 100, 65);
            // Bioluminescent spots
            g.fillStyle(0xccddff, 0.85);
            g.fillCircle(-25, -52, 7);
            g.fillCircle(16, -56, 5);
            g.fillCircle(32, -44, 6);
            g.fillCircle(-8, -36, 4);
        } else if (name === 'monster_alien') {
            // Large head
            g.fillStyle(0x44bb44, 1);
            g.fillEllipse(0, -52, 114, 134);
            g.fillStyle(0x66dd66, 1);
            g.fillEllipse(-8, -60, 82, 100);
            // Large eyes
            g.fillStyle(0x0a0a1a, 1);
            g.fillEllipse(-22, -58, 40, 28);
            g.fillEllipse(22, -58, 40, 28);
            g.fillStyle(0x3333ff, 0.5);
            g.fillCircle(-22, -58, 12);
            g.fillCircle(22, -58, 12);
            // Mouth slit
            g.lineStyle(3, 0x228822, 1);
            g.lineBetween(-14, -22, 14, -22);
            // Thin body
            g.fillStyle(0x44bb44, 1);
            g.fillRect(-20, 18, 40, 58);
            // Arms
            g.fillRect(-54, 22, 34, 12);
            g.fillRect(20, 22, 34, 12);
            // Antennae
            g.lineStyle(3, 0x44bb44, 1);
            g.lineBetween(-14, -112, -28, -148);
            g.lineBetween(14, -112, 28, -148);
            g.fillStyle(0x88ff88, 1);
            g.fillCircle(-28, -148, 7);
            g.fillCircle(28, -148, 7);
        } else if (name === 'monster_robot') {
            // Head
            g.fillStyle(0x667788, 1);
            g.fillRect(-38, -112, 76, 68);
            g.fillStyle(0x001122, 1);
            g.fillRect(-28, -102, 56, 32);
            g.fillStyle(0x00ffff, 1);
            g.fillRect(-20, -94, 16, 15);
            g.fillRect(4, -94, 16, 15);
            // Antenna
            g.fillStyle(0x889999, 1);
            g.fillRect(-3, -144, 6, 34);
            g.fillCircle(0, -147, 7);
            g.fillStyle(0xff4444, 1);
            g.fillCircle(0, -147, 4);
            // Body
            g.fillStyle(0x556677, 1);
            g.fillRect(-55, -44, 110, 118);
            g.fillStyle(0x445566, 1);
            g.fillRect(-38, -34, 76, 80);
            // Buttons
            g.fillStyle(0xff4444, 1); g.fillCircle(-18, -14, 6);
            g.fillStyle(0x44ff44, 1); g.fillCircle(0, -14, 6);
            g.fillStyle(0x4444ff, 1); g.fillCircle(18, -14, 6);
            // Arms
            g.fillStyle(0x667788, 1);
            g.fillRect(-86, -40, 31, 80);
            g.fillRect(55, -40, 31, 80);
            g.fillCircle(-70, 46, 16);
            g.fillCircle(70, 46, 16);
            // Legs
            g.fillStyle(0x556677, 1);
            g.fillRect(-40, 74, 30, 50);
            g.fillRect(10, 74, 30, 50);
            g.fillRect(-48, 118, 46, 18);
            g.fillRect(2, 118, 46, 18);
        } else if (name === 'monster_ufo') {
            // Light beam
            g.fillStyle(0xffffaa, 0.14);
            g.fillTriangle(-50, 22, 50, 22, 105, 210);
            // Saucer body
            g.fillStyle(0xaabbcc, 1);
            g.fillEllipse(0, 12, 200, 60);
            g.fillStyle(0xbbccdd, 1);
            g.fillEllipse(-4, 6, 158, 44);
            // Dome
            g.fillStyle(0x4488cc, 0.75);
            g.fillEllipse(0, -26, 82, 72);
            g.fillStyle(0x66aaee, 0.5);
            g.fillEllipse(-7, -32, 50, 46);
            // Rim lights
            const rimColors = [0xff4444, 0x44ff44, 0x4488ff, 0xffff44, 0xff44ff];
            for (let i = 0; i < 5; i++) {
                const a = (i / 5) * Math.PI * 2;
                g.fillStyle(rimColors[i], 1);
                g.fillCircle(Math.cos(a) * 75, Math.sin(a) * 20 + 12, 7);
            }
            // Alien silhouette inside dome
            g.fillStyle(0x44bb44, 0.85);
            g.fillCircle(0, -26, 18);
            g.fillStyle(0x0a0a1a, 1);
            g.fillEllipse(-7, -28, 14, 9);
            g.fillEllipse(7, -28, 14, 9);
        }
    }

    _handleMonsterDefeat(container) {
        this.add.particles(container.x, container.y, 'particle', {
            speed: { min: 100, max: 300 },
            scale: { start: 0.5, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 1000,
            quantity: 30,
            blendMode: 'ADD'
        }).setScrollFactor(0).explode();

        this.tweens.add({
            targets: container,
            alpha: 0,
            y: '-=100',
            duration: 600,
            onComplete: () => {
                container.destroy();
                this._resumeWalking();
            }
        });
    }

    _spawnChest() {
        const { width, height } = this.cameras.main;
        const container = this.add.container(width / 2, height / 2).setScale(0.01).setScrollFactor(0);

        const aura = this.add.circle(0, 0, 100, 0xffd700, 0.2);
        this.tweens.add({ targets: aura, scale: 1.5, alpha: 0, duration: 1500, repeat: -1 });
        container.add(aura);

        const g = this.add.graphics();
        g.fillStyle(0x5d2e0c, 1);
        g.fillRoundedRect(-60, -50, 120, 100, 10);
        g.fillStyle(0x8b4513, 1);
        g.fillRoundedRect(-55, -45, 110, 90, 8);
        g.fillStyle(0xffd700, 1);
        g.fillRect(-40, -50, 15, 100);
        g.fillRect(25, -50, 15, 100);
        g.fillStyle(0xf1c40f, 1);
        g.fillCircle(0, 0, 15);
        g.fillStyle(0x000000, 1);
        g.fillRect(-2, 0, 4, 10);
        container.add(g);

        this.tweens.add({
            targets: container,
            scale: 1.8,
            duration: 1800,
            onComplete: () => {
                this.scene.pause();
                this.scene.launch('MathProblemScene', {
                    isChest:   true,
                    numMax:    this.worldConfig.numMax,
                    operation: this.worldConfig.operation ?? 'add',
                    onSuccess: () => {
                        const newRound = this.roundCount + 1;
                        this._updateRoundHUD(newRound);
                        if (newRound >= this.totalRounds) {
                            this._triggerWorldComplete();
                        } else {
                            this._addDecoration();
                            container.destroy();
                            this._resumeWalking();
                        }
                    }
                });
            }
        });
    }

    _resumeWalking() {
        this.isWalking = true;
        this.nextEncounter = this.distance + this.encounterThreshold + Math.random() * 80;
        this.scene.resume();
    }

    _triggerWorldComplete() {
        this.isWalking = false;
        this.scene.launch('MathVictoryScene', { worldIndex: this.worldIndex });
    }

    _addDecoration() {
        const { width, height } = this.cameras.main;
        const x = Math.random() * width;
        const y = height * 0.1 + Math.random() * (height * 0.3);
        const star = this.add.text(x, y, '✨', {
            fontSize: `${Math.floor(Math.random() * 20 + 20)}px`
        }).setDepth(2).setAlpha(0).setScrollFactor(0);

        this.tweens.add({
            targets: star,
            alpha: 0.8,
            y: '-=20',
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        this.decorations.push(star);
    }
}
