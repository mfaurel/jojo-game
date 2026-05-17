import { Scene } from 'phaser';

export class IntroScene extends Scene {
    constructor() {
        super('IntroScene');
    }

    create() {
        const cx = this.cameras.main.width  / 2;
        const cy = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor(0x000000);

        // Logo text
        const logo = this.add.text(cx, cy - 20, 'JOJOGAMES', {
            fontSize: '72px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#ffffff',
            stroke: '#4400aa',
            strokeThickness: 8,
        }).setOrigin(0.5).setAlpha(0);

        const tagline = this.add.text(cx, cy + 60, '★', {
            fontSize: '36px',
            color: '#ffcc00',
        }).setOrigin(0.5).setAlpha(0);

        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            this.tweens.killAll();
            this.cameras.main.fade(300, 0, 0, 0, false, (_cam, t) => {
                if (t >= 1) this.scene.start('Preloader');
            });
        };

        // Fade in logo, hold, fade out, then start Preloader
        this.tweens.add({
            targets: logo,
            alpha: 1,
            duration: 700,
            ease: 'Sine.Out',
            onComplete: () => {
                this.tweens.add({
                    targets: tagline,
                    alpha: 1,
                    duration: 400,
                    ease: 'Sine.Out',
                });
                this.time.delayedCall(1800, () => {
                    this.tweens.add({
                        targets: [logo, tagline],
                        alpha: 0,
                        duration: 600,
                        ease: 'Sine.In',
                        onComplete: finish,
                    });
                });
            },
        });

        // Skip on tap or any key
        this.input.once('pointerdown', finish);
        this.input.keyboard.once('keydown', finish);
    }
}
