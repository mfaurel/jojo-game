/**
 * Multi-resolution canvas centering tests for Le Château de Jolyne.
 *
 * Verifies that Phaser's canvas is horizontally centered (±5 px) at all
 * target viewport sizes, and that the canvas has non-zero dimensions
 * (i.e., is not clipped away entirely).
 *
 * Phaser scale config: Scale.EXPAND + Scale.CENTER_BOTH
 * CSS layout: body > #app (flex center) > #game-container (100%/100%) > canvas
 */

import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Viewport fixtures
// ---------------------------------------------------------------------------

const VIEWPORTS = [
    { label: '1024x768 (tablet landscape)',    width: 1024, height: 768 },
    { label: '1280x1024 (desktop)',             width: 1280, height: 1024 },
    { label: '1600x1200 (large desktop)',       width: 1600, height: 1200 },
    { label: '1920x1080 (full-HD widescreen)',  width: 1920, height: 1080 },
    { label: '768x1024 (tablet portrait)',      width: 768,  height: 1024 },
    { label: '390x844 (iPhone 14 portrait)',    width: 390,  height: 844 },
    { label: '844x390 (iPhone 14 landscape)',   width: 844,  height: 390 },
];

// ---------------------------------------------------------------------------
// Helper: measure canvas geometry inside the page
// ---------------------------------------------------------------------------

async function getCanvasInfo(page) {
    return page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const canvasCenterX = rect.left + rect.width / 2;
        const viewportCenterX = vw / 2;
        return {
            left:           rect.left,
            top:            rect.top,
            width:          rect.width,
            height:         rect.height,
            canvasCenterX,
            viewportCenterX,
            offsetX:        canvasCenterX - viewportCenterX,
            viewportWidth:  vw,
            viewportHeight: vh,
        };
    });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

for (const vp of VIEWPORTS) {
    test(`canvas is horizontally centered at ${vp.label}`, async ({ page }) => {
        // Set viewport first so Phaser sees the right size on load
        await page.setViewportSize({ width: vp.width, height: vp.height });

        await page.goto('/');

        // Wait for the Phaser canvas to appear (Boot scene creates it)
        await page.waitForSelector('canvas', { timeout: 15_000 });

        // Give Phaser time to finish its scale/resize handling
        await page.waitForTimeout(1_500);

        const info = await getCanvasInfo(page);

        expect(info, 'canvas element must exist').not.toBeNull();

        // Canvas must have positive dimensions (not clipped)
        expect(info.width,  'canvas width must be > 0').toBeGreaterThan(0);
        expect(info.height, 'canvas height must be > 0').toBeGreaterThan(0);

        // Horizontal centering: |canvasCenterX - viewportCenterX| <= 5 px
        expect(
            Math.abs(info.offsetX),
            `horizontal center offset (${info.offsetX.toFixed(1)}px) must be ≤ 5px ` +
            `[canvas ${info.width}x${info.height} @ left=${info.left.toFixed(1)}, ` +
            `viewport ${info.viewportWidth}x${info.viewportHeight}]`
        ).toBeLessThanOrEqual(5);
    });
}
