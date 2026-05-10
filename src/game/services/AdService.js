import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

// Switch between test IDs (dev) and real IDs (prod build)
const BANNER_ID   = import.meta.env.DEV
    ? 'ca-app-pub-3940256099942544/6300978111'
    : 'YOUR_BANNER_AD_UNIT_ID';

const REWARDED_ID = import.meta.env.DEV
    ? 'ca-app-pub-3940256099942544/5224354917'
    : 'YOUR_REWARDED_AD_UNIT_ID';

let _initialized = false;

export async function initAds() {
    try {
        await AdMob.initialize({ initializeForChild: true });
        _initialized = true;
    } catch {}
}

export async function showBanner() {
    if (!_initialized) return;
    try {
        const options = {
            adId:     BANNER_ID,
            adSize:   BannerAdSize.BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            margin:   0,
            npa:      true,
        };
        await AdMob.showBanner(options);
    } catch {}
}

export async function hideBanner() {
    if (!_initialized) return;
    try { await AdMob.hideBanner(); } catch {}
}

export function showRewardedAd() {
    if (!_initialized) return Promise.reject(new Error('ads not initialized'));
    return new Promise(async (resolve, reject) => {
        const handles = [];
        const cleanup = () => handles.forEach(h => h?.remove?.());
        try {
            handles.push(await AdMob.addListener('onRewardedVideoAdLoaded', async () => {
                await AdMob.showRewardVideoAd();
            }));
            handles.push(await AdMob.addListener('onRewardedVideoAdReward', () => {
                cleanup(); resolve();
            }));
            handles.push(await AdMob.addListener('onRewardedVideoAdFailedToLoad', () => {
                cleanup(); reject(new Error('ad failed to load'));
            }));
            handles.push(await AdMob.addListener('onRewardedVideoAdDismissed', () => {
                cleanup(); reject(new Error('ad dismissed'));
            }));
            await AdMob.prepareRewardVideoAd({ adId: REWARDED_ID, npa: true });
        } catch (e) {
            cleanup(); reject(e);
        }
    });
}
