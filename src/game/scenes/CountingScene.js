import { Scene } from 'phaser';
import { audio } from '../systems/AudioManager.js';
import { getWord } from '../data/WordData.js';
import { COUNTING_LEVELS, saveCountingProgress } from '../data/CountingData.js';
import { LootManager } from '../systems/LootManager.js';
import { t } from '../data/I18n.js';

const TOTAL_ROUNDS = 6;

export class CountingScene extends Scene {
    constructor() {
        super('CountingScene');
    }

    init(data) {
        this.levelIndex = data?.levelIndex ?? 0;
    }

    create() {
        this._level      = COUNTING_LEVELS[this.levelIndex];
        this._score      = 0;
        this._round      = 0;
        this._objs       = [];   // Graphics instances shown in Phase 1
        this._buttons    = [];   // Number buttons shown in Phase 3
        this._locked     = false;
        this._roundData  = null;

        this.cameras.main.setBackgroundColor(0x030d05);
        this.cameras.main.fadeIn(300);

        this._drawBackground();
        this._drawHeader();

        const backBtn = this.add.text(18, 18, t('back'), {
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#224422',
            padding: { x: 8, y: 4 },
        }).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.scene.start('CountingMenuScene'));

        this._nextRound();
    }

    // ── Header / HUD ─────────────────────────────────────────────────────────

    _drawHeader() {
        this._roundTxt = this.add.text(14, 38, '', {
            fontSize: '20px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0, 0.5);

        this.add.text(512, 38, t('countingTitle'), {
            fontSize: '30px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 5,
        }).setOrigin(0.5);

        this._scoreTxt = this.add.text(880, 38, t('countingScore', this._score, TOTAL_ROUNDS), {
            fontSize: '26px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5);
    }

    _updateScore() {
        this._scoreTxt.setText(t('countingScore', this._score, TOTAL_ROUNDS));
    }

    // ── Round management ──────────────────────────────────────────────────────

    _nextRound() {
        this._round++;
        this._clearObjects();
        this._clearButtons();
        this._locked = false;
        if (this._roundTxt) this._roundTxt.setText(t('countingRound', this._round, TOTAL_ROUNDS));
        this._roundData = this._generateRound();
        this._phase1();
    }

    _generateRound() {
        const level = this._level;
        const pool  = this._shuffle([...level.pool]);
        const types = pool.slice(0, level.types);

        // Pick `types.length` distinct counts in [1, maxCount]
        const allCounts = [];
        for (let n = 1; n <= level.maxCount; n++) allCounts.push(n);
        const pickedCounts = this._shuffle(allCounts).slice(0, level.types);

        const counts = types.map((wordKey, i) => ({ wordKey, count: pickedCounts[i] }));
        const quiz   = counts[Math.floor(Math.random() * counts.length)];
        return { counts, quiz };
    }

    // ── Phase 1: Memorise ─────────────────────────────────────────────────────

    _phase1() {
        const level = this._level;
        const { counts } = this._roundData;

        this._showPhaseLabel(t('countingMemoise'));

        const zones     = this._buildZones(counts.length);
        const objRadius = 54;

        counts.forEach((entry, typeIdx) => {
            const typeZones = zones[typeIdx];
            for (let k = 0; k < entry.count; k++) {
                const zone = typeZones[k % typeZones.length];
                const jx   = zone.x + (Math.random() - 0.5) * 28;
                const jy   = zone.y + (Math.random() - 0.5) * 28;

                const gfx = this.add.graphics();
                gfx.x = jx;
                gfx.y = jy;

                const concept = getWord(entry.wordKey);
                if (concept) concept.drawPicture(gfx, 0, 0, objRadius);

                this._objs.push(gfx);
            }
        });

        // Countdown bar
        const barBg = this.add.rectangle(512, 112, 600, 16, 0x334433, 1).setDepth(5);
        const bar   = this.add.rectangle(512 - 300, 112, 600, 16, 0x44cc44, 1)
            .setOrigin(0, 0.5).setDepth(6);
        bar.x = 512 - 300;

        this.tweens.add({
            targets: bar,
            scaleX: 0,
            duration: level.showTime,
            ease: 'Linear',
            onComplete: () => {
                barBg.destroy();
                bar.destroy();
                this._phase2();
            },
        });
    }

    _buildZones(numTypes) {
        const cols      = 6;
        const rows      = 3;
        const playTop   = 130;
        const playBot   = 640;
        const zoneW     = 1024 / cols;
        const zoneH     = (playBot - playTop) / rows;
        const colsPerType = cols / numTypes;

        const typeZones = [];
        for (let t = 0; t < numTypes; t++) {
            const zones    = [];
            const colStart = Math.round(t * colsPerType);
            const colEnd   = Math.round((t + 1) * colsPerType);
            for (let r = 0; r < rows; r++) {
                for (let c = colStart; c < colEnd; c++) {
                    zones.push({
                        x: c * zoneW + zoneW / 2,
                        y: playTop + r * zoneH + zoneH / 2,
                    });
                }
            }
            this._shuffle(zones);
            typeZones.push(zones);
        }
        return typeZones;
    }

    // ── Phase 2: Hide ─────────────────────────────────────────────────────────

    _phase2() {
        this._clearPhaseLabel();

        this._objs.forEach(obj => {
            this.tweens.add({
                targets: obj,
                y: obj.y - 200,
                alpha: 0,
                duration: 500,
                ease: 'Quad.In',
                onComplete: () => obj.destroy(),
            });
        });
        this._objs = [];

        this.time.delayedCall(550, () => this._phase3());
    }

    // ── Phase 3: Quiz ─────────────────────────────────────────────────────────

    _phase3() {
        const { quiz } = this._roundData;
        const concept  = getWord(quiz.wordKey);

        this._showPhaseLabel(t('countingQuestion'));

        // Large object in centre
        const objGfx = this.add.graphics();
        objGfx.x = 512;
        objGfx.y = 340;
        if (concept) concept.drawPicture(objGfx, 0, 0, 90);
        this._objs.push(objGfx);

        // Number buttons
        const maxCount = this._level.maxCount;
        const btnSize  = maxCount <= 4 ? 120 : 100;
        const btnGap   = maxCount <= 3 ? 140 : maxCount <= 4 ? 110 : 88;
        const totalW   = maxCount * btnSize + (maxCount - 1) * btnGap;
        const startX   = (1024 - totalW) / 2 + btnSize / 2;
        const btnY     = 650;

        for (let n = 1; n <= maxCount; n++) {
            const bx  = startX + (n - 1) * (btnSize + btnGap);
            const btn = this._createNumberButton(bx, btnY, n, btnSize, quiz.count);
            this._buttons.push(btn);
        }
    }

    _createNumberButton(x, y, value, size, correctAnswer) {
        const bg = this.add.rectangle(x, y, size, size, 0x225522, 1)
            .setInteractive({ useHandCursor: true })
            .setDepth(5);

        const label = this.add.text(x, y, String(value), {
            fontSize: (size * 0.55) + 'px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#001100',
            strokeThickness: 4,
        }).setOrigin(0.5).setDepth(6);

        bg.on('pointerover', () => bg.setFillStyle(0x338833, 1));
        bg.on('pointerout',  () => bg.setFillStyle(0x225522, 1));
        bg.on('pointerup',   () => this._onAnswer(value, correctAnswer));

        return { bg, label };
    }

    // ── Phase 4: Feedback ─────────────────────────────────────────────────────

    _onAnswer(chosen, correct) {
        if (this._locked) return;
        this._locked = true;
        this._clearPhaseLabel();

        const isLast = this._round >= TOTAL_ROUNDS;

        if (chosen === correct) {
            this._score++;
            this._updateScore();
            audio.playGateUnlock();
            this._highlightButton(chosen, 0x44ff44);
            this._burstAt(512, 340);
            this.time.delayedCall(900, () => isLast ? this._endGame() : this._nextRound());
        } else {
            audio.playWrong();
            this._highlightButton(chosen, 0xff4444);
            this._highlightButton(correct, 0x44ff44);
            this.time.delayedCall(1500, () => isLast ? this._endGame() : this._nextRound());
        }
    }

    _highlightButton(value, color) {
        this._buttons.forEach(btn => {
            const v = parseInt(btn.label.text, 10);
            if (v === value) btn.bg.setFillStyle(color, 1);
        });
    }

    // ── End game ─────────────────────────────────────────────────────────────

    _endGame() {
        this._locked = true;
        this._clearObjects();
        this._clearButtons();
        this._clearPhaseLabel();

        const perfect = this._score === TOTAL_ROUNDS;

        if (perfect) {
            audio.playVictory();
            saveCountingProgress(this.levelIndex);
            this._starRain();
        }

        this.add.text(512, 290, `${this._score} / ${TOTAL_ROUNDS}`, {
            fontSize: '90px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffd700',
            stroke: '#000',
            strokeThickness: 8,
        }).setOrigin(0.5).setDepth(10);

        this.add.text(512, 410, perfect ? t('countingGood') : t('countingBad'), {
            fontSize: '34px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 5,
            wordWrap: { width: 800 },
            align: 'center',
        }).setOrigin(0.5).setDepth(10);

        const wonItem = perfect ? LootManager.rollLoot() : null;
        this.time.delayedCall(perfect ? 2000 : 3000, () => {
            if (wonItem) {
                this.scene.launch('RewardPopup', {
                    item: wonItem,
                    onClose: () => this.scene.start('CountingMenuScene'),
                });
            } else {
                this.scene.start('CountingMenuScene');
            }
        });
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    _showPhaseLabel(text) {
        this._clearPhaseLabel();
        this._phaseLbl = this.add.text(512, 80, text, {
            fontSize: '28px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5).setDepth(10).setAlpha(0);
        this.tweens.add({ targets: this._phaseLbl, alpha: 1, duration: 250 });
    }

    _clearPhaseLabel() {
        if (this._phaseLbl && this._phaseLbl.active) this._phaseLbl.destroy();
        this._phaseLbl = null;
    }

    _clearObjects() {
        this._objs.forEach(o => { if (o.active) o.destroy(); });
        this._objs = [];
    }

    _clearButtons() {
        this._buttons.forEach(b => {
            if (b.bg.active)    b.bg.destroy();
            if (b.label.active) b.label.destroy();
        });
        this._buttons = [];
    }

    _burstAt(cx, cy) {
        const palette = [0xffd700, 0xff88cc, 0x88ffaa, 0xaaccff];
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const dist  = 60 + Math.random() * 40;
            const p     = this.add.graphics().setDepth(15);
            p.fillStyle(palette[i % palette.length], 1);
            p.fillCircle(0, 0, 4 + Math.random() * 3);
            p.x = cx; p.y = cy;
            this.tweens.add({
                targets: p,
                x: cx + Math.cos(angle) * dist,
                y: cy + Math.sin(angle) * dist,
                alpha: 0,
                duration: 500 + Math.random() * 200,
                ease: 'Quad.Out',
                onComplete: () => p.destroy(),
            });
        }
    }

    _starRain() {
        for (let i = 0; i < 22; i++) {
            this.time.delayedCall(i * 80, () => {
                const x    = 60 + Math.random() * 904;
                const icon = ['⭐', '✨', '🌟'][Math.floor(Math.random() * 3)];
                const s    = this.add.text(x, -60, icon, {
                    fontSize: (22 + Math.random() * 26) + 'px',
                }).setAlpha(0.9).setDepth(25).setScrollFactor(0);
                this.tweens.add({
                    targets: s, y: 900,
                    duration: 2400 + Math.random() * 2000,
                    ease: 'Linear',
                    onComplete: () => s.destroy(),
                });
            });
        }
    }

    _drawBackground() {
        const { width, height } = this.cameras.main;
        const g = this.add.graphics();

        // Green glow layers
        const glows = [
            { x: width * 0.5, y: height * 0.5,  r: 300, c: 0x00cc44, a: 0.04 },
            { x: width * 0.5, y: height * 0.5,  r: 180, c: 0x22dd55, a: 0.06 },
            { x: width * 0.5, y: height * 0.5,  r: 100, c: 0x44ff88, a: 0.08 },
            { x: width * 0.2, y: height * 0.3,  r: 80,  c: 0x00aa33, a: 0.04 },
            { x: width * 0.8, y: height * 0.7,  r: 80,  c: 0x00cc44, a: 0.04 },
        ];
        glows.forEach(gl => {
            g.fillStyle(gl.c, gl.a);
            g.fillCircle(gl.x, gl.y, gl.r);
        });

        for (let i = 0; i < 30; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = 0.5 + Math.random() * 1.5;
            const cool = Math.random() < 0.3;
            const c = cool ? 0x88ffcc : 0xffffff;
            const s = this.add.circle(x, y, r, c, 0.2 + Math.random() * 0.4);
            this.tweens.add({
                targets: s, alpha: 0.02,
                duration: 1500 + Math.random() * 2000,
                yoyo: true, repeat: -1, delay: Math.random() * 2000,
            });
        }
    }

    _shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}
