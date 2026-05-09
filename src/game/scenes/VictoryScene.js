import { Scene } from 'phaser';
import { audio } from '../systems/AudioManager.js';
import { saveProgress, getProgress, addToInventory, getEquipment } from '../data/LevelData.js';
import { LEVELS } from '../data/LevelData.js';
import { LootManager } from '../systems/LootManager.js';
import { SPECIAL_REWARDS, ITEMS } from '../data/ItemData.js';
import { t } from '../data/I18n.js';

export class VictoryScene extends Scene {
    constructor() {
        super('VictoryScene');
    }

    init(data) {
        this.levelIndex = data?.levelIndex ?? 0;
        this.gameType   = data?.gameType   ?? 'spelling';
    }

    create() {
        saveProgress(this.levelIndex);
        this._checkLoot();

        this._skipped          = false;
        this._cinematicObjects = [];
        this._towers           = [];

        this.cameras.main.setBackgroundColor(0x100020);

        this.input.on('pointerdown', () => this._skipToReward());

        this._playPhase1();
    }

    // ─── Skip ────────────────────────────────────────────────────────────────

    _skipToReward() {
        if (this._skipped) return;
        this._skipped = true;
        this.tweens.killAll();
        this.time.removeAllEvents();
        this._clearCinematicObjects();
        this._showRewardUI();
    }

    _track(obj) {
        this._cinematicObjects.push(obj);
        return obj;
    }

    _checkLoot() {
        this.wonItem = LootManager.rollLoot();

        const progress = getProgress();
        let allDone = true;
        for (let i = 0; i < 5; i++) {
            if (!progress[i]) { allDone = false; break; }
        }
        if (allDone) {
            const reward = this.gameType === 'math' ? SPECIAL_REWARDS.MATH_ALL : SPECIAL_REWARDS.SPELLING_ALL;
            addToInventory(reward.id);
        }
    }

    _clearCinematicObjects() {
        for (const o of this._cinematicObjects) {
            if (o && o.active) o.destroy();
        }
        this._cinematicObjects = [];
    }

    // ─── Phase 1: Castle rises + fanfare (0 → 1.5s) ─────────────────────────

    _playPhase1() {
        this.cameras.main.fadeIn(500);
        audio.playFanfare();

        // Background stars
        for (let i = 0; i < 28; i++) {
            const gfx = this.add.graphics();
            gfx.fillStyle(0xffffff, 0.3 + Math.random() * 0.7);
            gfx.fillCircle(
                50 + Math.random() * 924,
                10 + Math.random() * 380,
                1 + Math.random() * 2,
            );
            this._track(gfx);
        }

        if (this.gameType === 'math') {
            this._drawMathTowers();
        } else {
            this._drawCastleTowers();
        }

        this.time.delayedCall(1500, () => { if (!this._skipped) this._playPhase2(); });
    }

    _drawCastleTowers() {
        const defs = [
            { x: 90,  w: 72, h: 240, targetY: 370 },
            { x: 262, w: 62, h: 210, targetY: 385 },
            { x: 434, w: 84, h: 270, targetY: 355 },
            { x: 606, w: 62, h: 210, targetY: 385 },
            { x: 778, w: 72, h: 240, targetY: 370 },
        ];

        defs.forEach((d, i) => {
            const gfx = this.add.graphics();
            gfx.fillStyle(0x1a0040, 1);
            gfx.fillRect(-d.w / 2, 0, d.w, d.h + 420);

            // 3 merlons (battlements)
            const mw  = Math.floor(d.w / 4);
            const gap = Math.floor(d.w / 3);
            for (let b = 0; b < 3; b++) {
                gfx.fillRect(-d.w / 2 + b * gap, -22, mw, 24);
            }

            // Window
            gfx.fillStyle(0x4433aa, 1);
            gfx.fillRect(-10, 35, 20, 28);

            gfx.x = d.x;
            gfx.y = 840;
            this._track(gfx);
            this._towers.push({ gfx, x: d.x, targetY: d.targetY });

            this.tweens.add({
                targets: gfx,
                y: d.targetY,
                duration: 800,
                delay: i * 100,
                ease: 'Back.Out',
            });
        });
    }

    _drawMathTowers() {
        // Ice crystal spires (stub — math game not yet implemented)
        const defs = [
            { x: 90,  w: 50, h: 220, targetY: 380 },
            { x: 262, w: 44, h: 200, targetY: 390 },
            { x: 434, w: 60, h: 250, targetY: 360 },
            { x: 606, w: 44, h: 200, targetY: 390 },
            { x: 778, w: 50, h: 220, targetY: 380 },
        ];

        defs.forEach((d, i) => {
            const gfx = this.add.graphics();
            gfx.fillStyle(0x88ccff, 0.8);
            gfx.fillTriangle(-d.w / 2, d.h, 0, 0, d.w / 2, d.h);
            gfx.fillRect(-(d.w / 3), d.h, (d.w * 2) / 3, 420);

            gfx.x = d.x;
            gfx.y = 840;
            this._track(gfx);
            this._towers.push({ gfx, x: d.x, targetY: d.targetY });

            this.tweens.add({
                targets: gfx,
                y: d.targetY,
                duration: 800,
                delay: i * 100,
                ease: 'Back.Out',
            });
        });
    }

    // ─── Phase 2: Gates burst open (1.5 → 3.5s) ─────────────────────────────

    _playPhase2() {
        const burstY = 505;

        this._towers.forEach((tower, i) => {
            this.time.delayedCall(i * 300, () => {
                if (this._skipped) return;

                // Portcullis icon
                const gateGfx = this.add.graphics();
                gateGfx.lineStyle(3, 0xffd700, 1);
                gateGfx.strokeRect(tower.x - 14, burstY - 26, 28, 26);
                for (let b = 0; b < 3; b++) {
                    gateGfx.lineBetween(
                        tower.x - 9 + b * 9, burstY - 26,
                        tower.x - 9 + b * 9, burstY,
                    );
                }
                this._track(gateGfx);

                this.tweens.add({
                    targets: gateGfx,
                    scaleX: 3,
                    scaleY: 3,
                    alpha: 0,
                    duration: 400,
                    ease: 'Quad.Out',
                    onComplete: () => { if (gateGfx.active) gateGfx.destroy(); },
                });

                this._spawnBurst(tower.x, burstY, 10, [0xffd700, 0xffaa00, 0xffffff, 0xff88cc]);
                audio.playGateUnlock();
            });
        });

        // "5 / 5 portes ouvertes !" label
        this.time.delayedCall(1600, () => {
            if (this._skipped) return;
            const label = this.add.text(512, 572, t('gatesOpened'), {
                fontSize: '28px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#ffd700',
                stroke: '#000',
                strokeThickness: 4,
            }).setOrigin(0.5).setAlpha(0);
            this._track(label);
            this.tweens.add({ targets: label, alpha: 1, duration: 400 });
        });

        this.time.delayedCall(2000, () => { if (!this._skipped) this._playPhase3(); });
    }

    _spawnBurst(cx, cy, count, colors) {
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = 50 + Math.random() * 40;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const p     = this.add.graphics();
            p.fillStyle(color, 1);
            p.fillCircle(0, 0, 3 + Math.random() * 3);
            p.x = cx;
            p.y = cy;
            this._track(p);
            this.tweens.add({
                targets: p,
                x: cx + Math.cos(angle) * speed,
                y: cy + Math.sin(angle) * speed,
                alpha: 0,
                duration: 500 + Math.random() * 200,
                ease: 'Quad.Out',
                onComplete: () => { if (p.active) p.destroy(); },
            });
        }
    }

    // ─── Phase 3: Jolyne dances (3.5 → 6s) ───────────────────────────────────

    _playPhase3() {
        const level = LEVELS[this.levelIndex];
        const cx    = 512;
        const cy    = 490;

        const jolyneGfx = this._makeJolyneGfx(cx, cy);
        jolyneGfx.x = -80; // start off-screen left
        jolyneGfx.setDepth(5);
        this._track(jolyneGfx);

        // Slide in to final position
        this.tweens.add({
            targets: jolyneGfx,
            x: cx,
            duration: 600,
            ease: 'Quad.Out',
        });

        // Celebratory bounce (continuous)
        this.tweens.add({
            targets: jolyneGfx,
            y: cy - 14,
            duration: 480,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.InOut',
        });

        // Crown sparkles (after Jolyne settles)
        this.time.delayedCall(700, () => {
            if (this._skipped) return;
            for (let i = 0; i < 6; i++) {
                const angle   = (i / 6) * Math.PI * 2;
                const orbitR  = 52;
                const sx      = cx + Math.cos(angle) * orbitR;
                const sy      = (cy - 72) + Math.sin(angle) * orbitR * 0.5;
                const sparkle = this.add.text(sx, sy, '✨', { fontSize: '16px' })
                    .setOrigin(0.5)
                    .setAlpha(0)
                    .setDepth(6);
                this._track(sparkle);
                this.tweens.add({
                    targets: sparkle,
                    alpha: 1,
                    scaleX: 1.25,
                    scaleY: 1.25,
                    duration: 300,
                    delay: i * 80,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.InOut',
                });
            }
        });

        // First letter of each word spirals outward
        this.time.delayedCall(900, () => {
            if (this._skipped) return;
            level.words.forEach((word, i) => {
                const angle = (i / level.words.length) * Math.PI * 2 - Math.PI / 2;
                const r     = 100;
                const tx    = cx + Math.cos(angle) * r;
                const ty    = cy + Math.sin(angle) * r * 0.6;

                const lTxt = this.add.text(cx, cy - 20, word[0], {
                    fontSize: '34px',
                    fontFamily: 'Arial Black, Arial, sans-serif',
                    color: '#ffd700',
                    stroke: '#000',
                    strokeThickness: 3,
                }).setOrigin(0.5).setAlpha(0).setScale(0).setDepth(6);
                this._track(lTxt);

                this.tweens.add({
                    targets: lTxt,
                    x: tx,
                    y: ty,
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 500,
                    delay: i * 150,
                    ease: 'Back.Out',
                });
            });
        });

        this.time.delayedCall(2500, () => { if (!this._skipped) this._playPhase4(); });
    }

    _makeJolyneGfx(cx, cy) {
        const equip    = getEquipment();
        const skinItem = ITEMS.find(i => i.id === (equip.skin ?? 'skin_default'));
        const img      = this.add.image(cx, cy, 'jojo_pixel').setDisplaySize(180, 180);
        if (skinItem?.tint) img.setTint(skinItem.tint);
        return img;
    }

    // ─── Phase 4: FÉLICITATIONS + stars + confetti (6 → 8.5s) ───────────────

    _playPhase4() {
        // Title
        const title = this.add.text(512, 88, t('congratulations'), {
            fontSize: '46px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 6,
        }).setOrigin(0.5).setScale(0).setDepth(10);
        this._track(title);
        this.tweens.add({ targets: title, scaleX: 1, scaleY: 1, duration: 500, ease: 'Back.Out' });

        // 5 stars, one by one
        for (let i = 0; i < 5; i++) {
            this.time.delayedCall(600 + i * 300, () => {
                if (this._skipped) return;
                const star = this.add.text(282 + i * 115, 158, '★', {
                    fontSize: '50px',
                    color: '#ffd700',
                }).setOrigin(0.5).setAlpha(0).setScale(0).setDepth(10);
                this._track(star);
                this.tweens.add({
                    targets: star,
                    alpha: 1,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    duration: 250,
                    ease: 'Back.Out',
                    onComplete: () => {
                        this.tweens.add({ targets: star, scaleX: 1, scaleY: 1, duration: 150 });
                    },
                });
                audio.playStarReveal(i);
            });
        }

        // Confetti shower
        const palette = [0xff6644, 0xffdd00, 0x44dd66, 0x4488ff, 0xff44aa, 0xaa44ff];
        for (let i = 0; i < 30; i++) {
            this.time.delayedCall(i * 60, () => {
                if (this._skipped) return;
                const conf = this.add.graphics();
                conf.fillStyle(palette[Math.floor(Math.random() * palette.length)], 1);
                conf.fillRect(-4, -8, 8, 16);
                conf.x     = 40 + Math.random() * 944;
                conf.y     = -20;
                conf.angle = Math.random() * 360;
                this._track(conf);
                this.tweens.add({
                    targets: conf,
                    y: 820,
                    angle: conf.angle + 180 + Math.random() * 180,
                    duration: 2000 + Math.random() * 1500,
                    ease: 'Linear',
                    onComplete: () => { if (conf.active) conf.destroy(); },
                });
            });
        }

        this.time.delayedCall(2500, () => { if (!this._skipped) this._showRewardUI(); });
    }

    // ─── Phase 5: Reward UI (persistent) ─────────────────────────────────────

    _showRewardUI() {
        this.input.off('pointerdown');
        this.tweens.killAll();
        this._clearCinematicObjects();

        audio.playVictory();

        this._startStarRain();
        this._drawJolyne(512, 370);

        const title = this.add.text(512, 120, '🎉 FÉLICITATIONS ! 🎉', {
            fontSize: '46px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 6,
        }).setOrigin(0.5).setScale(0);
        this.tweens.add({ targets: title, scaleX: 1, scaleY: 1, duration: 500, ease: 'Back.Out' });

        const level        = LEVELS[this.levelIndex];
        const subtitleText = this.gameType === 'math'
            ? t('mathVictorySubtitle')
            : t('masteredLevel', t(level.nameKey));
        const sub = this.add.text(512, 198, subtitleText, {
            fontSize: '24px',
            color: '#ffddff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5).setAlpha(0);
        this.tweens.add({ targets: sub, alpha: 1, duration: 500, delay: 400 });

        const starsRow = this.add.text(512, 636, '★ ★ ★ ★ ★', {
            fontSize: '52px',
            color: '#ffd700',
        }).setOrigin(0.5).setAlpha(0);
        this.tweens.add({ targets: starsRow, alpha: 1, duration: 500, delay: 700 });

        if (this.wonItem) {
            this.time.delayedCall(800, () => {
                this.scene.launch('RewardPopup', {
                    item:    this.wonItem,
                    onClose: () => this.scene.start('SpellingMenu'),
                });
            });
        } else {
            const btn = this.add.rectangle(512, 692, 290, 64, 0x006600, 1)
                .setInteractive()
                .setAlpha(0)
                .on('pointerover', () => btn.setFillStyle(0x009900))
                .on('pointerout',  () => btn.setFillStyle(0x006600))
                .on('pointerup',   () => this.scene.start('SpellingMenu'));

            const btnTxt = this.add.text(512, 692, t('chooseLevelBtn'), {
                fontSize: '28px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#ffffff',
                stroke: '#003300',
                strokeThickness: 4,
            }).setOrigin(0.5).setAlpha(0);

            this.tweens.add({ targets: [btn, btnTxt], alpha: 1, duration: 400, delay: 1000 });
            this.time.delayedCall(1400, () => {
                this.tweens.add({
                    targets: btn,
                    scaleX: 1.06,
                    scaleY: 1.06,
                    duration: 700,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.InOut',
                });
            });
        }
    }

    _startStarRain() {
        for (let i = 0; i < 20; i++) {
            this.time.delayedCall(i * 120, () => {
                const x    = 60 + Math.random() * 904;
                const icon = ['⭐', '✨', '🌟'][Math.floor(Math.random() * 3)];
                const star = this.add.text(x, -30, icon, {
                    fontSize: (24 + Math.random() * 24) + 'px',
                }).setAlpha(0.9);
                this.tweens.add({
                    targets: star,
                    y: 830,
                    duration: 2500 + Math.random() * 2000,
                    ease: 'Linear',
                    onComplete: () => star.destroy(),
                });
            });
        }
    }

    _drawJolyne(cx, cy) {
        const equip    = getEquipment();
        const skinItem = ITEMS.find(i => i.id === (equip.skin ?? 'skin_default'));
        const img      = this.add.image(cx, cy, 'jojo_pixel').setDisplaySize(180, 180);
        if (skinItem?.tint) img.setTint(skinItem.tint);

        this.tweens.add({
            targets: img,
            y: cy - 12,
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.InOut',
        });
    }
}
