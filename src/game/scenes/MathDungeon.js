import { Scene } from 'phaser';
import { MATH_WORLDS } from '../data/MathWorldData.js';
import { getEquipment } from '../data/LevelData.js';
import { t } from '../data/I18n.js';

export class MathDungeon extends Scene {
    constructor() {
        super('MathDungeon');
        this.distance = 0;
        this.isWalking = true;
        this.encounterThreshold = 500;
        this.nextEncounter = 150;
        this.decorations = [];
    }

    init(data) {
        this.worldIndex  = data.worldIndex ?? 0;
        this.worldConfig = MATH_WORLDS[this.worldIndex];
        this.roundCount  = 0;
        this.totalRounds = Math.round(this.worldConfig.pointsNeeded / 200);
    }

    create() {
        const { width, height } = this.cameras.main;

        this.cameras.main.setBackgroundColor(this.worldConfig.skyTop);
        document.body.style.backgroundColor = '#' + this.worldConfig.skyTop.toString(16).padStart(6, '0');
        this._envObjects = [];

        this._parallaxOffset = 0;

        this._drawEnvironment(width, height);
        this._createParallaxLayers(width, height);

        this.lines = this.add.graphics().setScrollFactor(0).setDepth(1);

        this._createWorldParticles(width, height);

        this.worldGroup = this.add.group();

        this._drawArms(width, height);

        // Torch flame graphics (updated every frame)
        this.torchGfx = this.add.graphics().setScrollFactor(0).setDepth(7);

        this._createUI(width, height);

        this.distance = 0;
        this.nextEncounter = 450;
        this.isWalking = true;

        this.scale.on('resize', this._onResize, this);
        this.events.once('shutdown', () => this.scale.off('resize', this._onResize, this));

        // Entrance animation: stone door split overlay + zoom-out
        this._playEntranceAnimation(width, height);
    }

    _drawEnvironment(w, h) {
        // Destroy previous env objects on resize
        if (this._envObjects) {
            this._envObjects.forEach(o => { if (o?.active) o.destroy(); });
        }
        this._envObjects = [];

        const vanishingY = h * 0.5;
        const wc = this.worldConfig;
        const PAD = 800;

        const ceiling = this.add.graphics().setScrollFactor(0).setDepth(0);
        ceiling.fillGradientStyle(wc.skyTop, wc.skyTop, wc.skyBottom, wc.skyBottom, 1);
        ceiling.fillRect(-PAD, -PAD, w + PAD * 2, vanishingY + PAD);
        this._envObjects.push(ceiling);

        const floor = this.add.graphics().setScrollFactor(0).setDepth(0);
        floor.fillGradientStyle(wc.floorTop, wc.floorTop, wc.floorBottom, wc.floorBottom, 1);
        floor.fillRect(-PAD, vanishingY, w + PAD * 2, h - vanishingY + PAD);
        this._envObjects.push(floor);

        // Stone wall side panels
        const walls = this.add.graphics().setScrollFactor(0).setDepth(2);
        walls.fillStyle(0x111008, 1);
        walls.fillRect(-PAD, -PAD, w * 0.17 + PAD, h + PAD * 2);
        walls.fillRect(w * 0.83, -PAD, w * 0.17 + PAD, h + PAD * 2);

        // Brickwork texture on walls
        walls.lineStyle(1, 0x221a08, 0.55);
        for (let row = 0; row < Math.ceil(h / 42); row++) {
            const yy = row * 42;
            const xOff = (row % 2) * 22;
            for (let col = -1; col < 5; col++) {
                walls.strokeRect(xOff + col * 44, yy, 44, 42);
                walls.strokeRect(w * 0.83 + xOff + col * 44, yy, 44, 42);
            }
        }
        this._envObjects.push(walls);

        // Subtle corner darkness
        const corner = this.add.graphics().setScrollFactor(0).setDepth(3);
        corner.fillStyle(0x000000, 1);
        corner.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0.7, 0, 0.7, 0);
        corner.fillRect(-PAD, -PAD, w * 0.17 + PAD, h + PAD * 2);
        corner.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0, 0.7, 0, 0.7);
        corner.fillRect(w * 0.83, -PAD, w * 0.17 + PAD, h + PAD * 2);
        this._envObjects.push(corner);

        // Torch holders (static wall fixtures)
        const torchHolders = this.add.graphics().setScrollFactor(0).setDepth(6);
        torchHolders.fillStyle(0x3a2a10, 1);
        const lx = w * 0.175, rx = w * 0.825, ty = h * 0.36;
        torchHolders.fillRect(lx - 4, ty, 8, 20);
        torchHolders.fillRect(lx - 8, ty + 18, 16, 6);
        torchHolders.fillRect(rx - 4, ty, 8, 20);
        torchHolders.fillRect(rx - 8, ty + 18, 16, 6);
        this._envObjects.push(torchHolders);

        const fog = this.add.graphics().setScrollFactor(0).setDepth(4);
        const fc = wc.fogColor;
        fog.fillGradientStyle(fc, fc, fc, fc, 0, 0, 0.8, 0.8);
        fog.fillCircle(w / 2, vanishingY, 160);
        fog.setAlpha(0.35);
        this._envObjects.push(fog);
    }

    // ─── Parallax Layers (zoom-from-center approach) ─────────────────────────
    // Elements grow from the vanishing point toward the screen edges, giving a
    // true "moving forward through a corridor" perspective.

    _createParallaxLayers(w, h) {
        if (this._parallaxLayers) {
            this._parallaxLayers.forEach(l => { if (l?.gfx?.active) l.gfx.destroy(); });
        }
        // Preserve offset across resize so animation doesn't stutter
        if (this._parallaxOffset === undefined) this._parallaxOffset = 0;

        this._parallaxLayers = [
            { gfx: this.add.graphics().setScrollFactor(0).setDepth(0.5) },   // far
            { gfx: this.add.graphics().setScrollFactor(0).setDepth(1.5) },   // mid
            { gfx: this.add.graphics().setScrollFactor(0).setDepth(3.5) },   // near
        ];
    }

    /** Entrance animation: stone-door split + zoom-out over ~1 second */
    _playEntranceAnimation(w, h) {
        // Zoom starts at 1.3, zooms out to 1.0
        this.cameras.main.setZoom(1.3);
        this.tweens.add({
            targets: this.cameras.main,
            zoom: 1.0,
            duration: 900,
            ease: 'Quad.Out'
        });

        // Stone door overlay: two panels that slide apart, then disappear
        const topPanel = this.add.graphics().setScrollFactor(0).setDepth(500);
        topPanel.fillStyle(0x1a1208, 1);
        topPanel.fillRect(0, 0, w, h / 2 + 4);

        const bottomPanel = this.add.graphics().setScrollFactor(0).setDepth(500);
        bottomPanel.fillStyle(0x1a1208, 1);
        bottomPanel.fillRect(0, h / 2 - 4, w, h / 2 + 4);

        // Add a subtle stone-crack line where the doors meet
        topPanel.lineStyle(3, 0x3a2e1a, 0.7);
        topPanel.lineBetween(0, h / 2 + 2, w, h / 2 + 2);

        this.tweens.add({
            targets: topPanel,
            y: -(h / 2 + 4),
            duration: 800,
            ease: 'Cubic.In',
            delay: 80,
            onComplete: () => { if (topPanel.active) topPanel.destroy(); }
        });
        this.tweens.add({
            targets: bottomPanel,
            y: h,
            duration: 800,
            ease: 'Cubic.In',
            delay: 80,
            onComplete: () => { if (bottomPanel.active) bottomPanel.destroy(); }
        });
    }

    _createWorldParticles(w, h) {
        const type = this.worldConfig.particles;

        if (type === 'snow') {
            const snow = this.add.particles(0, 0, 'particle', {
                x: { min: 0, max: w },
                y: -10,
                lifespan: 5000,
                speedY: { min: 50, max: 150 },
                speedX: { min: -20, max: 20 },
                scale: { start: 0.1, end: 0.3 },
                alpha: { start: 0.6, end: 0 },
                frequency: 100,
                blendMode: 'ADD'
            });
            snow.setDepth(5).setScrollFactor(0);
        } else if (type === 'candy') {
            const candy = this.add.particles(0, 0, 'particle', {
                x: { min: 0, max: w },
                y: -10,
                lifespan: 3500,
                speedY: { min: 30, max: 80 },
                speedX: { min: -30, max: 30 },
                scale: { start: 0.25, end: 0.05 },
                alpha: { start: 0.9, end: 0 },
                frequency: 70,
                blendMode: 'ADD'
            });
            candy.setDepth(5).setScrollFactor(0);
        } else if (type === 'petal') {
            const petal = this.add.particles(0, 0, 'particle', {
                x: { min: 0, max: w },
                y: -10,
                lifespan: 7000,
                speedY: { min: 20, max: 50 },
                speedX: { min: -50, max: 50 },
                scale: { start: 0.15, end: 0.3 },
                alpha: { start: 0.7, end: 0 },
                frequency: 130,
                blendMode: 'ADD'
            });
            petal.setDepth(5).setScrollFactor(0);
        } else if (type === 'ember') {
            const ember = this.add.particles(0, 0, 'particle', {
                x: { min: 0, max: w },
                y: -10,
                lifespan: 3000,
                speedY: { min: 80, max: 200 },
                speedX: { min: -50, max: 50 },
                scale: { start: 0.18, end: 0.04 },
                alpha: { start: 1, end: 0 },
                frequency: 55,
                blendMode: 'ADD'
            });
            ember.setDepth(5).setScrollFactor(0);
        } else if (type === 'bubble') {
            const bubble = this.add.particles(0, h + 10, 'particle', {
                x: { min: 0, max: w },
                lifespan: 5000,
                speedY: { min: -100, max: -30 },
                speedX: { min: -15, max: 15 },
                scale: { start: 0.05, end: 0.2 },
                alpha: { start: 0.6, end: 0 },
                frequency: 100,
                blendMode: 'ADD'
            });
            bubble.setDepth(5).setScrollFactor(0);
        } else if (type === 'spark') {
            const spark = this.add.particles(0, 0, 'particle', {
                x: { min: 0, max: w },
                y: { min: 0, max: h },
                lifespan: 2500,
                speedY: { min: -40, max: 40 },
                speedX: { min: -40, max: 40 },
                scale: { start: 0.1, end: 0 },
                alpha: { start: 0.9, end: 0 },
                frequency: 45,
                blendMode: 'ADD'
            });
            spark.setDepth(5).setScrollFactor(0);
        }
    }

    _createUI(w, h) {
        // Round counter HUD (top-left)
        this.add.rectangle(95, 30, 176, 40, 0x000000, 0.55)
            .setDepth(199).setScrollFactor(0);

        this.roundText = this.add.text(14, 10, t('roundLabel', 0, this.totalRounds), {
            fontSize: '20px',
            fontFamily: 'Arial Black',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 3,
        }).setDepth(200).setScrollFactor(0);

        // World name badge top-centre
        this.worldNameText = this.add.text(w / 2, 12, t(this.worldConfig.nameKey), {
            fontSize: '20px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5, 0).setDepth(200).setScrollFactor(0);

        this.menuBtn = this.add.text(w - 14, 14, 'Menu', {
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#004488',
            padding: { x: 12, y: 6 }
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true }).setDepth(200).setScrollFactor(0);

        this.menuBtn.on('pointerup', () => this._showConfirmQuit());
    }

    _onResize() {
        const { width, height } = this.cameras.main;
        this._drawEnvironment(width, height);
        this._createParallaxLayers(width, height);
        if (this.worldNameText) this.worldNameText.setX(width / 2);
        if (this.menuBtn)       this.menuBtn.setX(width - 14);
    }

    _showConfirmQuit() {
        const { width, height } = this.cameras.main;
        const cx = width / 2, cy = height / 2;
        const elems = [];

        elems.push(this.add.rectangle(cx, cy, width, height, 0x000000, 0.78)
            .setDepth(300).setScrollFactor(0));

        const g = this.add.graphics().setDepth(301).setScrollFactor(0);
        g.fillStyle(0x1a0a2e, 0.97);
        g.fillRoundedRect(cx - 190, cy - 100, 380, 200, 18);
        g.lineStyle(4, 0x4488ff, 1);
        g.strokeRoundedRect(cx - 190, cy - 100, 380, 200, 18);
        elems.push(g);

        elems.push(this.add.text(cx, cy - 38, t('confirmQuit'), {
            fontSize: '28px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5).setDepth(302).setScrollFactor(0));

        const dismiss = () => elems.forEach(e => { if (e?.active) e.destroy(); });

        [
            { bx: cx - 80, color: 0x228822, key: 'confirmYes', fn: () => { dismiss(); this.scene.start('MathWorldSelectScene'); } },
            { bx: cx + 80, color: 0x882222, key: 'confirmNo',  fn: () => dismiss() },
        ].forEach(({ bx, color, key, fn }) => {
            const btn = this.add.rectangle(bx, cy + 38, 130, 52, color, 1)
                .setDepth(302).setScrollFactor(0)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => btn.setAlpha(0.8))
                .on('pointerout',  () => btn.setAlpha(1))
                .on('pointerup',   fn);
            elems.push(btn);
            elems.push(this.add.text(bx, cy + 38, t(key), {
                fontSize: '22px',
                fontFamily: 'Arial Black, Arial, sans-serif',
                color: '#fff',
                stroke: '#000',
                strokeThickness: 3,
            }).setOrigin(0.5).setDepth(303).setScrollFactor(0));
        });
    }

    _updateRoundHUD(newRound) {
        this.roundCount = newRound;
        this.roundText.setText(t('roundLabel', newRound, this.totalRounds));
    }

    update(time, delta) {
        this._updateTorches(time);

        // Update parallax layers even when idle (e.g. gentle ambient sway)
        this._updateParallaxLayers(delta);

        if (!this.isWalking) return;

        this.distance += delta * 0.35;

        this._updatePerspective();

        if (this.distance >= this.nextEncounter) {
            this._triggerEncounter();
        }

        this._animateArms(time);
    }

    _updateParallaxLayers(delta) {
        if (!this._parallaxLayers?.length) return;
        const { width, height } = this.cameras.main;
        const vY = height * 0.5;

        // Advance a shared loop counter (0–600) at walking speed
        const scrollDelta = this.isWalking ? delta * 0.35 : 0;
        const LOOP = 600;
        this._parallaxOffset = (this._parallaxOffset + scrollDelta) % LOOP;

        const wc   = this.worldConfig;
        const cL   = width * 0.17;          // corridor left edge
        const cR   = width * 0.83;          // corridor right edge
        const cW   = cR - cL;               // corridor width
        const FRAMES = 6;                   // concurrent expanding frames per layer

        const layerCfg = [
            { alphaBase: 0.18, lw: 1,   depth: 0.5 },
            { alphaBase: 0.30, lw: 1.5, depth: 1.5 },
            { alphaBase: 0.48, lw: 2,   depth: 3.5 },
        ];

        this._parallaxLayers.forEach((layer, idx) => {
            const gfx = layer.gfx;
            gfx.clear();
            const cfg = layerCfg[idx];

            for (let i = 0; i < FRAMES; i++) {
                // Each frame has a phase distributed evenly across [0,1),
                // offset by the layer index so layers are staggered.
                const raw = ((i / FRAMES) + this._parallaxOffset / LOOP + idx / 3) % 1;

                // Perspective foreshortening: use a power curve so frames accelerate
                // as they "approach" the viewer.
                const phase = Math.pow(raw, 1.6);

                // Fade in at birth, fade out at death
                const alpha = raw < 0.12 ? raw / 0.12
                            : raw > 0.78 ? (1 - raw) / 0.22
                            : 1;
                if (alpha < 0.02 || phase < 0.01) continue;

                // Frame expands from vanishing point to full corridor size
                const fw = cW   * phase;
                const fh = height * phase;
                const fx = width / 2 - fw / 2;
                const fy = vY   - fh / 2;

                gfx.lineStyle(cfg.lw, wc.gridColor, alpha * cfg.alphaBase);
                gfx.strokeRect(fx, fy, fw, fh);

                // Near layer: add subtle corner darkening for depth
                if (idx === 2 && phase > 0.6) {
                    const darkness = (phase - 0.6) / 0.4 * 0.12 * alpha;
                    gfx.fillStyle(0x000000, darkness);
                    gfx.fillRect(fx - 4, fy, 4, fh);
                    gfx.fillRect(fx + fw, fy, 4, fh);
                }
            }
        });
    }

    _updateTorches(time) {
        if (!this.torchGfx) return;
        const { width, height } = this.cameras.main;

        // Multi-frequency sine flicker — three overlapping sine waves give an
        // organic, non-repeating feel without any random jumps.
        const f1 = Math.sin(time * 0.011) * 0.30;   // slow primary sway
        const f2 = Math.sin(time * 0.019) * 0.18;   // medium flutter
        const f3 = Math.sin(time * 0.047) * 0.09;   // fast micro-flicker
        const flicker = f1 + f2 + f3 + 0.72;         // range ≈ 0.15 – 1.29, centred ~0.72

        // Left and right torches flicker slightly out of phase with each other.
        const f1R = Math.sin(time * 0.011 + 1.2) * 0.30;
        const f2R = Math.sin(time * 0.019 + 0.6) * 0.18;
        const f3R = Math.sin(time * 0.047 + 2.1) * 0.09;
        const flickerR = f1R + f2R + f3R + 0.72;

        const r  = 18 + flicker  * 10;
        const rR = 18 + flickerR * 10;

        const lx = width * 0.175;
        const rx = width * 0.825;
        const ty = height * 0.345;

        // Subtle lateral sway of the flame tip
        const swayL = Math.sin(time * 0.013) * 3;
        const swayR = Math.sin(time * 0.013 + 1.0) * 3;

        this.torchGfx.clear();

        // ── Wide warm wall-glow (pulsed by flicker) ──────────────────────────
        // Left glow — two concentric circles to simulate light fall-off
        this.torchGfx.fillStyle(0xff8800, Math.min(0.18, 0.14 * flicker));
        this.torchGfx.fillCircle(lx, ty, r * 4.2);
        this.torchGfx.fillStyle(0xff6600, Math.min(0.28, 0.22 * flicker));
        this.torchGfx.fillCircle(lx, ty, r * 2.2);

        // Right glow
        this.torchGfx.fillStyle(0xff8800, Math.min(0.18, 0.14 * flickerR));
        this.torchGfx.fillCircle(rx, ty, rR * 4.2);
        this.torchGfx.fillStyle(0xff6600, Math.min(0.28, 0.22 * flickerR));
        this.torchGfx.fillCircle(rx, ty, rR * 2.2);

        // ── Outer flame (orange ellipse) ──────────────────────────────────────
        this.torchGfx.fillStyle(0xff5500, Math.min(1, 0.78 * flicker));
        this.torchGfx.fillEllipse(lx + swayL, ty - r * 0.3, r * 1.15, r * 2.0);
        this.torchGfx.fillStyle(0xff5500, Math.min(1, 0.78 * flickerR));
        this.torchGfx.fillEllipse(rx + swayR, ty - rR * 0.3, rR * 1.15, rR * 2.0);

        // ── Middle flame (amber) ───────────────────────────────────────────────
        this.torchGfx.fillStyle(0xff9900, Math.min(1, 0.88 * flicker));
        this.torchGfx.fillEllipse(lx + swayL * 0.6, ty - r * 0.55, r * 0.75, r * 1.45);
        this.torchGfx.fillStyle(0xff9900, Math.min(1, 0.88 * flickerR));
        this.torchGfx.fillEllipse(rx + swayR * 0.6, ty - rR * 0.55, rR * 0.75, rR * 1.45);

        // ── Inner flame (yellow) ──────────────────────────────────────────────
        this.torchGfx.fillStyle(0xffdd00, Math.min(1, 0.92 * flicker));
        this.torchGfx.fillEllipse(lx + swayL * 0.3, ty - r * 0.7, r * 0.55, r * 1.1);
        this.torchGfx.fillStyle(0xffdd00, Math.min(1, 0.92 * flickerR));
        this.torchGfx.fillEllipse(rx + swayR * 0.3, ty - rR * 0.7, rR * 0.55, rR * 1.1);

        // ── White-hot core ────────────────────────────────────────────────────
        this.torchGfx.fillStyle(0xffffff, Math.min(0.95, 0.65 * flicker));
        this.torchGfx.fillCircle(lx, ty - r * 0.7, r * 0.24);
        this.torchGfx.fillStyle(0xffffff, Math.min(0.95, 0.65 * flickerR));
        this.torchGfx.fillCircle(rx, ty - rR * 0.7, rR * 0.24);
    }

    _updatePerspective() {
        const { width, height } = this.cameras.main;
        const vX = width / 2;
        const bob = this.isWalking ? Math.sin(this.distance * 0.08) * 6 : 0;
        const vY = height * 0.5 + bob;
        const gc = this.worldConfig.gridColor;

        this.lines.clear();

        // Corner rays to vanishing point
        this.lines.lineStyle(2, gc, 0.2);
        this.lines.lineBetween(0, 0, vX, vY);
        this.lines.lineBetween(width, 0, vX, vY);
        this.lines.lineBetween(0, height, vX, vY);
        this.lines.lineBetween(width, height, vX, vY);

        // Receding depth rectangles
        const offset = (this.distance % 150) / 150;
        for (let i = 0; i < 8; i++) {
            const z = i - offset;
            if (z <= 0) continue;
            const scale = 1 / z;
            const rw = width * scale;
            const rh = height * scale;
            if (rw < 5000) {
                this.lines.lineStyle(1.5, gc, 0.3 * (1 - i / 8));
                this.lines.strokeRect(vX - rw / 2, vY - rh / 2, rw, rh);
            }
        }

        // Scrolling floor grid lines (give sense of forward movement)
        const floorOffset = (this.distance % 80) / 80;
        for (let i = 0; i < 8; i++) {
            const zFrac = (i + floorOffset) / 8;
            const y = vY + (height - vY) * zFrac;
            if (y > vY && y <= height) {
                this.lines.lineStyle(1, gc, 0.14 * (1 - zFrac * 0.6));
                this.lines.lineBetween(0, y, width, y);
            }
        }

        // Scrolling ceiling grid lines (mirror of floor)
        for (let i = 0; i < 6; i++) {
            const zFrac = (i + floorOffset) / 6;
            const y = vY - vY * zFrac;
            if (y < vY && y >= 0) {
                this.lines.lineStyle(1, gc, 0.10 * (1 - zFrac * 0.6));
                this.lines.lineBetween(0, y, width, y);
            }
        }
    }

    _drawArms(w, h) {
        const equip = getEquipment();

        this.magicTrail = this.add.particles(0, 0, 'particle', {
            speed: { min: 20, max: 60 },
            scale: { start: 0.4, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 800,
            blendMode: 'ADD',
            frequency: 20,
            follow: null
        }).setScrollFactor(0);

        // Left arm
        this.teddyArm = this.add.container(w * 0.2, h * 0.85).setScrollFactor(0);
        const leftG = this.add.graphics();
        if (equip.item_left === 'item_L_shield') {
            this._drawShield(leftG);
        } else if (equip.item_left === 'item_L_magic') {
            this._drawMagicGlove(leftG);
        } else if (equip.item_left === 'item_L_umbrella') {
            this._drawUmbrella(leftG);
        } else if (equip.item_left === 'item_L_flower') {
            this._drawFlowerBouquet(leftG);
        } else {
            this._drawDetailedTeddy(leftG);
        }
        this.teddyArm.add(leftG);
        this.teddyArm.setDepth(150);

        // Right arm
        this.wandArm = this.add.container(w * 0.8, h * 0.85).setScrollFactor(0);
        const rightG = this.add.graphics();
        const showWand = !equip.item_right || equip.item_right === 'item_R_wand';
        if (equip.item_right === 'item_R_sword') {
            this._drawSword(rightG);
        } else if (equip.item_right === 'item_R_candy') {
            this._drawCandyCane(rightG);
        } else if (equip.item_right === 'item_R_icecream') {
            this._drawIceCream(rightG);
        } else {
            this._drawDetailedWand(rightG);
        }
        this.wandArm.add(rightG);
        this.wandArm.setDepth(150);

        if (showWand) {
            this.magicTrail.startFollow(this.wandArm, 0, -180);
        }
    }

    _drawShield(g) {
        // Shadow
        g.fillStyle(0x3d1a00, 0.5);
        g.beginPath();
        g.moveTo(-52, -68);
        g.lineTo(57, -68);
        g.lineTo(57, 33);
        g.lineTo(2, 83);
        g.lineTo(-52, 33);
        g.closePath();
        g.fillPath();

        // Main body
        g.fillStyle(0x8b4513, 1);
        g.beginPath();
        g.moveTo(-55, -70);
        g.lineTo(55, -70);
        g.lineTo(55, 30);
        g.lineTo(0, 80);
        g.lineTo(-55, 30);
        g.closePath();
        g.fillPath();

        // Inner panel
        g.fillStyle(0xcd853f, 1);
        g.beginPath();
        g.moveTo(-38, -55);
        g.lineTo(38, -55);
        g.lineTo(38, 22);
        g.lineTo(0, 60);
        g.lineTo(-38, 22);
        g.closePath();
        g.fillPath();

        // Decorative cross
        g.fillStyle(0xffd700, 1);
        g.fillRect(-5, -50, 10, 115);
        g.fillRect(-38, -8, 76, 10);

        // Boss (center knob)
        g.fillStyle(0xffd700, 1);
        g.fillCircle(0, 0, 14);
        g.fillStyle(0xffee88, 1);
        g.fillCircle(-3, -3, 5);

        // Rim
        g.lineStyle(4, 0x5d2e0c, 1);
        g.beginPath();
        g.moveTo(-55, -70);
        g.lineTo(55, -70);
        g.lineTo(55, 30);
        g.lineTo(0, 80);
        g.lineTo(-55, 30);
        g.closePath();
        g.strokePath();
    }

    _drawMagicGlove(g) {
        // Purple glove base
        g.fillStyle(0x6a0dad, 1);
        g.fillEllipse(0, 20, 110, 150);

        // Fingers
        g.fillStyle(0x7b14c4, 1);
        for (let i = 0; i < 4; i++) {
            g.fillRoundedRect(-44 + i * 28, -70, 22, 60, 10);
        }
        // Thumb
        g.fillRoundedRect(-62, -40, 22, 50, 10);

        // Magic runes on back
        g.lineStyle(2, 0xff88ff, 0.8);
        g.strokeCircle(0, 30, 28);
        g.lineStyle(2, 0xffccff, 0.6);
        g.lineBetween(-20, 10, 20, 50);
        g.lineBetween(20, 10, -20, 50);

        // Glow sparkles
        g.fillStyle(0xff88ff, 0.9);
        g.fillCircle(-30, -80, 7);
        g.fillCircle(35, -90, 5);
        g.fillCircle(0, -100, 9);
    }

    _drawSword(g) {
        // Blade
        g.fillStyle(0xaaaaaa, 1);
        g.fillTriangle(-10, -60, 10, -60, 0, -200);
        g.fillRect(-10, -60, 20, 120);

        // Blade edge highlights
        g.fillStyle(0xeeeeee, 1);
        g.fillTriangle(-2, -60, 4, -60, 0, -195);
        g.fillRect(-2, -60, 6, 120);

        // Crossguard
        g.fillStyle(0xffd700, 1);
        g.fillRect(-50, 55, 100, 18);
        g.fillCircle(-50, 64, 10);
        g.fillCircle(50, 64, 10);

        // Handle
        g.fillStyle(0x5d2e0c, 1);
        g.fillRect(-12, 73, 24, 80);

        // Handle wrapping
        g.lineStyle(3, 0x3d1a00, 0.7);
        for (let i = 0; i < 5; i++) {
            g.lineBetween(-12, 80 + i * 14, 12, 80 + i * 14);
        }

        // Pommel
        g.fillStyle(0xffd700, 1);
        g.fillCircle(0, 160, 16);
        g.fillStyle(0xffee88, 1);
        g.fillCircle(-4, 156, 6);
    }

    _drawDetailedTeddy(g) {
        g.fillStyle(0x5d2e0c, 1);
        g.fillEllipse(5, 5, 130, 170);

        g.fillStyle(0x8b4513, 1);
        g.fillEllipse(0, 0, 130, 170);

        g.fillStyle(0xa0522d, 1);
        g.fillCircle(-40, -60, 45);
        g.lineStyle(3, 0x5d2e0c, 1);
        g.strokeCircle(-40, -60, 45);

        g.fillStyle(0xcd853f, 0.4);
        g.fillCircle(-30, -70, 15);

        g.fillStyle(0x8b4513, 1);
        g.fillCircle(-75, -95, 22);
        g.fillCircle(-5, -95, 22);

        g.fillStyle(0x000000, 1);
        g.fillCircle(-55, -65, 6);
        g.fillCircle(-25, -65, 6);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(-57, -67, 2);
        g.fillCircle(-27, -67, 2);
    }

    _drawDetailedWand(g) {
        g.fillStyle(0xbb8a6a, 1);
        g.fillCircle(5, 5, 45);
        g.fillStyle(0xffe4b5, 1);
        g.fillCircle(0, 0, 45);

        g.fillStyle(0x2b1e1e, 1);
        g.fillRect(-3, -160, 12, 160);
        g.fillStyle(0x4b2e1e, 1);
        g.fillRect(-6, -160, 10, 160);

        g.fillStyle(0xffa500, 1);
        this._drawStar(g, 0, -170, 5, 45, 20);
        g.fillStyle(0xffd700, 1);
        this._drawStar(g, -2, -172, 5, 40, 18);
    }

    _drawStar(graphics, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;
        graphics.beginPath();
        graphics.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            graphics.lineTo(x, y);
            rot += step;
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            graphics.lineTo(x, y);
            rot += step;
        }
        graphics.lineTo(cx, cy - outerRadius);
        graphics.closePath();
        graphics.fillPath();
    }

    _drawCandyCane(g) {
        // Red-and-white striped cane
        const colors = [0xffffff, 0xdd1111];
        const stripeH = 22;
        for (let i = 0; i < 8; i++) {
            g.fillStyle(colors[i % 2], 1);
            g.fillRect(-14, -80 + i * stripeH, 28, stripeH);
        }
        // Curved hook (top) — white base
        g.fillStyle(0xffffff, 1);
        g.fillRect(-14, -80, 60, 28);
        g.fillRect(32, -80, 28, 55);
        // Red stripes on hook
        g.fillStyle(0xdd1111, 1);
        g.fillRect(-14, -80, 60, 11);
        g.fillRect(32, -80, 28, 11);
        g.fillRect(32, -47, 28, 11);
        // Candy shine
        g.fillStyle(0xffffff, 0.6);
        g.fillRect(-8, -78, 6, 150);
        // Tip star
        g.fillStyle(0xffdddd, 1);
        g.fillCircle(46, -52, 8);
    }

    _drawUmbrella(g) {
        // Handle
        g.fillStyle(0x5d2e0c, 1);
        g.fillRect(-6, 60, 12, 100);
        // Hook at bottom
        g.fillStyle(0x5d2e0c, 1);
        g.fillRect(-6, 155, 30, 10);
        g.fillCircle(26, 160, 12);
        // Canopy — rainbow stripes
        const canopyColors = [0xff4444, 0xff9900, 0xffee00, 0x44ee44, 0x44aaff, 0xaa44ff, 0xff44cc];
        for (let i = 0; i < 7; i++) {
            const angle1 = (i / 7) * Math.PI;
            const angle2 = ((i + 1) / 7) * Math.PI;
            const r = 90;
            g.fillStyle(canopyColors[i], 1);
            g.beginPath();
            g.moveTo(0, 20);
            g.lineTo(Math.cos(Math.PI - angle1) * r, 20 - Math.sin(angle1) * 55);
            g.lineTo(Math.cos(Math.PI - angle2) * r, 20 - Math.sin(angle2) * 55);
            g.closePath();
            g.fillPath();
        }
        // Canopy border
        g.lineStyle(3, 0xffffff, 0.5);
        g.beginPath();
        for (let a = 0; a <= Math.PI; a += 0.1) {
            const x = Math.cos(Math.PI - a) * 90;
            const y = 20 - Math.sin(a) * 55;
            if (a === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.strokePath();
        // Top tip
        g.fillStyle(0xffd700, 1);
        g.fillCircle(0, -37, 8);
    }

    _drawFlowerBouquet(g) {
        // Stems
        g.lineStyle(4, 0x228822, 1);
        g.lineBetween(0, 80, -20, -20);
        g.lineBetween(0, 80, 0, -30);
        g.lineBetween(0, 80, 20, -15);
        // Flowers
        const petals = [
            { cx: -20, cy: -20, c: 0xff88cc },
            { cx: 0,   cy: -30, c: 0xff4488 },
            { cx: 20,  cy: -15, c: 0xff99dd },
        ];
        petals.forEach(p => {
            for (let i = 0; i < 5; i++) {
                const a = (i / 5) * Math.PI * 2;
                g.fillStyle(p.c, 1);
                g.fillCircle(p.cx + Math.cos(a) * 16, p.cy + Math.sin(a) * 16, 12);
            }
            g.fillStyle(0xffee00, 1);
            g.fillCircle(p.cx, p.cy, 10);
        });
        // Handle
        g.fillStyle(0x88ee44, 1);
        g.fillRoundedRect(-10, 60, 20, 60, 6);
        g.lineStyle(2, 0xffd700, 1);
        g.strokeRoundedRect(-10, 60, 20, 60, 6);
    }

    _drawIceCream(g) {
        // Stick / cone handle
        g.fillStyle(0xf4a460, 1);
        g.fillTriangle(-20, 30, 20, 30, 0, 120);
        // Cone lines
        g.lineStyle(2, 0xc8862b, 0.7);
        g.lineBetween(-10, 50, 0, 120);
        g.lineBetween(10, 50, 0, 120);
        g.lineBetween(-20, 30, 20, 30);
        g.lineBetween(-17, 45, 17, 45);
        g.lineBetween(-12, 65, 12, 65);
        // Scoop 1 (bottom)
        g.fillStyle(0xffcc99, 1);
        g.fillCircle(0, 0, 38);
        g.fillStyle(0xffddbb, 0.6);
        g.fillCircle(-8, -8, 18);
        // Scoop 2 (middle)
        g.fillStyle(0xff88cc, 1);
        g.fillCircle(0, -55, 32);
        g.fillStyle(0xffaadd, 0.6);
        g.fillCircle(-6, -62, 14);
        // Scoop 3 (top)
        g.fillStyle(0x99ddff, 1);
        g.fillCircle(5, -105, 26);
        g.fillStyle(0xbbeeFF, 0.6);
        g.fillCircle(-2, -112, 11);
        // Cherry on top
        g.fillStyle(0xdd0000, 1);
        g.fillCircle(5, -134, 10);
        g.lineStyle(2, 0x228822, 1);
        g.lineBetween(5, -134, 14, -148);
        // Sprinkles
        const sprinkleColors = [0xff4444, 0x44ff88, 0x4488ff, 0xffee00];
        [[-8, -20], [12, -8], [-5, 10], [16, -35], [-14, -45]].forEach(([sx, sy], i) => {
            g.fillStyle(sprinkleColors[i % sprinkleColors.length], 1);
            g.fillRect(sx - 3, sy - 1, 8, 3);
        });
    }

    _animateArms(time) {
        const { width, height } = this.cameras.main;
        // Walking: arms swing in opposite phase; idle: gentle bob only
        const walk = Math.sin(this.distance * 0.09);
        const swingX = this.isWalking ? walk * 22 : Math.sin(time / 1400) * 6;
        const swingY = this.isWalking
            ? Math.abs(walk) * 14 + Math.cos(time / 800) * 4
            : Math.cos(time / 1000) * 6;

        this.wandArm.x  = width  * 0.82 + swingX;
        this.wandArm.y  = height * 0.88 + swingY + (this.isWalking ? -walk * 10 : 0);

        this.teddyArm.x = width  * 0.18 - swingX;
        this.teddyArm.y = height * 0.88 + swingY + (this.isWalking ?  walk * 10 : 0);
    }

    _triggerEncounter() {
        this.isWalking = false;
        const type = Math.random() > 0.3 ? 'monster' : 'chest';
        if (type === 'monster') this._spawnMonster();
        else this._spawnChest();
    }

    _spawnMonster() {
        const { width, height } = this.cameras.main;
        const monsters = this.worldConfig.monsters;
        const name = monsters[Math.floor(Math.random() * monsters.length)];

        // Depth 9: above all environment layers (parallax 0.5/1.5/3.5, fog 4, particles 5,
        // torchHolders 6, torchGfx 7) but below arms (150) and HUD (200+)
        const container = this.add.container(width / 2, height / 2).setScale(0.01).setScrollFactor(0).setDepth(9);

        // Perspective ground shadow — larger ellipse at floor level for depth feel
        const groundShadow = this.add.ellipse(0, 120, 220, 55, 0x000000, 0.35);
        container.add(groundShadow);

        const shadow = this.add.ellipse(0, 80, 120, 40, 0x000000, 0.2);
        container.add(shadow);

        const g = this.add.graphics();
        this._drawDetailedMonster(g, name);
        container.add(g);

        const title = this.add.text(0, -160, t(name), {
            fontSize: '44px',
            color: '#ffffff',
            stroke: '#004488',
            strokeThickness: 6,
            fontFamily: 'Arial Black'
        }).setOrigin(0.5);
        container.add(title);

        this.tweens.add({
            targets: container,
            scale: 1.5,
            duration: 2000,
            ease: 'Cubic.Out',
            onComplete: () => {
                this.scene.pause();
                this.scene.launch('MathProblemScene', {
                    numMax:    this.worldConfig.numMax,
                    operation: this.worldConfig.operation ?? 'add',
                    monsterName: name,
                    onSuccess: () => {
                        const newRound = this.roundCount + 1;
                        this._updateRoundHUD(newRound);
                        if (newRound >= this.totalRounds) {
                            this._triggerWorldComplete();
                        } else {
                            this._handleMonsterDefeat(container);
                        }
                    }
                });
            }
        });
    }

    _drawDetailedMonster(g, name) {
        const kawaiiEye = (cx, cy, rs, ri, rp, irisColor) => {
            g.fillStyle(0xffffff, 1); g.fillCircle(cx, cy, rs);
            g.fillStyle(irisColor, 1); g.fillCircle(cx, cy, ri);
            g.fillStyle(0x111111, 1); g.fillCircle(cx, cy, rp);
            g.fillStyle(0xffffff, 1); g.fillCircle(cx - rp * 0.35, cy - rp * 0.35, Math.max(2, rp * 0.4));
        };
        const smile = (cx, cy, r, a1, a2) => {
            g.lineStyle(3, 0x333333, 1);
            g.beginPath(); g.arc(cx, cy, r, a1, a2, false); g.strokePath();
        };

        if (name === 'monster_snowman') {
            g.fillStyle(0xeeeeee, 1); g.fillCircle(0, 50, 60);
            g.fillStyle(0xffffff, 1); g.fillCircle(0, 50, 52);
            g.fillStyle(0xeeeeee, 1); g.fillCircle(0, -30, 50);
            g.fillStyle(0xffffff, 1); g.fillCircle(0, -30, 44);
            g.fillStyle(0x222233, 1); g.fillRect(-18, -82, 36, 9);
            g.fillStyle(0x222233, 1); g.fillRect(-11, -96, 22, 16);
            g.fillStyle(0xff4444, 1); g.fillRect(-46, 8, 92, 13);
            g.fillStyle(0xdd2222, 1); g.fillRect(-46, 19, 18, 7);
            kawaiiEye(-18, -42, 14, 9, 5, 0x222233);
            kawaiiEye(18, -42, 14, 9, 5, 0x222233);
            g.fillStyle(0xff8800, 1); g.fillTriangle(0, -33, 0, -27, 20, -30);
            smile(0, -22, 12, 0.2, Math.PI - 0.2);
            g.fillStyle(0x333344, 1); g.fillCircle(0, 28, 5); g.fillCircle(0, 45, 5); g.fillCircle(0, 60, 5);

        } else if (name === 'monster_ice_golem') {
            g.fillStyle(0x5baad5, 1); g.fillRoundedRect(-55, -80, 110, 165, 20);
            g.fillStyle(0x7dcbf0, 1); g.fillRoundedRect(-38, -65, 76, 130, 14);
            g.fillStyle(0xaaeeff, 1); g.fillTriangle(0, -95, -12, -78, 12, -78);
            g.fillStyle(0xddf6ff, 0.7); g.fillTriangle(0, -90, -6, -78, 6, -78);
            g.fillStyle(0xaaeeff, 0.8); g.fillTriangle(-60, -50, -80, -62, -60, -35);
            g.fillStyle(0xaaeeff, 0.8); g.fillTriangle(60, -50, 80, -62, 60, -35);
            kawaiiEye(-20, -40, 16, 10, 6, 0x00ccff);
            kawaiiEye(20, -40, 16, 10, 6, 0x00ccff);
            smile(0, -24, 10, 0.2, Math.PI - 0.2);
            g.fillStyle(0x7dcbf0, 1); g.fillCircle(-30, 88, 7); g.fillCircle(0, 92, 8); g.fillCircle(30, 88, 7);

        } else if (name === 'monster_polar_bear') {
            g.fillStyle(0xf0f0f0, 1); g.fillEllipse(0, 28, 140, 100);
            g.fillStyle(0xffffff, 1); g.fillEllipse(0, 30, 120, 84);
            g.fillStyle(0xf0f0f0, 1); g.fillCircle(0, -42, 55);
            g.fillStyle(0xffffff, 1); g.fillCircle(0, -42, 48);
            g.fillStyle(0xf0f0f0, 1); g.fillCircle(-42, -88, 16); g.fillCircle(42, -88, 16);
            g.fillStyle(0xffbbcc, 1); g.fillCircle(-42, -88, 9); g.fillCircle(42, -88, 9);
            kawaiiEye(-20, -50, 16, 10, 6, 0x4488aa);
            kawaiiEye(20, -50, 16, 10, 6, 0x4488aa);
            g.fillStyle(0xffaacc, 1); g.fillEllipse(0, -30, 22, 14);
            g.fillStyle(0xff88aa, 1); g.fillCircle(0, -30, 5);
            smile(0, -20, 10, 0.2, Math.PI - 0.2);

        } else if (name === 'monster_lollipop') {
            g.fillStyle(0xffffff, 1); g.fillRect(-5, 5, 10, 115);
            g.fillStyle(0xff4444, 1);
            for (let i = 0; i < 5; i++) g.fillRect(-5, 5 + i * 22, 10, 10);
            g.fillStyle(0xff88cc, 1); g.fillCircle(0, -55, 65);
            g.fillStyle(0xff66bb, 1); g.fillCircle(0, -55, 58);
            g.lineStyle(6, 0xffffff, 0.7); g.beginPath();
            for (let a = 0; a < Math.PI * 2.5; a += 0.12) {
                const r = a * 8, px = Math.cos(a) * r, py = Math.sin(a) * r - 55;
                if (a === 0) g.moveTo(px, py); else g.lineTo(px, py);
            }
            g.strokePath();
            g.fillStyle(0xff2266, 1);
            g.fillCircle(30, -78, 7); g.fillCircle(38, -78, 7);
            g.fillTriangle(27, -73, 41, -73, 34, -65);
            kawaiiEye(-20, -65, 14, 8, 4, 0x993366);
            kawaiiEye(20, -65, 14, 8, 4, 0x993366);
            smile(0, -48, 10, 0.2, Math.PI - 0.2);

        } else if (name === 'monster_teddy') {
            g.fillStyle(0xffcc99, 0.5); g.fillEllipse(0, 38, 55, 65);
            g.fillStyle(0xff8855, 1); g.fillEllipse(0, 30, 100, 110);
            g.fillStyle(0xff8855, 1); g.fillCircle(0, -45, 55);
            g.fillStyle(0xff8855, 1); g.fillCircle(-44, -85, 22); g.fillCircle(44, -85, 22);
            g.fillStyle(0xffbbaa, 1); g.fillCircle(-44, -85, 12); g.fillCircle(44, -85, 12);
            kawaiiEye(-20, -52, 18, 12, 7, 0x884422);
            kawaiiEye(20, -52, 18, 12, 7, 0x884422);
            g.fillStyle(0xffcc99, 1); g.fillEllipse(0, -34, 40, 24);
            g.fillStyle(0xff9977, 1); g.fillCircle(0, -38, 6);
            smile(0, -26, 11, 0.2, Math.PI - 0.2);

        } else if (name === 'monster_candy_cane') {
            g.fillStyle(0xffffff, 1); g.fillRoundedRect(-20, -65, 40, 155, 10);
            g.fillStyle(0xee1111, 1);
            for (let i = 0; i < 6; i++) g.fillRect(-20, -65 + i * 26, 40, 12);
            g.fillStyle(0xffffff, 1); g.fillRoundedRect(-20, -90, 62, 32, 12);
            g.fillStyle(0xee1111, 1); g.fillRect(-20, -90, 62, 12);
            g.fillStyle(0xff44aa, 1);
            g.fillTriangle(-22, -58, -8, -72, -8, -58);
            g.fillTriangle(8, -58, 8, -72, 22, -58);
            g.fillStyle(0xff66cc, 1); g.fillCircle(0, -65, 6);
            kawaiiEye(-8, 30, 12, 7, 3, 0xaa2244);
            kawaiiEye(8, 30, 12, 7, 3, 0xaa2244);
            smile(0, 44, 8, 0.2, Math.PI - 0.2);

        } else if (name === 'monster_bee') {
            g.fillStyle(0xcceeff, 0.6); g.fillEllipse(-62, -15, 70, 40); g.fillEllipse(62, -15, 70, 40);
            g.fillStyle(0xffd700, 1); g.fillEllipse(0, 25, 90, 85);
            g.fillStyle(0x1a1a1a, 1); g.fillRect(-43, 5, 86, 15); g.fillRect(-43, 34, 86, 15);
            g.fillStyle(0xffcc00, 1); g.fillTriangle(-8, 68, 8, 68, 0, 82);
            g.fillStyle(0xffd700, 1); g.fillCircle(0, -52, 42);
            kawaiiEye(-15, -58, 14, 9, 4, 0x333300);
            kawaiiEye(15, -58, 14, 9, 4, 0x333300);
            g.lineStyle(3, 0x1a1a1a, 1); g.lineBetween(-10, -90, -22, -108); g.lineBetween(10, -90, 22, -108);
            g.fillStyle(0x1a1a1a, 1); g.fillCircle(-22, -108, 5); g.fillCircle(22, -108, 5);
            smile(0, -42, 10, 0.2, Math.PI - 0.2);

        } else if (name === 'monster_butterfly') {
            g.fillStyle(0xaa55ff, 1); g.fillEllipse(-65, -38, 110, 80);
            g.fillStyle(0xcc88ff, 0.7); g.fillEllipse(-58, -42, 80, 56);
            g.fillStyle(0xaa55ff, 1); g.fillEllipse(65, -38, 110, 80);
            g.fillStyle(0xcc88ff, 0.7); g.fillEllipse(58, -42, 80, 56);
            g.fillStyle(0xcc66ff, 1); g.fillEllipse(-50, 55, 75, 55); g.fillEllipse(50, 55, 75, 55);
            g.lineStyle(2, 0xffffff, 0.4);
            g.lineBetween(0, -50, -80, -60); g.lineBetween(0, -50, 80, -60);
            g.lineBetween(0, 10, -55, 55); g.lineBetween(0, 10, 55, 55);
            g.fillStyle(0x1a1a1a, 1); g.fillEllipse(0, 12, 18, 90);
            g.fillStyle(0x222222, 1); g.fillCircle(0, -50, 22);
            kawaiiEye(-9, -54, 10, 6, 3, 0xaa55ff);
            kawaiiEye(9, -54, 10, 6, 3, 0xaa55ff);
            g.lineStyle(2, 0x333333, 1); g.lineBetween(-5, -68, -18, -88); g.lineBetween(5, -68, 18, -88);
            g.fillStyle(0xff66cc, 1);
            g.fillCircle(-20, -90, 5); g.fillCircle(-16, -90, 5);
            g.fillCircle(16, -90, 5); g.fillCircle(20, -90, 5);

        } else if (name === 'monster_ladybug') {
            g.fillStyle(0xee2222, 1); g.fillEllipse(0, 15, 130, 110);
            g.lineStyle(5, 0x1a1a1a, 1); g.lineBetween(0, -48, 0, 68);
            g.fillStyle(0x1a1a1a, 1);
            g.fillCircle(-34, -10, 18); g.fillCircle(34, -10, 18);
            g.fillCircle(-30, 30, 14); g.fillCircle(30, 30, 14);
            g.fillStyle(0x1a1a1a, 1); g.fillCircle(0, -62, 38);
            kawaiiEye(-15, -68, 16, 10, 5, 0x4444ff);
            kawaiiEye(15, -68, 16, 10, 5, 0x4444ff);
            g.fillStyle(0xff88aa, 0.4); g.fillCircle(-30, -58, 10); g.fillCircle(30, -58, 10);
            g.lineStyle(3, 0x1a1a1a, 1); g.lineBetween(-8, -96, -18, -112); g.lineBetween(8, -96, 18, -112);
            g.fillStyle(0x333333, 1); g.fillCircle(-18, -112, 5); g.fillCircle(18, -112, 5);

        } else if (name === 'monster_dragon') {
            g.fillStyle(0x880000, 1); g.fillTriangle(-50, 10, -95, -40, -50, -30); g.fillTriangle(50, 10, 95, -40, 50, -30);
            g.fillStyle(0xaa2222, 0.6); g.fillTriangle(-50, 10, -85, -28, -50, -20); g.fillTriangle(50, 10, 85, -28, 50, -20);
            g.fillStyle(0xdd3311, 1); g.fillEllipse(0, 35, 100, 110);
            g.fillStyle(0xee4422, 1); g.fillCircle(0, -50, 48);
            g.fillStyle(0xcc2200, 1); g.fillTriangle(-20, -92, -12, -80, -4, -92); g.fillTriangle(20, -92, 12, -80, 4, -92);
            kawaiiEye(-18, -55, 16, 10, 6, 0xffcc00);
            kawaiiEye(18, -55, 16, 10, 6, 0xffcc00);
            g.fillStyle(0xff6600, 0.9); g.fillCircle(36, -48, 8); g.fillCircle(46, -44, 6);
            g.fillStyle(0xffcc00, 0.8); g.fillCircle(40, -50, 5);
            g.fillStyle(0xcc2200, 1); g.fillTriangle(-12, 90, 0, 78, 12, 90);
            smile(0, -40, 10, 0.2, Math.PI - 0.2);

        } else if (name === 'monster_lava_golem') {
            g.fillStyle(0x3d2010, 1); g.fillRoundedRect(-55, -80, 110, 165, 18);
            g.fillStyle(0x5a2e14, 1); g.fillRoundedRect(-40, -65, 80, 132, 12);
            g.lineStyle(4, 0xff6600, 0.9); g.lineBetween(-28, -50, 0, -10); g.lineBetween(0, -10, -20, 30);
            g.lineStyle(3, 0xffaa00, 0.7); g.lineBetween(10, -40, 28, 5); g.lineBetween(28, 5, 5, 45);
            g.fillStyle(0xff4400, 1); g.fillRoundedRect(-32, -65, 24, 14, 4); g.fillRoundedRect(8, -65, 24, 14, 4);
            g.fillStyle(0xffaa00, 0.8); g.fillRoundedRect(-28, -62, 16, 8, 3); g.fillRoundedRect(12, -62, 16, 8, 3);
            g.fillStyle(0xff6600, 1); g.fillCircle(-30, 88, 7); g.fillCircle(0, 92, 9); g.fillCircle(30, 88, 7);
            g.fillStyle(0xffaa00, 0.9); g.fillCircle(-30, 88, 4); g.fillCircle(0, 92, 5); g.fillCircle(30, 88, 4);
            g.lineStyle(3, 0xff8800, 0.8);
            g.beginPath(); g.arc(0, -20, 10, 0.3, Math.PI - 0.3, false); g.strokePath();

        } else if (name === 'monster_phoenix') {
            g.fillStyle(0xff2200, 1); g.fillTriangle(-18, 85, -6, 60, 0, 90);
            g.fillStyle(0xff6600, 1); g.fillTriangle(-4, 88, 2, 58, 8, 88);
            g.fillStyle(0xffcc00, 1); g.fillTriangle(6, 85, 14, 58, 20, 85);
            g.fillStyle(0xff6600, 1); g.fillEllipse(-72, 0, 70, 45); g.fillEllipse(72, 0, 70, 45);
            g.fillStyle(0xffaa00, 0.7); g.fillEllipse(-62, 5, 45, 28); g.fillEllipse(62, 5, 45, 28);
            g.fillStyle(0xff5500, 1); g.fillEllipse(0, 18, 85, 90);
            g.fillStyle(0xffcc00, 1); g.fillCircle(0, -52, 40);
            g.fillStyle(0xff6600, 1); g.fillTriangle(-14, -88, -8, -72, 0, -90);
            g.fillStyle(0xffcc00, 1); g.fillTriangle(-2, -92, 2, -72, 6, -92);
            g.fillStyle(0xff4400, 1); g.fillTriangle(6, -88, 12, -72, 16, -90);
            kawaiiEye(-15, -56, 14, 9, 5, 0xff8800);
            kawaiiEye(15, -56, 14, 9, 5, 0xff8800);
            g.fillStyle(0xffcc00, 1); g.fillTriangle(0, -46, 12, -43, 0, -38);
            smile(0, -42, 8, 0.2, Math.PI - 0.2);

        } else if (name === 'monster_shark') {
            g.fillStyle(0x6688aa, 1); g.fillEllipse(0, 10, 160, 80);
            g.fillStyle(0x88aacc, 1); g.fillEllipse(-10, 2, 130, 54);
            g.fillStyle(0xddeeff, 1); g.fillEllipse(10, 22, 100, 25);
            g.fillStyle(0x4466aa, 1); g.fillTriangle(-5, -38, 15, -38, 5, -90);
            g.fillStyle(0x4466aa, 1); g.fillTriangle(-60, 12, -92, 45, -28, 38); g.fillTriangle(60, 12, 92, 45, 28, 38);
            g.fillStyle(0x4466aa, 1); g.fillTriangle(-75, -2, -115, -42, -115, 42);
            kawaiiEye(45, -12, 18, 12, 7, 0x2244aa);
            g.fillStyle(0xffffff, 1);
            g.fillTriangle(-18, 10, -10, 10, -14, 24); g.fillTriangle(-6, 10, 2, 10, -2, 24); g.fillTriangle(6, 10, 14, 10, 10, 24);

        } else if (name === 'monster_octopus') {
            g.fillStyle(0x7755cc, 1);
            g.fillRoundedRect(-55, 12, 20, 80, 10); g.fillRoundedRect(-26, 16, 18, 85, 9);
            g.fillRoundedRect(8, 16, 18, 85, 9); g.fillRoundedRect(35, 12, 20, 80, 10);
            g.fillStyle(0xaa88ff, 1);
            for (let i = 0; i < 3; i++) {
                g.fillCircle(-45, 28 + i * 22, 5); g.fillCircle(-17, 32 + i * 22, 5);
                g.fillCircle(17, 32 + i * 22, 5); g.fillCircle(45, 28 + i * 22, 5);
            }
            g.fillStyle(0x8866dd, 1); g.fillEllipse(0, -38, 120, 100);
            g.fillStyle(0xaa88ee, 1); g.fillEllipse(-5, -44, 88, 72);
            kawaiiEye(-22, -45, 22, 14, 8, 0x5533aa);
            kawaiiEye(22, -45, 22, 14, 8, 0x5533aa);
            g.fillStyle(0xff88aa, 0.4); g.fillCircle(-40, -30, 12); g.fillCircle(40, -30, 12);
            smile(0, -24, 8, 0.2, Math.PI - 0.2);

        } else if (name === 'monster_jellyfish') {
            g.lineStyle(4, 0x8899ff, 0.6);
            g.lineBetween(-38, 4, -52, 95); g.lineBetween(-18, 8, -22, 96);
            g.lineBetween(0, 8, 0, 98); g.lineBetween(18, 8, 22, 96); g.lineBetween(38, 4, 52, 95);
            g.fillStyle(0x8899ff, 0.8); g.fillEllipse(0, -36, 130, 80);
            g.fillStyle(0xbbccff, 0.5); g.fillEllipse(-8, -44, 80, 48);
            g.fillStyle(0xeeeeff, 0.9);
            g.fillCircle(-30, -52, 5); g.fillCircle(28, -56, 4); g.fillCircle(10, -38, 3); g.fillCircle(-12, -30, 4);
            kawaiiEye(-20, -40, 14, 9, 5, 0x4455ff);
            kawaiiEye(20, -40, 14, 9, 5, 0x4455ff);
            smile(0, -26, 8, 0.2, Math.PI - 0.2);

        } else if (name === 'monster_alien') {
            g.fillStyle(0x55cc55, 1); g.fillCircle(0, -38, 65);
            g.fillStyle(0x77ee77, 1); g.fillEllipse(-10, -48, 85, 90);
            g.fillStyle(0x0a0a1a, 1); g.fillEllipse(-22, -48, 38, 22); g.fillEllipse(22, -48, 38, 22);
            g.fillStyle(0x3366ff, 0.6); g.fillCircle(-22, -48, 10); g.fillCircle(22, -48, 10);
            g.fillStyle(0x88aaff, 0.8); g.fillCircle(-25, -52, 4); g.fillCircle(19, -52, 4);
            g.lineStyle(2, 0x338833, 1); g.lineBetween(-10, -22, 10, -22);
            g.fillStyle(0x55cc55, 1); g.fillRect(-14, 22, 28, 52);
            g.fillStyle(0x55cc55, 1); g.fillRect(-52, 24, 38, 8); g.fillRect(14, 24, 38, 8);
            g.lineStyle(3, 0x44aa44, 1); g.lineBetween(-12, -100, -24, -122); g.lineBetween(12, -100, 24, -122);
            g.fillStyle(0x88ff88, 1); g.fillCircle(-24, -122, 6); g.fillCircle(24, -122, 6);

        } else if (name === 'monster_robot') {
            g.fillStyle(0x778899, 1); g.fillRoundedRect(-38, 76, 28, 46, 6); g.fillRoundedRect(10, 76, 28, 46, 6);
            g.fillStyle(0x6677aa, 1); g.fillRoundedRect(-44, 116, 38, 12, 4); g.fillRoundedRect(6, 116, 38, 12, 4);
            g.fillStyle(0x778899, 1); g.fillRoundedRect(-82, -36, 28, 72, 8); g.fillRoundedRect(54, -36, 28, 72, 8);
            g.fillStyle(0x667788, 1); g.fillCircle(-68, 42, 14); g.fillCircle(68, 42, 14);
            g.fillStyle(0x8899aa, 1); g.fillRoundedRect(-50, -38, 100, 116, 10);
            g.fillStyle(0x667788, 1); g.fillRoundedRect(-36, -28, 72, 78, 8);
            g.fillStyle(0xff4444, 1); g.fillCircle(-18, -12, 7);
            g.fillStyle(0x44ff44, 1); g.fillCircle(0, -12, 7);
            g.fillStyle(0x4444ff, 1); g.fillCircle(18, -12, 7);
            g.fillStyle(0x8899aa, 1); g.fillRoundedRect(-42, -110, 84, 70, 12);
            g.fillStyle(0x001122, 1); g.fillRoundedRect(-30, -102, 60, 36, 6);
            g.fillStyle(0x00ffff, 1); g.fillRect(-24, -96, 14, 12); g.fillRect(10, -96, 14, 12);
            g.fillStyle(0xffff44, 1);
            g.fillRect(-14, -80, 6, 6); g.fillRect(-5, -76, 6, 6); g.fillRect(4, -80, 6, 6);
            g.fillStyle(0x889aaa, 1); g.fillRect(-3, -140, 6, 32);
            g.fillStyle(0xff4444, 1); g.fillCircle(0, -142, 7);

        } else if (name === 'monster_ufo') {
            g.fillStyle(0xffffaa, 0.12); g.fillTriangle(-45, 22, 45, 22, 100, 210);
            g.fillStyle(0xaabbcc, 1); g.fillEllipse(0, 16, 190, 55);
            g.fillStyle(0xbbccdd, 1); g.fillEllipse(-2, 10, 148, 38);
            g.fillStyle(0x5599dd, 0.7); g.fillEllipse(0, -28, 75, 62);
            g.fillStyle(0x88bbee, 0.5); g.fillEllipse(-8, -34, 46, 40);
            const rimC = [0xff4444, 0x44ff44, 0x4488ff, 0xffff44, 0xff44ff];
            for (let i = 0; i < 5; i++) {
                const a = (i / 5) * Math.PI * 2;
                g.fillStyle(rimC[i], 1); g.fillCircle(Math.cos(a) * 72, Math.sin(a) * 18 + 16, 8);
            }
            g.fillStyle(0x55cc55, 0.85); g.fillCircle(0, -26, 20);
            g.fillStyle(0x0a0a1a, 1); g.fillEllipse(-7, -28, 12, 8); g.fillEllipse(7, -28, 12, 8);
            g.fillStyle(0xffffff, 0.9);
            g.fillCircle(-90, -60, 3); g.fillCircle(95, -42, 2); g.fillCircle(-70, 55, 2); g.fillCircle(88, 60, 3);
            g.fillCircle(-95, 15, 2); g.fillCircle(80, -65, 3);
        }
    }

    _handleMonsterDefeat(container) {
        this.add.particles(container.x, container.y, 'particle', {
            speed: { min: 100, max: 300 },
            scale: { start: 0.5, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 1000,
            quantity: 30,
            blendMode: 'ADD'
        }).setScrollFactor(0).explode();

        this.tweens.add({
            targets: container,
            alpha: 0,
            y: '-=100',
            duration: 600,
            onComplete: () => {
                container.destroy();
                this._resumeWalking();
            }
        });
    }

    _spawnChest() {
        const { width, height } = this.cameras.main;
        const container = this.add.container(width / 2, height / 2).setScale(0.01).setScrollFactor(0);

        const aura = this.add.circle(0, 0, 100, 0xffd700, 0.2);
        this.tweens.add({ targets: aura, scale: 1.5, alpha: 0, duration: 1500, repeat: -1 });
        container.add(aura);

        const g = this.add.graphics();
        g.fillStyle(0x5d2e0c, 1);
        g.fillRoundedRect(-60, -50, 120, 100, 10);
        g.fillStyle(0x8b4513, 1);
        g.fillRoundedRect(-55, -45, 110, 90, 8);
        g.fillStyle(0xffd700, 1);
        g.fillRect(-40, -50, 15, 100);
        g.fillRect(25, -50, 15, 100);
        g.fillStyle(0xf1c40f, 1);
        g.fillCircle(0, 0, 15);
        g.fillStyle(0x000000, 1);
        g.fillRect(-2, 0, 4, 10);
        container.add(g);

        this.tweens.add({
            targets: container,
            scale: 1.8,
            duration: 1800,
            onComplete: () => {
                this.scene.pause();
                this.scene.launch('MathProblemScene', {
                    isChest:   true,
                    numMax:    this.worldConfig.numMax,
                    operation: this.worldConfig.operation ?? 'add',
                    onSuccess: () => {
                        const newRound = this.roundCount + 1;
                        this._updateRoundHUD(newRound);
                        if (newRound >= this.totalRounds) {
                            this._triggerWorldComplete();
                        } else {
                            this._addDecoration();
                            container.destroy();
                            this._resumeWalking();
                        }
                    }
                });
            }
        });
    }

    _resumeWalking() {
        this.isWalking = true;
        this.nextEncounter = this.distance + this.encounterThreshold + Math.random() * 80;
        this.scene.resume();
    }

    _triggerWorldComplete() {
        this.isWalking = false;
        this.scene.launch('MathVictoryScene', { worldIndex: this.worldIndex });
    }

    _addDecoration() {
        const { width, height } = this.cameras.main;
        const x = Math.random() * width;
        const y = height * 0.1 + Math.random() * (height * 0.3);
        const star = this.add.text(x, y, '✨', {
            fontSize: `${Math.floor(Math.random() * 20 + 20)}px`
        }).setDepth(2).setAlpha(0).setScrollFactor(0);

        this.tweens.add({
            targets: star,
            alpha: 0.8,
            y: '-=20',
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        this.decorations.push(star);
    }
}
