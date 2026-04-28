// All word definitions used across the 5 levels.
// drawPicture(gfx, cx, cy, r) — gfx is Phaser.GameObjects.Graphics; cx/cy = center; r = scale radius.

function tri(gfx, x1, y1, x2, y2, x3, y3) {
    gfx.beginPath();
    gfx.moveTo(x1, y1); gfx.lineTo(x2, y2); gfx.lineTo(x3, y3);
    gfx.closePath(); gfx.fillPath();
}

export const WORDS = {

    // ── LEVEL 1 : Le Château ────────────────────────────────────────────
    ROI: {
        answer: 'ROI',
        letters: ['R', 'O', 'I', 'A', 'L', 'E'],
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xffd700, 1);
            gfx.fillRect(cx - r * 0.6, cy + r * 0.05, r * 1.2, r * 0.5);
            tri(gfx, cx - r*0.55, cy+r*0.05, cx-r*0.65, cy-r*0.5,  cx-r*0.28, cy+r*0.05);
            tri(gfx, cx - r*0.1,  cy+r*0.05, cx,        cy-r*0.65, cx+r*0.1,  cy+r*0.05);
            tri(gfx, cx + r*0.55, cy+r*0.05, cx+r*0.65, cy-r*0.5,  cx+r*0.28, cy+r*0.05);
            gfx.fillStyle(0xff2222, 1); gfx.fillCircle(cx - r*0.28, cy+r*0.27, r*0.09);
            gfx.fillStyle(0x2244ff, 1); gfx.fillCircle(cx,          cy+r*0.27, r*0.09);
            gfx.fillStyle(0xff2222, 1); gfx.fillCircle(cx + r*0.28, cy+r*0.27, r*0.09);
        }
    },

    CHAT: {
        answer: 'CHAT',
        letters: ['C', 'H', 'A', 'T', 'O', 'R'],
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xff8800, 1);
            gfx.fillEllipse(cx, cy+r*0.2, r*1.2, r*0.85);
            gfx.fillCircle(cx, cy-r*0.35, r*0.5);
            tri(gfx, cx-r*0.5,cy-r*0.6, cx-r*0.62,cy-r*1.05, cx-r*0.2,cy-r*0.7);
            tri(gfx, cx+r*0.5,cy-r*0.6, cx+r*0.62,cy-r*1.05, cx+r*0.2,cy-r*0.7);
            gfx.fillStyle(0xffaabb, 1);
            tri(gfx, cx-r*0.5,cy-r*0.65, cx-r*0.58,cy-r*0.95, cx-r*0.28,cy-r*0.72);
            tri(gfx, cx+r*0.5,cy-r*0.65, cx+r*0.58,cy-r*0.95, cx+r*0.28,cy-r*0.72);
            gfx.fillStyle(0x228822, 1);
            gfx.fillCircle(cx-r*0.18,cy-r*0.38,r*0.1); gfx.fillCircle(cx+r*0.18,cy-r*0.38,r*0.1);
            gfx.fillStyle(0x000000, 1);
            gfx.fillCircle(cx-r*0.18,cy-r*0.38,r*0.05); gfx.fillCircle(cx+r*0.18,cy-r*0.38,r*0.05);
            gfx.fillStyle(0xff88aa, 1);
            tri(gfx, cx-r*0.06,cy-r*0.28, cx+r*0.06,cy-r*0.28, cx,cy-r*0.21);
            gfx.lineStyle(2, 0x000000, 1);
            for (const [x1,x2] of [[-0.12,-0.6],[0.12,0.6]]) {
                gfx.beginPath(); gfx.moveTo(cx+x1*r,cy-r*0.22); gfx.lineTo(cx+x2*r,cy-r*0.28); gfx.strokePath();
                gfx.beginPath(); gfx.moveTo(cx+x1*r,cy-r*0.18); gfx.lineTo(cx+x2*r,cy-r*0.12); gfx.strokePath();
            }
        }
    },

    TOUR: {
        answer: 'TOUR',
        letters: ['T', 'O', 'U', 'R', 'N', 'S'],
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x888888, 1);
            gfx.fillRect(cx-r*0.35,cy-r*0.6,r*0.7,r*1.1);
            gfx.fillRect(cx-r*0.35,cy-r*0.82,r*0.18,r*0.24);
            gfx.fillRect(cx-r*0.09,cy-r*0.82,r*0.18,r*0.24);
            gfx.fillRect(cx+r*0.17,cy-r*0.82,r*0.18,r*0.24);
            gfx.lineStyle(1, 0x666666, 0.8);
            for (const dy of [-0.2, 0.1]) {
                gfx.beginPath(); gfx.moveTo(cx-r*0.35,cy+r*dy); gfx.lineTo(cx+r*0.35,cy+r*dy); gfx.strokePath();
            }
            gfx.fillStyle(0x222222, 1);
            gfx.fillRect(cx-r*0.12,cy+r*0.1,r*0.24,r*0.4);
            gfx.fillCircle(cx,cy+r*0.1,r*0.12);
            gfx.fillStyle(0x88aaff, 1);
            gfx.fillRect(cx-r*0.1,cy-r*0.35,r*0.2,r*0.22);
        }
    },

    OURS: {
        answer: 'OURS',
        letters: ['O', 'U', 'R', 'S', 'B', 'M'],
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x8b4513, 1);
            gfx.fillEllipse(cx,cy+r*0.25,r*1.1,r*0.9);
            gfx.fillCircle(cx,cy-r*0.3,r*0.48);
            gfx.fillCircle(cx-r*0.38,cy-r*0.68,r*0.2); gfx.fillCircle(cx+r*0.38,cy-r*0.68,r*0.2);
            gfx.fillStyle(0xffb6c1, 1);
            gfx.fillCircle(cx-r*0.38,cy-r*0.68,r*0.11); gfx.fillCircle(cx+r*0.38,cy-r*0.68,r*0.11);
            gfx.fillStyle(0xc8805a, 1); gfx.fillEllipse(cx,cy-r*0.18,r*0.38,r*0.25);
            gfx.fillStyle(0x111111, 1); gfx.fillEllipse(cx,cy-r*0.29,r*0.16,r*0.1);
            gfx.fillCircle(cx-r*0.17,cy-r*0.4,r*0.07); gfx.fillCircle(cx+r*0.17,cy-r*0.4,r*0.07);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.14,cy-r*0.43,r*0.025); gfx.fillCircle(cx+r*0.2,cy-r*0.43,r*0.025);
        }
    },

    LUNE: {
        answer: 'LUNE',
        letters: ['L', 'U', 'N', 'E', 'S', 'T'],
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x0d0d2e, 1); gfx.fillCircle(cx,cy,r*1.1);
            gfx.fillStyle(0xffe066, 1); gfx.fillCircle(cx,cy,r*0.65);
            gfx.fillStyle(0x0d0d2e, 1); gfx.fillCircle(cx+r*0.25,cy-r*0.1,r*0.54);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx+r*0.65,cy-r*0.45,r*0.06);
            gfx.fillCircle(cx+r*0.8, cy+r*0.1, r*0.04);
            gfx.fillCircle(cx+r*0.55,cy+r*0.55,r*0.05);
            gfx.fillCircle(cx-r*0.55,cy-r*0.6, r*0.04);
        }
    },

    // ── LEVEL 2 : Les Animaux ────────────────────────────────────────────
    COQ: {
        answer: 'COQ',
        letters: ['C', 'O', 'Q', 'U', 'T', 'R'],
        drawPicture(gfx, cx, cy, r) {
            // Tail feathers
            gfx.fillStyle(0xff4400, 1); tri(gfx,cx-r*0.4,cy,    cx-r*0.85,cy-r*0.5,  cx-r*0.4,cy+r*0.1);
            gfx.fillStyle(0xffaa00, 1); tri(gfx,cx-r*0.4,cy+r*0.1, cx-r*0.9,cy+r*0.0,  cx-r*0.4,cy+r*0.25);
            gfx.fillStyle(0xff8800, 1); tri(gfx,cx-r*0.4,cy+r*0.2, cx-r*0.8,cy+r*0.35, cx-r*0.4,cy+r*0.35);
            // Body
            gfx.fillStyle(0xf0eecc, 1); gfx.fillEllipse(cx,cy+r*0.1,r*1.0,r*0.8);
            // Head
            gfx.fillCircle(cx+r*0.1,cy-r*0.35,r*0.3);
            // Comb
            gfx.fillStyle(0xcc2200, 1);
            gfx.fillCircle(cx,       cy-r*0.62, r*0.15);
            gfx.fillCircle(cx+r*0.12,cy-r*0.58, r*0.13);
            gfx.fillCircle(cx-r*0.12,cy-r*0.55, r*0.12);
            // Wattle
            gfx.fillCircle(cx+r*0.28,cy-r*0.18, r*0.1);
            // Beak
            gfx.fillStyle(0xffaa00, 1);
            tri(gfx, cx+r*0.36,cy-r*0.4, cx+r*0.55,cy-r*0.32, cx+r*0.36,cy-r*0.24);
            // Eye
            gfx.fillStyle(0x000000, 1); gfx.fillCircle(cx+r*0.18,cy-r*0.4,r*0.06);
            // Legs
            gfx.lineStyle(3, 0xffaa00, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.08,cy+r*0.48); gfx.lineTo(cx-r*0.08,cy+r*0.72); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08,cy+r*0.48); gfx.lineTo(cx+r*0.08,cy+r*0.72); gfx.strokePath();
        }
    },

    OIE: {
        answer: 'OIE',
        letters: ['O', 'I', 'E', 'U', 'A', 'S'],
        drawPicture(gfx, cx, cy, r) {
            // Body
            gfx.fillStyle(0xf8f8f0, 1); gfx.fillEllipse(cx,cy+r*0.25,r*1.1,r*0.75);
            // Neck
            gfx.fillRect(cx+r*0.08,cy-r*0.6,r*0.26,r*0.65);
            // Head
            gfx.fillCircle(cx+r*0.25,cy-r*0.68,r*0.22);
            // Beak
            gfx.fillStyle(0xff8800, 1);
            tri(gfx, cx+r*0.44,cy-r*0.72, cx+r*0.64,cy-r*0.66, cx+r*0.44,cy-r*0.6);
            // Eye
            gfx.fillStyle(0x000000, 1); gfx.fillCircle(cx+r*0.3,cy-r*0.72,r*0.05);
            // Wing line
            gfx.lineStyle(2, 0xddddcc, 1);
            gfx.beginPath(); gfx.arc(cx-r*0.1,cy+r*0.1,r*0.4,-0.5,0.5,false); gfx.strokePath();
            // Feet
            gfx.fillStyle(0xff8800, 1);
            gfx.fillEllipse(cx-r*0.15,cy+r*0.64,r*0.26,r*0.11);
            gfx.fillEllipse(cx+r*0.15,cy+r*0.64,r*0.26,r*0.11);
            // Blue water hint at bottom
            gfx.fillStyle(0x4488cc, 0.4); gfx.fillEllipse(cx,cy+r*0.85,r*1.4,r*0.22);
        }
    },

    LION: {
        answer: 'LION',
        letters: ['L', 'I', 'O', 'N', 'E', 'R'],
        drawPicture(gfx, cx, cy, r) {
            // Body
            gfx.fillStyle(0xffc030, 1); gfx.fillEllipse(cx,cy+r*0.55,r*0.8,r*0.55);
            // Mane
            gfx.fillStyle(0xc87820, 1); gfx.fillCircle(cx,cy-r*0.08,r*0.62);
            // Face
            gfx.fillStyle(0xffc030, 1); gfx.fillCircle(cx,cy-r*0.08,r*0.44);
            // Snout
            gfx.fillStyle(0xffcc88, 1); gfx.fillEllipse(cx,cy+r*0.02,r*0.36,r*0.25);
            // Nose
            gfx.fillStyle(0xcc4466, 1); gfx.fillCircle(cx,cy-r*0.08,r*0.08);
            // Eyes
            gfx.fillStyle(0xffcc00, 1);
            gfx.fillCircle(cx-r*0.18,cy-r*0.2,r*0.1); gfx.fillCircle(cx+r*0.18,cy-r*0.2,r*0.1);
            gfx.fillStyle(0x000000, 1);
            gfx.fillCircle(cx-r*0.18,cy-r*0.2,r*0.06); gfx.fillCircle(cx+r*0.18,cy-r*0.2,r*0.06);
            // Tail
            gfx.lineStyle(5, 0xc87820, 1);
            gfx.beginPath(); gfx.arc(cx+r*0.5,cy+r*0.4,r*0.34,-0.3,1.6,false); gfx.strokePath();
            gfx.fillStyle(0x885510, 1); gfx.fillCircle(cx+r*0.82,cy+r*0.62,r*0.11);
        }
    },

    LOUP: {
        answer: 'LOUP',
        letters: ['L', 'O', 'U', 'P', 'A', 'T'],
        drawPicture(gfx, cx, cy, r) {
            // Body
            gfx.fillStyle(0x909090, 1); gfx.fillEllipse(cx,cy+r*0.25,r*1.0,r*0.72);
            // Head
            gfx.fillCircle(cx,cy-r*0.3,r*0.42);
            // Pointed ears
            gfx.fillStyle(0x909090, 1);
            tri(gfx, cx-r*0.32,cy-r*0.55, cx-r*0.45,cy-r*0.88, cx-r*0.1,cy-r*0.62);
            tri(gfx, cx+r*0.32,cy-r*0.55, cx+r*0.45,cy-r*0.88, cx+r*0.1,cy-r*0.62);
            gfx.fillStyle(0xffaaaa, 1);
            tri(gfx, cx-r*0.32,cy-r*0.58, cx-r*0.4,cy-r*0.8, cx-r*0.16,cy-r*0.65);
            tri(gfx, cx+r*0.32,cy-r*0.58, cx+r*0.4,cy-r*0.8, cx+r*0.16,cy-r*0.65);
            // Snout
            gfx.fillStyle(0xbbbbbb, 1); gfx.fillEllipse(cx,cy-r*0.17,r*0.4,r*0.28);
            gfx.fillStyle(0x111111, 1); gfx.fillEllipse(cx,cy-r*0.28,r*0.14,r*0.09);
            // Eyes
            gfx.fillStyle(0xddbb00, 1);
            gfx.fillCircle(cx-r*0.16,cy-r*0.37,r*0.09); gfx.fillCircle(cx+r*0.16,cy-r*0.37,r*0.09);
            gfx.fillStyle(0x000000, 1);
            gfx.fillCircle(cx-r*0.16,cy-r*0.37,r*0.05); gfx.fillCircle(cx+r*0.16,cy-r*0.37,r*0.05);
            // Tail
            gfx.lineStyle(7, 0x909090, 1);
            gfx.beginPath(); gfx.arc(cx-r*0.6,cy+r*0.5,r*0.38,-1.2,0.3,false); gfx.strokePath();
        }
    },

    CERF: {
        answer: 'CERF',
        letters: ['C', 'E', 'R', 'F', 'O', 'N'],
        drawPicture(gfx, cx, cy, r) {
            // Body
            gfx.fillStyle(0xaa6633, 1); gfx.fillEllipse(cx,cy+r*0.28,r*1.0,r*0.68);
            // White belly spot
            gfx.fillStyle(0xffeecc, 1); gfx.fillEllipse(cx,cy+r*0.38,r*0.52,r*0.35);
            // Neck + head
            gfx.fillStyle(0xaa6633, 1);
            gfx.fillRect(cx-r*0.14,cy-r*0.62,r*0.28,r*0.42);
            gfx.fillCircle(cx,cy-r*0.7,r*0.27);
            // Antlers
            gfx.lineStyle(4, 0x774422, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.08,cy-r*0.9); gfx.lineTo(cx-r*0.22,cy-r*1.08); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.17,cy-r*0.99); gfx.lineTo(cx-r*0.4,cy-r*1.02); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08,cy-r*0.9); gfx.lineTo(cx+r*0.22,cy-r*1.08); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.17,cy-r*0.99); gfx.lineTo(cx+r*0.4,cy-r*1.02); gfx.strokePath();
            // Eyes & nose
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx+r*0.11,cy-r*0.72,r*0.06); gfx.fillCircle(cx,cy-r*0.6,r*0.05);
            // Legs
            gfx.lineStyle(5, 0x995522, 1);
            for (const dx of [-0.28,-0.1,0.1,0.28]) {
                gfx.beginPath(); gfx.moveTo(cx+dx*r,cy+r*0.6); gfx.lineTo(cx+dx*r,cy+r*0.88); gfx.strokePath();
            }
        }
    },

    // ── LEVEL 3 : La Nature ──────────────────────────────────────────────
    EAU: {
        answer: 'EAU',
        letters: ['E', 'A', 'U', 'I', 'O', 'T'],
        drawPicture(gfx, cx, cy, r) {
            // Background circle (deep blue)
            gfx.fillStyle(0x1144aa, 1); gfx.fillCircle(cx,cy,r*1.1);
            // Waves
            gfx.lineStyle(4, 0x66aaff, 1);
            for (const dy of [-0.25, 0.05, 0.35]) {
                gfx.beginPath();
                gfx.arc(cx - r*0.4, cy+r*dy, r*0.28, Math.PI, 0, false);
                gfx.arc(cx + r*0.4, cy+r*dy, r*0.28, Math.PI, 0, true);
                gfx.strokePath();
            }
            // Droplet shape
            gfx.fillStyle(0x88ccff, 0.9);
            gfx.fillCircle(cx, cy-r*0.72, r*0.18);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.18, cy-r*0.72);
            gfx.lineTo(cx, cy-r*1.02);
            gfx.lineTo(cx+r*0.18, cy-r*0.72);
            gfx.closePath(); gfx.fillPath();
        }
    },

    BOIS: {
        answer: 'BOIS',
        letters: ['B', 'O', 'I', 'S', 'U', 'E'],
        drawPicture(gfx, cx, cy, r) {
            // Ground
            gfx.fillStyle(0x335511, 1); gfx.fillRect(cx-r,cy+r*0.5,r*2,r*0.6);
            // Three trees
            const trees = [cx-r*0.42, cx, cx+r*0.42];
            trees.forEach((tx, i) => {
                const scale = i === 1 ? 1.1 : 0.85;
                const baseY = cy + r*0.5;
                gfx.fillStyle(0x774422, 1);
                gfx.fillRect(tx-r*0.08*scale, baseY-r*0.25*scale, r*0.16*scale, r*0.25*scale);
                gfx.fillStyle(0x228833, 1);
                tri(gfx, tx, baseY-r*0.88*scale, tx-r*0.32*scale, baseY-r*0.26*scale, tx+r*0.32*scale, baseY-r*0.26*scale);
                gfx.fillStyle(0x33aa44, 1);
                tri(gfx, tx, baseY-r*1.02*scale, tx-r*0.25*scale, baseY-r*0.56*scale, tx+r*0.25*scale, baseY-r*0.56*scale);
            });
        }
    },

    MONT: {
        answer: 'MONT',
        letters: ['M', 'O', 'N', 'T', 'A', 'R'],
        drawPicture(gfx, cx, cy, r) {
            // Sky
            gfx.fillStyle(0x6699cc, 1); gfx.fillCircle(cx,cy,r*1.1);
            // Second peak (behind, darker)
            gfx.fillStyle(0x7a8888, 1);
            tri(gfx, cx+r*0.38,cy+r*0.55, cx+r*0.8,cy-r*0.45, cx+r*1.05,cy+r*0.55);
            // Main mountain
            gfx.fillStyle(0xaaaaaa, 1);
            tri(gfx, cx-r*0.7,cy+r*0.55, cx,cy-r*0.82, cx+r*0.7,cy+r*0.55);
            // Snow cap
            gfx.fillStyle(0xffffff, 1);
            tri(gfx, cx-r*0.22,cy-r*0.48, cx,cy-r*0.82, cx+r*0.22,cy-r*0.48);
            // Ground
            gfx.fillStyle(0x446622, 1); gfx.fillRect(cx-r,cy+r*0.54,r*2,r*0.18);
        }
    },

    VENT: {
        answer: 'VENT',
        letters: ['V', 'E', 'N', 'T', 'O', 'L'],
        drawPicture(gfx, cx, cy, r) {
            // Sky background
            gfx.fillStyle(0x99bbdd, 1); gfx.fillCircle(cx,cy,r*1.1);
            // Wind swirls
            gfx.lineStyle(5, 0xffffff, 0.85);
            for (const [startA, endA, arcCx, arcCy, arcR] of [
                [0.3,  2.2,  cx-r*0.1, cy-r*0.2, r*0.52],
                [-0.1, 1.8,  cx+r*0.05,cy+r*0.15,r*0.42],
                [0.4,  2.0,  cx-r*0.05,cy+r*0.38,r*0.32],
            ]) {
                gfx.beginPath(); gfx.arc(arcCx, arcCy, arcR, startA, endA, false); gfx.strokePath();
            }
            // Floating leaves
            gfx.fillStyle(0x55aa33, 1);
            gfx.fillEllipse(cx+r*0.55, cy-r*0.45, r*0.18, r*0.1);
            gfx.fillEllipse(cx-r*0.4,  cy+r*0.4,  r*0.14, r*0.08);
            gfx.fillEllipse(cx+r*0.2,  cy+r*0.62, r*0.16, r*0.09);
        }
    },

    CIEL: {
        answer: 'CIEL',
        letters: ['C', 'I', 'E', 'L', 'O', 'A'],
        drawPicture(gfx, cx, cy, r) {
            // Blue sky
            gfx.fillStyle(0x5599ee, 1); gfx.fillCircle(cx,cy,r*1.1);
            // Sun
            gfx.fillStyle(0xffdd00, 1); gfx.fillCircle(cx+r*0.5,cy-r*0.5,r*0.28);
            // Sun rays
            gfx.lineStyle(3, 0xffdd00, 1);
            for (let i=0;i<8;i++) {
                const a = i*Math.PI/4;
                const d1=r*0.32, d2=r*0.46;
                gfx.beginPath();
                gfx.moveTo(cx+r*0.5+Math.cos(a)*d1,cy-r*0.5+Math.sin(a)*d1);
                gfx.lineTo(cx+r*0.5+Math.cos(a)*d2,cy-r*0.5+Math.sin(a)*d2);
                gfx.strokePath();
            }
            // Clouds
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.38,cy-r*0.08,r*0.22);
            gfx.fillCircle(cx-r*0.58,cy-r*0.04,r*0.16);
            gfx.fillCircle(cx-r*0.18,cy-r*0.04,r*0.16);
            gfx.fillRect(cx-r*0.6,cy-r*0.04,r*0.44,r*0.18);
            gfx.fillCircle(cx+r*0.22,cy+r*0.25,r*0.18);
            gfx.fillCircle(cx+r*0.38,cy+r*0.22,r*0.14);
            gfx.fillCircle(cx+r*0.06,cy+r*0.22,r*0.13);
            gfx.fillRect(cx+r*0.05,cy+r*0.25,r*0.36,r*0.14);
        }
    },

    // ── LEVEL 4 : La Cuisine ─────────────────────────────────────────────
    PAIN: {
        answer: 'PAIN',
        letters: ['P', 'A', 'I', 'N', 'E', 'O'],
        drawPicture(gfx, cx, cy, r) {
            // Loaf (rounded rectangle)
            gfx.fillStyle(0xc87820, 1);
            gfx.fillEllipse(cx, cy+r*0.05, r*1.3, r*0.72);
            // Crust top (slightly lighter arc)
            gfx.fillStyle(0xe89830, 1);
            gfx.fillEllipse(cx, cy-r*0.1, r*1.15, r*0.5);
            // Score marks (diagonal lines)
            gfx.lineStyle(3, 0xa05810, 1);
            for (const dx of [-0.3, 0, 0.3]) {
                gfx.beginPath();
                gfx.moveTo(cx+dx*r-r*0.08, cy-r*0.28);
                gfx.lineTo(cx+dx*r+r*0.08, cy+r*0.12);
                gfx.strokePath();
            }
            // Bottom crust shadow
            gfx.fillStyle(0xa05810, 1);
            gfx.fillEllipse(cx, cy+r*0.22, r*1.28, r*0.32);
        }
    },

    LAIT: {
        answer: 'LAIT',
        letters: ['L', 'A', 'I', 'T', 'O', 'E'],
        drawPicture(gfx, cx, cy, r) {
            // Glass shape (trapezoid-ish)
            gfx.fillStyle(0xeef8ff, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.32, cy-r*0.62);
            gfx.lineTo(cx+r*0.32, cy-r*0.62);
            gfx.lineTo(cx+r*0.38, cy+r*0.55);
            gfx.lineTo(cx-r*0.38, cy+r*0.55);
            gfx.closePath(); gfx.fillPath();
            // Milk fill
            gfx.fillStyle(0xffffff, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.36, cy-r*0.0);
            gfx.lineTo(cx+r*0.36, cy-r*0.0);
            gfx.lineTo(cx+r*0.38, cy+r*0.55);
            gfx.lineTo(cx-r*0.38, cy+r*0.55);
            gfx.closePath(); gfx.fillPath();
            // Glass outline
            gfx.lineStyle(3, 0x99ccee, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.32,cy-r*0.62);
            gfx.lineTo(cx+r*0.32,cy-r*0.62);
            gfx.lineTo(cx+r*0.38,cy+r*0.55);
            gfx.lineTo(cx-r*0.38,cy+r*0.55);
            gfx.closePath(); gfx.strokePath();
            // Bubbles
            gfx.fillStyle(0xeef8ff, 1);
            gfx.fillCircle(cx-r*0.12,cy+r*0.08,r*0.06);
            gfx.fillCircle(cx+r*0.1, cy+r*0.18,r*0.05);
            gfx.fillCircle(cx+r*0.22,cy+r*0.04,r*0.04);
        }
    },

    NOIX: {
        answer: 'NOIX',
        letters: ['N', 'O', 'I', 'X', 'A', 'E'],
        drawPicture(gfx, cx, cy, r) {
            // Shell outer (bumpy oval)
            gfx.fillStyle(0x9a6228, 1); gfx.fillEllipse(cx,cy,r*1.0,r*0.82);
            // Shell seam
            gfx.lineStyle(3, 0x7a4818, 1);
            gfx.beginPath(); gfx.moveTo(cx,cy-r*0.41); gfx.lineTo(cx,cy+r*0.41); gfx.strokePath();
            // Texture lines left
            gfx.lineStyle(2, 0x7a4818, 0.7);
            gfx.beginPath(); gfx.arc(cx-r*0.2,cy-r*0.05,r*0.28,2.0,4.8,false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx-r*0.2,cy+r*0.1, r*0.22,1.8,4.6,false); gfx.strokePath();
            // Texture lines right
            gfx.beginPath(); gfx.arc(cx+r*0.2,cy-r*0.05,r*0.28,Math.PI-4.8+Math.PI,Math.PI-2.0+Math.PI,false); gfx.strokePath();
            // Highlight
            gfx.fillStyle(0xcc9a4a, 0.5); gfx.fillEllipse(cx-r*0.18,cy-r*0.15,r*0.28,r*0.2);
        }
    },

    MIEL: {
        answer: 'MIEL',
        letters: ['M', 'I', 'E', 'L', 'A', 'O'],
        drawPicture(gfx, cx, cy, r) {
            // Jar body (hexagonal suggestion via rounded rect)
            gfx.fillStyle(0xffcc00, 1);
            gfx.fillRoundedRect(cx-r*0.42,cy-r*0.42,r*0.84,r*0.9,r*0.12);
            // Honey fill gradient hint
            gfx.fillStyle(0xff9900, 0.5);
            gfx.fillRoundedRect(cx-r*0.42,cy,r*0.84,r*0.48,r*0.1);
            // Lid
            gfx.fillStyle(0xaa5500, 1);
            gfx.fillRoundedRect(cx-r*0.46,cy-r*0.52,r*0.92,r*0.18,r*0.06);
            // Honey drip
            gfx.fillStyle(0xffcc00, 1);
            gfx.fillEllipse(cx+r*0.22,cy+r*0.56,r*0.14,r*0.1);
            gfx.beginPath();
            gfx.moveTo(cx+r*0.16,cy+r*0.48);
            gfx.lineTo(cx+r*0.28,cy+r*0.48);
            gfx.lineTo(cx+r*0.28,cy+r*0.54);
            gfx.closePath(); gfx.fillPath();
            // Label line
            gfx.lineStyle(2, 0xaa5500, 0.6);
            gfx.strokeRect(cx-r*0.32,cy-r*0.28,r*0.64,r*0.42);
        }
    },

    OEUF: {
        answer: 'OEUF',
        letters: ['O', 'E', 'U', 'F', 'I', 'A'],
        drawPicture(gfx, cx, cy, r) {
            // Egg white
            gfx.fillStyle(0xfffdf2, 1);
            gfx.fillEllipse(cx, cy, r*0.75, r*0.96);
            // Crack line
            gfx.lineStyle(3, 0xddccaa, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.12,cy-r*0.15);
            gfx.lineTo(cx-r*0.04,cy-r*0.04);
            gfx.lineTo(cx+r*0.1, cy-r*0.12);
            gfx.strokePath();
            // Yolk peeking through crack
            gfx.fillStyle(0xffcc00, 1);
            gfx.fillCircle(cx+r*0.04,cy-r*0.04,r*0.1);
            // Shell texture
            gfx.lineStyle(1, 0xddccaa, 0.5);
            gfx.strokeEllipse(cx,cy,r*0.75,r*0.96);
        }
    },

    // ── LEVEL 5 : La Maison ──────────────────────────────────────────────
    VELO: {
        answer: 'VELO',
        letters: ['V', 'E', 'L', 'O', 'A', 'I'],
        drawPicture(gfx, cx, cy, r) {
            const wy = cy+r*0.18;
            // Wheels
            gfx.lineStyle(5, 0x222222, 1);
            gfx.strokeCircle(cx-r*0.34,wy,r*0.34);
            gfx.strokeCircle(cx+r*0.34,wy,r*0.34);
            // Hubs
            gfx.fillStyle(0x222222, 1);
            gfx.fillCircle(cx-r*0.34,wy,r*0.05); gfx.fillCircle(cx+r*0.34,wy,r*0.05);
            // Frame (red/orange)
            gfx.lineStyle(5, 0xff4400, 1);
            // Chain stay & seat tube
            gfx.beginPath();
            gfx.moveTo(cx-r*0.34,wy);
            gfx.lineTo(cx,cy-r*0.1);
            gfx.lineTo(cx+r*0.34,wy);
            gfx.strokePath();
            // Seat stay
            gfx.beginPath();
            gfx.moveTo(cx-r*0.34,wy);
            gfx.lineTo(cx+r*0.06,cy-r*0.1);
            gfx.strokePath();
            // Seat post
            gfx.beginPath();
            gfx.moveTo(cx,cy-r*0.1);
            gfx.lineTo(cx-r*0.08,cy-r*0.3);
            gfx.strokePath();
            // Seat
            gfx.lineStyle(4, 0x553311, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.2,cy-r*0.3);
            gfx.lineTo(cx+r*0.05,cy-r*0.3);
            gfx.strokePath();
            // Fork + handlebar
            gfx.lineStyle(4, 0xff4400, 1);
            gfx.beginPath();
            gfx.moveTo(cx+r*0.34,wy);
            gfx.lineTo(cx+r*0.32,cy-r*0.12);
            gfx.strokePath();
            gfx.beginPath();
            gfx.moveTo(cx+r*0.24,cy-r*0.12);
            gfx.lineTo(cx+r*0.48,cy-r*0.12);
            gfx.strokePath();
        }
    },

    AUTO: {
        answer: 'AUTO',
        letters: ['A', 'U', 'T', 'O', 'E', 'N'],
        drawPicture(gfx, cx, cy, r) {
            // Car body (red)
            gfx.fillStyle(0xdd2222, 1);
            gfx.fillRoundedRect(cx-r*0.7,cy-r*0.15,r*1.4,r*0.52,r*0.12);
            // Roof
            gfx.fillRoundedRect(cx-r*0.4,cy-r*0.55,r*0.8,r*0.42,r*0.12);
            // Windows
            gfx.fillStyle(0x88ccff, 1);
            gfx.fillRoundedRect(cx-r*0.34,cy-r*0.5,r*0.32,r*0.28,r*0.06);
            gfx.fillRoundedRect(cx+r*0.04,cy-r*0.5,r*0.28,r*0.28,r*0.06);
            // Wheels
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.44,cy+r*0.38,r*0.22);
            gfx.fillCircle(cx+r*0.44,cy+r*0.38,r*0.22);
            gfx.fillStyle(0x888888, 1);
            gfx.fillCircle(cx-r*0.44,cy+r*0.38,r*0.1);
            gfx.fillCircle(cx+r*0.44,cy+r*0.38,r*0.1);
            // Door line
            gfx.lineStyle(2, 0xaa1111, 1);
            gfx.beginPath(); gfx.moveTo(cx,cy-r*0.15); gfx.lineTo(cx,cy+r*0.37); gfx.strokePath();
            // Headlight
            gfx.fillStyle(0xffff99, 1); gfx.fillCircle(cx+r*0.62,cy+r*0.04,r*0.08);
            // Taillight
            gfx.fillStyle(0xff6666, 1); gfx.fillCircle(cx-r*0.62,cy+r*0.04,r*0.08);
        }
    },

    BAIN: {
        answer: 'BAIN',
        letters: ['B', 'A', 'I', 'N', 'O', 'E'],
        drawPicture(gfx, cx, cy, r) {
            // Tub outer
            gfx.fillStyle(0xdddddd, 1);
            gfx.fillRoundedRect(cx-r*0.7,cy-r*0.15,r*1.4,r*0.62,r*0.18);
            // Water fill
            gfx.fillStyle(0x55aaee, 0.85);
            gfx.fillRoundedRect(cx-r*0.62,cy-r*0.06,r*1.24,r*0.42,r*0.1);
            // Bubbles
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.28,cy-r*0.02,r*0.1);
            gfx.fillCircle(cx,      cy+r*0.08,r*0.08);
            gfx.fillCircle(cx+r*0.25,cy-r*0.0, r*0.12);
            gfx.fillCircle(cx+r*0.5, cy+r*0.1, r*0.07);
            // Feet
            gfx.fillStyle(0xbbbbbb, 1);
            gfx.fillRect(cx-r*0.58,cy+r*0.46,r*0.12,r*0.18);
            gfx.fillRect(cx+r*0.46,cy+r*0.46,r*0.12,r*0.18);
            // Rim
            gfx.lineStyle(3, 0xbbbbbb, 1);
            gfx.strokeRoundedRect(cx-r*0.7,cy-r*0.15,r*1.4,r*0.62,r*0.18);
            // Faucet
            gfx.fillStyle(0xaaaaaa, 1);
            gfx.fillRect(cx-r*0.06,cy-r*0.38,r*0.12,r*0.26);
            gfx.fillRect(cx-r*0.2, cy-r*0.44,r*0.4,r*0.1);
        }
    },

    FOUR: {
        answer: 'FOUR',
        letters: ['F', 'O', 'U', 'R', 'A', 'T'],
        drawPicture(gfx, cx, cy, r) {
            // Oven body
            gfx.fillStyle(0x444444, 1);
            gfx.fillRoundedRect(cx-r*0.65,cy-r*0.65,r*1.3,r*1.22,r*0.08);
            // Door
            gfx.fillStyle(0x333333, 1);
            gfx.fillRoundedRect(cx-r*0.5,cy-r*0.55,r*1.0,r*0.82,r*0.06);
            // Door window (glass with fire)
            gfx.fillStyle(0x111111, 1);
            gfx.fillRoundedRect(cx-r*0.38,cy-r*0.46,r*0.76,r*0.56,r*0.1);
            // Fire inside
            gfx.fillStyle(0xff8800, 0.9);
            gfx.fillEllipse(cx,cy-r*0.18,r*0.38,r*0.28);
            gfx.fillStyle(0xffdd00, 0.8);
            gfx.fillEllipse(cx,cy-r*0.22,r*0.22,r*0.18);
            gfx.fillStyle(0xffffff, 0.5);
            gfx.fillCircle(cx,cy-r*0.26,r*0.07);
            // Knobs
            gfx.fillStyle(0x666666, 1);
            for (const dx of [-0.4,-0.13,0.13,0.4]) {
                gfx.fillCircle(cx+dx*r, cy+r*0.55, r*0.1);
            }
            // Top surface
            gfx.fillStyle(0x555555, 1);
            gfx.fillRect(cx-r*0.65,cy-r*0.65,r*1.3,r*0.1);
        }
    },

    VASE: {
        answer: 'VASE',
        letters: ['V', 'A', 'S', 'E', 'O', 'I'],
        drawPicture(gfx, cx, cy, r) {
            // Flowers
            const petals = [0xff4466, 0xff9900, 0xffdd00, 0xff4466, 0xff9900];
            petals.forEach((c,i) => {
                const a = (i/petals.length)*Math.PI*2;
                gfx.fillStyle(c, 1);
                gfx.fillCircle(cx+Math.cos(a)*r*0.2, cy-r*0.7+Math.sin(a)*r*0.2, r*0.14);
            });
            gfx.fillStyle(0xffff00, 1); gfx.fillCircle(cx,cy-r*0.7,r*0.12);
            // Stem
            gfx.lineStyle(4, 0x338822, 1);
            gfx.beginPath(); gfx.moveTo(cx,cy-r*0.55); gfx.lineTo(cx,cy-r*0.28); gfx.strokePath();
            // Vase shape (wide belly, narrow neck, flat base)
            gfx.fillStyle(0x4488cc, 1);
            // Neck
            gfx.fillRect(cx-r*0.15,cy-r*0.28,r*0.3,r*0.22);
            // Rim
            gfx.fillRect(cx-r*0.22,cy-r*0.3,r*0.44,r*0.06);
            // Belly
            gfx.fillEllipse(cx,cy+r*0.15,r*0.82,r*0.62);
            // Base
            gfx.fillRect(cx-r*0.28,cy+r*0.42,r*0.56,r*0.1);
            // Decoration line
            gfx.lineStyle(2, 0x2266aa, 1);
            gfx.beginPath(); gfx.arc(cx,cy+r*0.08,r*0.38,0.5,Math.PI-0.5,false); gfx.strokePath();
            // Highlight
            gfx.fillStyle(0x88bbee, 0.5);
            gfx.fillEllipse(cx-r*0.18,cy+r*0.0,r*0.16,r*0.3);
        }
    },
};
