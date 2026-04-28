import { TILE_SIZE, MAP_COLS, MAP_ROWS, MAP_GRID, TILE, tileToPx } from '../data/MapData.js';

export class PlayerController {
    constructor(scene, startCol, startRow) {
        this.scene     = scene;
        this.col       = startCol;
        this.row       = startRow;
        this.isMoving  = false;
        this.container = null;
        this._buildSprite();
        this._setupInput();
    }

    _buildSprite() {
        const gfx = this.scene.add.graphics();

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

        const pos = tileToPx(this.col, this.row);
        this.container = this.scene.add.container(pos.x, pos.y, [gfx]);
        this.container.setDepth(10);
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
        const buttons = [
            { symbol: '▲', dx:  0, dy: -1, bx: 80,  by: 660 },
            { symbol: '▼', dx:  0, dy:  1, bx: 80,  by: 718 },
            { symbol: '◄', dx: -1, dy:  0, bx: 22,  by: 689 },
            { symbol: '►', dx:  1, dy:  0, bx: 138, by: 689 },
        ];

        buttons.forEach(({ symbol, dx, dy, bx, by }) => {
            const bg = this.scene.add.rectangle(bx, by, 50, 50, 0x000000, 0.45)
                .setScrollFactor(0)
                .setDepth(20)
                .setInteractive()
                .on('pointerdown', () => this.tryMove(dx, dy))
                .on('pointerover', () => bg.setFillStyle(0x222222, 0.7))
                .on('pointerout',  () => bg.setFillStyle(0x000000, 0.45));

            this.scene.add.text(bx, by, symbol, {
                fontSize: '24px',
                color: '#ffffff',
            }).setOrigin(0.5).setScrollFactor(0).setDepth(21);
        });
    }

    tryMove(dx, dy) {
        if (this.isMoving) return;
        const newCol = this.col + dx;
        const newRow = this.row + dy;

        if (newCol < 0 || newCol >= MAP_COLS || newRow < 0 || newRow >= MAP_ROWS) return;

        const targetTile = MAP_GRID[newRow][newCol];

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
