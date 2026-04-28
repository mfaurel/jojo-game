// Generates all sounds programmatically via Web Audio API — no audio files needed.
class AudioManager {
    constructor() {
        this._ctx = null;
    }

    _ctx_get() {
        if (!this._ctx) {
            this._ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        // Resume if suspended (browser autoplay policy)
        if (this._ctx.state === 'suspended') {
            this._ctx.resume();
        }
        return this._ctx;
    }

    _tone(frequency, duration, type = 'sine', gain = 0.25, delay = 0) {
        try {
            const ctx = this._ctx_get();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            osc.type = type;
            osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
            gainNode.gain.setValueAtTime(0.001, ctx.currentTime + delay);
            gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + delay + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration / 1000);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + duration / 1000 + 0.05);
        } catch (e) {
            // Silently fail if audio is unavailable
        }
    }

    playLetterTap() {
        this._tone(520, 80, 'sine', 0.2);
    }

    playBackspace() {
        this._tone(300, 100, 'sine', 0.15);
    }

    playWrong() {
        this._tone(280, 120, 'sine', 0.2, 0);
        this._tone(220, 180, 'sine', 0.2, 0.13);
    }

    playGateUnlock() {
        // Ascending C5-E5-G5-C6 arpeggio
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => this._tone(freq, 200, 'sine', 0.28, i * 0.13));
    }

    playVictory() {
        // Happy 8-note melody (C-C-G-G-A-A-G)
        const melody = [
            { f: 523, d: 180 }, { f: 523, d: 180 },
            { f: 784, d: 180 }, { f: 784, d: 180 },
            { f: 880, d: 180 }, { f: 880, d: 180 },
            { f: 784, d: 380 }, { f: 0, d: 100 },
            { f: 699, d: 180 }, { f: 699, d: 180 },
            { f: 659, d: 180 }, { f: 659, d: 180 },
            { f: 587, d: 180 }, { f: 587, d: 180 },
            { f: 523, d: 500 },
        ];
        let t = 0;
        melody.forEach(({ f, d }) => {
            if (f > 0) this._tone(f, d * 0.85, 'sine', 0.28, t / 1000);
            t += d + 20;
        });
    }
}

export const audio = new AudioManager();
