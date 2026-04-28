import { TILE_SIZE, MAP_COLS, MAP_ROWS, TILE } from '../data/MapData.js';

export class MapBuilder {
    constructor(scene) {
        this.scene = scene;
        this.gfx = scene.add.graphics();
    }

    build(mapGrid) {
        for (let row = 0; row < MAP_ROWS; row++) {
            for (let col = 0; col < MAP_COLS; col++) {
                const type = mapGrid[row][col];
                const px = col * TILE_SIZE;
                const py = row * TILE_SIZE;
                
                // Try to use a sprite if the texture is loaded, otherwise fallback to graphics
                if (!this._tryDrawSprite(type, px, py)) {
                    this._drawProcedural(type, px, py);
                }
            }
        }
        this._drawOuterBorder();
    }

    _tryDrawSprite(type, px, py) {
        const textureKey = this._getTextureKey(type);
        if (textureKey && this.scene.textures.exists(textureKey)) {
            // Anchor at top-left to match rect drawing
            this.scene.add.image(px, py, textureKey).setOrigin(0).setDisplaySize(TILE_SIZE, TILE_SIZE);
            return true;
        }
        return false;
    }

    _getTextureKey(type) {
        switch (type) {
            case TILE.FLOOR: return 'tile_floor';
            case TILE.WALL:  return 'tile_wall';
            case TILE.GOAL:  return 'tile_goal';
            default:         return null;
        }
    }

    _drawProcedural(type, px, py) {
        switch (type) {
            case TILE.FLOOR:
            case TILE.START:
                this._drawFloor(px, py);
                break;
            case TILE.WALL:
                this._drawWall(px, py);
                break;
            case TILE.GOAL:
                this._drawGoal(px, py);
                break;
            case TILE.GATE:
                this._drawFloor(px, py);
                break;
        }
    }

    _drawFloor(px, py) {
        const ts = TILE_SIZE;
        // Stone floor: beige base
        this.gfx.fillStyle(0xcbbf95, 1);
        this.gfx.fillRect(px, py, ts, ts);
        // Grout lines
        this.gfx.lineStyle(1, 0xaa9966, 0.7);
        this.gfx.strokeRect(px + 1, py + 1, ts - 2, ts - 2);
        // Center divider
        this.gfx.beginPath();
        this.gfx.moveTo(px + ts / 2, py);
        this.gfx.lineTo(px + ts / 2, py + ts);
        this.gfx.strokePath();
    }

    _drawWall(px, py) {
        const ts = TILE_SIZE;
        // Dark grey stone base
        this.gfx.fillStyle(0x555566, 1);
        this.gfx.fillRect(px, py, ts, ts);
        // Brick rows
        this.gfx.fillStyle(0x44445a, 1);
        this.gfx.fillRect(px, py + 20, ts, 3);
        this.gfx.fillRect(px, py + 43, ts, 3);
        // Alternating brick joints
        this.gfx.fillRect(px + ts / 2, py,      2, 20);
        this.gfx.fillRect(px + ts / 4, py + 23, 2, 20);
        this.gfx.fillRect(px + 3 * ts / 4, py + 23, 2, 20);
        this.gfx.fillRect(px + ts / 2, py + 46, 2, 18);
        // Highlight edge
        this.gfx.fillStyle(0x6666aa, 0.4);
        this.gfx.fillRect(px, py, ts, 2);
        this.gfx.fillRect(px, py, 2, ts);
    }

    _drawGoal(px, py) {
        const ts = TILE_SIZE;
        // Purple/gold throne room floor
        this.gfx.fillStyle(0x6a1a9a, 1);
        this.gfx.fillRect(px, py, ts, ts);
        // Gold star outline
        this.gfx.lineStyle(3, 0xffd700, 1);
        this.gfx.strokeRect(px + 4, py + 4, ts - 8, ts - 8);
        // Small gold center diamond
        this.gfx.fillStyle(0xffd700, 0.6);
        this.gfx.fillRect(px + ts / 2 - 6, py + ts / 2 - 6, 12, 12);
    }

    _drawOuterBorder() {
        this.gfx.lineStyle(3, 0x222233, 1);
        this.gfx.strokeRect(0, 0, MAP_COLS * TILE_SIZE, MAP_ROWS * TILE_SIZE);
    }
}
