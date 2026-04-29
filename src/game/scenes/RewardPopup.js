import { Scene } from 'phaser';
import { RARITY } from '../data/ItemData.js';
import { t } from '../data/I18n.js';

export class RewardPopup extends Scene {
    constructor() {
        super('RewardPopup');
    }

    init(data) {
        this.item = data.item;
    }

    create() {
        const { width, height } = this.cameras.main;
        
        // Darken background
        this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.8);

        const panel = this.add.nineslice(width/2, height/2, 'ui_panel', 0, 500, 400, 40, 40, 40, 40);
        panel.setScale(0);

        const title = this.add.text(width/2, height/2 - 140, t('newContent'), {
            fontSize: '32px',
            fontFamily: 'Arial Black',
            color: '#ffd700'
        }).setOrigin(0.5).setAlpha(0);

        const rarityInfo = RARITY[this.item.rarity];
        const rarityText = this.add.text(width/2, height/2 - 90, t(rarityInfo.labelKey), {
            fontSize: '24px',
            fontFamily: 'Arial Black',
            color: rarityInfo.color
        }).setOrigin(0.5).setAlpha(0);

        const itemName = this.add.text(width/2, height/2 + 80, t(this.item.nameKey), {
            fontSize: '38px',
            fontFamily: 'Arial Black',
            color: '#004488'
        }).setOrigin(0.5).setAlpha(0);

        const btn = this.add.text(width/2, height/2 + 160, t('great'), {
            fontSize: '28px',
            backgroundColor: '#00aaff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setAlpha(0);

        btn.on('pointerup', () => this.scene.stop());

        this.tweens.add({
            targets: panel,
            scale: 1,
            duration: 500,
            ease: 'Back.Out',
            onComplete: () => {
                this.tweens.add({
                    targets: [title, rarityText, itemName, btn],
                    alpha: 1,
                    duration: 300
                });
            }
        });

        // Burst of particles when panel opens
        this.add.particles(width/2, height/2, 'particle', {
            speed: { min: 100, max: 300 },
            scale: { start: 0.6, end: 0 },
            blendMode: 'ADD',
            lifespan: 1000,
            quantity: 40,
        }).explode();
    }
}
