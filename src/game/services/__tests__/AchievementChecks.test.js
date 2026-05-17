import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../../data/LevelData.js',    () => ({ getProgress: vi.fn(), LEVELS: Array.from({ length: 10 }, (_, i) => ({ id: i })) }));
vi.mock('../../data/MathWorldData.js', () => ({ getMathProgress: vi.fn(), MATH_WORLDS: Array.from({ length: 6 }, (_, i) => ({ id: i })) }));
vi.mock('../../data/MemoryData.js',   () => ({ getMemoryProgress: vi.fn(), MEMORY_LEVELS: Array.from({ length: 9 }, (_, i) => ({ id: i })) }));
vi.mock('../../data/CountingData.js', () => ({ getCountingProgress: vi.fn(), COUNTING_LEVELS: Array.from({ length: 5 }, (_, i) => ({ id: i })) }));
vi.mock('../AchievementService.js',   () => ({ checkAndUnlock: vi.fn(() => ({ wasNew: false, rewardItemId: null })) }));

import { checkAllStars } from '../AchievementChecks.js';
import { getProgress } from '../../data/LevelData.js';
import { getMathProgress } from '../../data/MathWorldData.js';
import { getMemoryProgress } from '../../data/MemoryData.js';
import { getCountingProgress } from '../../data/CountingData.js';
import { checkAndUnlock } from '../AchievementService.js';

const allSpellingDone = () => Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i, true]));
const allMathDone     = () => Object.fromEntries(Array.from({ length: 6 },  (_, i) => [i, true]));
const allMemoryDone   = () => Object.fromEntries(Array.from({ length: 9 },  (_, i) => [i, true]));
const allCountingDone = () => Object.fromEntries(Array.from({ length: 5 },  (_, i) => [i, true]));

beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
});

describe('checkAllStars', () => {
    it('returns null when no mode is complete', () => {
        getProgress.mockReturnValue({});
        getMathProgress.mockReturnValue({});
        getMemoryProgress.mockReturnValue({});
        getCountingProgress.mockReturnValue({});
        expect(checkAllStars()).toBeNull();
    });

    it('returns null when only spelling is complete', () => {
        getProgress.mockReturnValue(allSpellingDone());
        getMathProgress.mockReturnValue({});
        getMemoryProgress.mockReturnValue({});
        getCountingProgress.mockReturnValue({});
        expect(checkAllStars()).toBeNull();
    });

    it('calls checkAndUnlock("all_stars") when all modes are complete', () => {
        getProgress.mockReturnValue(allSpellingDone());
        getMathProgress.mockReturnValue(allMathDone());
        getMemoryProgress.mockReturnValue(allMemoryDone());
        getCountingProgress.mockReturnValue(allCountingDone());
        checkAllStars();
        expect(checkAndUnlock).toHaveBeenCalledWith('all_stars');
    });

    it('includes showEnding:false when wasNew:false', () => {
        checkAndUnlock.mockReturnValue({ wasNew: false, rewardItemId: null });
        getProgress.mockReturnValue(allSpellingDone());
        getMathProgress.mockReturnValue(allMathDone());
        getMemoryProgress.mockReturnValue(allMemoryDone());
        getCountingProgress.mockReturnValue(allCountingDone());
        const result = checkAllStars();
        expect(result.showEnding).toBe(false);
    });

    it('includes showEnding:true when wasNew:true and ending not seen', () => {
        checkAndUnlock.mockReturnValue({ wasNew: true, rewardItemId: null });
        getProgress.mockReturnValue(allSpellingDone());
        getMathProgress.mockReturnValue(allMathDone());
        getMemoryProgress.mockReturnValue(allMemoryDone());
        getCountingProgress.mockReturnValue(allCountingDone());
        const result = checkAllStars();
        expect(result.showEnding).toBe(true);
    });

    it('includes showEnding:false when wasNew:true but ending already seen', () => {
        checkAndUnlock.mockReturnValue({ wasNew: true, rewardItemId: null });
        localStorage.setItem('jolyne_ending_seen', '1');
        getProgress.mockReturnValue(allSpellingDone());
        getMathProgress.mockReturnValue(allMathDone());
        getMemoryProgress.mockReturnValue(allMemoryDone());
        getCountingProgress.mockReturnValue(allCountingDone());
        const result = checkAllStars();
        expect(result.showEnding).toBe(false);
    });
});
