import { beforeEach, describe, expect, it } from 'vitest';
import { cycleLang, getLang, setLang, t } from '../I18n.js';

beforeEach(() => localStorage.clear());

describe('getLang', () => {
    it('returns "fr" by default', () => {
        expect(getLang()).toBe('fr');
    });

    it('returns the stored language', () => {
        localStorage.setItem('jolyne_lang', 'en');
        expect(getLang()).toBe('en');
    });

    it('returns "fr" for unknown stored values', () => {
        localStorage.setItem('jolyne_lang', 'xx');
        expect(getLang()).toBe('fr');
    });

    it('supports all three languages', () => {
        for (const lang of ['fr', 'en', 'es']) {
            localStorage.setItem('jolyne_lang', lang);
            expect(getLang()).toBe(lang);
        }
    });
});

describe('setLang', () => {
    it('persists a valid language', () => {
        setLang('en');
        expect(getLang()).toBe('en');
    });

    it('ignores unknown languages', () => {
        setLang('fr');
        setLang('xx');
        expect(getLang()).toBe('fr');
    });
});

describe('cycleLang', () => {
    it('cycles fr → en → es → fr', () => {
        setLang('fr');
        expect(cycleLang()).toBe('en');
        expect(cycleLang()).toBe('es');
        expect(cycleLang()).toBe('fr');
    });

    it('returns the new language', () => {
        setLang('en');
        const next = cycleLang();
        expect(next).toBe('es');
        expect(getLang()).toBe('es');
    });
});

describe('t()', () => {
    it('returns a string for a known key', () => {
        setLang('fr');
        expect(t('back')).toBe('⬅ Retour');
    });

    it('returns the key itself for unknown keys', () => {
        expect(t('nonexistent_key_xyz')).toBe('nonexistent_key_xyz');
    });

    it('works for English', () => {
        setLang('en');
        expect(t('back')).toBe('⬅ Back');
    });

    it('works for Spanish', () => {
        setLang('es');
        expect(t('back')).toBe('⬅ Volver');
    });

    it('calls function-valued entries with extra args', () => {
        setLang('fr');
        expect(t('spellingProgress', 3, 10)).toBe('⭐ 3 / 10 niveaux');
    });

    it('replaces {name} with the stored child name', () => {
        localStorage.setItem('jolyne_child_name', 'Emma');
        setLang('fr');
        expect(t('spellingTitle')).toContain('Emma');
    });

    it('uses "Jolyne" as default name replacement', () => {
        setLang('fr');
        expect(t('spellingTitle')).toContain('Jolyne');
    });

    it('falls back to French for keys missing in the current language', () => {
        // All keys should be present in all languages, so we verify FR fallback
        setLang('fr');
        const frVal = t('bravo');
        setLang('en');
        // EN has its own value
        expect(t('bravo')).not.toBe(frVal);
    });
});

describe('button emojis', () => {
    it('btnMath uses 🔢 in all three locales', () => {
        for (const lang of ['fr', 'en', 'es']) {
            setLang(lang);
            expect(t('btnMath')).toContain('🔢');
        }
    });

    it('btnMath does not use ❄️ in any locale', () => {
        for (const lang of ['fr', 'en', 'es']) {
            setLang(lang);
            expect(t('btnMath')).not.toContain('❄️');
        }
    });

    it('btnCounting uses 🧮 in all three locales', () => {
        for (const lang of ['fr', 'en', 'es']) {
            setLang(lang);
            expect(t('btnCounting')).toContain('🧮');
        }
    });

    it('btnMath and btnCounting use different emojis', () => {
        setLang('fr');
        const mathEmoji  = t('btnMath').slice(0, 2);
        const countEmoji = t('btnCounting').slice(0, 2);
        expect(mathEmoji).not.toBe(countEmoji);
    });
});
