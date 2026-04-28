import { Scene } from 'phaser';
import { ITEMS, RARITY, SPECIAL_REWARDS } from '../data/ItemData.js';
import { getInventory, getEquipment, setEquipment } from '../data/LevelData.js';

export class CollectionScene extends Scene {
    constructor() {
        super('CollectionScene');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x1a0a2e);
        const { width, height } = this.cameras.main;

        this.add.text(width/2, 60, 'Ma Collection ✨', {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            color: '#ffd700'
        }).setOrigin(0.5);

        const backBtn = this.add.text(50, 40, '⬅ Menu', {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#2a2a88',
            padding: { x: 10, y: 5 }
        }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.scene.start('MainMenu'));

        this._drawCategories();
        this._drawItems();
        this._drawSpecialRewards();
    }

    _drawCategories() {
        const categories = [
            { id: 'skin', label: 'Personnage' },
            { id: 'background', label: 'Fonds' },
            { id: 'item_left', label: 'Bras Gauche' },
            { id: 'item_right', label: 'Bras Droit' }
        ];

        // Stub: category selection logic can be added here
    }

    _drawItems() {
        const inventory = getInventory();
        const equipment = getEquipment();
        const { width } = this.cameras.main;

        const startX = 100;
        const startY = 160;
        const gapX = 180;
        const gapY = 140;
        const cols = 5;

        ITEMS.forEach((item, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = startX + col * gapX;
            const y = startY + row * gapY;

            const isUnlocked = inventory.includes(item.id);
            const isEquipped = equipment[item.category] === item.id;

            const bg = this.add.rectangle(x, y, 160, 120, isUnlocked ? 0x442266 : 0x222222, 1)
                .setStrokeStyle(3, isEquipped ? 0x00ff00 : (isUnlocked ? 0x6644aa : 0x444444));

            if (isUnlocked) {
                bg.setInteractive({ useHandCursor: true }).on('pointerup', () => {
                    setEquipment(item.category, item.id);
                    this.scene.restart();
                });

                const rarityColor = RARITY[item.rarity].color;
                this.add.text(x, y - 40, item.name, { fontSize: '16px', color: rarityColor }).setOrigin(0.5);
                this.add.text(x, y + 40, isEquipped ? 'ÉQUIPÉ' : 'DÉBLOQUÉ', { 
                    fontSize: '14px', 
                    color: isEquipped ? '#00ff00' : '#ffffff' 
                }).setOrigin(0.5);
                
                // Show asset if exists
                if (this.textures.exists(item.asset)) {
                    this.add.image(x, y, item.asset).setDisplaySize(50, 50);
                } else {
                    this.add.text(x, y, '📦', { fontSize: '32px' }).setOrigin(0.5);
                }
            } else {
                this.add.text(x, y, '???', { fontSize: '24px', color: '#666666' }).setOrigin(0.5);
            }
        });
    }

    _drawSpecialRewards() {
        const inventory = getInventory();
        const { width, height } = this.cameras.main;
        
        const rewards = Object.values(SPECIAL_REWARDS);
        rewards.forEach((reward, i) => {
            const x = width / 2 + (i === 0 ? -150 : 150);
            const y = height - 120;
            const isUnlocked = inventory.includes(reward.id);

            if (isUnlocked) {
                const img = this.add.image(x, y, reward.asset).setDisplaySize(120, 100);
                this.add.text(x, y + 65, reward.name, { fontSize: '18px', color: '#ffd700' }).setOrigin(0.5);
                
                img.setInteractive({ useHandCursor: true }).on('pointerup', () => {
                    // Show full screen picture
                    this._showFullPicture(reward.asset);
                });
            } else {
                this.add.rectangle(x, y, 120, 100, 0x111111, 1).setStrokeStyle(2, 0x333333);
                this.add.text(x, y, '🏆', { fontSize: '40px', alpha: 0.2 }).setOrigin(0.5);
            }
        });
    }

    _showFullPicture(asset) {
        const { width, height } = this.cameras.main;
        const bg = this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.9).setDepth(100);
        const img = this.add.image(width/2, height/2, asset).setDepth(101);
        
        // Scale to fit
        const scale = Math.min(width / img.width, height / img.height) * 0.85;
        img.setScale(scale);

        bg.setInteractive().on('pointerup', () => {
            bg.destroy();
            img.destroy();
        });
    }
}
