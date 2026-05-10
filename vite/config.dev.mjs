import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const pwaOptions = {
    registerType: 'autoUpdate',
    manifest: {
        name: 'Le Château de Jolyne',
        short_name: 'Jojo',
        description: 'Jeu éducatif de l\'orthographe',
        start_url: '.',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        orientation: 'portrait',
        icons: [
            { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
    },
    workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,jpeg,jpg,webp,woff2}']
    }
};

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
    },
    server: {
        port: 8080
    },
    plugins: [
        VitePWA(pwaOptions)
    ]
});
