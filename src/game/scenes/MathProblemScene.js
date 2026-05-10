import { Scene } from 'phaser';
import { getEquipment } from '../data/LevelData.js';
import { ITEMS } from '../data/ItemData.js';
import { audio } from '../systems/AudioManager.js';
import { t } from '../data/I18n.js';

export class MathProblemScene extends Scene {
    constructor() {
        super('MathProblemScene');
    }

    init(data) {
        this.onSuccess = data.onSuccess;
        this.isChest   = data.isChest   || false;
        this.operation = data.operation ?? 'add';
        const numMax   = data.numMax    ?? 5;

        if (this.operation === 'sub') {
            this.num1   = Math.floor(Math.random() * numMax) + 1;
            this.num2   = Math.floor(Math.random() * this.num1) + 1;
            this.answer = this.num1 - this.num2;
        } else {
            this.num1   = Math.floor(Math.random() * numMax) + 1;
            this.num2   = Math.floor(Math.random() * numMax) + 1;
            this.answer = this.num1 + this.num2;
        }

        this.currentInput = '';
        this._inputLocked = false;
        this.monsterName  = data.monsterName ?? null;

        this.equip = getEquipment();
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.7)
            .setScrollFactor(0);

        this.successParticles = this.add.particles(width/2, height/2, 'particle', {
            speed: { min: 100, max: 400 },
            scale: { start: 0.6, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 1200,
            quantity: 50,
            blendMode: 'ADD',
            emitting: false
        }).setScrollFactor(0);

        const panelW = Math.min(width * 0.85, 600);
        const panelH = Math.min(height * 0.92, 680);
        const px = width / 2;
        const py = height / 2;
        const panelTop = py - panelH / 2;

        if (this.textures.exists('ui_panel')) {
            this.add.nineslice(px, py, 'ui_panel', 0, panelW, panelH, 40, 40, 40, 40)
                .setScrollFactor(0);
        } else {
            const panel = this.add.graphics().setScrollFactor(0);
            panel.fillStyle(0xffffff, 1);
            panel.fillRoundedRect(px - panelW/2, py - panelH/2, panelW, panelH, 30);
            panel.lineStyle(8, 0x00aaff, 1);
            panel.strokeRoundedRect(px - panelW/2, py - panelH/2, panelW, panelH, 30);
        }

        const titleText = this.isChest ? t('magicChest') : t('helpJolyne');
        this.add.text(px, panelTop + 38, titleText, {
            fontSize: '30px',
            fontFamily: 'Arial Black',
            color: '#004488'
        }).setOrigin(0.5, 0).setScrollFactor(0);

        if (this.monsterName) {
            this.add.text(px, panelTop + 78, t('versus', t(this.monsterName)), {
                fontSize: '20px',
                fontFamily: 'Arial Black',
                color: '#cc4400',
                stroke: '#000',
                strokeThickness: 2
            }).setOrigin(0.5, 0).setScrollFactor(0);
        }

        const opSymbol = this.operation === 'sub' ? '−' : '+';
        this.add.text(px, panelTop + 115, `${this.num1} ${opSymbol} ${this.num2} =`, {
            fontSize: '60px',
            fontFamily: 'Arial Black',
            color: '#ff6600',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5, 0).setScrollFactor(0);

        const inputBg = this.add.graphics().setScrollFactor(0);
        inputBg.fillStyle(0x00aaff, 0.1);
        inputBg.fillRoundedRect(px - 80, panelTop + 210, 160, 88, 15);

        this.inputText = this.add.text(px, panelTop + 254, '?', {
            fontSize: '65px',
            fontFamily: 'Arial Black',
            color: '#00aaff'
        }).setOrigin(0.5).setScrollFactor(0);

        const keypadCy = panelTop + 360;
        this._drawKeypad(px, keypadCy, panelW, panelH - 380);
    }

    _drawKeypad(cx, cy, panelWidth, availableHeight) {
        const gap = Math.floor(Math.min(panelWidth * 0.18, availableHeight / 2.22));
        const keyR = Math.floor(gap * 0.42);
        const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '⌫'];

        keys.forEach((key, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const x = cx - (gap * 1.5) + (col * gap);
            const y = cy + (row * gap * 0.9);

            const isBack = key === '⌫';
            this._createKey(x, y, key, isBack ? 0xaa0000 : 0x00aaff, isBack, keyR);
        });
    }

    _createKey(x, y, label, color, isBack, size) {
        size = size ?? Math.min(this.cameras.main.width * 0.12, 45);

        let bg;
        if (this.textures.exists('ui_button')) {
            bg = this.add.image(x, y, isBack ? 'ui_button_red' : 'ui_button')
                .setDisplaySize(size * 2, size * 2).setScrollFactor(0);
        } else {
            bg = this.add.circle(x, y, size, color, 1).setScrollFactor(0);
        }
        bg.setInteractive({ useHandCursor: true });

        const txt = this.add.text(x, y, label, {
            fontSize: '32px',
            fontFamily: 'Arial Black',
            color: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0);

        bg.on('pointerover', () => bg.setScale(1.1));
        bg.on('pointerout', () => bg.setScale(1));
        bg.on('pointerup', () => {
            if (isBack) {
                this.currentInput = this.currentInput.slice(0, -1);
                this.inputText.setText(this.currentInput || '?');
            } else {
                this._handleInput(label);
            }
        });
    }

    _handleInput(val) {
        if (this._inputLocked || this.currentInput.length >= 2) return;

        this.currentInput += val;
        this.inputText.setText(this.currentInput);
        audio.playLetterTap();

        if (parseInt(this.currentInput) === this.answer) {
            this._showSuccess();
        } else if (this.currentInput.length >= this.answer.toString().length) {
            this._inputLocked = true;
            const { width, height } = this.cameras.main;
            const msg = this.add.text(width / 2, height / 2 - 60, t('tryAgainMath'), {
                fontSize: '40px',
                fontFamily: 'Arial Black',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 6,
            }).setOrigin(0.5).setDepth(100).setScrollFactor(0);
            this.time.delayedCall(900, () => {
                msg.destroy();
                this.currentInput = '';
                this.inputText.setText('?');
                this._inputLocked = false;
            });
        }
    }

    _showSuccess() {
        this.successParticles.explode(60);

        const bravo = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, t('superText'), {
            fontSize: '80px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 12
        }).setOrigin(0.5).setScale(0).setDepth(1000).setScrollFactor(0);

        this.tweens.add({
            targets: bravo,
            scale: 1,
            rotation: 0.1,
            duration: 600,
            ease: 'Back.Out',
            onComplete: () => {
                this.time.delayedCall(1200, () => {
                    this.onSuccess();
                    this.scene.resume('MathDungeon');
                    this.scene.stop();
                });
            }
        });
    }

}
