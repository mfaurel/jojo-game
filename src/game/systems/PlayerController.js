import { TILE_SIZE, MAP_COLS, MAP_ROWS, TILE, tileToPx } from '../data/MapData.js';
import { getEquipment } from '../data/LevelData.js';
import { ITEMS } from '../data/ItemData.js';
import { audio } from './AudioManager.js';

export class PlayerController {
    constructor(scene, startCol, startRow, grid) {
        this.scene     = scene;
        this.col       = startCol;
        this.row       = startRow;
        this.grid      = grid;
        this.isMoving  = false;
        this.container = null;
        this._buildSprite();
        this._setupInput();
    }

    _buildSprite() {
        let visual;

        if (this.scene.textures.exists('jojo_pixel')) {
            visual = this.scene.add.image(0, 0, 'jojo_pixel')
                .setDisplaySize(TILE_SIZE * 0.85, TILE_SIZE * 0.85);
            const equip    = getEquipment();
            const skinItem = ITEMS.find(i => i.id === (equip.skin ?? 'skin_default'));
            if (skinItem?.tint) visual.setTint(skinItem.tint);
        } else {
            const gfx = this.scene.add.graphics();
            this._drawProceduralPlayer(gfx);
            visual = gfx;
        }

        const pos = tileToPx(this.col, this.row);
        this.container = this.scene.add.container(pos.x, pos.y, [visual]);
        this.container.setDepth(10);

        // Bob the visual child so the container's y stays clean for grid movement
        this.scene.tweens.add({
            targets: visual,
            y: -4,
            duration: 400,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.InOut',
        });
    }

    _drawProceduralPlayer(gfx) {
        // Pink dress (oval body)
        gfx.fillStyle(0xff80b4, 1);
        gfx.fillEllipse(0, 10, 46, 34);

        // Head (beige/peach)
        gfx.fillStyle(0xffe4b5, 1);
        gfx.fillCircle(0, -16, 15);

        // Crown base (gold)
        gfx.fillStyle(0xffd700, 1);
        gfx.fillRect(-13, -35, 26, 7);

        // Crown left point
        gfx.beginPath();
        gfx.moveTo(-11, -35); gfx.lineTo(-14, -47); gfx.lineTo(-5, -35);
        gfx.closePath(); gfx.fillPath();

        // Crown center point
        gfx.beginPath();
        gfx.moveTo(-3, -35); gfx.lineTo(0, -50); gfx.lineTo(3, -35);
        gfx.closePath(); gfx.fillPath();

        // Crown right point
        gfx.beginPath();
        gfx.moveTo(11, -35); gfx.lineTo(14, -47); gfx.lineTo(5, -35);
        gfx.closePath(); gfx.fillPath();

        // Crown jewel
        gfx.fillStyle(0xff4466, 1);
        gfx.fillCircle(0, -31, 3);

        // Eyes
        gfx.fillStyle(0x553311, 1);
        gfx.fillCircle(-5, -18, 3);
        gfx.fillCircle(5, -18, 3);

        // Eye shine
        gfx.fillStyle(0xffffff, 1);
        gfx.fillCircle(-4, -20, 1.2);
        gfx.fillCircle(6, -20, 1.2);

        // Smile arc
        gfx.lineStyle(2, 0x553311, 1);
        gfx.beginPath();
        gfx.arc(0, -14, 5, 0.15, Math.PI - 0.15, false);
        gfx.strokePath();
    }

    _setupInput() {
        const kb = this.scene.input.keyboard;

        // Arrow keys
        kb.on('keydown-UP',    () => this.tryMove( 0, -1));
        kb.on('keydown-DOWN',  () => this.tryMove( 0,  1));
        kb.on('keydown-LEFT',  () => this.tryMove(-1,  0));
        kb.on('keydown-RIGHT', () => this.tryMove( 1,  0));

        // WASD
        kb.on('keydown-W', () => this.tryMove( 0, -1));
        kb.on('keydown-S', () => this.tryMove( 0,  1));
        kb.on('keydown-A', () => this.tryMove(-1,  0));
        kb.on('keydown-D', () => this.tryMove( 1,  0));

        this._buildDPad();
    }

    _buildDPad() {
        const cx = 95, cy = 678;
        const step = 56;
        const btnSize = 52;

        // Cross-shaped background (GameBoy style)
        const cross = this.scene.add.graphics().setScrollFactor(0).setDepth(19);
        cross.fillStyle(0x111122, 0.85);
        cross.fillRoundedRect(cx - btnSize / 2, cy - step - btnSize / 2, btnSize, step * 2 + btnSize, 10);
        cross.fillRoundedRect(cx - step - btnSize / 2, cy - btnSize / 2, step * 2 + btnSize, btnSize, 10);
        cross.fillStyle(0x2a2a44, 1);
        cross.fillCircle(cx, cy, 14);

        const directions = [
            { dx:  0, dy: -1, bx: cx,        by: cy - step },
            { dx:  0, dy:  1, bx: cx,        by: cy + step },
            { dx: -1, dy:  0, bx: cx - step, by: cy        },
            { dx:  1, dy:  0, bx: cx + step, by: cy        },
        ];

        directions.forEach(({ dx, dy, bx, by }) => {
            const btn = this.scene.add.rectangle(bx, by, btnSize, btnSize, 0x1a1a33, 0.01)
                .setScrollFactor(0)
                .setDepth(20)
                .setInteractive()
                .on('pointerdown', () => { this.tryMove(dx, dy); btn.setFillStyle(0x4455aa, 0.55); })
                .on('pointerup',   () => btn.setFillStyle(0x1a1a33, 0.01))
                .on('pointerout',  () => btn.setFillStyle(0x1a1a33, 0.01))
                .on('pointerover', () => btn.setFillStyle(0x334466, 0.35));

            const g = this.scene.add.graphics().setScrollFactor(0).setDepth(21);
            g.fillStyle(0xffffff, 0.85);
            const s = 13;
            if (dy === -1) {
                g.fillTriangle(bx, by - s, bx - s, by + s * 0.6, bx + s, by + s * 0.6);
            } else if (dy === 1) {
                g.fillTriangle(bx, by + s, bx - s, by - s * 0.6, bx + s, by - s * 0.6);
            } else if (dx === -1) {
                g.fillTriangle(bx - s, by, bx + s * 0.6, by - s, bx + s * 0.6, by + s);
            } else {
                g.fillTriangle(bx + s, by, bx - s * 0.6, by - s, bx - s * 0.6, by + s);
            }
        });
    }

    tryMove(dx, dy) {
        if (this.isMoving) return;
        const newCol = this.col + dx;
        const newRow = this.row + dy;

        if (newCol < 0 || newCol >= MAP_COLS || newRow < 0 || newRow >= MAP_ROWS) return;

        const targetTile = this.grid[newRow][newCol];

        if (targetTile === TILE.WALL) return;

        if (targetTile === TILE.GATE) {
            const gate = this.scene.gateManager.getGateAt(newCol, newRow);
            if (gate && !gate.unlocked) {
                this.scene.gateManager.triggerChallenge(gate);
                return;
            }
        }

        if (targetTile === TILE.GOAL) {
            this._moveTo(newCol, newRow, () => this.scene.onGoalReached());
            return;
        }

        this._moveTo(newCol, newRow);
    }

    _moveTo(col, row, onComplete) {
        this.isMoving = true;
        this.col = col;
        this.row = row;
        const pos = tileToPx(col, row);
        this.scene.tweens.add({
            targets: this.container,
            x: pos.x,
            y: pos.y,
            duration: 160,
            ease: 'Linear',
            onComplete: () => {
                audio.playStep();
                this.isMoving = false;
                if (onComplete) onComplete();
            }
        });
    }

    // No polling needed — all input handled via keydown events + D-pad pointerdown
    update() {}

    destroy() {
        this.container.destroy();
    }
}
