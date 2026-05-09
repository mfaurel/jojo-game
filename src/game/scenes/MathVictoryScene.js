import { Scene } from 'phaser';
import { MATH_WORLDS, saveMathProgress, getMathProgress } from '../data/MathWorldData.js';
import { audio } from '../systems/AudioManager.js';
import { t } from '../data/I18n.js';
import { LootManager } from '../systems/LootManager.js';
import { addToInventory } from '../data/LevelData.js';
import { SPECIAL_REWARDS } from '../data/ItemData.js';

export class MathVictoryScene extends Scene {
    constructor() {
        super('MathVictoryScene');
    }

    init(data) {
        this.worldIndex = data.worldIndex ?? 0;
        this.worldConfig = MATH_WORLDS[this.worldIndex];
        this._exiting = false;
    }

    create() {
        saveMathProgress(this.worldIndex);
        this._checkLoot();

        const { width, height } = this.cameras.main;

        // Phase 0 — dim overlay
        const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0)
            .setDepth(0).setScrollFactor(0);
        this.tweens.add({ targets: overlay, alpha: 0.65, duration: 300 });

        // Phase 1 — BRAVO (300ms)
        this.time.delayedCall(300, () => {
            audio.playFanfare();
            const bravo = this.add.text(width / 2, height / 2 - 70, t('mathBravo'), {
                fontSize: '90px',
                fontFamily: 'Arial Black',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 10,
            }).setOrigin(0.5).setScale(0).setDepth(10);

            this.tweens.add({
                targets: bravo,
                scale: 1.2,
                duration: 400,
                ease: 'Back.Out',
                onComplete: () => {
                    this.tweens.add({ targets: bravo, scale: 1, duration: 200 });
                }
            });
        });

        // Phase 2 — world name (700ms)
        this.time.delayedCall(700, () => {
            const worldTxt = this.add.text(width / 2, height / 2 + 20, t('worldComplete', this.worldIndex + 1), {
                fontSize: '38px',
                fontFamily: 'Arial Black',
                color: '#ffffff',
                stroke: '#000',
                strokeThickness: 5,
            }).setOrigin(0.5).setAlpha(0).setDepth(10);
            this.tweens.add({ targets: worldTxt, alpha: 1, duration: 300 });
        });

        // Phase 3 — star drops in (1000ms)
        this.time.delayedCall(1000, () => {
            audio.playStarReveal(0);
            const star = this.add.text(width / 2, -80, '★', {
                fontSize: '80px',
                color: '#ffd700',
            }).setOrigin(0.5).setDepth(10);
            this.tweens.add({ targets: star, y: height / 2 + 100, duration: 400, ease: 'Bounce.Out' });
        });

        // Phase 4 — confetti burst (1200ms)
        this.time.delayedCall(1200, () => {
            audio.playVictory();
            this.add.particles(width * 0.3, height * 0.4, 'particle', {
                speed: { min: 200, max: 500 },
                angle: { min: 250, max: 290 },
                scale: { start: 0.5, end: 0.1 },
                lifespan: 1800,
                quantity: 40,
                blendMode: 'ADD',
            }).explode();
            this.add.particles(width * 0.7, height * 0.4, 'particle', {
                speed: { min: 200, max: 500 },
                angle: { min: 250, max: 290 },
                scale: { start: 0.5, end: 0.1 },
                lifespan: 1800,
                quantity: 40,
                blendMode: 'ADD',
            }).explode();
        });

        // Phase 5 — reward popup or continue button (1800ms)
        this.time.delayedCall(1800, () => {
            if (this.wonItem) {
                this.scene.launch('RewardPopup', {
                    item:    this.wonItem,
                    onClose: () => this._exitToWorldSelect(),
                });
            } else {
                const btnBg = this.add.rectangle(width / 2, height * 0.78, 240, 58, this.worldConfig.btnColor, 1)
                    .setInteractive({ useHandCursor: true })
                    .setDepth(20);
                this.add.text(width / 2, height * 0.78, t('continueBtn'), {
                    fontSize: '26px',
                    fontFamily: 'Arial Black',
                    color: '#ffffff',
                    stroke: '#000',
                    strokeThickness: 3,
                }).setOrigin(0.5).setDepth(21);

                btnBg.on('pointerover', () => btnBg.setFillStyle(this.worldConfig.btnColor + 0x101010));
                btnBg.on('pointerout',  () => btnBg.setFillStyle(this.worldConfig.btnColor));
                btnBg.on('pointerup',   () => this._exitToWorldSelect());

                // Auto-advance only when no reward popup is blocking
                this.time.delayedCall(1700, () => this._exitToWorldSelect());
            }
        });
    }

    _checkLoot() {
        this.wonItem = LootManager.rollLoot();

        const progress = getMathProgress();
        const allDone = MATH_WORLDS.every((_, i) => progress[i] === true);
        if (allDone) {
            addToInventory(SPECIAL_REWARDS.MATH_ALL.id);
        }
    }

    _exitToWorldSelect() {
        if (this._exiting) return;
        this._exiting = true;
        this.scene.stop('MathDungeon');
        this.scene.start('MathWorldSelectScene');
    }
}
