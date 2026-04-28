// Extensible word list. Add entries here for future levels.
// Each entry: answer string, letter pool (correct + 2 distractors), drawPicture function.
// drawPicture(gfx, cx, cy, r) — gfx is Phaser.GameObjects.Graphics, cx/cy is center, r is scale radius.

export const WORDS = {

    ROI: {
        answer: 'ROI',
        letters: ['R', 'O', 'I', 'A', 'L', 'E'],
        drawPicture(gfx, cx, cy, r) {
            // Gold crown
            gfx.fillStyle(0xffd700, 1);
            gfx.fillRect(cx - r * 0.6, cy + r * 0.1, r * 1.2, r * 0.5);
            // Three crown points (triangles via path)
            gfx.beginPath();
            gfx.moveTo(cx - r * 0.55, cy + r * 0.1);
            gfx.lineTo(cx - r * 0.65, cy - r * 0.45);
            gfx.lineTo(cx - r * 0.3, cy + r * 0.1);
            gfx.closePath();
            gfx.fillPath();

            gfx.beginPath();
            gfx.moveTo(cx - r * 0.12, cy + r * 0.1);
            gfx.lineTo(cx, cy - r * 0.65);
            gfx.lineTo(cx + r * 0.12, cy + r * 0.1);
            gfx.closePath();
            gfx.fillPath();

            gfx.beginPath();
            gfx.moveTo(cx + r * 0.55, cy + r * 0.1);
            gfx.lineTo(cx + r * 0.65, cy - r * 0.45);
            gfx.lineTo(cx + r * 0.3, cy + r * 0.1);
            gfx.closePath();
            gfx.fillPath();

            // Jewels
            gfx.fillStyle(0xff2222, 1);
            gfx.fillCircle(cx - r * 0.28, cy + r * 0.28, r * 0.09);
            gfx.fillStyle(0x2244ff, 1);
            gfx.fillCircle(cx, cy + r * 0.28, r * 0.09);
            gfx.fillStyle(0xff2222, 1);
            gfx.fillCircle(cx + r * 0.28, cy + r * 0.28, r * 0.09);
        }
    },

    CHAT: {
        answer: 'CHAT',
        letters: ['C', 'H', 'A', 'T', 'O', 'R'],
        drawPicture(gfx, cx, cy, r) {
            // Orange cat body (oval)
            gfx.fillStyle(0xff8800, 1);
            gfx.fillEllipse(cx, cy + r * 0.2, r * 1.2, r * 0.85);
            // Head
            gfx.fillCircle(cx, cy - r * 0.35, r * 0.5);
            // Ears (triangles)
            gfx.fillStyle(0xff8800, 1);
            gfx.beginPath();
            gfx.moveTo(cx - r * 0.5, cy - r * 0.6);
            gfx.lineTo(cx - r * 0.62, cy - r * 1.05);
            gfx.lineTo(cx - r * 0.2, cy - r * 0.7);
            gfx.closePath();
            gfx.fillPath();

            gfx.beginPath();
            gfx.moveTo(cx + r * 0.5, cy - r * 0.6);
            gfx.lineTo(cx + r * 0.62, cy - r * 1.05);
            gfx.lineTo(cx + r * 0.2, cy - r * 0.7);
            gfx.closePath();
            gfx.fillPath();

            // Inner ear pink
            gfx.fillStyle(0xffaabb, 1);
            gfx.beginPath();
            gfx.moveTo(cx - r * 0.5, cy - r * 0.65);
            gfx.lineTo(cx - r * 0.58, cy - r * 0.95);
            gfx.lineTo(cx - r * 0.28, cy - r * 0.72);
            gfx.closePath();
            gfx.fillPath();

            gfx.beginPath();
            gfx.moveTo(cx + r * 0.5, cy - r * 0.65);
            gfx.lineTo(cx + r * 0.58, cy - r * 0.95);
            gfx.lineTo(cx + r * 0.28, cy - r * 0.72);
            gfx.closePath();
            gfx.fillPath();

            // Eyes
            gfx.fillStyle(0x228822, 1);
            gfx.fillCircle(cx - r * 0.18, cy - r * 0.38, r * 0.1);
            gfx.fillCircle(cx + r * 0.18, cy - r * 0.38, r * 0.1);
            gfx.fillStyle(0x000000, 1);
            gfx.fillCircle(cx - r * 0.18, cy - r * 0.38, r * 0.05);
            gfx.fillCircle(cx + r * 0.18, cy - r * 0.38, r * 0.05);

            // Nose (small triangle via path)
            gfx.fillStyle(0xff88aa, 1);
            gfx.beginPath();
            gfx.moveTo(cx - r * 0.06, cy - r * 0.28);
            gfx.lineTo(cx + r * 0.06, cy - r * 0.28);
            gfx.lineTo(cx, cy - r * 0.21);
            gfx.closePath();
            gfx.fillPath();

            // Whiskers
            gfx.lineStyle(2, 0x000000, 1);
            gfx.beginPath();
            gfx.moveTo(cx - r * 0.12, cy - r * 0.22);
            gfx.lineTo(cx - r * 0.6, cy - r * 0.28);
            gfx.strokePath();
            gfx.beginPath();
            gfx.moveTo(cx - r * 0.12, cy - r * 0.18);
            gfx.lineTo(cx - r * 0.6, cy - r * 0.12);
            gfx.strokePath();
            gfx.beginPath();
            gfx.moveTo(cx + r * 0.12, cy - r * 0.22);
            gfx.lineTo(cx + r * 0.6, cy - r * 0.28);
            gfx.strokePath();
            gfx.beginPath();
            gfx.moveTo(cx + r * 0.12, cy - r * 0.18);
            gfx.lineTo(cx + r * 0.6, cy - r * 0.12);
            gfx.strokePath();
        }
    },

    TOUR: {
        answer: 'TOUR',
        letters: ['T', 'O', 'U', 'R', 'N', 'S'],
        drawPicture(gfx, cx, cy, r) {
            // Tower body (grey stone)
            gfx.fillStyle(0x888888, 1);
            gfx.fillRect(cx - r * 0.35, cy - r * 0.6, r * 0.7, r * 1.1);
            // Battlements (3 merlons on top)
            gfx.fillRect(cx - r * 0.35, cy - r * 0.82, r * 0.18, r * 0.24);
            gfx.fillRect(cx - r * 0.09, cy - r * 0.82, r * 0.18, r * 0.24);
            gfx.fillRect(cx + r * 0.17, cy - r * 0.82, r * 0.18, r * 0.24);
            // Stone texture lines
            gfx.lineStyle(1, 0x666666, 0.8);
            gfx.beginPath();
            gfx.moveTo(cx - r * 0.35, cy - r * 0.2);
            gfx.lineTo(cx + r * 0.35, cy - r * 0.2);
            gfx.strokePath();
            gfx.beginPath();
            gfx.moveTo(cx - r * 0.35, cy + r * 0.1);
            gfx.lineTo(cx + r * 0.35, cy + r * 0.1);
            gfx.strokePath();
            // Door arch
            gfx.fillStyle(0x222222, 1);
            gfx.fillRect(cx - r * 0.12, cy + r * 0.1, r * 0.24, r * 0.4);
            gfx.fillCircle(cx, cy + r * 0.1, r * 0.12);
            // Window
            gfx.fillStyle(0x88aaff, 1);
            gfx.fillRect(cx - r * 0.1, cy - r * 0.35, r * 0.2, r * 0.22);
        }
    },

    OURS: {
        answer: 'OURS',
        letters: ['O', 'U', 'R', 'S', 'B', 'M'],
        drawPicture(gfx, cx, cy, r) {
            // Brown bear
            gfx.fillStyle(0x8b4513, 1);
            // Body
            gfx.fillEllipse(cx, cy + r * 0.25, r * 1.1, r * 0.9);
            // Head
            gfx.fillCircle(cx, cy - r * 0.3, r * 0.48);
            // Ears
            gfx.fillCircle(cx - r * 0.38, cy - r * 0.68, r * 0.2);
            gfx.fillCircle(cx + r * 0.38, cy - r * 0.68, r * 0.2);
            // Inner ears
            gfx.fillStyle(0xffb6c1, 1);
            gfx.fillCircle(cx - r * 0.38, cy - r * 0.68, r * 0.11);
            gfx.fillCircle(cx + r * 0.38, cy - r * 0.68, r * 0.11);
            // Snout
            gfx.fillStyle(0xc8805a, 1);
            gfx.fillEllipse(cx, cy - r * 0.18, r * 0.38, r * 0.25);
            // Nose
            gfx.fillStyle(0x111111, 1);
            gfx.fillEllipse(cx, cy - r * 0.29, r * 0.16, r * 0.1);
            // Eyes
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx - r * 0.17, cy - r * 0.4, r * 0.07);
            gfx.fillCircle(cx + r * 0.17, cy - r * 0.4, r * 0.07);
            // Eye shine
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx - r * 0.14, cy - r * 0.43, r * 0.025);
            gfx.fillCircle(cx + r * 0.2, cy - r * 0.43, r * 0.025);
        }
    },

    LUNE: {
        answer: 'LUNE',
        letters: ['L', 'U', 'N', 'E', 'S', 'T'],
        drawPicture(gfx, cx, cy, r) {
            // Night sky background in picture area
            gfx.fillStyle(0x0d0d2e, 1);
            gfx.fillCircle(cx, cy, r * 1.1);

            // Yellow crescent: large circle minus offset circle
            gfx.fillStyle(0xffe066, 1);
            gfx.fillCircle(cx, cy, r * 0.65);
            // "Erase" part of the circle by drawing sky color offset
            gfx.fillStyle(0x0d0d2e, 1);
            gfx.fillCircle(cx + r * 0.25, cy - r * 0.1, r * 0.54);

            // Stars (white dots)
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx + r * 0.65, cy - r * 0.45, r * 0.06);
            gfx.fillCircle(cx + r * 0.8,  cy + r * 0.1,  r * 0.04);
            gfx.fillCircle(cx + r * 0.55, cy + r * 0.55, r * 0.05);
            gfx.fillCircle(cx - r * 0.55, cy - r * 0.6,  r * 0.04);
            gfx.fillCircle(cx - r * 0.7,  cy + r * 0.3,  r * 0.03);
        }
    },
};
