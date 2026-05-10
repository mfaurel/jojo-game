import { NativePurchases } from '@capgo/native-purchases';
import { unlockName } from './NameService.js';

const SKU_NAME    = 'unlock_child_name';
const SKU_PREMIUM = 'premium_bundle';

export async function initIAP() {
    try {
        await NativePurchases.setup();
        await restorePurchases();
    } catch {}
}

export async function purchaseProduct(sku) {
    try {
        const result = await NativePurchases.purchaseProduct({ productIdentifier: sku });
        _applyPurchase(sku);
        return result;
    } catch (e) {
        // User cancelled or billing error — rethrow so caller can react
        throw e;
    }
}

export async function restorePurchases() {
    try {
        const { purchaserInfo } = await NativePurchases.restorePurchases();
        const active = purchaserInfo?.activeSubscriptions ?? [];
        const nonSub = Object.keys(purchaserInfo?.allPurchasedProductIdentifiers ?? {});
        [...active, ...nonSub].forEach(id => _applyPurchase(id));
    } catch {}
}

function _applyPurchase(sku) {
    if (sku === SKU_NAME || sku === SKU_PREMIUM) {
        unlockName();
    }
    if (sku === SKU_PREMIUM) {
        try { localStorage.setItem('jolyne_cosmetics1_unlocked', 'true'); } catch {}
    }
}
