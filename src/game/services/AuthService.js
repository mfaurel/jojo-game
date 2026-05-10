import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { signInWithCredential, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from './firebase.js';
import { buildSaveSnapshot, applySaveSnapshot, loadFromCloud, syncSave } from './SaveService.js';

export async function signInWithGoogle() {
    const googleUser = await GoogleAuth.signIn();
    const credential = GoogleAuthProvider.credential(googleUser.authentication.idToken);
    const result     = await signInWithCredential(auth, credential);

    const cloud = await loadFromCloud();
    const local = buildSaveSnapshot();
    if (cloud && cloud.updatedAt > (local.updatedAt || 0)) {
        applySaveSnapshot(cloud);
    } else {
        await syncSave();
    }

    return result.user;
}

export async function signOutUser() {
    await syncSave();
    await signOut(auth);
    try { await GoogleAuth.signOut(); } catch {}
}

export function getCurrentUser() {
    return auth.currentUser;
}
