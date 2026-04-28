import { Scene } from 'phaser';
import { audio } from '../systems/AudioManager.js';

export class VictoryScene extends Scene {
    constructor() {
        super('VictoryScene');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x2a0055);
        audio.playVictory();

        this._drawStarRain();
        this._drawJolyne(512, 370);
        this._drawText();
        this._drawReplayButton();
    }

    _drawStarRain() {
        // Spawn sparkles over time
        for (let i = 0; i < 20; i++) {
            this.time.delayedCall(i * 120, () => {
                const x = 60 + Math.random() * 904;
                const star = this.add.text(x, -30, ['⭐', '✨', '🌟'][Math.floor(Math.random() * 3)], {
                    fontSize: (24 + Math.random() * 24) + 'px',
                }).setAlpha(0.9);

                this.tweens.add({
                    targets: star,
                    y: 830,
                    duration: 2500 + Math.random() * 2000,
                    ease: 'Linear',
                    onComplete: () => star.destroy(),
                });
            });
        }
    }

    _drawJolyne(cx, cy) {
        const gfx = this.add.graphics();
        const s = 2.2; // scale up from PlayerController sprite

        // Pink dress
        gfx.fillStyle(0xff80b4, 1);
        gfx.fillEllipse(cx, cy + 10 * s, 46 * s, 34 * s);
        // Head
        gfx.fillStyle(0xffe4b5, 1);
        gfx.fillCircle(cx, cy - 16 * s, 15 * s);
        // Crown
        gfx.fillStyle(0xffd700, 1);
        gfx.fillRect(cx - 13 * s, cy - 35 * s, 26 * s, 7 * s);
        gfx.beginPath();
        gfx.moveTo(cx - 11 * s, cy - 35 * s);
        gfx.lineTo(cx - 14 * s, cy - 47 * s);
        gfx.lineTo(cx - 5 * s,  cy - 35 * s);
        gfx.closePath(); gfx.fillPath();

        gfx.beginPath();
        gfx.moveTo(cx - 3 * s, cy - 35 * s);
        gfx.lineTo(cx,          cy - 50 * s);
        gfx.lineTo(cx + 3 * s,  cy - 35 * s);
        gfx.closePath(); gfx.fillPath();

        gfx.beginPath();
        gfx.moveTo(cx + 11 * s, cy - 35 * s);
        gfx.lineTo(cx + 14 * s, cy - 47 * s);
        gfx.lineTo(cx + 5 * s,  cy - 35 * s);
        gfx.closePath(); gfx.fillPath();

        // Crown jewel
        gfx.fillStyle(0xff4466, 1);
        gfx.fillCircle(cx, cy - 31 * s, 3 * s);
        // Eyes
        gfx.fillStyle(0x553311, 1);
        gfx.fillCircle(cx - 5 * s, cy - 18 * s, 3 * s);
        gfx.fillCircle(cx + 5 * s, cy - 18 * s, 3 * s);
        // Smile
        gfx.lineStyle(2.5 * s, 0x553311, 1);
        gfx.beginPath();
        gfx.arc(cx, cy - 14 * s, 5 * s, 0.15, Math.PI - 0.15, false);
        gfx.strokePath();

        // Bounce animation
        this.tweens.add({
            targets: gfx,
            y: gfx.y - 12,
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.InOut',
        });
    }

    _drawText() {
        // Main title (starts hidden, bounces in)
        const title = this.add.text(512, 130, '🎉 FÉLICITATIONS ! 🎉', {
            fontSize: '48px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 6,
        }).setOrigin(0.5).setScale(0);

        this.tweens.add({ targets: title, scaleX: 1, scaleY: 1, duration: 600, ease: 'Back.Out', delay: 300 });

        const sub = this.add.text(512, 208, 'Jolyne a ouvert toutes les portes du château !', {
            fontSize: '26px',
            color: '#ffddff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({ targets: sub, alpha: 1, duration: 500, delay: 900 });

        const stars = this.add.text(512, 636, '★ ★ ★ ★ ★', {
            fontSize: '52px',
            color: '#ffd700',
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({ targets: stars, alpha: 1, duration: 500, delay: 1200 });
    }

    _drawReplayButton() {
        const btn = this.add.rectangle(512, 692, 260, 60, 0x006600, 1)
            .setInteractive()
            .setAlpha(0)
            .on('pointerover', () => btn.setFillStyle(0x009900, 1))
            .on('pointerout',  () => btn.setFillStyle(0x006600, 1))
            .on('pointerup',   () => this.scene.start('MainMenu'));

        const btnTxt = this.add.text(512, 692, '▶  Rejouer !', {
            fontSize: '30px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#003300',
            strokeThickness: 4,
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({ targets: [btn, btnTxt], alpha: 1, duration: 400, delay: 1500 });

        // Pulse
        this.time.delayedCall(1900, () => {
            this.tweens.add({
                targets: btn,
                scaleX: 1.06, scaleY: 1.06,
                duration: 700,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.InOut',
            });
        });
    }
}
