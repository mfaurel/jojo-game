import { Scene } from 'phaser';
import { MATH_WORLDS } from '../data/MathWorldData.js';
import { getEquipment } from '../data/LevelData.js';

export class MathDungeon extends Scene {
    constructor() {
        super('MathDungeon');
        this.distance = 0;
        this.isWalking = true;
        this.encounterThreshold = 150;
        this.nextEncounter = 150;
        this.decorations = [];
    }

    init(data) {
        this.worldIndex = data.worldIndex ?? 0;
        this.worldConfig = MATH_WORLDS[this.worldIndex];
        this.score = 0;
    }

    create() {
        const { width, height } = this.cameras.main;

        this.cameras.main.setBackgroundColor(this.worldConfig.skyTop);

        this._drawEnvironment(width, height);

        this.lines = this.add.graphics();

        this._createWorldParticles(width, height);

        this.worldGroup = this.add.group();

        this._drawArms(width, height);

        this._createUI(width, height);

        this.distance = 0;
        this.nextEncounter = 100;
        this.isWalking = true;
    }

    _drawEnvironment(w, h) {
        const vanishingY = h * 0.5;
        const wc = this.worldConfig;

        const ceiling = this.add.graphics();
        ceiling.fillGradientStyle(wc.skyTop, wc.skyTop, wc.skyBottom, wc.skyBottom, 1);
        ceiling.fillRect(0, 0, w, vanishingY);

        const floor = this.add.graphics();
        floor.fillGradientStyle(wc.floorTop, wc.floorTop, wc.floorBottom, wc.floorBottom, 1);
        floor.fillRect(0, vanishingY, w, h - vanishingY);

        const fog = this.add.graphics();
        const fc = wc.fogColor;
        fog.fillGradientStyle(fc, fc, fc, fc, 0, 0, 0.8, 0.8);
        fog.fillCircle(w / 2, vanishingY, 150);
        fog.setAlpha(0.4);
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
            snow.setDepth(5);
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
            candy.setDepth(5);
        } else {
            // petal
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
            petal.setDepth(5);
        }
    }

    _createUI(w, h) {
        // Score HUD background
        this.add.rectangle(135, 42, 250, 58, 0x000000, 0.5).setDepth(199);

        this.add.text(18, 16, 'Points', {
            fontSize: '15px',
            color: '#aaccff',
            fontFamily: 'Arial Black',
        }).setDepth(200);

        this.scoreText = this.add.text(18, 34, `0 / ${this.worldConfig.pointsNeeded}`, {
            fontSize: '22px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 3,
        }).setDepth(200);

        // Progress bar track
        this.add.rectangle(135, 73, 222, 12, 0x333333).setDepth(200);
        // Progress bar fill (origin 0, 0.5 so it grows from the left)
        this.progressBar = this.add.rectangle(24, 73, 0, 12, 0x00ff88)
            .setOrigin(0, 0.5).setDepth(201);

        // World name badge top-centre
        this.add.text(w / 2, 12, this.worldConfig.name, {
            fontSize: '20px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5, 0).setDepth(200);

        const backBtn = this.add.text(w * 0.95, h * 0.05, 'Menu', {
            fontSize: 'clamp(18px, 3.5vw, 24px)',
            color: '#ffffff',
            backgroundColor: '#004488',
            padding: { x: 15, y: 8 }
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true }).setDepth(200);

        backBtn.on('pointerup', () => this.scene.start('MathWorldSelectScene'));
    }

    _updateScoreHUD(newScore) {
        this.score = newScore;
        this.scoreText.setText(`${newScore} / ${this.worldConfig.pointsNeeded}`);
        const fraction = Math.min(newScore / this.worldConfig.pointsNeeded, 1);
        this.progressBar.width = 222 * fraction;
        if (fraction < 0.5) this.progressBar.setFillStyle(0x00ff88);
        else if (fraction < 0.85) this.progressBar.setFillStyle(0xffdd00);
        else this.progressBar.setFillStyle(0xff8800);
    }

    update(time, delta) {
        if (!this.isWalking) return;

        this.distance += delta * 0.35;

        this._updatePerspective();

        if (this.distance >= this.nextEncounter) {
            this._triggerEncounter();
        }

        this._animateArms(time);
    }

    _updatePerspective() {
        const { width, height } = this.cameras.main;
        const vX = width / 2;
        const vY = height / 2;
        const gc = this.worldConfig.gridColor;

        this.lines.clear();

        this.lines.lineStyle(2, gc, 0.2);

        this.lines.lineBetween(0, 0, vX, vY);
        this.lines.lineBetween(width, 0, vX, vY);
        this.lines.lineBetween(0, height, vX, vY);
        this.lines.lineBetween(width, height, vX, vY);

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
        });

        // Left arm — shield if equipped, teddy bear by default
        this.teddyArm = this.add.container(w * 0.2, h * 0.85);
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
        this.wandArm = this.add.container(w * 0.8, h * 0.85);
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
        const swayX = Math.sin(time / 250) * 15;
        const swayY = Math.cos(time / 200) * 10;

        this.wandArm.x = (width * 0.85) + swayX;
        this.wandArm.y = (height * 0.85) + swayY;

        this.teddyArm.x = (width * 0.15) - swayX;
        this.teddyArm.y = (height * 0.85) + swayY;
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

        const container = this.add.container(width / 2, height / 2).setScale(0.01);

        const shadow = this.add.ellipse(0, 80, 120, 40, 0x000000, 0.2);
        container.add(shadow);

        const g = this.add.graphics();
        this._drawDetailedMonster(g, name);
        container.add(g);

        const title = this.add.text(0, -160, name, {
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
                    numMax: this.worldConfig.numMax,
                    monsterName: name,
                    onSuccess: () => {
                        const newScore = this.score + 200;
                        this._updateScoreHUD(newScore);
                        if (newScore >= this.worldConfig.pointsNeeded) {
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
        if (name === 'Bonhomme de Neige') {
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
        } else if (name === 'Golem de Glace') {
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
        } else if (name === 'Ours Polaire') {
            g.fillStyle(0xdcdde1, 1);
            g.fillEllipse(0, 0, 160, 110);
            g.fillCircle(90, -40, 50);
            g.fillStyle(0xffffff, 1);
            g.fillEllipse(-10, -5, 140, 90);
            g.fillStyle(0x2f3640, 1);
            g.fillCircle(115, -45, 6);
            g.fillCircle(130, -35, 10);
        } else if (name === 'Sucette') {
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
        } else if (name === 'Ourson') {
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
        } else if (name === 'Canne en Sucre') {
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
        } else if (name === 'Abeille') {
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
        } else if (name === 'Papillon') {
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
        } else if (name === 'Coccinelle') {
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
        }).explode();

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
        const container = this.add.container(width / 2, height / 2).setScale(0.01);

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
                    isChest: true,
                    numMax: this.worldConfig.numMax,
                    onSuccess: () => {
                        const newScore = this.score + 200;
                        this._updateScoreHUD(newScore);
                        if (newScore >= this.worldConfig.pointsNeeded) {
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
        }).setDepth(2).setAlpha(0);

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
