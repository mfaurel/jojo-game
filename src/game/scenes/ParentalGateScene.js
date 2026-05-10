import { Scene } from 'phaser';

export class ParentalGateScene extends Scene {
    constructor() {
        super('ParentalGateScene');
    }

    init(data) {
        this.onSuccess = data.onSuccess;
        const a = Math.floor(Math.random() * 9) + 1;
        const b = Math.floor(Math.random() * 9) + 1;
        this._correct = a + b;
        this._question = `${a} + ${b} = ?`;

        // Build distractors: correct + 3 wrong
        const wrongs = new Set();
        while (wrongs.size < 3) {
            const w = this._correct + Math.floor(Math.random() * 7) - 3;
            if (w !== this._correct && w > 0) wrongs.add(w);
        }
        this._choices = [...wrongs, this._correct].sort(() => Math.random() - 0.5);
    }

    create() {
        const { width, height } = this.cameras.main;
        const cx = width / 2;
        const cy = height / 2;

        this.add.rectangle(cx, cy, width, height, 0x000000, 0.8).setDepth(0);

        const panelW = 420;
        const panelH = 300;
        const g = this.add.graphics().setDepth(1);
        g.fillStyle(0x1a0a2e, 1);
        g.fillRoundedRect(cx - panelW / 2, cy - panelH / 2, panelW, panelH, 18);
        g.lineStyle(3, 0xffd700, 1);
        g.strokeRoundedRect(cx - panelW / 2, cy - panelH / 2, panelW, panelH, 18);

        this.add.text(cx, cy - 90, this._question, {
            fontSize: '52px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 6,
        }).setOrigin(0.5).setDepth(2);

        const btnW = 90;
        const btnH = 60;
        const gap  = 16;
        const totalW = this._choices.length * btnW + (this._choices.length - 1) * gap;
        const startX = cx - totalW / 2 + btnW / 2;

        this._choices.forEach((val, i) => {
            const bx = startX + i * (btnW + gap);
            const by = cy + 40;

            const bg = this.add.rectangle(bx, by, btnW, btnH, 0x2a2a88, 1)
                .setStrokeStyle(2, 0x8888ff)
                .setDepth(2)
                .setInteractive({ useHandCursor: true });

            const txt = this.add.text(bx, by, String(val), {
                fontSize: '32px',
                fontFamily: 'Arial Black',
                color: '#ffffff',
            }).setOrigin(0.5).setDepth(3);

            bg.on('pointerover', () => bg.setFillStyle(0x4444bb));
            bg.on('pointerout',  () => bg.setFillStyle(0x2a2a88));
            bg.on('pointerup',   () => this._handleAnswer(val, bg, txt));
        });
    }

    _handleAnswer(val, bg, txt) {
        if (val === this._correct) {
            bg.setFillStyle(0x228822);
            this.time.delayedCall(300, () => {
                this.scene.stop('ParentalGateScene');
                if (this.onSuccess) this.onSuccess();
            });
        } else {
            // Shake animation on wrong
            this.tweens.add({
                targets: [bg, txt],
                x: bg.x + 8,
                duration: 40,
                yoyo: true,
                repeat: 4,
                ease: 'Sine.InOut',
            });
            bg.setFillStyle(0x882222);
            this.time.delayedCall(300, () => bg.setFillStyle(0x2a2a88));
        }
    }
}
