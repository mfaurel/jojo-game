import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x1a1a5e);

        // Night sky stars
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 500;
            const r = 1 + Math.random() * 2;
            const star = this.add.circle(x, y, r, 0xffffff, 0.6 + Math.random() * 0.4);
            // Gentle twinkle
            this.tweens.add({
                targets: star,
                alpha: 0.1 + Math.random() * 0.3,
                duration: 1000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 1500,
            });
        }

        // Castle silhouette
        this._drawCastle();

        // Title
        this.add.text(512, 100, '🏰 Le Château de Jolyne', {
            fontSize: '44px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#2a0055',
            strokeThickness: 6,
        }).setOrigin(0.5);

        this.add.text(512, 165, 'Apprends à épeler en français !', {
            fontSize: '24px',
            color: '#ddaaff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5);

        // Play button
        const btn = this.add.rectangle(512, 570, 280, 70, 0x006600, 1)
            .setInteractive()
            .on('pointerover', () => btn.setFillStyle(0x009900, 1))
            .on('pointerout',  () => btn.setFillStyle(0x006600, 1))
            .on('pointerup',   () => {
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('CastleScene');
                });
            });

        const btnTxt = this.add.text(512, 570, '▶  JOUER', {
            fontSize: '38px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#003300',
            strokeThickness: 5,
        }).setOrigin(0.5);

        // Pulse button
        this.tweens.add({
            targets: [btn, btnTxt],
            scaleX: 1.06, scaleY: 1.06,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.InOut',
        });

        // Mini Jolyne below title
        this._drawJolyne(512, 450);
    }

    _drawCastle() {
        const g = this.add.graphics();

        // Ground
        g.fillStyle(0x2a1a6a, 1);
        g.fillRect(0, 640, 1024, 128);

        // Main castle body
        g.fillStyle(0x3a2a7a, 1);
        g.fillRect(312, 460, 400, 180);

        // Tower left
        g.fillRect(250, 400, 100, 240);
        // Tower right
        g.fillRect(674, 400, 100, 240);

        // Battlements on main body
        g.fillStyle(0x3a2a7a, 1);
        for (let i = 0; i < 7; i++) {
            g.fillRect(312 + i * 58, 440, 30, 22);
        }

        // Battlements on towers
        for (let i = 0; i < 3; i++) {
            g.fillRect(250 + i * 35, 378, 22, 24);
            g.fillRect(674 + i * 35, 378, 22, 24);
        }

        // Gate arch
        g.fillStyle(0x111122, 1);
        g.fillRect(448, 536, 128, 104);
        g.fillCircle(512, 536, 64);

        // Tower windows
        g.fillStyle(0x8899ff, 0.5);
        g.fillRect(280, 430, 30, 40);
        g.fillCircle(295, 430, 15);
        g.fillRect(704, 430, 30, 40);
        g.fillCircle(719, 430, 15);

        // Flag left
        g.fillStyle(0xff4466, 1);
        g.fillTriangle(250, 370, 250, 340, 278, 355);
        g.fillStyle(0xffffff, 1);
        g.fillRect(248, 330, 4, 45);

        // Flag right
        g.fillStyle(0xff4466, 1);
        g.fillTriangle(774, 370, 774, 340, 746, 355);
        g.fillStyle(0xffffff, 1);
        g.fillRect(772, 330, 4, 45);
    }

    _drawJolyne(cx, cy) {
        const g = this.add.graphics();
        const s = 1.5;

        g.fillStyle(0xff80b4, 1);
        g.fillEllipse(cx, cy + 10 * s, 46 * s, 34 * s);
        g.fillStyle(0xffe4b5, 1);
        g.fillCircle(cx, cy - 16 * s, 15 * s);
        g.fillStyle(0xffd700, 1);
        g.fillRect(cx - 13 * s, cy - 35 * s, 26 * s, 7 * s);

        g.beginPath();
        g.moveTo(cx - 11 * s, cy - 35 * s);
        g.lineTo(cx - 14 * s, cy - 47 * s);
        g.lineTo(cx - 5 * s,  cy - 35 * s);
        g.closePath(); g.fillPath();

        g.beginPath();
        g.moveTo(cx - 3 * s, cy - 35 * s);
        g.lineTo(cx,          cy - 50 * s);
        g.lineTo(cx + 3 * s,  cy - 35 * s);
        g.closePath(); g.fillPath();

        g.beginPath();
        g.moveTo(cx + 11 * s, cy - 35 * s);
        g.lineTo(cx + 14 * s, cy - 47 * s);
        g.lineTo(cx + 5 * s,  cy - 35 * s);
        g.closePath(); g.fillPath();

        g.fillStyle(0xff4466, 1);
        g.fillCircle(cx, cy - 31 * s, 3 * s);

        g.fillStyle(0x553311, 1);
        g.fillCircle(cx - 5 * s, cy - 18 * s, 3 * s);
        g.fillCircle(cx + 5 * s, cy - 18 * s, 3 * s);

        g.lineStyle(2.5 * s, 0x553311, 1);
        g.beginPath();
        g.arc(cx, cy - 14 * s, 5 * s, 0.15, Math.PI - 0.15, false);
        g.strokePath();

        // Wave animation
        this.tweens.add({
            targets: g,
            angle: { from: -5, to: 5 },
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.InOut',
        });
    }
}
