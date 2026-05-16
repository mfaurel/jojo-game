import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase.js';

const SAVE_KEYS = [
    'jolyne_progress',
    'jolyne_inventory',
    'jolyne_equipment',
    'jolyne_memory_progress',
    'jolyne_counting_progress',
    'math_progress',
    'jolyne_lang',
    'jolyne_easter_star',
    'jolyne_child_name',
    'jolyne_name_unlocked',
    'jolyne_achievements',
];

export function buildSaveSnapshot() {
    const snap = { updatedAt: Date.now() };
    SAVE_KEYS.forEach(k => {
        try {
            const v = localStorage.getItem(k);
            if (v !== null) snap[k] = v;
        } catch {}
    });
    return snap;
}

export function applySaveSnapshot(data) {
    const { updatedAt, ...keys } = data;
    Object.entries(keys).forEach(([k, v]) => {
        try { localStorage.setItem(k, v); } catch {}
    });
}

export async function loadFromCloud() {
    const user = auth.currentUser;
    if (!user) return null;
    try {
        const ref  = doc(db, 'users', user.uid, 'saves', 'gamestate');
        const snap = await getDoc(ref);
        return snap.exists() ? snap.data() : null;
    } catch {
        return null;
    }
}

export async function saveToCloud(data) {
    const user = auth.currentUser;
    if (!user) return;
    try {
        const ref = doc(db, 'users', user.uid, 'saves', 'gamestate');
        await setDoc(ref, data, { merge: true });
    } catch {}
}

export async function syncSave() {
    return saveToCloud(buildSaveSnapshot());
}
