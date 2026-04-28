import { Scene } from 'phaser';

export class MathDungeon extends Scene {
    constructor() {
        super('MathDungeon');
        this.distance = 0;
        this.isWalking = true;
        this.encounterThreshold = 400;
        this.nextEncounter = 400;
        this.decorations = [];
    }

    create() {
        const { width, height } = this.cameras.main;
        
        // Background Gradient (Deep Ice to Fog)
        this.cameras.main.setBackgroundColor(0x1a3a5a);

        // Floor and Ceiling with Gradients
        this._drawEnvironment(width, height);

        // Perspective Grid
        this.lines = this.add.graphics();
        
        // Snow Particles
        this._createSnowParticles(width, height);

        // World Group for monsters/chests
        this.worldGroup = this.add.group();

        // Princess Arms
        this._drawArms(width, height);

        // UI Layer
        this._createUI(width, height);

        // Reset state
        this.distance = 0;
        this.nextEncounter = 300;
        this.isWalking = true;
    }

    _drawEnvironment(w, h) {
        const vanishingY = h * 0.5;
        
        // Ceiling Gradient
        const ceiling = this.add.graphics();
        ceiling.fillGradientStyle(0x0a1a2a, 0x0a1a2a, 0x5a88aa, 0x5a88aa, 1);
        ceiling.fillRect(0, 0, w, vanishingY);

        // Floor Gradient
        const floor = this.add.graphics();
        floor.fillGradientStyle(0x5a88aa, 0x5a88aa, 0xddf4ff, 0xddf4ff, 1);
        floor.fillRect(0, vanishingY, w, h - vanishingY);

        // Fog near vanishing point
        const fog = this.add.graphics();
        fog.fillGradientStyle(0x88ccff, 0x88ccff, 0x88ccff, 0x88ccff, 0, 0, 0.8, 0.8);
        fog.fillCircle(w / 2, vanishingY, 150);
        fog.setAlpha(0.4);
    }

    _createSnowParticles(w, h) {
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
    }

    _createUI(w, h) {
        this.distText = this.add.text(w * 0.05, h * 0.05, 'Distance: 0m', {
            fontSize: 'clamp(20px, 4vw, 28px)',
            color: '#ffffff',
            fontFamily: 'Arial Black',
            stroke: '#004488',
            strokeThickness: 4
        }).setDepth(200);

        const backBtn = this.add.text(w * 0.95, h * 0.05, 'Menu', {
            fontSize: 'clamp(18px, 3.5vw, 24px)',
            color: '#ffffff',
            backgroundColor: '#004488',
            padding: { x: 15, y: 8 }
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true }).setDepth(200);
        
        backBtn.on('pointerup', () => this.scene.start('MainMenu'));
    }

    update(time, delta) {
        if (!this.isWalking) return;

        this.distance += delta * 0.15;
        this.distText.setText(`Distance: ${Math.floor(this.distance)}m`);

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

        this.lines.clear();
        
        // Dynamic Glow from Wand
        const wandLightX = this.wandArm.x;
        const wandLightY = this.wandArm.y - 150;
        
        this.lines.lineStyle(2, 0xffffff, 0.2);
        
        // Perspective Corners
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
                this.lines.lineStyle(1.5, 0xffffff, 0.3 * (1 - i / 8));
                this.lines.strokeRect(vX - rw / 2, vY - rh / 2, rw, rh);
            }
        }
    }

    _drawArms(w, h) {
        // Shared Trail Emitter
        this.magicTrail = this.add.particles(0, 0, 'particle', {
            speed: { min: 20, max: 60 },
            scale: { start: 0.4, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 800,
            blendMode: 'ADD',
            frequency: 20,
            follow: null
        });

        // Teddy (Left)
        this.teddyArm = this.add.container(w * 0.2, h * 0.85);
        const teddyG = this.add.graphics();
        this._drawDetailedTeddy(teddyG);
        this.teddyArm.add(teddyG);
        this.teddyArm.setDepth(150);

        // Wand (Right)
        this.wandArm = this.add.container(w * 0.8, h * 0.85);
        const wandG = this.add.graphics();
        this._drawDetailedWand(wandG);
        this.wandArm.add(wandG);
        this.wandArm.setDepth(150);

        this.magicTrail.startFollow(this.wandArm, 0, -180);
    }

    _drawDetailedTeddy(g) {
        // Shadow/Depth
        g.fillStyle(0x5d2e0c, 1);
        g.fillEllipse(5, 5, 130, 170); // Drop shadow arm
        
        // Body
        g.fillStyle(0x8b4513, 1);
        g.fillEllipse(0, 0, 130, 170);
        
        // Head
        g.fillStyle(0xa0522d, 1);
        g.fillCircle(-40, -60, 45);
        g.lineStyle(3, 0x5d2e0c, 1);
        g.strokeCircle(-40, -60, 45);

        // Highlight
        g.fillStyle(0xcd853f, 0.4);
        g.fillCircle(-30, -70, 15);

        // Ears
        g.fillStyle(0x8b4513, 1);
        g.fillCircle(-75, -95, 22);
        g.fillCircle(-5, -95, 22);
        
        // Eyes
        g.fillStyle(0x000000, 1);
        g.fillCircle(-55, -65, 6);
        g.fillCircle(-25, -65, 6);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(-57, -67, 2);
        g.fillCircle(-27, -67, 2);
    }

    _drawDetailedWand(g) {
        // Hand
        g.fillStyle(0xbb8a6a, 1);
        g.fillCircle(5, 5, 45); // Shadow
        g.fillStyle(0xffe4b5, 1);
        g.fillCircle(0, 0, 45);
        
        // Stick
        g.fillStyle(0x2b1e1e, 1);
        g.fillRect(-3, -160, 12, 160); // Shadow
        g.fillStyle(0x4b2e1e, 1);
        g.fillRect(-6, -160, 10, 160);
        
        // Star with glow
        g.fillStyle(0xffa500, 1); // Darker core
        this._drawStar(g, 0, -170, 5, 45, 20);
        g.fillStyle(0xffd700, 1); // Brighter top
        this._drawStar(g, -2, -172, 5, 40, 18);
    }

    _drawStar(graphics, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;
        graphics.beginPath();
        graphics.moveTo(cx, cy - outerRadius)
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            graphics.lineTo(x, y)
            rot += step
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            graphics.lineTo(x, y)
            rot += step
        }
        graphics.lineTo(cx, cy - outerRadius)
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
        const monsters = ['Snowman', 'Ice Golem', 'Polar Bear'];
        const name = monsters[Math.floor(Math.random() * monsters.length)];

        const container = this.add.container(width / 2, height / 2).setScale(0.01);
        
        // Shadow
        const shadow = this.add.ellipse(0, 80, 120, 40, 0x000000, 0.2);
        container.add(shadow);

        const g = this.add.graphics();
        this._drawDetailedMonster(g, name);
        container.add(g);

        const title = this.add.text(0, -150, name, { 
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
                    onSuccess: () => {
                        this._handleMonsterDefeat(container);
                    }
                });
            }
        });
    }

    _drawDetailedMonster(g, name) {
        if (name === 'Snowman') {
            // Body with shading
            g.fillStyle(0xe0e0e0, 1);
            g.fillCircle(0, 50, 70); // Bottom
            g.fillCircle(0, -30, 50); // Top
            g.fillStyle(0xffffff, 1);
            g.fillCircle(-10, 40, 60); // Highlight
            g.fillCircle(-8, -35, 42);

            // Carrot nose
            g.fillStyle(0xd35400, 1);
            g.fillTriangle(0, -35, 0, -25, 40, -30);
            
            // Eyes
            g.fillStyle(0x2c3e50, 1);
            g.fillCircle(-15, -45, 6);
            g.fillCircle(15, -45, 6);
        } else if (name === 'Ice Golem') {
            // Crystal body
            g.fillStyle(0x2980b9, 1);
            g.fillRect(-70, -100, 140, 200);
            g.fillStyle(0x3498db, 1);
            g.fillRect(-60, -90, 120, 180);
            
            // Glowing eyes
            g.fillStyle(0x00ffff, 1);
            g.fillRect(-45, -70, 25, 25);
            g.fillRect(20, -70, 25, 25);
            
            // Cracks/Details
            g.lineStyle(2, 0xffffff, 0.5);
            g.lineBetween(-30, 10, 20, 50);
            g.lineBetween(40, -20, 60, 20);
        } else { // Polar Bear
            g.fillStyle(0xdcdde1, 1);
            g.fillEllipse(0, 0, 160, 110);
            g.fillCircle(90, -40, 50); // Head
            g.fillStyle(0xffffff, 1);
            g.fillEllipse(-10, -5, 140, 90);
            
            g.fillStyle(0x2f3640, 1);
            g.fillCircle(115, -45, 6); // Eye
            g.fillCircle(130, -35, 10); // Nose
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
        
        // Aura
        const aura = this.add.circle(0, 0, 100, 0xffd700, 0.2);
        this.tweens.add({ targets: aura, scale: 1.5, alpha: 0, duration: 1500, repeat: -1 });
        container.add(aura);

        const g = this.add.graphics();
        // Box
        g.fillStyle(0x5d2e0c, 1);
        g.fillRoundedRect(-60, -50, 120, 100, 10);
        g.fillStyle(0x8b4513, 1);
        g.fillRoundedRect(-55, -45, 110, 90, 8);
        
        // Gold Straps
        g.fillStyle(0xffd700, 1);
        g.fillRect(-40, -50, 15, 100);
        g.fillRect(25, -50, 15, 100);
        
        // Lock
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
                    onSuccess: () => {
                        this._addDecoration();
                        container.destroy();
                        this._resumeWalking();
                    }
                });
            }
        });
    }

    _resumeWalking() {
        this.isWalking = true;
        this.nextEncounter = this.distance + this.encounterThreshold + Math.random() * 200;
        this.scene.resume();
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
