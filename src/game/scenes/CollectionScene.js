import { Scene } from 'phaser';
import { ITEMS, RARITY, SPECIAL_REWARDS } from '../data/ItemData.js';
import { getInventory, getEquipment, setEquipment } from '../data/LevelData.js';

const TABS = [
    { label: '🏰 Orthographe',   categories: ['skin'],                  desc: 'Personnage' },
    { label: '❄️ Mathématiques', categories: ['item_left', 'item_right'], desc: 'Équipement' },
    { label: '🌟 Bonus',          categories: ['background'],             desc: 'Fond d\'écran' },
];

export class CollectionScene extends Scene {
    constructor() {
        super('CollectionScene');
    }

    init(data) {
        this.activeTab = data?.tab ?? 0;
    }

    create() {
        this.cameras.main.setBackgroundColor(0x1a0a2e);
        const { width, height } = this.cameras.main;

        // Stars background
        for (let i = 0; i < 30; i++) {
            this.add.circle(
                Math.random() * width, Math.random() * height,
                0.5 + Math.random() * 1.5, 0xffffff, 0.3 + Math.random() * 0.4
            );
        }

        this.add.text(width / 2, 38, 'Ma Collection ✨', {
            fontSize: '38px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 5,
        }).setOrigin(0.5);

        const backBtn = this.add.text(22, 38, '⬅ Menu', {
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#2a2a88',
            padding: { x: 10, y: 5 },
        }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.scene.start('MainMenu'));

        this._drawTabs();
        this._drawTabContent();
        this._drawSpecialRewards();
    }

    _drawTabs() {
        const { width } = this.cameras.main;
        const tabW = 260;
        const gap  = 16;
        const totalW = TABS.length * tabW + (TABS.length - 1) * gap;
        const startX = (width - totalW) / 2;

        TABS.forEach((tab, i) => {
            const cx = startX + i * (tabW + gap) + tabW / 2;
            const cy = 88;
            const isActive = i === this.activeTab;

            const bg = this.add.rectangle(cx, cy, tabW, 44, isActive ? 0x6633aa : 0x2a1144, 1)
                .setStrokeStyle(2, isActive ? 0xffd700 : 0x440088)
                .setInteractive({ useHandCursor: true });

            this.add.text(cx, cy, tab.label, {
                fontSize: '18px',
                fontFamily: 'Arial Black',
                color: isActive ? '#ffd700' : '#aaaacc',
            }).setOrigin(0.5);

            if (isActive) {
                this.add.rectangle(cx, cy + 24, tabW, 3, 0xffd700, 1);
            }

            bg.on('pointerup', () => {
                this.scene.start('CollectionScene', { tab: i });
            });
        });
    }

    _drawTabContent() {
        const tab = TABS[this.activeTab];
        const inventory = getInventory();
        const equipment = getEquipment();

        if (this.activeTab === 0) this._drawSkinTab(inventory, equipment);
        else if (this.activeTab === 1) this._drawMathTab(inventory, equipment);
        else this._drawBonusTab(inventory, equipment);
    }

    // ── Tab 0: Skins ─────────────────────────────────────────────────────────

    _drawSkinTab(inventory, equipment) {
        const { width } = this.cameras.main;
        const items = ITEMS.filter(i => i.category === 'skin');
        const cardW = 200;
        const cardH = 200;
        const gap   = 30;
        const totalW = items.length * cardW + (items.length - 1) * gap;
        const startX = (width - totalW) / 2;
        const cy = 320;

        this.add.text(width / 2, 135, 'Choisir un personnage pour Jolyne', {
            fontSize: '18px',
            color: '#ddaaff',
        }).setOrigin(0.5);

        items.forEach((item, idx) => {
            const cx = startX + idx * (cardW + gap) + cardW / 2;
            const isUnlocked = inventory.includes(item.id);
            const isEquipped = equipment.skin === item.id;
            this._drawItemCard(cx, cy, cardW, cardH, item, isUnlocked, isEquipped, inventory, equipment);
        });
    }

    // ── Tab 1: Math items ─────────────────────────────────────────────────────

    _drawMathTab(inventory, equipment) {
        const { width } = this.cameras.main;

        this.add.text(width / 2, 135, 'Équipement pour le jeu de Mathématiques', {
            fontSize: '18px',
            color: '#ddaaff',
        }).setOrigin(0.5);

        const rowDefs = [
            { label: '🛡️ Bras Gauche', cat: 'item_left',  y: 270 },
            { label: '⚔️ Bras Droit',  cat: 'item_right', y: 450 },
        ];

        rowDefs.forEach(row => {
            this.add.text(width / 2, row.y - 80, row.label, {
                fontSize: '20px',
                fontFamily: 'Arial Black',
                color: '#80ffb4',
            }).setOrigin(0.5);

            const items = ITEMS.filter(i => i.category === row.cat);
            const cardW = 180;
            const cardH = 130;
            const gap   = 28;
            const totalW = items.length * cardW + (items.length - 1) * gap;
            const startX = (width - totalW) / 2;

            items.forEach((item, idx) => {
                const cx = startX + idx * (cardW + gap) + cardW / 2;
                const isUnlocked = inventory.includes(item.id);
                const isEquipped = equipment[row.cat] === item.id;
                this._drawItemCard(cx, row.y, cardW, cardH, item, isUnlocked, isEquipped, inventory, equipment);
            });
        });
    }

    // ── Tab 2: Backgrounds ───────────────────────────────────────────────────

    _drawBonusTab(inventory, equipment) {
        const { width } = this.cameras.main;
        const items = ITEMS.filter(i => i.category === 'background');
        const cardW = 200;
        const cardH = 160;
        const gap   = 30;
        const totalW = items.length * cardW + (items.length - 1) * gap;
        const startX = (width - totalW) / 2;
        const cy = 300;

        this.add.text(width / 2, 135, 'Choisir le fond du Menu Principal', {
            fontSize: '18px',
            color: '#ddaaff',
        }).setOrigin(0.5);

        items.forEach((item, idx) => {
            const cx = startX + idx * (cardW + gap) + cardW / 2;
            const isUnlocked = inventory.includes(item.id);
            const isEquipped = equipment.background === item.id;
            this._drawItemCard(cx, cy, cardW, cardH, item, isUnlocked, isEquipped, inventory, equipment);
        });
    }

    // ── Generic card renderer ─────────────────────────────────────────────────

    _drawItemCard(cx, cy, cardW, cardH, item, isUnlocked, isEquipped, inventory, equipment) {
        const borderColor = isEquipped ? 0x00ff88 : (isUnlocked ? 0x6644aa : 0x333333);
        const fillColor   = isEquipped ? 0x1a4422 : (isUnlocked ? 0x442266 : 0x1a1a1a);

        const bg = this.add.rectangle(cx, cy, cardW, cardH, fillColor, 1)
            .setStrokeStyle(isEquipped ? 4 : 2, borderColor);

        if (!isUnlocked) {
            this.add.text(cx, cy - 10, '???', { fontSize: '28px', color: '#555555' }).setOrigin(0.5);
            this.add.text(cx, cy + 26, '🔒', { fontSize: '22px' }).setOrigin(0.5);
            return;
        }

        const rarityColor = RARITY[item.rarity].color;

        // Preview
        this._drawItemPreview(cx, cy - 18, item);

        // Name
        this.add.text(cx, cy + cardH / 2 - 42, item.name, {
            fontSize: '14px',
            fontFamily: 'Arial Black',
            color: rarityColor,
        }).setOrigin(0.5);

        // Rarity label
        this.add.text(cx, cy + cardH / 2 - 24, RARITY[item.rarity].label, {
            fontSize: '11px',
            color: rarityColor,
        }).setOrigin(0.5);

        // Status badge
        if (isEquipped) {
            this.add.text(cx, cy + cardH / 2 - 6, '✔ ÉQUIPÉ', {
                fontSize: '13px',
                fontFamily: 'Arial Black',
                color: '#00ff88',
            }).setOrigin(0.5);
        } else {
            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerover', () => bg.setFillStyle(0x553377));
            bg.on('pointerout',  () => bg.setFillStyle(fillColor));
            bg.on('pointerup',   () => {
                setEquipment(item.category, item.id);
                this.scene.start('CollectionScene', { tab: this.activeTab });
            });
            this.add.text(cx, cy + cardH / 2 - 6, 'Équiper', {
                fontSize: '13px',
                color: '#aaaaff',
            }).setOrigin(0.5);
        }
    }

    _drawItemPreview(cx, cy, item) {
        if (item.category === 'skin') {
            if (this.textures.exists('jojo_pixel')) {
                const img = this.add.image(cx, cy, 'jojo_pixel').setDisplaySize(60, 60);
                if (item.tint) img.setTint(item.tint);
            } else {
                this.add.text(cx, cy, '🧒', { fontSize: '36px' }).setOrigin(0.5);
            }
        } else if (item.category === 'background') {
            this.add.rectangle(cx, cy, 80, 50, item.bgColor ?? 0x1a1a5e, 1)
                .setStrokeStyle(1, 0x888888);
            for (let i = 0; i < 5; i++) {
                this.add.circle(
                    cx - 30 + Math.random() * 60,
                    cy - 15 + Math.random() * 30,
                    1 + Math.random(), 0xffffff, 0.6
                );
            }
        } else if (item.emoji) {
            this.add.text(cx, cy, item.emoji, { fontSize: '40px' }).setOrigin(0.5);
        } else {
            this.add.text(cx, cy, '📦', { fontSize: '32px' }).setOrigin(0.5);
        }
    }

    // ── Special Rewards ───────────────────────────────────────────────────────

    _drawSpecialRewards() {
        const inventory = getInventory();
        const { width, height } = this.cameras.main;

        this.add.text(width / 2, height - 220, '— Récompenses Spéciales —', {
            fontSize: '16px',
            color: '#888888',
        }).setOrigin(0.5);

        const rewards = Object.values(SPECIAL_REWARDS);
        rewards.forEach((reward, i) => {
            const x = width / 2 + (i === 0 ? -150 : 150);
            const y = height - 120;
            const isUnlocked = inventory.includes(reward.id);

            if (isUnlocked) {
                const img = this.add.image(x, y, reward.asset).setDisplaySize(120, 90);
                this.add.text(x, y + 58, reward.name, { fontSize: '14px', color: '#ffd700' }).setOrigin(0.5);
                img.setInteractive({ useHandCursor: true }).on('pointerup', () => this._showFullPicture(reward.asset));
            } else {
                this.add.rectangle(x, y, 120, 90, 0x111111, 1).setStrokeStyle(2, 0x333333);
                this.add.text(x, y, '🏆', { fontSize: '36px', alpha: 0.2 }).setOrigin(0.5);
                this.add.text(x, y + 52, '???', { fontSize: '14px', color: '#444444' }).setOrigin(0.5);
            }
        });
    }

    _showFullPicture(asset) {
        const { width, height } = this.cameras.main;
        const bg  = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.9).setDepth(100);
        const img = this.add.image(width / 2, height / 2, asset).setDepth(101);
        const scale = Math.min(width / img.width, height / img.height) * 0.85;
        img.setScale(scale);
        bg.setInteractive().on('pointerup', () => { bg.destroy(); img.destroy(); });
    }
}
