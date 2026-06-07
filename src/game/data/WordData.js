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
            gfx.fillStyle(0xfff8e7, 1);
            gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x221144, 1);
            gfx.fillRoundedRect(cx-r*0.22, cy+r*0.44, r*0.16, r*0.34, r*0.04);
            gfx.fillRoundedRect(cx+r*0.06, cy+r*0.44, r*0.16, r*0.34, r*0.04);
            gfx.fillStyle(0x4a1a88, 1);
            gfx.fillRoundedRect(cx-r*0.32, cy+r*0.06, r*0.64, r*0.4, r*0.08);
            gfx.fillStyle(0xf5c518, 1);
            gfx.fillRect(cx-r*0.32, cy+r*0.4, r*0.64, r*0.07);
            gfx.fillRect(cx-r*0.06, cy+r*0.06, r*0.12, r*0.4);
            gfx.fillStyle(0xffee88, 1);
            gfx.fillCircle(cx, cy+r*0.17, r*0.04);
            gfx.fillCircle(cx, cy+r*0.29, r*0.04);
            gfx.fillStyle(0x4a1a88, 1);
            gfx.fillRoundedRect(cx-r*0.58, cy+r*0.08, r*0.28, r*0.14, r*0.06);
            gfx.fillRoundedRect(cx+r*0.30, cy+r*0.08, r*0.28, r*0.14, r*0.06);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.46, cy+r*0.2, r*0.1);
            gfx.fillCircle(cx+r*0.46, cy+r*0.2, r*0.1);
            gfx.fillRect(cx-r*0.09, cy-r*0.06, r*0.18, r*0.14);
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy-r*0.3, r*0.29);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy-r*0.3, r*0.27);
            gfx.fillStyle(0xf0ede8, 1);
            gfx.fillRoundedRect(cx-r*0.15, cy-r*0.1, r*0.3, r*0.1, r*0.05);
            gfx.fillStyle(0xd8d4d0, 1);
            gfx.fillEllipse(cx-r*0.09, cy-r*0.18, r*0.14, r*0.08);
            gfx.fillEllipse(cx+r*0.09, cy-r*0.18, r*0.14, r*0.08);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx-r*0.11, cy-r*0.34, r*0.14, r*0.12);
            gfx.fillEllipse(cx+r*0.11, cy-r*0.34, r*0.14, r*0.12);
            gfx.fillStyle(0x2255cc, 1);
            gfx.fillCircle(cx-r*0.11, cy-r*0.33, r*0.06);
            gfx.fillCircle(cx+r*0.11, cy-r*0.33, r*0.06);
            gfx.fillStyle(0x111122, 1);
            gfx.fillCircle(cx-r*0.11, cy-r*0.33, r*0.035);
            gfx.fillCircle(cx+r*0.11, cy-r*0.33, r*0.035);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.098, cy-r*0.343, r*0.016);
            gfx.fillCircle(cx+r*0.122, cy-r*0.343, r*0.016);
            gfx.fillStyle(0xff9988, 0.25);
            gfx.fillEllipse(cx-r*0.2, cy-r*0.26, r*0.14, r*0.08);
            gfx.fillEllipse(cx+r*0.2, cy-r*0.26, r*0.14, r*0.08);
            gfx.lineStyle(2, 0xcc8844, 1);
            gfx.beginPath(); gfx.arc(cx, cy-r*0.16, r*0.08, 0.25, Math.PI-0.25, false); gfx.strokePath();
            gfx.fillStyle(0xcc9a0a, 1);
            gfx.fillRoundedRect(cx-r*0.29, cy-r*0.59, r*0.58, r*0.17, r*0.04);
            gfx.fillStyle(0xf5c518, 1);
            gfx.fillRoundedRect(cx-r*0.27, cy-r*0.57, r*0.54, r*0.15, r*0.04);
            tri(gfx, cx-r*0.25, cy-r*0.57, cx-r*0.13, cy-r*0.57, cx-r*0.19, cy-r*0.78);
            tri(gfx, cx-r*0.05, cy-r*0.57, cx+r*0.05, cy-r*0.57, cx, cy-r*0.84);
            tri(gfx, cx+r*0.13, cy-r*0.57, cx+r*0.25, cy-r*0.57, cx+r*0.19, cy-r*0.78);
            gfx.fillStyle(0xff2244, 1); gfx.fillCircle(cx, cy-r*0.52, r*0.055);
            gfx.fillStyle(0x2255ff, 1);
            gfx.fillCircle(cx-r*0.17, cy-r*0.52, r*0.044);
            gfx.fillCircle(cx+r*0.17, cy-r*0.52, r*0.044);
            gfx.fillStyle(0xfff9aa, 0.5);
            gfx.fillEllipse(cx-r*0.06, cy-r*0.55, r*0.18, r*0.06);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Large ornate crown, top-down focus, gold background
            gfx.fillStyle(0xffd700, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Crown band
            gfx.fillStyle(0xcc9900, 1);
            gfx.fillRoundedRect(cx-r*0.55, cy+r*0.1, r*1.1, r*0.22, r*0.05);
            gfx.fillStyle(0xffd700, 1);
            gfx.fillRoundedRect(cx-r*0.52, cy+r*0.12, r*1.04, r*0.18, r*0.04);
            // Crown points (5)
            const pts = [-0.44, -0.22, 0, 0.22, 0.44];
            const heights = [-0.62, -0.78, -0.88, -0.78, -0.62];
            pts.forEach((px, i) => {
                gfx.fillStyle(0xffd700, 1);
                tri(gfx, cx+px*r-r*0.13, cy+r*0.1, cx+px*r+r*0.13, cy+r*0.1, cx+px*r, cy+heights[i]*r);
            });
            // Jewels on band
            gfx.fillStyle(0xff2244, 1); gfx.fillCircle(cx, cy+r*0.21, r*0.075);
            gfx.fillStyle(0x2255ff, 1); gfx.fillCircle(cx-r*0.26, cy+r*0.21, r*0.06);
            gfx.fillCircle(cx+r*0.26, cy+r*0.21, r*0.06);
            gfx.fillStyle(0x22cc66, 1); gfx.fillCircle(cx-r*0.46, cy+r*0.21, r*0.05);
            gfx.fillCircle(cx+r*0.46, cy+r*0.21, r*0.05);
            // Gem sparkles
            gfx.fillStyle(0xffffff, 0.8);
            gfx.fillCircle(cx-r*0.025, cy+r*0.195, r*0.025);
            gfx.fillCircle(cx-r*0.27, cy+r*0.2, r*0.02);
            gfx.fillCircle(cx+r*0.25, cy+r*0.2, r*0.02);
            // Gold shimmer
            gfx.fillStyle(0xfffacc, 0.45);
            gfx.fillEllipse(cx-r*0.12, cy-r*0.2, r*0.32, r*0.1);
        }
    },

    CHAT: {
        fr: { answer: 'CHAT', letters: ['C','H','A','T','O','R'] },
        en: { answer: 'CAT',  letters: ['C','A','T','O','R','N'] },
        es: { answer: 'GATO', letters: ['G','A','T','O','I','E'] },
        drawPicture(gfx, cx, cy, r) {
            // Tail (behind body)
            gfx.lineStyle(r*0.13, 0xff8800, 1);
            gfx.beginPath(); gfx.arc(cx+r*0.52,cy+r*0.58,r*0.34,-Math.PI*0.8,Math.PI*0.22,false); gfx.strokePath();
            gfx.fillStyle(0xffcc88, 1); gfx.fillCircle(cx+r*0.80,cy+r*0.37,r*0.10);
            // Body
            gfx.fillStyle(0xff8800, 1);
            gfx.fillEllipse(cx, cy+r*0.22, r*1.1, r*0.86);
            // Belly lighter
            gfx.fillStyle(0xffcc88, 0.55);
            gfx.fillEllipse(cx, cy+r*0.28, r*0.50, r*0.44);
            // Head
            gfx.fillStyle(0xff8800, 1);
            gfx.fillCircle(cx, cy-r*0.30, r*0.48);
            // Ears outer
            tri(gfx, cx-r*0.44,cy-r*0.55, cx-r*0.60,cy-r*0.97, cx-r*0.16,cy-r*0.64);
            tri(gfx, cx+r*0.44,cy-r*0.55, cx+r*0.60,cy-r*0.97, cx+r*0.16,cy-r*0.64);
            // Ears inner pink
            gfx.fillStyle(0xffbbcc, 1);
            tri(gfx, cx-r*0.41,cy-r*0.60, cx-r*0.53,cy-r*0.88, cx-r*0.21,cy-r*0.67);
            tri(gfx, cx+r*0.41,cy-r*0.60, cx+r*0.53,cy-r*0.88, cx+r*0.21,cy-r*0.67);
            // Head forehead stripes (tabby)
            gfx.lineStyle(2.5, 0xdd6600, 0.5);
            gfx.beginPath(); gfx.moveTo(cx-r*0.15,cy-r*0.68); gfx.lineTo(cx-r*0.08,cy-r*0.53); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx,cy-r*0.72); gfx.lineTo(cx,cy-r*0.57); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.15,cy-r*0.68); gfx.lineTo(cx+r*0.08,cy-r*0.53); gfx.strokePath();
            // Muzzle
            gfx.fillStyle(0xfff0e0, 1);
            gfx.fillEllipse(cx, cy-r*0.18, r*0.38, r*0.27);
            // Eyes — sclera
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.17,cy-r*0.37,r*0.13);
            gfx.fillCircle(cx+r*0.17,cy-r*0.37,r*0.13);
            // Eyes — iris (emerald green)
            gfx.fillStyle(0x22bb44, 1);
            gfx.fillCircle(cx-r*0.17,cy-r*0.37,r*0.09);
            gfx.fillCircle(cx+r*0.17,cy-r*0.37,r*0.09);
            // Eyes — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillEllipse(cx-r*0.17,cy-r*0.37,r*0.050,r*0.085);
            gfx.fillEllipse(cx+r*0.17,cy-r*0.37,r*0.050,r*0.085);
            // Eyes — shine
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.12,cy-r*0.40,r*0.032);
            gfx.fillCircle(cx+r*0.22,cy-r*0.40,r*0.032);
            // Nose (pink triangle)
            gfx.fillStyle(0xff88aa, 1);
            tri(gfx, cx-r*0.05,cy-r*0.215, cx+r*0.05,cy-r*0.215, cx,cy-r*0.155);
            // Mouth lines
            gfx.lineStyle(2, 0x994422, 1);
            gfx.beginPath(); gfx.moveTo(cx,cy-r*0.155); gfx.lineTo(cx-r*0.11,cy-r*0.09); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx,cy-r*0.155); gfx.lineTo(cx+r*0.11,cy-r*0.09); gfx.strokePath();
            // Whiskers
            gfx.lineStyle(1.5, 0xffffff, 0.85);
            gfx.beginPath(); gfx.moveTo(cx-r*0.07,cy-r*0.20); gfx.lineTo(cx-r*0.55,cy-r*0.25); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.07,cy-r*0.16); gfx.lineTo(cx-r*0.52,cy-r*0.10); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.07,cy-r*0.20); gfx.lineTo(cx+r*0.55,cy-r*0.25); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.07,cy-r*0.16); gfx.lineTo(cx+r*0.52,cy-r*0.10); gfx.strokePath();
            // Cheek blush
            gfx.fillStyle(0xff6655, 0.22);
            gfx.fillCircle(cx-r*0.30,cy-r*0.26,r*0.12);
            gfx.fillCircle(cx+r*0.30,cy-r*0.26,r*0.12);
            // Paws
            gfx.fillStyle(0xff8800, 1);
            gfx.fillEllipse(cx-r*0.27,cy+r*0.68,r*0.30,r*0.16);
            gfx.fillEllipse(cx+r*0.27,cy+r*0.68,r*0.30,r*0.16);
            gfx.fillStyle(0xffcc88, 0.7);
            for(let i=-1;i<=1;i++) { gfx.fillCircle(cx-r*0.27+i*r*0.09,cy+r*0.72,r*0.046); }
            for(let i=-1;i<=1;i++) { gfx.fillCircle(cx+r*0.27+i*r*0.09,cy+r*0.72,r*0.046); }
        },
        drawPicture2(gfx, cx, cy, r) {
            // Cat face from front — orange tabby
            gfx.fillStyle(0xff8c00, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Head circle
            gfx.fillStyle(0xff8800, 1); gfx.fillCircle(cx, cy+r*0.08, r*0.72);
            // Triangle ears
            gfx.fillStyle(0xff8800, 1);
            tri(gfx, cx-r*0.58, cy-r*0.28, cx-r*0.34, cy-r*0.72, cx-r*0.10, cy-r*0.3);
            tri(gfx, cx+r*0.58, cy-r*0.28, cx+r*0.34, cy-r*0.72, cx+r*0.10, cy-r*0.3);
            gfx.fillStyle(0xffbbcc, 1);
            tri(gfx, cx-r*0.50, cy-r*0.30, cx-r*0.34, cy-r*0.63, cx-r*0.16, cy-r*0.33);
            tri(gfx, cx+r*0.50, cy-r*0.30, cx+r*0.34, cy-r*0.63, cx+r*0.16, cy-r*0.33);
            // Muzzle
            gfx.fillStyle(0xfff0e0, 1); gfx.fillEllipse(cx, cy+r*0.24, r*0.44, r*0.32);
            // Eyes
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.24, cy-r*0.04, r*0.16);
            gfx.fillCircle(cx+r*0.24, cy-r*0.04, r*0.16);
            gfx.fillStyle(0x22bb44, 1);
            gfx.fillCircle(cx-r*0.24, cy-r*0.04, r*0.12);
            gfx.fillCircle(cx+r*0.24, cy-r*0.04, r*0.12);
            gfx.fillStyle(0x111111, 1);
            gfx.fillEllipse(cx-r*0.24, cy-r*0.04, r*0.06, r*0.1);
            gfx.fillEllipse(cx+r*0.24, cy-r*0.04, r*0.06, r*0.1);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.19, cy-r*0.08, r*0.038);
            gfx.fillCircle(cx+r*0.29, cy-r*0.08, r*0.038);
            // Nose
            gfx.fillStyle(0xff88aa, 1);
            tri(gfx, cx-r*0.06, cy+r*0.18, cx+r*0.06, cy+r*0.18, cx, cy+r*0.25);
            // Whiskers
            gfx.lineStyle(1.8, 0xffffff, 0.9);
            gfx.beginPath(); gfx.moveTo(cx-r*0.08, cy+r*0.22); gfx.lineTo(cx-r*0.68, cy+r*0.14); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.08, cy+r*0.28); gfx.lineTo(cx-r*0.66, cy+r*0.34); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08, cy+r*0.22); gfx.lineTo(cx+r*0.68, cy+r*0.14); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08, cy+r*0.28); gfx.lineTo(cx+r*0.66, cy+r*0.34); gfx.strokePath();
            // Cheeks
            gfx.fillStyle(0xff6655, 0.25);
            gfx.fillCircle(cx-r*0.36, cy+r*0.16, r*0.14);
            gfx.fillCircle(cx+r*0.36, cy+r*0.16, r*0.14);
        }
    },

    TOUR: {
        fr: { answer: 'TOUR',  letters: ['T','O','U','R','N','S'] },
        en: { answer: 'FORT',  letters: ['F','O','R','T','A','N'] },
        es: { answer: 'TORRE', letters: ['T','O','R','R','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x7ab0d0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x778899, 1);
            gfx.fillRoundedRect(cx-r*0.36, cy-r*0.7, r*0.72, r*1.28, r*0.04);
            gfx.fillStyle(0x8899aa, 1);
            gfx.fillRect(cx-r*0.36, cy-r*0.7, r*0.72, r*0.06);
            gfx.fillStyle(0x557788, 1);
            gfx.fillRect(cx-r*0.36, cy-r*0.86, r*0.18, r*0.18);
            gfx.fillRect(cx-r*0.09, cy-r*0.86, r*0.18, r*0.18);
            gfx.fillRect(cx+r*0.18, cy-r*0.86, r*0.18, r*0.18);
            gfx.lineStyle(1.5, 0x99aabb, 0.5);
            for (const dy of [-0.5, -0.2, 0.1, 0.4]) {
                gfx.beginPath(); gfx.moveTo(cx-r*0.36, cy+r*dy); gfx.lineTo(cx+r*0.36, cy+r*dy); gfx.strokePath();
            }
            for (const dx of [-0.12, 0.12]) {
                gfx.beginPath(); gfx.moveTo(cx+r*dx, cy-r*0.7); gfx.lineTo(cx+r*dx, cy+r*0.58); gfx.strokePath();
            }
            gfx.fillStyle(0x332211, 1);
            gfx.fillRoundedRect(cx-r*0.13, cy+r*0.12, r*0.26, r*0.46, r*0.12);
            gfx.fillCircle(cx, cy+r*0.12, r*0.13);
            gfx.fillStyle(0xffdd88, 0.85);
            gfx.fillRoundedRect(cx-r*0.1, cy-r*0.36, r*0.2, r*0.22, r*0.06);
            gfx.fillStyle(0xffcc44, 0.5);
            gfx.fillEllipse(cx, cy-r*0.25, r*0.12, r*0.18);
            gfx.lineStyle(2, 0x556677, 0.7);
            gfx.strokeRoundedRect(cx-r*0.1, cy-r*0.36, r*0.2, r*0.22, r*0.06);
            gfx.lineStyle(3, 0x8b4513, 1);
            gfx.beginPath(); gfx.moveTo(cx+r*0.36, cy-r*0.86); gfx.lineTo(cx+r*0.36, cy-r*1.06); gfx.strokePath();
            gfx.fillStyle(0xdd2222, 1);
            tri(gfx, cx+r*0.36, cy-r*1.06, cx+r*0.36, cy-r*0.86, cx+r*0.58, cy-r*0.96);
            gfx.fillStyle(0x446622, 1);
            gfx.fillEllipse(cx-r*0.34, cy+r*0.0, r*0.08, r*0.18);
            gfx.fillEllipse(cx-r*0.34, cy+r*0.22, r*0.1, r*0.14);
            gfx.fillEllipse(cx-r*0.36, cy+r*0.42, r*0.08, r*0.2);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Bird's-eye view of castle with 4 corner towers
            gfx.fillStyle(0x7ab0d0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Outer walls (square)
            gfx.fillStyle(0x778899, 1);
            gfx.fillRect(cx-r*0.7, cy-r*0.7, r*1.4, r*1.4);
            // Inner courtyard
            gfx.fillStyle(0x8faa60, 1);
            gfx.fillRect(cx-r*0.42, cy-r*0.42, r*0.84, r*0.84);
            // Corner towers (circles)
            const corners = [[-0.7,-0.7],[0.7,-0.7],[-0.7,0.7],[0.7,0.7]];
            corners.forEach(([dx,dy]) => {
                gfx.fillStyle(0x556677, 1);
                gfx.fillCircle(cx+dx*r, cy+dy*r, r*0.22);
                gfx.fillStyle(0x667788, 1);
                gfx.fillCircle(cx+dx*r, cy+dy*r, r*0.16);
            });
            // Gate (south wall)
            gfx.fillStyle(0x332211, 1);
            gfx.fillRoundedRect(cx-r*0.1, cy+r*0.42, r*0.2, r*0.28, r*0.08);
            // Well in courtyard center
            gfx.fillStyle(0x996644, 1); gfx.fillCircle(cx, cy, r*0.12);
            gfx.fillStyle(0x664422, 1); gfx.fillCircle(cx, cy, r*0.08);
        }
    },

    OURS: {
        fr: { answer: 'OURS', letters: ['O','U','R','S','B','M'] },
        en: { answer: 'BEAR', letters: ['B','E','A','R','O','T'] },
        es: { answer: 'OSO',  letters: ['O','S','O','A','I','E'] },
        drawPicture(gfx, cx, cy, r) {
            // Body (honey brown)
            gfx.fillStyle(0xc07830, 1);
            gfx.fillEllipse(cx,cy+r*0.22,r*1.08,r*0.88);
            // Belly lighter patch
            gfx.fillStyle(0xe8b060, 0.65);
            gfx.fillEllipse(cx,cy+r*0.30,r*0.52,r*0.48);
            // Head
            gfx.fillStyle(0xc07830, 1);
            gfx.fillCircle(cx,cy-r*0.28,r*0.50);
            // Ears
            gfx.fillCircle(cx-r*0.36,cy-r*0.65,r*0.21);
            gfx.fillCircle(cx+r*0.36,cy-r*0.65,r*0.21);
            // Ear inner
            gfx.fillStyle(0xffbbaa, 1);
            gfx.fillCircle(cx-r*0.36,cy-r*0.65,r*0.12);
            gfx.fillCircle(cx+r*0.36,cy-r*0.65,r*0.12);
            // Muzzle
            gfx.fillStyle(0xdda870, 1);
            gfx.fillEllipse(cx,cy-r*0.14,r*0.42,r*0.32);
            // Nose
            gfx.fillStyle(0x1a1a1a, 1);
            gfx.fillEllipse(cx,cy-r*0.27,r*0.17,r*0.11);
            // Nose shine
            gfx.fillStyle(0x777777, 0.45);
            gfx.fillCircle(cx-r*0.04,cy-r*0.30,r*0.036);
            // Eyes — sclera
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.17,cy-r*0.40,r*0.125);
            gfx.fillCircle(cx+r*0.17,cy-r*0.40,r*0.125);
            // Eyes — iris (warm brown)
            gfx.fillStyle(0x7b3a10, 1);
            gfx.fillCircle(cx-r*0.17,cy-r*0.40,r*0.088);
            gfx.fillCircle(cx+r*0.17,cy-r*0.40,r*0.088);
            // Eyes — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.17,cy-r*0.40,r*0.055);
            gfx.fillCircle(cx+r*0.17,cy-r*0.40,r*0.055);
            // Eyes — shine
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.12,cy-r*0.43,r*0.032);
            gfx.fillCircle(cx+r*0.22,cy-r*0.43,r*0.032);
            // Smile arc
            gfx.lineStyle(2.5, 0x7b4020, 1);
            gfx.beginPath(); gfx.arc(cx,cy-r*0.07,r*0.13,0.25,Math.PI-0.25,false); gfx.strokePath();
            // Cheeks
            gfx.fillStyle(0xff7755, 0.22);
            gfx.fillCircle(cx-r*0.30,cy-r*0.28,r*0.13);
            gfx.fillCircle(cx+r*0.30,cy-r*0.28,r*0.13);
            // Paws
            gfx.fillStyle(0xc07830, 1);
            gfx.fillEllipse(cx-r*0.28,cy+r*0.70,r*0.32,r*0.18);
            gfx.fillEllipse(cx+r*0.28,cy+r*0.70,r*0.32,r*0.18);
            gfx.fillStyle(0xa06020, 1);
            for(let i=-1;i<=1;i++) { gfx.fillCircle(cx-r*0.28+i*r*0.09,cy+r*0.74,r*0.045); }
            for(let i=-1;i<=1;i++) { gfx.fillCircle(cx+r*0.28+i*r*0.09,cy+r*0.74,r*0.045); }
        },
        drawPicture2(gfx, cx, cy, r) {
            // Bear face from front, big round head
            gfx.fillStyle(0xc07830, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Head
            gfx.fillCircle(cx, cy+r*0.08, r*0.72);
            // Round ears
            gfx.fillCircle(cx-r*0.56, cy-r*0.44, r*0.24);
            gfx.fillCircle(cx+r*0.56, cy-r*0.44, r*0.24);
            gfx.fillStyle(0xffbbaa, 1);
            gfx.fillCircle(cx-r*0.56, cy-r*0.44, r*0.14);
            gfx.fillCircle(cx+r*0.56, cy-r*0.44, r*0.14);
            // Snout
            gfx.fillStyle(0xdda870, 1); gfx.fillEllipse(cx, cy+r*0.28, r*0.48, r*0.36);
            // Nose
            gfx.fillStyle(0x1a1a1a, 1); gfx.fillEllipse(cx, cy+r*0.14, r*0.2, r*0.13);
            gfx.fillStyle(0x777777, 0.45); gfx.fillCircle(cx-r*0.05, cy+r*0.1, r*0.04);
            // Eyes
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.1, r*0.14);
            gfx.fillCircle(cx+r*0.22, cy-r*0.1, r*0.14);
            gfx.fillStyle(0x7b3a10, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.1, r*0.1);
            gfx.fillCircle(cx+r*0.22, cy-r*0.1, r*0.1);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.1, r*0.062);
            gfx.fillCircle(cx+r*0.22, cy-r*0.1, r*0.062);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.17, cy-r*0.14, r*0.034);
            gfx.fillCircle(cx+r*0.27, cy-r*0.14, r*0.034);
            // Smile
            gfx.lineStyle(2.5, 0x7b4020, 1);
            gfx.beginPath(); gfx.arc(cx, cy+r*0.38, r*0.15, 0.25, Math.PI-0.25, false); gfx.strokePath();
            // Cheeks
            gfx.fillStyle(0xff7755, 0.22);
            gfx.fillCircle(cx-r*0.38, cy+r*0.18, r*0.14);
            gfx.fillCircle(cx+r*0.38, cy+r*0.18, r*0.14);
        }
    },

    LUNE: {
        fr: { answer: 'LUNE', letters: ['L','U','N','E','S','T'] },
        en: { answer: 'MOON', letters: ['M','O','O','N','A','L'] },
        es: { answer: 'LUNA', letters: ['L','U','N','A','I','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x0d0d2e, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xfff0a0, 1); gfx.fillCircle(cx-r*0.08, cy-r*0.06, r*0.62);
            gfx.fillStyle(0x0d0d2e, 1); gfx.fillCircle(cx+r*0.22, cy-r*0.18, r*0.52);
            gfx.fillStyle(0xffe066, 1);
            gfx.fillCircle(cx-r*0.28, cy+r*0.14, r*0.07);
            gfx.fillCircle(cx-r*0.36, cy-r*0.02, r*0.05);
            gfx.fillCircle(cx-r*0.22, cy+r*0.3, r*0.05);
            gfx.fillStyle(0x111133, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.1, r*0.055);
            gfx.fillCircle(cx-r*0.08, cy-r*0.1, r*0.055);
            gfx.lineStyle(2, 0x7a6030, 1);
            gfx.beginPath(); gfx.arc(cx-r*0.14, cy+r*0.04, r*0.1, 0.2, Math.PI-0.2, false); gfx.strokePath();
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx+r*0.62, cy-r*0.44, r*0.06);
            gfx.fillCircle(cx+r*0.78, cy+r*0.12, r*0.04);
            gfx.fillCircle(cx+r*0.52, cy+r*0.52, r*0.05);
            gfx.fillCircle(cx-r*0.52, cy-r*0.58, r*0.04);
            gfx.fillCircle(cx-r*0.72, cy+r*0.22, r*0.035);
            gfx.lineStyle(1.5, 0xffffff, 0.9);
            [[-r*0.62,-r*0.44],[r*0.52,r*0.52]].forEach(([sx,sy]) => {
                gfx.beginPath(); gfx.moveTo(cx+sx-r*0.07,cy+sy); gfx.lineTo(cx+sx+r*0.07,cy+sy); gfx.strokePath();
                gfx.beginPath(); gfx.moveTo(cx+sx,cy+sy-r*0.07); gfx.lineTo(cx+sx,cy+sy+r*0.07); gfx.strokePath();
            });
        },
        drawPicture2(gfx, cx, cy, r) {
            // Full moon with sleeping face
            gfx.fillStyle(0x0d0d2e, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Stars
            gfx.fillStyle(0xffffff, 0.85);
            [[0.7,0.5],[0.8,-0.3],[0.6,-0.6],[-0.7,-0.5],[-0.8,0.3]].forEach(([dx,dy]) => {
                gfx.fillCircle(cx+dx*r, cy+dy*r, r*0.028);
            });
            // Full moon circle
            gfx.fillStyle(0xfff5bb, 1); gfx.fillCircle(cx, cy, r*0.7);
            gfx.fillStyle(0xffee88, 0.35); gfx.fillCircle(cx-r*0.1, cy-r*0.1, r*0.55);
            // Sleeping eyes (closed, curved lines)
            gfx.lineStyle(3, 0xaa8833, 1);
            gfx.beginPath(); gfx.arc(cx-r*0.2, cy-r*0.08, r*0.13, Math.PI+0.3, -0.3, false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx+r*0.2, cy-r*0.08, r*0.13, Math.PI+0.3, -0.3, false); gfx.strokePath();
            // Little ZZZ
            gfx.fillStyle(0xaa8833, 0.7);
            gfx.lineStyle(1.5, 0xaa8833, 0.7);
            gfx.beginPath(); gfx.moveTo(cx+r*0.45, cy-r*0.45); gfx.lineTo(cx+r*0.58, cy-r*0.45); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.58, cy-r*0.45); gfx.lineTo(cx+r*0.47, cy-r*0.56); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.47, cy-r*0.56); gfx.lineTo(cx+r*0.62, cy-r*0.56); gfx.strokePath();
            // Small smile
            gfx.lineStyle(2, 0xaa8833, 1);
            gfx.beginPath(); gfx.arc(cx, cy+r*0.1, r*0.14, 0.25, Math.PI-0.25, false); gfx.strokePath();
            // Moon craters (subtle)
            gfx.fillStyle(0xf0de77, 0.6);
            gfx.fillCircle(cx-r*0.4, cy+r*0.32, r*0.09);
            gfx.fillCircle(cx+r*0.38, cy+r*0.4, r*0.065);
        }
    },

    // ── LEVEL 2 : Les Animaux ────────────────────────────────────────────
    COQ: {
        fr: { answer: 'COQ',  letters: ['C','O','Q','U','T','R'] },
        en: { answer: 'HEN',  letters: ['H','E','N','A','T','O'] },
        es: { answer: 'GALLO',letters: ['G','A','L','L','O','I'] },
        drawPicture(gfx, cx, cy, r) {
            // Colorful fan tail feathers (draw behind body)
            const fColors = [0xcc0000, 0xff7700, 0xffcc00, 0x33bb22, 0x2255cc];
            fColors.forEach((c, i) => {
                const angle = -Math.PI*1.08 + i*0.30;
                const len = r*(0.90 - i*0.03);
                gfx.fillStyle(c, 1);
                tri(gfx, cx-r*0.32,cy+r*0.06,
                    cx-r*0.32+Math.cos(angle-0.14)*len, cy+Math.sin(angle-0.14)*len,
                    cx-r*0.32+Math.cos(angle+0.14)*len, cy+Math.sin(angle+0.14)*len);
            });
            // Body (cream white)
            gfx.fillStyle(0xf4eedc, 1);
            gfx.fillEllipse(cx+r*0.08,cy+r*0.12,r*1.0,r*0.78);
            // Body highlight
            gfx.fillStyle(0xffffff, 0.5);
            gfx.fillEllipse(cx+r*0.04,cy+r*0.02,r*0.46,r*0.26);
            // Neck + head
            gfx.fillStyle(0xf4eedc, 1);
            gfx.fillRoundedRect(cx+r*0.06,cy-r*0.54,r*0.28,r*0.42,r*0.08);
            gfx.fillCircle(cx+r*0.18,cy-r*0.54,r*0.30);
            // Comb (3 bumps, red)
            gfx.fillStyle(0xdd1100, 1);
            gfx.fillCircle(cx+r*0.08,cy-r*0.76,r*0.12);
            gfx.fillCircle(cx+r*0.18,cy-r*0.82,r*0.15);
            gfx.fillCircle(cx+r*0.30,cy-r*0.76,r*0.11);
            // Wattle
            gfx.fillEllipse(cx+r*0.09,cy-r*0.34,r*0.16,r*0.22);
            // Beak (yellow)
            gfx.fillStyle(0xffcc00, 1);
            tri(gfx, cx+r*0.44,cy-r*0.56, cx+r*0.62,cy-r*0.49, cx+r*0.44,cy-r*0.42);
            // Eye — sclera
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx+r*0.27,cy-r*0.59,r*0.10);
            // Eye — iris (orange)
            gfx.fillStyle(0xff8800, 1);
            gfx.fillCircle(cx+r*0.27,cy-r*0.59,r*0.072);
            // Eye — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx+r*0.28,cy-r*0.59,r*0.044);
            // Eye — shine
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx+r*0.31,cy-r*0.62,r*0.025);
            // Legs + toes
            gfx.lineStyle(3.5, 0xffcc00, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.06,cy+r*0.52); gfx.lineTo(cx-r*0.10,cy+r*0.76); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.14,cy+r*0.52); gfx.lineTo(cx+r*0.10,cy+r*0.76); gfx.strokePath();
            [[-0.10,0.76,-0.28,0.80],[-0.10,0.76,-0.10,0.89],[-0.10,0.76,0.06,0.80],
             [0.10,0.76,-0.06,0.80],[0.10,0.76,0.10,0.89],[0.10,0.76,0.26,0.80]].forEach(([x1,y1,x2,y2]) => {
                gfx.beginPath(); gfx.moveTo(cx+x1*r,cy+y1*r); gfx.lineTo(cx+x2*r,cy+y2*r); gfx.strokePath();
            });
        },
        drawPicture2(gfx, cx, cy, r) {
            // Rooster head close-up with big red comb
            gfx.fillStyle(0x4488ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Head
            gfx.fillStyle(0xf4eedc, 1); gfx.fillCircle(cx, cy+r*0.12, r*0.52);
            // Big red comb (3 bumps)
            gfx.fillStyle(0xdd1100, 1);
            gfx.fillCircle(cx-r*0.16, cy-r*0.38, r*0.17);
            gfx.fillCircle(cx, cy-r*0.48, r*0.21);
            gfx.fillCircle(cx+r*0.16, cy-r*0.38, r*0.17);
            gfx.fillEllipse(cx, cy-r*0.28, r*0.5, r*0.22);
            // Wattle
            gfx.fillEllipse(cx-r*0.12, cy+r*0.46, r*0.18, r*0.26);
            // Beak
            gfx.fillStyle(0xffcc00, 1);
            tri(gfx, cx+r*0.44, cy+r*0.1, cx+r*0.68, cy+r*0.18, cx+r*0.44, cy+r*0.26);
            // Eye white
            gfx.fillStyle(0xffffff, 1); gfx.fillCircle(cx+r*0.2, cy-r*0.02, r*0.14);
            gfx.fillStyle(0xff8800, 1); gfx.fillCircle(cx+r*0.2, cy-r*0.02, r*0.1);
            gfx.fillStyle(0x111111, 1); gfx.fillCircle(cx+r*0.21, cy-r*0.02, r*0.062);
            gfx.fillStyle(0xffffff, 1); gfx.fillCircle(cx+r*0.24, cy-r*0.05, r*0.026);
            // Feather pattern on neck
            gfx.fillStyle(0xf4eedc, 0.5);
            gfx.fillEllipse(cx-r*0.2, cy+r*0.26, r*0.22, r*0.36);
        }
    },

    OIE: {
        fr: { answer: 'OIE',  letters: ['O','I','E','U','A','S'] },
        en: { answer: 'DUCK', letters: ['D','U','C','K','A','O'] },
        es: { answer: 'OCA',  letters: ['O','C','A','I','E','T'] },
        drawPicture(gfx, cx, cy, r) {
            // Water ripple beneath
            gfx.fillStyle(0x88ccee, 0.35);
            gfx.fillEllipse(cx,cy+r*0.92,r*1.38,r*0.20);
            // Body (fluffy white)
            gfx.fillStyle(0xf6f5ec, 1);
            gfx.fillEllipse(cx,cy+r*0.22,r*1.1,r*0.78);
            // Wing feather hint (curved lines on body)
            gfx.lineStyle(2, 0xddddcc, 0.9);
            gfx.beginPath(); gfx.arc(cx-r*0.18,cy+r*0.15,r*0.44,-0.55,0.55,false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx-r*0.12,cy+r*0.30,r*0.36,-0.45,0.45,false); gfx.strokePath();
            // Neck
            gfx.fillStyle(0xf6f5ec, 1);
            gfx.fillRoundedRect(cx+r*0.08,cy-r*0.60,r*0.26,r*0.62,r*0.10);
            // Head
            gfx.fillCircle(cx+r*0.24,cy-r*0.68,r*0.25);
            // Beak (orange flat, with nostril dots)
            gfx.fillStyle(0xff8822, 1);
            gfx.fillEllipse(cx+r*0.52,cy-r*0.68,r*0.30,r*0.12);
            gfx.fillStyle(0xcc5500, 1);
            gfx.fillCircle(cx+r*0.43,cy-r*0.68,r*0.032);
            gfx.fillCircle(cx+r*0.50,cy-r*0.68,r*0.032);
            // Eye — sclera
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx+r*0.28,cy-r*0.72,r*0.09);
            // Eye — iris (dark blue)
            gfx.fillStyle(0x224488, 1);
            gfx.fillCircle(cx+r*0.28,cy-r*0.72,r*0.062);
            // Eye — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx+r*0.29,cy-r*0.72,r*0.038);
            // Eye — shine
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx+r*0.32,cy-r*0.75,r*0.022);
            // Orange webbed feet
            gfx.fillStyle(0xff8822, 1);
            gfx.fillEllipse(cx-r*0.15,cy+r*0.65,r*0.30,r*0.12);
            gfx.fillEllipse(cx+r*0.15,cy+r*0.65,r*0.30,r*0.12);
            // Toe lines
            gfx.lineStyle(2, 0xcc5500, 1);
            [-0.06,0.0,0.06].forEach(d => {
                gfx.beginPath(); gfx.moveTo(cx-r*0.15,cy+r*0.65); gfx.lineTo(cx-r*0.15+d*r*1.8,cy+r*0.74); gfx.strokePath();
                gfx.beginPath(); gfx.moveTo(cx+r*0.15,cy+r*0.65); gfx.lineTo(cx+r*0.15+d*r*1.8,cy+r*0.74); gfx.strokePath();
            });
        },
        drawPicture2(gfx, cx, cy, r) {
            // Duck swimming, side view with water
            gfx.fillStyle(0x66aadd, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Water surface
            gfx.fillStyle(0x2266aa, 1);
            gfx.fillRect(cx-r*0.95, cy+r*0.34, r*1.9, r*0.62);
            // Waves
            gfx.fillStyle(0x3388cc, 0.5);
            gfx.beginPath(); gfx.arc(cx-r*0.4, cy+r*0.34, r*0.24, Math.PI, 0, false); gfx.fillPath();
            gfx.beginPath(); gfx.arc(cx+r*0.32, cy+r*0.34, r*0.22, Math.PI, 0, false); gfx.fillPath();
            // Duck body (white, on water)
            gfx.fillStyle(0xf6f5ec, 1);
            gfx.fillEllipse(cx, cy+r*0.24, r*0.96, r*0.5);
            // Wing detail
            gfx.fillStyle(0xddddcc, 0.7);
            gfx.fillEllipse(cx-r*0.1, cy+r*0.2, r*0.52, r*0.24);
            // Neck
            gfx.fillStyle(0xf6f5ec, 1);
            gfx.fillRoundedRect(cx+r*0.14, cy-r*0.32, r*0.22, r*0.58, r*0.08);
            // Head
            gfx.fillCircle(cx+r*0.28, cy-r*0.42, r*0.23);
            // Beak
            gfx.fillStyle(0xff8822, 1);
            gfx.fillEllipse(cx+r*0.54, cy-r*0.42, r*0.28, r*0.11);
            // Eye
            gfx.fillStyle(0x111111, 1); gfx.fillCircle(cx+r*0.32, cy-r*0.48, r*0.044);
            gfx.fillStyle(0xffffff, 1); gfx.fillCircle(cx+r*0.35, cy-r*0.5, r*0.018);
            // Tail feather up
            gfx.fillStyle(0xf6f5ec, 1);
            tri(gfx, cx-r*0.46, cy+r*0.06, cx-r*0.64, cy-r*0.08, cx-r*0.38, cy-r*0.04);
        }
    },

    LION: {
        fr: { answer: 'LION', letters: ['L','I','O','N','E','R'] },
        en: { answer: 'LION', letters: ['L','I','O','N','E','A'] },
        es: { answer: 'LEON', letters: ['L','E','O','N','I','A'] },
        drawPicture(gfx, cx, cy, r) {
            // Fluffy tail (draw behind body)
            gfx.lineStyle(r*0.14, 0xc87820, 1);
            gfx.beginPath(); gfx.arc(cx+r*0.52,cy+r*0.45,r*0.36,-0.4,1.6,false); gfx.strokePath();
            gfx.fillStyle(0x885510, 1); gfx.fillCircle(cx+r*0.82,cy+r*0.66,r*0.14);
            // Body (golden)
            gfx.fillStyle(0xffc030, 1);
            gfx.fillEllipse(cx,cy+r*0.42,r*0.82,r*0.62);
            // Mane (dark ring around face)
            gfx.fillStyle(0xc87820, 1);
            gfx.fillCircle(cx,cy-r*0.08,r*0.64);
            // Face (lighter inside mane)
            gfx.fillStyle(0xffc030, 1);
            gfx.fillCircle(cx,cy-r*0.08,r*0.46);
            // Mane fluffy bumps
            gfx.fillStyle(0xa86018, 1);
            for(let i=0;i<8;i++){
                const a = -Math.PI*0.72 + i*(Math.PI*1.44/7);
                gfx.fillCircle(cx+Math.cos(a)*r*0.58, cy-r*0.08+Math.sin(a)*r*0.58, r*0.15);
            }
            // Muzzle
            gfx.fillStyle(0xffcc88, 1);
            gfx.fillEllipse(cx,cy+r*0.04,r*0.34,r*0.22);
            // Nose
            gfx.fillStyle(0xcc4466, 1);
            gfx.fillCircle(cx,cy-r*0.07,r*0.08);
            // Nose shine
            gfx.fillStyle(0xff88aa, 0.5);
            gfx.fillCircle(cx-r*0.03,cy-r*0.10,r*0.030);
            // Whisker dots
            gfx.fillStyle(0x664400, 1);
            [-0.16,-0.05,0.05,0.16].forEach(dx => gfx.fillCircle(cx+dx*r,cy+r*0.02,r*0.020));
            // Eyes — sclera
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.18,cy-r*0.20,r*0.12);
            gfx.fillCircle(cx+r*0.18,cy-r*0.20,r*0.12);
            // Eyes — iris (amber)
            gfx.fillStyle(0xdd8800, 1);
            gfx.fillCircle(cx-r*0.18,cy-r*0.20,r*0.085);
            gfx.fillCircle(cx+r*0.18,cy-r*0.20,r*0.085);
            // Eyes — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.18,cy-r*0.20,r*0.052);
            gfx.fillCircle(cx+r*0.18,cy-r*0.20,r*0.052);
            // Eyes — shine
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.13,cy-r*0.24,r*0.030);
            gfx.fillCircle(cx+r*0.23,cy-r*0.24,r*0.030);
            // Smile
            gfx.lineStyle(2, 0x884400, 1);
            gfx.beginPath(); gfx.arc(cx,cy+r*0.07,r*0.10,0.3,Math.PI-0.3,false); gfx.strokePath();
            // Cheeks
            gfx.fillStyle(0xff7733, 0.20);
            gfx.fillCircle(cx-r*0.30,cy-r*0.12,r*0.12);
            gfx.fillCircle(cx+r*0.30,cy-r*0.12,r*0.12);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Lion face filling the circle with huge mane
            gfx.fillStyle(0xffc030, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Mane outer ring (fluffy bumps)
            gfx.fillStyle(0xa86018, 1);
            for(let i=0;i<10;i++){
                const a = (i/10)*Math.PI*2;
                gfx.fillCircle(cx+Math.cos(a)*r*0.74, cy+Math.sin(a)*r*0.74, r*0.2);
            }
            // Mane ring
            gfx.fillStyle(0xc87820, 1); gfx.fillCircle(cx, cy, r*0.68);
            // Face
            gfx.fillStyle(0xffc030, 1); gfx.fillCircle(cx, cy, r*0.52);
            // Muzzle
            gfx.fillStyle(0xffcc88, 1); gfx.fillEllipse(cx, cy+r*0.16, r*0.38, r*0.25);
            // Nose
            gfx.fillStyle(0xcc4466, 1); gfx.fillCircle(cx, cy+r*0.04, r*0.09);
            gfx.fillStyle(0xff88aa, 0.5); gfx.fillCircle(cx-r*0.03, cy+r*0.01, r*0.032);
            // Eyes
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.14, r*0.14);
            gfx.fillCircle(cx+r*0.2, cy-r*0.14, r*0.14);
            gfx.fillStyle(0xdd8800, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.14, r*0.1);
            gfx.fillCircle(cx+r*0.2, cy-r*0.14, r*0.1);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.14, r*0.062);
            gfx.fillCircle(cx+r*0.2, cy-r*0.14, r*0.062);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.15, cy-r*0.17, r*0.032);
            gfx.fillCircle(cx+r*0.25, cy-r*0.17, r*0.032);
            // Smile
            gfx.lineStyle(2.5, 0x884400, 1);
            gfx.beginPath(); gfx.arc(cx, cy+r*0.2, r*0.12, 0.3, Math.PI-0.3, false); gfx.strokePath();
        }
    },

    LOUP: {
        fr: { answer: 'LOUP', letters: ['L','O','U','P','A','T'] },
        en: { answer: 'WOLF', letters: ['W','O','L','F','A','E'] },
        es: { answer: 'LOBO', letters: ['L','O','B','O','A','I'] },
        drawPicture(gfx, cx, cy, r) {
            // Fluffy tail (behind body)
            gfx.lineStyle(r*0.15, 0x8899bb, 1);
            gfx.beginPath(); gfx.arc(cx-r*0.62,cy+r*0.52,r*0.40,-1.2,0.35,false); gfx.strokePath();
            gfx.fillStyle(0xddeeff, 0.6);
            gfx.fillCircle(cx-r*0.74,cy+r*0.25,r*0.14);
            // Body (blue-grey, friendly)
            gfx.fillStyle(0x9aaabb, 1);
            gfx.fillEllipse(cx,cy+r*0.22,r*1.02,r*0.78);
            // Belly lighter
            gfx.fillStyle(0xccddee, 0.55);
            gfx.fillEllipse(cx+r*0.05,cy+r*0.28,r*0.48,r*0.42);
            // Head
            gfx.fillStyle(0x9aaabb, 1);
            gfx.fillCircle(cx,cy-r*0.30,r*0.46);
            // Ears outer
            tri(gfx, cx-r*0.30,cy-r*0.55, cx-r*0.44,cy-r*0.90, cx-r*0.08,cy-r*0.62);
            tri(gfx, cx+r*0.30,cy-r*0.55, cx+r*0.44,cy-r*0.90, cx+r*0.08,cy-r*0.62);
            // Ears inner
            gfx.fillStyle(0xffbbbb, 1);
            tri(gfx, cx-r*0.28,cy-r*0.58, cx-r*0.38,cy-r*0.82, cx-r*0.12,cy-r*0.65);
            tri(gfx, cx+r*0.28,cy-r*0.58, cx+r*0.38,cy-r*0.82, cx+r*0.12,cy-r*0.65);
            // Muzzle
            gfx.fillStyle(0xccdde0, 1);
            gfx.fillEllipse(cx,cy-r*0.16,r*0.40,r*0.29);
            // Nose
            gfx.fillStyle(0x111111, 1);
            gfx.fillEllipse(cx,cy-r*0.27,r*0.14,r*0.09);
            // Nose shine
            gfx.fillStyle(0x777777, 0.4);
            gfx.fillCircle(cx-r*0.03,cy-r*0.30,r*0.030);
            // Eyes — sclera
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.16,cy-r*0.38,r*0.125);
            gfx.fillCircle(cx+r*0.16,cy-r*0.38,r*0.125);
            // Eyes — iris (warm amber — friendly, not scary)
            gfx.fillStyle(0xcc8800, 1);
            gfx.fillCircle(cx-r*0.16,cy-r*0.38,r*0.088);
            gfx.fillCircle(cx+r*0.16,cy-r*0.38,r*0.088);
            // Eyes — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.16,cy-r*0.38,r*0.055);
            gfx.fillCircle(cx+r*0.16,cy-r*0.38,r*0.055);
            // Eyes — shine
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.11,cy-r*0.41,r*0.030);
            gfx.fillCircle(cx+r*0.21,cy-r*0.41,r*0.030);
            // Smile
            gfx.lineStyle(2, 0x667788, 1);
            gfx.beginPath(); gfx.arc(cx,cy-r*0.08,r*0.11,0.3,Math.PI-0.3,false); gfx.strokePath();
            // Cheeks
            gfx.fillStyle(0xaabbdd, 0.30);
            gfx.fillCircle(cx-r*0.29,cy-r*0.27,r*0.12);
            gfx.fillCircle(cx+r*0.29,cy-r*0.27,r*0.12);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Wolf howling, front view, full moon behind
            gfx.fillStyle(0x1a1a3a, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Full moon
            gfx.fillStyle(0xfff8cc, 1); gfx.fillCircle(cx, cy-r*0.22, r*0.42);
            gfx.fillStyle(0xf0e888, 0.3); gfx.fillCircle(cx-r*0.08, cy-r*0.28, r*0.32);
            // Wolf head (silhouette-like, gray)
            gfx.fillStyle(0x9aaabb, 1); gfx.fillCircle(cx, cy+r*0.36, r*0.46);
            // Ears pointing up
            tri(gfx, cx-r*0.24, cy+r*0.06, cx-r*0.42, cy-r*0.26, cx-r*0.08, cy+r*0.04);
            tri(gfx, cx+r*0.24, cy+r*0.06, cx+r*0.42, cy-r*0.26, cx+r*0.08, cy+r*0.04);
            gfx.fillStyle(0xffbbbb, 1);
            tri(gfx, cx-r*0.22, cy+r*0.06, cx-r*0.38, cy-r*0.2, cx-r*0.1, cy+r*0.04);
            tri(gfx, cx+r*0.22, cy+r*0.06, cx+r*0.38, cy-r*0.2, cx+r*0.1, cy+r*0.04);
            // Snout pointing upward (howling pose)
            gfx.fillStyle(0xccdde0, 1); gfx.fillEllipse(cx, cy+r*0.26, r*0.32, r*0.22);
            gfx.fillStyle(0x9aaabb, 1); gfx.fillEllipse(cx, cy+r*0.16, r*0.28, r*0.22);
            // Open mouth / howl
            gfx.fillStyle(0x111111, 1); gfx.fillEllipse(cx, cy+r*0.26, r*0.18, r*0.12);
            // Eyes (gleaming at night)
            gfx.fillStyle(0xcc8800, 1);
            gfx.fillCircle(cx-r*0.15, cy+r*0.28, r*0.06);
            gfx.fillCircle(cx+r*0.15, cy+r*0.28, r*0.06);
            gfx.fillStyle(0xffffff, 0.7);
            gfx.fillCircle(cx-r*0.13, cy+r*0.26, r*0.022);
            gfx.fillCircle(cx+r*0.17, cy+r*0.26, r*0.022);
        }
    },

    CERF: {
        fr: { answer: 'CERF',   letters: ['C','E','R','F','O','N'] },
        en: { answer: 'DEER',   letters: ['D','E','E','R','A','O'] },
        es: { answer: 'CIERVO', letters: ['C','I','E','R','V','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            // Body (warm chestnut)
            gfx.fillStyle(0xaa6633, 1);
            gfx.fillEllipse(cx,cy+r*0.26,r*1.02,r*0.72);
            // White belly
            gfx.fillStyle(0xfff5e0, 1);
            gfx.fillEllipse(cx,cy+r*0.36,r*0.54,r*0.38);
            // White spots on back (Bambi style)
            gfx.fillStyle(0xffffff, 0.7);
            [[0.22,-0.04],[0.34,0.10],[0.14,0.18],[-0.08,0.08],[-0.22,0.18]].forEach(([dx,dy]) =>
                gfx.fillCircle(cx+dx*r,cy+dy*r,r*0.065));
            // Neck
            gfx.fillStyle(0xaa6633, 1);
            gfx.fillRoundedRect(cx-r*0.14,cy-r*0.62,r*0.28,r*0.44,r*0.10);
            // Head
            gfx.fillCircle(cx,cy-r*0.70,r*0.30);
            // Antlers
            gfx.lineStyle(4, 0x774422, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.10,cy-r*0.92); gfx.lineTo(cx-r*0.24,cy-r*1.10); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.18,cy-r*1.02); gfx.lineTo(cx-r*0.42,cy-r*1.04); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.24,cy-r*1.10); gfx.lineTo(cx-r*0.38,cy-r*1.22); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.10,cy-r*0.92); gfx.lineTo(cx+r*0.24,cy-r*1.10); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.18,cy-r*1.02); gfx.lineTo(cx+r*0.42,cy-r*1.04); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.24,cy-r*1.10); gfx.lineTo(cx+r*0.38,cy-r*1.22); gfx.strokePath();
            // Ears
            gfx.fillStyle(0xaa6633, 1);
            gfx.fillEllipse(cx-r*0.26,cy-r*0.72,r*0.18,r*0.28);
            gfx.fillEllipse(cx+r*0.26,cy-r*0.72,r*0.18,r*0.28);
            gfx.fillStyle(0xffccaa, 0.6);
            gfx.fillEllipse(cx-r*0.26,cy-r*0.72,r*0.10,r*0.18);
            gfx.fillEllipse(cx+r*0.26,cy-r*0.72,r*0.10,r*0.18);
            // Snout
            gfx.fillStyle(0xcc8855, 1);
            gfx.fillEllipse(cx,cy-r*0.60,r*0.22,r*0.16);
            // Nose
            gfx.fillStyle(0x331111, 1);
            gfx.fillEllipse(cx,cy-r*0.64,r*0.09,r*0.06);
            // Eyes — sclera (very large — Bambi style)
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.12,cy-r*0.72,r*0.14);
            gfx.fillCircle(cx+r*0.12,cy-r*0.72,r*0.14);
            // Eyes — iris (deep brown)
            gfx.fillStyle(0x5a2800, 1);
            gfx.fillCircle(cx-r*0.12,cy-r*0.72,r*0.10);
            gfx.fillCircle(cx+r*0.12,cy-r*0.72,r*0.10);
            // Eyes — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.12,cy-r*0.72,r*0.065);
            gfx.fillCircle(cx+r*0.12,cy-r*0.72,r*0.065);
            // Eyes — shine (large, dewy)
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.07,cy-r*0.76,r*0.038);
            gfx.fillCircle(cx+r*0.17,cy-r*0.76,r*0.038);
            // Lashes
            gfx.lineStyle(1.5, 0x331111, 0.9);
            [[-0.19,-0.84],[-0.12,-0.87],[-0.05,-0.86]].forEach(([dx,dy]) => {
                gfx.beginPath(); gfx.moveTo(cx+dx*r,cy+r*(dy+0.04)); gfx.lineTo(cx+dx*r-r*0.01,cy+r*dy); gfx.strokePath();
            });
            // Smile
            gfx.lineStyle(2, 0x774422, 1);
            gfx.beginPath(); gfx.arc(cx,cy-r*0.54,r*0.07,0.3,Math.PI-0.3,false); gfx.strokePath();
            // Cheeks
            gfx.fillStyle(0xff9966, 0.25);
            gfx.fillCircle(cx-r*0.22,cy-r*0.66,r*0.10);
            gfx.fillCircle(cx+r*0.22,cy-r*0.66,r*0.10);
            // Legs
            gfx.fillStyle(0xaa6633, 1);
            for(const dx of [-0.28,-0.10,0.10,0.28]) {
                gfx.fillRoundedRect(cx+dx*r-r*0.07,cy+r*0.60,r*0.14,r*0.30,r*0.04);
            }
        },
        drawPicture2(gfx, cx, cy, r) {
            // Deer head from front with elaborate antler crown
            gfx.fillStyle(0xcceeaa, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Antlers (branching)
            gfx.lineStyle(5, 0x774422, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.14, cy-r*0.48); gfx.lineTo(cx-r*0.28, cy-r*0.82); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.22, cy-r*0.66); gfx.lineTo(cx-r*0.46, cy-r*0.72); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.28, cy-r*0.82); gfx.lineTo(cx-r*0.44, cy-r*0.94); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.28, cy-r*0.82); gfx.lineTo(cx-r*0.14, cy-r*0.96); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.14, cy-r*0.48); gfx.lineTo(cx+r*0.28, cy-r*0.82); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.22, cy-r*0.66); gfx.lineTo(cx+r*0.46, cy-r*0.72); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.28, cy-r*0.82); gfx.lineTo(cx+r*0.44, cy-r*0.94); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.28, cy-r*0.82); gfx.lineTo(cx+r*0.14, cy-r*0.96); gfx.strokePath();
            // Head
            gfx.fillStyle(0xaa6633, 1); gfx.fillCircle(cx, cy+r*0.14, r*0.54);
            // Ears
            gfx.fillEllipse(cx-r*0.42, cy-r*0.14, r*0.2, r*0.32);
            gfx.fillEllipse(cx+r*0.42, cy-r*0.14, r*0.2, r*0.32);
            gfx.fillStyle(0xffccaa, 0.6);
            gfx.fillEllipse(cx-r*0.42, cy-r*0.14, r*0.12, r*0.2);
            gfx.fillEllipse(cx+r*0.42, cy-r*0.14, r*0.12, r*0.2);
            // Snout
            gfx.fillStyle(0xcc8855, 1); gfx.fillEllipse(cx, cy+r*0.38, r*0.26, r*0.18);
            gfx.fillStyle(0x331111, 1); gfx.fillEllipse(cx, cy+r*0.32, r*0.1, r*0.07);
            // Eyes big
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.18, cy+r*0.08, r*0.16);
            gfx.fillCircle(cx+r*0.18, cy+r*0.08, r*0.16);
            gfx.fillStyle(0x5a2800, 1);
            gfx.fillCircle(cx-r*0.18, cy+r*0.08, r*0.12);
            gfx.fillCircle(cx+r*0.18, cy+r*0.08, r*0.12);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.18, cy+r*0.08, r*0.075);
            gfx.fillCircle(cx+r*0.18, cy+r*0.08, r*0.075);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.13, cy+r*0.04, r*0.04);
            gfx.fillCircle(cx+r*0.23, cy+r*0.04, r*0.04);
            gfx.fillStyle(0xff9966, 0.25);
            gfx.fillCircle(cx-r*0.32, cy+r*0.18, r*0.1);
            gfx.fillCircle(cx+r*0.32, cy+r*0.18, r*0.1);
        }
    },

    // ── LEVEL 3 : La Nature ──────────────────────────────────────────────
    EAU: {
        fr: { answer: 'EAU',  letters: ['E','A','U','I','O','T'] },
        en: { answer: 'RAIN', letters: ['R','A','I','N','O','E'] },
        es: { answer: 'AGUA', letters: ['A','G','U','A','I','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x88ccff, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x1155cc, 1);
            gfx.fillRect(cx-r*0.95, cy+r*0.3, r*1.9, r*0.65);
            gfx.fillStyle(0x2266dd, 0.6);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.95, cy+r*0.3);
            gfx.arc(cx-r*0.45, cy+r*0.3, r*0.28, Math.PI, 0, false);
            gfx.arc(cx+r*0.3, cy+r*0.3, r*0.28, Math.PI, 0, false);
            gfx.lineTo(cx+r*0.95, cy+r*0.3);
            gfx.closePath(); gfx.fillPath();
            gfx.fillStyle(0x0077ee, 1);
            gfx.fillCircle(cx, cy-r*0.12, r*0.38);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.38, cy-r*0.12);
            gfx.lineTo(cx, cy-r*0.72);
            gfx.lineTo(cx+r*0.38, cy-r*0.12);
            gfx.closePath(); gfx.fillPath();
            gfx.fillStyle(0x44aaff, 0.5);
            gfx.fillEllipse(cx-r*0.14, cy-r*0.28, r*0.18, r*0.28);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx+r*0.55, cy+r*0.15, r*0.06);
            gfx.fillCircle(cx-r*0.4, cy+r*0.18, r*0.04);
            gfx.fillCircle(cx+r*0.18, cy+r*0.45, r*0.05);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Teardrop / water droplet with shiny reflection
            gfx.fillStyle(0x99ddff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Droplet shape: circle bottom + triangle top
            gfx.fillStyle(0x0077ee, 1);
            gfx.fillCircle(cx, cy+r*0.22, r*0.5);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.5, cy+r*0.22);
            gfx.lineTo(cx, cy-r*0.72);
            gfx.lineTo(cx+r*0.5, cy+r*0.22);
            gfx.closePath(); gfx.fillPath();
            // Highlight inner
            gfx.fillStyle(0x44aaff, 0.6);
            gfx.fillCircle(cx, cy+r*0.22, r*0.38);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.38, cy+r*0.22);
            gfx.lineTo(cx, cy-r*0.52);
            gfx.lineTo(cx+r*0.38, cy+r*0.22);
            gfx.closePath(); gfx.fillPath();
            // Shiny reflection ellipse
            gfx.fillStyle(0xffffff, 0.75);
            gfx.fillEllipse(cx-r*0.14, cy-r*0.12, r*0.18, r*0.32);
            gfx.fillStyle(0xffffff, 0.5);
            gfx.fillCircle(cx-r*0.08, cy+r*0.14, r*0.06);
        }
    },

    BOIS: {
        fr: { answer: 'BOIS', letters: ['B','O','I','S','U','E'] },
        en: { answer: 'WOOD', letters: ['W','O','O','D','A','E'] },
        es: { answer: 'PINO', letters: ['P','I','N','O','A','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x6aad3c, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x4a8822, 1); gfx.fillRect(cx-r*0.95, cy+r*0.38, r*1.9, r*0.58);
            gfx.fillStyle(0x8b4513, 0.6);
            gfx.fillRect(cx-r*0.06, cy+r*0.22, r*0.12, r*0.18);
            gfx.fillRect(cx-r*0.44, cy+r*0.3, r*0.1, r*0.1);
            gfx.fillRect(cx+r*0.34, cy+r*0.3, r*0.1, r*0.1);
            const trees3 = [[cx-r*0.42, 0.9], [cx, 1.1], [cx+r*0.42, 0.85]];
            trees3.forEach(([tx, sc]) => {
                const by = cy + r*0.38;
                gfx.fillStyle(0x7a4010, 1);
                gfx.fillRect(tx-r*0.07*sc, by-r*0.28*sc, r*0.14*sc, r*0.28*sc);
                gfx.fillStyle(0x226611, 1);
                tri(gfx, tx, by-r*0.95*sc, tx-r*0.3*sc, by-r*0.3*sc, tx+r*0.3*sc, by-r*0.3*sc);
                gfx.fillStyle(0x33aa44, 1);
                tri(gfx, tx, by-r*1.12*sc, tx-r*0.22*sc, by-r*0.6*sc, tx+r*0.22*sc, by-r*0.6*sc);
                gfx.fillStyle(0x55cc66, 0.5);
                tri(gfx, tx, by-r*1.28*sc, tx-r*0.14*sc, by-r*0.88*sc, tx+r*0.14*sc, by-r*0.88*sc);
            });
            gfx.fillStyle(0xffff66, 1); gfx.fillCircle(cx-r*0.62, cy+r*0.48, r*0.07);
            gfx.fillStyle(0xff6688, 1); gfx.fillCircle(cx-r*0.62, cy+r*0.48, r*0.04);
            gfx.fillStyle(0xffff44, 1); gfx.fillCircle(cx+r*0.58, cy+r*0.52, r*0.06);
            gfx.fillStyle(0xff4488, 1); gfx.fillCircle(cx+r*0.58, cy+r*0.52, r*0.035);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Single big tree with round canopy and birds
            gfx.fillStyle(0x88ddff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Ground
            gfx.fillStyle(0x55aa33, 1);
            gfx.fillRect(cx-r*0.95, cy+r*0.46, r*1.9, r*0.5);
            // Trunk
            gfx.fillStyle(0x7a4010, 1);
            gfx.fillRoundedRect(cx-r*0.1, cy+r*0.0, r*0.2, r*0.48, r*0.04);
            // Canopy layers
            gfx.fillStyle(0x226611, 1); gfx.fillCircle(cx, cy-r*0.28, r*0.56);
            gfx.fillStyle(0x338822, 1); gfx.fillCircle(cx, cy-r*0.34, r*0.5);
            gfx.fillStyle(0x44aa33, 1); gfx.fillCircle(cx-r*0.08, cy-r*0.4, r*0.44);
            // Lighter spot on canopy
            gfx.fillStyle(0x66cc44, 0.5);
            gfx.fillCircle(cx-r*0.12, cy-r*0.52, r*0.2);
            // Birds (simple V shapes)
            gfx.lineStyle(2, 0x334455, 1);
            [[0.38,-0.62],[0.54,-0.54],[0.28,-0.5]].forEach(([bx,by]) => {
                gfx.beginPath(); gfx.moveTo(cx+bx*r-r*0.06, cy+by*r); gfx.lineTo(cx+bx*r, cy+by*r-r*0.04); gfx.strokePath();
                gfx.beginPath(); gfx.moveTo(cx+bx*r, cy+by*r-r*0.04); gfx.lineTo(cx+bx*r+r*0.06, cy+by*r); gfx.strokePath();
            });
        }
    },

    MONT: {
        fr: { answer: 'MONT',  letters: ['M','O','N','T','A','R'] },
        en: { answer: 'HILL',  letters: ['H','I','L','L','A','O'] },
        es: { answer: 'MONTE', letters: ['M','O','N','T','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x5588cc, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x4466aa, 0.4);
            gfx.fillEllipse(cx-r*0.3, cy-r*0.5, r*0.6, r*0.15);
            gfx.fillEllipse(cx+r*0.3, cy-r*0.45, r*0.5, r*0.12);
            gfx.fillStyle(0x8899aa, 1);
            tri(gfx, cx+r*0.42, cy+r*0.5, cx+r*0.82, cy-r*0.38, cx+r*1.05, cy+r*0.5);
            gfx.fillStyle(0xaabbcc, 1);
            tri(gfx, cx-r*0.72, cy+r*0.5, cx, cy-r*0.84, cx+r*0.72, cy+r*0.5);
            gfx.fillStyle(0xddeeff, 1);
            tri(gfx, cx-r*0.24, cy-r*0.5, cx, cy-r*0.84, cx+r*0.24, cy-r*0.5);
            gfx.fillStyle(0xffffff, 0.7);
            tri(gfx, cx-r*0.12, cy-r*0.64, cx, cy-r*0.84, cx+r*0.12, cy-r*0.64);
            gfx.fillStyle(0x336622, 1); gfx.fillRect(cx-r*0.95, cy+r*0.48, r*1.9, r*0.22);
            gfx.fillStyle(0x7a4010, 1);
            gfx.fillRect(cx-r*0.58, cy+r*0.28, r*0.08, r*0.22);
            gfx.fillStyle(0x226611, 1);
            tri(gfx, cx-r*0.54, cy+r*0.06, cx-r*0.68, cy+r*0.28, cx-r*0.4, cy+r*0.28);
            gfx.fillStyle(0x7a4010, 1);
            gfx.fillRect(cx+r*0.46, cy+r*0.32, r*0.08, r*0.18);
            gfx.fillStyle(0x338822, 1);
            tri(gfx, cx+r*0.5, cy+r*0.1, cx+r*0.36, cy+r*0.32, cx+r*0.64, cy+r*0.32);
        },
        drawPicture2(gfx, cx, cy, r) {
            // One sharp geometric mountain peak with snow cap
            gfx.fillStyle(0x5588cc, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Ground
            gfx.fillStyle(0x336622, 1);
            gfx.fillRect(cx-r*0.95, cy+r*0.52, r*1.9, r*0.44);
            // Mountain — single sharp triangle
            gfx.fillStyle(0x778899, 1);
            tri(gfx, cx-r*0.82, cy+r*0.52, cx, cy-r*0.88, cx+r*0.82, cy+r*0.52);
            // Snow cap
            gfx.fillStyle(0xffffff, 1);
            tri(gfx, cx-r*0.22, cy-r*0.46, cx, cy-r*0.88, cx+r*0.22, cy-r*0.46);
            gfx.fillStyle(0xddeeff, 0.8);
            tri(gfx, cx-r*0.1, cy-r*0.62, cx, cy-r*0.88, cx+r*0.1, cy-r*0.62);
            // Sun peeking top right
            gfx.fillStyle(0xffee22, 1); gfx.fillCircle(cx+r*0.7, cy-r*0.66, r*0.2);
            gfx.fillStyle(0xffee22, 0.6);
            for(let i=0;i<6;i++){
                const a = i*Math.PI/3;
                gfx.lineStyle(2.5, 0xffee22, 1);
                gfx.beginPath(); gfx.moveTo(cx+r*0.7+Math.cos(a)*r*0.24, cy-r*0.66+Math.sin(a)*r*0.24);
                gfx.lineTo(cx+r*0.7+Math.cos(a)*r*0.34, cy-r*0.66+Math.sin(a)*r*0.34); gfx.strokePath();
            }
        }
    },

    VENT: {
        fr: { answer: 'VENT', letters: ['V','E','N','T','O','L'] },
        en: { answer: 'WIND', letters: ['W','I','N','D','O','A'] },
        es: { answer: 'AIRE', letters: ['A','I','R','E','O','N'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xaad4ee, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.58, cy-r*0.54, r*0.2);
            gfx.fillCircle(cx-r*0.38, cy-r*0.58, r*0.28);
            gfx.fillCircle(cx-r*0.14, cy-r*0.54, r*0.22);
            gfx.fillRect(cx-r*0.58, cy-r*0.54, r*0.46, r*0.2);
            gfx.lineStyle(5, 0xffffff, 0.9);
            gfx.beginPath(); gfx.arc(cx-r*0.05, cy-r*0.22, r*0.5, 0.4, 2.1, false); gfx.strokePath();
            gfx.lineStyle(4, 0xeef4ff, 0.8);
            gfx.beginPath(); gfx.arc(cx+r*0.08, cy+r*0.08, r*0.42, 0.3, 2.0, false); gfx.strokePath();
            gfx.lineStyle(3, 0xddeeff, 0.7);
            gfx.beginPath(); gfx.arc(cx-r*0.04, cy+r*0.34, r*0.32, 0.35, 1.9, false); gfx.strokePath();
            const leaves = [[cx+r*0.52, cy-r*0.18, 0.3], [cx-r*0.14, cy+r*0.18, -0.4], [cx+r*0.24, cy+r*0.44, 0.5], [cx+r*0.62, cy+r*0.3, -0.2]];
            leaves.forEach(([lx, ly, angle]) => {
                const cos = Math.cos(angle), sin = Math.sin(angle);
                gfx.fillStyle(0x66bb44, 1);
                gfx.fillEllipse(lx, ly, r*0.18, r*0.1);
                gfx.lineStyle(1, 0x448822, 0.7);
                gfx.beginPath(); gfx.moveTo(lx-r*0.08*cos, ly-r*0.08*sin); gfx.lineTo(lx+r*0.08*cos, ly+r*0.08*sin); gfx.strokePath();
            });
        },
        drawPicture2(gfx, cx, cy, r) {
            // Pinwheel / windmill with colorful blades
            gfx.fillStyle(0xaad4ee, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Pole
            gfx.lineStyle(5, 0x886644, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy+r*0.2); gfx.lineTo(cx, cy+r*0.88); gfx.strokePath();
            // 4 blades (quarter circles), alternating colors
            const bladeColors = [0xff4444, 0xffcc00, 0x44cc44, 0x4488ff];
            bladeColors.forEach((c, i) => {
                const startA = i * Math.PI * 0.5 - Math.PI * 0.25;
                const endA = startA + Math.PI * 0.5 - 0.1;
                gfx.fillStyle(c, 1);
                gfx.beginPath();
                gfx.moveTo(cx, cy);
                gfx.arc(cx, cy, r*0.6, startA, endA, false);
                gfx.closePath(); gfx.fillPath();
            });
            // Center hub
            gfx.fillStyle(0x888888, 1); gfx.fillCircle(cx, cy, r*0.09);
            gfx.fillStyle(0xdddddd, 1); gfx.fillCircle(cx, cy, r*0.06);
            // Base
            gfx.fillStyle(0x886644, 1);
            gfx.fillRoundedRect(cx-r*0.14, cy+r*0.82, r*0.28, r*0.1, r*0.03);
        }
    },

    CIEL: {
        fr: { answer: 'CIEL',  letters: ['C','I','E','L','O','A'] },
        en: { answer: 'SKY',   letters: ['S','K','Y','A','I','O'] },
        es: { answer: 'CIELO', letters: ['C','I','E','L','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x44aaee, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xffee22, 1); gfx.fillCircle(cx+r*0.44, cy-r*0.44, r*0.28);
            gfx.lineStyle(3.5, 0xffee22, 1);
            for (let i = 0; i < 8; i++) {
                const a = i * Math.PI / 4, d1 = r*0.32, d2 = r*0.48;
                gfx.beginPath();
                gfx.moveTo(cx+r*0.44+Math.cos(a)*d1, cy-r*0.44+Math.sin(a)*d1);
                gfx.lineTo(cx+r*0.44+Math.cos(a)*d2, cy-r*0.44+Math.sin(a)*d2);
                gfx.strokePath();
            }
            gfx.fillStyle(0x333300, 1);
            gfx.fillCircle(cx+r*0.36, cy-r*0.52, r*0.04);
            gfx.fillCircle(cx+r*0.52, cy-r*0.52, r*0.04);
            gfx.lineStyle(2, 0x664400, 1);
            gfx.beginPath(); gfx.arc(cx+r*0.44, cy-r*0.38, r*0.09, 0.2, Math.PI-0.2, false); gfx.strokePath();
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.4, cy-r*0.12, r*0.24);
            gfx.fillCircle(cx-r*0.6, cy-r*0.08, r*0.17);
            gfx.fillCircle(cx-r*0.2, cy-r*0.08, r*0.17);
            gfx.fillRect(cx-r*0.6, cy-r*0.08, r*0.42, r*0.18);
            gfx.fillCircle(cx+r*0.14, cy+r*0.28, r*0.2);
            gfx.fillCircle(cx+r*0.32, cy+r*0.25, r*0.14);
            gfx.fillCircle(cx-r*0.02, cy+r*0.25, r*0.14);
            gfx.fillRect(cx-r*0.02, cy+r*0.28, r*0.36, r*0.15);
            gfx.lineStyle(2, 0x334455, 0.8);
            [[-r*0.6, cy-r*0.6], [r*0.72, cy-r*0.28]].forEach(([bx, by]) => {
                gfx.beginPath(); gfx.moveTo(cx+bx, by); gfx.lineTo(cx+bx+r*0.08, by-r*0.08); gfx.strokePath();
                gfx.beginPath(); gfx.moveTo(cx+bx+r*0.08, by-r*0.08); gfx.lineTo(cx+bx+r*0.16, by); gfx.strokePath();
            });
        },
        drawPicture2(gfx, cx, cy, r) {
            // Rainbow arc with clouds at each end
            gfx.fillStyle(0x66ccff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Rainbow bands (arc, top half of circle)
            const rainbowColors = [0xff2222, 0xff8800, 0xffee00, 0x44cc22, 0x2266ff, 0x8822cc];
            rainbowColors.forEach((c, i) => {
                const outerR = r*(0.82 - i*0.08);
                const innerR = r*(0.76 - i*0.08);
                gfx.fillStyle(c, 1);
                gfx.beginPath();
                gfx.arc(cx, cy+r*0.28, outerR, Math.PI, 0, false);
                gfx.arc(cx, cy+r*0.28, innerR, 0, Math.PI, true);
                gfx.closePath(); gfx.fillPath();
            });
            // Left cloud
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.72, cy+r*0.28, r*0.18);
            gfx.fillCircle(cx-r*0.56, cy+r*0.22, r*0.22);
            gfx.fillCircle(cx-r*0.42, cy+r*0.28, r*0.16);
            gfx.fillRect(cx-r*0.72, cy+r*0.28, r*0.32, r*0.18);
            // Right cloud
            gfx.fillCircle(cx+r*0.72, cy+r*0.28, r*0.18);
            gfx.fillCircle(cx+r*0.56, cy+r*0.22, r*0.22);
            gfx.fillCircle(cx+r*0.42, cy+r*0.28, r*0.16);
            gfx.fillRect(cx+r*0.42, cy+r*0.28, r*0.32, r*0.18);
        }
    },

    // ── LEVEL 4 : La Cuisine ─────────────────────────────────────────────
    PAIN: {
        fr: { answer: 'PAIN', letters: ['P','A','I','N','E','O'] },
        en: { answer: 'BUN',  letters: ['B','U','N','A','E','O'] },
        es: { answer: 'PAN',  letters: ['P','A','N','I','E','O'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff3e0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xb05e14, 1);
            gfx.fillEllipse(cx, cy+r*0.08, r*1.38, r*0.56);
            gfx.fillStyle(0xd4821e, 1);
            gfx.fillEllipse(cx, cy-r*0.02, r*1.28, r*0.48);
            gfx.fillStyle(0xe8a030, 1);
            gfx.fillEllipse(cx, cy-r*0.1, r*1.14, r*0.38);
            gfx.fillStyle(0xf2b840, 1);
            gfx.fillEllipse(cx-r*0.08, cy-r*0.16, r*0.9, r*0.28);
            gfx.lineStyle(3, 0x8b3e08, 0.8);
            for (const dx of [-0.32, -0.1, 0.12, 0.34]) {
                gfx.beginPath();
                gfx.moveTo(cx+dx*r-r*0.07, cy-r*0.26);
                gfx.lineTo(cx+dx*r+r*0.07, cy+r*0.06);
                gfx.strokePath();
            }
            gfx.fillStyle(0xd47818, 1);
            gfx.fillEllipse(cx-r*0.52, cy+r*0.04, r*0.22, r*0.32);
            gfx.fillEllipse(cx+r*0.52, cy+r*0.04, r*0.22, r*0.32);
            gfx.lineStyle(2, 0xffffff, 0.35);
            gfx.beginPath(); gfx.arc(cx-r*0.22, cy-r*0.22, r*0.08, 3.8, 5.6, false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx+r*0.22, cy-r*0.24, r*0.06, 3.9, 5.5, false); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Baguette with diagonal score marks
            gfx.fillStyle(0xfff3e0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Baguette body (long rounded rectangle, angled)
            gfx.fillStyle(0xb05e14, 1);
            gfx.fillRoundedRect(cx-r*0.82, cy-r*0.16, r*1.64, r*0.38, r*0.18);
            gfx.fillStyle(0xd4821e, 1);
            gfx.fillRoundedRect(cx-r*0.78, cy-r*0.13, r*1.56, r*0.32, r*0.16);
            gfx.fillStyle(0xe8a030, 1);
            gfx.fillRoundedRect(cx-r*0.72, cy-r*0.1, r*1.44, r*0.24, r*0.12);
            gfx.fillStyle(0xf2c050, 0.7);
            gfx.fillEllipse(cx-r*0.18, cy-r*0.06, r*0.72, r*0.12);
            // Diagonal score marks
            gfx.lineStyle(3, 0x8b3e08, 0.85);
            for(let i = -3; i <= 3; i++) {
                const mx = cx + i * r * 0.22;
                gfx.beginPath(); gfx.moveTo(mx - r*0.08, cy - r*0.12); gfx.lineTo(mx + r*0.08, cy + r*0.12); gfx.strokePath();
            }
            // Flour dusting
            gfx.fillStyle(0xfff8f0, 0.4);
            gfx.fillEllipse(cx-r*0.3, cy-r*0.04, r*0.28, r*0.1);
            gfx.fillEllipse(cx+r*0.4, cy+r*0.02, r*0.2, r*0.08);
        }
    },

    LAIT: {
        fr: { answer: 'LAIT',  letters: ['L','A','I','T','O','E'] },
        en: { answer: 'MILK',  letters: ['M','I','L','K','A','O'] },
        es: { answer: 'LECHE', letters: ['L','E','C','H','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xeef8ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xfafafa, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.3, cy-r*0.62);
            gfx.lineTo(cx+r*0.3, cy-r*0.62);
            gfx.lineTo(cx+r*0.36, cy+r*0.54);
            gfx.lineTo(cx-r*0.36, cy+r*0.54);
            gfx.closePath(); gfx.fillPath();
            gfx.fillStyle(0x2266aa, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.3, cy-r*0.62);
            gfx.lineTo(cx+r*0.3, cy-r*0.62);
            gfx.lineTo(cx+r*0.32, cy-r*0.3);
            gfx.lineTo(cx-r*0.32, cy-r*0.3);
            gfx.closePath(); gfx.fillPath();
            gfx.fillStyle(0xffffff, 1);
            gfx.fillRect(cx-r*0.2, cy-r*0.56, r*0.4, r*0.06);
            gfx.fillRect(cx-r*0.2, cy-r*0.48, r*0.4, r*0.06);
            gfx.fillStyle(0x111111, 1);
            gfx.fillEllipse(cx-r*0.1, cy-r*0.1, r*0.14, r*0.18);
            gfx.fillEllipse(cx+r*0.1, cy+r*0.14, r*0.1, r*0.14);
            gfx.fillEllipse(cx+r*0.16, cy-r*0.04, r*0.08, r*0.1);
            gfx.lineStyle(2.5, 0x99ccee, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.3, cy-r*0.62); gfx.lineTo(cx+r*0.3, cy-r*0.62);
            gfx.lineTo(cx+r*0.36, cy+r*0.54); gfx.lineTo(cx-r*0.36, cy+r*0.54);
            gfx.closePath(); gfx.strokePath();
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.3, cy-r*0.62, r*0.05);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.3, cy-r*0.62);
            gfx.lineTo(cx-r*0.26, cy-r*0.82);
            gfx.lineTo(cx+r*0.26, cy-r*0.82);
            gfx.lineTo(cx+r*0.3, cy-r*0.62);
            gfx.closePath(); gfx.fillPath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Glass of milk with a straw
            gfx.fillStyle(0xeef8ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Glass body
            gfx.fillStyle(0xddeeee, 0.8);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.3, cy-r*0.52);
            gfx.lineTo(cx+r*0.3, cy-r*0.52);
            gfx.lineTo(cx+r*0.38, cy+r*0.58);
            gfx.lineTo(cx-r*0.38, cy+r*0.58);
            gfx.closePath(); gfx.fillPath();
            // Milk fill (white)
            gfx.fillStyle(0xffffff, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.28, cy-r*0.42);
            gfx.lineTo(cx+r*0.28, cy-r*0.42);
            gfx.lineTo(cx+r*0.36, cy+r*0.54);
            gfx.lineTo(cx-r*0.36, cy+r*0.54);
            gfx.closePath(); gfx.fillPath();
            // Foam top
            gfx.fillStyle(0xf8f8f8, 0.9);
            gfx.fillEllipse(cx, cy-r*0.44, r*0.58, r*0.14);
            gfx.lineStyle(2, 0xccddee, 0.8);
            gfx.strokeRoundedRect(cx-r*0.3, cy-r*0.52, r*0.6, r*0.06, r*0.02);
            // Glass outline
            gfx.lineStyle(2.5, 0x99bbcc, 0.8);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.3, cy-r*0.52); gfx.lineTo(cx-r*0.38, cy+r*0.58);
            gfx.moveTo(cx+r*0.3, cy-r*0.52); gfx.lineTo(cx+r*0.38, cy+r*0.58);
            gfx.strokePath();
            gfx.lineBetween(cx-r*0.38, cy+r*0.58, cx+r*0.38, cy+r*0.58);
            // Straw (red/white striped)
            gfx.fillStyle(0xffffff, 1);
            gfx.fillRoundedRect(cx+r*0.14, cy-r*0.82, r*0.1, r*1.0, r*0.04);
            gfx.fillStyle(0xff4444, 0.8);
            for(let i=0;i<5;i++) {
                gfx.fillRect(cx+r*0.14, cy-r*0.82+i*r*0.2, r*0.1, r*0.1);
            }
        }
    },

    NOIX: {
        fr: { answer: 'NOIX', letters: ['N','O','I','X','A','E'] },
        en: { answer: 'NUT',  letters: ['N','U','T','A','O','I'] },
        es: { answer: 'NUEZ', letters: ['N','U','E','Z','A','O'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xf5e6c8, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x7a4818, 1); gfx.fillEllipse(cx, cy+r*0.04, r*1.04, r*0.84);
            gfx.fillStyle(0x9a6228, 1); gfx.fillEllipse(cx, cy+r*0.04, r*0.96, r*0.76);
            gfx.fillStyle(0xc8882c, 1); gfx.fillEllipse(cx-r*0.06, cy+r*0.0, r*0.64, r*0.52);
            gfx.lineStyle(3, 0x5a3210, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.42); gfx.lineTo(cx, cy+r*0.42); gfx.strokePath();
            gfx.lineStyle(2, 0x6a3a14, 0.8);
            gfx.beginPath(); gfx.arc(cx-r*0.18, cy-r*0.06, r*0.26, 1.9, 4.7, false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx-r*0.18, cy+r*0.12, r*0.2, 1.7, 4.5, false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx+r*0.18, cy-r*0.06, r*0.26, Math.PI-4.7+Math.PI, Math.PI-1.9+Math.PI, false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx+r*0.18, cy+r*0.12, r*0.2, Math.PI-4.5+Math.PI, Math.PI-1.7+Math.PI, false); gfx.strokePath();
            gfx.fillStyle(0xddaa66, 0.45); gfx.fillEllipse(cx-r*0.2, cy-r*0.14, r*0.26, r*0.18);
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx+r*0.42, cy-r*0.52, r*0.24, r*0.14);
            gfx.lineStyle(1.5, 0x226611, 0.8);
            gfx.beginPath(); gfx.moveTo(cx+r*0.3, cy-r*0.52); gfx.lineTo(cx+r*0.54, cy-r*0.52); gfx.strokePath();
            gfx.lineStyle(3, 0x8b4513, 1);
            gfx.beginPath(); gfx.moveTo(cx+r*0.42, cy-r*0.52); gfx.lineTo(cx+r*0.38, cy-r*0.66); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Cracked walnut halves (butterfly shape)
            gfx.fillStyle(0xf5e6c8, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Left half
            gfx.fillStyle(0x7a4818, 1);
            gfx.fillEllipse(cx-r*0.3, cy+r*0.06, r*0.5, r*0.7);
            gfx.fillStyle(0x9a6228, 1);
            gfx.fillEllipse(cx-r*0.3, cy+r*0.06, r*0.44, r*0.64);
            // Interior texture left
            gfx.fillStyle(0xddb870, 0.8);
            gfx.fillEllipse(cx-r*0.3, cy+r*0.06, r*0.32, r*0.48);
            gfx.lineStyle(2, 0x8b5020, 0.6);
            gfx.beginPath(); gfx.arc(cx-r*0.3, cy-r*0.06, r*0.18, 1.8, 4.5, false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx-r*0.3, cy+r*0.18, r*0.14, 1.7, 4.3, false); gfx.strokePath();
            // Right half
            gfx.fillStyle(0x7a4818, 1);
            gfx.fillEllipse(cx+r*0.3, cy+r*0.06, r*0.5, r*0.7);
            gfx.fillStyle(0x9a6228, 1);
            gfx.fillEllipse(cx+r*0.3, cy+r*0.06, r*0.44, r*0.64);
            gfx.fillStyle(0xddb870, 0.8);
            gfx.fillEllipse(cx+r*0.3, cy+r*0.06, r*0.32, r*0.48);
            gfx.lineStyle(2, 0x8b5020, 0.6);
            gfx.beginPath(); gfx.arc(cx+r*0.3, cy-r*0.06, r*0.18, Math.PI-4.5, Math.PI-1.8, false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx+r*0.3, cy+r*0.18, r*0.14, Math.PI-4.3, Math.PI-1.7, false); gfx.strokePath();
            // Center crack line
            gfx.lineStyle(3, 0x5a3010, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.5); gfx.lineTo(cx, cy+r*0.56); gfx.strokePath();
        }
    },

    MIEL: {
        fr: { answer: 'MIEL',  letters: ['M','I','E','L','A','O'] },
        en: { answer: 'HONEY', letters: ['H','O','N','E','Y','A'] },
        es: { answer: 'MIEL',  letters: ['M','I','E','L','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff8e0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xcc7700, 1);
            gfx.fillRoundedRect(cx-r*0.38, cy-r*0.44, r*0.76, r*0.92, r*0.14);
            gfx.fillStyle(0xffaa00, 1);
            gfx.fillRoundedRect(cx-r*0.35, cy-r*0.41, r*0.7, r*0.86, r*0.12);
            gfx.fillStyle(0xffcc33, 1);
            gfx.fillRoundedRect(cx-r*0.3, cy-r*0.36, r*0.6, r*0.76, r*0.1);
            gfx.fillStyle(0xaa5500, 1);
            gfx.fillRoundedRect(cx-r*0.42, cy-r*0.54, r*0.84, r*0.18, r*0.06);
            gfx.fillStyle(0xffcc33, 1); gfx.fillEllipse(cx, cy-r*0.44, r*0.48, r*0.16);
            gfx.fillStyle(0xcc8800, 0.6);
            for (const [hx, hy] of [[-0.18,-0.22],[0.18,-0.22],[0.0,-0.1],[-0.18,0.06],[0.18,0.06],[0.0,0.2]]) {
                gfx.lineStyle(1.5, 0x885500, 0.5);
                gfx.strokeCircle(cx+hx*r, cy+hy*r, r*0.1);
            }
            gfx.fillStyle(0xffaa00, 1);
            gfx.fillEllipse(cx+r*0.28, cy+r*0.56, r*0.1, r*0.08);
            gfx.beginPath();
            gfx.moveTo(cx+r*0.22, cy+r*0.48);
            gfx.lineTo(cx+r*0.34, cy+r*0.48);
            gfx.lineTo(cx+r*0.3, cy+r*0.56);
            gfx.closePath(); gfx.fillPath();
            gfx.fillStyle(0xffdd44, 1);
            gfx.fillEllipse(cx-r*0.54, cy-r*0.58, r*0.22, r*0.12);
            gfx.fillStyle(0x111111, 1);
            gfx.fillRect(cx-r*0.62, cy-r*0.61, r*0.06, r*0.07);
            gfx.fillRect(cx-r*0.5, cy-r*0.61, r*0.06, r*0.07);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillEllipse(cx-r*0.56, cy-r*0.52, r*0.08, r*0.14);
            gfx.fillEllipse(cx-r*0.46, cy-r*0.52, r*0.08, r*0.14);
            gfx.fillStyle(0x111100, 1);
            gfx.fillRect(cx-r*0.62, cy-r*0.56, r*0.22, r*0.03);
            gfx.fillRect(cx-r*0.62, cy-r*0.5, r*0.22, r*0.03);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Honeycomb grid pattern — hexagonal cells
            gfx.fillStyle(0xfff8e0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Draw hexagonal honeycomb cells
            const hexR = r * 0.2;
            const rows = [
                [{x:cx-r*0.4,y:cy-r*0.44},{x:cx,y:cy-r*0.44},{x:cx+r*0.4,y:cy-r*0.44}],
                [{x:cx-r*0.6,y:cy-r*0.1},{x:cx-r*0.2,y:cy-r*0.1},{x:cx+r*0.2,y:cy-r*0.1},{x:cx+r*0.6,y:cy-r*0.1}],
                [{x:cx-r*0.4,y:cy+r*0.24},{x:cx,y:cy+r*0.24},{x:cx+r*0.4,y:cy+r*0.24}],
                [{x:cx-r*0.2,y:cy+r*0.58},{x:cx+r*0.2,y:cy+r*0.58}],
            ];
            rows.forEach(row => row.forEach(({x,y}) => {
                gfx.fillStyle(0xffaa00, 1);
                gfx.beginPath();
                for(let i=0;i<6;i++){
                    const a = i*Math.PI/3 - Math.PI/6;
                    if(i===0) gfx.moveTo(x+Math.cos(a)*hexR, y+Math.sin(a)*hexR);
                    else gfx.lineTo(x+Math.cos(a)*hexR, y+Math.sin(a)*hexR);
                }
                gfx.closePath(); gfx.fillPath();
                gfx.fillStyle(0xffcc33, 0.7);
                gfx.beginPath();
                for(let i=0;i<6;i++){
                    const a = i*Math.PI/3 - Math.PI/6;
                    if(i===0) gfx.moveTo(x+Math.cos(a)*hexR*0.72, y+Math.sin(a)*hexR*0.72);
                    else gfx.lineTo(x+Math.cos(a)*hexR*0.72, y+Math.sin(a)*hexR*0.72);
                }
                gfx.closePath(); gfx.fillPath();
                gfx.lineStyle(1.5, 0xcc7700, 0.6);
                gfx.beginPath();
                for(let i=0;i<6;i++){
                    const a = i*Math.PI/3 - Math.PI/6;
                    if(i===0) gfx.moveTo(x+Math.cos(a)*hexR, y+Math.sin(a)*hexR);
                    else gfx.lineTo(x+Math.cos(a)*hexR, y+Math.sin(a)*hexR);
                }
                gfx.closePath(); gfx.strokePath();
            }));
        }
    },

    OEUF: {
        fr: { answer: 'OEUF',  letters: ['O','E','U','F','I','A'] },
        en: { answer: 'EGG',   letters: ['E','G','G','A','O','I'] },
        es: { answer: 'HUEVO', letters: ['H','U','E','V','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff8e8, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xddccaa, 1); gfx.fillEllipse(cx, cy+r*0.04, r*0.78, r*1.0);
            gfx.fillStyle(0xfffdf2, 1); gfx.fillEllipse(cx, cy+r*0.04, r*0.72, r*0.94);
            gfx.fillStyle(0xeeddbb, 1);
            gfx.fillEllipse(cx-r*0.18, cy-r*0.18, r*0.12, r*0.28);
            gfx.lineStyle(3, 0xccbb88, 1);
            gfx.beginPath();
            gfx.moveTo(cx-r*0.14, cy-r*0.18);
            gfx.lineTo(cx-r*0.06, cy-r*0.06);
            gfx.lineTo(cx+r*0.1, cy-r*0.14);
            gfx.lineTo(cx+r*0.06, cy-r*0.04);
            gfx.strokePath();
            gfx.fillStyle(0xffcc00, 1); gfx.fillCircle(cx+r*0.04, cy+r*0.02, r*0.14);
            gfx.fillStyle(0xffdd55, 0.6); gfx.fillCircle(cx-r*0.02, cy-r*0.04, r*0.08);
            gfx.fillStyle(0x222222, 1);
            gfx.fillCircle(cx-r*0.14, cy-r*0.44, r*0.055);
            gfx.fillCircle(cx+r*0.14, cy-r*0.44, r*0.055);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.12, cy-r*0.455, r*0.022);
            gfx.fillCircle(cx+r*0.16, cy-r*0.455, r*0.022);
            gfx.lineStyle(2, 0xcc8855, 1);
            gfx.beginPath(); gfx.arc(cx, cy-r*0.32, r*0.08, 0.3, Math.PI-0.3, false); gfx.strokePath();
            gfx.fillStyle(0xff9988, 0.22);
            gfx.fillCircle(cx-r*0.22, cy-r*0.4, r*0.08);
            gfx.fillCircle(cx+r*0.22, cy-r*0.4, r*0.08);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Whole uncracked egg with colored speckles
            gfx.fillStyle(0xfff8e8, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Egg shape
            gfx.fillStyle(0xeeddbb, 1); gfx.fillEllipse(cx, cy+r*0.04, r*0.78, r*1.0);
            gfx.fillStyle(0xfffdf2, 1); gfx.fillEllipse(cx, cy+r*0.04, r*0.72, r*0.94);
            // Colored speckles
            const speckles = [[0.12,-0.28,0xcc7744],[-.18,-0.36,0xaa5533],[0.26,-0.1,0xdd9955],
                              [-0.08,0.16,0xbb6633],[0.2,0.22,0xcc7744],[-.24,0.04,0x997733],
                              [0.04,0.38,0xbb5522],[-0.16,0.3,0xdd8855]];
            speckles.forEach(([dx,dy,c]) => {
                gfx.fillStyle(c, 0.6);
                gfx.fillEllipse(cx+dx*r, cy+dy*r, r*0.065, r*0.048);
            });
            // Shine
            gfx.fillStyle(0xffffff, 0.6);
            gfx.fillEllipse(cx-r*0.16, cy-r*0.22, r*0.18, r*0.28);
        }
    },

    // ── LEVEL 5 : La Maison ──────────────────────────────────────────────
    VELO: {
        fr: { answer: 'VELO', letters: ['V','E','L','O','A','I'] },
        en: { answer: 'BIKE', letters: ['B','I','K','E','A','O'] },
        es: { answer: 'BICI', letters: ['B','I','C','I','A','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xf0f4f8, 1); gfx.fillCircle(cx, cy, r*0.95);
            const wy = cy + r*0.22, wl = cx - r*0.36, wr = cx + r*0.36;
            gfx.fillStyle(0x333333, 1); gfx.fillCircle(wl, wy, r*0.36); gfx.fillCircle(wr, wy, r*0.36);
            gfx.fillStyle(0xdddddd, 1); gfx.fillCircle(wl, wy, r*0.28); gfx.fillCircle(wr, wy, r*0.28);
            gfx.lineStyle(2.5, 0x999999, 0.7);
            for (let i = 0; i < 8; i++) {
                const a = i * Math.PI / 4;
                gfx.beginPath(); gfx.moveTo(wl, wy); gfx.lineTo(wl+Math.cos(a)*r*0.28, wy+Math.sin(a)*r*0.28); gfx.strokePath();
                gfx.beginPath(); gfx.moveTo(wr, wy); gfx.lineTo(wr+Math.cos(a)*r*0.28, wy+Math.sin(a)*r*0.28); gfx.strokePath();
            }
            gfx.fillStyle(0x333333, 1); gfx.fillCircle(wl, wy, r*0.06); gfx.fillCircle(wr, wy, r*0.06);
            gfx.lineStyle(5, 0xee3300, 1);
            gfx.beginPath(); gfx.moveTo(wl, wy); gfx.lineTo(cx, cy-r*0.12); gfx.lineTo(wr, wy); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(wl, wy); gfx.lineTo(cx+r*0.06, cy-r*0.12); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.12); gfx.lineTo(cx-r*0.06, cy-r*0.34); gfx.strokePath();
            gfx.lineStyle(5, 0xee3300, 1);
            gfx.beginPath(); gfx.moveTo(wr, wy); gfx.lineTo(wr+r*0.02, cy-r*0.14); gfx.strokePath();
            gfx.lineStyle(4, 0x553311, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.2, cy-r*0.34); gfx.lineTo(cx+r*0.08, cy-r*0.34); gfx.strokePath();
            gfx.lineStyle(4, 0xee3300, 1);
            gfx.beginPath(); gfx.moveTo(wr-r*0.08, cy-r*0.14); gfx.lineTo(wr+r*0.14, cy-r*0.14); gfx.strokePath();
            gfx.fillStyle(0x553311, 1);
            gfx.fillEllipse(cx-r*0.06, cy-r*0.34, r*0.22, r*0.1);
            gfx.fillStyle(0x222222, 1);
            gfx.fillEllipse(cx+r*0.03, cy-r*0.13, r*0.12, r*0.08);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Single bicycle wheel with spokes, very graphic
            gfx.fillStyle(0xf0f4f8, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Outer tire
            gfx.fillStyle(0x222222, 1); gfx.fillCircle(cx, cy, r*0.72);
            gfx.fillStyle(0x444444, 1); gfx.fillCircle(cx, cy, r*0.66);
            gfx.fillStyle(0xf0f4f8, 1); gfx.fillCircle(cx, cy, r*0.60);
            // Spokes
            gfx.lineStyle(2.5, 0xee3300, 0.9);
            for(let i=0;i<12;i++){
                const a = i*Math.PI/6;
                gfx.beginPath(); gfx.moveTo(cx, cy); gfx.lineTo(cx+Math.cos(a)*r*0.6, cy+Math.sin(a)*r*0.6); gfx.strokePath();
            }
            // Hub
            gfx.fillStyle(0x333333, 1); gfx.fillCircle(cx, cy, r*0.1);
            gfx.fillStyle(0xee3300, 1); gfx.fillCircle(cx, cy, r*0.06);
            gfx.fillStyle(0xdddddd, 1); gfx.fillCircle(cx, cy, r*0.03);
            // Valve stem
            gfx.fillStyle(0x888888, 1);
            gfx.fillRect(cx+r*0.64, cy-r*0.03, r*0.1, r*0.06);
        }
    },

    AUTO: {
        fr: { answer: 'AUTO',  letters: ['A','U','T','O','E','N'] },
        en: { answer: 'CAR',   letters: ['C','A','R','O','E','N'] },
        es: { answer: 'COCHE', letters: ['C','O','C','H','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff0f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xdd2222, 1);
            gfx.fillRoundedRect(cx-r*0.72, cy-r*0.18, r*1.44, r*0.52, r*0.14);
            gfx.fillRoundedRect(cx-r*0.42, cy-r*0.58, r*0.84, r*0.44, r*0.14);
            gfx.fillStyle(0xcc1111, 1);
            gfx.fillRoundedRect(cx-r*0.42, cy-r*0.58, r*0.84, r*0.12, r*0.08);
            gfx.fillStyle(0x88ccff, 1);
            gfx.fillRoundedRect(cx-r*0.36, cy-r*0.52, r*0.32, r*0.28, r*0.06);
            gfx.fillRoundedRect(cx+r*0.06, cy-r*0.52, r*0.28, r*0.28, r*0.06);
            gfx.fillStyle(0xbbddff, 0.5);
            gfx.fillEllipse(cx-r*0.22, cy-r*0.44, r*0.1, r*0.14);
            gfx.fillEllipse(cx+r*0.14, cy-r*0.44, r*0.1, r*0.14);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.46, cy+r*0.36, r*0.24);
            gfx.fillCircle(cx+r*0.46, cy+r*0.36, r*0.24);
            gfx.fillStyle(0x888888, 1);
            gfx.fillCircle(cx-r*0.46, cy+r*0.36, r*0.12);
            gfx.fillCircle(cx+r*0.46, cy+r*0.36, r*0.12);
            gfx.fillStyle(0xbbbbbb, 1);
            gfx.fillCircle(cx-r*0.46, cy+r*0.36, r*0.04);
            gfx.fillCircle(cx+r*0.46, cy+r*0.36, r*0.04);
            gfx.lineStyle(2, 0xaa1111, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.18); gfx.lineTo(cx, cy+r*0.35); gfx.strokePath();
            gfx.fillStyle(0xffff99, 1); gfx.fillCircle(cx+r*0.64, cy+r*0.02, r*0.1);
            gfx.fillStyle(0xff6666, 1); gfx.fillCircle(cx-r*0.64, cy+r*0.02, r*0.1);
            gfx.fillStyle(0xcc1111, 1);
            gfx.fillRect(cx-r*0.3, cy+r*0.3, r*0.06, r*0.04);
            gfx.fillRect(cx+r*0.24, cy+r*0.3, r*0.06, r*0.04);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Car from front view: headlights, bumper, windshield
            gfx.fillStyle(0xfff0f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Car body front
            gfx.fillStyle(0xdd2222, 1);
            gfx.fillRoundedRect(cx-r*0.68, cy-r*0.42, r*1.36, r*0.88, r*0.16);
            // Roof
            gfx.fillRoundedRect(cx-r*0.44, cy-r*0.74, r*0.88, r*0.36, r*0.14);
            // Windshield (big)
            gfx.fillStyle(0x88ccff, 0.85);
            gfx.fillRoundedRect(cx-r*0.38, cy-r*0.68, r*0.76, r*0.28, r*0.1);
            // Grill
            gfx.fillStyle(0xaa1111, 1);
            gfx.fillRoundedRect(cx-r*0.32, cy+r*0.24, r*0.64, r*0.16, r*0.04);
            gfx.lineStyle(2, 0x881111, 1);
            for(let i=-2;i<=2;i++) {
                gfx.beginPath(); gfx.moveTo(cx+i*r*0.1, cy+r*0.24); gfx.lineTo(cx+i*r*0.1, cy+r*0.4); gfx.strokePath();
            }
            // Headlights
            gfx.fillStyle(0xffff99, 1);
            gfx.fillRoundedRect(cx-r*0.64, cy+r*0.06, r*0.24, r*0.16, r*0.06);
            gfx.fillRoundedRect(cx+r*0.40, cy+r*0.06, r*0.24, r*0.16, r*0.06);
            gfx.fillStyle(0xffee44, 0.6);
            gfx.fillEllipse(cx-r*0.52, cy+r*0.14, r*0.14, r*0.08);
            gfx.fillEllipse(cx+r*0.52, cy+r*0.14, r*0.14, r*0.08);
            // Hood center ornament
            gfx.fillStyle(0xcc1111, 1); gfx.fillCircle(cx, cy+r*0.2, r*0.06);
            gfx.fillStyle(0xffffff, 1); gfx.fillCircle(cx, cy+r*0.2, r*0.03);
        }
    },

    BAIN: {
        fr: { answer: 'BAIN', letters: ['B','A','I','N','O','E'] },
        en: { answer: 'BATH', letters: ['B','A','T','H','O','E'] },
        es: { answer: 'TINA', letters: ['T','I','N','A','O','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xe8f4ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x99aacc, 1);
            gfx.fillRoundedRect(cx-r*0.72, cy-r*0.18, r*1.44, r*0.66, r*0.2);
            gfx.fillStyle(0xe0e8f0, 1);
            gfx.fillRoundedRect(cx-r*0.66, cy-r*0.12, r*1.32, r*0.56, r*0.18);
            gfx.fillStyle(0x66aadd, 0.85);
            gfx.fillRoundedRect(cx-r*0.58, cy-r*0.04, r*1.16, r*0.38, r*0.1);
            gfx.fillStyle(0x88ccff, 0.5);
            gfx.beginPath(); gfx.arc(cx-r*0.3, cy+r*0.04, r*0.22, Math.PI, 0, false); gfx.fillPath();
            gfx.beginPath(); gfx.arc(cx+r*0.3, cy+r*0.04, r*0.22, Math.PI, 0, false); gfx.fillPath();
            gfx.fillStyle(0xffdd44, 1); gfx.fillCircle(cx+r*0.28, cy-r*0.12, r*0.2);
            gfx.fillStyle(0xffaa00, 1); gfx.fillCircle(cx+r*0.28, cy-r*0.12, r*0.14);
            gfx.fillStyle(0xff8800, 1); gfx.fillCircle(cx+r*0.28, cy-r*0.12, r*0.09);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx+r*0.22, cy-r*0.18, r*0.03);
            gfx.fillCircle(cx+r*0.34, cy-r*0.18, r*0.03);
            gfx.lineStyle(1.5, 0x222222, 1);
            gfx.beginPath(); gfx.arc(cx+r*0.28, cy-r*0.08, r*0.06, 0.2, Math.PI-0.2, false); gfx.strokePath();
            gfx.fillStyle(0xffffff, 0.8);
            gfx.fillCircle(cx-r*0.3, cy+r*0.06, r*0.1);
            gfx.fillCircle(cx-r*0.06, cy+r*0.1, r*0.08);
            gfx.fillCircle(cx+r*0.06, cy-r*0.04, r*0.12);
            gfx.lineStyle(1.5, 0x99aacc, 0.7);
            gfx.strokeCircle(cx-r*0.3, cy+r*0.06, r*0.1);
            gfx.strokeCircle(cx-r*0.06, cy+r*0.1, r*0.08);
            gfx.strokeCircle(cx+r*0.06, cy-r*0.04, r*0.12);
            gfx.fillStyle(0x99aacc, 1);
            gfx.fillRect(cx-r*0.6, cy+r*0.48, r*0.12, r*0.2);
            gfx.fillRect(cx+r*0.48, cy+r*0.48, r*0.12, r*0.2);
            gfx.fillStyle(0x8899bb, 1);
            gfx.fillRect(cx-r*0.08, cy-r*0.4, r*0.16, r*0.28);
            gfx.fillStyle(0xaa3322, 1); gfx.fillCircle(cx-r*0.2, cy-r*0.42, r*0.07);
            gfx.fillStyle(0x2244aa, 1); gfx.fillCircle(cx+r*0.2, cy-r*0.42, r*0.07);
            gfx.fillRect(cx-r*0.22, cy-r*0.46, r*0.44, r*0.08);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Rubber duck in water
            gfx.fillStyle(0xe8f4ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Water
            gfx.fillStyle(0x66aadd, 0.7);
            gfx.fillRect(cx-r*0.95, cy+r*0.3, r*1.9, r*0.65);
            gfx.fillStyle(0x88ccff, 0.4);
            gfx.beginPath(); gfx.arc(cx-r*0.3, cy+r*0.3, r*0.26, Math.PI, 0, false); gfx.fillPath();
            gfx.beginPath(); gfx.arc(cx+r*0.28, cy+r*0.3, r*0.22, Math.PI, 0, false); gfx.fillPath();
            // Duck body (yellow oval)
            gfx.fillStyle(0xffdd00, 1);
            gfx.fillEllipse(cx, cy+r*0.2, r*0.88, r*0.52);
            // Duck head
            gfx.fillCircle(cx+r*0.32, cy-r*0.06, r*0.3);
            // Wing detail
            gfx.fillStyle(0xeebb00, 0.6);
            gfx.fillEllipse(cx-r*0.1, cy+r*0.14, r*0.48, r*0.26);
            // Beak
            gfx.fillStyle(0xff8822, 1);
            gfx.fillEllipse(cx+r*0.64, cy-r*0.06, r*0.24, r*0.1);
            // Eye
            gfx.fillStyle(0x111111, 1); gfx.fillCircle(cx+r*0.42, cy-r*0.16, r*0.044);
            gfx.fillStyle(0xffffff, 1); gfx.fillCircle(cx+r*0.44, cy-r*0.18, r*0.018);
            // Bubbles
            gfx.fillStyle(0xffffff, 0.6);
            gfx.fillCircle(cx-r*0.5, cy+r*0.42, r*0.055);
            gfx.fillCircle(cx-r*0.62, cy+r*0.36, r*0.04);
        }
    },

    FOUR: {
        fr: { answer: 'FOUR',  letters: ['F','O','U','R','A','T'] },
        en: { answer: 'OVEN',  letters: ['O','V','E','N','A','I'] },
        es: { answer: 'HORNO', letters: ['H','O','R','N','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x222222, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x555555, 1);
            gfx.fillRoundedRect(cx-r*0.68, cy-r*0.7, r*1.36, r*1.28, r*0.1);
            gfx.fillStyle(0x444444, 1);
            gfx.fillRoundedRect(cx-r*0.56, cy-r*0.6, r*1.12, r*0.88, r*0.08);
            gfx.fillStyle(0x111111, 1);
            gfx.fillRoundedRect(cx-r*0.44, cy-r*0.5, r*0.88, r*0.6, r*0.1);
            gfx.fillStyle(0xff6600, 0.9); gfx.fillEllipse(cx, cy-r*0.2, r*0.5, r*0.36);
            gfx.fillStyle(0xff9900, 0.85); gfx.fillEllipse(cx-r*0.04, cy-r*0.25, r*0.34, r*0.26);
            gfx.fillStyle(0xffcc00, 0.8); gfx.fillEllipse(cx-r*0.06, cy-r*0.3, r*0.2, r*0.16);
            gfx.fillStyle(0xffffff, 0.5); gfx.fillCircle(cx-r*0.08, cy-r*0.34, r*0.06);
            gfx.lineStyle(2, 0x888888, 0.6);
            gfx.strokeRoundedRect(cx-r*0.44, cy-r*0.5, r*0.88, r*0.6, r*0.1);
            gfx.fillStyle(0x666666, 1);
            for (const [kx, ky] of [[-0.44,-0.74],[-0.18,-0.74],[0.08,-0.74],[0.34,-0.74]]) {
                gfx.fillCircle(cx+kx*r, cy+ky*r, r*0.1);
                gfx.fillStyle(0x999999, 1);
                gfx.fillCircle(cx+kx*r, cy+ky*r, r*0.055);
                gfx.fillStyle(0x666666, 1);
            }
            gfx.fillStyle(0x777777, 1);
            gfx.fillRoundedRect(cx-r*0.5, cy+r*0.14, r*1.0, r*0.08, r*0.04);
            gfx.fillStyle(0x888888, 1);
            gfx.fillRoundedRect(cx-r*0.48, cy+r*0.14, r*0.96, r*0.04, r*0.02);
            gfx.fillStyle(0xff4400, 1);
            for (const hx of [-0.28, 0.28]) {
                gfx.fillCircle(cx+hx*r, cy+r*0.64, r*0.12);
                gfx.lineStyle(2, 0xcc2200, 0.8);
                gfx.strokeCircle(cx+hx*r, cy+r*0.64, r*0.12);
            }
            gfx.fillStyle(0x555555, 1);
            gfx.fillRect(cx-r*0.68, cy-r*0.7, r*1.36, r*0.1);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Pizza/pie inside oven window (circular with toppings)
            gfx.fillStyle(0x222222, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Oven window frame
            gfx.fillStyle(0x555555, 1);
            gfx.fillRoundedRect(cx-r*0.62, cy-r*0.62, r*1.24, r*1.24, r*0.12);
            // Window interior glowing
            gfx.fillStyle(0xff6600, 0.4);
            gfx.fillRoundedRect(cx-r*0.54, cy-r*0.54, r*1.08, r*1.08, r*0.1);
            // Pizza circle
            gfx.fillStyle(0xf2b840, 1); gfx.fillCircle(cx, cy, r*0.48);
            // Sauce
            gfx.fillStyle(0xcc2200, 1); gfx.fillCircle(cx, cy, r*0.42);
            // Cheese
            gfx.fillStyle(0xffee88, 1); gfx.fillCircle(cx, cy, r*0.38);
            // Toppings (pepperoni)
            gfx.fillStyle(0xcc3300, 1);
            [[0,-0.2],[0.2,0.1],[-0.18,0.12],[0.06,0.28],[-0.1,-0.1]].forEach(([dx,dy]) => {
                gfx.fillCircle(cx+dx*r, cy+dy*r, r*0.075);
            });
            // Crust edge
            gfx.lineStyle(4, 0xe8a030, 1);
            gfx.strokeCircle(cx, cy, r*0.44);
            // Steam
            gfx.lineStyle(2, 0xffffff, 0.5);
            gfx.beginPath(); gfx.arc(cx-r*0.2, cy-r*0.6, r*0.06, Math.PI, 0, false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx, cy-r*0.62, r*0.06, Math.PI, 0, false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx+r*0.2, cy-r*0.6, r*0.06, Math.PI, 0, false); gfx.strokePath();
        }
    },

    VASE: {
        fr: { answer: 'VASE',  letters: ['V','A','S','E','O','I'] },
        en: { answer: 'VASE',  letters: ['V','A','S','E','O','I'] },
        es: { answer: 'JARRO', letters: ['J','A','R','R','O','I'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xeef8ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x1155aa, 1);
            gfx.fillEllipse(cx, cy+r*0.32, r*0.88, r*0.7);
            gfx.fillRect(cx-r*0.22, cy-r*0.28, r*0.44, r*0.62);
            gfx.fillEllipse(cx, cy-r*0.28, r*0.44, r*0.18);
            gfx.fillRect(cx-r*0.28, cy-r*0.36, r*0.56, r*0.12);
            gfx.fillEllipse(cx, cy-r*0.36, r*0.56, r*0.2);
            gfx.fillStyle(0x3377cc, 1);
            gfx.beginPath(); gfx.arc(cx-r*0.3, cy+r*0.1, r*0.32, 0.3, 2.8, false); gfx.strokePath();
            gfx.lineStyle(2, 0x88aadd, 0.5);
            gfx.beginPath(); gfx.arc(cx-r*0.22, cy+r*0.0, r*0.22, 0.4, 2.6, false); gfx.strokePath();
            gfx.fillStyle(0x55aaee, 0.35);
            gfx.fillEllipse(cx-r*0.16, cy-r*0.06, r*0.14, r*0.42);
            gfx.fillStyle(0x66cc44, 0.8);
            gfx.fillRect(cx-r*0.02, cy-r*0.56, r*0.04, r*0.22);
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx+r*0.12, cy-r*0.58, r*0.2, r*0.1);
            gfx.lineStyle(1, 0x338811, 0.7);
            gfx.beginPath(); gfx.moveTo(cx+r*0.02, cy-r*0.58); gfx.lineTo(cx+r*0.22, cy-r*0.58); gfx.strokePath();
            const petals5 = [0xff4488, 0xff8800, 0xffdd00, 0xff4488, 0xff8800];
            petals5.forEach((c, i) => {
                const a = (i / 5) * Math.PI * 2;
                gfx.fillStyle(c, 1);
                gfx.fillCircle(cx+Math.cos(a)*r*0.22, cy-r*0.74+Math.sin(a)*r*0.22, r*0.14);
            });
            gfx.fillStyle(0xffee44, 1); gfx.fillCircle(cx, cy-r*0.74, r*0.12);
            gfx.fillStyle(0x55aaee, 0.6);
            gfx.fillEllipse(cx, cy-r*0.3, r*0.38, r*0.08);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Flower bouquet without vase, arranged in circle
            gfx.fillStyle(0xeef8ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Stems
            gfx.lineStyle(3, 0x338822, 1);
            const flowerPositions = [
                [0, -0.58], [-0.38, -0.38], [0.38, -0.38],
                [-0.54, 0.0], [0.54, 0.0], [-0.38, 0.38], [0.38, 0.38]
            ];
            flowerPositions.forEach(([dx,dy]) => {
                gfx.beginPath(); gfx.moveTo(cx, cy+r*0.5); gfx.lineTo(cx+dx*r, cy+dy*r); gfx.strokePath();
            });
            // Ribbon at base
            gfx.fillStyle(0xff4488, 1);
            gfx.fillRoundedRect(cx-r*0.14, cy+r*0.44, r*0.28, r*0.1, r*0.04);
            // Flowers
            const flowerColors = [0xff4488, 0xffaa00, 0xff6699, 0xffcc00, 0xff88bb, 0xeeaa00, 0xff5599];
            flowerPositions.forEach(([dx,dy], fi) => {
                const fx = cx+dx*r, fy = cy+dy*r;
                const fc = flowerColors[fi];
                // Petals
                for(let p=0;p<5;p++){
                    const a = p*Math.PI*2/5;
                    gfx.fillStyle(fc, 1);
                    gfx.fillCircle(fx+Math.cos(a)*r*0.12, fy+Math.sin(a)*r*0.12, r*0.09);
                }
                // Center
                gfx.fillStyle(0xffee44, 1); gfx.fillCircle(fx, fy, r*0.07);
            });
        }
    },

    // ── LEVEL 5 : La Famille ─────────────────────────────────────────────────
    PAPA: {
        fr: { answer: 'PAPA', letters: ['P','A','P','A','M','E'] },
        en: { answer: 'PAPA', letters: ['P','A','P','A','M','E'] },
        es: { answer: 'PAPA', letters: ['P','A','P','A','M','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff8f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x334466, 1);
            gfx.fillRoundedRect(cx-r*0.22, cy+r*0.42, r*0.16, r*0.38, r*0.05);
            gfx.fillRoundedRect(cx+r*0.06, cy+r*0.42, r*0.16, r*0.38, r*0.05);
            gfx.fillStyle(0x222233, 1);
            gfx.fillRoundedRect(cx-r*0.22, cy+r*0.7, r*0.18, r*0.1, r*0.04);
            gfx.fillRoundedRect(cx+r*0.04, cy+r*0.7, r*0.18, r*0.1, r*0.04);
            gfx.fillStyle(0x4466aa, 1);
            gfx.fillRoundedRect(cx-r*0.3, cy-r*0.18, r*0.6, r*0.62, r*0.1);
            gfx.fillRoundedRect(cx-r*0.54, cy-r*0.16, r*0.26, r*0.16, r*0.08);
            gfx.fillRoundedRect(cx+r*0.28, cy-r*0.16, r*0.26, r*0.16, r*0.08);
            gfx.fillStyle(0xfafafa, 1);
            gfx.fillRect(cx-r*0.06, cy-r*0.18, r*0.12, r*0.54);
            gfx.fillStyle(0xcc2222, 1);
            tri(gfx, cx-r*0.06, cy-r*0.17, cx+r*0.06, cy-r*0.17, cx, cy+r*0.18);
            gfx.fillStyle(0x222244, 1);
            gfx.fillCircle(cx-r*0.44, cy-r*0.08, r*0.08);
            gfx.fillCircle(cx+r*0.44, cy-r*0.08, r*0.08);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.44, cy-r*0.08, r*0.07);
            gfx.fillCircle(cx+r*0.44, cy-r*0.08, r*0.07);
            gfx.fillRect(cx-r*0.1, cy-r*0.1, r*0.2, r*0.1);
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy-r*0.34, r*0.275);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy-r*0.34, r*0.26);
            gfx.fillStyle(0x3a2010, 1);
            gfx.fillRoundedRect(cx-r*0.22, cy-r*0.62, r*0.44, r*0.14, r*0.06);
            gfx.fillStyle(0x4a2a18, 1);
            gfx.fillEllipse(cx-r*0.09, cy-r*0.26, r*0.12, r*0.06);
            gfx.fillEllipse(cx+r*0.09, cy-r*0.26, r*0.12, r*0.06);
            gfx.fillStyle(0xcc9977, 1); gfx.fillCircle(cx, cy-r*0.32, r*0.06);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx-r*0.12, cy-r*0.42, r*0.14, r*0.12);
            gfx.fillEllipse(cx+r*0.12, cy-r*0.42, r*0.14, r*0.12);
            gfx.fillStyle(0x3355aa, 1);
            gfx.fillCircle(cx-r*0.12, cy-r*0.41, r*0.065);
            gfx.fillCircle(cx+r*0.12, cy-r*0.41, r*0.065);
            gfx.fillStyle(0x111122, 1);
            gfx.fillCircle(cx-r*0.12, cy-r*0.41, r*0.038);
            gfx.fillCircle(cx+r*0.12, cy-r*0.41, r*0.038);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.108, cy-r*0.422, r*0.016);
            gfx.fillCircle(cx+r*0.132, cy-r*0.422, r*0.016);
            gfx.fillStyle(0xff9988, 0.25);
            gfx.fillEllipse(cx-r*0.22, cy-r*0.34, r*0.14, r*0.08);
            gfx.fillEllipse(cx+r*0.22, cy-r*0.34, r*0.14, r*0.08);
            gfx.lineStyle(2, 0xcc8844, 1);
            gfx.beginPath(); gfx.arc(cx, cy-r*0.26, r*0.08, 0.25, Math.PI-0.25, false); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Dad face with mustache and glasses, smiling
            gfx.fillStyle(0xfff8f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Hair (dark, short)
            gfx.fillStyle(0x3a2010, 1);
            gfx.fillRoundedRect(cx-r*0.38, cy-r*0.82, r*0.76, r*0.22, r*0.08);
            gfx.fillEllipse(cx, cy-r*0.74, r*0.76, r*0.2);
            // Face
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy, r*0.68);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy, r*0.65);
            // Ears
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.64, cy+r*0.04, r*0.14);
            gfx.fillCircle(cx+r*0.64, cy+r*0.04, r*0.14);
            // Glasses frames
            gfx.lineStyle(3, 0x444444, 1);
            gfx.strokeCircle(cx-r*0.2, cy-r*0.1, r*0.17);
            gfx.strokeCircle(cx+r*0.2, cy-r*0.1, r*0.17);
            gfx.lineBetween(cx-r*0.03, cy-r*0.1, cx+r*0.03, cy-r*0.1);
            gfx.lineBetween(cx-r*0.37, cy-r*0.1, cx-r*0.54, cy-r*0.06);
            gfx.lineBetween(cx+r*0.37, cy-r*0.1, cx+r*0.54, cy-r*0.06);
            // Eyes through glasses
            gfx.fillStyle(0x3355aa, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.1, r*0.08);
            gfx.fillCircle(cx+r*0.2, cy-r*0.1, r*0.08);
            gfx.fillStyle(0x111122, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.1, r*0.05);
            gfx.fillCircle(cx+r*0.2, cy-r*0.1, r*0.05);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.16, cy-r*0.13, r*0.02);
            gfx.fillCircle(cx+r*0.24, cy-r*0.13, r*0.02);
            // Nose
            gfx.fillStyle(0xcc9977, 1); gfx.fillCircle(cx, cy+r*0.06, r*0.07);
            // Mustache
            gfx.fillStyle(0x3a2010, 1);
            gfx.fillEllipse(cx-r*0.16, cy+r*0.22, r*0.22, r*0.12);
            gfx.fillEllipse(cx+r*0.16, cy+r*0.22, r*0.22, r*0.12);
            // Smile
            gfx.lineStyle(2.5, 0xcc8844, 1);
            gfx.beginPath(); gfx.arc(cx, cy+r*0.36, r*0.14, 0.25, Math.PI-0.25, false); gfx.strokePath();
            // Cheeks
            gfx.fillStyle(0xff9988, 0.22);
            gfx.fillCircle(cx-r*0.44, cy+r*0.12, r*0.12);
            gfx.fillCircle(cx+r*0.44, cy+r*0.12, r*0.12);
        }
    },
    MAMAN: {
        fr: { answer: 'MAMAN', letters: ['M','A','M','A','P','N'] },
        en: { answer: 'MOMMY', letters: ['M','A','M','O','M','Y'] },
        es: { answer: 'MAMA', letters: ['M','A','M','A','P','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff0f8, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x884488, 1);
            gfx.fillRoundedRect(cx-r*0.28, cy+r*0.42, r*0.56, r*0.38, r*0.08);
            tri(gfx, cx-r*0.28, cy+r*0.14, cx+r*0.28, cy+r*0.14, cx-r*0.5, cy+r*0.78);
            tri(gfx, cx-r*0.28, cy+r*0.14, cx+r*0.28, cy+r*0.14, cx+r*0.5, cy+r*0.78);
            gfx.fillStyle(0xee66aa, 1);
            gfx.fillRoundedRect(cx-r*0.28, cy-r*0.18, r*0.56, r*0.34, r*0.08);
            gfx.fillRoundedRect(cx-r*0.52, cy-r*0.16, r*0.24, r*0.16, r*0.08);
            gfx.fillRoundedRect(cx+r*0.28, cy-r*0.16, r*0.24, r*0.16, r*0.08);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.44, cy-r*0.08, r*0.07);
            gfx.fillCircle(cx+r*0.44, cy-r*0.08, r*0.07);
            gfx.fillRect(cx-r*0.1, cy-r*0.1, r*0.2, r*0.1);
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy-r*0.34, r*0.275);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy-r*0.34, r*0.26);
            gfx.fillStyle(0x7a3810, 1);
            gfx.fillEllipse(cx, cy-r*0.6, r*0.52, r*0.14);
            gfx.fillRect(cx-r*0.24, cy-r*0.62, r*0.48, r*0.1);
            gfx.fillEllipse(cx-r*0.22, cy-r*0.46, r*0.08, r*0.28);
            gfx.fillEllipse(cx+r*0.22, cy-r*0.46, r*0.08, r*0.28);
            gfx.fillStyle(0xff44aa, 1);
            gfx.fillCircle(cx+r*0.16, cy-r*0.74, r*0.06);
            gfx.fillStyle(0xcc9977, 1); gfx.fillEllipse(cx, cy-r*0.3, r*0.08, r*0.05);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx-r*0.12, cy-r*0.42, r*0.14, r*0.12);
            gfx.fillEllipse(cx+r*0.12, cy-r*0.42, r*0.14, r*0.12);
            gfx.fillStyle(0x664488, 1);
            gfx.fillCircle(cx-r*0.12, cy-r*0.41, r*0.065);
            gfx.fillCircle(cx+r*0.12, cy-r*0.41, r*0.065);
            gfx.fillStyle(0x111122, 1);
            gfx.fillCircle(cx-r*0.12, cy-r*0.41, r*0.038);
            gfx.fillCircle(cx+r*0.12, cy-r*0.41, r*0.038);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.108, cy-r*0.422, r*0.016);
            gfx.fillCircle(cx+r*0.132, cy-r*0.422, r*0.016);
            gfx.fillStyle(0xff9988, 0.3);
            gfx.fillEllipse(cx-r*0.22, cy-r*0.34, r*0.14, r*0.08);
            gfx.fillEllipse(cx+r*0.22, cy-r*0.34, r*0.14, r*0.08);
            gfx.lineStyle(2, 0xcc8844, 1);
            gfx.beginPath(); gfx.arc(cx, cy-r*0.26, r*0.08, 0.25, Math.PI-0.25, false); gfx.strokePath();
            gfx.fillStyle(0xffaacc, 1);
            gfx.fillCircle(cx-r*0.32, cy-r*0.38, r*0.04);
            gfx.fillCircle(cx+r*0.32, cy-r*0.38, r*0.04);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Mom face with long hair and earrings
            gfx.fillStyle(0xfff0f8, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Long hair (sides going down)
            gfx.fillStyle(0x7a3810, 1);
            gfx.fillEllipse(cx-r*0.52, cy+r*0.24, r*0.32, r*0.88);
            gfx.fillEllipse(cx+r*0.52, cy+r*0.24, r*0.32, r*0.88);
            gfx.fillEllipse(cx, cy-r*0.68, r*0.82, r*0.28);
            gfx.fillRect(cx-r*0.38, cy-r*0.72, r*0.76, r*0.16);
            // Face
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy, r*0.58);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy, r*0.56);
            // Earrings
            gfx.fillStyle(0xff44aa, 1);
            gfx.fillCircle(cx-r*0.56, cy+r*0.08, r*0.07);
            gfx.fillCircle(cx+r*0.56, cy+r*0.08, r*0.07);
            gfx.fillStyle(0xffaadd, 0.7);
            gfx.fillCircle(cx-r*0.56, cy+r*0.16, r*0.05);
            gfx.fillCircle(cx+r*0.56, cy+r*0.16, r*0.05);
            // Eyes
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx-r*0.18, cy-r*0.1, r*0.2, r*0.16);
            gfx.fillEllipse(cx+r*0.18, cy-r*0.1, r*0.2, r*0.16);
            gfx.fillStyle(0x664488, 1);
            gfx.fillCircle(cx-r*0.18, cy-r*0.1, r*0.08);
            gfx.fillCircle(cx+r*0.18, cy-r*0.1, r*0.08);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.18, cy-r*0.1, r*0.05);
            gfx.fillCircle(cx+r*0.18, cy-r*0.1, r*0.05);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.14, cy-r*0.13, r*0.022);
            gfx.fillCircle(cx+r*0.22, cy-r*0.13, r*0.022);
            // Lashes
            gfx.lineStyle(1.5, 0x331111, 0.9);
            [[-0.25,-0.18],[-0.18,-0.2],[-0.11,-0.19]].forEach(([dx,dy]) => {
                gfx.beginPath(); gfx.moveTo(cx+dx*r,cy+dy*r+r*0.02); gfx.lineTo(cx+dx*r,cy+dy*r-r*0.03); gfx.strokePath();
            });
            [[ 0.11,-0.19],[0.18,-0.2],[0.25,-0.18]].forEach(([dx,dy]) => {
                gfx.beginPath(); gfx.moveTo(cx+dx*r,cy+dy*r+r*0.02); gfx.lineTo(cx+dx*r,cy+dy*r-r*0.03); gfx.strokePath();
            });
            // Nose
            gfx.fillStyle(0xcc9977, 1); gfx.fillEllipse(cx, cy+r*0.06, r*0.08, r*0.05);
            // Lips
            gfx.fillStyle(0xff6699, 1);
            gfx.fillEllipse(cx, cy+r*0.24, r*0.26, r*0.1);
            // Cheeks
            gfx.fillStyle(0xff9988, 0.3);
            gfx.fillCircle(cx-r*0.36, cy+r*0.1, r*0.12);
            gfx.fillCircle(cx+r*0.36, cy+r*0.1, r*0.12);
        }
    },
    BEBE: {
        fr: { answer: 'BEBE', letters: ['B','E','B','E','A','L'] },
        en: { answer: 'BABY', letters: ['B','A','B','Y','E','L'] },
        es: { answer: 'BEBE', letters: ['B','E','B','E','A','L'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfffce8, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xaaccff, 1);
            gfx.fillEllipse(cx, cy+r*0.3, r*1.0, r*0.8);
            gfx.fillStyle(0xffffff, 0.6);
            gfx.fillEllipse(cx, cy+r*0.2, r*0.7, r*0.5);
            gfx.fillStyle(0xaaccff, 1);
            gfx.fillCircle(cx-r*0.5, cy+r*0.22, r*0.14);
            gfx.fillCircle(cx+r*0.5, cy+r*0.22, r*0.14);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.5, cy+r*0.22, r*0.12);
            gfx.fillCircle(cx+r*0.5, cy+r*0.22, r*0.12);
            gfx.fillStyle(0xdddddd, 1);
            gfx.fillCircle(cx-r*0.14, cy+r*0.46, r*0.04);
            gfx.fillCircle(cx+r*0.14, cy+r*0.46, r*0.04);
            gfx.fillCircle(cx, cy+r*0.56, r*0.04);
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy-r*0.26, r*0.375);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy-r*0.26, r*0.36);
            gfx.fillStyle(0xcc8844, 1);
            gfx.fillEllipse(cx-r*0.06, cy-r*0.62, r*0.12, r*0.1);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx-r*0.14, cy-r*0.32, r*0.18, r*0.16);
            gfx.fillEllipse(cx+r*0.14, cy-r*0.32, r*0.18, r*0.16);
            gfx.fillStyle(0x3377cc, 1);
            gfx.fillCircle(cx-r*0.14, cy-r*0.31, r*0.085);
            gfx.fillCircle(cx+r*0.14, cy-r*0.31, r*0.085);
            gfx.fillStyle(0x111122, 1);
            gfx.fillCircle(cx-r*0.14, cy-r*0.31, r*0.05);
            gfx.fillCircle(cx+r*0.14, cy-r*0.31, r*0.05);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.126, cy-r*0.322, r*0.022);
            gfx.fillCircle(cx+r*0.154, cy-r*0.322, r*0.022);
            gfx.fillStyle(0xcc9977, 1);
            gfx.fillCircle(cx, cy-r*0.22, r*0.055);
            gfx.fillStyle(0xff9988, 0.3);
            gfx.fillCircle(cx-r*0.24, cy-r*0.2, r*0.1);
            gfx.fillCircle(cx+r*0.24, cy-r*0.2, r*0.1);
            gfx.lineStyle(2, 0xcc8855, 1);
            gfx.beginPath(); gfx.arc(cx, cy-r*0.12, r*0.09, 0.3, Math.PI-0.3, false); gfx.strokePath();
            gfx.fillStyle(0xaaccff, 1);
            gfx.fillCircle(cx-r*0.3, cy+r*0.62, r*0.12);
            gfx.fillCircle(cx+r*0.3, cy+r*0.62, r*0.12);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Baby in a cradle with moon mobile above
            gfx.fillStyle(0xfffce8, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Mobile arm
            gfx.lineStyle(2, 0xaa8866, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.78); gfx.lineTo(cx, cy-r*0.56); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.26, cy-r*0.78); gfx.lineTo(cx+r*0.26, cy-r*0.78); gfx.strokePath();
            // Moon
            gfx.fillStyle(0xfff0a0, 1); gfx.fillCircle(cx-r*0.26, cy-r*0.88, r*0.12);
            gfx.fillStyle(0xfffce8, 1); gfx.fillCircle(cx-r*0.22, cy-r*0.92, r*0.09);
            // Star
            gfx.fillStyle(0xffee44, 1); gfx.fillCircle(cx+r*0.26, cy-r*0.86, r*0.07);
            gfx.lineStyle(2, 0xffdd00, 1);
            for(let i=0;i<5;i++){
                const a = i*Math.PI*2/5 - Math.PI*0.5;
                gfx.beginPath(); gfx.moveTo(cx+r*0.26, cy-r*0.86);
                gfx.lineTo(cx+r*0.26+Math.cos(a)*r*0.1, cy-r*0.86+Math.sin(a)*r*0.1); gfx.strokePath();
            }
            // Cradle body
            gfx.fillStyle(0xcc9966, 1);
            gfx.fillEllipse(cx, cy+r*0.32, r*0.9, r*0.58);
            gfx.fillStyle(0xddaa77, 1);
            gfx.fillEllipse(cx, cy+r*0.22, r*0.82, r*0.48);
            // Baby blanket
            gfx.fillStyle(0xaaccff, 1);
            gfx.fillEllipse(cx, cy+r*0.28, r*0.7, r*0.36);
            // Baby head
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy-r*0.06, r*0.22);
            // Baby eyes (closed, sleeping)
            gfx.lineStyle(2, 0xcc8844, 1);
            gfx.beginPath(); gfx.arc(cx-r*0.09, cy-r*0.08, r*0.06, Math.PI+0.3, -0.3, false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx+r*0.09, cy-r*0.08, r*0.06, Math.PI+0.3, -0.3, false); gfx.strokePath();
            // Cradle rockers
            gfx.fillStyle(0xcc9966, 1);
            gfx.fillEllipse(cx, cy+r*0.68, r*0.72, r*0.1);
        }
    },
    TATA: {
        fr: { answer: 'TATA', letters: ['T','A','T','A','M','E'] },
        en: { answer: 'AUNT', letters: ['A','U','N','T','I','E'] },
        es: { answer: 'TATA', letters: ['T','A','T','A','M','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff0ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x44aaaa, 1);
            tri(gfx, cx-r*0.3, cy+r*0.14, cx+r*0.3, cy+r*0.14, cx-r*0.54, cy+r*0.8);
            tri(gfx, cx-r*0.3, cy+r*0.14, cx+r*0.3, cy+r*0.14, cx+r*0.54, cy+r*0.8);
            gfx.fillStyle(0x6644aa, 1);
            gfx.fillRoundedRect(cx-r*0.3, cy-r*0.18, r*0.6, r*0.34, r*0.08);
            gfx.fillRoundedRect(cx-r*0.54, cy-r*0.16, r*0.26, r*0.16, r*0.08);
            gfx.fillRoundedRect(cx+r*0.28, cy-r*0.16, r*0.26, r*0.16, r*0.08);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.44, cy-r*0.08, r*0.07);
            gfx.fillCircle(cx+r*0.44, cy-r*0.08, r*0.07);
            gfx.fillRect(cx-r*0.1, cy-r*0.1, r*0.2, r*0.1);
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy-r*0.34, r*0.275);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy-r*0.34, r*0.26);
            gfx.fillStyle(0x331111, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.6, r*0.1);
            gfx.fillCircle(cx-r*0.06, cy-r*0.64, r*0.12);
            gfx.fillCircle(cx+r*0.1, cy-r*0.62, r*0.11);
            gfx.fillCircle(cx+r*0.22, cy-r*0.56, r*0.09);
            gfx.fillEllipse(cx-r*0.02, cy-r*0.58, r*0.46, r*0.12);
            gfx.fillStyle(0xffaaee, 1);
            gfx.fillCircle(cx-r*0.36, cy-r*0.42, r*0.06);
            gfx.fillCircle(cx+r*0.36, cy-r*0.42, r*0.06);
            gfx.fillStyle(0xcc88cc, 1);
            gfx.fillCircle(cx-r*0.36, cy-r*0.42, r*0.04);
            gfx.fillCircle(cx+r*0.36, cy-r*0.42, r*0.04);
            gfx.fillStyle(0xcc9977, 1); gfx.fillEllipse(cx, cy-r*0.3, r*0.08, r*0.05);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx-r*0.12, cy-r*0.42, r*0.14, r*0.12);
            gfx.fillEllipse(cx+r*0.12, cy-r*0.42, r*0.14, r*0.12);
            gfx.fillStyle(0x664488, 1);
            gfx.fillCircle(cx-r*0.12, cy-r*0.41, r*0.065);
            gfx.fillCircle(cx+r*0.12, cy-r*0.41, r*0.065);
            gfx.fillStyle(0x111122, 1);
            gfx.fillCircle(cx-r*0.12, cy-r*0.41, r*0.038);
            gfx.fillCircle(cx+r*0.12, cy-r*0.41, r*0.038);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.108, cy-r*0.422, r*0.016);
            gfx.fillCircle(cx+r*0.132, cy-r*0.422, r*0.016);
            gfx.fillStyle(0xff9988, 0.28);
            gfx.fillEllipse(cx-r*0.22, cy-r*0.34, r*0.14, r*0.08);
            gfx.fillEllipse(cx+r*0.22, cy-r*0.34, r*0.14, r*0.08);
            gfx.lineStyle(2, 0xcc8844, 1);
            gfx.beginPath(); gfx.arc(cx, cy-r*0.26, r*0.08, 0.25, Math.PI-0.25, false); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Aunt face with curly hair and necklace
            gfx.fillStyle(0xfff0ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Curly hair (many circles)
            gfx.fillStyle(0x331111, 1);
            const curlPositions = [[-0.44,-0.56],[-0.28,-0.7],[-0.1,-0.76],[0.1,-0.76],[0.28,-0.7],[0.44,-0.56],
                                   [-0.56,-0.36],[-0.58,-0.14],[0.56,-0.36],[0.58,-0.14]];
            curlPositions.forEach(([dx,dy]) => gfx.fillCircle(cx+dx*r, cy+dy*r, r*0.16));
            // Face
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy, r*0.58);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy, r*0.56);
            // Necklace
            gfx.lineStyle(2, 0xcc88cc, 1);
            gfx.beginPath(); gfx.arc(cx, cy+r*0.5, r*0.36, -Math.PI*0.7, -Math.PI*0.3, false); gfx.strokePath();
            gfx.fillStyle(0xcc88cc, 1); gfx.fillCircle(cx, cy+r*0.62, r*0.05);
            // Earrings
            gfx.fillStyle(0xffaaee, 1);
            gfx.fillCircle(cx-r*0.56, cy+r*0.04, r*0.06);
            gfx.fillCircle(cx+r*0.56, cy+r*0.04, r*0.06);
            // Eyes
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx-r*0.18, cy-r*0.08, r*0.18, r*0.15);
            gfx.fillEllipse(cx+r*0.18, cy-r*0.08, r*0.18, r*0.15);
            gfx.fillStyle(0x664488, 1);
            gfx.fillCircle(cx-r*0.18, cy-r*0.08, r*0.075);
            gfx.fillCircle(cx+r*0.18, cy-r*0.08, r*0.075);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.18, cy-r*0.08, r*0.046);
            gfx.fillCircle(cx+r*0.18, cy-r*0.08, r*0.046);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.14, cy-r*0.11, r*0.02);
            gfx.fillCircle(cx+r*0.22, cy-r*0.11, r*0.02);
            // Nose
            gfx.fillStyle(0xcc9977, 1); gfx.fillEllipse(cx, cy+r*0.06, r*0.08, r*0.05);
            // Smile
            gfx.lineStyle(2, 0xcc8844, 1);
            gfx.beginPath(); gfx.arc(cx, cy+r*0.2, r*0.1, 0.25, Math.PI-0.25, false); gfx.strokePath();
            // Cheeks
            gfx.fillStyle(0xff9988, 0.28);
            gfx.fillCircle(cx-r*0.36, cy+r*0.06, r*0.12);
            gfx.fillCircle(cx+r*0.36, cy+r*0.06, r*0.12);
        }
    },
    PAPI: {
        fr: { answer: 'PAPI', letters: ['P','A','P','I','M','E'] },
        en: { answer: 'PAPI', letters: ['P','A','P','I','M','E'] },
        es: { answer: 'PAPI', letters: ['P','A','P','I','M','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xf0fff0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x334433, 1);
            gfx.fillRoundedRect(cx-r*0.22, cy+r*0.44, r*0.16, r*0.36, r*0.05);
            gfx.fillRoundedRect(cx+r*0.06, cy+r*0.44, r*0.16, r*0.36, r*0.05);
            gfx.fillStyle(0x558844, 1);
            gfx.fillRoundedRect(cx-r*0.3, cy-r*0.18, r*0.6, r*0.64, r*0.1);
            gfx.fillRoundedRect(cx-r*0.54, cy-r*0.16, r*0.26, r*0.16, r*0.08);
            gfx.fillRoundedRect(cx+r*0.28, cy-r*0.16, r*0.26, r*0.16, r*0.08);
            gfx.fillStyle(0xfafafa, 1);
            gfx.fillRect(cx-r*0.06, cy-r*0.18, r*0.12, r*0.54);
            gfx.fillStyle(0x334433, 1);
            gfx.fillCircle(cx-r*0.44, cy-r*0.08, r*0.07);
            gfx.fillCircle(cx+r*0.44, cy-r*0.08, r*0.07);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.44, cy-r*0.08, r*0.065);
            gfx.fillCircle(cx+r*0.44, cy-r*0.08, r*0.065);
            gfx.fillRect(cx-r*0.1, cy-r*0.1, r*0.2, r*0.1);
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy-r*0.34, r*0.275);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy-r*0.34, r*0.26);
            gfx.lineStyle(1.5, 0xd0b090, 0.5);
            gfx.beginPath(); gfx.moveTo(cx-r*0.12, cy-r*0.32); gfx.lineTo(cx-r*0.22, cy-r*0.28); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.12, cy-r*0.32); gfx.lineTo(cx+r*0.22, cy-r*0.28); gfx.strokePath();
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx-r*0.1, cy-r*0.62, r*0.14, r*0.08);
            gfx.fillEllipse(cx+r*0.1, cy-r*0.62, r*0.14, r*0.08);
            gfx.fillEllipse(cx, cy-r*0.58, r*0.36, r*0.14);
            gfx.fillStyle(0xe8e0d8, 1);
            gfx.fillEllipse(cx-r*0.08, cy-r*0.28, r*0.14, r*0.07);
            gfx.fillEllipse(cx+r*0.08, cy-r*0.28, r*0.14, r*0.07);
            gfx.fillStyle(0xcc9977, 1); gfx.fillEllipse(cx, cy-r*0.32, r*0.08, r*0.05);
            gfx.lineStyle(2, 0x444444, 1);
            gfx.strokeCircle(cx-r*0.12, cy-r*0.42, r*0.08);
            gfx.strokeCircle(cx+r*0.12, cy-r*0.42, r*0.08);
            gfx.beginPath(); gfx.moveTo(cx-r*0.04, cy-r*0.42); gfx.lineTo(cx+r*0.04, cy-r*0.42); gfx.strokePath();
            gfx.fillStyle(0x555555, 0.5);
            gfx.fillCircle(cx-r*0.12, cy-r*0.42, r*0.04);
            gfx.fillCircle(cx+r*0.12, cy-r*0.42, r*0.04);
            gfx.fillStyle(0xff9988, 0.22);
            gfx.fillEllipse(cx-r*0.22, cy-r*0.34, r*0.14, r*0.08);
            gfx.fillEllipse(cx+r*0.22, cy-r*0.34, r*0.14, r*0.08);
            gfx.lineStyle(2, 0xcc9977, 1);
            gfx.beginPath(); gfx.arc(cx, cy-r*0.26, r*0.08, 0.25, Math.PI-0.25, false); gfx.strokePath();
            gfx.lineStyle(4, 0x8b4513, 1);
            gfx.beginPath(); gfx.moveTo(cx+r*0.46, cy-r*0.08); gfx.lineTo(cx+r*0.5, cy+r*0.72); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx+r*0.44, cy-r*0.1, r*0.08, -Math.PI*0.5, Math.PI*0.5, false); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Grandpa face with big white beard and glasses
            gfx.fillStyle(0xf0fff0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // White hair (top)
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx, cy-r*0.7, r*0.72, r*0.22);
            gfx.fillRect(cx-r*0.36, cy-r*0.74, r*0.72, r*0.12);
            // Face
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy, r*0.58);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy, r*0.56);
            // Big white beard
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx, cy+r*0.46, r*0.72, r*0.54);
            gfx.fillEllipse(cx-r*0.28, cy+r*0.34, r*0.28, r*0.42);
            gfx.fillEllipse(cx+r*0.28, cy+r*0.34, r*0.28, r*0.42);
            gfx.fillStyle(0xeeeeee, 0.5);
            gfx.fillEllipse(cx, cy+r*0.3, r*0.54, r*0.26);
            // Mustache
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx-r*0.14, cy+r*0.14, r*0.22, r*0.12);
            gfx.fillEllipse(cx+r*0.14, cy+r*0.14, r*0.22, r*0.12);
            // Glasses
            gfx.lineStyle(2.5, 0x444444, 1);
            gfx.strokeCircle(cx-r*0.2, cy-r*0.1, r*0.14);
            gfx.strokeCircle(cx+r*0.2, cy-r*0.1, r*0.14);
            gfx.lineBetween(cx-r*0.06, cy-r*0.1, cx+r*0.06, cy-r*0.1);
            gfx.lineBetween(cx-r*0.34, cy-r*0.1, cx-r*0.5, cy-r*0.06);
            gfx.lineBetween(cx+r*0.34, cy-r*0.1, cx+r*0.5, cy-r*0.06);
            gfx.fillStyle(0x555555, 0.5);
            gfx.fillCircle(cx-r*0.2, cy-r*0.1, r*0.046);
            gfx.fillCircle(cx+r*0.2, cy-r*0.1, r*0.046);
            // Wrinkles (subtle lines)
            gfx.lineStyle(1, 0xd0b090, 0.5);
            gfx.beginPath(); gfx.moveTo(cx-r*0.38, cy-r*0.22); gfx.lineTo(cx-r*0.5, cy-r*0.18); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.38, cy-r*0.22); gfx.lineTo(cx+r*0.5, cy-r*0.18); gfx.strokePath();
            // Nose
            gfx.fillStyle(0xcc9977, 1); gfx.fillEllipse(cx, cy+r*0.04, r*0.09, r*0.07);
            // Cheeks
            gfx.fillStyle(0xff9988, 0.18);
            gfx.fillCircle(cx-r*0.38, cy+r*0.1, r*0.1);
            gfx.fillCircle(cx+r*0.38, cy+r*0.1, r*0.1);
        }
    },

    // ── LEVEL 6 : Les Couleurs ───────────────────────────────────────────────
    BLEU: {
        fr: { answer: 'BLEU', letters: ['B','L','E','U','R','O'] },
        en: { answer: 'BLUE', letters: ['B','L','U','E','R','O'] },
        es: { answer: 'AZUL', letters: ['A','Z','U','L','E','O'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x0055cc, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x0033aa, 1); gfx.fillRect(cx-r*0.95, cy+r*0.2, r*1.9, r*0.75);
            gfx.fillStyle(0x0066ee, 0.7);
            gfx.beginPath(); gfx.arc(cx-r*0.4, cy+r*0.2, r*0.28, Math.PI, 0, false); gfx.fillPath();
            gfx.beginPath(); gfx.arc(cx+r*0.3, cy+r*0.2, r*0.28, Math.PI, 0, false); gfx.fillPath();
            gfx.fillStyle(0x88ccff, 0.4);
            gfx.beginPath(); gfx.arc(cx-r*0.1, cy+r*0.42, r*0.22, Math.PI, 0, false); gfx.fillPath();
            gfx.beginPath(); gfx.arc(cx+r*0.52, cy+r*0.42, r*0.18, Math.PI, 0, false); gfx.fillPath();
            gfx.fillStyle(0x4499dd, 1);
            gfx.fillEllipse(cx-r*0.12, cy-r*0.2, r*0.38, r*0.2);
            gfx.fillStyle(0x55aaff, 1);
            gfx.fillEllipse(cx-r*0.14, cy-r*0.22, r*0.32, r*0.16);
            gfx.fillStyle(0x77ccff, 0.5); gfx.fillEllipse(cx-r*0.22, cy-r*0.28, r*0.1, r*0.06);
            tri(gfx, cx+r*0.12, cy-r*0.28, cx+r*0.12, cy-r*0.12, cx+r*0.36, cy-r*0.2);
            tri(gfx, cx-r*0.38, cy-r*0.2, cx-r*0.38, cy-r*0.36, cx-r*0.58, cy-r*0.28);
            gfx.fillStyle(0x111122, 1); gfx.fillCircle(cx+r*0.02, cy-r*0.22, r*0.045);
            gfx.fillStyle(0xffffff, 0.9); gfx.fillCircle(cx+r*0.032, cy-r*0.232, r*0.018);
            gfx.lineStyle(1.5, 0x334466, 0.7);
            gfx.beginPath(); gfx.moveTo(cx-r*0.14, cy-r*0.16); gfx.lineTo(cx-r*0.02, cy-r*0.16); gfx.strokePath();
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.6, cy-r*0.6, r*0.18);
            gfx.fillCircle(cx-r*0.44, cy-r*0.64, r*0.24);
            gfx.fillCircle(cx-r*0.24, cy-r*0.6, r*0.2);
            gfx.fillRect(cx-r*0.6, cy-r*0.6, r*0.38, r*0.18);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Blue paint palette with paint blobs
            gfx.fillStyle(0x0055cc, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Palette shape (oval with thumb hole)
            gfx.fillStyle(0xf5e8d0, 1);
            gfx.fillEllipse(cx+r*0.08, cy+r*0.08, r*1.3, r*1.1);
            gfx.fillStyle(0x0055cc, 1);
            gfx.fillCircle(cx-r*0.34, cy-r*0.3, r*0.14);
            // Paint blobs in shades of blue
            const blues = [0x0022ff, 0x2244ee, 0x4488dd, 0x22aaff, 0x0066cc, 0x88ccff];
            const blobPos = [[-0.3,-0.42],[0.0,-0.54],[0.3,-0.42],[0.5,-0.14],[0.44,0.22],[-0.44,0.1]];
            blues.forEach((c,i) => {
                gfx.fillStyle(c, 1);
                gfx.fillCircle(cx+blobPos[i][0]*r, cy+blobPos[i][1]*r, r*0.13);
            });
            // Brush
            gfx.lineStyle(4, 0x8b5e3c, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.1, cy+r*0.3); gfx.lineTo(cx+r*0.42, cy-r*0.22); gfx.strokePath();
            gfx.fillStyle(0x4488dd, 1);
            gfx.fillEllipse(cx+r*0.44, cy-r*0.24, r*0.12, r*0.06);
        }
    },
    ROSE: {
        fr: { answer: 'ROSE', letters: ['R','O','S','E','I','A'] },
        en: { answer: 'PINK', letters: ['P','I','N','K','O','A'] },
        es: { answer: 'ROSA', letters: ['R','O','S','A','I','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff0f8, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.lineStyle(4, 0x338822, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy+r*0.92); gfx.lineTo(cx, cy+r*0.1); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx+r*0.22, cy+r*0.54, r*0.28, r*0.12);
            gfx.lineStyle(1.5, 0x226611, 0.7);
            gfx.beginPath(); gfx.moveTo(cx, cy+r*0.54); gfx.lineTo(cx+r*0.34, cy+r*0.54); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx-r*0.2, cy+r*0.32, r*0.22, r*0.1);
            gfx.lineStyle(1.5, 0x226611, 0.7);
            gfx.beginPath(); gfx.moveTo(cx, cy+r*0.32); gfx.lineTo(cx-r*0.3, cy+r*0.32); gfx.strokePath();
            const outerPetals = [0xff6699, 0xff7788, 0xff88aa, 0xff6699, 0xff7788];
            outerPetals.forEach((c, i) => {
                const a = (i / 5) * Math.PI * 2;
                gfx.fillStyle(c, 1);
                gfx.fillEllipse(cx+Math.cos(a)*r*0.36, cy-r*0.2+Math.sin(a)*r*0.36, r*0.32, r*0.46);
            });
            const innerPetals = [0xffaacc, 0xffbbdd, 0xffaacc, 0xffbbdd, 0xffaacc];
            innerPetals.forEach((c, i) => {
                const a = (i / 5) * Math.PI * 2 + 0.3;
                gfx.fillStyle(c, 1);
                gfx.fillEllipse(cx+Math.cos(a)*r*0.2, cy-r*0.2+Math.sin(a)*r*0.2, r*0.22, r*0.32);
            });
            gfx.fillStyle(0xffee66, 1); gfx.fillCircle(cx, cy-r*0.2, r*0.14);
            gfx.fillStyle(0xffdd44, 1); gfx.fillCircle(cx, cy-r*0.2, r*0.1);
            gfx.fillStyle(0x4488ff, 0.8); gfx.fillCircle(cx+r*0.28, cy-r*0.42, r*0.04);
        },
        drawPicture2(gfx, cx, cy, r) {
            // A rose flower (the flower, not just the color)
            gfx.fillStyle(0xfff0f8, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Stem
            gfx.lineStyle(4, 0x338822, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy+r*0.92); gfx.lineTo(cx, cy+r*0.2); gfx.strokePath();
            // Leaves
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx+r*0.22, cy+r*0.56, r*0.3, r*0.12);
            gfx.fillEllipse(cx-r*0.2, cy+r*0.38, r*0.26, r*0.1);
            // Outer petals
            gfx.fillStyle(0xcc2255, 1);
            for(let i=0;i<5;i++){
                const a = i*Math.PI*2/5 - Math.PI*0.5;
                gfx.fillCircle(cx+Math.cos(a)*r*0.38, cy-r*0.1+Math.sin(a)*r*0.38, r*0.22);
            }
            // Middle layers
            gfx.fillStyle(0xee4477, 1); gfx.fillCircle(cx, cy-r*0.1, r*0.3);
            gfx.fillStyle(0xff6699, 1); gfx.fillCircle(cx, cy-r*0.14, r*0.22);
            gfx.fillStyle(0xffaabb, 1); gfx.fillCircle(cx-r*0.04, cy-r*0.18, r*0.14);
            gfx.fillStyle(0xffccdd, 1); gfx.fillCircle(cx, cy-r*0.22, r*0.07);
            // Dewdrop
            gfx.fillStyle(0x88ccff, 0.7); gfx.fillCircle(cx+r*0.24, cy-r*0.32, r*0.05);
        }
    },
    NOIR: {
        fr: { answer: 'NOIR',  letters: ['N','O','I','R','E','A'] },
        en: { answer: 'BLACK', letters: ['B','L','A','C','K','O'] },
        es: { answer: 'NEGRO', letters: ['N','E','G','R','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x080818, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x111133, 1); gfx.fillRect(cx-r*0.95, cy+r*0.12, r*1.9, r*0.84);
            gfx.fillStyle(0x221144, 1);
            gfx.fillRect(cx-r*0.68, cy+r*0.12, r*0.36, r*0.48);
            tri(gfx, cx-r*0.68, cy+r*0.12, cx-r*0.32, cy+r*0.12, cx-r*0.5, cy-r*0.14);
            gfx.fillStyle(0x2200aa, 0.5);
            gfx.fillRect(cx-r*0.58, cy+r*0.2, r*0.14, r*0.18);
            gfx.fillRect(cx-r*0.42, cy+r*0.2, r*0.14, r*0.18);
            gfx.fillStyle(0x221133, 1);
            gfx.fillRect(cx+r*0.1, cy+r*0.12, r*0.28, r*0.48);
            tri(gfx, cx+r*0.1, cy+r*0.12, cx+r*0.38, cy+r*0.12, cx+r*0.24, cy-r*0.08);
            gfx.fillStyle(0x221133, 1);
            tri(gfx, cx-r*0.14, cy+r*0.3, cx, cy+r*0.14, cx+r*0.14, cy+r*0.3);
            gfx.fillStyle(0xffdd44, 1);
            gfx.fillCircle(cx+r*0.04, cy-r*0.28, r*0.38);
            gfx.fillStyle(0x080818, 1);
            gfx.fillCircle(cx+r*0.26, cy-r*0.38, r*0.32);
            gfx.fillStyle(0xffee88, 1);
            gfx.fillCircle(cx+r*0.3, cy-r*0.56, r*0.04);
            gfx.fillCircle(cx-r*0.2, cy-r*0.66, r*0.025);
            gfx.fillStyle(0xffffff, 1);
            [[-r*0.38,-r*0.64],[r*0.56,-r*0.56],[-r*0.58,r*0.02],[r*0.44,r*0.06],[-r*0.12,r*0.56]].forEach(([dx,dy]) => {
                gfx.fillCircle(cx+dx, cy+dy, r*0.04);
            });
            gfx.lineStyle(1.5, 0xffffff, 0.8);
            [[-r*0.38,-r*0.64],[r*0.56,-r*0.56]].forEach(([dx,dy]) => {
                gfx.beginPath(); gfx.moveTo(cx+dx-r*0.065,cy+dy); gfx.lineTo(cx+dx+r*0.065,cy+dy); gfx.strokePath();
                gfx.beginPath(); gfx.moveTo(cx+dx,cy+dy-r*0.065); gfx.lineTo(cx+dx,cy+dy+r*0.065); gfx.strokePath();
            });
        },
        drawPicture2(gfx, cx, cy, r) {
            // Black cat silhouette on gray background
            gfx.fillStyle(0x666677, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Moon (background)
            gfx.fillStyle(0xffee88, 0.8); gfx.fillCircle(cx+r*0.4, cy-r*0.42, r*0.32);
            // Cat body (all black silhouette)
            gfx.fillStyle(0x111111, 1);
            gfx.fillEllipse(cx-r*0.1, cy+r*0.22, r*0.8, r*0.66);
            // Head
            gfx.fillCircle(cx-r*0.1, cy-r*0.28, r*0.38);
            // Ears (triangles)
            tri(gfx, cx-r*0.38, cy-r*0.5, cx-r*0.52, cy-r*0.82, cx-r*0.16, cy-r*0.58);
            tri(gfx, cx+r*0.18, cy-r*0.5, cx+r*0.32, cy-r*0.82, cx+r*0.06, cy-r*0.58);
            // Tail
            gfx.lineStyle(r*0.1, 0x111111, 1);
            gfx.beginPath(); gfx.arc(cx+r*0.44, cy+r*0.46, r*0.3, -Math.PI*0.8, Math.PI*0.15, false); gfx.strokePath();
            // Eyes (glowing in the dark — amber)
            gfx.fillStyle(0xffaa00, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.3, r*0.07);
            gfx.fillCircle(cx+r*0.02, cy-r*0.3, r*0.07);
            // Pupils
            gfx.fillStyle(0x111111, 1);
            gfx.fillEllipse(cx-r*0.22, cy-r*0.3, r*0.03, r*0.06);
            gfx.fillEllipse(cx+r*0.02, cy-r*0.3, r*0.03, r*0.06);
        }
    },
    VERT: {
        fr: { answer: 'VERT',  letters: ['V','E','R','T','O','A'] },
        en: { answer: 'GREEN', letters: ['G','R','E','E','N','A'] },
        es: { answer: 'VERDE', letters: ['V','E','R','D','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0x44bb44, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x228822, 1); gfx.fillRect(cx-r*0.95, cy+r*0.3, r*1.9, r*0.66);
            gfx.fillStyle(0x338833, 1);
            gfx.fillEllipse(cx+r*0.1, cy+r*0.42, r*0.6, r*0.22);
            gfx.fillStyle(0x55dd44, 1);
            gfx.fillEllipse(cx+r*0.1, cy+r*0.42, r*0.52, r*0.18);
            gfx.fillStyle(0x22aa22, 1);
            gfx.fillEllipse(cx+r*0.1, cy+r*0.18, r*0.82, r*0.68);
            gfx.fillStyle(0x44cc33, 1);
            gfx.fillEllipse(cx-r*0.04, cy+r*0.08, r*0.68, r*0.54);
            gfx.fillStyle(0x55dd44, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.18, r*0.28);
            gfx.fillCircle(cx+r*0.22, cy-r*0.18, r*0.28);
            gfx.fillStyle(0x44cc33, 1);
            gfx.fillEllipse(cx, cy-r*0.08, r*0.66, r*0.38);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.22, r*0.13);
            gfx.fillCircle(cx+r*0.22, cy-r*0.22, r*0.13);
            gfx.fillStyle(0x1a5c1a, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.22, r*0.09);
            gfx.fillCircle(cx+r*0.22, cy-r*0.22, r*0.09);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.22, r*0.055);
            gfx.fillCircle(cx+r*0.22, cy-r*0.22, r*0.055);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.208, cy-r*0.232, r*0.024);
            gfx.fillCircle(cx+r*0.232, cy-r*0.232, r*0.024);
            gfx.lineStyle(2.5, 0x1a5c1a, 1);
            gfx.beginPath(); gfx.arc(cx, cy+r*0.08, r*0.12, 0.2, Math.PI-0.2, false); gfx.strokePath();
            gfx.fillStyle(0x22aa22, 1);
            gfx.fillEllipse(cx-r*0.2, cy+r*0.06, r*0.08, r*0.05);
            gfx.fillEllipse(cx+r*0.2, cy+r*0.06, r*0.08, r*0.05);
            gfx.fillStyle(0xff4400, 1); gfx.fillCircle(cx+r*0.56, cy-r*0.38, r*0.06);
            gfx.lineStyle(1.5, 0x444400, 0.8);
            gfx.beginPath(); gfx.moveTo(cx+r*0.42, cy-r*0.36); gfx.lineTo(cx+r*0.5, cy-r*0.38); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Green leaf with water droplet
            gfx.fillStyle(0x88eebb, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Big leaf shape (ellipse)
            gfx.fillStyle(0x226611, 1);
            gfx.fillEllipse(cx, cy+r*0.08, r*1.1, r*0.72);
            gfx.fillStyle(0x338822, 1);
            gfx.fillEllipse(cx, cy+r*0.04, r*1.02, r*0.64);
            gfx.fillStyle(0x44aa33, 1);
            gfx.fillEllipse(cx-r*0.06, cy+r*0.0, r*0.94, r*0.58);
            // Tip of leaf (pointed)
            tri(gfx, cx-r*0.48, cy+r*0.0, cx+r*0.48, cy+r*0.0, cx, cy-r*0.62);
            gfx.fillStyle(0x44aa33, 1);
            tri(gfx, cx-r*0.38, cy+r*0.04, cx+r*0.38, cy+r*0.04, cx, cy-r*0.5);
            // Leaf veins
            gfx.lineStyle(2, 0x226611, 0.7);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.5); gfx.lineTo(cx, cy+r*0.36); gfx.strokePath();
            gfx.lineStyle(1.5, 0x226611, 0.5);
            [[-0.26,0.3],[-0.2,0.06],[0.2,0.06],[0.26,0.3]].forEach(([dx,dy]) => {
                gfx.beginPath(); gfx.moveTo(cx, cy+dy*r); gfx.lineTo(cx+dx*r, cy+(dy-0.12)*r); gfx.strokePath();
            });
            // Water droplet
            gfx.fillStyle(0x44aaff, 0.85);
            gfx.fillCircle(cx+r*0.34, cy-r*0.18, r*0.14);
            gfx.beginPath();
            gfx.moveTo(cx+r*0.24, cy-r*0.18);
            gfx.lineTo(cx+r*0.34, cy-r*0.44);
            gfx.lineTo(cx+r*0.44, cy-r*0.18);
            gfx.closePath(); gfx.fillPath();
            gfx.fillStyle(0xffffff, 0.6);
            gfx.fillCircle(cx+r*0.29, cy-r*0.28, r*0.04);
        }
    },
    GRIS: {
        fr: { answer: 'GRIS', letters: ['G','R','I','S','E','A'] },
        en: { answer: 'GREY', letters: ['G','R','E','Y','A','O'] },
        es: { answer: 'GRIS', letters: ['G','R','I','S','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xe0e8ee, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x667788, 1);
            gfx.fillEllipse(cx-r*0.38, cy+r*0.14, r*0.5, r*0.8);
            gfx.fillStyle(0x778899, 1);
            gfx.fillEllipse(cx-r*0.28, cy+r*0.14, r*0.46, r*0.76);
            gfx.fillStyle(0x8899aa, 1);
            gfx.fillEllipse(cx, cy+r*0.24, r*1.1, r*0.82);
            gfx.fillStyle(0x99aacc, 0.3);
            gfx.fillEllipse(cx-r*0.2, cy+r*0.1, r*0.6, r*0.4);
            for (const [lx, ly, lw, lh] of [[-0.32,0.68,0.22,0.36],[-0.1,0.7,0.22,0.36],[0.1,0.68,0.22,0.36],[0.32,0.7,0.22,0.36]]) {
                gfx.fillStyle(0x778899, 1);
                gfx.fillRoundedRect(cx+lx*r-r*0.11, cy+ly*r, r*lw, r*lh, r*0.08);
                gfx.fillStyle(0x667788, 1);
                gfx.fillRect(cx+lx*r-r*0.09, cy+(ly+lh-0.04)*r, r*0.18, r*0.06);
            }
            gfx.fillStyle(0x8899aa, 1);
            gfx.fillCircle(cx+r*0.46, cy-r*0.22, r*0.38);
            gfx.fillStyle(0x99aacc, 0.5);
            gfx.fillCircle(cx+r*0.46, cy-r*0.22, r*0.3);
            gfx.fillStyle(0xffcccc, 0.6);
            gfx.fillEllipse(cx+r*0.38, cy-r*0.2, r*0.22, r*0.32);
            gfx.fillStyle(0x556677, 1);
            gfx.fillEllipse(cx+r*0.5, cy-r*0.1, r*0.08, r*0.32);
            gfx.beginPath();
            gfx.arc(cx+r*0.5, cy+r*0.22, r*0.18, -Math.PI*0.5, Math.PI*0.5, false);
            gfx.arc(cx+r*0.5, cy+r*0.22, r*0.06, Math.PI*0.5, -Math.PI*0.5, true);
            gfx.closePath(); gfx.fillPath();
            gfx.fillStyle(0xffffff, 1); gfx.fillCircle(cx+r*0.52, cy-r*0.3, r*0.1);
            gfx.fillStyle(0x445566, 1); gfx.fillCircle(cx+r*0.52, cy-r*0.3, r*0.07);
            gfx.fillStyle(0x111122, 1); gfx.fillCircle(cx+r*0.52, cy-r*0.3, r*0.04);
            gfx.fillStyle(0xffffff, 0.9); gfx.fillCircle(cx+r*0.532, cy-r*0.312, r*0.018);
            gfx.fillStyle(0xddddcc, 1);
            gfx.fillEllipse(cx+r*0.58, cy-r*0.18, r*0.07, r*0.12);
            gfx.fillStyle(0xbbbbaa, 1);
            gfx.fillEllipse(cx+r*0.6, cy-r*0.17, r*0.05, r*0.09);
            gfx.fillStyle(0x6688aa, 0.6);
            gfx.beginPath(); gfx.moveTo(cx+r*0.62, cy-r*0.12); gfx.lineTo(cx+r*0.7, cy-r*0.18); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Gray rainy cloud with raindrops
            gfx.fillStyle(0xe0e8ee, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Cloud
            gfx.fillStyle(0x889aaa, 1);
            gfx.fillCircle(cx-r*0.32, cy-r*0.12, r*0.28);
            gfx.fillCircle(cx, cy-r*0.26, r*0.36);
            gfx.fillCircle(cx+r*0.32, cy-r*0.12, r*0.28);
            gfx.fillRect(cx-r*0.32, cy-r*0.12, r*0.64, r*0.28);
            gfx.fillStyle(0x99aabb, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.18, r*0.22);
            gfx.fillCircle(cx+r*0.1, cy-r*0.28, r*0.28);
            gfx.fillCircle(cx+r*0.32, cy-r*0.14, r*0.22);
            gfx.fillRect(cx-r*0.22, cy-r*0.14, r*0.56, r*0.22);
            // Raindrops (teardrops)
            gfx.fillStyle(0x5588bb, 0.85);
            const drops = [[-0.38,0.28],[-0.18,0.44],[0.02,0.28],[0.22,0.48],[0.42,0.3],[-0.1,0.64],[0.14,0.66]];
            drops.forEach(([dx,dy]) => {
                gfx.fillCircle(cx+dx*r, cy+dy*r, r*0.05);
                gfx.beginPath();
                gfx.moveTo(cx+dx*r-r*0.05, cy+dy*r);
                gfx.lineTo(cx+dx*r, cy+(dy-0.14)*r);
                gfx.lineTo(cx+dx*r+r*0.05, cy+dy*r);
                gfx.closePath(); gfx.fillPath();
            });
        }
    },

    // ── LEVEL 7 : Le Corps ────────────────────────────────────────────────────
    NEZ: {
        fr: { answer: 'NEZ',   letters: ['N','E','Z','B','O','A'] },
        en: { answer: 'NOSE',  letters: ['N','O','S','E','A','I'] },
        es: { answer: 'NARIZ', letters: ['N','A','R','I','Z','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff8f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy, r*0.72);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy, r*0.68);
            gfx.fillStyle(0xe8c088, 1);
            gfx.fillCircle(cx, cy+r*0.18, r*0.32);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx, cy+r*0.16, r*0.3);
            gfx.fillStyle(0xcc9977, 1);
            gfx.fillCircle(cx-r*0.16, cy+r*0.22, r*0.1);
            gfx.fillCircle(cx+r*0.16, cy+r*0.22, r*0.1);
            gfx.fillStyle(0xaa7755, 1);
            gfx.fillCircle(cx-r*0.14, cy+r*0.24, r*0.065);
            gfx.fillCircle(cx+r*0.14, cy+r*0.24, r*0.065);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.3, cy-r*0.18, r*0.12);
            gfx.fillCircle(cx+r*0.3, cy-r*0.18, r*0.12);
            gfx.fillStyle(0x3355aa, 1);
            gfx.fillCircle(cx-r*0.3, cy-r*0.17, r*0.085);
            gfx.fillCircle(cx+r*0.3, cy-r*0.17, r*0.085);
            gfx.fillStyle(0x111122, 1);
            gfx.fillCircle(cx-r*0.3, cy-r*0.17, r*0.05);
            gfx.fillCircle(cx+r*0.3, cy-r*0.17, r*0.05);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.288, cy-r*0.182, r*0.022);
            gfx.fillCircle(cx+r*0.312, cy-r*0.182, r*0.022);
            gfx.lineStyle(2, 0xcc9966, 0.7);
            gfx.beginPath(); gfx.moveTo(cx-r*0.24, cy-r*0.1); gfx.lineTo(cx-r*0.22, cy-r*0.04); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.24, cy-r*0.1); gfx.lineTo(cx+r*0.22, cy-r*0.04); gfx.strokePath();
            gfx.fillStyle(0xff9988, 0.28);
            gfx.fillEllipse(cx-r*0.44, cy+r*0.08, r*0.2, r*0.12);
            gfx.fillEllipse(cx+r*0.44, cy+r*0.08, r*0.2, r*0.12);
            gfx.lineStyle(2.5, 0xcc8844, 1);
            gfx.beginPath(); gfx.arc(cx, cy+r*0.44, r*0.14, 0.25, Math.PI-0.25, false); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Clown nose — big red ball in center
            gfx.fillStyle(0xfff8f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Face skin background
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy, r*0.78);
            // Big red clown nose
            gfx.fillStyle(0xdd1111, 1); gfx.fillCircle(cx, cy, r*0.34);
            gfx.fillStyle(0xee3333, 1); gfx.fillCircle(cx-r*0.05, cy-r*0.06, r*0.3);
            gfx.fillStyle(0xff5555, 0.5); gfx.fillCircle(cx-r*0.08, cy-r*0.1, r*0.16);
            gfx.fillStyle(0xffffff, 0.6); gfx.fillCircle(cx-r*0.1, cy-r*0.14, r*0.07);
            // Nostrils subtle
            gfx.fillStyle(0xaa1111, 0.5);
            gfx.fillCircle(cx-r*0.1, cy+r*0.08, r*0.055);
            gfx.fillCircle(cx+r*0.1, cy+r*0.08, r*0.055);
            // Stars/sparkles around
            gfx.fillStyle(0xffee00, 1);
            [[0.58,-0.38],[0.62,0.14],[-0.58,-0.38],[-0.62,0.14],[0.0,-0.68]].forEach(([dx,dy]) => {
                gfx.fillCircle(cx+dx*r, cy+dy*r, r*0.06);
                gfx.lineStyle(1.5, 0xffee00, 1);
                for(let i=0;i<4;i++){
                    const a = i*Math.PI*0.5;
                    gfx.beginPath();
                    gfx.moveTo(cx+dx*r+Math.cos(a)*r*0.08, cy+dy*r+Math.sin(a)*r*0.08);
                    gfx.lineTo(cx+dx*r+Math.cos(a)*r*0.13, cy+dy*r+Math.sin(a)*r*0.13);
                    gfx.strokePath();
                }
            });
        }
    },
    BRAS: {
        fr: { answer: 'BRAS',  letters: ['B','R','A','S','E','O'] },
        en: { answer: 'ARM',   letters: ['A','R','M','E','O','I'] },
        es: { answer: 'BRAZO', letters: ['B','R','A','Z','O','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xeef4ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x4466aa, 1);
            gfx.fillRoundedRect(cx-r*0.52, cy-r*0.72, r*0.58, r*0.48, r*0.12);
            gfx.fillStyle(0x3355aa, 1);
            gfx.fillEllipse(cx-r*0.24, cy-r*0.72, r*0.58, r*0.18);
            gfx.fillStyle(0xe8b070, 1);
            gfx.fillRoundedRect(cx-r*0.28, cy-r*0.26, r*0.52, r*0.96, r*0.2);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillRoundedRect(cx-r*0.26, cy-r*0.24, r*0.48, r*0.9, r*0.2);
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx-r*0.02, cy-r*0.26, r*0.24);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx-r*0.02, cy-r*0.26, r*0.22);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillRoundedRect(cx-r*0.38, cy+r*0.54, r*0.22, r*0.28, r*0.08);
            gfx.fillRoundedRect(cx-r*0.14, cy+r*0.56, r*0.18, r*0.26, r*0.07);
            gfx.fillRoundedRect(cx+r*0.06, cy+r*0.58, r*0.16, r*0.22, r*0.06);
            gfx.fillStyle(0xcc9977, 0.5);
            gfx.fillEllipse(cx-r*0.28, cy+r*0.68, r*0.2, r*0.08);
            gfx.lineStyle(1.5, 0xcc9977, 0.4);
            gfx.beginPath(); gfx.moveTo(cx-r*0.26, cy+r*0.56); gfx.lineTo(cx-r*0.06, cy+r*0.56); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.26, cy+r*0.64); gfx.lineTo(cx-r*0.06, cy+r*0.64); gfx.strokePath();
            gfx.lineStyle(2, 0xcc9977, 0.35);
            for (const ex of [-0.26, -0.06, 0.14]) {
                gfx.beginPath(); gfx.arc(cx+ex*r, cy-r*0.26, r*0.06, Math.PI, 0, false); gfx.strokePath();
            }
        },
        drawPicture2(gfx, cx, cy, r) {
            // Flexing muscle arm (bicep)
            gfx.fillStyle(0xeef4ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Sleeve top
            gfx.fillStyle(0x4466aa, 1);
            gfx.fillRoundedRect(cx-r*0.46, cy-r*0.74, r*0.58, r*0.46, r*0.12);
            // Upper arm (flexed — wider at top)
            gfx.fillStyle(0xe8b070, 1);
            gfx.fillEllipse(cx-r*0.18, cy-r*0.28, r*0.64, r*0.54);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillEllipse(cx-r*0.18, cy-r*0.28, r*0.6, r*0.5);
            // Bicep bulge (the muscle ball)
            gfx.fillStyle(0xe8b070, 1);
            gfx.fillCircle(cx-r*0.08, cy-r*0.38, r*0.32);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.08, cy-r*0.38, r*0.3);
            // Forearm going down
            gfx.fillStyle(0xe8b070, 1);
            gfx.fillRoundedRect(cx-r*0.38, cy-r*0.14, r*0.48, r*0.72, r*0.2);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillRoundedRect(cx-r*0.36, cy-r*0.12, r*0.44, r*0.68, r*0.2);
            // Fist
            gfx.fillStyle(0xe8b070, 1); gfx.fillEllipse(cx-r*0.14, cy+r*0.6, r*0.46, r*0.3);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillEllipse(cx-r*0.14, cy+r*0.58, r*0.42, r*0.26);
            // Knuckle lines
            gfx.lineStyle(1.5, 0xcc9977, 0.4);
            for(let i=0;i<3;i++) {
                gfx.beginPath(); gfx.arc(cx-r*0.28+i*r*0.14, cy+r*0.56, r*0.07, Math.PI, 0, false); gfx.strokePath();
            }
            // Strength lines
            gfx.lineStyle(2, 0xffdd44, 0.7);
            [[0.28,-0.52],[0.36,-0.36],[0.3,-0.2]].forEach(([dx,dy]) => {
                gfx.beginPath(); gfx.moveTo(cx+dx*r-r*0.04, cy+dy*r); gfx.lineTo(cx+dx*r+r*0.08, cy+dy*r-r*0.06); gfx.strokePath();
            });
        }
    },
    MAIN: {
        fr: { answer: 'MAIN', letters: ['M','A','I','N','O','E'] },
        en: { answer: 'HAND', letters: ['H','A','N','D','O','E'] },
        es: { answer: 'MANO', letters: ['M','A','N','O','I','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff8f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xe8b070, 1);
            gfx.fillRoundedRect(cx-r*0.36, cy-r*0.14, r*0.72, r*0.68, r*0.14);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillRoundedRect(cx-r*0.34, cy-r*0.12, r*0.68, r*0.64, r*0.12);
            gfx.fillStyle(0xe8b070, 1);
            gfx.fillRoundedRect(cx-r*0.56, cy-r*0.28, r*0.24, r*0.4, r*0.1);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillRoundedRect(cx-r*0.54, cy-r*0.26, r*0.22, r*0.36, r*0.1);
            for (let i = 0; i < 4; i++) {
                const fx = cx - r*0.3 + i*r*0.2;
                const fh = [0.58, 0.64, 0.62, 0.54][i];
                gfx.fillStyle(0xe8b070, 1);
                gfx.fillRoundedRect(fx-r*0.1, cy-r*0.7, r*0.2, r*fh, r*0.08);
                gfx.fillStyle(0xfad5a5, 1);
                gfx.fillRoundedRect(fx-r*0.088, cy-r*0.68, r*0.18, r*fh-r*0.02, r*0.08);
                gfx.fillStyle(0xee9966, 0.5);
                gfx.fillRect(fx-r*0.08, cy-r*0.7, r*0.16, r*0.08);
                gfx.fillStyle(0xfad5a5, 1);
                gfx.fillEllipse(fx, cy-r*0.7, r*0.18, r*0.1);
            }
            gfx.lineStyle(1.5, 0xcc9977, 0.4);
            for (let i = 0; i < 4; i++) {
                const fx = cx - r*0.3 + i*r*0.2;
                gfx.beginPath(); gfx.moveTo(fx-r*0.08, cy-r*0.12); gfx.lineTo(fx+r*0.08, cy-r*0.12); gfx.strokePath();
                gfx.beginPath(); gfx.moveTo(fx-r*0.06, cy+r*0.06); gfx.lineTo(fx+r*0.06, cy+r*0.06); gfx.strokePath();
            }
            gfx.lineStyle(2, 0xcc9977, 0.35);
            gfx.beginPath(); gfx.moveTo(cx-r*0.28, cy+r*0.1); gfx.lineTo(cx+r*0.28, cy+r*0.3); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.32, cy+r*0.32); gfx.lineTo(cx-r*0.04, cy+r*0.46); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Handprint (filled solid shape of a hand)
            gfx.fillStyle(0xfff8f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Paint color background splash
            gfx.fillStyle(0xff8844, 0.3); gfx.fillCircle(cx, cy, r*0.8);
            // Hand palm
            gfx.fillStyle(0xe8b070, 1);
            gfx.fillRoundedRect(cx-r*0.32, cy-r*0.1, r*0.64, r*0.62, r*0.14);
            // 4 fingers
            const fData = [[-0.24, 0.56], [-0.08, 0.62], [0.08, 0.6], [0.24, 0.54]];
            fData.forEach(([dx, fh]) => {
                gfx.fillRoundedRect(cx+dx*r-r*0.09, cy-r*fh, r*0.18, r*(fh-0.08), r*0.08);
            });
            // Thumb
            gfx.fillRoundedRect(cx-r*0.5, cy-r*0.24, r*0.22, r*0.38, r*0.1);
            // Wrist
            gfx.fillRoundedRect(cx-r*0.28, cy+r*0.5, r*0.56, r*0.22, r*0.08);
            // Highlight on palm
            gfx.fillStyle(0xfad5a5, 0.6);
            gfx.fillEllipse(cx-r*0.06, cy+r*0.18, r*0.36, r*0.3);
        }
    },
    PIED: {
        fr: { answer: 'PIED', letters: ['P','I','E','D','O','A'] },
        en: { answer: 'FOOT', letters: ['F','O','O','T','E','A'] },
        es: { answer: 'PIE',  letters: ['P','I','E','O','A','D'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff8f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xe8b070, 1);
            gfx.fillCircle(cx-r*0.36, cy+r*0.32, r*0.3);
            gfx.fillEllipse(cx+r*0.06, cy+r*0.38, r*1.14, r*0.54);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.34, cy+r*0.3, r*0.28);
            gfx.fillEllipse(cx+r*0.06, cy+r*0.36, r*1.1, r*0.5);
            gfx.fillStyle(0xee9966, 0.5);
            gfx.fillEllipse(cx+r*0.38, cy+r*0.14, r*0.32, r*0.24);
            const toeData = [[0.48,-0.04,0.12],[0.34,-0.12,0.11],[0.2,-0.16,0.1],[0.07,-0.14,0.09],[-0.06,-0.08,0.08]];
            toeData.forEach(([tx, ty, tr]) => {
                gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx+tx*r, cy+ty*r, tr*r+r*0.01);
                gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx+tx*r, cy+ty*r, tr*r);
                gfx.fillStyle(0xee9966, 0.45);
                gfx.fillRect(cx+tx*r-tr*r*0.8, cy+ty*r-tr*r*0.6, tr*r*1.6, tr*r*0.5);
                gfx.fillStyle(0xfad5a5, 1);
                gfx.fillEllipse(cx+tx*r, cy+ty*r-tr*r*0.35, tr*r*1.4, tr*r*0.5);
            });
            gfx.lineStyle(1.5, 0xcc9977, 0.35);
            gfx.beginPath(); gfx.moveTo(cx-r*0.36, cy+r*0.14); gfx.lineTo(cx-r*0.26, cy+r*0.14); gfx.strokePath();
            gfx.fillStyle(0xfad5a5, 0.5);
            gfx.fillCircle(cx-r*0.52, cy+r*0.26, r*0.1);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Footprint (filled sole shape)
            gfx.fillStyle(0xfff8f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Paint splash
            gfx.fillStyle(0x4488ff, 0.25); gfx.fillCircle(cx, cy, r*0.82);
            // Foot sole
            gfx.fillStyle(0xe8b070, 1);
            gfx.fillCircle(cx-r*0.26, cy+r*0.32, r*0.3);
            gfx.fillEllipse(cx+r*0.14, cy+r*0.38, r*1.02, r*0.52);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.24, cy+r*0.3, r*0.28);
            gfx.fillEllipse(cx+r*0.14, cy+r*0.36, r*0.98, r*0.48);
            // 5 toes
            const toePrint = [[0.46,-0.06,0.12],[0.32,-0.14,0.11],[0.18,-0.18,0.1],[0.04,-0.16,0.09],[-0.1,-0.1,0.08]];
            toePrint.forEach(([tx,ty,tr]) => {
                gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx+tx*r, cy+ty*r, tr*r+r*0.01);
                gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx+tx*r, cy+ty*r, tr*r);
            });
            // Arch highlight
            gfx.fillStyle(0xfff8f0, 0.5);
            gfx.fillEllipse(cx-r*0.24, cy+r*0.34, r*0.22, r*0.44);
        }
    },
    TETE: {
        fr: { answer: 'TETE',   letters: ['T','E','T','E','A','R'] },
        en: { answer: 'HEAD',   letters: ['H','E','A','D','O','R'] },
        es: { answer: 'CABEZA', letters: ['C','A','B','E','Z','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff8f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x5c3010, 1);
            gfx.fillEllipse(cx, cy-r*0.44, r*1.1, r*0.52);
            gfx.fillRect(cx-r*0.55, cy-r*0.54, r*1.1, r*0.18);
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy+r*0.02, r*0.62);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy+r*0.02, r*0.6);
            gfx.fillStyle(0xe8b070, 1);
            gfx.fillCircle(cx-r*0.6, cy+r*0.02, r*0.15);
            gfx.fillCircle(cx+r*0.6, cy+r*0.02, r*0.15);
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.6, cy+r*0.02, r*0.13);
            gfx.fillCircle(cx+r*0.6, cy+r*0.02, r*0.13);
            gfx.lineStyle(1.5, 0xcc9977, 0.5);
            gfx.beginPath(); gfx.arc(cx-r*0.6, cy+r*0.06, r*0.06, -0.8, 0.8, false); gfx.strokePath();
            gfx.beginPath(); gfx.arc(cx+r*0.6, cy+r*0.06, r*0.06, Math.PI-0.8, Math.PI+0.8, false); gfx.strokePath();
            gfx.fillStyle(0x5c3010, 1);
            gfx.fillEllipse(cx+r*0.1, cy-r*0.44, r*0.8, r*0.2);
            gfx.fillStyle(0x6a3818, 1);
            gfx.fillEllipse(cx-r*0.2, cy-r*0.42, r*0.24, r*0.12);
            gfx.fillEllipse(cx+r*0.24, cy-r*0.42, r*0.24, r*0.12);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx-r*0.2, cy-r*0.18, r*0.18, r*0.16);
            gfx.fillEllipse(cx+r*0.2, cy-r*0.18, r*0.18, r*0.16);
            gfx.fillStyle(0x44aa44, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.17, r*0.09);
            gfx.fillCircle(cx+r*0.2, cy-r*0.17, r*0.09);
            gfx.fillStyle(0x111122, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.17, r*0.054);
            gfx.fillCircle(cx+r*0.2, cy-r*0.17, r*0.054);
            gfx.fillStyle(0xffffff, 0.9);
            gfx.fillCircle(cx-r*0.188, cy-r*0.182, r*0.022);
            gfx.fillCircle(cx+r*0.212, cy-r*0.182, r*0.022);
            gfx.fillStyle(0xcc9977, 1);
            gfx.fillEllipse(cx, cy+r*0.06, r*0.1, r*0.07);
            gfx.fillCircle(cx-r*0.14, cy+r*0.06, r*0.04);
            gfx.fillCircle(cx+r*0.14, cy+r*0.06, r*0.04);
            gfx.fillStyle(0xff9988, 0.28);
            gfx.fillEllipse(cx-r*0.38, cy+r*0.04, r*0.2, r*0.12);
            gfx.fillEllipse(cx+r*0.38, cy+r*0.04, r*0.2, r*0.12);
            gfx.lineStyle(2.5, 0xcc8844, 1);
            gfx.beginPath(); gfx.arc(cx, cy+r*0.22, r*0.18, 0.25, Math.PI-0.25, false); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Front-view simple head with all features
            gfx.fillStyle(0xfff8f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Hair
            gfx.fillStyle(0x5c3010, 1);
            gfx.fillEllipse(cx, cy-r*0.58, r*1.0, r*0.3);
            gfx.fillRect(cx-r*0.5, cy-r*0.62, r*1.0, r*0.16);
            // Face
            gfx.fillStyle(0xe8b070, 1); gfx.fillCircle(cx, cy+r*0.06, r*0.62);
            gfx.fillStyle(0xfad5a5, 1); gfx.fillCircle(cx, cy+r*0.06, r*0.6);
            // Ears
            gfx.fillStyle(0xfad5a5, 1);
            gfx.fillCircle(cx-r*0.6, cy+r*0.06, r*0.14);
            gfx.fillCircle(cx+r*0.6, cy+r*0.06, r*0.14);
            // Eyebrows
            gfx.lineStyle(3, 0x5c3010, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.28, cy-r*0.26); gfx.lineTo(cx-r*0.08, cy-r*0.28); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08, cy-r*0.28); gfx.lineTo(cx+r*0.28, cy-r*0.26); gfx.strokePath();
            // Eyes
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.14, r*0.15);
            gfx.fillCircle(cx+r*0.2, cy-r*0.14, r*0.15);
            gfx.fillStyle(0x44aa44, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.14, r*0.1);
            gfx.fillCircle(cx+r*0.2, cy-r*0.14, r*0.1);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.14, r*0.062);
            gfx.fillCircle(cx+r*0.2, cy-r*0.14, r*0.062);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.15, cy-r*0.17, r*0.026);
            gfx.fillCircle(cx+r*0.25, cy-r*0.17, r*0.026);
            // Nose
            gfx.fillStyle(0xcc9977, 1); gfx.fillEllipse(cx, cy+r*0.06, r*0.1, r*0.07);
            gfx.fillCircle(cx-r*0.06, cy+r*0.1, r*0.04);
            gfx.fillCircle(cx+r*0.06, cy+r*0.1, r*0.04);
            // Smile
            gfx.lineStyle(2.5, 0xcc8844, 1);
            gfx.beginPath(); gfx.arc(cx, cy+r*0.24, r*0.16, 0.25, Math.PI-0.25, false); gfx.strokePath();
            // Cheeks
            gfx.fillStyle(0xff9988, 0.25);
            gfx.fillCircle(cx-r*0.38, cy+r*0.1, r*0.12);
            gfx.fillCircle(cx+r*0.38, cy+r*0.1, r*0.12);
        }
    },

    // ── LEVEL 8 : Les Fruits ─────────────────────────────────────────────────
    KIWI: {
        fr: { answer: 'KIWI', letters: ['K','I','W','I','O','E'] },
        en: { answer: 'KIWI', letters: ['K','I','W','I','O','E'] },
        es: { answer: 'KIWI', letters: ['K','I','W','I','O','E'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xf5e8d0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x7a5030, 1); gfx.fillEllipse(cx, cy, r*1.1, r*0.92);
            gfx.fillStyle(0x5a3a20, 0.5);
            for (let i = 0; i < 16; i++) {
                const a = (i / 16) * Math.PI * 2;
                gfx.fillEllipse(cx+Math.cos(a)*r*0.52, cy+Math.sin(a)*r*0.44, r*0.1, r*0.06);
            }
            gfx.fillStyle(0x55aa22, 1); gfx.fillEllipse(cx, cy, r*0.82, r*0.68);
            gfx.fillStyle(0x77cc44, 1); gfx.fillEllipse(cx, cy, r*0.72, r*0.6);
            gfx.fillStyle(0xefffcc, 1); gfx.fillCircle(cx, cy, r*0.2);
            gfx.fillStyle(0xffffff, 0.7); gfx.fillCircle(cx, cy, r*0.14);
            gfx.lineStyle(1.5, 0x224400, 0.75);
            for (let i = 0; i < 14; i++) {
                const a = (i / 14) * Math.PI * 2;
                gfx.beginPath();
                gfx.moveTo(cx + Math.cos(a)*r*0.2, cy + Math.sin(a)*r*0.2);
                gfx.lineTo(cx + Math.cos(a)*r*0.38, cy + Math.sin(a)*r*0.32);
                gfx.strokePath();
            }
            gfx.fillStyle(0x1a1100, 1);
            for (let i = 0; i < 14; i++) {
                const a = (i / 14) * Math.PI * 2;
                gfx.fillEllipse(cx+Math.cos(a)*r*0.3, cy+Math.sin(a)*r*0.25, r*0.058, r*0.038);
            }
        },
        drawPicture2(gfx, cx, cy, r) {
            // Kiwi sliced cross-section — the classic view
            gfx.fillStyle(0xf5e8d0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Brown outer skin
            gfx.fillStyle(0x7a5030, 1); gfx.fillCircle(cx, cy, r*0.76);
            // Green flesh
            gfx.fillStyle(0x55aa22, 1); gfx.fillCircle(cx, cy, r*0.68);
            gfx.fillStyle(0x77cc44, 1); gfx.fillCircle(cx, cy, r*0.6);
            // White center
            gfx.fillStyle(0xefffcc, 1); gfx.fillCircle(cx, cy, r*0.18);
            gfx.fillStyle(0xffffff, 0.7); gfx.fillCircle(cx, cy, r*0.12);
            // Flesh sections radiating
            gfx.lineStyle(1.2, 0x224400, 0.65);
            for(let i=0;i<14;i++){
                const a = (i/14)*Math.PI*2;
                gfx.beginPath();
                gfx.moveTo(cx+Math.cos(a)*r*0.18, cy+Math.sin(a)*r*0.18);
                gfx.lineTo(cx+Math.cos(a)*r*0.58, cy+Math.sin(a)*r*0.52);
                gfx.strokePath();
            }
            // Seeds
            gfx.fillStyle(0x1a1100, 1);
            for(let i=0;i<14;i++){
                const a = (i/14)*Math.PI*2;
                gfx.fillEllipse(cx+Math.cos(a)*r*0.38, cy+Math.sin(a)*r*0.33, r*0.06, r*0.04);
            }
        }
    },
    POIRE: {
        fr: { answer: 'POIRE', letters: ['P','O','I','R','E','A'] },
        en: { answer: 'PEAR',  letters: ['P','E','A','R','O','I'] },
        es: { answer: 'PERA',  letters: ['P','E','R','A','O','I'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xf8f8e8, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xaabb22, 1);
            gfx.fillCircle(cx, cy+r*0.24, r*0.54);
            gfx.fillEllipse(cx, cy-r*0.28, r*0.52, r*0.64);
            gfx.fillStyle(0xccdd44, 1);
            gfx.fillCircle(cx, cy+r*0.24, r*0.5);
            gfx.fillEllipse(cx, cy-r*0.28, r*0.48, r*0.6);
            gfx.fillStyle(0xddeebb, 0.55);
            gfx.fillEllipse(cx-r*0.18, cy-r*0.18, r*0.18, r*0.32);
            gfx.fillStyle(0x88aa00, 0.4);
            gfx.fillEllipse(cx+r*0.12, cy+r*0.2, r*0.22, r*0.36);
            gfx.fillStyle(0xff9966, 0.35);
            gfx.fillEllipse(cx+r*0.14, cy+r*0.3, r*0.16, r*0.24);
            gfx.lineStyle(4, 0x8b5e3c, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.6); gfx.lineTo(cx+r*0.08, cy-r*0.84); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx+r*0.22, cy-r*0.82, r*0.26, r*0.12);
            gfx.lineStyle(1.5, 0x226611, 0.7);
            gfx.beginPath(); gfx.moveTo(cx+r*0.08, cy-r*0.82); gfx.lineTo(cx+r*0.34, cy-r*0.82); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Pear cut in half showing seeds inside
            gfx.fillStyle(0xf8f8e8, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Left half (outer skin)
            gfx.fillStyle(0xaabb22, 1);
            gfx.fillCircle(cx-r*0.12, cy+r*0.2, r*0.5);
            gfx.fillEllipse(cx-r*0.12, cy-r*0.3, r*0.48, r*0.6);
            // Flesh inside (yellow-white)
            gfx.fillStyle(0xf5f0cc, 1);
            gfx.fillCircle(cx-r*0.12, cy+r*0.2, r*0.44);
            gfx.fillEllipse(cx-r*0.12, cy-r*0.3, r*0.42, r*0.54);
            // Right half (mirrored slightly)
            gfx.fillStyle(0xccdd44, 1);
            gfx.fillCircle(cx+r*0.12, cy+r*0.2, r*0.5);
            gfx.fillEllipse(cx+r*0.12, cy-r*0.3, r*0.48, r*0.6);
            gfx.fillStyle(0xf5f0cc, 1);
            gfx.fillCircle(cx+r*0.12, cy+r*0.2, r*0.44);
            gfx.fillEllipse(cx+r*0.12, cy-r*0.3, r*0.42, r*0.54);
            // Core channel
            gfx.fillStyle(0xe8d0a0, 1);
            gfx.fillEllipse(cx, cy+r*0.08, r*0.18, r*0.54);
            // Seeds
            gfx.fillStyle(0x774422, 1);
            gfx.fillEllipse(cx-r*0.06, cy-r*0.02, r*0.08, r*0.14);
            gfx.fillEllipse(cx+r*0.06, cy+r*0.18, r*0.08, r*0.14);
            // Center split line
            gfx.lineStyle(2, 0x7a5030, 0.5);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.72); gfx.lineTo(cx, cy+r*0.72); gfx.strokePath();
            // Stems
            gfx.lineStyle(3, 0x8b5e3c, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.06, cy-r*0.56); gfx.lineTo(cx-r*0.1, cy-r*0.76); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.06, cy-r*0.56); gfx.lineTo(cx+r*0.1, cy-r*0.76); gfx.strokePath();
        }
    },
    POMME: {
        fr: { answer: 'POMME',   letters: ['P','O','M','M','E','A'] },
        en: { answer: 'APPLE',   letters: ['A','P','P','L','E','O'] },
        es: { answer: 'MANZANA', letters: ['M','A','N','Z','A','N','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xfff0f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0xcc1111, 1);
            gfx.fillCircle(cx, cy+r*0.08, r*0.6);
            gfx.fillStyle(0xdd2222, 1);
            gfx.fillCircle(cx-r*0.12, cy-r*0.4, r*0.22);
            gfx.fillCircle(cx+r*0.12, cy-r*0.4, r*0.22);
            gfx.fillStyle(0xee3333, 1);
            gfx.fillCircle(cx, cy-r*0.38, r*0.24);
            gfx.fillStyle(0xcc1111, 0.6);
            gfx.fillEllipse(cx+r*0.2, cy+r*0.18, r*0.24, r*0.44);
            gfx.fillStyle(0xff6666, 0.45);
            gfx.fillEllipse(cx-r*0.2, cy-r*0.1, r*0.22, r*0.36);
            gfx.lineStyle(4, 0x8b5e3c, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.54); gfx.lineTo(cx+r*0.06, cy-r*0.76); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx+r*0.22, cy-r*0.74, r*0.28, r*0.12);
            gfx.lineStyle(1.5, 0x226611, 0.7);
            gfx.beginPath(); gfx.moveTo(cx+r*0.06, cy-r*0.74); gfx.lineTo(cx+r*0.36, cy-r*0.74); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Apple sliced showing 5-pointed star seed pattern
            gfx.fillStyle(0xfff0f0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Apple slice (circle)
            gfx.fillStyle(0xfbecd2, 1); gfx.fillCircle(cx, cy+r*0.04, r*0.7);
            // Skin ring (red)
            gfx.lineStyle(8, 0xcc1111, 1);
            gfx.strokeCircle(cx, cy+r*0.04, r*0.66);
            // Inner flesh
            gfx.fillStyle(0xfaf0e0, 1); gfx.fillCircle(cx, cy+r*0.04, r*0.58);
            // Star-shaped core (5-pointed)
            gfx.fillStyle(0xddb888, 1);
            gfx.fillCircle(cx, cy+r*0.04, r*0.18);
            // 5 seed pockets (the star arms)
            for(let i=0;i<5;i++){
                const a = i*Math.PI*2/5 - Math.PI*0.5;
                gfx.fillStyle(0xddb888, 1);
                gfx.fillEllipse(cx+Math.cos(a)*r*0.24, cy+r*0.04+Math.sin(a)*r*0.24, r*0.18, r*0.1);
                // Seeds
                gfx.fillStyle(0x5a3010, 1);
                gfx.fillEllipse(cx+Math.cos(a)*r*0.3, cy+r*0.04+Math.sin(a)*r*0.3, r*0.08, r*0.05);
            }
            // Stem
            gfx.lineStyle(4, 0x8b5e3c, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.66); gfx.lineTo(cx+r*0.06, cy-r*0.84); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx+r*0.2, cy-r*0.82, r*0.24, r*0.1);
        }
    },
    FIGUE: {
        fr: { answer: 'FIGUE', letters: ['F','I','G','U','E','A'] },
        en: { answer: 'FIG',   letters: ['F','I','G','U','E','A'] },
        es: { answer: 'HIGO',  letters: ['H','I','G','O','E','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xf8f0ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x6622aa, 1);
            gfx.fillCircle(cx, cy+r*0.12, r*0.54);
            gfx.fillEllipse(cx, cy-r*0.3, r*0.4, r*0.54);
            gfx.fillStyle(0x8833cc, 1);
            gfx.fillCircle(cx, cy+r*0.1, r*0.5);
            gfx.fillEllipse(cx, cy-r*0.32, r*0.36, r*0.5);
            gfx.fillStyle(0xaa55ee, 0.45);
            gfx.fillEllipse(cx-r*0.18, cy-r*0.06, r*0.18, r*0.34);
            gfx.fillStyle(0x5511aa, 0.6);
            gfx.fillEllipse(cx+r*0.14, cy+r*0.12, r*0.2, r*0.36);
            gfx.lineStyle(3, 0x4a2288, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.54); gfx.lineTo(cx, cy-r*0.72); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx+r*0.18, cy-r*0.7, r*0.24, r*0.1);
            gfx.lineStyle(1.5, 0x226611, 0.7);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.7); gfx.lineTo(cx+r*0.3, cy-r*0.7); gfx.strokePath();
            gfx.fillStyle(0x663388, 1);
            gfx.fillCircle(cx, cy+r*0.62, r*0.09);
            for (let i = 0; i < 5; i++) {
                const a = (i/5)*Math.PI*2 - Math.PI*0.5;
                gfx.fillStyle(0x5511aa, 0.5);
                tri(gfx, cx+Math.cos(a)*r*0.06, cy+r*0.62+Math.sin(a)*r*0.06,
                    cx+Math.cos(a+0.5)*r*0.09, cy+r*0.62+Math.sin(a+0.5)*r*0.09,
                    cx+Math.cos(a-0.5)*r*0.09, cy+r*0.62+Math.sin(a-0.5)*r*0.09);
            }
        },
        drawPicture2(gfx, cx, cy, r) {
            // Fig sliced open showing pink flesh with seeds
            gfx.fillStyle(0xf8f0ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Fig outer shape
            gfx.fillStyle(0x6622aa, 1);
            gfx.fillCircle(cx, cy+r*0.1, r*0.56);
            gfx.fillEllipse(cx, cy-r*0.32, r*0.42, r*0.56);
            // Inner pink flesh
            gfx.fillStyle(0xff6688, 1);
            gfx.fillCircle(cx, cy+r*0.1, r*0.46);
            gfx.fillEllipse(cx, cy-r*0.3, r*0.34, r*0.44);
            // Inner lighter center
            gfx.fillStyle(0xffaacc, 0.6);
            gfx.fillCircle(cx, cy+r*0.14, r*0.28);
            // Many tiny white seeds radiating
            gfx.fillStyle(0xffffff, 0.85);
            for(let i=0;i<18;i++){
                const a = (i/18)*Math.PI*2;
                const dist = r*(0.12+Math.random()*0.18);
                gfx.fillEllipse(cx+Math.cos(a)*dist, cy+r*0.08+Math.sin(a)*dist*0.75, r*0.04, r*0.025);
            }
            // Stem
            gfx.lineStyle(3, 0x4a2288, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.56); gfx.lineTo(cx, cy-r*0.72); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx+r*0.16, cy-r*0.7, r*0.22, r*0.1);
        }
    },
    PRUNE: {
        fr: { answer: 'PRUNE',   letters: ['P','R','U','N','E','A'] },
        en: { answer: 'PLUM',    letters: ['P','L','U','M','A','E'] },
        es: { answer: 'CIRUELA', letters: ['C','I','R','U','E','L','A'] },
        drawPicture(gfx, cx, cy, r) {
            gfx.fillStyle(0xf0f0ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            gfx.fillStyle(0x441188, 1); gfx.fillCircle(cx, cy+r*0.02, r*0.6);
            gfx.fillStyle(0x5522aa, 1); gfx.fillCircle(cx, cy+r*0.02, r*0.56);
            gfx.fillStyle(0x6633bb, 1); gfx.fillCircle(cx, cy+r*0.02, r*0.52);
            gfx.fillStyle(0x4a1a99, 0.6);
            gfx.fillEllipse(cx+r*0.16, cy+r*0.12, r*0.2, r*0.42);
            gfx.fillStyle(0x8855dd, 0.5);
            gfx.fillEllipse(cx-r*0.18, cy-r*0.08, r*0.18, r*0.32);
            gfx.fillStyle(0xaa88ff, 0.55);
            gfx.fillEllipse(cx-r*0.16, cy-r*0.22, r*0.24, r*0.18);
            gfx.lineStyle(2, 0x331177, 0.65);
            gfx.beginPath(); gfx.moveTo(cx+r*0.02, cy-r*0.56); gfx.lineTo(cx+r*0.02, cy+r*0.58); gfx.strokePath();
            gfx.lineStyle(4, 0x8b5e3c, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.56); gfx.lineTo(cx+r*0.04, cy-r*0.78); gfx.strokePath();
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx+r*0.2, cy-r*0.76, r*0.26, r*0.12);
            gfx.lineStyle(1.5, 0x226611, 0.7);
            gfx.beginPath(); gfx.moveTo(cx+r*0.04, cy-r*0.76); gfx.lineTo(cx+r*0.34, cy-r*0.76); gfx.strokePath();
        },
        drawPicture2(gfx, cx, cy, r) {
            // Plum tree branch with 3 plums hanging
            gfx.fillStyle(0xf0f0ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Branch
            gfx.lineStyle(6, 0x7a4010, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.82, cy-r*0.12); gfx.lineTo(cx+r*0.82, cy-r*0.08); gfx.strokePath();
            gfx.lineStyle(4, 0x7a4010, 1);
            gfx.beginPath(); gfx.moveTo(cx-r*0.4, cy-r*0.12); gfx.lineTo(cx-r*0.4, cy+r*0.04); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx, cy-r*0.1); gfx.lineTo(cx, cy+r*0.04); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.4, cy-r*0.08); gfx.lineTo(cx+r*0.4, cy+r*0.04); gfx.strokePath();
            // Leaves
            gfx.fillStyle(0x44aa22, 1);
            gfx.fillEllipse(cx-r*0.54, cy-r*0.22, r*0.28, r*0.12);
            gfx.fillEllipse(cx+r*0.14, cy-r*0.22, r*0.26, r*0.12);
            gfx.fillEllipse(cx+r*0.6, cy-r*0.2, r*0.28, r*0.12);
            // 3 plums
            const plumX = [-0.4, 0, 0.4];
            plumX.forEach(dx => {
                // Stem
                gfx.lineStyle(2, 0x6a3010, 1);
                gfx.beginPath(); gfx.moveTo(cx+dx*r, cy+r*0.04); gfx.lineTo(cx+dx*r, cy+r*0.22); gfx.strokePath();
                // Plum
                gfx.fillStyle(0x441188, 1); gfx.fillCircle(cx+dx*r, cy+r*0.46, r*0.24);
                gfx.fillStyle(0x5522aa, 1); gfx.fillCircle(cx+dx*r, cy+r*0.44, r*0.22);
                gfx.fillStyle(0x8855dd, 0.5); gfx.fillEllipse(cx+dx*r-r*0.06, cy+r*0.36, r*0.1, r*0.16);
                gfx.fillStyle(0xaa88ff, 0.4); gfx.fillEllipse(cx+dx*r-r*0.06, cy+r*0.32, r*0.14, r*0.1);
            });
        }
    },

    // ── LEVEL 9 : La Ferme ───────────────────────────────────────────────────
    VACHE: {
        fr: { answer: 'VACHE', letters: ['V','A','C','H','E','O'] },
        en: { answer: 'COW',   letters: ['C','O','W','A','E','I'] },
        es: { answer: 'VACA',  letters: ['V','A','C','A','O','E'] },
        drawPicture(gfx, cx, cy, r) {
            // Legs (draw behind body)
            gfx.fillStyle(0xeeeeee, 1);
            [[-0.30,0.50],[-0.12,0.52],[0.12,0.52],[0.30,0.50]].forEach(([dx,dy]) =>
                gfx.fillRoundedRect(cx+dx*r-r*0.075,cy+dy*r,r*0.15,r*0.30,r*0.04));
            // Hooves
            gfx.fillStyle(0x555555, 1);
            [[-0.30,0.50],[-0.12,0.52],[0.12,0.52],[0.30,0.50]].forEach(([dx,dy]) =>
                gfx.fillRoundedRect(cx+dx*r-r*0.07,cy+(dy+0.20)*r,r*0.14,r*0.08,r*0.03));
            // Udder
            gfx.fillStyle(0xffcccc, 1);
            gfx.fillEllipse(cx+r*0.05,cy+r*0.54,r*0.36,r*0.19);
            gfx.fillStyle(0xff9999, 0.8);
            [[-0.08,0.58],[0.08,0.58]].forEach(([dx,dy]) => gfx.fillCircle(cx+dx*r,cy+dy*r,r*0.034));
            // Body (white, tighter)
            gfx.fillStyle(0xfafafa, 1);
            gfx.fillEllipse(cx+r*0.02,cy+r*0.10,r*1.05,r*0.72);
            // Black spots — elongated patches, not big circles
            gfx.fillStyle(0x111111, 1);
            gfx.fillEllipse(cx-r*0.20,cy+r*0.03,r*0.28,r*0.20);
            gfx.fillEllipse(cx+r*0.20,cy+r*0.20,r*0.22,r*0.16);
            // Head (white, larger — r*0.36)
            gfx.fillStyle(0xfafafa, 1);
            gfx.fillCircle(cx+r*0.50,cy-r*0.14,r*0.36);
            // Ear
            gfx.fillStyle(0xfafafa, 1);
            gfx.fillEllipse(cx+r*0.28,cy-r*0.42,r*0.16,r*0.24);
            gfx.fillStyle(0xffbbaa, 0.6);
            gfx.fillEllipse(cx+r*0.28,cy-r*0.42,r*0.09,r*0.14);
            // Head black patch (smaller)
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx+r*0.58,cy-r*0.24,r*0.14);
            // Horns
            gfx.fillStyle(0xddbb44, 1);
            tri(gfx, cx+r*0.36,cy-r*0.38, cx+r*0.42,cy-r*0.58, cx+r*0.52,cy-r*0.40);
            // Snout (pink)
            gfx.fillStyle(0xffaaaa, 1);
            gfx.fillEllipse(cx+r*0.68,cy-r*0.04,r*0.22,r*0.15);
            // Nostrils
            gfx.fillStyle(0x221111, 1);
            gfx.fillCircle(cx+r*0.62,cy-r*0.04,r*0.036);
            gfx.fillCircle(cx+r*0.74,cy-r*0.04,r*0.036);
            // Eye — sclera
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx+r*0.60,cy-r*0.19,r*0.11);
            // Eye — iris
            gfx.fillStyle(0x8b4010, 1);
            gfx.fillCircle(cx+r*0.60,cy-r*0.19,r*0.076);
            // Eye — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx+r*0.60,cy-r*0.19,r*0.048);
            // Eye — shine
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx+r*0.64,cy-r*0.22,r*0.026);
            // Lash
            gfx.lineStyle(2, 0x111111, 0.9);
            gfx.beginPath(); gfx.arc(cx+r*0.60,cy-r*0.19,r*0.11,Math.PI*1.25,Math.PI*1.82,false); gfx.strokePath();
            // Cowbell
            gfx.fillStyle(0xddaa00, 1);
            gfx.fillRoundedRect(cx+r*0.36,cy-r*0.09,r*0.13,r*0.17,r*0.03);
            gfx.fillStyle(0xaa7700, 1);
            gfx.fillCircle(cx+r*0.425,cy+r*0.10,r*0.028);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Cow face from front — black/white, big nose, horns
            gfx.fillStyle(0xcceecc, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Head (white)
            gfx.fillStyle(0xfafafa, 1); gfx.fillCircle(cx, cy+r*0.08, r*0.72);
            // Black patches on head
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.28, cy-r*0.24, r*0.28);
            gfx.fillCircle(cx+r*0.34, cy-r*0.18, r*0.22);
            gfx.fillEllipse(cx+r*0.1, cy-r*0.46, r*0.36, r*0.16);
            // Ears (round, at sides)
            gfx.fillStyle(0xfafafa, 1);
            gfx.fillCircle(cx-r*0.64, cy-r*0.24, r*0.22);
            gfx.fillCircle(cx+r*0.64, cy-r*0.24, r*0.22);
            gfx.fillStyle(0xffbbaa, 0.7);
            gfx.fillCircle(cx-r*0.64, cy-r*0.24, r*0.12);
            gfx.fillCircle(cx+r*0.64, cy-r*0.24, r*0.12);
            // Horns
            gfx.fillStyle(0xddbb44, 1);
            tri(gfx, cx-r*0.36, cy-r*0.56, cx-r*0.22, cy-r*0.76, cx-r*0.14, cy-r*0.52);
            tri(gfx, cx+r*0.36, cy-r*0.56, cx+r*0.22, cy-r*0.76, cx+r*0.14, cy-r*0.52);
            // Big pink nose
            gfx.fillStyle(0xffaaaa, 1); gfx.fillEllipse(cx, cy+r*0.36, r*0.48, r*0.28);
            gfx.fillStyle(0x221111, 1);
            gfx.fillCircle(cx-r*0.14, cy+r*0.36, r*0.055);
            gfx.fillCircle(cx+r*0.14, cy+r*0.36, r*0.055);
            // Eyes
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.24, cy-r*0.04, r*0.16);
            gfx.fillCircle(cx+r*0.24, cy-r*0.04, r*0.16);
            gfx.fillStyle(0x8b4010, 1);
            gfx.fillCircle(cx-r*0.24, cy-r*0.04, r*0.11);
            gfx.fillCircle(cx+r*0.24, cy-r*0.04, r*0.11);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.24, cy-r*0.04, r*0.068);
            gfx.fillCircle(cx+r*0.24, cy-r*0.04, r*0.068);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.19, cy-r*0.07, r*0.03);
            gfx.fillCircle(cx+r*0.29, cy-r*0.07, r*0.03);
            // Cheeks
            gfx.fillStyle(0xff9988, 0.22);
            gfx.fillCircle(cx-r*0.44, cy+r*0.12, r*0.12);
            gfx.fillCircle(cx+r*0.44, cy+r*0.12, r*0.12);
        }
    },
    LAPIN: {
        fr: { answer: 'LAPIN',  letters: ['L','A','P','I','N','E'] },
        en: { answer: 'RABBIT', letters: ['R','A','B','B','I','T'] },
        es: { answer: 'CONEJO', letters: ['C','O','N','E','J','O'] },
        drawPicture(gfx, cx, cy, r) {
            // Fluffy pompom tail
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx+r*0.36,cy+r*0.52,r*0.16);
            gfx.fillStyle(0xeeeeee, 1);
            gfx.fillCircle(cx+r*0.40,cy+r*0.50,r*0.11);
            // Ears (draw first — tall, behind head)
            gfx.fillStyle(0xe8e8e8, 1);
            gfx.fillEllipse(cx-r*0.18,cy-r*0.74,r*0.22,r*0.64);
            gfx.fillEllipse(cx+r*0.18,cy-r*0.74,r*0.22,r*0.64);
            // Ear inner pink
            gfx.fillStyle(0xffaabb, 1);
            gfx.fillEllipse(cx-r*0.18,cy-r*0.75,r*0.11,r*0.50);
            gfx.fillEllipse(cx+r*0.18,cy-r*0.75,r*0.11,r*0.50);
            // Body
            gfx.fillStyle(0xe8e8e8, 1);
            gfx.fillEllipse(cx,cy+r*0.26,r*0.85,r*0.82);
            // Belly lighter
            gfx.fillStyle(0xffffff, 0.7);
            gfx.fillEllipse(cx,cy+r*0.30,r*0.46,r*0.44);
            // Head
            gfx.fillStyle(0xe8e8e8, 1);
            gfx.fillCircle(cx,cy-r*0.22,r*0.34);
            // Cheeks (fluffy)
            gfx.fillStyle(0xffffff, 0.6);
            gfx.fillCircle(cx-r*0.20,cy-r*0.20,r*0.16);
            gfx.fillCircle(cx+r*0.20,cy-r*0.20,r*0.16);
            // Eyes — sclera
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.11,cy-r*0.27,r*0.11);
            gfx.fillCircle(cx+r*0.11,cy-r*0.27,r*0.11);
            // Eyes — iris (sky blue)
            gfx.fillStyle(0x44aadd, 1);
            gfx.fillCircle(cx-r*0.11,cy-r*0.27,r*0.075);
            gfx.fillCircle(cx+r*0.11,cy-r*0.27,r*0.075);
            // Eyes — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.11,cy-r*0.27,r*0.048);
            gfx.fillCircle(cx+r*0.11,cy-r*0.27,r*0.048);
            // Eyes — shine
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.06,cy-r*0.30,r*0.027);
            gfx.fillCircle(cx+r*0.16,cy-r*0.30,r*0.027);
            // Nose (pink round)
            gfx.fillStyle(0xff88aa, 1);
            gfx.fillEllipse(cx,cy-r*0.15,r*0.10,r*0.07);
            // Nose shine
            gfx.fillStyle(0xffbbcc, 0.6);
            gfx.fillCircle(cx-r*0.02,cy-r*0.165,r*0.025);
            // Whiskers
            gfx.lineStyle(1.2, 0xbbbbbb, 0.75);
            gfx.beginPath(); gfx.moveTo(cx-r*0.26,cy-r*0.13); gfx.lineTo(cx-r*0.08,cy-r*0.12); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.24,cy-r*0.10); gfx.lineTo(cx-r*0.08,cy-r*0.10); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08,cy-r*0.12); gfx.lineTo(cx+r*0.26,cy-r*0.13); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08,cy-r*0.10); gfx.lineTo(cx+r*0.24,cy-r*0.10); gfx.strokePath();
            // Cheek blush
            gfx.fillStyle(0xff9988, 0.22);
            gfx.fillCircle(cx-r*0.22,cy-r*0.20,r*0.10);
            gfx.fillCircle(cx+r*0.22,cy-r*0.20,r*0.10);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Rabbit face from front — long ears, twitching nose, big eyes
            gfx.fillStyle(0xe8f8ff, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Long ears
            gfx.fillStyle(0xe8e8e8, 1);
            gfx.fillEllipse(cx-r*0.26, cy-r*0.62, r*0.24, r*0.72);
            gfx.fillEllipse(cx+r*0.26, cy-r*0.62, r*0.24, r*0.72);
            gfx.fillStyle(0xffaabb, 1);
            gfx.fillEllipse(cx-r*0.26, cy-r*0.63, r*0.12, r*0.58);
            gfx.fillEllipse(cx+r*0.26, cy-r*0.63, r*0.12, r*0.58);
            // Head
            gfx.fillStyle(0xe8e8e8, 1); gfx.fillCircle(cx, cy+r*0.14, r*0.62);
            // Cheek poufs
            gfx.fillStyle(0xffffff, 0.7);
            gfx.fillCircle(cx-r*0.28, cy+r*0.2, r*0.2);
            gfx.fillCircle(cx+r*0.28, cy+r*0.2, r*0.2);
            // Eyes
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.02, r*0.16);
            gfx.fillCircle(cx+r*0.2, cy-r*0.02, r*0.16);
            gfx.fillStyle(0x44aadd, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.02, r*0.11);
            gfx.fillCircle(cx+r*0.2, cy-r*0.02, r*0.11);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.2, cy-r*0.02, r*0.07);
            gfx.fillCircle(cx+r*0.2, cy-r*0.02, r*0.07);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.15, cy-r*0.06, r*0.03);
            gfx.fillCircle(cx+r*0.25, cy-r*0.06, r*0.03);
            // Nose (pink, twitching)
            gfx.fillStyle(0xff88aa, 1); gfx.fillEllipse(cx, cy+r*0.16, r*0.12, r*0.08);
            gfx.fillStyle(0xffbbcc, 0.6); gfx.fillCircle(cx-r*0.02, cy+r*0.14, r*0.03);
            // Mouth
            gfx.lineStyle(1.5, 0xcc8899, 1);
            gfx.beginPath(); gfx.moveTo(cx, cy+r*0.2); gfx.lineTo(cx-r*0.1, cy+r*0.28); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx, cy+r*0.2); gfx.lineTo(cx+r*0.1, cy+r*0.28); gfx.strokePath();
            // Whiskers
            gfx.lineStyle(1.2, 0xbbbbbb, 0.75);
            gfx.beginPath(); gfx.moveTo(cx-r*0.08, cy+r*0.17); gfx.lineTo(cx-r*0.52, cy+r*0.12); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx-r*0.08, cy+r*0.22); gfx.lineTo(cx-r*0.5, cy+r*0.26); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08, cy+r*0.17); gfx.lineTo(cx+r*0.52, cy+r*0.12); gfx.strokePath();
            gfx.beginPath(); gfx.moveTo(cx+r*0.08, cy+r*0.22); gfx.lineTo(cx+r*0.5, cy+r*0.26); gfx.strokePath();
            // Cheek blush
            gfx.fillStyle(0xff9988, 0.22);
            gfx.fillCircle(cx-r*0.38, cy+r*0.2, r*0.12);
            gfx.fillCircle(cx+r*0.38, cy+r*0.2, r*0.12);
        }
    },
    POULE: {
        fr: { answer: 'POULE',   letters: ['P','O','U','L','E','A'] },
        en: { answer: 'HEN',     letters: ['H','E','N','O','A','I'] },
        es: { answer: 'GALLINA', letters: ['G','A','L','L','I','N','A'] },
        drawPicture(gfx, cx, cy, r) {
            // Colorful tail feathers
            const tColors = [0xff3300, 0xff9900, 0xffdd00, 0x44cc22];
            tColors.forEach((c, i) => {
                const angle = Math.PI*0.10 + i*0.22;
                const len = r*(0.80 - i*0.04);
                gfx.fillStyle(c, 1);
                tri(gfx, cx+r*0.34,cy+r*0.08,
                    cx+r*0.34+Math.cos(angle-0.12)*len, cy+Math.sin(angle-0.12)*len,
                    cx+r*0.34+Math.cos(angle+0.12)*len, cy+Math.sin(angle+0.12)*len);
            });
            // Body
            gfx.fillStyle(0xffffff, 1);
            gfx.fillEllipse(cx,cy+r*0.18,r*1.02,r*0.84);
            // Fluffy wing area
            gfx.fillStyle(0xf0f0ee, 1);
            gfx.fillEllipse(cx+r*0.20,cy+r*0.10,r*0.54,r*0.38);
            // Head
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.38,cy-r*0.20,r*0.30);
            // Comb (3 red bumps)
            gfx.fillStyle(0xee1111, 1);
            gfx.fillCircle(cx-r*0.46,cy-r*0.46,r*0.11);
            gfx.fillCircle(cx-r*0.36,cy-r*0.52,r*0.13);
            gfx.fillCircle(cx-r*0.26,cy-r*0.46,r*0.10);
            // Wattle
            gfx.fillEllipse(cx-r*0.56,cy-r*0.10,r*0.16,r*0.20);
            // Beak
            gfx.fillStyle(0xffcc00, 1);
            tri(gfx, cx-r*0.65,cy-r*0.20, cx-r*0.80,cy-r*0.14, cx-r*0.65,cy-r*0.08);
            // Eye — sclera
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.44,cy-r*0.24,r*0.094);
            // Eye — iris (orange)
            gfx.fillStyle(0xff8800, 1);
            gfx.fillCircle(cx-r*0.44,cy-r*0.24,r*0.065);
            // Eye — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.44,cy-r*0.24,r*0.040);
            // Eye — shine
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.40,cy-r*0.27,r*0.023);
            // Feet
            gfx.lineStyle(3, 0xffcc00, 1);
            [[-0.18,0.60,-0.22,0.78],[0.06,0.60,0.02,0.78]].forEach(([x1,y1,x2,y2]) => {
                gfx.beginPath(); gfx.moveTo(cx+x1*r,cy+y1*r); gfx.lineTo(cx+x2*r,cy+y2*r); gfx.strokePath();
            });
            [[-0.22,0.78,-0.36,0.82],[-0.22,0.78,-0.22,0.90],[-0.22,0.78,-0.10,0.82],
             [0.02,0.78,-0.10,0.82],[0.02,0.78,0.02,0.90],[0.02,0.78,0.14,0.82]].forEach(([x1,y1,x2,y2]) => {
                gfx.beginPath(); gfx.moveTo(cx+x1*r,cy+y1*r); gfx.lineTo(cx+x2*r,cy+y2*r); gfx.strokePath();
            });
        },
        drawPicture2(gfx, cx, cy, r) {
            // Hen sitting on nest — bird's-eye view
            gfx.fillStyle(0xf5e8c0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Nest (straw ring)
            gfx.fillStyle(0xd4a843, 1); gfx.fillCircle(cx, cy+r*0.10, r*0.78);
            gfx.fillStyle(0xe8c46a, 1); gfx.fillCircle(cx, cy+r*0.10, r*0.62);
            // Straw lines in nest
            gfx.lineStyle(2, 0xb8860b, 0.6);
            [[-0.42,0.26,0.34,0.42],[0.40,0.20,-0.28,0.44],[0.0,-0.10,0.0,0.56],
             [-0.38,0.52,0.38,0.28],[-0.20,-0.08,0.30,0.52]].forEach(([x1,y1,x2,y2]) => {
                gfx.beginPath(); gfx.moveTo(cx+x1*r,cy+y1*r); gfx.lineTo(cx+x2*r,cy+y2*r); gfx.strokePath();
            });
            // Eggs in nest (3 white ovals)
            gfx.fillStyle(0xfcf9f0, 1);
            gfx.fillEllipse(cx-r*0.20, cy+r*0.38, r*0.22, r*0.28);
            gfx.fillEllipse(cx+r*0.20, cy+r*0.36, r*0.22, r*0.28);
            gfx.fillEllipse(cx, cy+r*0.52, r*0.22, r*0.28);
            // Egg shading
            gfx.fillStyle(0xe8e0d0, 0.4);
            gfx.fillEllipse(cx-r*0.18, cy+r*0.40, r*0.10, r*0.14);
            gfx.fillEllipse(cx+r*0.22, cy+r*0.38, r*0.10, r*0.14);
            gfx.fillEllipse(cx+r*0.02, cy+r*0.54, r*0.10, r*0.14);
            // Hen body (rust/brown oval, top-down)
            gfx.fillStyle(0xcc5522, 1); gfx.fillEllipse(cx, cy-r*0.06, r*0.58, r*0.52);
            // Wing outlines (folded)
            gfx.fillStyle(0xaa3300, 1);
            gfx.fillEllipse(cx-r*0.26, cy-r*0.06, r*0.22, r*0.40);
            gfx.fillEllipse(cx+r*0.26, cy-r*0.06, r*0.22, r*0.40);
            gfx.fillStyle(0xcc5522, 1); gfx.fillEllipse(cx, cy-r*0.10, r*0.36, r*0.36);
            // Head (small, at top)
            gfx.fillStyle(0xffffff, 1); gfx.fillCircle(cx, cy-r*0.52, r*0.22);
            // Comb
            gfx.fillStyle(0xee1111, 1);
            gfx.fillCircle(cx-r*0.08, cy-r*0.70, r*0.08);
            gfx.fillCircle(cx, cy-r*0.74, r*0.10);
            gfx.fillCircle(cx+r*0.08, cy-r*0.70, r*0.08);
            // Beak
            gfx.fillStyle(0xffcc00, 1);
            tri(gfx, cx-r*0.06, cy-r*0.44, cx+r*0.06, cy-r*0.44, cx, cy-r*0.36);
            // Eye
            gfx.fillStyle(0x111111, 1); gfx.fillCircle(cx, cy-r*0.52, r*0.05);
            gfx.fillStyle(0xffffff, 1); gfx.fillCircle(cx+r*0.02, cy-r*0.54, r*0.02);
        }
    },
    CHIEN: {
        fr: { answer: 'CHIEN', letters: ['C','H','I','E','N','A'] },
        en: { answer: 'DOG',   letters: ['D','O','G','A','E','I'] },
        es: { answer: 'PERRO', letters: ['P','E','R','R','O','A'] },
        drawPicture(gfx, cx, cy, r) {
            // Wagging tail (behind body)
            gfx.lineStyle(r*0.12, 0xcc9966, 1);
            gfx.beginPath(); gfx.arc(cx+r*0.62,cy+r*0.02,r*0.34,-Math.PI*0.62,Math.PI*0.08,false); gfx.strokePath();
            gfx.fillStyle(0xeebb88, 1);
            gfx.fillCircle(cx+r*0.82,cy-r*0.26,r*0.10);
            // Legs
            gfx.fillStyle(0xcc9966, 1);
            [[-0.30,0.56],[-0.10,0.58],[0.12,0.56],[0.32,0.54]].forEach(([dx,dy]) =>
                gfx.fillRoundedRect(cx+dx*r-r*0.08,cy+dy*r,r*0.16,r*0.28,r*0.05));
            // Paw toes
            gfx.fillStyle(0xeebb88, 1);
            [[-0.30,0.56],[-0.10,0.58],[0.12,0.56],[0.32,0.54]].forEach(([dx,dy]) => {
                for(let i=-1;i<=1;i++) gfx.fillCircle(cx+dx*r+i*r*0.05,cy+(dy+0.22)*r,r*0.032);
            });
            // Body
            gfx.fillStyle(0xcc9966, 1);
            gfx.fillEllipse(cx,cy+r*0.22,r*1.1,r*0.74);
            // Body highlight
            gfx.fillStyle(0xeebb88, 0.4);
            gfx.fillEllipse(cx-r*0.05,cy+r*0.10,r*0.55,r*0.28);
            // Floppy ear (left, drooping)
            gfx.fillStyle(0xaa7744, 1);
            gfx.fillEllipse(cx-r*0.24,cy-r*0.38,r*0.24,r*0.46);
            // Head
            gfx.fillStyle(0xcc9966, 1);
            gfx.fillCircle(cx-r*0.38,cy-r*0.08,r*0.36);
            // Snout
            gfx.fillStyle(0xddaa88, 1);
            gfx.fillEllipse(cx-r*0.56,cy+r*0.02,r*0.30,r*0.22);
            // Nose
            gfx.fillStyle(0x221111, 1);
            gfx.fillEllipse(cx-r*0.62,cy-r*0.02,r*0.15,r*0.10);
            // Nose shine
            gfx.fillStyle(0x777777, 0.4);
            gfx.fillCircle(cx-r*0.66,cy-r*0.055,r*0.030);
            // Tongue (happy panting)
            gfx.fillStyle(0xff6688, 1);
            gfx.fillEllipse(cx-r*0.64,cy+r*0.10,r*0.16,r*0.14);
            gfx.fillStyle(0xee4466, 1);
            gfx.fillRect(cx-r*0.72,cy+r*0.10,r*0.16,r*0.06);
            // Eye — sclera
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.30,cy-r*0.16,r*0.11);
            // Eye — iris (warm brown)
            gfx.fillStyle(0x7b3a10, 1);
            gfx.fillCircle(cx-r*0.30,cy-r*0.16,r*0.076);
            // Eye — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.30,cy-r*0.16,r*0.048);
            // Eye — shine
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.25,cy-r*0.19,r*0.027);
            // Cheeks
            gfx.fillStyle(0xff9966, 0.22);
            gfx.fillCircle(cx-r*0.48,cy-r*0.05,r*0.10);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Dog face from front — round head, floppy ears, tongue out
            gfx.fillStyle(0xfff3e0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Floppy ears (draw behind head)
            gfx.fillStyle(0xaa7744, 1);
            gfx.fillEllipse(cx-r*0.60, cy+r*0.08, r*0.34, r*0.56);
            gfx.fillEllipse(cx+r*0.60, cy+r*0.08, r*0.34, r*0.56);
            // Head
            gfx.fillStyle(0xcc9966, 1); gfx.fillCircle(cx, cy+r*0.08, r*0.62);
            // Snout
            gfx.fillStyle(0xddaa88, 1); gfx.fillEllipse(cx, cy+r*0.30, r*0.42, r*0.30);
            // Nose
            gfx.fillStyle(0x221111, 1); gfx.fillEllipse(cx, cy+r*0.16, r*0.20, r*0.13);
            gfx.fillStyle(0x777777, 0.4); gfx.fillCircle(cx-r*0.05, cy+r*0.13, r*0.038);
            // Tongue (sticking out)
            gfx.fillStyle(0xff6688, 1); gfx.fillEllipse(cx, cy+r*0.46, r*0.22, r*0.24);
            gfx.fillStyle(0xee4466, 1); gfx.fillRect(cx-r*0.11, cy+r*0.34, r*0.22, r*0.10);
            // Tongue center line
            gfx.lineStyle(1.5, 0xee4466, 0.8);
            gfx.beginPath(); gfx.moveTo(cx, cy+r*0.36); gfx.lineTo(cx, cy+r*0.58); gfx.strokePath();
            // Eyes
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.06, r*0.16);
            gfx.fillCircle(cx+r*0.22, cy-r*0.06, r*0.16);
            gfx.fillStyle(0x7b3a10, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.06, r*0.11);
            gfx.fillCircle(cx+r*0.22, cy-r*0.06, r*0.11);
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.22, cy-r*0.06, r*0.068);
            gfx.fillCircle(cx+r*0.22, cy-r*0.06, r*0.068);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.17, cy-r*0.10, r*0.030);
            gfx.fillCircle(cx+r*0.27, cy-r*0.10, r*0.030);
            // Cheeks
            gfx.fillStyle(0xff9966, 0.25);
            gfx.fillCircle(cx-r*0.40, cy+r*0.18, r*0.14);
            gfx.fillCircle(cx+r*0.40, cy+r*0.18, r*0.14);
        }
    },
    PONEY: {
        fr: { answer: 'PONEY', letters: ['P','O','N','E','Y','A'] },
        en: { answer: 'PONY',  letters: ['P','O','N','Y','A','E'] },
        es: { answer: 'PONI',  letters: ['P','O','N','I','A','E'] },
        drawPicture(gfx, cx, cy, r) {
            // Flowing tail (behind body)
            gfx.fillStyle(0xdd88cc, 1);
            gfx.fillEllipse(cx+r*0.56,cy+r*0.22,r*0.18,r*0.52);
            gfx.fillStyle(0xee99dd, 0.7);
            gfx.fillEllipse(cx+r*0.60,cy+r*0.19,r*0.10,r*0.36);
            // Hooves
            gfx.fillStyle(0x553322, 1);
            [[-0.34,0.68],[-0.14,0.70],[0.12,0.68],[0.34,0.66]].forEach(([dx,dy]) =>
                gfx.fillRoundedRect(cx+dx*r-r*0.07,cy+dy*r,r*0.14,r*0.11,r*0.04));
            // Legs
            gfx.fillStyle(0xcc8844, 1);
            [[-0.34,0.50],[-0.14,0.52],[0.12,0.50],[0.34,0.48]].forEach(([dx,dy]) =>
                gfx.fillRoundedRect(cx+dx*r-r*0.075,cy+dy*r,r*0.15,r*0.22,r*0.04));
            // Body
            gfx.fillStyle(0xcc8844, 1);
            gfx.fillEllipse(cx+r*0.05,cy+r*0.18,r*1.08,r*0.64);
            // Body highlight
            gfx.fillStyle(0xeebb77, 0.35);
            gfx.fillEllipse(cx+r*0.01,cy+r*0.08,r*0.56,r*0.24);
            // Neck (short — just bridges body to head)
            gfx.fillStyle(0xcc8844, 1);
            gfx.fillRoundedRect(cx-r*0.44,cy-r*0.12,r*0.30,r*0.24,r*0.10);
            // Mane (flowing, pink/purple, along neck)
            gfx.fillStyle(0xdd88cc, 1);
            gfx.fillEllipse(cx-r*0.30,cy-r*0.12,r*0.22,r*0.42);
            gfx.fillStyle(0xee99dd, 0.8);
            gfx.fillEllipse(cx-r*0.26,cy-r*0.14,r*0.12,r*0.28);
            // Head (bigger — r*0.30)
            gfx.fillStyle(0xcc8844, 1);
            gfx.fillCircle(cx-r*0.44,cy-r*0.26,r*0.30);
            // Ear (above head, not to side)
            gfx.fillStyle(0xcc8844, 1);
            gfx.fillEllipse(cx-r*0.46,cy-r*0.50,r*0.14,r*0.22);
            gfx.fillStyle(0xffbbaa, 0.7);
            gfx.fillEllipse(cx-r*0.46,cy-r*0.50,r*0.08,r*0.13);
            // Forelock (pink mane tuft on forehead)
            gfx.fillStyle(0xdd88cc, 1);
            gfx.fillEllipse(cx-r*0.36,cy-r*0.46,r*0.16,r*0.20);
            gfx.fillStyle(0xee99dd, 0.8);
            gfx.fillEllipse(cx-r*0.34,cy-r*0.48,r*0.09,r*0.12);
            // Snout
            gfx.fillStyle(0xddaa77, 1);
            gfx.fillEllipse(cx-r*0.62,cy-r*0.20,r*0.22,r*0.15);
            // Nostrils
            gfx.fillStyle(0xaa6633, 1);
            gfx.fillCircle(cx-r*0.68,cy-r*0.22,r*0.028);
            gfx.fillCircle(cx-r*0.56,cy-r*0.22,r*0.028);
            // Eye — sclera
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.50,cy-r*0.29,r*0.12);
            // Eye — iris (purple sparkly)
            gfx.fillStyle(0x8844cc, 1);
            gfx.fillCircle(cx-r*0.50,cy-r*0.29,r*0.084);
            // Eye — pupil
            gfx.fillStyle(0x111111, 1);
            gfx.fillCircle(cx-r*0.50,cy-r*0.29,r*0.052);
            // Eye — shine (two dots for sparkle)
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.45,cy-r*0.32,r*0.028);
            gfx.fillCircle(cx-r*0.50,cy-r*0.33,r*0.017);
            // Smile
            gfx.lineStyle(2, 0x994422, 1);
            gfx.beginPath(); gfx.arc(cx-r*0.59,cy-r*0.16,r*0.08,0.25,Math.PI-0.25,false); gfx.strokePath();
            // Cheeks
            gfx.fillStyle(0xff99cc, 0.28);
            gfx.fillCircle(cx-r*0.54,cy-r*0.23,r*0.09);
        },
        drawPicture2(gfx, cx, cy, r) {
            // Pony head from side — caramel, flowing rainbow mane, facing left
            gfx.fillStyle(0xffe0b0, 1); gfx.fillCircle(cx, cy, r*0.95);
            // Neck
            gfx.fillStyle(0xcc8844, 1);
            gfx.fillRoundedRect(cx+r*0.10, cy+r*0.04, r*0.34, r*0.52, r*0.12);
            // Flowing mane (wavy shapes along neck/top — pink, purple, blue)
            gfx.fillStyle(0xdd66bb, 1);
            gfx.fillEllipse(cx+r*0.14, cy-r*0.10, r*0.18, r*0.48);
            gfx.fillStyle(0x9955cc, 1);
            gfx.fillEllipse(cx+r*0.22, cy-r*0.06, r*0.16, r*0.42);
            gfx.fillStyle(0x5599ee, 1);
            gfx.fillEllipse(cx+r*0.30, cy-r*0.02, r*0.16, r*0.36);
            gfx.fillStyle(0xee99dd, 0.7);
            gfx.fillEllipse(cx+r*0.16, cy-r*0.14, r*0.10, r*0.30);
            // Head (main circle, facing left)
            gfx.fillStyle(0xcc8844, 1); gfx.fillCircle(cx-r*0.14, cy-r*0.12, r*0.46);
            // Pointy ear on top
            gfx.fillStyle(0xcc8844, 1);
            tri(gfx, cx-r*0.16, cy-r*0.50, cx-r*0.02, cy-r*0.72, cx+r*0.08, cy-r*0.52);
            gfx.fillStyle(0xffbbaa, 0.7);
            tri(gfx, cx-r*0.14, cy-r*0.52, cx-r*0.03, cy-r*0.67, cx+r*0.04, cy-r*0.54);
            // Snout (left side)
            gfx.fillStyle(0xddaa77, 1);
            gfx.fillEllipse(cx-r*0.46, cy+r*0.02, r*0.28, r*0.20);
            // Nostril dot
            gfx.fillStyle(0xaa6633, 1);
            gfx.fillCircle(cx-r*0.56, cy+r*0.04, r*0.036);
            // Eye (large, round, soulful)
            gfx.fillStyle(0xffffff, 1); gfx.fillCircle(cx-r*0.06, cy-r*0.18, r*0.15);
            gfx.fillStyle(0x8844cc, 1); gfx.fillCircle(cx-r*0.06, cy-r*0.18, r*0.105);
            gfx.fillStyle(0x111111, 1); gfx.fillCircle(cx-r*0.06, cy-r*0.18, r*0.065);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(cx-r*0.01, cy-r*0.22, r*0.028);
            gfx.fillCircle(cx-r*0.07, cy-r*0.23, r*0.017);
            // Smile
            gfx.lineStyle(2, 0x994422, 1);
            gfx.beginPath(); gfx.arc(cx-r*0.42, cy+r*0.06, r*0.09, 0.25, Math.PI-0.25, false); gfx.strokePath();
            // Forelock mane tuft on forehead
            gfx.fillStyle(0xdd66bb, 1); gfx.fillEllipse(cx-r*0.10, cy-r*0.52, r*0.14, r*0.22);
            gfx.fillStyle(0x9955cc, 0.8); gfx.fillEllipse(cx-r*0.05, cy-r*0.54, r*0.10, r*0.16);
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
