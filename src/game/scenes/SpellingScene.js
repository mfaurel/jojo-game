import { Scene } from 'phaser';
import { WORDS } from '../data/WordData.js';
import { audio } from '../systems/AudioManager.js';

export class SpellingScene extends Scene {
    constructor() {
        super('SpellingScene');
    }

    init(data) {
        this.wordKey   = data.wordKey;
        this.onSuccess = data.onSuccess;
        this.wordDef   = WORDS[this.wordKey];
        this.answer    = this.wordDef.answer;
        this.attempt   = [];
        this.tiles     = [];
        this.slotTexts = [];
        this.slots     = [];
        this._locked   = false; // prevent input during success/retry animation
    }

    create() {
        this._drawOverlay();
        this._drawPanel();
        this._drawTitle();
        this._drawPicture();
        this._drawSlots();
        this._drawLetterPool();
        this._drawInstructions();
        this._drawCloseButton();
    }

    _drawOverlay() {
        this.add.rectangle(512, 384, 1024, 768, 0x000000, 0.6);
    }

    _drawPanel() {
        if (this.textures.exists('ui_panel')) {
            this.add.nineslice(512, 384, 'ui_panel', 0, 864, 648, 40, 40, 40, 40);
        } else {
            const panel = this.add.graphics();
            panel.fillStyle(0x3a0060, 0.97);
            panel.fillRoundedRect(80, 60, 864, 648, 28);
            panel.lineStyle(4, 0xffd700, 1);
            panel.strokeRoundedRect(80, 60, 864, 648, 28);
        }
    }

    _drawTitle() {
        this.add.text(512, 115, 'Épelle le mot !', {
            fontSize: '38px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#004488',
        }).setOrigin(0.5);
    }

    _drawPicture() {
        // White picture panel
        if (this.textures.exists('ui_panel')) {
            this.add.nineslice(240, 280, 'ui_panel', 0, 260, 260, 40, 40, 40, 40).setTint(0xffffff);
        } else {
            const bg = this.add.graphics();
            bg.fillStyle(0xffffff, 1);
            bg.fillRoundedRect(110, 150, 260, 260, 18);
            bg.lineStyle(3, 0xffd700, 1);
            bg.strokeRoundedRect(110, 150, 260, 260, 18);
        }

        // Draw the word's picture
        const picGfx = this.add.graphics();
        this.wordDef.drawPicture(picGfx, 240, 280, 88);
    }

    _drawSlots() {
        const wordLen   = this.answer.length;
        const slotW     = 82;
        const slotH     = 82;
        const gap       = 14;
        const totalW    = wordLen * slotW + (wordLen - 1) * gap;
        const startX    = 430 + (494 - totalW) / 2 + slotW/2;  // center of first slot
        const startY    = 220 + slotH/2;

        for (let i = 0; i < wordLen; i++) {
            const sx = startX + i * (slotW + gap);

            let slotVisual;
            if (this.textures.exists('ui_slot')) {
                slotVisual = this.add.image(sx, startY, 'ui_slot').setDisplaySize(slotW, slotH);
            } else {
                const slotGfx = this.add.graphics();
                slotGfx.fillStyle(0xfff8e7, 1);
                slotGfx.fillRoundedRect(sx - slotW/2, startY - slotH/2, slotW, slotH, 12);
                slotGfx.lineStyle(3, 0xffd700, 1);
                slotGfx.strokeRoundedRect(sx - slotW/2, startY - slotH/2, slotW, slotH, 12);
                slotVisual = slotGfx;
            }

            const txt = this.add.text(sx, startY, '', {
                fontSize: '46px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#3a0060',
            }).setOrigin(0.5);

            this.slots.push({ visual: slotVisual, x: sx, y: startY, w: slotW, h: slotH });
            this.slotTexts.push(txt);
        }

        // Backspace button
        const bsx = startX + totalW/2 + 60;
        const bsy = startY;
        
        let backBtn;
        if (this.textures.exists('ui_button_red')) {
            backBtn = this.add.image(bsx, bsy, 'ui_button_red').setDisplaySize(60, 60);
        } else {
            backBtn = this.add.rectangle(bsx, bsy, 60, 50, 0x882200, 1);
        }
        
        backBtn.setInteractive()
            .on('pointerup', () => this._backspace())
            .on('pointerover', () => backBtn.setScale(1.1))
            .on('pointerout',  () => backBtn.setScale(1));

        this.add.text(bsx, bsy, '⌫', {
            fontSize: '26px', color: '#ffffff',
        }).setOrigin(0.5);
    }

    _drawLetterPool() {
        const pool  = [...this.wordDef.letters].sort(() => Math.random() - 0.5);
        const tileW = 96;
        const tileH = 96;
        const gap   = 16;
        const totalW = pool.length * tileW + (pool.length - 1) * gap;
        const startX = 512 - totalW / 2 + tileW / 2;
        const startY = 500 + tileH / 2;

        pool.forEach((letter, i) => {
            const cx = startX + i * (tileW + gap);
            const cy = startY;

            let bg;
            const baseScale = tileW / 128; // ui_tile.svg is 128x128
            
            if (this.textures.exists('ui_tile')) {
                bg = this.add.image(cx, cy, 'ui_tile').setScale(baseScale);
            } else {
                bg = this.add.rectangle(cx, cy, tileW, tileH, 0xee7700, 1);
            }
            bg.setInteractive().setDepth(3);

            const txt = this.add.text(cx, cy, letter, {
                fontSize: '52px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#ffffff',
                stroke: '#994400',
                strokeThickness: 4,
            }).setOrigin(0.5).setDepth(4);

            bg.on('pointerover', () => { if (!tile.used) bg.setScale(baseScale * 1.1); });
            bg.on('pointerout',  () => { if (!tile.used) bg.setScale(baseScale); });
            bg.on('pointerdown', () => { if (!tile.used) bg.setScale(baseScale * 0.9); });
            bg.on('pointerup',   () => {
                bg.setScale(baseScale);
                if (!tile.used) this._selectLetter(tile);
            });

            const tile = { bg, txt, letter, used: false, baseScale };
            this.tiles.push(tile);
        });
    }

    _drawInstructions() {
        this.add.text(512, 462, 'Clique sur les lettres dans l\'ordre', {
            fontSize: '20px',
            color: '#004488',
            fontFamily: 'Arial Black, Arial, sans-serif'
        }).setOrigin(0.5);
    }

    _drawCloseButton() {
        let btn;
        if (this.textures.exists('ui_button_red')) {
            btn = this.add.image(910, 88, 'ui_button_red').setDisplaySize(44, 44);
        } else {
            btn = this.add.rectangle(910, 88, 44, 44, 0x880000, 1);
        }
        
        btn.setInteractive()
            .on('pointerup', () => this._close())
            .on('pointerover', () => btn.setScale(1.1))
            .on('pointerout',  () => btn.setScale(1));

        this.add.text(910, 88, '✕', { fontSize: '22px', color: '#fff' }).setOrigin(0.5);
    }

    _selectLetter(tile) {
        if (this._locked) return;
        if (tile.used) return;
        if (this.attempt.length >= this.answer.length) return;

        tile.used = true;
        tile.bg.setAlpha(0.35);
        tile.txt.setAlpha(0.35);

        this.attempt.push(tile);
        const idx = this.attempt.length - 1;
        this.slotTexts[idx].setText(tile.letter);

        audio.playLetterTap();

        // Flash slot
        const visual = this.slots[idx].visual;
        if (visual.setTint) {
            visual.setTint(0xffee88);
            this.time.delayedCall(200, () => visual.clearTint());
        } else {
            // Fallback for Graphics
            visual.clear();
            visual.fillStyle(0xffee88, 1);
            visual.fillRoundedRect(
                this.slots[idx].x - this.slots[idx].w/2, this.slots[idx].y - this.slots[idx].h/2,
                this.slots[idx].w, this.slots[idx].h, 12
            );
            this.time.delayedCall(200, () => {
                visual.clear();
                visual.fillStyle(0xfff8e7, 1);
                visual.fillRoundedRect(
                    this.slots[idx].x - this.slots[idx].w/2, this.slots[idx].y - this.slots[idx].h/2,
                    this.slots[idx].w, this.slots[idx].h, 12
                );
                visual.lineStyle(3, 0xffd700, 1);
                visual.strokeRoundedRect(
                    this.slots[idx].x - this.slots[idx].w/2, this.slots[idx].y - this.slots[idx].h/2,
                    this.slots[idx].w, this.slots[idx].h, 12
                );
            });
        }

        if (this.attempt.length === this.answer.length) {
            this.time.delayedCall(220, () => this._checkAnswer());
        }
    }

    _backspace() {
        if (this._locked) return;
        if (this.attempt.length === 0) return;
        const tile = this.attempt.pop();
        tile.used = false;
        tile.bg.setAlpha(1);
        tile.bg.setScale(tile.baseScale || 1);
        tile.txt.setAlpha(1);
        this.slotTexts[this.attempt.length].setText('');
        audio.playBackspace();
    }

    _checkAnswer() {
        this._locked = true;
        const typed = this.attempt.map(t => t.letter).join('');
        if (typed === this.answer) {
            this._showSuccess();
        } else {
            this._showRetry();
        }
    }

    _showSuccess() {
        // Green flash
        const flash = this.add.rectangle(512, 384, 1024, 768, 0x00cc44, 0.65).setDepth(20);
        this.tweens.add({ targets: flash, alpha: 0, duration: 500, delay: 200 });

        // BRAVO text
        const bravo = this.add.text(512, 320, 'BRAVO ! 🌟', {
            fontSize: '80px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 8,
        }).setOrigin(0.5).setScale(0).setDepth(21);

        this.tweens.add({ targets: bravo, scaleX: 1, scaleY: 1, duration: 400, ease: 'Back.Out' });

        // Stars shower
        for (let i = 0; i < 8; i++) {
            const star = this.add.text(
                100 + Math.random() * 824, 150 + Math.random() * 400,
                '⭐', { fontSize: '36px' }
            ).setAlpha(0).setDepth(22);
            this.tweens.add({
                targets: star, alpha: 1, y: star.y + 40,
                duration: 400, delay: i * 80, yoyo: true, repeat: 1,
            });
        }

        this.time.delayedCall(1600, () => {
            this.onSuccess();
            this._close();
        });
    }

    _showRetry() {
        audio.playWrong();

        // Shake all slots
        this.slots.forEach(slot => {
            this.tweens.add({
                targets: slot.visual,
                x: slot.visual.x + 10,
                duration: 50,
                yoyo: true,
                repeat: 3,
                ease: 'Sine.InOut',
            });
        });

        const msg = this.add.text(512, 420, 'Essaie encore ! 💛', {
            fontSize: '30px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5).setDepth(10);

        this.time.delayedCall(1000, () => {
            msg.destroy();
            this._resetAttempt();
            this._locked = false;
        });
    }

    _resetAttempt() {
        this.attempt.forEach(tile => {
            tile.used = false;
            tile.bg.setAlpha(1);
            tile.bg.setScale(tile.baseScale || 1);
            tile.txt.setAlpha(1);
        });
        this.attempt = [];
        this.slotTexts.forEach(t => t.setText(''));
    }

    _close() {
        this.scene.stop('SpellingScene');
        this.scene.resume('CastleScene');
    }
}
