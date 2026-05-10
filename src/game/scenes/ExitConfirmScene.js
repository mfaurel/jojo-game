import { Scene } from 'phaser';
import { App } from '@capacitor/app';
import { t } from '../data/I18n.js';

export class ExitConfirmScene extends Scene {
    constructor() {
        super('ExitConfirmScene');
    }

    create() {
        const { width, height } = this.cameras.main;
        const cx = width / 2;
        const cy = height / 2;

        this.add.rectangle(cx, cy, width, height, 0x000000, 0.75).setDepth(0);

        const panelW = 340;
        const panelH = 180;
        const g = this.add.graphics().setDepth(1);
        g.fillStyle(0x1a0a2e, 1);
        g.fillRoundedRect(cx - panelW / 2, cy - panelH / 2, panelW, panelH, 16);
        g.lineStyle(3, 0xffd700, 1);
        g.strokeRoundedRect(cx - panelW / 2, cy - panelH / 2, panelW, panelH, 16);

        this.add.text(cx, cy - 40, t('confirmQuit'), {
            fontSize: '26px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5).setDepth(2);

        this._makeButton(cx - 75, cy + 35, t('confirmYes'), 0x228822, () => {
            try { App.exitApp(); } catch {}
        });

        this._makeButton(cx + 75, cy + 35, t('confirmNo'), 0x882222, () => {
            this.scene.stop('ExitConfirmScene');
        });
    }

    _makeButton(x, y, label, color, onClick) {
        const bg = this.add.rectangle(x, y, 120, 52, color, 1)
            .setDepth(2)
            .setInteractive({ useHandCursor: true });

        this.add.text(x, y, label, {
            fontSize: '22px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 3,
        }).setOrigin(0.5).setDepth(3);

        bg.on('pointerover', () => bg.setScale(1.08));
        bg.on('pointerout',  () => bg.setScale(1));
        bg.on('pointerup',   onClick);
    }
}
