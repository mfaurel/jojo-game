const SAVE_KEY = 'jolyne_memory_progress';

// cardSize and gap are pre-computed per grid type for a 1024×768 canvas
export const MEMORY_LEVELS = [
    // ── 4×2 (4 pairs = 8 cards) ──────────────────────────────────────────
    { id: 0, cols: 4, rows: 2, cardSize: 160, gap: 18, words: ['CHAT', 'OURS', 'LAPIN', 'VACHE'] },
    { id: 1, cols: 4, rows: 2, cardSize: 160, gap: 18, words: ['KIWI', 'POMME', 'POIRE', 'PRUNE'] },
    { id: 2, cols: 4, rows: 2, cardSize: 160, gap: 18, words: ['PAPA', 'MAMAN', 'BEBE', 'PAPI'] },
    // ── 4×3 (6 pairs = 12 cards) ─────────────────────────────────────────
    { id: 3, cols: 4, rows: 3, cardSize: 140, gap: 16, words: ['CHAT', 'OURS', 'LAPIN', 'VACHE', 'CHIEN', 'PONEY'] },
    { id: 4, cols: 4, rows: 3, cardSize: 140, gap: 16, words: ['KIWI', 'POMME', 'POIRE', 'PRUNE', 'FIGUE', 'ROI'] },
    { id: 5, cols: 4, rows: 3, cardSize: 140, gap: 16, words: ['PAPA', 'MAMAN', 'BEBE', 'PAPI', 'TATA', 'LUNE'] },
    // ── 4×4 (8 pairs = 16 cards) ─────────────────────────────────────────
    { id: 6, cols: 4, rows: 4, cardSize: 118, gap: 14, words: ['CHAT', 'OURS', 'LAPIN', 'VACHE', 'CHIEN', 'PONEY', 'LION', 'LOUP'] },
    { id: 7, cols: 4, rows: 4, cardSize: 118, gap: 14, words: ['KIWI', 'POMME', 'POIRE', 'PRUNE', 'FIGUE', 'ROI', 'LUNE', 'PAIN'] },
    { id: 8, cols: 4, rows: 4, cardSize: 118, gap: 14, words: ['PAPA', 'MAMAN', 'BEBE', 'PAPI', 'TATA', 'CHAT', 'OURS', 'LAPIN'] },
];

export function getMemoryProgress() {
    try {
        return JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
    } catch {
        return {};
    }
}

export function saveMemoryProgress(levelId) {
    const p = getMemoryProgress();
    p[levelId] = true;
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(p));
    } catch { }
}

export function isMemoryUnlocked(levelId) {
    // First level of each row (0, 3, 6) is always unlocked
    if (levelId === 0 || levelId === 3 || levelId === 6) return true;
    return !!getMemoryProgress()[levelId - 1];
}
