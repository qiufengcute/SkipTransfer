function runElementCommand(tabId, selector, selectorDataCommand) {
    return new Promise((resolve) => {
        chrome.scripting
            .executeScript({
                target: { tabId: tabId },
                world: 'MAIN',
                func: (selector, selectorDataCommand) => {
                    const data = document.querySelectorAll(selector);
                    let result = null
                    let isJumpInit = false;

                    if (!selectorDataCommand) return {
                        ok: false,
                        msg: 'Element command must have data command.'
                    };
                    if (selectorDataCommand.toUpperCase() === '[HTML]') {
                        result = data[0]?.innerHTML;
                    } else if (selectorDataCommand.toUpperCase().startsWith('[JUMPINIT|')) {
                        isJumpInit = true;
                        const initParamGroups = selectorDataCommand.substring(10, selectorDataCommand.length - 1).split('|');
                        const gotoParam = initParamGroups[0];
                        const specialId = initParamGroups[1];

                        data.forEach((e) => {
                            let gotoUrl = null;
                            if (gotoParam.toUpperCase() === '[HTML]') {
                                gotoUrl = e.innerHTML;
                            } else {
                                gotoUrl = e.getAttribute(gotoParam);
                            }

                            if (gotoUrl && (gotoUrl.startsWith('http://') || gotoUrl.startsWith('https://'))) {
                                e.addEventListener('click', (event) => {
                                    event.preventDefault();
                                    if (specialId === 'Anime') { // Anime 字幕论坛
                                        window.hideMenu("fwin_dialog", "dialog");
                                    }
                                    window.open(gotoUrl, '_blank');
                                })
                            }
                        })
                    }

                    return {
                        ok: true,
                        result: result,
                        isJumpInit: isJumpInit
                    }
                },
                args: [selector, selectorDataCommand]
            })
            .then((results) => {
                if (chrome.runtime.lastError) {
                    resolve({
                        ok: false,
                        msg: chrome.runtime.lastError
                    });
                    return;
                }
                resolve(results[0].result)
            });
    });
}

export class DSLParseError extends Error {
    constructor(message) {
        super(message);
        
        this.name = 'DSLParseError'
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export async function parse(text, url, tabId) {
    if (!text.startsWith('[') || !text.endsWith(']')) {
        return undefined;
    }

    // [Element(Query 选择器)] [Arg(名称)]         // Selector command / <Name> command
    // .属性名 .[HTML] .[JumpInit|属性名/[HTML]]   // Data command
    // => BASE64                                 // Last command
    const match = text.trim().match(/^\[(.*?)\s*\(\s*(.*?)\s*\)\.?(.*?)(?:\s*=>\s*(.*?))?\]$/);
    if (!match) throw new DSLParseError('Syntax analysis faild.');
    const selectorCommand = match[1].trim().toUpperCase();
    const selectorText = match[2].trim();
    const selectorDataCommand = match[3].trim();
    const base64 = match[4];
    let isJumpInit = false;
    let data = null;

    if (selectorCommand === 'ELEMENT') {
        data = await runElementCommand(tabId, selectorText, selectorDataCommand);
        if (!data.ok) throw new DSLParseError(data.msg);
        isJumpInit = data.isJumpInit;
        data = data.result;
        console.log('[DSLParser] Element command run done, result: ', data);
    } else if (selectorCommand === 'ARG') {
        if (selectorDataCommand) throw new DSLParseError('Arg command cannot have data command.');
        data = new URL(url).searchParams.get(selectorText);
        console.log('[DSLParser] Arg command run done, result: ', data);
    } else throw new DSLParseError('Selector command unknown');

    if (!data || isJumpInit) return null;

    if (base64) {
        const base64Command = base64.trim().toUpperCase();
        if (base64Command !== 'BASE64') throw new DSLParseError('Last command only support BASE64');
        try {
            data = atob(data);
            console.log('[DSLParser] BASE64 command run done, result: ', data);
        } catch {
            throw new DSLParseError('Last command error on running: data is not a BASE64 string');
        }
    }

    return data || null;
}