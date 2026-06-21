import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: '.',
    testMatch: '**/fullscreen.spec.js',
    timeout: 45_000,
    retries: 0,
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:5173',
        ...devices['Desktop Chrome'],
        headless: true,
        viewport: { width: 1280, height: 800 },
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'npm run dev-nolog',
        url: 'http://localhost:5173',
        reuseExistingServer: true,
        timeout: 30_000,
    },
});
