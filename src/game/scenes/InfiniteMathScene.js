import { Scene } from 'phaser';
import { t } from '../data/I18n.js';

const BASE_MAX   = 10;   // starting upper bound for operands
const STEP       = 5;    // increase per 5 correct answers
const HARD_CAP   = 20;   // maximum upper bound
const MAX_LIVES  = 3;

export class InfiniteMathScene extends Scene {
    constructor() {
        super('InfiniteMathScene');
    }

    create() {
        const { width, height } = this.cameras.main;

        this.score      = 0;
        this.streak     = 0;
        this.lives      = MAX_LIVES;
        this.numMax     = BASE_MAX;
        this._answered  = false;

        this.cameras.main.setBackgroundColor(0x08040f);
        document.body.style.backgroundColor = '#08040f';

        this._drawBackground(width, height);
        this._createHUD(width, height);
        this._createProblemArea(width, height);
        this._createAnswerButtons(width, height);
        this._nextQuestion();
    }

    // ─── Background ──────────────────────────────────────────────────────────

    _drawBackground(w, h) {
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x08040f, 0x08040f, 0x10082a, 0x10082a, 1);
        bg.fillRect(0, 0, w, h);

        // Subtle grid
        bg.lineStyle(1, 0x1a0a3a, 0.3);
        for (let x = 0; x < w; x += 60) bg.lineBetween(x, 0, x, h);
        for (let y = 0; y < h; y += 60) bg.lineBetween(0, y, w, y);

        // Floating math symbols (ambient decoration)
        const symbols = ['+', '−', '×', '=', '∞', '?'];
        for (let i = 0; i < 18; i++) {
            const sx    = 40 + Math.random() * (w - 80);
            const sy    = 40 + Math.random() * (h - 80);
            const sym   = symbols[Math.floor(Math.random() * symbols.length)];
            const alpha = 0.05 + Math.random() * 0.10;
            const fsize = Math.floor(16 + Math.random() * 24);
            const txt = this.add.text(sx, sy, sym, {
                fontSize: `${fsize}px`,
                fontFamily: 'Arial Black, monospace',
                color: '#7744aa',
            }).setAlpha(alpha).setOrigin(0.5);
            this.tweens.add({
                targets:  txt,
                alpha:    alpha * 0.2,
                duration: 1600 + Math.random() * 2400,
                yoyo:     true,
                repeat:   -1,
                delay:    Math.random() * 2000,
            });
        }
    }

    // ─── HUD ──────────────────────────────────────────────────────────────────

    _createHUD(w, h) {
        // Back button (top-left)
        const backBtn = this.add.text(16, 16, t('back'), {
            fontSize:        '22px',
            color:           '#ffffff',
            backgroundColor: '#2a2a88',
            padding:         { x: 10, y: 6 },
        }).setDepth(200).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.scene.start('MathWorldSelectScene'));

        // Title (top-centre)
        this.add.text(w / 2, 18, t('infiniteMathTitle'), {
            fontSize:        '26px',
            fontFamily:      'Arial Black, Arial, sans-serif',
            color:           '#cc88ff',
            stroke:          '#000',
            strokeThickness: 4,
        }).setOrigin(0.5, 0).setDepth(200);

        // Score (top-right)
        const scoreLabel = this.add.text(w - 16, 14, '', {
            fontSize:        '22px',
            fontFamily:      'Arial Black, Arial, sans-serif',
            color:           '#ffd700',
            stroke:          '#000',
            strokeThickness: 3,
        }).setOrigin(1, 0).setDepth(200);
        this._scoreLabel = scoreLabel;
        this._refreshScore();

        // Hearts row (below back button)
        this._heartTexts = [];
        for (let i = 0; i < MAX_LIVES; i++) {
            const hx = 22 + i * 36;
            const ht = this.add.text(hx, 54, '❤️', {
                fontSize: '26px',
            }).setDepth(200);
            this._heartTexts.push(ht);
        }

        // Streak label (below hearts)
        this._streakLabel = this.add.text(16, 88, '', {
            fontSize:        '18px',
            fontFamily:      'Arial Black, Arial, sans-serif',
            color:           '#ff9944',
            stroke:          '#000',
            strokeThickness: 3,
        }).setDepth(200);
    }

    _refreshScore() {
        this._scoreLabel.setText(t('infiniteMathScore', this.score));
    }

    _refreshHearts() {
        this._heartTexts.forEach((h, i) => {
            h.setText(i < this.lives ? '❤️' : '🖤');
        });
    }

    _refreshStreak() {
        if (this.streak >= 2) {
            this._streakLabel.setText(`x${this.streak} 🔥`);
        } else {
            this._streakLabel.setText('');
        }
    }

    // ─── Problem area ─────────────────────────────────────────────────────────

    _createProblemArea(w, h) {
        // Question card background
        const cardY = h * 0.32;
        const cardGfx = this.add.graphics();
        cardGfx.fillStyle(0x1a0a2e, 0.9);
        cardGfx.fillRoundedRect(w / 2 - 250, cardY - 60, 500, 120, 18);
        cardGfx.lineStyle(3, 0x4a1280, 1);
        cardGfx.strokeRoundedRect(w / 2 - 250, cardY - 60, 500, 120, 18);

        this._questionText = this.add.text(w / 2, cardY, '', {
            fontSize:        '56px',
            fontFamily:      'Arial Black, Arial, sans-serif',
            color:           '#ffffff',
            stroke:          '#000',
            strokeThickness: 5,
        }).setOrigin(0.5).setDepth(10);

        // Feedback flash text (centred)
        this._feedbackText = this.add.text(w / 2, h * 0.55, '', {
            fontSize:        '42px',
            fontFamily:      'Arial Black, Arial, sans-serif',
            color:           '#00ff88',
            stroke:          '#000',
            strokeThickness: 5,
        }).setOrigin(0.5).setDepth(20).setAlpha(0);

        // Difficulty badge
        this._diffBadge = this.add.text(w / 2, h * 0.20, '', {
            fontSize:        '16px',
            fontFamily:      'Arial Black, Arial, sans-serif',
            color:           '#aaaaff',
            stroke:          '#000',
            strokeThickness: 2,
        }).setOrigin(0.5).setDepth(10);
    }

    // ─── Answer buttons ───────────────────────────────────────────────────────

    _createAnswerButtons(w, h) {
        const btnW   = 180;
        const btnH   = 72;
        const gap    = 24;
        const startX = w / 2 - btnW - gap / 2;
        const row1Y  = h * 0.68;
        const row2Y  = h * 0.68 + btnH + gap;

        this._btnData = [
            { col: 0, row: 0, x: startX,              y: row1Y },
            { col: 1, row: 0, x: startX + btnW + gap, y: row1Y },
            { col: 0, row: 1, x: startX,              y: row2Y },
            { col: 1, row: 1, x: startX + btnW + gap, y: row2Y },
        ];

        this._btns = this._btnData.map((bd, idx) => {
            const gfx = this.add.graphics().setDepth(10);
            const lbl = this.add.text(bd.x + btnW / 2, bd.y + btnH / 2, '', {
                fontSize:        '34px',
                fontFamily:      'Arial Black, Arial, sans-serif',
                color:           '#ffffff',
                stroke:          '#000',
                strokeThickness: 4,
            }).setOrigin(0.5).setDepth(11);

            const zone = this.add.zone(bd.x, bd.y, btnW, btnH)
                .setOrigin(0)
                .setDepth(12)
                .setInteractive({ useHandCursor: true });

            zone.on('pointerover', () => {
                gfx.clear();
                this._drawBtn(gfx, bd.x, bd.y, btnW, btnH, 0x6a1aa0, true);
            });
            zone.on('pointerout', () => {
                gfx.clear();
                this._drawBtn(gfx, bd.x, bd.y, btnW, btnH, 0x4a1280, false);
            });
            zone.on('pointerup', () => {
                if (!this._answered) this._onAnswer(idx);
            });

            return { gfx, lbl, zone, bd };
        });
    }

    _drawBtn(gfx, x, y, w, h, color, hover) {
        gfx.fillStyle(color, 1);
        gfx.fillRoundedRect(x, y, w, h, 12);
        gfx.lineStyle(3, hover ? 0xaa44ff : 0x7722bb, 1);
        gfx.strokeRoundedRect(x, y, w, h, 12);
    }

    _setButtonsEnabled(enabled) {
        this._btns.forEach(b => {
            b.zone.setActive(enabled).setVisible(enabled);
        });
    }

    // ─── Question logic ───────────────────────────────────────────────────────

    _nextQuestion() {
        this._answered = false;
        this._setButtonsEnabled(true);

        // Adjust difficulty: every 5 correct, +5 to max (capped at HARD_CAP)
        this.numMax = Math.min(HARD_CAP, BASE_MAX + Math.floor(this.score / 5) * STEP);
        this._diffBadge.setText(`1–${this.numMax}`);

        // Generate problem
        const op = Math.random() < 0.5 ? 'add' : 'sub';
        let a, b, answer;
        if (op === 'add') {
            a      = 1 + Math.floor(Math.random() * this.numMax);
            b      = 1 + Math.floor(Math.random() * this.numMax);
            answer = a + b;
        } else {
            a      = 1 + Math.floor(Math.random() * this.numMax);
            b      = Math.floor(Math.random() * a);          // b ≤ a → result ≥ 1
            answer = a - b;
        }

        const opSym = op === 'add' ? '+' : '−';
        this._questionText.setText(`${a}  ${opSym}  ${b}  =  ?`);
        this._correctAnswer = answer;

        // Build 4 choices: correct + 3 distractors (no negatives, no duplicates)
        const choices = this._buildChoices(answer);
        this._btns.forEach((btn, i) => {
            const { gfx, lbl, bd } = btn;
            gfx.clear();
            this._drawBtn(gfx, bd.x, bd.y, 180, 72, 0x4a1280, false);
            lbl.setText(String(choices[i]));
            lbl.setColor('#ffffff');
        });
        this._choicesValues = choices;
    }

    _buildChoices(answer) {
        const pool = new Set([answer]);
        let tries   = 0;
        while (pool.size < 4 && tries < 200) {
            tries++;
            const delta   = 1 + Math.floor(Math.random() * 4);
            const sign    = Math.random() < 0.5 ? 1 : -1;
            const cand    = answer + sign * delta;
            if (cand > 0) pool.add(cand);
        }
        // If still short (edge case: answer=1), fill with ascending integers
        let filler = 1;
        while (pool.size < 4) { pool.add(filler); filler++; }

        // Shuffle
        const arr = [...pool];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // ─── Answer handling ──────────────────────────────────────────────────────

    _onAnswer(idx) {
        this._answered = true;
        this._setButtonsEnabled(false);

        const chosen  = this._choicesValues[idx];
        const correct = chosen === this._correctAnswer;

        // Highlight correct / wrong buttons
        this._btns.forEach((btn, i) => {
            const { gfx, lbl, bd } = btn;
            gfx.clear();
            if (this._choicesValues[i] === this._correctAnswer) {
                this._drawBtnColored(gfx, bd.x, bd.y, 180, 72, 0x228822);
                lbl.setColor('#aaffaa');
            } else if (i === idx && !correct) {
                this._drawBtnColored(gfx, bd.x, bd.y, 180, 72, 0x882222);
                lbl.setColor('#ffaaaa');
            } else {
                this._drawBtn(gfx, bd.x, bd.y, 180, 72, 0x2a1050, false);
                lbl.setColor('#888888');
            }
        });

        if (correct) {
            this.score++;
            this.streak++;
            this._refreshScore();
            this._refreshStreak();
            this._showFeedback(t('infiniteMathCorrect'), '#00ff88');
        } else {
            this.lives--;
            this.streak = 0;
            this._refreshHearts();
            this._refreshStreak();
            this._showFeedback(t('infiniteMathWrong'), '#ff4444');
            if (this.lives <= 0) {
                this.time.delayedCall(1100, () => this._showGameOver());
                return;
            }
        }

        this.time.delayedCall(900, () => this._nextQuestion());
    }

    _drawBtnColored(gfx, x, y, w, h, color) {
        gfx.fillStyle(color, 1);
        gfx.fillRoundedRect(x, y, w, h, 12);
        gfx.lineStyle(3, 0xffffff, 0.5);
        gfx.strokeRoundedRect(x, y, w, h, 12);
    }

    _showFeedback(msg, color) {
        this._feedbackText
            .setText(msg)
            .setColor(color)
            .setAlpha(1);
        this.tweens.add({
            targets:  this._feedbackText,
            alpha:    0,
            y:        this._feedbackText.y - 30,
            duration: 800,
            ease:     'Quad.Out',
            onComplete: () => {
                this._feedbackText.setAlpha(0);
                this._feedbackText.setY(this.cameras.main.height * 0.55);
            },
        });
    }

    // ─── Game Over ────────────────────────────────────────────────────────────

    _showGameOver() {
        const { width, height } = this.cameras.main;
        const cx = width / 2, cy = height / 2;
        const elems = [];

        // Dim overlay
        elems.push(
            this.add.rectangle(cx, cy, width, height, 0x000000, 0.82)
                .setDepth(300).setScrollFactor(0)
        );

        // Card
        const card = this.add.graphics().setDepth(301).setScrollFactor(0);
        card.fillStyle(0x1a0a2e, 0.98);
        card.fillRoundedRect(cx - 220, cy - 140, 440, 280, 20);
        card.lineStyle(4, 0x9944ff, 1);
        card.strokeRoundedRect(cx - 220, cy - 140, 440, 280, 20);
        elems.push(card);

        // Title
        elems.push(
            this.add.text(cx, cy - 100, t('infiniteMathGameOver'), {
                fontSize:        '38px',
                fontFamily:      'Arial Black, Arial, sans-serif',
                color:           '#ff4444',
                stroke:          '#000',
                strokeThickness: 5,
            }).setOrigin(0.5).setDepth(302).setScrollFactor(0)
        );

        // Score
        elems.push(
            this.add.text(cx, cy - 36, t('infiniteMathScore', this.score), {
                fontSize:        '30px',
                fontFamily:      'Arial Black, Arial, sans-serif',
                color:           '#ffd700',
                stroke:          '#000',
                strokeThickness: 4,
            }).setOrigin(0.5).setDepth(302).setScrollFactor(0)
        );

        // Buttons: Rejouer | Retour
        [
            { bx: cx - 90, color: 0x228822, key: 'infiniteMathReplay', fn: () => this.scene.restart() },
            { bx: cx + 90, color: 0x2a2a88, key: 'back',               fn: () => this.scene.start('MathWorldSelectScene') },
        ].forEach(({ bx, color, key, fn }) => {
            const btn = this.add.rectangle(bx, cy + 60, 160, 56, color, 1)
                .setDepth(302).setScrollFactor(0)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => btn.setAlpha(0.8))
                .on('pointerout',  () => btn.setAlpha(1))
                .on('pointerup',   fn);
            elems.push(btn);
            elems.push(
                this.add.text(bx, cy + 60, t(key), {
                    fontSize:        '20px',
                    fontFamily:      'Arial Black, Arial, sans-serif',
                    color:           '#ffffff',
                    stroke:          '#000',
                    strokeThickness: 3,
                }).setOrigin(0.5).setDepth(303).setScrollFactor(0)
            );
        });
    }
}
