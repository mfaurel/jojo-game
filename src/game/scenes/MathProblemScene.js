import { Scene } from 'phaser';

export class MathProblemScene extends Scene {
    constructor() {
        super('MathProblemScene');
    }

    init(data) {
        this.onSuccess = data.onSuccess;
        this.isChest = data.isChest || false;
        
        // Generate simple problem: a + b
        // For a 4-year-old: sums up to 10
        this.num1 = Math.floor(Math.random() * 5) + 1; // 1-5
        this.num2 = Math.floor(Math.random() * 5) + 1; // 1-5
        this.answer = this.num1 + this.num2;
        this.currentInput = '';
    }

    create() {
        // Semi-transparent overlay
        this.add.rectangle(512, 384, 1024, 768, 0x000000, 0.7);

        // Panel
        const panel = this.add.graphics();
        panel.fillStyle(0xffffff, 1);
        panel.fillRoundedRect(212, 100, 600, 568, 30);
        panel.lineStyle(6, 0x00aaff, 1);
        panel.strokeRoundedRect(212, 100, 600, 568, 30);

        // Title
        const titleText = this.isChest ? 'Ouvre le coffre ! 🎁' : 'Aide Jolyne ! ✨';
        this.add.text(512, 160, titleText, {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            color: '#004488'
        }).setOrigin(0.5);

        // Equation
        this.add.text(512, 280, `${this.num1} + ${this.num2} = ?`, {
            fontSize: '80px',
            fontFamily: 'Arial Black',
            color: '#ff6600',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Input Display
        this.inputText = this.add.text(512, 380, '_', {
            fontSize: '90px',
            fontFamily: 'Arial Black',
            color: '#00aaff'
        }).setOrigin(0.5);

        // Keypad
        this._drawKeypad();
    }

    _drawKeypad() {
        const startX = 312;
        const startY = 480;
        const gap = 80;

        for (let i = 0; i <= 9; i++) {
            const row = Math.floor(i / 5);
            const col = i % 5;
            const x = startX + col * (gap + 20);
            const y = startY + row * (gap + 10);

            this._createKey(x, y, i.toString());
        }

        // Backspace
        this._createKey(startX + 5 * (gap + 20), startY, '⌫', 0xaa0000, () => {
            this.currentInput = '';
            this.inputText.setText('_');
        });
    }

    _createKey(x, y, label, color = 0x00aaff, customCallback = null) {
        const bg = this.add.circle(x, y, 40, color, 1)
            .setInteractive({ useHandCursor: true });
        
        const txt = this.add.text(x, y, label, {
            fontSize: '40px',
            fontFamily: 'Arial Black',
            color: '#ffffff'
        }).setOrigin(0.5);

        bg.on('pointerover', () => bg.setScale(1.1));
        bg.on('pointerout', () => bg.setScale(1));
        bg.on('pointerup', () => {
            if (customCallback) {
                customCallback();
            } else {
                this._handleInput(label);
            }
        });
    }

    _handleInput(val) {
        this.currentInput += val;
        // Limit to 2 digits
        if (this.currentInput.length > 2) {
            this.currentInput = val;
        }
        
        this.inputText.setText(this.currentInput);

        if (parseInt(this.currentInput) === this.answer) {
            this._showSuccess();
        } else if (this.currentInput.length >= this.answer.toString().length) {
            // Wrong answer if same number of digits
            this.time.delayedCall(500, () => {
                this.currentInput = '';
                this.inputText.setText('_');
                this.cameras.main.shake(200, 0.01);
            });
        }
    }

    _showSuccess() {
        const bravo = this.add.text(512, 380, 'BRAVO !', {
            fontSize: '120px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 10
        }).setOrigin(0.5).setScale(0);

        this.tweens.add({
            targets: bravo,
            scale: 1,
            duration: 500,
            ease: 'Back.Out',
            onComplete: () => {
                this.time.delayedCall(1000, () => {
                    this.onSuccess();
                    this.scene.stop();
                    this.scene.resume('MathDungeon');
                });
            }
        });
    }
}
