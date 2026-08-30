const REDIRECT_PARAMS = [
    'redirect', 'go', 'url', 'to',
    'u', 'toasturl', 'target'
];

const STORAGE_KEY = 'SkipTransfer_Transfers';
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
    if (await getIsFirst()) {
        const response = await fetch(chrome.runtime.getURL('default_transfers.json'));
        const defaultData = await response.json();
        setTransfers(defaultData);
        return defaultData;
    }
    chrome.storage.local.get([STORAGE_KEY], (result) => {
        return result[STORAGE_KEY] || [];
    });
}

export function setTransfers(transfers) {
    chrome.storage.local.set({ [STORAGE_KEY]: transfers });
}