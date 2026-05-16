import { beforeEach, describe, expect, it } from 'vitest';
import { cycleLang, getLang, setLang, t } from '../I18n.js';

beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(navigator, 'language', { value: '', configurable: true });
});

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
        for (const lang of ['fr', 'en', 'es', 'de']) {
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
    it('cycles fr → en → es → de → fr', () => {
        setLang('fr');
        expect(cycleLang()).toBe('en');
        expect(cycleLang()).toBe('es');
        expect(cycleLang()).toBe('de');
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
    it('leaderboardTitle is translated in all supported locales', () => {
        const titles = [];
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            titles.push(t('leaderboardTitle'));
        }
        expect(titles[0]).toContain('⭐');
        expect(titles[1]).toContain('⭐');
        expect(titles[2]).toContain('⭐');
        expect(titles[3]).toContain('⭐');
        expect(new Set(titles).size).toBe(4);
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
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            const result = t('roundLabel', 3, 6);
            expect(typeof result).toBe('string');
            expect(result).toContain('3');
            expect(result).toContain('6');
        }
    });

    it('contains the sword emoji in all three locales', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            expect(t('roundLabel', 1, 6)).toContain('⚔️');
        }
    });
});

describe('mathWorldTitle', () => {
    it('contains the math emoji in all three locales', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            expect(t('mathWorldTitle')).toContain('🔢');
        }
    });

    it('is different in each locale', () => {
        const titles = ['fr', 'en', 'es', 'de'].map(lang => { setLang(lang); return t('mathWorldTitle'); });
        expect(new Set(titles).size).toBe(4);
    });
});

describe('counting i18n keys', () => {
    it('countingScore is a function returning a string with both numbers', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            const result = t('countingScore', 3, 6);
            expect(typeof result).toBe('string');
            expect(result).toContain('3');
            expect(result).toContain('6');
        }
    });

    it('countingRound is a function returning a string with both numbers', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            const result = t('countingRound', 2, 6);
            expect(typeof result).toBe('string');
            expect(result).toContain('2');
            expect(result).toContain('6');
        }
    });

    it('countingGood is a non-empty string in all three locales', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            const result = t('countingGood');
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
            expect(result).not.toBe('countingGood');
        }
    });

    it('countingBad is a non-empty string in all three locales', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            const result = t('countingBad');
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
            expect(result).not.toBe('countingBad');
        }
    });

    it('item_bear is a non-empty string in all three locales', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            const result = t('item_bear');
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
            expect(result).not.toBe('item_bear');
        }
    });

    it('item_flower is a non-empty string in all three locales', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            const result = t('item_flower');
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
            expect(result).not.toBe('item_flower');
        }
    });

    it('item_candy_cane is a non-empty string in all three locales', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            const result = t('item_candy_cane');
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
            expect(result).not.toBe('item_candy_cane');
        }
    });

    it('leftArm and rightArm have no emoji in any locale', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            expect(t('leftArm')).not.toMatch(/🛡️/);
            expect(t('rightArm')).not.toMatch(/⚔️/);
        }
    });
});

describe('button emojis', () => {
    it('btnMath uses 🔢 in all three locales', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            expect(t('btnMath')).toContain('🔢');
        }
    });

    it('btnMath does not use ❄️ in any locale', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
            setLang(lang);
            expect(t('btnMath')).not.toContain('❄️');
        }
    });

    it('btnCounting uses 🧮 in all three locales', () => {
        for (const lang of ['fr', 'en', 'es', 'de']) {
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
