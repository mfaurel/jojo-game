import { Scene } from 'phaser';

export class MathDungeon extends Scene {
    constructor() {
        super('MathDungeon');
        this.distance = 0;
        this.isWalking = true;
        this.encounterThreshold = 400; // Distance between encounters
        this.nextEncounter = 400;
        this.decorations = []; // Unlocked sprites
    }

    create() {
        this.cameras.main.setBackgroundColor(0x88ccff); // Light blue ice sky/fog

        // Floor and Ceiling
        this.floor = this.add.rectangle(512, 584, 1024, 368, 0xddf4ff).setOrigin(0.5);
        this.ceiling = this.add.rectangle(512, 184, 1024, 368, 0xbbddff).setOrigin(0.5);

        // Perspective Lines (to vanishing point at 512, 384)
        this.lines = this.add.graphics();
        this._drawPerspectiveLines();

        // Environment container (for monsters and chests)
        this.worldGroup = this.add.group();

        // Princess Arms
        this._drawArms();

        // Distance text
        this.distText = this.add.text(20, 20, 'Distance: 0m', {
            fontSize: '24px',
            color: '#004488',
            fontFamily: 'Arial Black'
        });

        // Back to menu button
        const backBtn = this.add.text(1004, 20, 'Menu', {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#004488',
            padding: { x: 10, y: 5 }
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.scene.start('MainMenu'));

        // Reset state
        this.distance = 0;
        this.nextEncounter = 300;
        this.isWalking = true;
    }

    update(time, delta) {
        if (!this.isWalking) return;

        this.distance += delta * 0.1; // Walk speed
        this.distText.setText(`Distance: ${Math.floor(this.distance)}m`);

        this._updatePerspective(time);

        if (this.distance >= this.nextEncounter) {
            this._triggerEncounter();
        }

        // Animate arms
        const swayX = Math.sin(time / 200) * 5;
        const swayY = Math.cos(time / 150) * 8;
        this.wandArm.x = 850 + swayX;
        this.wandArm.y = 650 + swayY;
        this.teddyArm.x = 174 - swayX;
        this.teddyArm.y = 650 + swayY;
    }

    _drawPerspectiveLines() {
        this.lines.clear();
        this.lines.lineStyle(4, 0xffffff, 0.5);

        const vanishingX = 512;
        const vanishingY = 384;

        // Corners
        this.lines.lineBetween(0, 0, vanishingX, vanishingY);
        this.lines.lineBetween(1024, 0, vanishingX, vanishingY);
        this.lines.lineBetween(0, 768, vanishingX, vanishingY);
        this.lines.lineBetween(1024, 768, vanishingX, vanishingY);

        // Grid lines (horizontal)
        const offset = (this.distance % 100) / 100;
        for (let i = 0; i < 10; i++) {
            const z = i - offset;
            if (z <= 0) continue;
            const scale = 1 / z;
            const w = 1024 * scale;
            const h = 768 * scale;
            // We only draw if it's within bounds to avoid huge lines
            if (w < 4000) {
                this.lines.strokeRect(vanishingX - w / 2, vanishingY - h / 2, w, h);
            }
        }
    }

    _updatePerspective(time) {
        this._drawPerspectiveLines();
    }

    _drawArms() {
        // Teddy Bear (Left)
        this.teddyArm = this.add.container(174, 650);
        const teddyG = this.add.graphics();
        teddyG.fillStyle(0x8b4513, 1); // Brown
        teddyG.fillEllipse(0, 0, 120, 160); // Body/Arm
        teddyG.fillCircle(-40, -60, 40); // Head
        teddyG.fillCircle(-70, -90, 20); // Ear
        teddyG.fillCircle(-10, -90, 20); // Ear
        teddyG.fillStyle(0x000000, 1);
        teddyG.fillCircle(-50, -65, 5); // Eye
        teddyG.fillCircle(-30, -65, 5); // Eye
        this.teddyArm.add(teddyG);
        this.teddyArm.setDepth(100);

        // Wand (Right)
        this.wandArm = this.add.container(850, 650);
        const wandG = this.add.graphics();
        // Hand
        wandG.fillStyle(0xffe4b5, 1);
        wandG.fillCircle(0, 0, 40);
        // Wand stick
        wandG.fillStyle(0x4b2e1e, 1);
        wandG.fillRect(-5, -150, 10, 150);
        // Star
        wandG.fillStyle(0xffd700, 1);
        this._drawStar(wandG, 0, -160, 5, 40, 20);
        this.wandArm.add(wandG);
        this.wandArm.setDepth(100);

        // Wand glow
        const glow = this.add.circle(850, 490, 60, 0xffff00, 0.3).setDepth(99);
        this.tweens.add({
            targets: glow,
            alpha: 0.1,
            scale: 1.2,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        this.wandGlow = glow;
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

    _triggerEncounter() {
        this.isWalking = false;
        const type = Math.random() > 0.3 ? 'monster' : 'chest';

        if (type === 'monster') {
            this._spawnMonster();
        } else {
            this._spawnChest();
        }
    }

    _spawnMonster() {
        const monsters = ['Snowman', 'Ice Golem', 'Polar Bear'];
        const name = monsters[Math.floor(Math.random() * monsters.length)];

        const container = this.add.container(512, 384).setScale(0.1);
        const g = this.add.graphics();

        if (name === 'Snowman') {
            g.fillStyle(0xffffff, 1);
            g.fillCircle(0, 40, 60);
            g.fillCircle(0, -40, 40);
            g.fillStyle(0xff6600, 1); // Carrot nose
            g.fillTriangle(0, -40, 0, -30, 30, -35);
        } else if (name === 'Ice Golem') {
            g.fillStyle(0xaaddff, 1);
            g.fillRect(-60, -80, 120, 160);
            g.fillStyle(0x00ffff, 1);
            g.fillRect(-40, -60, 20, 20);
            g.fillRect(20, -60, 20, 20);
        } else { // Polar Bear
            g.fillStyle(0xf0f0f0, 1);
            g.fillEllipse(0, 0, 150, 100);
            g.fillCircle(80, -30, 40); // Head
            g.fillCircle(100, -50, 15); // Ear
        }

        container.add(g);
        const title = this.add.text(0, -120, name, { fontSize: '40px', color: '#004488' }).setOrigin(0.5);
        container.add(title);

        this.tweens.add({
            targets: container,
            scale: 2,
            duration: 1500,
            ease: 'Power2',
            onComplete: () => {
                this.scene.pause();
                this.scene.launch('MathProblemScene', {
                    onSuccess: () => {
                        this.tweens.add({
                            targets: container,
                            alpha: 0,
                            y: 100,
                            scale: 3,
                            duration: 500,
                            onComplete: () => {
                                container.destroy();
                                this._resumeWalking();
                            }
                        });
                    }
                });
            }
        });
    }

    _spawnChest() {
        const container = this.add.container(512, 384).setScale(0.1);
        const g = this.add.graphics();
        g.fillStyle(0x8b4513, 1);
        g.fillRect(-50, -40, 100, 80);
        g.fillStyle(0xffd700, 1);
        g.fillRect(-50, -5, 100, 10); // Gold band
        container.add(g);

        this.tweens.add({
            targets: container,
            scale: 2,
            duration: 1500,
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
        // Add a random star or crystal in the background
        const x = Math.random() * 1024;
        const y = 100 + Math.random() * 200;
        const star = this.add.text(x, y, '✨', { fontSize: '32px' }).setDepth(-1);
        this.decorations.push(star);
    }
}
