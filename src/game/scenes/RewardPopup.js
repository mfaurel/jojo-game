import { Scene } from 'phaser';
import { RARITY } from '../data/ItemData.js';
import { t } from '../data/I18n.js';

export class RewardPopup extends Scene {
    constructor() {
        super('RewardPopup');
    }

    init(data) {
        this.item    = data.item;
        this.onClose = data.onClose ?? null;
    }

    create() {
        const { width, height } = this.cameras.main;
        const cx = width / 2;
        const cy = height / 2;

        this.add.rectangle(cx, cy, width, height, 0x000000, 0.85).setDepth(100).setScrollFactor(0);

        // Custom panel (replaces nineslice to avoid SVG crop issues)
        const panel = this.add.graphics().setDepth(101).setScrollFactor(0).setAlpha(0);
        const pw = 500, ph = 480;
        panel.fillStyle(0x1a0a2e, 1);
        panel.fillRoundedRect(cx - pw / 2, cy - ph / 2, pw, ph, 20);
        panel.lineStyle(4, 0x8844ff, 1);
        panel.strokeRoundedRect(cx - pw / 2, cy - ph / 2, pw, ph, 20);
        panel.lineStyle(2, 0x4422aa, 1);
        panel.strokeRoundedRect(cx - pw / 2 + 5, cy - ph / 2 + 5, pw - 10, ph - 10, 16);

        const rarityInfo = RARITY[this.item.rarity];

        const title = this.add.text(cx, cy - 195, t('newContent'), {
            fontSize: '32px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
        }).setOrigin(0.5).setDepth(102).setAlpha(0).setScrollFactor(0);

        const rarityText = this.add.text(cx, cy - 155, t(rarityInfo.labelKey), {
            fontSize: '24px',
            fontFamily: 'Arial Black',
            color: rarityInfo.color,
        }).setOrigin(0.5).setDepth(102).setAlpha(0).setScrollFactor(0);

        const { image: itemImage } = this._buildItemImage(cx, cy - 40);

        const itemName = this.add.text(cx, cy + 88, t(this.item.nameKey), {
            fontSize: '30px',
            fontFamily: 'Arial Black',
            color: rarityInfo.color,
        }).setOrigin(0.5).setDepth(102).setAlpha(0).setScrollFactor(0);

        const btn = this.add.text(cx, cy + 168, t('great'), {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            backgroundColor: '#00aaff',
            padding: { x: 20, y: 10 },
        }).setOrigin(0.5).setDepth(102).setInteractive({ useHandCursor: true }).setAlpha(0).setScrollFactor(0);

        btn.on('pointerup', () => {
            this.scene.stop();
            if (this.onClose) this.onClose();
        });

        this.tweens.add({
            targets: panel,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            ease: 'Back.Out',
            onComplete: () => {
                this.tweens.add({ targets: [title, rarityText, itemName, btn], alpha: 1, duration: 300 });
                if (itemImage) {
                    this.tweens.add({ targets: itemImage, alpha: 1, scaleX: 1, scaleY: 1, duration: 400, ease: 'Cubic.Out' });
                }
            },
        });

        this.add.particles(cx, cy, 'particle', {
            speed: { min: 100, max: 300 },
            scale: { start: 0.6, end: 0 },
            blendMode: 'ADD',
            lifespan: 1000,
            quantity: 40,
        }).setDepth(103).setScrollFactor(0).explode();
    }

    _buildItemImage(cx, cy) {
        if (this.item.category === 'skin') {
            if (this.textures.exists('jojo_pixel')) {
                const img = this.add.image(cx, cy, 'jojo_pixel')
                    .setDisplaySize(150, 150).setDepth(102).setAlpha(0).setScale(0).setScrollFactor(0);
                if (this.item.tint) img.setTint(this.item.tint);
                return { image: img };
            }
        }

        if (this.item.category === 'card_back') {
            return { image: this._buildCardBackImage(cx, cy) };
        }

        const emoji = this.item.emoji
            ?? (this.item.category === 'background' ? '🖼️' : '📦');
        const txt = this.add.text(cx, cy, emoji, { fontSize: '88px' })
            .setOrigin(0.5).setDepth(102).setAlpha(0).setScale(0).setScrollFactor(0);
        return { image: txt };
    }

    _buildCardBackImage(cx, cy) {
        const W = 110, H = 154;
        const id = this.item.id;
        const g = this.add.graphics().setDepth(102).setAlpha(0).setScale(0).setScrollFactor(0);

        if (id === 'card_back_jolyne') {
            g.fillStyle(0x1a0a3a, 1);
            g.fillRoundedRect(cx - W / 2, cy - H / 2, W, H, 12);
            g.lineStyle(3, 0x8844ff, 1);
            g.strokeRoundedRect(cx - W / 2, cy - H / 2, W, H, 12);
            if (this.textures.exists('jojo_pixel')) {
                this.add.image(cx, cy, 'jojo_pixel').setDisplaySize(W - 14, H - 14)
                    .setDepth(103).setAlpha(0).setScrollFactor(0);
            }
        } else if (id === 'card_back_stars') {
            g.fillStyle(0x050520, 1);
            g.fillRoundedRect(cx - W / 2, cy - H / 2, W, H, 12);
            for (let i = 0; i < 18; i++) {
                const sx = cx - W / 2 + 6 + Math.random() * (W - 12);
                const sy = cy - H / 2 + 6 + Math.random() * (H - 12);
                g.fillStyle(0xffffff, 0.5 + Math.random() * 0.5);
                g.fillCircle(sx, sy, 1 + Math.random() * 2);
            }
            g.fillStyle(0xffeedd, 0.9);
            g.fillCircle(cx + W * 0.22, cy - H * 0.22, W * 0.13);
            g.fillStyle(0x050520, 1);
            g.fillCircle(cx + W * 0.27, cy - H * 0.24, W * 0.10);
            g.lineStyle(3, 0x6644cc, 1);
            g.strokeRoundedRect(cx - W / 2, cy - H / 2, W, H, 12);
        } else {
            // card_back_rainbow
            g.fillStyle(0x100020, 1);
            g.fillRoundedRect(cx - W / 2, cy - H / 2, W, H, 12);
            const colors = [0xff4444, 0xff9900, 0xffee00, 0x44ee44, 0x44aaff, 0xaa44ff];
            const bandH  = (H - 16) / colors.length;
            colors.forEach((c, i) => {
                g.fillStyle(c, 0.85);
                g.fillRoundedRect(cx - W / 2 + 7, cy - H / 2 + 8 + i * bandH, W - 14, bandH - 2, 3);
            });
            g.lineStyle(3, 0xff44cc, 1);
            g.strokeRoundedRect(cx - W / 2, cy - H / 2, W, H, 12);
        }

        return g;
    }
}
