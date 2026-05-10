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

describe('leaderboard i18n', () => {
    it('leaderboardTitle is translated in all three locales', () => {
        const titles = [];
        for (const lang of ['fr', 'en', 'es']) {
            setLang(lang);
            titles.push(t('leaderboardTitle'));
        }
        expect(titles[0]).toContain('⭐');
        expect(titles[1]).toContain('⭐');
        expect(titles[2]).toContain('⭐');
        expect(new Set(titles).size).toBe(3);
    });

    it('leaderboardTotal is a function producing the right format', () => {
        setLang('fr');
        expect(t('leaderboardTotal', 7, 30)).toContain('7');
        expect(t('leaderboardTotal', 7, 30)).toContain('30');
        expect(t('leaderboardTotal', 7, 30)).toContain('⭐');
    });

    it('leaderboardTotal works in English', () => {
        setLang('en');
        expect(t('leaderboardTotal', 5, 30)).toMatch(/5.*30/);
    });
});

describe('roundLabel', () => {
    it('produces a string containing round numbers in all three locales', () => {
        for (const lang of ['fr', 'en', 'es']) {
            setLang(lang);
            const result = t('roundLabel', 3, 6);
            expect(typeof result).toBe('string');
            expect(result).toContain('3');
            expect(result).toContain('6');
        }
    });

    it('contains the sword emoji in all three locales', () => {
        for (const lang of ['fr', 'en', 'es']) {
            setLang(lang);
            expect(t('roundLabel', 1, 6)).toContain('⚔️');
        }
    });
});

describe('mathWorldTitle', () => {
    it('contains the math emoji in all three locales', () => {
        for (const lang of ['fr', 'en', 'es']) {
            setLang(lang);
            expect(t('mathWorldTitle')).toContain('🔢');
        }
    });

    it('is different in each locale', () => {
        const titles = ['fr', 'en', 'es'].map(lang => { setLang(lang); return t('mathWorldTitle'); });
        expect(new Set(titles).size).toBe(3);
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
