import { Scene } from 'phaser';
import { t } from '../data/I18n.js';
import { audio } from '../systems/AudioManager.js';
import { getEquipment } from '../data/LevelData.js';
import { ITEMS } from '../data/ItemData.js';

const ENDING_SEEN_KEY = 'jolyne_ending_seen';

export class EndingScene extends Scene {
    constructor() {
        super('EndingScene');
    }

    create() {
        // Mark as seen immediately so a crash/refresh never re-triggers it
        localStorage.setItem(ENDING_SEEN_KEY, '1');

        this._autoTimer = null;

        this.cameras.main.setBackgroundColor(0x08001a);
        document.body.style.backgroundColor = '#08001a';

        this.cameras.main.fadeIn(800);

        this._drawBackground();
        this._startStarRain();

        // Phase 1 – title fades in (600ms)
        this.time.delayedCall(600, () => this._showTitle());

        // Phase 2 – Jolyne + subtitle (2200ms)
        this.time.delayedCall(2200, () => this._showJolyne());

        // Phase 3 – subtitle text (3200ms)
        this.time.delayedCall(3200, () => this._showSubtitle());

        // Phase 4 – "Retour" button (6000ms)
        this.time.delayedCall(6000, () => this._showButton());

        // Auto-return after 10 s
        this._autoTimer = this.time.delayedCall(10000, () => {
            this.scene.start('CollectionScene');
        });

        audio.playVictory();
    }

    // ── Background ────────────────────────────────────────────────────────────

    _drawBackground() {
        const { width, height } = this.cameras.main;

        // Deep purple → deep blue radial glow
        const g = this.add.graphics();
        const glows = [
            { x: width * 0.5,  y: height * 0.4,  r: 420, c: 0x2200aa, a: 0.18 },
            { x: width * 0.5,  y: height * 0.4,  r: 280, c: 0x4400cc, a: 0.14 },
            { x: width * 0.5,  y: height * 0.4,  r: 160, c: 0x6600ee, a: 0.10 },
            { x: width * 0.2,  y: height * 0.2,  r: 100, c: 0x0022aa, a: 0.07 },
            { x: width * 0.82, y: height * 0.75, r: 90,  c: 0x220088, a: 0.07 },
        ];
        glows.forEach(gl => {
            g.fillStyle(gl.c, gl.a);
            g.fillCircle(gl.x, gl.y, gl.r);
        });

        // Twinkling background stars
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = 0.5 + Math.random() * 2;
            const c = Math.random() < 0.3 ? 0xddbbff : 0xffffff;
            const s = this.add.circle(x, y, r, c, 0.2 + Math.random() * 0.6);
            this.tweens.add({
                targets: s,
                alpha: 0.05 + Math.random() * 0.1,
                duration: 1000 + Math.random() * 2500,
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 2000,
            });
        }
    }

    // ── Star rain (looping) ───────────────────────────────────────────────────

    _startStarRain() {
        const icons = ['⭐', '🌟', '✨'];
        const spawnOne = () => {
            if (!this.scene.isActive('EndingScene')) return;
            const x    = 40 + Math.random() * 944;
            const size = 20 + Math.random() * 30;
            const icon = icons[Math.floor(Math.random() * icons.length)];
            const s    = this.add.text(x, -(size + 10), icon, {
                fontSize: size + 'px',
            }).setOrigin(0.5, 0).setAlpha(0.85).setDepth(2);
            this.tweens.add({
                targets: s,
                y: 900,
                duration: 2800 + Math.random() * 2400,
                ease: 'Linear',
                onComplete: () => { if (s.active) s.destroy(); },
            });
        };

        // Initial burst of 25 stars
        for (let i = 0; i < 25; i++) {
            this.time.delayedCall(i * 150, spawnOne);
        }

        // Continuous drizzle every 400ms
        this.time.addEvent({
            delay: 400,
            loop: true,
            callback: spawnOne,
        });
    }

    // ── Phase 1: Title ────────────────────────────────────────────────────────

    _showTitle() {
        const title = this.add.text(512, 110, t('endingTitle'), {
            fontSize: '38px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 6,
            wordWrap: { width: 900 },
            align: 'center',
        }).setOrigin(0.5).setAlpha(0).setDepth(10);

        this.tweens.add({ targets: title, alpha: 1, duration: 700, ease: 'Quad.Out' });

        // Gentle floating animation
        this.time.delayedCall(700, () => {
            this.tweens.add({
                targets: title,
                y: 116,
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.InOut',
            });
        });
    }

    // ── Phase 2: Jolyne ───────────────────────────────────────────────────────

    _showJolyne() {
        const cx = 512;
        const cy = 400;

        const equip    = getEquipment();
        const skinItem = ITEMS.find(i => i.id === (equip.skin ?? 'skin_default'));
        const img      = this.add.image(cx, cy + 40, 'jojo_pixel')
            .setDisplaySize(220, 220)
            .setAlpha(0)
            .setDepth(5);
        if (skinItem?.tint) img.setTint(skinItem.tint);

        this.tweens.add({
            targets: img,
            alpha: 1,
            y: cy,
            duration: 700,
            ease: 'Back.Out',
        });

        // Continuous bounce
        this.time.delayedCall(700, () => {
            this.tweens.add({
                targets: img,
                y: cy - 14,
                duration: 600,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.InOut',
            });
        });

        // Crown sparkles around head
        this.time.delayedCall(900, () => {
            for (let i = 0; i < 6; i++) {
                const angle   = (i / 6) * Math.PI * 2;
                const orbitR  = 62;
                const sx      = cx + Math.cos(angle) * orbitR;
                const sy      = (cy - 88) + Math.sin(angle) * orbitR * 0.45;
                const sparkle = this.add.text(sx, sy, '✨', { fontSize: '16px' })
                    .setOrigin(0.5)
                    .setAlpha(0)
                    .setDepth(6);
                this.tweens.add({
                    targets: sparkle,
                    alpha: 1,
                    scaleX: 1.3,
                    scaleY: 1.3,
                    duration: 350,
                    delay: i * 90,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.InOut',
                });
            }
        });
    }

    // ── Phase 3: Subtitle ─────────────────────────────────────────────────────

    _showSubtitle() {
        const sub = this.add.text(512, 610, t('endingSubtitle'), {
            fontSize: '30px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffddff',
            stroke: '#000',
            strokeThickness: 4,
            wordWrap: { width: 860 },
            align: 'center',
        }).setOrigin(0.5).setAlpha(0).setScale(0.6).setDepth(10);

        this.tweens.add({
            targets: sub,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 600,
            ease: 'Back.Out',
        });
    }

    // ── Phase 4: Button ───────────────────────────────────────────────────────

    _showButton() {
        const btnY = 700;

        const btn = this.add.rectangle(512, btnY, 340, 62, 0x44006a, 1)
            .setInteractive({ useHandCursor: true })
            .setAlpha(0)
            .setDepth(15)
            .on('pointerover', () => btn.setFillStyle(0x6600aa))
            .on('pointerout',  () => btn.setFillStyle(0x44006a))
            .on('pointerup',   () => {
                if (this._autoTimer) this._autoTimer.remove();
                this.scene.start('CollectionScene');
            });

        const btnTxt = this.add.text(512, btnY, t('endingBtn'), {
            fontSize: '24px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#220044',
            strokeThickness: 4,
        }).setOrigin(0.5).setAlpha(0).setDepth(16);

        this.tweens.add({
            targets: [btn, btnTxt],
            alpha: 1,
            duration: 500,
        });

        // Pulse the button
        this.time.delayedCall(600, () => {
            this.tweens.add({
                targets: btn,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 800,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.InOut',
            });
        });
    }
}
