import { getProgress, LEVELS } from '../data/LevelData.js';
import { getMathProgress, MATH_WORLDS } from '../data/MathWorldData.js';
import { getMemoryProgress, MEMORY_LEVELS } from '../data/MemoryData.js';
import { getCountingProgress, COUNTING_LEVELS } from '../data/CountingData.js';
import { checkAndUnlock } from './AchievementService.js';

export function checkAllStars() {
    const spellingDone = Object.keys(getProgress()).length >= LEVELS.length;
    const mathDone     = MATH_WORLDS.every((_, i) => getMathProgress()[i]);
    const memDone      = MEMORY_LEVELS.every((_, i) => getMemoryProgress()[i]);
    const countDone    = COUNTING_LEVELS.every((_, i) => getCountingProgress()[i]);
    if (spellingDone && mathDone && memDone && countDone) {
        return checkAndUnlock('all_stars');
    }
    return null;
}
