import { getTransfers, setTransfers, getDefaultTransfers } from './tools.js';

const DEFAULT_TRANSFERS = getDefaultTransfers();

chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url !== 'about:blank') {
        console.log('开始检测: ', tab.url);

        const transfers = await getTransfers();
        const url = new URL(tab.url);
        const fullUrl = url.hostname + url.pathname;
        let resultId = -1;

        for (const [i, t] of Object.entries(transfers)) {
            let result = false;

            // 多个 URL
            if (Array.isArray(t?.special?.url) && t?.special?.url.includes(fullUrl)) result = true;

            // 字符串函数
            if (t?.special?.url === 'js') {
                const testFunc = function (url) {
                    return eval(t.url);
                }
                if (testFunc(fullUrl)) result = true;
            }

            // 标准 
            if (fullUrl.match('^' + t.url)) result = true;

            if (result) {
                resultId = Number(i);
                break;
            }
        }

        if (resultId !== -1) {
            const result = transfers[resultId];
            console.log('检测到中转页, 匹配的项目为: ', result);
            let gotoUrl = null;

            // 多个参数名
            if (!gotoUrl && Array.isArray(result?.special?.url)) {
                const urlParams = url.searchParams;
                for (const p of t?.special?.param || []) {
                    const result = urlParams.get(p);
                    if (result) {
                        gotoUrl = result;
                        break;
                    }
                }
            }

            // 字符串函数
            if (!gotoUrl && result?.special?.url === 'js') {
                const testFunc = function (url) {
                    const urlParams = new URL(url).searchParams;
                    for (const p of t?.special?.param || []) {
                        const result = urlParams.get(p);
                        if (result) return result;
                    }
                    return null;
                }
                gotoUrl = testFunc(fullUrl);
            } 

            // 标准
            if (!gotoUrl) gotoUrl = url.searchParams.get(result['param']);

            if (gotoUrl) chrome.tabs.update(tabId, { url: gotoUrl });
        }
    }
});