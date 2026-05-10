import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../firebase.js', () => ({
    auth: { currentUser: null },
    db: {},
    initFirebase: vi.fn(),
}));
vi.mock('firebase/firestore', () => ({
    doc: vi.fn(),
    getDoc: vi.fn(),
    setDoc: vi.fn(),
}));

import { applySaveSnapshot, buildSaveSnapshot } from '../SaveService.js';
import * as firebaseModule from '../firebase.js';
import { getDoc, setDoc } from 'firebase/firestore';

const SAVE_KEYS = [
    'jolyne_progress', 'jolyne_inventory', 'jolyne_equipment',
    'jolyne_memory_progress', 'jolyne_counting_progress', 'math_progress',
    'jolyne_lang', 'jolyne_easter_star', 'jolyne_child_name', 'jolyne_name_unlocked',
];

beforeEach(() => localStorage.clear());

describe('buildSaveSnapshot', () => {
    it('always includes updatedAt', () => {
        const snap = buildSaveSnapshot();
        expect(snap).toHaveProperty('updatedAt');
        expect(typeof snap.updatedAt).toBe('number');
    });

    it('captures values present in localStorage', () => {
        localStorage.setItem('jolyne_progress', '{"0":true}');
        localStorage.setItem('jolyne_lang', 'en');
        const snap = buildSaveSnapshot();
        expect(snap['jolyne_progress']).toBe('{"0":true}');
        expect(snap['jolyne_lang']).toBe('en');
    });

    it('omits keys that are absent from localStorage', () => {
        const snap = buildSaveSnapshot();
        SAVE_KEYS.forEach(k => expect(snap).not.toHaveProperty(k));
    });

    it('updatedAt is a recent timestamp', () => {
        const before = Date.now();
        const snap = buildSaveSnapshot();
        const after = Date.now();
        expect(snap.updatedAt).toBeGreaterThanOrEqual(before);
        expect(snap.updatedAt).toBeLessThanOrEqual(after);
    });
});

describe('applySaveSnapshot', () => {
    it('writes each key to localStorage', () => {
        applySaveSnapshot({
            updatedAt: 123,
            jolyne_lang: 'es',
            jolyne_progress: '{"1":true}',
        });
        expect(localStorage.getItem('jolyne_lang')).toBe('es');
        expect(localStorage.getItem('jolyne_progress')).toBe('{"1":true}');
    });

    it('does not write updatedAt to localStorage', () => {
        applySaveSnapshot({ updatedAt: 999 });
        expect(localStorage.getItem('updatedAt')).toBeNull();
    });

    it('is idempotent — applying twice gives the same result', () => {
        const data = { updatedAt: 1, jolyne_lang: 'fr' };
        applySaveSnapshot(data);
        applySaveSnapshot(data);
        expect(localStorage.getItem('jolyne_lang')).toBe('fr');
    });
});

describe('loadFromCloud', () => {
    it('returns null when no user is signed in', async () => {
        firebaseModule.auth.currentUser = null;
        const { loadFromCloud } = await import('../SaveService.js');
        const result = await loadFromCloud();
        expect(result).toBeNull();
    });

    it('returns cloud data when user is signed in and data exists', async () => {
        firebaseModule.auth.currentUser = { uid: 'user123' };
        getDoc.mockResolvedValueOnce({ exists: () => true, data: () => ({ jolyne_lang: 'en', updatedAt: 1 }) });
        const { loadFromCloud } = await import('../SaveService.js');
        const result = await loadFromCloud();
        expect(result).toEqual({ jolyne_lang: 'en', updatedAt: 1 });
    });

    it('returns null when document does not exist', async () => {
        firebaseModule.auth.currentUser = { uid: 'user123' };
        getDoc.mockResolvedValueOnce({ exists: () => false });
        const { loadFromCloud } = await import('../SaveService.js');
        const result = await loadFromCloud();
        expect(result).toBeNull();
    });
});

describe('saveToCloud', () => {
    it('does nothing when no user is signed in', async () => {
        firebaseModule.auth.currentUser = null;
        const { saveToCloud } = await import('../SaveService.js');
        await saveToCloud({ jolyne_lang: 'fr' });
        expect(setDoc).not.toHaveBeenCalled();
    });

    it('calls setDoc when user is signed in', async () => {
        firebaseModule.auth.currentUser = { uid: 'abc' };
        setDoc.mockResolvedValueOnce(undefined);
        const { saveToCloud } = await import('../SaveService.js');
        await saveToCloud({ jolyne_lang: 'fr', updatedAt: 1 });
        expect(setDoc).toHaveBeenCalled();
    });
});
