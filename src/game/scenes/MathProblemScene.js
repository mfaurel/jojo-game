import { Scene } from 'phaser';

export class MathProblemScene extends Scene {
    constructor() {
        super('MathProblemScene');
    }

    init(data) {
        this.onSuccess = data.onSuccess;
        this.isChest = data.isChest || false;
        const numMax = data.numMax ?? 5;

        this.num1 = Math.floor(Math.random() * numMax) + 1;
        this.num2 = Math.floor(Math.random() * numMax) + 1;
        this.answer = this.num1 + this.num2;
        this.currentInput = '';
    }

    create() {
        const { width, height } = this.cameras.main;

        // Semi-transparent animated background
        this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.7);
        
        // Success Particles for later
        this.successParticles = this.add.particles(width/2, height/2, 'particle', {
            speed: { min: 100, max: 400 },
            scale: { start: 0.6, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 1200,
            quantity: 50,
            blendMode: 'ADD',
            emitting: false
        });

        // Main Panel
        const panelWidth = Math.min(width * 0.85, 600);
        const panelHeight = Math.min(height * 0.85, 650);
        const panelX = width / 2;
        const panelY = height / 2;

        if (this.textures.exists('ui_panel')) {
            this.add.nineslice(panelX, panelY, 'ui_panel', 0, panelWidth, panelHeight, 40, 40, 40, 40);
        } else {
            const panel = this.add.graphics();
            panel.fillStyle(0xffffff, 1);
            panel.fillRoundedRect(panelX - panelWidth/2, panelY - panelHeight/2, panelWidth, panelHeight, 30);
            panel.lineStyle(8, 0x00aaff, 1);
            panel.strokeRoundedRect(panelX - panelWidth/2, panelY - panelHeight/2, panelWidth, panelHeight, 30);
        }

        // Header
        const titleText = this.isChest ? 'Coffre Magique ! 🎁' : 'Aide Jolyne ! ✨';
        this.add.text(panelX, panelY - panelHeight * 0.4, titleText, {
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontFamily: 'Arial Black',
            color: '#004488'
        }).setOrigin(0.5);

        // Equation Display
        this.add.text(panelX, panelY - panelHeight * 0.2, `${this.num1} + ${this.num2} =`, {
            fontSize: 'clamp(40px, 10vw, 80px)',
            fontFamily: 'Arial Black',
            color: '#ff6600',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Input Box
        const inputBg = this.add.graphics();
        inputBg.fillStyle(0x00aaff, 0.1);
        inputBg.fillRoundedRect(panelX - 60, panelY - 50, 120, 100, 15);
        
        this.inputText = this.add.text(panelX, panelY, '?', {
            fontSize: 'clamp(60px, 12vw, 90px)',
            fontFamily: 'Arial Black',
            color: '#00aaff'
        }).setOrigin(0.5);

        // Responsive Keypad
        this._drawKeypad(panelX, panelY + panelHeight * 0.25, panelWidth);
    }

    _drawKeypad(cx, cy, panelWidth) {
        const gap = panelWidth * 0.18;
        const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '⌫'];
        
        keys.forEach((key, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const x = cx - (gap * 1.5) + (col * gap);
            const y = cy + (row * gap * 0.9);

            const isBack = key === '⌫';
            this._createKey(x, y, key, isBack ? 0xaa0000 : 0x00aaff, isBack);
        });
    }

    _createKey(x, y, label, color, isBack) {
        const size = Math.min(this.cameras.main.width * 0.12, 45);
        
        let bg;
        if (this.textures.exists('ui_button')) {
            bg = this.add.image(x, y, isBack ? 'ui_button_red' : 'ui_button').setDisplaySize(size * 2, size * 2);
        } else {
            bg = this.add.circle(x, y, size, color, 1);
        }
        bg.setInteractive({ useHandCursor: true });
        
        const txt = this.add.text(x, y, label, {
            fontSize: 'clamp(24px, 5vw, 40px)',
            fontFamily: 'Arial Black',
            color: '#ffffff'
        }).setOrigin(0.5);

        bg.on('pointerover', () => bg.setScale(1.1));
        bg.on('pointerout', () => bg.setScale(1));
        bg.on('pointerup', () => {
            if (isBack) {
                this.currentInput = '';
                this.inputText.setText('?');
            } else {
                this._handleInput(label);
            }
        });
    }

    _handleInput(val) {
        if (this.currentInput.length >= 2) return;
        
        this.currentInput += val;
        this.inputText.setText(this.currentInput);

        if (parseInt(this.currentInput) === this.answer) {
            this._showSuccess();
        } else if (this.currentInput.length >= this.answer.toString().length) {
            this.time.delayedCall(400, () => {
                this.currentInput = '';
                this.inputText.setText('?');
                this.cameras.main.shake(150, 0.005);
            });
        }
    }

    _showSuccess() {
        this.successParticles.explode(60);
        
        const bravo = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'SUPER ! 🌟', {
            fontSize: 'clamp(60px, 15vw, 120px)',
            fontFamily: 'Arial Black',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 12
        }).setOrigin(0.5).setScale(0).setDepth(1000);

        this.tweens.add({
            targets: bravo,
            scale: 1,
            rotation: 0.1,
            duration: 600,
            ease: 'Back.Out',
            onComplete: () => {
                this.time.delayedCall(1200, () => {
                    this.onSuccess();
                    this.scene.stop();
                    this.scene.resume('MathDungeon');
                });
            }
        });
    }
}
