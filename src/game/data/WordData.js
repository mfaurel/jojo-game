// All word definitions. drawPicture is language-independent (concept-based).
// Each entry carries fr / en / es spelling variants.
// Use getWord(key) to get the current-language data.

import { getLang } from './I18n.js';

function tri(gfx, x1, y1, x2, y2, x3, y3) {
    gfx.beginPath();
    gfx.moveTo(x1, y1); gfx.lineTo(x2, y2); gfx.lineTo(x3, y3);
    gfx.closePath(); gfx.fillPath();
}

const WORD_CONCEPTS = {

    // ── LEVEL 1 : Le Château ────────────────────────────────────────────
    ROI: {
        fr: { answer: 'ROI',  letters: ['R','O','I','A','L','E'] },
        en: { answer: 'KING', letters: ['K','I','N','G','O','A'] },
        es: { answer: 'REY',  letters: ['R','E','Y','O','I','A'] },
        drawPicture(gfx, cx, cy, r) {
            // Crown (gold) — 3 spikes + band + gems
            gfx.fillStyle(0xffd700, 1);
            gfx.fillRect(cx - r*0.24, cy - r*0.62, r*0.48, r*0.16);
            tri(gfx, cx - r*0.24, cy - r*0.62, cx - r*0.30, cy - r*0.84, cx - r*0.09, cy - r*0.62);
            tri(gfx, cx - r*0.04, cy - r*0.62, cx,          cy - r*0.88, cx + r*0.04, cy - r*0.62);
            tri(gfx, cx + r*0.24, cy - r*0.62, cx + r*0.30, cy - r*0.84, cx + r*0.09, cy - r*0.62);
            gfx.fillStyle(0xff2222, 1); gfx.fillCircle(cx - r*0.12, cy - r*0.58, r*0.05);
            gfx.fillStyle(0x2244ff, 1); gfx.fillCircle(cx,           cy - r*0.58, r*0.05);
            gfx.fillStyle(0xff2222, 1); gfx.fillCircle(cx + r*0.12, cy - r*0.58, r*0.05);
            // Head (skin)
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx, cy - r*0.38, r*0.2);
            // Eyes
            gfx.fillStyle(0x333333, 1);
            gfx.fillCircle(cx - r*0.08, cy - r*0.40, r*0.04);
            gfx.fillCircle(cx + r*0.08, cy - r*0.40, r*0.04);
            // Robe (royal purple)
            gfx.fillStyle(0x7b2d8b, 1);
            gfx.fillRect(cx - r*0.28, cy - r*0.17, r*0.56, r*0.52);
            // Arms
            gfx.fillRect(cx - r*0.48, cy - r*0.15, r*0.20, r*0.20);
            gfx.fillRect(cx + r*0.28, cy - r*0.15, r*0.20, r*0.20);
            // Legs
            gfx.fillRect(cx - r*0.22, cy + r*0.35, r*0.17, r*0.35);
            gfx.fillRect(cx + r*0.05, cy + r*0.35, r*0.17, r*0.35);
        }
    },

    CHAT: {
        fr: { answer: 'CHAT', letters: ['C','H','A','T','O','R'] },
        en: { answer: 'CAT',  letters: ['C','A','T','O','R','N'] },
        es: { answer: 'GATO', letters: ['G','A','T','O','I','E'] },
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
        fr: { answer: 'TOUR',  letters: ['T','O','U','R','N','S'] },
        en: { answer: 'FORT',  letters: ['F','O','R','T','A','N'] },
        es: { answer: 'TORRE', letters: ['T','O','R','R','E','A'] },
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
        fr: { answer: 'OURS', letters: ['O','U','R','S','B','M'] },
        en: { answer: 'BEAR', letters: ['B','E','A','R','O','T'] },
        es: { answer: 'OSO',  letters: ['O','S','O','A','I','E'] },
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
        fr: { answer: 'LUNE', letters: ['L','U','N','E','S','T'] },
        en: { answer: 'MOON', letters: ['M','O','O','N','A','L'] },
        es: { answer: 'LUNA', letters: ['L','U','N','A','I','E'] },
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
        fr: { answer: 'COQ',  letters: ['C','O','Q','U','T','R'] },
        en: { answer: 'HEN',  letters: ['H','E','N','A','T','O'] },
        es: { answer: 'GALLO',letters: ['G','A','L','L','O','I'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xff4400, 1); tri(gfx,cx-r*0.4,cy,    cx-r*0.85,cy-r*0.5,  cx-r*0.4,cy+r*0.1);
            gfx.fillStyle(0xffaa00, 1); tri(gfx,cx-r*0.4,cy+r*0.1, cx-r*0.9,cy+r*0.0,  cx-r*0.4,cy+r*0.25);
            gfx.fillStyle(0xff8800, 1); tri(gfx,cx-r*0.4,cy+r*0.2, cx-r*0.8,cy+r*0.35, cx-r*0.4,cy+r*0.35);
            gfx.fillStyle(0xf0eecc, 1); gfx.fillEllipse(cx,cy+r*0.1,r*1.0,r*0.8);
            gfx.fillCircle(cx+r*0.1,cy-r*0.35,r*0.3);
            gfx.fillStyle(0xcc2200, 1);
            gfx.fillCircle(cx,       cy-r*0.62, r*0.15);
            gfx.fillCircle(cx+r*0.12,cy-r*0.58, r*0.13);
            gfx.fillCircle(cx-r*0.12,cy-r*0.55, r*0.12);
            gfx.fillCircle(cx+r*0.28,cy-r*0.18, r*0.1);
            gfx.fillStyle(0xffaa00, 1);
            tri(gfx, cx+r*0.36,cy-r*0.4, cx+r*0.55,cy-r*0.32, cx+r*0.36,cy-r*0.24);
            gfx.fillStyle(0x000000, 1); gfx.fillCircle(cx+r*0.18,cy-r*0.4,r*0.06);
            gfx.lineStyle(3, 0xffaa00, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.08,cy+r*0.48); gfx.lineTo(cx-r*0.08,cy+r*0.72); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08,cy+r*0.48); gfx.lineTo(cx+r*0.08,cy+r*0.72); gfx.strokePath();
        }
    },

    OIE: {
        fr: { answer: 'OIE',  letters: ['O','I','E','U','A','S'] },
        en: { answer: 'DUCK', letters: ['D','U','C','K','A','O'] },
        es: { answer: 'OCA',  letters: ['O','C','A','I','E','T'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xf8f8f0, 1); gfx.fillEllipse(cx,cy+r*0.25,r*1.1,r*0.75);
            gfx.fillRect(cx+r*0.08,cy-r*0.6,r*0.26,r*0.65);
            gfx.fillCircle(cx+r*0.25,cy-r*0.68,r*0.22);
            gfx.fillStyle(0xff8800, 1);
            tri(gfx, cx+r*0.44,cy-r*0.72, cx+r*0.64,cy-r*0.66, cx+r*0.44,cy-r*0.6);
            gfx.fillStyle(0x000000, 1); gfx.fillCircle(cx+r*0.3,cy-r*0.72,r*0.05);
            gfx.lineStyle(2, 0xddddcc, 1);
            gfx.beginPath(); gfx.arc(cx-r*0.1,cy+r*0.1,r*0.4,-0.5,0.5,false); gfx.strokePath();
            gfx.fillStyle(0xff8800, 1);
            gfx.fillEllipse(cx-r*0.15,cy+r*0.64,r*0.26,r*0.11);
            gfx.fillEllipse(cx+r*0.15,cy+r*0.64,r*0.26,r*0.11);
            gfx.fillStyle(0x4488cc, 0.4); gfx.fillEllipse(cx,cy+r*0.85,r*1.4,r*0.22);
        }
    },

    LION: {
        fr: { answer: 'LION', letters: ['L','I','O','N','E','R'] },
        en: { answer: 'LION', letters: ['L','I','O','N','E','A'] },
        es: { answer: 'LEON', letters: ['L','E','O','N','I','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xffc030, 1); gfx.fillEllipse(cx,cy+r*0.55,r*0.8,r*0.55);
            gfx.fillStyle(0xc87820, 1); gfx.fillCircle(cx,cy-r*0.08,r*0.62);
            gfx.fillStyle(0xffc030, 1); gfx.fillCircle(cx,cy-r*0.08,r*0.44);
            gfx.fillStyle(0xffcc88, 1); gfx.fillEllipse(cx,cy+r*0.02,r*0.36,r*0.25);
            gfx.fillStyle(0xcc4466, 1); gfx.fillCircle(cx,cy-r*0.08,r*0.08);
            gfx.fillStyle(0xffcc00, 1);
            gfx.fillCircle(cx-r*0.18,cy-r*0.2,r*0.1); gfx.fillCircle(cx+r*0.18,cy-r*0.2,r*0.1);
            gfx.fillStyle(0x000000, 1);
            gfx.fillCircle(cx-r*0.18,cy-r*0.2,r*0.06); gfx.fillCircle(cx+r*0.18,cy-r*0.2,r*0.06);
            gfx.lineStyle(5, 0xc87820, 1);
            gfx.beginPath(); gfx.arc(cx+r*0.5,cy+r*0.4,r*0.34,-0.3,1.6,false); gfx.strokePath();
            gfx.fillStyle(0x885510, 1); gfx.fillCircle(cx+r*0.82,cy+r*0.62,r*0.11);
        }
    },

    LOUP: {
        fr: { answer: 'LOUP', letters: ['L','O','U','P','A','T'] },
        en: { answer: 'WOLF', letters: ['W','O','L','F','A','E'] },
        es: { answer: 'LOBO', letters: ['L','O','B','O','A','I'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x909090, 1); gfx.fillEllipse(cx,cy+r*0.25,r*1.0,r*0.72);
            gfx.fillCircle(cx,cy-r*0.3,r*0.42);
            gfx.fillStyle(0x909090, 1);
            tri(gfx, cx-r*0.32,cy-r*0.55, cx-r*0.45,cy-r*0.88, cx-r*0.1,cy-r*0.62);
            tri(gfx, cx+r*0.32,cy-r*0.55, cx+r*0.45,cy-r*0.88, cx+r*0.1,cy-r*0.62);
            gfx.fillStyle(0xffaaaa, 1);
            tri(gfx, cx-r*0.32,cy-r*0.58, cx-r*0.4,cy-r*0.8, cx-r*0.16,cy-r*0.65);
            tri(gfx, cx+r*0.32,cy-r*0.58, cx+r*0.4,cy-r*0.8, cx+r*0.16,cy-r*0.65);
            gfx.fillStyle(0xbbbbbb, 1); gfx.fillEllipse(cx,cy-r*0.17,r*0.4,r*0.28);
            gfx.fillStyle(0x111111, 1); gfx.fillEllipse(cx,cy-r*0.28,r*0.14,r*0.09);
            gfx.fillStyle(0xddbb00, 1);
            gfx.fillCircle(cx-r*0.16,cy-r*0.37,r*0.09); gfx.fillCircle(cx+r*0.16,cy-r*0.37,r*0.09);
            gfx.fillStyle(0x000000, 1);
            gfx.fillCircle(cx-r*0.16,cy-r*0.37,r*0.05); gfx.fillCircle(cx+r*0.16,cy-r*0.37,r*0.05);
            gfx.lineStyle(7, 0x909090, 1);
            gfx.beginPath(); gfx.arc(cx-r*0.6,cy+r*0.5,r*0.38,-1.2,0.3,false); gfx.strokePath();
        }
    },

    CERF: {
        fr: { answer: 'CERF',   letters: ['C','E','R','F','O','N'] },
        en: { answer: 'DEER',   letters: ['D','E','E','R','A','O'] },
        es: { answer: 'CIERVO', letters: ['C','I','E','R','V','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xaa6633, 1); gfx.fillEllipse(cx,cy+r*0.28,r*1.0,r*0.68);
            gfx.fillStyle(0xffeecc, 1); gfx.fillEllipse(cx,cy+r*0.38,r*0.52,r*0.35);
            gfx.fillStyle(0xaa6633, 1);
            gfx.fillRect(cx-r*0.14,cy-r*0.62,r*0.28,r*0.42);
            gfx.fillCircle(cx,cy-r*0.7,r*0.27);
            gfx.lineStyle(4, 0x774422, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.08,cy-r*0.9); gfx.lineTo(cx-r*0.22,cy-r*1.08); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.17,cy-r*0.99); gfx.lineTo(cx-r*0.4,cy-r*1.02); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08,cy-r*0.9); gfx.lineTo(cx+r*0.22,cy-r*1.08); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.17,cy-r*0.99); gfx.lineTo(cx+r*0.4,cy-r*1.02); gfx.strokePath();
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx+r*0.11,cy-r*0.72,r*0.06); gfx.fillCircle(cx,cy-r*0.6,r*0.05);
            gfx.lineStyle(5, 0x995522, 1);
            for (const dx of [-0.28,-0.1,0.1,0.28]) {
                gfx.beginPath(); gfx.moveTo(cx+dx*r,cy+r*0.6); gfx.lineTo(cx+dx*r,cy+r*0.88); gfx.strokePath();
            }
        }
    },

    // ── LEVEL 3 : La Nature ──────────────────────────────────────────────
    EAU: {
        fr: { answer: 'EAU',  letters: ['E','A','U','I','O','T'] },
        en: { answer: 'RAIN', letters: ['R','A','I','N','O','E'] },
        es: { answer: 'AGUA', letters: ['A','G','U','A','I','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x1144aa, 1); gfx.fillCircle(cx,cy,r*1.1);
            gfx.lineStyle(4, 0x66aaff, 1);
            for (const dy of [-0.25, 0.05, 0.35]) {
                gfx.beginPath();
                gfx.arc(cx - r*0.4, cy+r*dy, r*0.28, Math.PI, 0, false);
                gfx.arc(cx + r*0.4, cy+r*dy, r*0.28, Math.PI, 0, true);
                gfx.strokePath();
            }
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
        fr: { answer: 'BOIS', letters: ['B','O','I','S','U','E'] },
        en: { answer: 'WOOD', letters: ['W','O','O','D','A','E'] },
        es: { answer: 'PINO', letters: ['P','I','N','O','A','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x335511, 1); gfx.fillRect(cx-r,cy+r*0.5,r*2,r*0.6);
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
        fr: { answer: 'MONT',  letters: ['M','O','N','T','A','R'] },
        en: { answer: 'HILL',  letters: ['H','I','L','L','A','O'] },
        es: { answer: 'MONTE', letters: ['M','O','N','T','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x6699cc, 1); gfx.fillCircle(cx,cy,r*1.1);
            gfx.fillStyle(0x7a8888, 1);
            tri(gfx, cx+r*0.38,cy+r*0.55, cx+r*0.8,cy-r*0.45, cx+r*1.05,cy+r*0.55);
            gfx.fillStyle(0xaaaaaa, 1);
            tri(gfx, cx-r*0.7,cy+r*0.55, cx,cy-r*0.82, cx+r*0.7,cy+r*0.55);
            gfx.fillStyle(0xffffff, 1);
            tri(gfx, cx-r*0.22,cy-r*0.48, cx,cy-r*0.82, cx+r*0.22,cy-r*0.48);
            gfx.fillStyle(0x446622, 1); gfx.fillRect(cx-r,cy+r*0.54,r*2,r*0.18);
        }
    },

    VENT: {
        fr: { answer: 'VENT', letters: ['V','E','N','T','O','L'] },
        en: { answer: 'WIND', letters: ['W','I','N','D','O','A'] },
        es: { answer: 'AIRE', letters: ['A','I','R','E','O','N'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x99bbdd, 1); gfx.fillCircle(cx,cy,r*1.1);
            gfx.lineStyle(5, 0xffffff, 0.85);
            for (const [startA, endA, arcCx, arcCy, arcR] of [
                [0.3,  2.2,  cx-r*0.1, cy-r*0.2, r*0.52],
                [-0.1, 1.8,  cx+r*0.05,cy+r*0.15,r*0.42],
                [0.4,  2.0,  cx-r*0.05,cy+r*0.38,r*0.32],
            ]) {
                gfx.beginPath(); gfx.arc(arcCx, arcCy, arcR, startA, endA, false); gfx.strokePath();
            }
            gfx.fillStyle(0x55aa33, 1);
            gfx.fillEllipse(cx+r*0.55, cy-r*0.45, r*0.18, r*0.1);
            gfx.fillEllipse(cx-r*0.4,  cy+r*0.4,  r*0.14, r*0.08);
            gfx.fillEllipse(cx+r*0.2,  cy+r*0.62, r*0.16, r*0.09);
        }
    },

    CIEL: {
        fr: { answer: 'CIEL',  letters: ['C','I','E','L','O','A'] },
        en: { answer: 'SKY',   letters: ['S','K','Y','A','I','O'] },
        es: { answer: 'CIELO', letters: ['C','I','E','L','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x5599ee, 1); gfx.fillCircle(cx,cy,r*1.1);
            gfx.fillStyle(0xffdd00, 1); gfx.fillCircle(cx+r*0.5,cy-r*0.5,r*0.28);
            gfx.lineStyle(3, 0xffdd00, 1);
            for (let i=0;i<8;i++) {
                const a = i*Math.PI/4;
                const d1=r*0.32, d2=r*0.46;
                gfx.beginPath();
                gfx.moveTo(cx+r*0.5+Math.cos(a)*d1,cy-r*0.5+Math.sin(a)*d1);
                gfx.lineTo(cx+r*0.5+Math.cos(a)*d2,cy-r*0.5+Math.sin(a)*d2);
                gfx.strokePath();
            }
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
        fr: { answer: 'PAIN', letters: ['P','A','I','N','E','O'] },
        en: { answer: 'BUN',  letters: ['B','U','N','A','E','O'] },
        es: { answer: 'PAN',  letters: ['P','A','N','I','E','O'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xc87820, 1);
            gfx.fillEllipse(cx, cy+r*0.05, r*1.3, r*0.72);
            gfx.fillStyle(0xe89830, 1);
            gfx.fillEllipse(cx, cy-r*0.1, r*1.15, r*0.5);
            gfx.lineStyle(3, 0xa05810, 1);
            for (const dx of [-0.3, 0, 0.3]) {
                gfx.beginPath();
                gfx.moveTo(cx+dx*r-r*0.08, cy-r*0.28);
                gfx.lineTo(cx+dx*r+r*0.08, cy+r*0.12);
                gfx.strokePath();
            }
            gfx.fillStyle(0xa05810, 1);
            gfx.fillEllipse(cx, cy+r*0.22, r*1.28, r*0.32);
        }
    },

    LAIT: {
        fr: { answer: 'LAIT',  letters: ['L','A','I','T','O','E'] },
        en: { answer: 'MILK',  letters: ['M','I','L','K','A','O'] },
        es: { answer: 'LECHE', letters: ['L','E','C','H','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xeef8ff, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.32, cy-r*0.62);
            gfx.lineTo(cx+r*0.32, cy-r*0.62);
            gfx.lineTo(cx+r*0.38, cy+r*0.55);
            gfx.lineTo(cx-r*0.38, cy+r*0.55);
            gfx.closePath(); gfx.fillPath();
            gfx.fillStyle(0xffffff, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.36, cy-r*0.0);
            gfx.lineTo(cx+r*0.36, cy-r*0.0);
            gfx.lineTo(cx+r*0.38, cy+r*0.55);
            gfx.lineTo(cx-r*0.38, cy+r*0.55);
            gfx.closePath(); gfx.fillPath();
            gfx.lineStyle(3, 0x99ccee, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.32,cy-r*0.62);
            gfx.lineTo(cx+r*0.32,cy-r*0.62);
            gfx.lineTo(cx+r*0.38,cy+r*0.55);
            gfx.lineTo(cx-r*0.38,cy+r*0.55);
            gfx.closePath(); gfx.strokePath();
            gfx.fillStyle(0xeef8ff, 1);
            gfx.fillCircle(cx-r*0.12,cy+r*0.08,r*0.06);
            gfx.fillCircle(cx+r*0.1, cy+r*0.18,r*0.05);
            gfx.fillCircle(cx+r*0.22,cy+r*0.04,r*0.04);
        }
    },

    NOIX: {
        fr: { answer: 'NOIX', letters: ['N','O','I','X','A','E'] },
        en: { answer: 'NUT',  letters: ['N','U','T','A','O','I'] },
        es: { answer: 'NUEZ', letters: ['N','U','E','Z','A','O'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x9a6228, 1); gfx.fillEllipse(cx,cy,r*1.0,r*0.82);
            gfx.lineStyle(3, 0x7a4818, 1);
            gfx.beginPath(); gfx.moveTo(cx,cy-r*0.41); gfx.lineTo(cx,cy+r*0.41); gfx.strokePath();
            gfx.lineStyle(2, 0x7a4818, 0.7);
            gfx.beginPath(); gfx.arc(cx-r*0.2,cy-r*0.05,r*0.28,2.0,4.8,false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx-r*0.2,cy+r*0.1, r*0.22,1.8,4.6,false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx+r*0.2,cy-r*0.05,r*0.28,Math.PI-4.8+Math.PI,Math.PI-2.0+Math.PI,false); gfx.strokePath();
            gfx.fillStyle(0xcc9a4a, 0.5); gfx.fillEllipse(cx-r*0.18,cy-r*0.15,r*0.28,r*0.2);
        }
    },

    MIEL: {
        fr: { answer: 'MIEL',  letters: ['M','I','E','L','A','O'] },
        en: { answer: 'HONEY', letters: ['H','O','N','E','Y','A'] },
        es: { answer: 'MIEL',  letters: ['M','I','E','L','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xffcc00, 1);
            gfx.fillRoundedRect(cx-r*0.42,cy-r*0.42,r*0.84,r*0.9,r*0.12);
            gfx.fillStyle(0xff9900, 0.5);
            gfx.fillRoundedRect(cx-r*0.42,cy,r*0.84,r*0.48,r*0.1);
            gfx.fillStyle(0xaa5500, 1);
            gfx.fillRoundedRect(cx-r*0.46,cy-r*0.52,r*0.92,r*0.18,r*0.06);
            gfx.fillStyle(0xffcc00, 1);
            gfx.fillEllipse(cx+r*0.22,cy+r*0.56,r*0.14,r*0.1);
            gfx.beginPath();
            gfx.moveTo(cx+r*0.16,cy+r*0.48);
            gfx.lineTo(cx+r*0.28,cy+r*0.48);
            gfx.lineTo(cx+r*0.28,cy+r*0.54);
            gfx.closePath(); gfx.fillPath();
            gfx.lineStyle(2, 0xaa5500, 0.6);
            gfx.strokeRect(cx-r*0.32,cy-r*0.28,r*0.64,r*0.42);
        }
    },

    OEUF: {
        fr: { answer: 'OEUF',  letters: ['O','E','U','F','I','A'] },
        en: { answer: 'EGG',   letters: ['E','G','G','A','O','I'] },
        es: { answer: 'HUEVO', letters: ['H','U','E','V','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfffdf2, 1);
            gfx.fillEllipse(cx, cy, r*0.75, r*0.96);
            gfx.lineStyle(3, 0xddccaa, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.12,cy-r*0.15);
            gfx.lineTo(cx-r*0.04,cy-r*0.04);
            gfx.lineTo(cx+r*0.1, cy-r*0.12);
            gfx.strokePath();
            gfx.fillStyle(0xffcc00, 1);
            gfx.fillCircle(cx+r*0.04,cy-r*0.04,r*0.1);
            gfx.lineStyle(1, 0xddccaa, 0.5);
            gfx.strokeEllipse(cx,cy,r*0.75,r*0.96);
        }
    },

    // ── LEVEL 5 : La Maison ──────────────────────────────────────────────
    VELO: {
        fr: { answer: 'VELO', letters: ['V','E','L','O','A','I'] },
        en: { answer: 'BIKE', letters: ['B','I','K','E','A','O'] },
        es: { answer: 'BICI', letters: ['B','I','C','I','A','E'] },
        drawPicture(gfx, cx, cy, r) {
            const wy = cy+r*0.18;
            gfx.lineStyle(5, 0x222222, 1);
            gfx.strokeCircle(cx-r*0.34,wy,r*0.34);
            gfx.strokeCircle(cx+r*0.34,wy,r*0.34);
            gfx.fillStyle(0x222222, 1);
            gfx.fillCircle(cx-r*0.34,wy,r*0.05); gfx.fillCircle(cx+r*0.34,wy,r*0.05);
            gfx.lineStyle(5, 0xff4400, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.34,wy);
            gfx.lineTo(cx,cy-r*0.1);
            gfx.lineTo(cx+r*0.34,wy);
            gfx.strokePath();
            gfx.beginPath();
            gfx.moveTo(cx-r*0.34,wy);
            gfx.lineTo(cx+r*0.06,cy-r*0.1);
            gfx.strokePath();
            gfx.beginPath();
            gfx.moveTo(cx,cy-r*0.1);
            gfx.lineTo(cx-r*0.08,cy-r*0.3);
            gfx.strokePath();
            gfx.lineStyle(4, 0x553311, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.2,cy-r*0.3);
            gfx.lineTo(cx+r*0.05,cy-r*0.3);
            gfx.strokePath();
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
        fr: { answer: 'AUTO',  letters: ['A','U','T','O','E','N'] },
        en: { answer: 'CAR',   letters: ['C','A','R','O','E','N'] },
        es: { answer: 'COCHE', letters: ['C','O','C','H','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xdd2222, 1);
            gfx.fillRoundedRect(cx-r*0.7,cy-r*0.15,r*1.4,r*0.52,r*0.12);
            gfx.fillRoundedRect(cx-r*0.4,cy-r*0.55,r*0.8,r*0.42,r*0.12);
            gfx.fillStyle(0x88ccff, 1);
            gfx.fillRoundedRect(cx-r*0.34,cy-r*0.5,r*0.32,r*0.28,r*0.06);
            gfx.fillRoundedRect(cx+r*0.04,cy-r*0.5,r*0.28,r*0.28,r*0.06);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.44,cy+r*0.38,r*0.22);
            gfx.fillCircle(cx+r*0.44,cy+r*0.38,r*0.22);
            gfx.fillStyle(0x888888, 1);
            gfx.fillCircle(cx-r*0.44,cy+r*0.38,r*0.1);
            gfx.fillCircle(cx+r*0.44,cy+r*0.38,r*0.1);
            gfx.lineStyle(2, 0xaa1111, 1);
            gfx.beginPath(); gfx.moveTo(cx,cy-r*0.15); gfx.lineTo(cx,cy+r*0.37); gfx.strokePath();
            gfx.fillStyle(0xffff99, 1); gfx.fillCircle(cx+r*0.62,cy+r*0.04,r*0.08);
            gfx.fillStyle(0xff6666, 1); gfx.fillCircle(cx-r*0.62,cy+r*0.04,r*0.08);
        }
    },

    BAIN: {
        fr: { answer: 'BAIN', letters: ['B','A','I','N','O','E'] },
        en: { answer: 'BATH', letters: ['B','A','T','H','O','E'] },
        es: { answer: 'TINA', letters: ['T','I','N','A','O','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xdddddd, 1);
            gfx.fillRoundedRect(cx-r*0.7,cy-r*0.15,r*1.4,r*0.62,r*0.18);
            gfx.fillStyle(0x55aaee, 0.85);
            gfx.fillRoundedRect(cx-r*0.62,cy-r*0.06,r*1.24,r*0.42,r*0.1);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.28,cy-r*0.02,r*0.1);
            gfx.fillCircle(cx,      cy+r*0.08,r*0.08);
            gfx.fillCircle(cx+r*0.25,cy-r*0.0, r*0.12);
            gfx.fillCircle(cx+r*0.5, cy+r*0.1, r*0.07);
            gfx.fillStyle(0xbbbbbb, 1);
            gfx.fillRect(cx-r*0.58,cy+r*0.46,r*0.12,r*0.18);
            gfx.fillRect(cx+r*0.46,cy+r*0.46,r*0.12,r*0.18);
            gfx.lineStyle(3, 0xbbbbbb, 1);
            gfx.strokeRoundedRect(cx-r*0.7,cy-r*0.15,r*1.4,r*0.62,r*0.18);
            gfx.fillStyle(0xaaaaaa, 1);
            gfx.fillRect(cx-r*0.06,cy-r*0.38,r*0.12,r*0.26);
            gfx.fillRect(cx-r*0.2, cy-r*0.44,r*0.4,r*0.1);
        }
    },

    FOUR: {
        fr: { answer: 'FOUR',  letters: ['F','O','U','R','A','T'] },
        en: { answer: 'OVEN',  letters: ['O','V','E','N','A','I'] },
        es: { answer: 'HORNO', letters: ['H','O','R','N','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x444444, 1);
            gfx.fillRoundedRect(cx-r*0.65,cy-r*0.65,r*1.3,r*1.22,r*0.08);
            gfx.fillStyle(0x333333, 1);
            gfx.fillRoundedRect(cx-r*0.5,cy-r*0.55,r*1.0,r*0.82,r*0.06);
            gfx.fillStyle(0x111111, 1);
            gfx.fillRoundedRect(cx-r*0.38,cy-r*0.46,r*0.76,r*0.56,r*0.1);
            gfx.fillStyle(0xff8800, 0.9);
            gfx.fillEllipse(cx,cy-r*0.18,r*0.38,r*0.28);
            gfx.fillStyle(0xffdd00, 0.8);
            gfx.fillEllipse(cx,cy-r*0.22,r*0.22,r*0.18);
            gfx.fillStyle(0xffffff, 0.5);
            gfx.fillCircle(cx,cy-r*0.26,r*0.07);
            gfx.fillStyle(0x666666, 1);
            for (const dx of [-0.4,-0.13,0.13,0.4]) {
                gfx.fillCircle(cx+dx*r, cy+r*0.55, r*0.1);
            }
            gfx.fillStyle(0x555555, 1);
            gfx.fillRect(cx-r*0.65,cy-r*0.65,r*1.3,r*0.1);
        }
    },

    VASE: {
        fr: { answer: 'VASE',  letters: ['V','A','S','E','O','I'] },
        en: { answer: 'VASE',  letters: ['V','A','S','E','O','I'] },
        es: { answer: 'JARRO', letters: ['J','A','R','R','O','I'] },
        drawPicture(gfx, cx, cy, r) {
            const petals = [0xff4466, 0xff9900, 0xffdd00, 0xff4466, 0xff9900];
            petals.forEach((c,i) => {
                const a = (i/petals.length)*Math.PI*2;
                gfx.fillStyle(c, 1);
                gfx.fillCircle(cx+Math.cos(a)*r*0.2, cy-r*0.7+Math.sin(a)*r*0.2, r*0.14);
            });
            gfx.fillStyle(0xffff00, 1); gfx.fillCircle(cx,cy-r*0.7,r*0.12);
            gfx.lineStyle(4, 0x338822, 1);
            gfx.beginPath(); gfx.moveTo(cx,cy-r*0.55); gfx.lineTo(cx,cy-r*0.28); gfx.strokePath();
            gfx.fillStyle(0x4488cc, 1);
            gfx.fillRect(cx-r*0.15,cy-r*0.28,r*0.3,r*0.22);
            gfx.fillRect(cx-r*0.22,cy-r*0.3,r*0.44,r*0.06);
            gfx.fillEllipse(cx,cy+r*0.15,r*0.82,r*0.62);
            gfx.fillRect(cx-r*0.28,cy+r*0.42,r*0.56,r*0.1);
            gfx.lineStyle(2, 0x2266aa, 1);
            gfx.beginPath(); gfx.arc(cx,cy+r*0.08,r*0.38,0.5,Math.PI-0.5,false); gfx.strokePath();
            gfx.fillStyle(0x88bbee, 0.5);
            gfx.fillEllipse(cx-r*0.18,cy+r*0.0,r*0.16,r*0.3);
        }
    },

    // ── LEVEL 5 : La Famille ─────────────────────────────────────────────────
    PAPA: {
        fr: { answer: 'PAPA', letters: ['P','A','P','A','M','E'] },
        en: { answer: 'PAPA', letters: ['P','A','P','A','M','E'] },
        es: { answer: 'PAPA', letters: ['P','A','P','A','M','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x334466, 1);
            gfx.fillRect(cx-r*0.2, cy+r*0.32, r*0.16, r*0.38);
            gfx.fillRect(cx+r*0.04, cy+r*0.32, r*0.16, r*0.38);
            gfx.fillStyle(0x4466aa, 1);
            gfx.fillRect(cx-r*0.27, cy-r*0.18, r*0.54, r*0.52);
            gfx.fillRect(cx-r*0.47, cy-r*0.16, r*0.2, r*0.18);
            gfx.fillRect(cx+r*0.27, cy-r*0.16, r*0.2, r*0.18);
            gfx.fillStyle(0xdd2222, 1);
            tri(gfx, cx-r*0.06, cy-r*0.16, cx+r*0.06, cy-r*0.16, cx, cy+r*0.14);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx, cy-r*0.38, r*0.2);
            gfx.fillStyle(0x442200, 1);
            gfx.fillRect(cx-r*0.2, cy-r*0.58, r*0.4, r*0.12);
            gfx.fillStyle(0x333333, 1);
            gfx.fillCircle(cx-r*0.08, cy-r*0.4, r*0.04);
            gfx.fillCircle(cx+r*0.08, cy-r*0.4, r*0.04);
            gfx.lineStyle(2, 0x884422, 1);
            gfx.beginPath(); gfx.arc(cx, cy-r*0.3, r*0.07, 0.3, Math.PI-0.3); gfx.strokePath();
        }
    },
    MAMA: {
        fr: { answer: 'MAMAN', letters: ['M','A','M','A','P','N'] },
        en: { answer: 'MOMMY', letters: ['M','A','M','O','M','Y'] },
        es: { answer: 'MAMA', letters: ['M','A','M','A','P','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xcc44aa, 1);
            gfx.fillRect(cx-r*0.24, cy-r*0.18, r*0.48, r*0.3);
            tri(gfx, cx-r*0.24, cy+r*0.12, cx+r*0.24, cy+r*0.12, cx-r*0.44, cy+r*0.7);
            tri(gfx, cx-r*0.24, cy+r*0.12, cx+r*0.24, cy+r*0.12, cx+r*0.44, cy+r*0.7);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillRect(cx-r*0.44, cy-r*0.16, r*0.2, r*0.18);
            gfx.fillRect(cx+r*0.24, cy-r*0.16, r*0.2, r*0.18);
            gfx.fillCircle(cx, cy-r*0.38, r*0.2);
            gfx.fillStyle(0x8b4513, 1);
            gfx.fillRect(cx-r*0.22, cy-r*0.58, r*0.44, r*0.14);
            gfx.fillRect(cx-r*0.22, cy-r*0.44, r*0.08, r*0.26);
            gfx.fillRect(cx+r*0.14, cy-r*0.44, r*0.08, r*0.26);
            gfx.fillStyle(0x333333, 1);
            gfx.fillCircle(cx-r*0.08, cy-r*0.4, r*0.04);
            gfx.fillCircle(cx+r*0.08, cy-r*0.4, r*0.04);
            gfx.lineStyle(2, 0x884422, 1);
            gfx.beginPath(); gfx.arc(cx, cy-r*0.3, r*0.07, 0.3, Math.PI-0.3); gfx.strokePath();
        }
    },
    BEBE: {
        fr: { answer: 'BEBE', letters: ['B','E','B','E','A','L'] },
        en: { answer: 'BABY', letters: ['B','A','B','Y','E','L'] },
        es: { answer: 'BEBE', letters: ['B','E','B','E','A','L'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfffacd, 1);
            gfx.fillEllipse(cx, cy+r*0.25, r*1.0, r*0.82);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.46, cy+r*0.2, r*0.12);
            gfx.fillCircle(cx+r*0.46, cy+r*0.2, r*0.12);
            gfx.fillCircle(cx, cy-r*0.3, r*0.3);
            gfx.fillStyle(0x88ccff, 1);
            gfx.fillRect(cx-r*0.3, cy-r*0.6, r*0.6, r*0.2);
            gfx.fillEllipse(cx, cy-r*0.6, r*0.6, r*0.16);
            gfx.fillStyle(0x333333, 1);
            gfx.fillCircle(cx-r*0.11, cy-r*0.3, r*0.07);
            gfx.fillCircle(cx+r*0.11, cy-r*0.3, r*0.07);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.08, cy-r*0.33, r*0.03);
            gfx.fillCircle(cx+r*0.14, cy-r*0.33, r*0.03);
            gfx.lineStyle(2, 0xcc6644, 1);
            gfx.beginPath(); gfx.arc(cx, cy-r*0.2, r*0.08, 0.3, Math.PI-0.3); gfx.strokePath();
        }
    },
    TATA: {
        fr: { answer: 'TATA', letters: ['T','A','T','A','M','E'] },
        en: { answer: 'AUNT', letters: ['A','U','N','T','I','E'] },
        es: { answer: 'TATA', letters: ['T','A','T','A','M','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x9966cc, 1);
            gfx.fillRect(cx-r*0.24, cy-r*0.18, r*0.48, r*0.3);
            tri(gfx, cx-r*0.24, cy+r*0.12, cx+r*0.24, cy+r*0.12, cx-r*0.42, cy+r*0.68);
            tri(gfx, cx-r*0.24, cy+r*0.12, cx+r*0.24, cy+r*0.12, cx+r*0.42, cy+r*0.68);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillRect(cx-r*0.44, cy-r*0.16, r*0.2, r*0.18);
            gfx.fillRect(cx+r*0.24, cy-r*0.16, r*0.2, r*0.18);
            gfx.fillCircle(cx, cy-r*0.38, r*0.2);
            gfx.fillStyle(0xff88cc, 1);
            gfx.fillEllipse(cx, cy-r*0.57, r*0.6, r*0.13);
            gfx.fillRect(cx-r*0.18, cy-r*0.74, r*0.36, r*0.18);
            gfx.fillStyle(0xffdd44, 1);
            gfx.fillCircle(cx+r*0.14, cy-r*0.72, r*0.07);
            gfx.fillStyle(0xcc8844, 1);
            gfx.fillRect(cx-r*0.18, cy-r*0.56, r*0.36, r*0.1);
            gfx.fillStyle(0x333333, 1);
            gfx.fillCircle(cx-r*0.08, cy-r*0.4, r*0.04);
            gfx.fillCircle(cx+r*0.08, cy-r*0.4, r*0.04);
            gfx.lineStyle(2, 0x884422, 1);
            gfx.beginPath(); gfx.arc(cx, cy-r*0.3, r*0.07, 0.3, Math.PI-0.3); gfx.strokePath();
        }
    },
    PAPI: {
        fr: { answer: 'PAPI', letters: ['P','A','P','I','M','E'] },
        en: { answer: 'PAPI', letters: ['P','A','P','I','M','E'] },
        es: { answer: 'PAPI', letters: ['P','A','P','I','M','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x445544, 1);
            gfx.fillRect(cx-r*0.2, cy+r*0.32, r*0.16, r*0.36);
            gfx.fillRect(cx+r*0.04, cy+r*0.32, r*0.16, r*0.36);
            gfx.fillStyle(0x558844, 1);
            gfx.fillRect(cx-r*0.27, cy-r*0.18, r*0.54, r*0.52);
            gfx.fillRect(cx-r*0.47, cy-r*0.16, r*0.2, r*0.18);
            gfx.fillRect(cx+r*0.27, cy-r*0.16, r*0.2, r*0.18);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx, cy-r*0.38, r*0.2);
            gfx.fillStyle(0xdddddd, 1);
            gfx.fillRect(cx-r*0.2, cy-r*0.58, r*0.4, r*0.12);
            gfx.lineStyle(2, 0x333333, 1);
            gfx.strokeCircle(cx-r*0.09, cy-r*0.4, r*0.07);
            gfx.strokeCircle(cx+r*0.09, cy-r*0.4, r*0.07);
            gfx.beginPath(); gfx.moveTo(cx-r*0.02, cy-r*0.4); gfx.lineTo(cx+r*0.02, cy-r*0.4); gfx.strokePath();
            gfx.lineStyle(3, 0x8b4513, 1);
            gfx.beginPath(); gfx.moveTo(cx+r*0.42, cy-r*0.06); gfx.lineTo(cx+r*0.46, cy+r*0.68); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx+r*0.4, cy-r*0.08, r*0.07, -Math.PI*0.5, Math.PI*0.5); gfx.strokePath();
        }
    },

    // ── LEVEL 6 : Les Couleurs ───────────────────────────────────────────────
    BLEU: {
        fr: { answer: 'BLEU', letters: ['B','L','E','U','R','O'] },
        en: { answer: 'BLUE', letters: ['B','L','U','E','R','O'] },
        es: { answer: 'AZUL', letters: ['A','Z','U','L','E','O'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x2288ee, 1);
            gfx.fillCircle(cx, cy+r*0.15, r*0.58);
            tri(gfx, cx-r*0.42, cy+r*0.15, cx+r*0.42, cy+r*0.15, cx, cy-r*0.62);
            gfx.fillStyle(0xaaddff, 0.6);
            gfx.fillCircle(cx-r*0.18, cy-r*0.04, r*0.14);
        }
    },
    ROSE: {
        fr: { answer: 'ROSE', letters: ['R','O','S','E','I','A'] },
        en: { answer: 'PINK', letters: ['P','I','N','K','O','A'] },
        es: { answer: 'ROSA', letters: ['R','O','S','A','I','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.lineStyle(4, 0x338822, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy+r*0.72); gfx.lineTo(cx, cy+r*0.1); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            tri(gfx, cx, cy+r*0.3, cx-r*0.32, cy+r*0.08, cx-r*0.08, cy+r*0.52);
            const cols = [0xff88bb, 0xff99cc, 0xffaadd, 0xff77aa, 0xff88bb];
            cols.forEach((c, i) => {
                const a = (i / cols.length) * Math.PI * 2;
                gfx.fillStyle(c, 1);
                gfx.fillEllipse(cx + Math.cos(a)*r*0.28, cy-r*0.18 + Math.sin(a)*r*0.28, r*0.3, r*0.42);
            });
            gfx.fillStyle(0xffee66, 1);
            gfx.fillCircle(cx, cy-r*0.18, r*0.14);
        }
    },
    NOIR: {
        fr: { answer: 'NOIR',  letters: ['N','O','I','R','E','A'] },
        en: { answer: 'BLACK', letters: ['B','L','A','C','K','O'] },
        es: { answer: 'NEGRO', letters: ['N','E','G','R','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x111122, 1);
            gfx.fillRoundedRect(cx-r*0.7, cy-r*0.72, r*1.4, r*1.44, r*0.14);
            gfx.fillStyle(0xffdd44, 1);
            gfx.fillCircle(cx+r*0.05, cy-r*0.1, r*0.38);
            gfx.fillStyle(0x111122, 1);
            gfx.fillCircle(cx+r*0.26, cy-r*0.18, r*0.32);
            gfx.fillStyle(0xffffff, 1);
            [[-0.35,-0.52],[0.38,-0.54],[-0.5,0.1],[0.44,0.25],[-0.1,0.5]].forEach(([dx, dy]) => {
                gfx.fillCircle(cx+dx*r, cy+dy*r, r*0.05);
            });
        }
    },
    VERT: {
        fr: { answer: 'VERT',  letters: ['V','E','R','T','O','A'] },
        en: { answer: 'GREEN', letters: ['G','R','E','E','N','A'] },
        es: { answer: 'VERDE', letters: ['V','E','R','D','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x33bb44, 1);
            gfx.fillEllipse(cx, cy-r*0.05, r*0.88, r*1.44);
            gfx.lineStyle(4, 0x228833, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy+r*0.72); gfx.lineTo(cx, cy+r*0.88); gfx.strokePath();
            gfx.lineStyle(2, 0x228833, 0.8);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.72); gfx.lineTo(cx, cy+r*0.72); gfx.strokePath();
            [[-0.42,-0.05],[0.42,-0.05],[-0.36,0.28],[0.36,0.28]].forEach(([dx, dy]) => {
                gfx.beginPath(); gfx.moveTo(cx, cy+dy*r); gfx.lineTo(cx+dx*r, cy+(dy+0.22)*r); gfx.strokePath();
            });
            gfx.fillStyle(0x88ee88, 0.3);
            gfx.fillEllipse(cx-r*0.14, cy-r*0.2, r*0.24, r*0.55);
        }
    },
    GRIS: {
        fr: { answer: 'GRIS', letters: ['G','R','I','S','E','A'] },
        en: { answer: 'GREY', letters: ['G','R','E','Y','A','O'] },
        es: { answer: 'GRIS', letters: ['G','R','I','S','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x999999, 1);
            gfx.fillCircle(cx-r*0.28, cy-r*0.15, r*0.32);
            gfx.fillCircle(cx+r*0.28, cy-r*0.15, r*0.32);
            gfx.fillCircle(cx,        cy-r*0.32,  r*0.35);
            gfx.fillCircle(cx,        cy+r*0.02,  r*0.32);
            gfx.fillRect(cx-r*0.58, cy+r*0.02, r*1.16, r*0.2);
            gfx.fillStyle(0x6688aa, 1);
            [[-0.38,0.36],[-0.18,0.5],[0.02,0.38],[0.22,0.52],[0.4,0.4]].forEach(([dx, dy]) => {
                gfx.fillRect(cx+dx*r, cy+dy*r, r*0.06, r*0.2);
            });
        }
    },

    // ── LEVEL 7 : Le Corps ────────────────────────────────────────────────────
    NEZ: {
        fr: { answer: 'NEZ',   letters: ['N','E','Z','B','O','A'] },
        en: { answer: 'NOSE',  letters: ['N','O','S','E','A','I'] },
        es: { answer: 'NARIZ', letters: ['N','A','R','I','Z','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillRoundedRect(cx-r*0.14, cy-r*0.58, r*0.28, r*0.65, r*0.08);
            gfx.fillCircle(cx, cy+r*0.12, r*0.3);
            gfx.fillStyle(0xcc9977, 1);
            gfx.fillCircle(cx-r*0.18, cy+r*0.16, r*0.13);
            gfx.fillCircle(cx+r*0.18, cy+r*0.16, r*0.13);
            gfx.fillStyle(0xffeecc, 0.5);
            gfx.fillCircle(cx-r*0.04, cy+r*0.02, r*0.1);
        }
    },
    BRAS: {
        fr: { answer: 'BRAS',  letters: ['B','R','A','S','E','O'] },
        en: { answer: 'ARM',   letters: ['A','R','M','E','O','I'] },
        es: { answer: 'BRAZO', letters: ['B','R','A','Z','O','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillRoundedRect(cx-r*0.52, cy-r*0.04, r*0.46, r*0.28, r*0.1);
            gfx.fillCircle(cx-r*0.26, cy-r*0.08, r*0.24);
            gfx.fillRoundedRect(cx-r*0.18, cy-r*0.56, r*0.28, r*0.58, r*0.1);
            gfx.fillRoundedRect(cx-r*0.22, cy-r*0.72, r*0.36, r*0.22, r*0.07);
        }
    },
    MAIN: {
        fr: { answer: 'MAIN', letters: ['M','A','I','N','O','E'] },
        en: { answer: 'HAND', letters: ['H','A','N','D','O','E'] },
        es: { answer: 'MANO', letters: ['M','A','N','O','I','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillRoundedRect(cx-r*0.32, cy-r*0.12, r*0.64, r*0.6, r*0.12);
            gfx.fillRoundedRect(cx-r*0.52, cy-r*0.24, r*0.22, r*0.36, r*0.1);
            for (let i = 0; i < 4; i++) {
                gfx.fillRoundedRect(cx-r*0.28+i*r*0.18, cy-r*0.58, r*0.14, r*0.5, r*0.06);
            }
            gfx.lineStyle(1, 0xcc9977, 0.4);
            for (let i = 0; i < 4; i++) {
                gfx.beginPath();
                gfx.moveTo(cx-r*0.28+i*r*0.18, cy-r*0.12);
                gfx.lineTo(cx-r*0.14+i*r*0.18, cy-r*0.12);
                gfx.strokePath();
            }
        }
    },
    PIED: {
        fr: { answer: 'PIED', letters: ['P','I','E','D','O','A'] },
        en: { answer: 'FOOT', letters: ['F','O','O','T','E','A'] },
        es: { answer: 'PIE',  letters: ['P','I','E','O','A','D'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.32, cy+r*0.28, r*0.28);
            gfx.fillEllipse(cx+r*0.04, cy+r*0.35, r*1.1, r*0.5);
            const toeR = [0.12, 0.11, 0.1, 0.09, 0.08];
            const toeX = [0.42, 0.3, 0.18, 0.07, -0.04];
            const toeY = [-0.06, -0.14, -0.16, -0.12, -0.06];
            toeR.forEach((tr, i) => gfx.fillCircle(cx+toeX[i]*r, cy+toeY[i]*r, tr*r));
        }
    },
    TETE: {
        fr: { answer: 'TETE',   letters: ['T','E','T','E','A','R'] },
        en: { answer: 'HEAD',   letters: ['H','E','A','D','O','R'] },
        es: { answer: 'CABEZA', letters: ['C','A','B','E','Z','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx, cy, r*0.62);
            gfx.fillRect(cx-r*0.18, cy+r*0.55, r*0.36, r*0.22);
            gfx.fillStyle(0x8b4513, 1);
            gfx.fillRect(cx-r*0.62, cy-r*0.62, r*1.24, r*0.3);
            gfx.fillEllipse(cx, cy-r*0.52, r*1.24, r*0.48);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.62, cy, r*0.14);
            gfx.fillCircle(cx+r*0.62, cy, r*0.14);
            gfx.fillStyle(0x333333, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.08, r*0.1);
            gfx.fillCircle(cx+r*0.2, cy-r*0.08, r*0.1);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.17, cy-r*0.11, r*0.04);
            gfx.fillCircle(cx+r*0.23, cy-r*0.11, r*0.04);
            gfx.fillStyle(0xcc9977, 1);
            gfx.fillCircle(cx-r*0.06, cy+r*0.12, r*0.06);
            gfx.fillCircle(cx+r*0.06, cy+r*0.12, r*0.06);
            gfx.lineStyle(3, 0x884422, 1);
            gfx.beginPath(); gfx.arc(cx, cy+r*0.28, r*0.18, 0.3, Math.PI-0.3); gfx.strokePath();
        }
    },

    // ── LEVEL 8 : Les Fruits ─────────────────────────────────────────────────
    KIWI: {
        fr: { answer: 'KIWI', letters: ['K','I','W','I','O','E'] },
        en: { answer: 'KIWI', letters: ['K','I','W','I','O','E'] },
        es: { answer: 'KIWI', letters: ['K','I','W','I','O','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x8b5e3c, 1);
            gfx.fillEllipse(cx, cy, r*1.3, r*1.1);
            gfx.fillStyle(0x88cc44, 1);
            gfx.fillEllipse(cx, cy, r*1.0, r*0.82);
            gfx.fillStyle(0xeeffee, 1);
            gfx.fillCircle(cx, cy, r*0.2);
            gfx.lineStyle(2, 0x223300, 0.8);
            for (let i = 0; i < 12; i++) {
                const a = (i / 12) * Math.PI * 2;
                gfx.beginPath();
                gfx.moveTo(cx + Math.cos(a)*r*0.22, cy + Math.sin(a)*r*0.22);
                gfx.lineTo(cx + Math.cos(a)*r*0.46, cy + Math.sin(a)*r*0.46);
                gfx.strokePath();
            }
            gfx.fillStyle(0x111100, 1);
            for (let i = 0; i < 12; i++) {
                const a = (i / 12) * Math.PI * 2;
                gfx.fillCircle(cx + Math.cos(a)*r*0.38, cy + Math.sin(a)*r*0.38, r*0.04);
            }
        }
    },
    POIRE: {
        fr: { answer: 'POIRE', letters: ['P','O','I','R','E','A'] },
        en: { answer: 'PEAR',  letters: ['P','E','A','R','O','I'] },
        es: { answer: 'PERA',  letters: ['P','E','R','A','O','I'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xd4e044, 1);
            gfx.fillCircle(cx, cy+r*0.2, r*0.52);
            gfx.fillEllipse(cx, cy-r*0.28, r*0.52, r*0.62);
            gfx.lineStyle(4, 0x8b5e3c, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.6); gfx.lineTo(cx+r*0.08, cy-r*0.82); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            tri(gfx, cx+r*0.08, cy-r*0.82, cx+r*0.32, cy-r*0.72, cx+r*0.14, cy-r*0.62);
            gfx.fillStyle(0xeeff88, 0.5);
            gfx.fillCircle(cx-r*0.16, cy-r*0.2, r*0.18);
        }
    },
    POMME: {
        fr: { answer: 'POMME',   letters: ['P','O','M','M','E','A'] },
        en: { answer: 'APPLE',   letters: ['A','P','P','L','E','O'] },
        es: { answer: 'MANZANA', letters: ['M','A','N','Z','A','N','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xee2222, 1);
            gfx.fillCircle(cx, cy+r*0.06, r*0.58);
            gfx.fillStyle(0xcc1111, 1);
            gfx.fillCircle(cx, cy-r*0.42, r*0.22);
            gfx.fillStyle(0xee2222, 1);
            gfx.fillCircle(cx, cy-r*0.36, r*0.22);
            gfx.lineStyle(4, 0x8b5e3c, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.52); gfx.lineTo(cx+r*0.06, cy-r*0.74); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            tri(gfx, cx+r*0.06, cy-r*0.74, cx+r*0.36, cy-r*0.66, cx+r*0.1, cy-r*0.56);
            gfx.fillStyle(0xff8888, 0.5);
            gfx.fillCircle(cx-r*0.2, cy-r*0.1, r*0.18);
        }
    },
    FIGUE: {
        fr: { answer: 'FIGUE', letters: ['F','I','G','U','E','A'] },
        en: { answer: 'FIG',   letters: ['F','I','G','U','E','A'] },
        es: { answer: 'HIGO',  letters: ['H','I','G','O','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x8844aa, 1);
            gfx.fillCircle(cx, cy+r*0.1, r*0.52);
            gfx.fillEllipse(cx, cy-r*0.28, r*0.38, r*0.52);
            gfx.lineStyle(3, 0x556622, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.52); gfx.lineTo(cx, cy-r*0.7); gfx.strokePath();
            gfx.fillStyle(0x663388, 1);
            gfx.fillCircle(cx, cy+r*0.58, r*0.1);
            gfx.fillStyle(0xaa66cc, 0.4);
            gfx.fillCircle(cx-r*0.18, cy-r*0.05, r*0.16);
        }
    },
    PRUNE: {
        fr: { answer: 'PRUNE',   letters: ['P','R','U','N','E','A'] },
        en: { answer: 'PLUM',    letters: ['P','L','U','M','A','E'] },
        es: { answer: 'CIRUELA', letters: ['C','I','R','U','E','L','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x6622aa, 1);
            gfx.fillCircle(cx, cy, r*0.58);
            gfx.lineStyle(3, 0x8b5e3c, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.56); gfx.lineTo(cx+r*0.04, cy-r*0.76); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            tri(gfx, cx+r*0.04, cy-r*0.76, cx+r*0.3, cy-r*0.66, cx+r*0.08, cy-r*0.58);
            gfx.fillStyle(0xaa66dd, 0.5);
            gfx.fillCircle(cx-r*0.18, cy-r*0.15, r*0.2);
        }
    },

    // ── LEVEL 9 : La Ferme ───────────────────────────────────────────────────
    VACHE: {
        fr: { answer: 'VACHE', letters: ['V','A','C','H','E','O'] },
        en: { answer: 'COW',   letters: ['C','O','W','A','E','I'] },
        es: { answer: 'VACA',  letters: ['V','A','C','A','O','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx, cy+r*0.12, r*1.2, r*0.8);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.3, cy, r*0.22);
            gfx.fillCircle(cx+r*0.25, cy+r*0.22, r*0.18);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx+r*0.5, cy-r*0.12, r*0.3);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx+r*0.56, cy-r*0.22, r*0.14);
            gfx.fillCircle(cx+r*0.62, cy-r*0.18, r*0.06);
            gfx.fillStyle(0xffaaaa, 1);
            gfx.fillEllipse(cx+r*0.66, cy-r*0.04, r*0.22, r*0.14);
            gfx.fillStyle(0x222222, 1);
            gfx.fillCircle(cx+r*0.61, cy-r*0.02, r*0.04);
            gfx.fillCircle(cx+r*0.71, cy-r*0.02, r*0.04);
            gfx.fillStyle(0xddb844, 1);
            tri(gfx, cx+r*0.38, cy-r*0.36, cx+r*0.44, cy-r*0.58, cx+r*0.52, cy-r*0.36);
            gfx.fillStyle(0xffffff, 1);
            [[-0.35,0.52],[-0.15,0.52],[0.15,0.52],[0.35,0.52]].forEach(([dx, dy]) => {
                gfx.fillRect(cx+dx*r-r*0.07, cy+dy*r, r*0.14, r*0.28);
            });
            gfx.fillStyle(0xffcccc, 1);
            gfx.fillEllipse(cx, cy+r*0.56, r*0.38, r*0.2);
        }
    },
    LAPIN: {
        fr: { answer: 'LAPIN',  letters: ['L','A','P','I','N','E'] },
        en: { answer: 'RABBIT', letters: ['R','A','B','B','I','T'] },
        es: { answer: 'CONEJO', letters: ['C','O','N','E','J','O'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xdddddd, 1);
            gfx.fillEllipse(cx, cy+r*0.28, r*0.82, r*0.78);
            gfx.fillCircle(cx, cy-r*0.22, r*0.3);
            gfx.fillEllipse(cx-r*0.18, cy-r*0.74, r*0.2, r*0.6);
            gfx.fillEllipse(cx+r*0.18, cy-r*0.74, r*0.2, r*0.6);
            gfx.fillStyle(0xffaaaa, 1);
            gfx.fillEllipse(cx-r*0.18, cy-r*0.74, r*0.1, r*0.5);
            gfx.fillEllipse(cx+r*0.18, cy-r*0.74, r*0.1, r*0.5);
            gfx.fillStyle(0x222222, 1);
            gfx.fillCircle(cx-r*0.1, cy-r*0.26, r*0.06);
            gfx.fillCircle(cx+r*0.1, cy-r*0.26, r*0.06);
            gfx.fillStyle(0xff88aa, 1);
            gfx.fillCircle(cx, cy-r*0.14, r*0.06);
            gfx.lineStyle(1, 0x888888, 0.8);
            gfx.beginPath(); gfx.moveTo(cx-r*0.28, cy-r*0.12); gfx.lineTo(cx-r*0.08, cy-r*0.1); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08, cy-r*0.1); gfx.lineTo(cx+r*0.28, cy-r*0.12); gfx.strokePath();
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx, cy+r*0.66, r*0.12);
        }
    },
    POULE: {
        fr: { answer: 'POULE',   letters: ['P','O','U','L','E','A'] },
        en: { answer: 'HEN',     letters: ['H','E','N','O','A','I'] },
        es: { answer: 'GALLINA', letters: ['G','A','L','L','I','N','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx, cy+r*0.2, r*1.0, r*0.82);
            gfx.fillStyle(0xeeeeee, 1);
            gfx.fillEllipse(cx+r*0.22, cy+r*0.12, r*0.52, r*0.36);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.38, cy-r*0.2, r*0.28);
            gfx.fillStyle(0xee2222, 1);
            tri(gfx, cx-r*0.44, cy-r*0.45, cx-r*0.36, cy-r*0.56, cx-r*0.28, cy-r*0.45);
            gfx.fillCircle(cx-r*0.36, cy-r*0.5, r*0.08);
            gfx.fillStyle(0xffcc00, 1);
            tri(gfx, cx-r*0.66, cy-r*0.18, cx-r*0.58, cy-r*0.12, cx-r*0.66, cy-r*0.06);
            gfx.fillStyle(0x222222, 1);
            gfx.fillCircle(cx-r*0.44, cy-r*0.24, r*0.07);
            gfx.fillStyle(0xee2222, 1);
            gfx.fillCircle(cx-r*0.58, cy-r*0.1, r*0.08);
            gfx.fillStyle(0xffcc00, 1);
            gfx.fillRect(cx-r*0.2, cy+r*0.6, r*0.1, r*0.22);
            gfx.fillRect(cx+r*0.08, cy+r*0.6, r*0.1, r*0.22);
        }
    },
    CHIEN: {
        fr: { answer: 'CHIEN', letters: ['C','H','I','E','N','A'] },
        en: { answer: 'DOG',   letters: ['D','O','G','A','E','I'] },
        es: { answer: 'PERRO', letters: ['P','E','R','R','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xcc9966, 1);
            gfx.fillEllipse(cx, cy+r*0.25, r*1.1, r*0.72);
            gfx.fillCircle(cx-r*0.38, cy-r*0.08, r*0.34);
            gfx.fillStyle(0xddaa88, 1);
            gfx.fillEllipse(cx-r*0.56, cy+r*0.02, r*0.28, r*0.2);
            gfx.fillStyle(0x222222, 1);
            gfx.fillEllipse(cx-r*0.6, cy-r*0.02, r*0.14, r*0.1);
            gfx.fillCircle(cx-r*0.3, cy-r*0.16, r*0.08);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.27, cy-r*0.19, r*0.03);
            gfx.fillStyle(0xaa7744, 1);
            gfx.fillEllipse(cx-r*0.24, cy-r*0.35, r*0.22, r*0.42);
            gfx.lineStyle(8, 0xcc9966, 1);
            gfx.beginPath(); gfx.arc(cx+r*0.62, cy, r*0.32, -Math.PI*0.6, Math.PI*0.1); gfx.strokePath();
            gfx.fillStyle(0xcc9966, 1);
            [[-0.3,0.58],[-0.1,0.6],[0.12,0.58],[0.32,0.56]].forEach(([dx, dy]) => {
                gfx.fillRoundedRect(cx+dx*r-r*0.07, cy+dy*r, r*0.14, r*0.22, r*0.04);
            });
        }
    },
    PONEY: {
        fr: { answer: 'PONEY', letters: ['P','O','N','E','Y','A'] },
        en: { answer: 'PONY',  letters: ['P','O','N','Y','A','E'] },
        es: { answer: 'PONI',  letters: ['P','O','N','I','A','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xcc8844, 1);
            gfx.fillEllipse(cx+r*0.05, cy+r*0.22, r*1.1, r*0.66);
            gfx.fillRoundedRect(cx-r*0.42, cy-r*0.22, r*0.28, r*0.44, r*0.1);
            gfx.fillCircle(cx-r*0.44, cy-r*0.38, r*0.22);
            gfx.fillEllipse(cx-r*0.56, cy-r*0.22, r*0.2, r*0.28);
            gfx.fillStyle(0x882200, 1);
            gfx.fillEllipse(cx-r*0.32, cy-r*0.28, r*0.18, r*0.44);
            gfx.fillEllipse(cx+r*0.58, cy+r*0.22, r*0.18, r*0.44);
            gfx.fillStyle(0x222222, 1);
            gfx.fillCircle(cx-r*0.5, cy-r*0.4, r*0.06);
            gfx.fillStyle(0xaa6633, 1);
            gfx.fillCircle(cx-r*0.62, cy-r*0.18, r*0.05);
            gfx.fillStyle(0xcc8844, 1);
            [[-0.36,0.55],[-0.16,0.56],[0.18,0.55],[0.38,0.54]].forEach(([dx, dy]) => {
                gfx.fillRoundedRect(cx+dx*r-r*0.07, cy+dy*r, r*0.14, r*0.3, r*0.04);
            });
        }
    },
};

export function getWord(key) {
    const concept = WORD_CONCEPTS[key];
    if (!concept) return null;
    const lang = getLang();
    const data = concept[lang] || concept.fr;
    return {
        answer:      data.answer,
        letters:     data.letters,
        drawPicture: concept.drawPicture,
    };
}

// Proxy for backward compatibility — any WORDS[key] access returns getWord(key)
export const WORDS = new Proxy({}, {
    get(_, key) { return getWord(key); },
});
