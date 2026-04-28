import { TILE_SIZE, MAP_GRID, TILE, tileToPx } from '../data/MapData.js';
import { WORDS } from '../data/WordData.js';
import { audio } from './AudioManager.js';

export class GateManager {
    constructor(scene, gateDefinitions) {
        this.scene = scene;
        this.gates = [];
        gateDefinitions.forEach(def => this.gates.push(this._createGate(def)));
    }

    _createGate(def) {
        const pos = tileToPx(def.col, def.row);
        const wordDef = WORDS[def.wordKey];

        // Portcullis graphic
        const gfx = this.scene.add.graphics();
        this._drawPortcullis(gfx, pos.x, pos.y, false);
        gfx.setDepth(5);

        // Small picture preview above the gate
        const previewGfx = this.scene.add.graphics();
        wordDef.drawPicture(previewGfx, pos.x, pos.y - 40, 22);
        previewGfx.setDepth(6);

        // "???" hint label
        const hintText = this.scene.add.text(
            pos.x, pos.y + TILE_SIZE * 0.42,
            '?'.repeat(def.wordKey.length),
            { fontSize: '12px', color: '#ffe066', stroke: '#000', strokeThickness: 2 }
        ).setOrigin(0.5).setDepth(6);

        return {
            col: def.col,
            row: def.row,
            wordKey: def.wordKey,
            unlocked: false,
            gfx,
            previewGfx,
            hintText,
            posX: pos.x,
            posY: pos.y,
        };
    }

    _drawPortcullis(gfx, cx, cy, unlocked) {
        gfx.clear();
        const hw = TILE_SIZE / 2;

        if (!unlocked) {
            // Iron gate frame
            gfx.fillStyle(0x2a2a3a, 1);
            gfx.fillRect(cx - hw, cy - hw, TILE_SIZE, TILE_SIZE);
            // Vertical bars
            gfx.fillStyle(0x4a4a5a, 1);
            for (let i = 0; i < 5; i++) {
                gfx.fillRect(cx - hw + 4 + i * 11, cy - hw + 2, 5, TILE_SIZE - 4);
            }
            // Horizontal cross bars
            gfx.fillStyle(0x3a3a4a, 1);
            gfx.fillRect(cx - hw + 2, cy - 12, TILE_SIZE - 4, 5);
            gfx.fillRect(cx - hw + 2, cy + 8,  TILE_SIZE - 4, 5);
            // Gold lock
            gfx.fillStyle(0xffd700, 1);
            gfx.fillCircle(cx, cy, 8);
            gfx.fillStyle(0x2a2a3a, 1);
            gfx.fillCircle(cx, cy, 5);
        }
        // When unlocked the gate graphic is removed (alpha 0)
    }

    getGateAt(col, row) {
        return this.gates.find(g => g.col === col && g.row === row) || null;
    }

    triggerChallenge(gate) {
        // Bounce gate
        this.scene.tweens.add({
            targets: gate.gfx,
            x: gate.gfx.x + 7,
            duration: 55,
            yoyo: true,
            repeat: 2,
            ease: 'Sine.InOut',
        });

        this.scene.scene.launch('SpellingScene', {
            wordKey:   gate.wordKey,
            onSuccess: () => this._unlockGate(gate),
        });
        this.scene.scene.pause('CastleScene');
    }

    _unlockGate(gate) {
        gate.unlocked = true;
        MAP_GRID[gate.row][gate.col] = TILE.FLOOR;

        audio.playGateUnlock();

        // Slide gate up and fade out
        this.scene.tweens.add({
            targets: gate.gfx,
            y: gate.gfx.y - TILE_SIZE,
            alpha: 0,
            duration: 450,
            ease: 'Back.In',
            onComplete: () => gate.gfx.destroy(),
        });

        this.scene.tweens.add({
            targets: [gate.previewGfx, gate.hintText],
            alpha: 0,
            duration: 300,
            onComplete: () => {
                gate.previewGfx.destroy();
                gate.hintText.destroy();
            }
        });

        this._spawnParticles(gate.posX, gate.posY);
        this.scene.onGateUnlocked();
    }

    _spawnParticles(cx, cy) {
        const colors = [0xffd700, 0xff69b4, 0xffffff, 0x88ff88, 0xff8844];
        for (let i = 0; i < 14; i++) {
            const angle = (i / 14) * Math.PI * 2;
            const speed = 55 + Math.random() * 75;
            const g = this.scene.add.graphics();
            g.fillStyle(colors[i % colors.length], 1);
            g.fillCircle(0, 0, 5 + Math.random() * 4);
            g.setPosition(cx, cy).setDepth(15);

            this.scene.tweens.add({
                targets: g,
                x: cx + Math.cos(angle) * speed,
                y: cy + Math.sin(angle) * speed,
                alpha: 0,
                scaleX: 0.2,
                scaleY: 0.2,
                duration: 500 + Math.random() * 300,
                ease: 'Quad.Out',
                onComplete: () => g.destroy(),
            });
        }
    }
}
