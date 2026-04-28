export const MATH_WORLDS = [
    {
        id: 0,
        name: 'La Toundra',
        emoji: '❄️',
        btnColor: 0x1a4a7a,
        skyTop: 0x0a1a2a,
        skyBottom: 0x5a88aa,
        floorTop: 0x5a88aa,
        floorBottom: 0xddf4ff,
        fogColor: 0x88ccff,
        gridColor: 0xffffff,
        particles: 'snow',
        monsters: ['Snowman', 'Ice Golem', 'Polar Bear'],
        numMax: 5,
        pointsNeeded: 1200,
    },
    {
        id: 1,
        name: 'Le Pays Sucré',
        emoji: '🍭',
        btnColor: 0xcc4488,
        skyTop: 0xff80b4,
        skyBottom: 0xffccee,
        floorTop: 0xffe066,
        floorBottom: 0xfff5b0,
        fogColor: 0xffaacc,
        gridColor: 0xff44aa,
        particles: 'candy',
        monsters: ['Lollipop', 'Gummy Bear', 'Candy Cane'],
        numMax: 8,
        pointsNeeded: 1200,
    },
    {
        id: 2,
        name: 'La Prairie',
        emoji: '🌸',
        btnColor: 0x3a8a3a,
        skyTop: 0x4db8e8,
        skyBottom: 0xaae8ff,
        floorTop: 0x5aaa3a,
        floorBottom: 0xaadd66,
        fogColor: 0xccffcc,
        gridColor: 0x66dd44,
        particles: 'petal',
        monsters: ['Bee', 'Butterfly', 'Ladybug'],
        numMax: 10,
        pointsNeeded: 1200,
    },
];

const MATH_SAVE_KEY = 'math_progress';

export function getMathProgress() {
    try {
        return JSON.parse(localStorage.getItem(MATH_SAVE_KEY)) || {};
    } catch {
        return {};
    }
}

export function saveMathProgress(worldId) {
    const p = getMathProgress();
    p[worldId] = true;
    try {
        localStorage.setItem(MATH_SAVE_KEY, JSON.stringify(p));
    } catch { /* storage unavailable */ }
}

export function getMathUnlocked(worldId) {
    if (worldId === 0) return true;
    return getMathProgress()[worldId - 1] === true;
}
