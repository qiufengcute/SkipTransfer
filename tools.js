const REDIRECT_PARAMS = [
    'redirect', 'go', 'url', 'to',
    'u', 'toasturl', 'target'
];

const STORAGE_KEY = 'SkipTransfer_Transfers';
const IMGCACHE_KEY = 'SkipTransfer_ImgCache';
const FIRST_KEY = 'SkipTransfer_First';

async function getIsFirst() {
    return new Promise((resolve) => {
        chrome.storage.local.get([FIRST_KEY], (result) => {
            chrome.storage.local.set({ [FIRST_KEY]: false });
            resolve(result[FIRST_KEY] || true);
        });
    });
}

export function getRedirectParams() { return REDIRECT_PARAMS; }

export async function getTransfers() {
    const isFirst = await getIsFirst();

    if (isFirst) {
        const response = await fetch(chrome.runtime.getURL('default_transfers.json'));
        const defaultData = await response.json();
        setTransfers(defaultData);
        return defaultData;
    }

    return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEY], (result) => {
            resolve(result[STORAGE_KEY] || []);
        });
    });
}

export function setTransfers(transfers) {
    return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEY]: transfers }, () => resolve());
    });
}

export function getImgCache(url = null) {
    return new Promise((resolve) => {
        chrome.storage.local.get([IMGCACHE_KEY], (result) => {
            if (url) {
                const imgCaches = result[IMGCACHE_KEY] || {};
                resolve(imgCaches[url] || null);
            }
            else resolve(result[IMGCACHE_KEY] || {});
        });
    });
}

export function setImgCache(url, img) {
    return new Promise(async (resolve) => {
        chrome.storage.local.set({ [IMGCACHE_KEY]: { ...await getImgCache(), [url]: img } }, () => resolve());
    });
}