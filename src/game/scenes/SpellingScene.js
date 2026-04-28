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
        const panel = this.add.graphics();
        panel.fillStyle(0x3a0060, 0.97);
        panel.fillRoundedRect(80, 60, 864, 648, 28);
        panel.lineStyle(4, 0xffd700, 1);
        panel.strokeRoundedRect(80, 60, 864, 648, 28);
    }

    _drawTitle() {
        this.add.text(512, 100, 'Épelle le mot !', {
            fontSize: '38px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 5,
        }).setOrigin(0.5);
    }

    _drawPicture() {
        // White picture panel
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1);
        bg.fillRoundedRect(110, 150, 260, 260, 18);
        bg.lineStyle(3, 0xffd700, 1);
        bg.strokeRoundedRect(110, 150, 260, 260, 18);

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
        const startX    = 430 + (494 - totalW) / 2;  // right panel half
        const startY    = 220;

        for (let i = 0; i < wordLen; i++) {
            const sx = startX + i * (slotW + gap);

            const slotGfx = this.add.graphics();
            slotGfx.fillStyle(0xfff8e7, 1);
            slotGfx.fillRoundedRect(sx, startY, slotW, slotH, 12);
            slotGfx.lineStyle(3, 0xffd700, 1);
            slotGfx.strokeRoundedRect(sx, startY, slotW, slotH, 12);

            const txt = this.add.text(sx + slotW / 2, startY + slotH / 2, '', {
                fontSize: '46px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#3a0060',
            }).setOrigin(0.5);

            this.slots.push({ gfx: slotGfx, x: sx, y: startY, w: slotW, h: slotH });
            this.slotTexts.push(txt);
        }

        // Backspace button
        const bsx = startX + totalW + 20;
        const bsy = startY + 4;
        const backBtn = this.add.rectangle(bsx + 30, startY + slotH / 2, 60, 50, 0x882200, 1)
            .setInteractive()
            .on('pointerup', () => this._backspace())
            .on('pointerover', () => backBtn.setFillStyle(0xcc3300, 1))
            .on('pointerout',  () => backBtn.setFillStyle(0x882200, 1));

        this.add.text(bsx + 30, startY + slotH / 2, '⌫', {
            fontSize: '26px', color: '#ffffff',
        }).setOrigin(0.5);

        // Word length hint as dots below slots
        for (let i = 0; i < wordLen; i++) {
            const sx = startX + i * (slotW + gap);
            this.add.text(sx + slotW / 2, startY + slotH + 12, '—', {
                fontSize: '18px', color: '#ffd700',
            }).setOrigin(0.5);
        }
    }

    _drawLetterPool() {
        const pool  = [...this.wordDef.letters].sort(() => Math.random() - 0.5);
        const tileW = 96;
        const tileH = 96;
        const gap   = 16;
        const totalW = pool.length * tileW + (pool.length - 1) * gap;
        const startX = 512 - totalW / 2;
        const startY = 500;

        pool.forEach((letter, i) => {
            const cx = startX + i * (tileW + gap) + tileW / 2;
            const cy = startY + tileH / 2;

            const bg = this.add.rectangle(cx, cy, tileW, tileH, 0xee7700, 1)
                .setInteractive()
                .setDepth(3);

            // Slight 3D border effect
            const border = this.add.graphics().setDepth(3);
            border.lineStyle(3, 0xffffff, 0.5);
            border.strokeRect(cx - tileW / 2 + 2, cy - tileH / 2 + 2, tileW - 4, tileH - 4);

            const txt = this.add.text(cx, cy, letter, {
                fontSize: '52px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#ffffff',
                stroke: '#994400',
                strokeThickness: 4,
            }).setOrigin(0.5).setDepth(4);

            bg.on('pointerover', () => { if (!tile.used) bg.setFillStyle(0xff9922, 1); });
            bg.on('pointerout',  () => { if (!tile.used) bg.setFillStyle(0xee7700, 1); });
            bg.on('pointerdown', () => { if (!tile.used) this.tweens.add({ targets: bg, scaleX: 0.88, scaleY: 0.88, duration: 55 }); });
            bg.on('pointerup',   () => {
                this.tweens.add({ targets: bg, scaleX: 1, scaleY: 1, duration: 80 });
                if (!tile.used) this._selectLetter(tile);
            });

            const tile = { bg, txt, border, letter, used: false };
            this.tiles.push(tile);
        });
    }

    _drawInstructions() {
        this.add.text(512, 462, 'Clique sur les lettres dans l\'ordre', {
            fontSize: '20px',
            color: '#ddbbff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5);
    }

    _drawCloseButton() {
        const btn = this.add.rectangle(910, 88, 44, 44, 0x880000, 1)
            .setInteractive()
            .on('pointerup', () => this._close())
            .on('pointerover', () => btn.setFillStyle(0xcc0000, 1))
            .on('pointerout',  () => btn.setFillStyle(0x880000, 1));

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
        this.slots[idx].gfx.clear();
        this.slots[idx].gfx.fillStyle(0xffee88, 1);
        this.slots[idx].gfx.fillRoundedRect(
            this.slots[idx].x, this.slots[idx].y,
            this.slots[idx].w, this.slots[idx].h, 12
        );
        this.time.delayedCall(200, () => {
            this.slots[idx].gfx.clear();
            this.slots[idx].gfx.fillStyle(0xfff8e7, 1);
            this.slots[idx].gfx.fillRoundedRect(
                this.slots[idx].x, this.slots[idx].y,
                this.slots[idx].w, this.slots[idx].h, 12
            );
            this.slots[idx].gfx.lineStyle(3, 0xffd700, 1);
            this.slots[idx].gfx.strokeRoundedRect(
                this.slots[idx].x, this.slots[idx].y,
                this.slots[idx].w, this.slots[idx].h, 12
            );
        });

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
                targets: slot.gfx,
                x: slot.gfx.x + 10,
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
