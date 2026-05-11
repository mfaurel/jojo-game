import { Scene } from 'phaser';
import { ITEMS, RARITY, SPECIAL_REWARDS, CARD_BACK_ITEMS } from '../data/ItemData.js';
import { getInventory, getEquipment, setEquipment } from '../data/LevelData.js';
import { t } from '../data/I18n.js';
import { isNameUnlocked, getChildName, setChildName } from '../services/NameService.js';
import { purchaseProduct } from '../services/IAPService.js';

const TABS = [
    { labelKey: 'tabSpelling', categories: ['skin'] },
    { labelKey: 'tabMath',     categories: ['item_left', 'item_right'] },
    { labelKey: 'tabMemory',   categories: ['card_back'] },
    { labelKey: 'tabBonus',    categories: ['background'] },
];

export class CollectionScene extends Scene {
    constructor() {
        super('CollectionScene');
    }

    init(data) {
        this.activeTab = data?.tab ?? 1;
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

        this.add.text(width / 2, 38, t('collectionTitle'), {
            fontSize: '38px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 5,
        }).setOrigin(0.5);

        const backBtn = this.add.text(22, 38, t('backMenu'), {
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#2a2a88',
            padding: { x: 10, y: 5 },
        }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.scene.start('MainMenu'));

        this._drawTabs();
        this._drawTabContent();
    }

    _drawTabs() {
        const { width } = this.cameras.main;
        const tabW = TABS.length <= 3 ? 260 : 220;
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

            this.add.text(cx, cy, t(tab.labelKey), {
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

        if (this.activeTab === 0)      this._drawSkinTab(inventory, equipment);
        else if (this.activeTab === 1) this._drawMathTab(inventory, equipment);
        else if (this.activeTab === 2) this._drawMemoryTab(inventory, equipment);
        else                           this._drawBonusTab(inventory, equipment);
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

        this.add.text(width / 2, 135, t('chooseSkin'), {
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

        this.add.text(width / 2, 135, t('mathEquipment'), {
            fontSize: '18px',
            color: '#ddaaff',
        }).setOrigin(0.5);

        const rowDefs = [
            { labelKey: 'leftArm',  cat: 'item_left',  y: 270 },
            { labelKey: 'rightArm', cat: 'item_right', y: 450 },
        ];

        rowDefs.forEach(row => {
            this.add.text(width / 2, row.y - 80, t(row.labelKey), {
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

        this.add.text(width / 2, 135, t('chooseBg'), {
            fontSize: '18px',
            color: '#ddaaff',
        }).setOrigin(0.5);

        items.forEach((item, idx) => {
            const cx = startX + idx * (cardW + gap) + cardW / 2;
            const isUnlocked = inventory.includes(item.id);
            const isEquipped = equipment.background === item.id;
            this._drawItemCard(cx, cy, cardW, cardH, item, isUnlocked, isEquipped, inventory, equipment);
        });

        this._drawNameCustomization(width);
        this._drawSpecialRewards();
    }

    // ── Name customization (Bonus tab) ────────────────────────────────────────

    _drawNameCustomization(width) {
        const sectionY = 490;

        this.add.text(width / 2, sectionY, '— Personnaliser le prénom —', {
            fontSize: '16px',
            color: '#888888',
        }).setOrigin(0.5);

        if (isNameUnlocked()) {
            const current = getChildName();
            const label = this.add.text(width / 2, sectionY + 36, `Prénom : ${current}`, {
                fontSize: '20px',
                fontFamily: 'Arial Black',
                color: '#ffd700',
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            label.on('pointerup', () => this._openNameInput(label));
        } else {
            const btnName = this._makePurchaseButton(width / 2 - 130, sectionY + 42,
                '✏️ Prénom (~1 €)', 0x4422aa, () => {
                    this.scene.launch('ParentalGateScene', {
                        onSuccess: async () => {
                            try {
                                await purchaseProduct('unlock_child_name');
                                this.scene.start('CollectionScene', { tab: 2 });
                            } catch {}
                        },
                    });
                });

            this._makePurchaseButton(width / 2 + 130, sectionY + 42,
                '🌟 Pack Premium (~5 €)', 0x885500, () => {
                    this.scene.launch('ParentalGateScene', {
                        onSuccess: async () => {
                            try {
                                await purchaseProduct('premium_bundle');
                                this.scene.start('CollectionScene', { tab: 2 });
                            } catch {}
                        },
                    });
                });
        }
    }

    _makePurchaseButton(x, y, label, color, onClick) {
        const bg = this.add.rectangle(x, y, 240, 52, color, 1)
            .setStrokeStyle(2, 0xffd700)
            .setInteractive({ useHandCursor: true });

        this.add.text(x, y, label, {
            fontSize: '15px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
        }).setOrigin(0.5);

        bg.on('pointerover', () => bg.setAlpha(0.8));
        bg.on('pointerout',  () => bg.setAlpha(1));
        bg.on('pointerup',   onClick);
        return bg;
    }

    _openNameInput(labelText) {
        const input = document.createElement('input');
        input.type        = 'text';
        input.maxLength   = 20;
        input.value       = getChildName();
        input.placeholder = 'Prénom…';

        Object.assign(input.style, {
            position:   'absolute',
            top:        '50%',
            left:       '50%',
            transform:  'translate(-50%, -50%)',
            fontSize:   '24px',
            padding:    '10px 16px',
            borderRadius: '8px',
            border:     '3px solid #ffd700',
            background: '#1a0a2e',
            color:      '#ffd700',
            outline:    'none',
            zIndex:     '1000',
            textAlign:  'center',
        });

        document.body.appendChild(input);
        input.focus();

        const commit = () => {
            const name = input.value.trim();
            if (name) setChildName(name);
            input.remove();
            labelText.setText(`Prénom : ${getChildName()}`);
        };

        input.addEventListener('keydown', e => { if (e.key === 'Enter') commit(); });
        input.addEventListener('blur', commit);
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
        const nameY = cy + cardH / 2 - 42;
        if (item.rainbowName) {
            this._drawRainbowName(cx, nameY, t(item.nameKey));
        } else {
            this.add.text(cx, nameY, t(item.nameKey), {
                fontSize: '14px',
                fontFamily: 'Arial Black',
                color: item.nameColor ?? rarityColor,
            }).setOrigin(0.5);
        }

        // Rarity label
        this.add.text(cx, cy + cardH / 2 - 24, t(RARITY[item.rarity].labelKey), {
            fontSize: '11px',
            color: rarityColor,
        }).setOrigin(0.5);

        // Status badge
        if (isEquipped) {
            this.add.text(cx, cy + cardH / 2 - 14, t('equipped'), {
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
            this.add.text(cx, cy + cardH / 2 - 14, t('equip'), {
                fontSize: '13px',
                color: '#aaaaff',
            }).setOrigin(0.5);
        }
    }

    _drawItemPreview(cx, cy, item) {
        if (item.category === 'skin') {
            if (this.textures.exists('jojo_pixel')) {
                const img = this.add.image(cx, cy, 'jojo_pixel').setDisplaySize(80, 80);
                if (item.tint) img.setTint(item.tint);
            } else {
                this.add.text(cx, cy, '🧒', { fontSize: '36px' }).setOrigin(0.5);
            }
        } else if (item.category === 'background') {
            this._drawBgPreview(cx, cy, item.id);
        } else if (item.category === 'card_back') {
            this._drawCardBackPreview(cx, cy, item.id);
        } else if (item.emoji) {
            this.add.text(cx, cy, item.emoji, { fontSize: '40px' }).setOrigin(0.5);
        } else {
            this.add.text(cx, cy, '📦', { fontSize: '32px' }).setOrigin(0.5);
        }
    }

    _drawCardBackPreview(cx, cy, id) {
        const W = 64, H = 88;

        if (id === 'card_back_jolyne') {
            const g = this.add.graphics();
            g.fillStyle(0x1a0a3a, 1);
            g.fillRoundedRect(cx - W / 2, cy - H / 2, W, H, 8);
            g.lineStyle(2, 0x8844ff, 1);
            g.strokeRoundedRect(cx - W / 2, cy - H / 2, W, H, 8);
            if (this.textures.exists('jojo_pixel')) {
                this.add.image(cx, cy, 'jojo_pixel').setDisplaySize(W - 8, H - 8);
            }
        } else if (id === 'card_back_stars') {
            const g = this.add.graphics();
            g.fillStyle(0x050520, 1);
            g.fillRoundedRect(cx - W / 2, cy - H / 2, W, H, 8);
            for (let i = 0; i < 12; i++) {
                const sx = cx - W / 2 + 4 + Math.random() * (W - 8);
                const sy = cy - H / 2 + 4 + Math.random() * (H - 8);
                g.fillStyle(0xffffff, 0.5 + Math.random() * 0.5);
                g.fillCircle(sx, sy, 0.8 + Math.random() * 1.5);
            }
            g.fillStyle(0xffeedd, 0.9);
            g.fillCircle(cx + W * 0.22, cy - H * 0.22, W * 0.13);
            g.fillStyle(0x050520, 1);
            g.fillCircle(cx + W * 0.27, cy - H * 0.24, W * 0.10);
            g.lineStyle(2, 0x6644cc, 1);
            g.strokeRoundedRect(cx - W / 2, cy - H / 2, W, H, 8);
        } else {
            // card_back_rainbow
            const g = this.add.graphics();
            g.fillStyle(0x100020, 1);
            g.fillRoundedRect(cx - W / 2, cy - H / 2, W, H, 8);
            const colors = [0xff4444, 0xff9900, 0xffee00, 0x44ee44, 0x44aaff, 0xaa44ff];
            const bandH  = (H - 12) / colors.length;
            colors.forEach((c, i) => {
                g.fillStyle(c, 0.85);
                g.fillRoundedRect(cx - W / 2 + 5, cy - H / 2 + 6 + i * bandH, W - 10, bandH - 2, 2);
            });
            g.lineStyle(2, 0xff44cc, 1);
            g.strokeRoundedRect(cx - W / 2, cy - H / 2, W, H, 8);
        }
    }

    _drawBgPreview(cx, cy, id) {
        const W = 80, H = 50;
        const g = this.add.graphics();

        if (id === 'bg_spelling') {
            if (this.textures.exists('jojopixelart_spelling')) {
                const mask = this.add.graphics();
                mask.fillRect(cx - W / 2, cy - H / 2, W, H);
                const img = this.add.image(cx, cy, 'jojopixelart_spelling')
                    .setDisplaySize(W, H)
                    .setMask(mask.createGeometryMask());
                g.lineStyle(1, 0x888888, 0.8);
                g.strokeRect(cx - W / 2, cy - H / 2, W, H);
            }
            return;
        } else if (id === 'bg_castle') {
            // Deep purple sky
            g.fillStyle(0x100028, 1); g.fillRect(cx - W/2, cy - H/2, W, H);
            // Moon
            g.fillStyle(0xffeebb, 0.15); g.fillCircle(cx + 26, cy - 14, 14);
            g.fillStyle(0xffeebb, 1);    g.fillCircle(cx + 26, cy - 14, 9);
            // Castle silhouette
            g.fillStyle(0x080018, 1);
            g.fillRect(cx - W/2, cy + 6, W, H/2);          // base
            g.fillRect(cx - 22,  cy - 14, 44, 22);          // centre tower
            g.fillRect(cx - 36,  cy - 8,  18, 16);          // left tower
            g.fillRect(cx + 18,  cy - 8,  18, 16);          // right tower
            // Battlements
            for (let i = 0; i < 3; i++) {
                g.fillRect(cx - 22 + i * 16, cy - 18, 10, 6);
            }
            // Torch glow
            g.fillStyle(0xff8800, 0.7); g.fillCircle(cx - 10, cy + 2, 3);
            g.fillStyle(0xff8800, 0.7); g.fillCircle(cx + 10, cy + 2, 3);
        } else if (id === 'bg_galaxy') {
            // Dark background
            g.fillStyle(0x080010, 1); g.fillRect(cx - W/2, cy - H/2, W, H);
            // Nebula blobs
            g.fillStyle(0xff44aa, 0.18); g.fillEllipse(cx - 16, cy - 5, 38, 22);
            g.fillStyle(0x9922ff, 0.15); g.fillEllipse(cx + 18, cy + 4, 30, 16);
            g.fillStyle(0xff6688, 0.10); g.fillEllipse(cx + 2,  cy - 10, 44, 18);
            // Stars
            [[cx - 28, cy - 16], [cx + 22, cy - 18], [cx - 8, cy + 14],
             [cx + 32, cy + 8],  [cx - 32, cy + 6],  [cx + 10, cy - 6]].forEach(([sx, sy]) => {
                g.fillStyle(0xffffff, 0.7 + Math.random() * 0.3);
                g.fillCircle(sx, sy, 1);
            });
            // Rainbow comet streak
            const rx = [0xff4444, 0xff9900, 0xffee00, 0x44ee44, 0x44aaff, 0xaa44ff];
            rx.forEach((c, i) => {
                g.fillStyle(c, 0.85 - i * 0.1);
                g.fillCircle(cx + 30 - i * 7, cy - 12 + i * 4, 2.5 - i * 0.3);
            });
        } else {
            // Starry Night (default)
            g.fillStyle(0x1a1a5e, 1); g.fillRect(cx - W/2, cy - H/2, W, H);
            for (let i = 0; i < 18; i++) {
                g.fillStyle(0xffffff, 0.4 + Math.random() * 0.6);
                g.fillCircle(cx - W/2 + 4 + Math.random() * (W - 8),
                             cy - H/2 + 4 + Math.random() * (H - 8), 0.6 + Math.random());
            }
        }

        // Border
        g.lineStyle(1, 0x888888, 0.8);
        g.strokeRect(cx - W/2, cy - H/2, W, H);
    }

    // ── Tab 3: Memory card backs ──────────────────────────────────────────────

    _drawMemoryTab(inventory, equipment) {
        const { width } = this.cameras.main;
        const items  = CARD_BACK_ITEMS;
        const cardW  = 240;
        const cardH  = 310;
        const gap    = 36;
        const totalW = items.length * cardW + (items.length - 1) * gap;
        const startX = (width - totalW) / 2;
        const cy     = 350;

        this.add.text(width / 2, 135, t('chooseCardBack'), {
            fontSize: '18px',
            color: '#ffddaa',
        }).setOrigin(0.5);

        items.forEach((item, idx) => {
            const cx        = startX + idx * (cardW + gap) + cardW / 2;
            const isUnlocked = inventory.includes(item.id);
            const isEquipped = equipment.card_back === item.id;
            this._drawItemCard(cx, cy, cardW, cardH, item, isUnlocked, isEquipped, inventory, equipment);
        });
    }

    // ── Special Rewards ───────────────────────────────────────────────────────

    _drawSpecialRewards() {
        const inventory = getInventory();
        const { width, height } = this.cameras.main;

        this.add.text(width / 2, height - 220, t('specialRewardsTitle'), {
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
                this.add.text(x, y + 58, t(reward.nameKey), { fontSize: '14px', color: '#ffd700' }).setOrigin(0.5);
                img.setInteractive({ useHandCursor: true }).on('pointerup', () => this._showFullPicture(reward.asset));
            } else {
                this.add.rectangle(x, y, 120, 90, 0x111111, 1).setStrokeStyle(2, 0x333333);
                this.add.text(x, y, '🏆', { fontSize: '36px', alpha: 0.2 }).setOrigin(0.5);
                this.add.text(x, y + 52, '???', { fontSize: '14px', color: '#444444' }).setOrigin(0.5);
            }
        });
    }

    _drawRainbowName(cx, cy, text) {
        const colors = ['#ff4444', '#ff9900', '#ffee00', '#44ee44', '#44aaff', '#aa44ff'];
        const style  = { fontSize: '14px', fontFamily: 'Arial Black, Arial, sans-serif' };
        // Measure total width using a hidden probe text
        const probe  = this.add.text(-2000, -2000, text, style);
        const totalW = probe.width;
        probe.destroy();
        // Render each character with its own color
        let xOffset = cx - totalW / 2;
        [...text].forEach((ch, i) => {
            const ct = this.add.text(xOffset, cy, ch, { ...style, color: colors[i % colors.length] }).setOrigin(0, 0.5);
            xOffset += ct.width;
        });
    }

    _showFullPicture(asset) {
        const { width, height } = this.cameras.main;
        const bg  = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.9).setDepth(100).setScrollFactor(0);
        const img = this.add.image(width / 2, height / 2, asset).setDepth(101).setScrollFactor(0);
        const scale = Math.min(width / img.width, height / img.height) * 0.85;
        img.setScale(scale);
        bg.setInteractive().on('pointerup', () => { bg.destroy(); img.destroy(); });
    }
}
