import { beforeEach, describe, expect, it } from 'vitest';
import { getChildName, isNameUnlocked, setChildName, unlockName } from '../NameService.js';

beforeEach(() => localStorage.clear());

describe('getChildName', () => {
    it('returns "Jolyne" when nothing is stored', () => {
        expect(getChildName()).toBe('Jolyne');
    });

    it('returns the stored name', () => {
        localStorage.setItem('jolyne_child_name', 'Alice');
        expect(getChildName()).toBe('Alice');
    });

    it('truncates names longer than 20 characters', () => {
        localStorage.setItem('jolyne_child_name', 'A'.repeat(25));
        expect(getChildName()).toHaveLength(20);
    });
});

describe('setChildName', () => {
    it('persists the name to localStorage', () => {
        setChildName('Emma');
        expect(getChildName()).toBe('Emma');
    });

    it('trims surrounding whitespace', () => {
        setChildName('  Léa  ');
        expect(getChildName()).toBe('Léa');
    });

    it('truncates to 20 characters', () => {
        setChildName('A'.repeat(30));
        expect(getChildName()).toHaveLength(20);
    });
});

describe('isNameUnlocked / unlockName', () => {
    it('returns false before unlocking', () => {
        expect(isNameUnlocked()).toBe(false);
    });

    it('returns true after unlockName()', () => {
        unlockName();
        expect(isNameUnlocked()).toBe(true);
    });
});
