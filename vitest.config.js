import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        clearMocks: true,
        coverage: {
            provider: 'v8',
            include: ['src/game/data/**', 'src/game/systems/**', 'src/game/services/**'],
            exclude: ['src/game/services/firebase.js', 'src/game/services/AdService.js', 'src/game/services/IAPService.js', 'src/game/services/AuthService.js', 'src/game/services/BackButtonHandler.js'],
        },
    },
});
