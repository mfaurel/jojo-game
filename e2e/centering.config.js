import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: '.',
    testMatch: '**/centering.spec.js',
    timeout: 30_000,
    retries: 0,
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:5173',
        ...devices['Desktop Chrome'],
        headless: true,
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
