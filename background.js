import { getTransfers } from './tools.js';
import { parse } from './parseDSL.js';

chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url !== 'about:blank') {
        console.log('[Service Worker] 开始检测: ', tab.url);

        const transfers = await getTransfers();
        const url = new URL(tab.url);
        const fullUrl = url.hostname + url.pathname;
        let resultId = -1;

        for (const [i, t] of Object.entries(transfers)) {
            let result = false;

            // 多个 URL
            if (Array.isArray(t.url)) {
                for (const r of t.url) {
                    if (fullUrl.match(`^${r}$`)) {
                        result = true;
                        break;
                    }
                }
            }

            // 标准
            if (fullUrl.match(`^${t.url}$`)) {
                result = true;
            }

            if (result) {
                resultId = Number(i);
                break;
            }
        }

        if (resultId !== -1) {
            const result = transfers[resultId];
            const urlParams = url.searchParams;
            console.log('[Service Worker] 检测到中转页, 匹配的项目为: ', result);
            let gotoUrl = null;

            // 多个参数名
            if (!gotoUrl && Array.isArray(result.param)) {
                for (const p of result.param || []) {
                    try {
                        const parseResult = await parse(p, fullUrl, tabId);
                        const paramValue = (parseResult === undefined) ? (p === '' ? [...urlParams.keys()][0] : urlParams.get(p)) : parseResult;
                        if (paramValue) {
                            gotoUrl = paramValue;
                            break;
                        }
                    } catch (e) {
                        console.log('[Service Worker] DSL Command parse error: ', e)
                    }
                }
            }

            // 标准
            if (!gotoUrl) {
                try {
                    const parseResult = await parse(result.param, fullUrl, tabId);
                    gotoUrl = (parseResult === undefined) ? (result.param === '' ? [...urlParams.keys()][0] : urlParams.get(result.param)) : parseResult;
                } catch (e) {
                    console.log('[Service Worker] DSL Command parse error: ', e)
                }
            }

            if (gotoUrl) {
                console.log('[Service Worker] 跳转到: ', gotoUrl);
                chrome.tabs.update(tabId, { url: gotoUrl });
            }
        }
    }
});