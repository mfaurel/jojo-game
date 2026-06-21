/**
 * Fullscreen button behaviour regression tests.
 *
 * Bug 1 – Triple-click focus loss:
 *   Each resize event added a fresh listener to the game-level ScaleManager
 *   without ever removing the old one. After N fullscreen toggles, N+1
 *   simultaneous scene.restart() calls fired, crashing Phaser's scene manager.
 *
 * Bug 2 – Fullscreen after SpellingMenu redirects to SpellingMenu:
 *   The SpellingMenu (and other sub-menu scenes) registered a
 *   `scale.on('resize', () => scene.restart())` listener that was never
 *   removed when the scene stopped. On the next resize, that orphaned listener
 *   called scene.restart() on the already-stopped SpellingMenu, which
 *   re-activated it.
 *
 * Fix: every scene now pairs its resize listener with a one-time 'shutdown'
 * cleanup, mirroring the pattern already used in MathDungeon.js.
 */

import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Constants – must match the Phaser game config (width: 1024, height: 768)
// ---------------------------------------------------------------------------

const GAME_W = 1024;
const GAME_H = 768;

// Game-coordinate positions of interactive elements
const FULLSCREEN_BTN  = { x: 64,                    y: 35 };
const SPELLING_BTN    = { x: GAME_W * 0.25,         y: GAME_H * 0.469 };
const SPELLING_BACK   = { x: 50,                    y: 30 };  // SpellingMenu back btn (top-left)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convert game-coordinate (x, y) to viewport pixel position.
 * Accounts for canvas offset and scaling applied by Phaser's FIT mode.
 */
async function toViewport(page, gx, gy) {
    return page.evaluate(([x, y, gw, gh]) => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return null;
        const r = canvas.getBoundingClientRect();
        return {
            x: r.left + (x / gw) * r.width,
            y: r.top  + (y / gh) * r.height,
        };
    }, [gx, gy, GAME_W, GAME_H]);
}

/** Click a Phaser-game-coordinate position. */
async function clickAt(page, gx, gy) {
    const pos = await toViewport(page, gx, gy);
    if (!pos) throw new Error(`Canvas not found while clicking (${gx}, ${gy})`);
    await page.mouse.click(pos.x, pos.y);
}

/** Wait until a named scene is the active/running scene. */
async function waitForScene(page, key, timeout = 20_000) {
    await page.waitForFunction(
        (k) => {
            const game = window.__game;
            if (!game) return false;
            return game.scene.isActive(k);
        },
        key,
        { timeout, polling: 200 },
    );
}

/**
 * Trigger a real resize event by cycling the viewport size,
 * which reliably fires `window.resize` → `game.scale.refresh()` → Phaser `resize`.
 * This simulates the resize caused by fullscreen toggle without requiring the
 * Fullscreen API (which headless browsers may restrict).
 */
async function triggerResize(page) {
    const current = page.viewportSize();
    await page.setViewportSize({ width: current.width + 1, height: current.height });
    await page.waitForTimeout(50);
    await page.setViewportSize({ width: current.width, height: current.height });
}

// ---------------------------------------------------------------------------
// Test setup
// ---------------------------------------------------------------------------

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('canvas', { timeout: 20_000 });

    // Wait until Boot/Preloader have finished and MainMenu is running
    await waitForScene(page, 'MainMenu', 25_000);

    // Small buffer for create() to finish drawing
    await page.waitForTimeout(400);
});

// ---------------------------------------------------------------------------
// Bug 1 – triple-click should not lose focus / crash the scene manager
// ---------------------------------------------------------------------------

test('fullscreen button stays interactive after 3 clicks', async ({ page }) => {
    // Click the fullscreen button three times; each click triggers the resize
    // path (fake-fullscreen CSS toggle + scale.refresh, or real fullscreen).
    for (let i = 0; i < 3; i++) {
        await clickAt(page, FULLSCREEN_BTN.x, FULLSCREEN_BTN.y);
        // Allow Phaser to process any resize / restart
        await page.waitForTimeout(350);
        // The scene must still be MainMenu after each click
        await waitForScene(page, 'MainMenu', 5_000);
    }

    // Game canvas must still be present and functional
    const canvas = await page.$('canvas');
    expect(canvas, 'canvas must still exist after 3 fullscreen clicks').not.toBeNull();

    // MainMenu must still be active
    const active = await page.evaluate(() => window.__game?.scene?.isActive('MainMenu'));
    expect(active, 'MainMenu must still be active').toBe(true);

    // SpellingMenu must NOT have been accidentally started
    const spellingActive = await page.evaluate(() => window.__game?.scene?.isActive('SpellingMenu'));
    expect(spellingActive, 'SpellingMenu must not be active').toBe(false);
});

// ---------------------------------------------------------------------------
// Bug 1 (resize variant) – rapid resize events must not stack restarts
// ---------------------------------------------------------------------------

test('MainMenu survives 3 rapid resize events without losing focus', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
        await triggerResize(page);
        await waitForScene(page, 'MainMenu', 5_000);
    }

    const active = await page.evaluate(() => window.__game?.scene?.isActive('MainMenu'));
    expect(active, 'MainMenu must still be active after 3 resizes').toBe(true);
});

// ---------------------------------------------------------------------------
// Bug 2 – fullscreen after SpellingMenu visit must not redirect to SpellingMenu
// ---------------------------------------------------------------------------

test('fullscreen after SpellingMenu visit stays on MainMenu', async ({ page }) => {
    // Navigate to SpellingMenu (button has a 500 ms camera fade before switching)
    await clickAt(page, SPELLING_BTN.x, SPELLING_BTN.y);
    await waitForScene(page, 'SpellingMenu', 8_000);

    // Return to MainMenu via the back button (top-left, no fade)
    await clickAt(page, SPELLING_BACK.x, SPELLING_BACK.y);
    await waitForScene(page, 'MainMenu', 5_000);
    await page.waitForTimeout(200);

    // Trigger a resize (as fullscreen toggle would)
    await triggerResize(page);
    await page.waitForTimeout(600);

    // SpellingMenu's orphaned listener must NOT have restarted it
    const spellingActive = await page.evaluate(() => window.__game?.scene?.isActive('SpellingMenu'));
    expect(spellingActive, 'SpellingMenu must not be active after resize').toBe(false);

    // MainMenu must still be running
    await waitForScene(page, 'MainMenu', 5_000);
});

// ---------------------------------------------------------------------------
// Bug 2 (fullscreen button variant) – click fullscreen button after
// SpellingMenu visit must stay on MainMenu
// ---------------------------------------------------------------------------

test('fullscreen button after SpellingMenu visit does not redirect to SpellingMenu', async ({ page }) => {
    // Visit SpellingMenu
    await clickAt(page, SPELLING_BTN.x, SPELLING_BTN.y);
    await waitForScene(page, 'SpellingMenu', 8_000);

    // Return to MainMenu
    await clickAt(page, SPELLING_BACK.x, SPELLING_BACK.y);
    await waitForScene(page, 'MainMenu', 5_000);
    await page.waitForTimeout(200);

    // Click fullscreen button – this is the exact user action that triggered the bug
    await clickAt(page, FULLSCREEN_BTN.x, FULLSCREEN_BTN.y);
    await page.waitForTimeout(600);

    const spellingActive = await page.evaluate(() => window.__game?.scene?.isActive('SpellingMenu'));
    expect(spellingActive, 'SpellingMenu must not be active after fullscreen click').toBe(false);

    await waitForScene(page, 'MainMenu', 5_000);
});

// ---------------------------------------------------------------------------
// Regression – other sub-menus should not be revived by a resize either
// ---------------------------------------------------------------------------

test('MemoryMenuScene resize listener is cleaned up on return to MainMenu', async ({ page }) => {
    // Click Memory button (col1, row2Y = 0.25 * 1024, 0.677 * 768)
    const memBtn = { x: GAME_W * 0.25, y: GAME_H * 0.677 };
    await clickAt(page, memBtn.x, memBtn.y);
    await waitForScene(page, 'MemoryMenuScene', 8_000);

    // Back button is also at top-left in MemoryMenuScene
    await clickAt(page, SPELLING_BACK.x, SPELLING_BACK.y);
    await waitForScene(page, 'MainMenu', 5_000);
    await page.waitForTimeout(200);

    await triggerResize(page);
    await page.waitForTimeout(600);

    const memActive = await page.evaluate(() => window.__game?.scene?.isActive('MemoryMenuScene'));
    expect(memActive, 'MemoryMenuScene must not be revived by resize').toBe(false);

    await waitForScene(page, 'MainMenu', 5_000);
});
