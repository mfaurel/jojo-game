import { addToInventory } from '../data/LevelData.js';

export const ACHIEVEMENTS = [
    { id: 'welcome',       nameKey: 'ach_welcome',       descKey: 'ach_welcome_desc',       reward: null },
    { id: 'linguist',      nameKey: 'ach_linguist',      descKey: 'ach_linguist_desc',      reward: null },
    { id: 'explorer',      nameKey: 'ach_explorer',      descKey: 'ach_explorer_desc',      reward: null },
    { id: 'first_spell',   nameKey: 'ach_first_spell',   descKey: 'ach_first_spell_desc',   reward: 'bg_castle' },
    { id: 'first_memory',  nameKey: 'ach_first_memory',  descKey: 'ach_first_memory_desc',  reward: 'card_back_stars' },
    { id: 'all_counting',  nameKey: 'ach_all_counting',  descKey: 'ach_all_counting_desc',  reward: 'bg_galaxy' },
    { id: 'all_spelling',  nameKey: 'ach_all_spelling',  descKey: 'ach_all_spelling_desc',  reward: null },
    { id: 'all_memory',    nameKey: 'ach_all_memory',    descKey: 'ach_all_memory_desc',    reward: 'card_back_rainbow' },
    { id: 'all_math',      nameKey: 'ach_all_math',      descKey: 'ach_all_math_desc',      reward: null },
    { id: 'all_stars',     nameKey: 'ach_all_stars',     descKey: 'ach_all_stars_desc',     reward: 'skin_gold' },
];

const KEY = 'jolyne_achievements';

function _defaults() {
    const map = {};
    ACHIEVEMENTS.forEach(a => { map[a.id] = { unlocked: false, unlockedAt: null }; });
    return map;
}

function _normalize(data) {
    const map = _defaults();
    ACHIEVEMENTS.forEach(a => {
        if (data[a.id] && typeof data[a.id].unlocked === 'boolean') {
            map[a.id] = { unlocked: data[a.id].unlocked, unlockedAt: data[a.id].unlockedAt ?? null };
        }
    });
    return map;
}

export function getAchievements() {
    try {
        const raw    = localStorage.getItem(KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        if (typeof parsed !== 'object' || parsed === null) return _defaults();
        return _normalize(parsed);
    } catch {
        return _defaults();
    }
}

export function isUnlocked(id) {
    return getAchievements()[id]?.unlocked === true;
}

export function unlockAchievement(id) {
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach) return { wasNew: false, rewardItemId: null };

    const map = getAchievements();
    if (map[id]?.unlocked) return { wasNew: false, rewardItemId: null };

    map[id] = { unlocked: true, unlockedAt: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(map)); } catch {}

    if (ach.reward) addToInventory(ach.reward);

    return { wasNew: true, rewardItemId: ach.reward ?? null };
}

export const checkAndUnlock = unlockAchievement;

export function getUnlockedCount() {
    return Object.values(getAchievements()).filter(a => a.unlocked).length;
}

export function getProgress() {
    return { unlocked: getUnlockedCount(), total: ACHIEVEMENTS.length };
}
