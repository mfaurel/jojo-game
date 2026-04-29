import { Scene } from 'phaser';
import { getEquipment, addToInventory, getProgress, LEVELS } from '../data/LevelData.js';
import { ITEMS } from '../data/ItemData.js';
import { getMathProgress, MATH_WORLDS } from '../data/MathWorldData.js';
import { t, cycleLang, getLang } from '../data/I18n.js';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        const equip = getEquipment();

        if (equip.background === 'bg_castle') {
            this.cameras.main.setBackgroundColor(0x2a0055);
        } else if (equip.background === 'bg_galaxy') {
            this.cameras.main.setBackgroundColor(0x000022);
        } else {
            this.cameras.main.setBackgroundColor(0x1a1a5e);
        }

        for (let i = 0; i < 40; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 768;
            const r = 0.1 + Math.random() * 0.4;
            this.add.image(x, y, 'particle').setScale(r).setAlpha(0.4 + Math.random() * 0.4);
        }

        this.add.text(512, 150, t('gameTitle'), {
            fontSize: '64px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#2a0055',
            strokeThickness: 8,
        }).setOrigin(0.5);

        this.add.text(512, 230, t('gameSubtitle'), {
            fontSize: '28px',
            color: '#ddaaff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5);

        this._createChoiceButton(512, 380, t('btnSpelling'), 0x2a2a88, () => {
            this.scene.start('SpellingMenu');
        });

        this._createChoiceButton(512, 540, t('btnMath'), 0x2266aa, () => {
            this.scene.start('MathWorldSelectScene');
        });

        const spellingDone = LEVELS.filter(l => getProgress()[l.id]).length;
        if (spellingDone > 0) {
            this.add.text(512, 430, t('spellingProgress', spellingDone, LEVELS.length), {
                fontSize: '20px',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 3,
            }).setOrigin(0.5, 0);
        }

        const mathDone = MATH_WORLDS.filter((_, i) => getMathProgress()[i]).length;
        if (mathDone > 0) {
            this.add.text(512, 590, t('mathProgress', mathDone, MATH_WORLDS.length), {
                fontSize: '20px',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 3,
            }).setOrigin(0.5, 0);
        }

        this._createSmallButton(900, 710, t('btnCollection'), 0xaa00aa, () => {
            this.scene.start('CollectionScene');
        });

        this._createLangButton();

        this._initCheatCode();
    }

    _createLangButton() {
        const lang = getLang().toUpperCase();
        const btn = this.add.text(960, 35, lang, {
            fontSize: '22px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            backgroundColor: '#334455',
            padding: { x: 12, y: 6 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => btn.setStyle({ color: '#ffd700' }));
        btn.on('pointerout',  () => btn.setStyle({ color: '#ffffff' }));
        btn.on('pointerup',   () => {
            cycleLang();
            this.cameras.main.fadeOut(300, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => this.scene.restart());
        });
    }

    _initCheatCode() {
        const SEQUENCE = [38, 38]; // UP UP
        let progress = 0;

        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === SEQUENCE[progress]) {
                progress++;
                if (progress === SEQUENCE.length) {
                    progress = 0;
                    this._activateCheat();
                }
            } else {
                progress = event.keyCode === SEQUENCE[0] ? 1 : 0;
            }
        });
    }

    _activateCheat() {
        ITEMS.forEach(item => addToInventory(item.id));

        const { width, height } = this.cameras.main;
        const flash = this.add.rectangle(width / 2, height / 2, width, height, 0xffd700, 0.35).setDepth(50);
        this.tweens.add({ targets: flash, alpha: 0, duration: 600, onComplete: () => flash.destroy() });

        const msg = this.add.text(width / 2, height / 2, t('cheatUnlocked'), {
            fontSize: '52px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 8,
        }).setOrigin(0.5).setDepth(51).setScale(0);

        this.tweens.add({
            targets: msg,
            scale: 1,
            duration: 400,
            ease: 'Back.Out',
            onComplete: () => {
                this.time.delayedCall(1500, () => {
                    this.tweens.add({ targets: msg, alpha: 0, duration: 400, onComplete: () => msg.destroy() });
                });
            },
        });
    }

    _createSmallButton(x, y, label, color, callback) {
        const btnW = 220;
        const btnH = 60;

        let bg;
        if (this.textures.exists('ui_panel')) {
            bg = this.add.nineslice(x, y, 'ui_panel', 0, btnW, btnH, 40, 40, 40, 40).setTint(color);
        } else {
            bg = this.add.rectangle(x, y, btnW, btnH, color, 1);
        }

        bg.setInteractive({ useHandCursor: true });
        this.add.text(x, y, label, {
            fontSize: '22px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff'
        }).setOrigin(0.5);

        bg.on('pointerup', callback);
    }

    _createChoiceButton(x, y, label, color, callback) {
        const btnW = 450;
        const btnH = 120;

        let bg;
        if (this.textures.exists('ui_panel')) {
            bg = this.add.nineslice(x, y, 'ui_panel', 0, btnW, btnH, 40, 40, 40, 40).setTint(color);
        } else {
            bg = this.add.rectangle(x, y, btnW, btnH, color, 1).setStrokeStyle(6, 0xffffff);
        }

        bg.setInteractive({ useHandCursor: true });

        const txt = this.add.text(x, y, label, {
            fontSize: '44px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        bg.on('pointerover', () => { if (bg.setFillStyle) bg.setFillStyle(color + 0x111111); bg.setScale(1.05); txt.setScale(1.05); });
        bg.on('pointerout',  () => { if (bg.setFillStyle) bg.setFillStyle(color); bg.setScale(1); txt.setScale(1); });
        bg.on('pointerup',   () => { this.cameras.main.fadeOut(500, 0, 0, 0); this.cameras.main.once('camerafadeoutcomplete', callback); });
    }
}
