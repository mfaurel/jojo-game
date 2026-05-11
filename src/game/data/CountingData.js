const SAVE_KEY = 'jolyne_counting_progress';

export const COUNTING_LEVELS = [
    // 2 types, count 1–3, 4 s — easy intro
    {
        id: 0, types: 2, maxCount: 3, showTime: 4000,
        pool: ['CHAT', 'OURS', 'LAPIN', 'VACHE', 'CHIEN'],
    },
    // 2 types, count 1–4, 4 s — more pieces
    {
        id: 1, types: 2, maxCount: 4, showTime: 4000,
        pool: ['VACHE', 'LAPIN', 'PONEY', 'POULE', 'CHIEN'],
    },
    // 3 types, count 1–4, 4 s — one more kind
    {
        id: 2, types: 3, maxCount: 4, showTime: 4000,
        pool: ['CHAT', 'OURS', 'LAPIN', 'VACHE', 'CHIEN'],
    },
    // 3 types, fruits, count 1–5, 4 s
    {
        id: 3, types: 3, maxCount: 5, showTime: 4000,
        pool: ['KIWI', 'POMME', 'POIRE', 'FIGUE', 'PRUNE'],
    },
    // 3 types, mixed, count 1–5, 3 s — less time
    {
        id: 4, types: 3, maxCount: 5, showTime: 3000,
        pool: ['CHAT', 'OURS', 'LAPIN', 'KIWI', 'POMME', 'POIRE'],
    },
];

export function getCountingProgress() {
    try {
        return JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
    } catch {
        return {};
    }
}

export function saveCountingProgress(levelId) {
    const p = getCountingProgress();
    p[levelId] = true;
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(p));
    } catch { }
}

export function isCountingUnlocked(levelId) {
    if (levelId === 0) return true;
    return !!getCountingProgress()[levelId - 1];
}
