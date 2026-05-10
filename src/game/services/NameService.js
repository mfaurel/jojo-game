const NAME_KEY    = 'jolyne_child_name';
const UNLOCK_KEY  = 'jolyne_name_unlocked';

export function getChildName() {
    try { return localStorage.getItem(NAME_KEY)?.slice(0, 20) || 'Jolyne'; } catch { return 'Jolyne'; }
}

export function setChildName(name) {
    try { localStorage.setItem(NAME_KEY, String(name).trim().slice(0, 20)); } catch {}
}

export function isNameUnlocked() {
    try { return localStorage.getItem(UNLOCK_KEY) === 'true'; } catch { return false; }
}

export function unlockName() {
    try { localStorage.setItem(UNLOCK_KEY, 'true'); } catch {}
}
