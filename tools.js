const DEFAULT_TRANSFERS =  [
    {
        name: "知乎",
        homePage: "https://www.zhihu.com/",
        url: "link.zhihu.com",
        param: "target"
    },
    {
        name: "稀土掘金",
        homePage: "https://juejin.cn/",
        url: "link.juejin.cn",
        param: "target"
    },
    {
        name: "Gitee",
        homePage: "https://gitee.com/",
        url: "gitee.com/link",
        param: "target"
    },
    {
        name: "CSDN",
        homePage: "https://www.csdn.net/",
        url: "link.csdn.net",
        param: "target"
    },
    {
        name: "少数派",
        homePage: "https://sspai.com/",
        url: "sspai.com/link",
        param: "target"
    },
    {
        name: "爱发电",
        homePage: "https://afdian.com/",
        url: "afdian.com/link",
        param: "target"
    },
    {
        name: "快懂百科",
        homePage: "https://www.baike.com/",
        url: "baike.com/redirect_link",
        param: "url"
    },
    {
        name: "站长之家",
        homePage: "https://www.chinaz.com/",
        url: "chinaz.com/go.shtml",
        param: "url"
    },
    {
        name: "酷安",
        homePage: "https://www.coolapk.com/",
        url: "coolapk.com/link",
        param: "target"
    },
    {
        name: "Curse",
        homePage: "https://www.curseforge.com/",
        url: "curseforge.com/linkout",
        param: "remoteUrl"
    },
    {
        name: "阿里云开发者社区",
        homePage: "https://developer.aliyun.com/",
        url: "developer.aliyun.com/redirect",
        param: "target"
    },
    {
        name: "豆瓣",
        homePage: "https://www.douban.com/",
        url: "douban.com/link2",
        param: "url"
    },
    {
        name: "Bilibili游戏",
        homePage: "https://game.bilibili.com/",
        url: "game.bilibili.com/linkfilter",
        param: "url"
    },
    {
        name: "巴哈姆特電玩資訊站",
        homePage: "https://www.gamer.com.tw/",
        url: "ref.gamer.com.tw/redir.php",
        param: "url"
    },
    {
        name: "机核 GCORES",
        homePage: "https://www.gcores.com/",
        url: "gcores.com/link",
        param: "target"
    },
    {
        name: "HelloGitHub",
        homePage: "https://hellogithub.com/",
        url: "hellogithub.com/periodical/statistics/click",
        param: "target"
    },
    {
        name: "InfoQ 写作社区",
        homePage: "https://xie.infoq.cn/",
        url: "xie.infoq.cn/link",
        param: "target"
    },
    {
        name: "InfoQ",
        homePage: "https://www.infoq.cn/",
        url: "infoq.cn/link",
        param: "target"
    },
    {
        name: "KOOK",
        homePage: "https://www.kookapp.cn/",
        url: "kookapp.cn/go-wild.html",
        param: "url"
    },
    {
        name: "LaTeX 问答",
        homePage: "https://ask.latexstudio.net/",
        url: "ask.latexstudio.net/go/index",
        param: "url"
    },
    {
        name: "力扣",
        homePage: "https://leetcode.cn/",
        url: "leetcode.cn/link",
        param: "target"
    },
    {
        name: "领英",
        homePage: "https://www.linkedin.com/",
        url: "linkedin.com/safety/go",
        param: "url"
    },
    {
        name: "标志情报局",
        homePage: "https://logonews.cn/",
        url: "link.logonews.cn",
        param: "url"
    },
    {
        name: "NodeSeek",
        homePage: "https://www.nodeseek.com/",
        url: "nodeseek.com/jump",
        param: "to"
    },
    {
        name: "牛客网",
        homePage: "https://www.nowcoder.com/",
        url: "hd.nowcoder.com/link.html",
        param: "target"
    },
    {
        name: "OSCHINA",
        homePage: "https://www.oschina.net/",
        url: "oschina.net/action/GoToLink",
        param: "url"
    },
    {
        name: "企查查",
        homePage: "https://www.qcc.com/",
        url: "qcc.com/web/transfer-link",
        param: "link"
    },
    {
        name: "腾讯文档",
        homePage: "https://docs.qq.com/",
        url: "docs.qq.com/scenario/link.html",
        param: "url"
    },
    {
        name: "360doc",
        homePage: "https://www.360doc.cn/",
        url: "360doc.cn/outlink.html",
        param: "url"
    },
    {
        name: "Instagram",
        homePage: "https://www.instagram.com/",
        url: "instagram.com/linkshim",
        param: "u"
    },
    {
        name: "Steam 社区",
        homePage: "https://steamcommunity.com/",
        url: "steamcommunity.com/linkfilter",
        param: "url"
    },
    {
        name: "Telegram",
        homePage: "https://telegram.org/",
        url: "t.me/iv",
        param: "url"
    },
    {
        name: "腾讯云开发者社区",
        homePage: "https://cloud.tencent.com/",
        url: "cloud.tencent.com/developer/tools/blog-entry",
        param: "target"
    },
    {
        name: "天眼查",
        homePage: "https://www.tianyancha.com/",
        url: "tianyancha.com/security",
        param: "target"
    },
    {
        name: "百度贴吧",
        homePage: "https://tieba.baidu.com/",
        url: "tieba.baidu.com/mo/q/checkurl",
        param: "url"
    },
    {
        name: "优设网",
        homePage: "https://www.uisdc.com/",
        url: "link.uisdc.com",
        param: "param"
    },
    {
        name: "微信开发者社区",
        homePage: "https://developers.weixin.qq.com/",
        url: "developers.weixin.qq.com/community/middlepage/href",
        param: "href"
    },
    {
        name: "语雀",
        homePage: "https://www.yuque.com/",
        url: "yuque.com/r/goto",
        param: "url"
    },
    {
        name: "YouTube",
        homePage: "https://www.youtube.com/",
        url: "youtube.com/redirect",
        param: "q"
    },
    {
        name: "多玩游戏网",
        homePage: "https://www.duowan.com/",
        url: "redir.yy.duowan.com/warning.php",
        param: "url"
    },
    {
        name: "红石中继站",
        homePage: "https://www.mczwlt.net/",
        url: "www.mczwlt.net/go-external",
        param: "url"
    },
    {
        name: "石墨文档",
        homePage: "https://shimo.im/",
        param: "url",
        special: {
            url: ["shimo.im/outlink/black", "shimo.im/outlink/gray"]
        }
    },
    {
        name: "微博",
        homePage: "https://weibo.cn/",
        url: "weibo.cn/sinaurl",
        special: {
            param: ["toasturl", "url", "u"]
        }
    },
    {
        name: "简书",
        homePage: "https://www.jianshu.com/",
        special: {
            url: ["links.jianshu.com/go", "https://www.jianshu.com/"],
            param: ["to", "url"]
        }
    },
    {
        name: "腾讯企业邮箱",
        homePage: "https://mail.qq.com/",
        special: {
            url: ["mail.qq.com/cgi-bin/readtemplate", "wx.mail.qq.com/xmspamcheck/xmsafejump"],
            param: ["gourl", "url"]
        }
    },
    {
        name: "碧蓝之星 - 深海迷航社区",
        homePage: "https://blzxteam.com/",
        url: "blzxteam.com/gowild.htm",
        param() {
            return document.querySelector("div._2VEbEOHfDtVWiQAJxSIrVi_0").getAttribute("name");
        }
    },
    {
        name: "云盘资源网",
        homePage: "https://www.yunpanziyuan.xyz/",
        url: "yunpanziyuan.xyz/gowild.htm",
        param() {
            return document.querySelector("div.url_div").getAttribute("name");
        }
    },
    {
        name: "书签地球",
        homePage: "https://www.bookmarkearth.cn/",
        url: "bookmarkearth.cn/view/(.*)",
        param() {
            return document.querySelector("p.link").innerHTML;
        }
    },
    {
        name: "51CTO",
        homePage: "https://51cto.com/",
        url: "blog.51cto.com/transfer",
        param() {
            return window.location.href.replace("https://blog.51cto.com/transfer?", "");
        }
    },
    {
        name: "微信安全中心",
        homePage: "https://weixin110.qq.com/",
        url: "weixin110.qq.com/cgi-bin/mmspamsupport-bin/newparamconfirmcgi",
        param() {
            const element = document.querySelector("body > div > div.weui-msg__text-area > div > div > div:nth-child(1) > p");
            if (!element) return null;
            return element.innerText;
        }
    },
    {
        name: "423down",
        homePage: "https://423down.com/",
        url: "423down.com/go.php",
        param(url) {
            return atob(new URL(url).searchParams.get("url"));
        }
    },
    {
        name: "Anime字幕论坛",
        homePage: "https://bbs.acgrip.com/",
        url: "bbs.acgrip.com/(.*)",
        param() {
            document.querySelectorAll("a").forEach((elem) => {
                if (elem.href && elem.href.startsWith("http") && !elem.href.includes(window.location.host)) {
                    elem.addEventListener("click", (event) => {
                        event.preventDefault();
                        window.hideMenu("fwin_dialog", "dialog");
                        window.open(elem.href, "_blank");
                    });
                }
            });

            return null;
        }
    },
    {
        name: "微信公众号",
        homePage: "https://mp.weixin.qq.com",
        url: "mp.weixin.qq.com/s/(.*)",
        param() {
            const elements = document.querySelectorAll("#js_content > section a[data-linktype='2']");
            if (!elements.length) return null;

            elements.forEach((elem) => {
                const cloned = elem.cloneNode(true);
                cloned.setAttribute("data-s-source", "quickgo");
                cloned.addEventListener("click", () => {;
                    window.open(cloned.href, "_blank");
                });

                elem.replaceWith(cloned);
            });

            return null;
        }
    },
]
const REDIRECT_PARAMS = [
    'redirect', 'go', 'url', 'to',
    'u', 'toasturl', 'target'
];

const STORAGE_KEY = 'SkipTransfer_Transfers';
const FIRST_KEY = 'SkipTransfer_First';

function funcToStr(func) {
    const fnStr = func.toString();
    return fnStr.slice(fnStr.indexOf('{') + 1, fnStr.lastIndexOf('}')).trim();
}

async function getIsFirst() {
    return new Promise((resolve) => {
        chrome.storage.local.get([FIRST_KEY], (result) => {
            chrome.storage.local.set({ [FIRST_KEY]: false });
            resolve(result[FIRST_KEY] || true);
        });
    });
}

export function getRedirectParams() { return REDIRECT_PARAMS; }

export function getDefaultTransfers() {
    let newTransfers = [];

    for (const t of DEFAULT_TRANSFERS) {
        let newTransfer = {...t};
        newTransfer.special = newTransfer.special || {};

        if (typeof newTransfer.param === 'function') {
            newTransfer.param = funcToStr(newTransfer.param);
            newTransfer.special.param = 'js';
        }

        if (typeof newTransfer.url === 'function') {
            newTransfer.url = funcToStr(newTransfer.url);
            newTransfer.special.url = 'js';
        }

        newTransfers.push(newTransfer);
    }

    return newTransfers;
}

export async function getTransfers() {
    return new Promise(async (resolve) => {
        if (await getIsFirst()) {
            setTransfers(getDefaultTransfers());
            resolve(getDefaultTransfers());
        } else {
            chrome.storage.local.get([STORAGE_KEY], (result) => {
                resolve(result[STORAGE_KEY] || []);
            });
        }
    });
}

export function setTransfers(transfers) {
    chrome.storage.local.set({ [STORAGE_KEY]: transfers });
}