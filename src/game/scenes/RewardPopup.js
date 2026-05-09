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

        this.add.rectangle(cx, cy, width, height, 0x000000, 0.85).setDepth(100);

        const panel = this.add.nineslice(cx, cy, 'ui_panel', 0, 500, 440, 40, 40, 40, 40).setDepth(101).setScale(0);

        const rarityInfo = RARITY[this.item.rarity];

        const title = this.add.text(cx, cy - 185, t('newContent'), {
            fontSize: '32px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
        }).setOrigin(0.5).setDepth(102).setAlpha(0);

        const rarityText = this.add.text(cx, cy - 145, t(rarityInfo.labelKey), {
            fontSize: '24px',
            fontFamily: 'Arial Black',
            color: rarityInfo.color,
        }).setOrigin(0.5).setDepth(102).setAlpha(0);

        const itemImage = this._buildItemImage(cx, cy - 40);

        const itemName = this.add.text(cx, cy + 75, t(this.item.nameKey), {
            fontSize: '34px',
            fontFamily: 'Arial Black',
            color: rarityInfo.color,
        }).setOrigin(0.5).setDepth(102).setAlpha(0);

        const btn = this.add.text(cx, cy + 155, t('great'), {
            fontSize: '28px',
            backgroundColor: '#00aaff',
            padding: { x: 20, y: 10 },
        }).setOrigin(0.5).setDepth(102).setInteractive({ useHandCursor: true }).setAlpha(0);

        btn.on('pointerup', () => {
            this.scene.stop();
            if (this.onClose) this.onClose();
        });

        this.tweens.add({
            targets: panel,
            scale: 1,
            duration: 500,
            ease: 'Back.Out',
            onComplete: () => {
                this.tweens.add({ targets: [title, rarityText, itemName, btn], alpha: 1, duration: 300 });
                if (itemImage) {
                    this.tweens.add({ targets: itemImage, alpha: 1, scaleX: 1, scaleY: 1, duration: 400, ease: 'Back.Out' });
                }
            },
        });

        this.add.particles(cx, cy, 'particle', {
            speed: { min: 100, max: 300 },
            scale: { start: 0.6, end: 0 },
            blendMode: 'ADD',
            lifespan: 1000,
            quantity: 40,
        }).setDepth(103).explode();
    }

    _buildItemImage(cx, cy) {
        if (this.item.category === 'skin') {
            if (this.textures.exists('jojo_pixel')) {
                const img = this.add.image(cx, cy, 'jojo_pixel')
                    .setDisplaySize(100, 100).setDepth(102).setAlpha(0).setScale(0);
                if (this.item.tint) img.setTint(this.item.tint);
                return img;
            }
            return this.add.text(cx, cy, '🧒', { fontSize: '72px' })
                .setOrigin(0.5).setDepth(102).setAlpha(0).setScale(0);
        }

        const emoji = this.item.emoji
            ?? (this.item.category === 'background' ? '🖼️' : '📦');
        return this.add.text(cx, cy, emoji, { fontSize: '72px' })
            .setOrigin(0.5).setDepth(102).setAlpha(0).setScale(0);
    }
}
