import { ACHIEVEMENTS } from './AchievementService.js';
import { t } from '../data/I18n.js';

let _queueCount = 0;

export function showAchievementToast(scene, achievementId, rewardItemId) {
    const ach = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!ach) return;

    const { width } = scene.cameras.main;
    const slot   = _queueCount++;
    const panelW = 460;
    const panelH = 90;
    const startY = -(panelH / 2 + 10) + slot * (panelH + 10);
    const finalY = 55 + slot * (panelH + 10);
    const cx     = width / 2;

    const bg = scene.add.rectangle(cx, startY, panelW, panelH, 0x1a0a3e, 0.93)
        .setStrokeStyle(2, 0xffd700)
        .setDepth(200)
        .setScrollFactor(0);

    const trophy = scene.add.text(cx - panelW / 2 + 28, startY, '🏆', { fontSize: '28px' })
        .setOrigin(0.5).setDepth(201).setScrollFactor(0);

    const nameText = scene.add.text(cx - panelW / 2 + 60, startY - 14, t(ach.nameKey), {
        fontSize: '16px',
        fontFamily: 'Arial Black',
        color: '#ffd700',
    }).setOrigin(0, 0.5).setDepth(201).setScrollFactor(0);

    const descText = scene.add.text(cx - panelW / 2 + 60, startY + 12, t(ach.descKey), {
        fontSize: '12px',
        color: '#ccaaff',
        wordWrap: { width: panelW - 80 },
    }).setOrigin(0, 0.5).setDepth(201).setScrollFactor(0);

    const objs = [bg, trophy, nameText, descText];

    if (rewardItemId) {
        objs.push(
            scene.add.text(cx + panelW / 2 - 8, startY + 18, t('ach_reward_granted'), {
                fontSize: '11px',
                color: '#80ffb4',
            }).setOrigin(1, 0.5).setDepth(201).setScrollFactor(0)
        );
    }

    const dy = finalY - startY;
    objs.forEach(o => {
        scene.tweens.add({ targets: o, y: '+=' + dy, duration: 320, ease: 'Back.Out' });
    });

    scene.time.delayedCall(3500 + slot * 200, () => {
        objs.forEach(o => {
            if (o?.active) scene.tweens.add({
                targets:    o,
                alpha:      0,
                duration:   300,
                onComplete: () => { if (o?.active) o.destroy(); },
            });
        });
        _queueCount = Math.max(0, _queueCount - 1);
    });
}
