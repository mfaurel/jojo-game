import { Scene } from 'phaser';
import { audio } from '../systems/AudioManager.js';
import { getWord } from '../data/WordData.js';
import { MEMORY_LEVELS, saveMemoryProgress } from '../data/MemoryData.js';
import { CARD_BACK_ITEMS } from '../data/ItemData.js';
import { getInventory, addToInventory, getEquipment } from '../data/LevelData.js';
import { LootManager } from '../systems/LootManager.js';
import { t } from '../data/I18n.js';

export class MemoryScene extends Scene {
    constructor() {
        super('MemoryScene');
    }

    init(data) {
        this.levelIndex = data?.levelIndex ?? 0;
    }

    create() {
        const level = MEMORY_LEVELS[this.levelIndex];
        this._level    = level;
        this._cards    = [];
        this._firstCard = null;
        this._locked   = false;
        this._matched  = 0;

        this._backId = getEquipment().card_back ?? 'card_back_jolyne';

        this.cameras.main.setBackgroundColor(0x0a1830);
        this.cameras.main.fadeIn(300);

        this._drawStars();

        this.add.text(512, 38, t('memoryTitle'), {
            fontSize: '32px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 5,
        }).setOrigin(0.5);

        this.add.text(512, 74, t('memoryInstruct'), {
            fontSize: '20px',
            color: '#ddaaff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5);

        const backBtn = this.add.text(18, 18, t('back'), {
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#2a2a88',
            padding: { x: 8, y: 4 },
        }).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.scene.start('MemoryMenuScene'));

        this._buildCards(level);
    }

    _drawStars() {
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 768;
            const r = 0.5 + Math.random() * 1.5;
            const s = this.add.circle(x, y, r, 0xffffff, 0.3 + Math.random() * 0.5);
            this.tweens.add({
                targets: s, alpha: 0.05 + Math.random() * 0.1,
                duration: 1200 + Math.random() * 2000,
                yoyo: true, repeat: -1, delay: Math.random() * 1500,
            });
        }
    }

    _buildCards(level) {
        const { cardSize, gap, cols, rows, words } = level;

        let pairs = [];
        words.forEach(w => { pairs.push(w); pairs.push(w); });
        pairs = this._shuffle(pairs);

        const totalW  = cols * cardSize + (cols - 1) * gap;
        const totalH  = rows * cardSize + (rows - 1) * gap;
        const startX  = (1024 - totalW) / 2 + cardSize / 2;
        const startY  = 100 + (668 - totalH) / 2 + cardSize / 2;

        pairs.forEach((wordKey, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x   = startX + col * (cardSize + gap);
            const y   = startY + row * (cardSize + gap);
            this._cards.push(this._createCard(x, y, wordKey, cardSize));
        });
    }

    _createCard(x, y, wordKey, size) {
        const r         = size / 2 - 10;
        const container = this.add.container(x, y);

        // Back face (design based on equipped card_back)
        const backObjects = this._buildBackFace(size);
        backObjects.forEach(o => container.add(o));

        // Front face
        const frontGfx = this.add.graphics();
        frontGfx.fillStyle(0xfaf8f0, 1);
        frontGfx.fillRoundedRect(-size / 2, -size / 2, size, size, 12);
        frontGfx.lineStyle(3, 0x4488cc, 1);
        frontGfx.strokeRoundedRect(-size / 2, -size / 2, size, size, 12);
        const concept = getWord(wordKey);
        if (concept) concept.drawPicture(frontGfx, 0, 0, r);
        frontGfx.setVisible(false);

        // Green overlay shown on match (Graphics has no setTint)
        const matchOverlay = this.add.graphics();
        matchOverlay.fillStyle(0x44ff44, 0.28);
        matchOverlay.fillRoundedRect(-size / 2, -size / 2, size, size, 12);
        matchOverlay.setVisible(false);

        // Invisible hit area
        const hit = this.add.rectangle(0, 0, size, size, 0x000000, 0)
            .setInteractive({ useHandCursor: true });

        container.add([frontGfx, matchOverlay, hit]);

        const card = { container, backObjects, frontGfx, matchOverlay, wordKey, matched: false, faceUp: false };

        hit.on('pointerover', () => {
            if (!card.matched && !card.faceUp && !this._locked) container.setScale(1.06);
        });
        hit.on('pointerout', () => {
            if (!card.matched && !card.faceUp) container.setScale(1);
        });
        hit.on('pointerup', () => this._onCardTap(card));

        return card;
    }

    // ── Card back designs ─────────────────────────────────────────────────────

    _buildBackFace(size) {
        const id = this._backId;

        if (id === 'card_back_jolyne') {
            // Dark purple frame
            const border = this.add.graphics();
            border.fillStyle(0x1a0a3a, 1);
            border.fillRoundedRect(-size / 2, -size / 2, size, size, 12);
            border.lineStyle(3, 0x8844ff, 1);
            border.strokeRoundedRect(-size / 2, -size / 2, size, size, 12);

            // Jolyne pixel art, scaled to fit inside the border
            const img = this.add.image(0, 0, 'jojo_pixel')
                .setDisplaySize(size - 14, size - 14);

            return [border, img];
        }

        if (id === 'card_back_stars') {
            const g = this.add.graphics();
            // Night sky background
            g.fillStyle(0x050520, 1);
            g.fillRoundedRect(-size / 2, -size / 2, size, size, 12);
            // Stars
            for (let i = 0; i < 14; i++) {
                const sx = (Math.random() - 0.5) * (size - 20);
                const sy = (Math.random() - 0.5) * (size - 20);
                g.fillStyle(0xffffff, 0.4 + Math.random() * 0.6);
                g.fillCircle(sx, sy, 0.8 + Math.random() * 2);
            }
            // Moon
            g.fillStyle(0xffeedd, 0.9);
            g.fillCircle(size * 0.22, -size * 0.24, size * 0.13);
            // Crescent shadow
            g.fillStyle(0x050520, 1);
            g.fillCircle(size * 0.27, -size * 0.26, size * 0.10);
            g.lineStyle(2, 0x6644cc, 1);
            g.strokeRoundedRect(-size / 2, -size / 2, size, size, 12);
            return [g];
        }

        // card_back_rainbow
        const g = this.add.graphics();
        g.fillStyle(0x100020, 1);
        g.fillRoundedRect(-size / 2, -size / 2, size, size, 12);
        const colors = [0xff4444, 0xff9900, 0xffee00, 0x44ee44, 0x44aaff, 0xaa44ff];
        const bandH  = (size - 24) / colors.length;
        const bandW  = size - 20;
        colors.forEach((c, i) => {
            g.fillStyle(c, 0.8);
            g.fillRoundedRect(-bandW / 2, -size / 2 + 10 + i * bandH, bandW, bandH - 2, 3);
        });
        g.lineStyle(3, 0xff44cc, 1);
        g.strokeRoundedRect(-size / 2, -size / 2, size, size, 12);
        return [g];
    }

    // ── Input & state machine ─────────────────────────────────────────────────

    _onCardTap(card) {
        if (this._locked) return;
        if (card.matched) return;
        if (card.faceUp) return;

        card.container.setScale(1);
        this._flipCard(card, true);
        card.faceUp = true;

        if (!this._firstCard) {
            this._firstCard = card;
        } else {
            this._locked = true;
            const first = this._firstCard;
            this._firstCard = null;
            this.time.delayedCall(350, () => this._checkMatch(first, card));
        }
    }

    _checkMatch(a, b) {
        if (a.wordKey === b.wordKey) {
            a.matched = true;
            b.matched = true;
            this._matched++;

            audio.playGateUnlock();
            this.tweens.add({
                targets: [a.container, b.container],
                scaleX: 1.15, scaleY: 1.15,
                duration: 200,
                ease: 'Back.Out',
                onComplete: () => {
                    a.matchOverlay.setVisible(true);
                    b.matchOverlay.setVisible(true);
                    this._locked = false;
                    if (this._matched === this._level.words.length) {
                        this.time.delayedCall(400, () => this._victory());
                    }
                },
            });
        } else {
            audio.playWrong();
            this._shake(a.container);
            this._shake(b.container);
            this.time.delayedCall(900, () => {
                this._flipCard(a, false);
                this._flipCard(b, false);
                a.faceUp = false;
                b.faceUp = false;
                this._locked = false;
            });
        }
    }

    _flipCard(card, toFaceUp) {
        this.tweens.add({
            targets: card.container,
            scaleX: 0,
            duration: 140,
            ease: 'Linear',
            onComplete: () => {
                card.backObjects.forEach(o => o.setVisible(!toFaceUp));
                card.frontGfx.setVisible(toFaceUp);
                this.tweens.add({
                    targets: card.container,
                    scaleX: card.matched ? 1.15 : 1,
                    duration: 140,
                    ease: 'Linear',
                });
            },
        });
    }

    _shake(target) {
        const ox = target.x;
        this.tweens.add({
            targets: target, x: ox + 10, duration: 55,
            yoyo: true, repeat: 3, ease: 'Linear',
            onComplete: () => { target.x = ox; },
        });
    }

    // ── Victory & memory-specific loot ────────────────────────────────────────

    _victory() {
        this._locked = true;
        audio.playVictory();
        saveMemoryProgress(this.levelIndex);
        this._starRain();

        const wonItem = this._rollMemoryLoot();
        this.time.delayedCall(1400, () => {
            if (wonItem) {
                this.scene.launch('RewardPopup', {
                    item: wonItem,
                    onClose: () => this.scene.start('MemoryMenuScene'),
                });
            } else {
                this.scene.start('MemoryMenuScene');
            }
        });
    }

    _rollMemoryLoot() {
        const inv = getInventory();
        // Prefer unowned card backs first
        const unowned = CARD_BACK_ITEMS.filter(i => !inv.includes(i.id));
        if (unowned.length > 0) {
            const item = unowned[Math.floor(Math.random() * unowned.length)];
            addToInventory(item.id);
            return item;
        }
        // All card backs owned → fall back to general loot
        return LootManager.rollLoot();
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    _starRain() {
        for (let i = 0; i < 22; i++) {
            this.time.delayedCall(i * 80, () => {
                const x    = 60 + Math.random() * 904;
                const icon = ['⭐', '✨', '🌟'][Math.floor(Math.random() * 3)];
                const s    = this.add.text(x, -30, icon, {
                    fontSize: (22 + Math.random() * 26) + 'px',
                }).setAlpha(0.9).setDepth(20);
                this.tweens.add({
                    targets: s, y: 830,
                    duration: 2400 + Math.random() * 2000,
                    ease: 'Linear',
                    onComplete: () => s.destroy(),
                });
            });
        }
    }

    _shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}
