import { getTransfers, setTransfers, getRedirectParams } from './tools.js';

// DOM 元素
const overlay = document.getElementById('modalOverlay');
const addBtn = document.getElementById('addTransferBtn');
const cancelBtn = document.getElementById('modalCancelBtn');
const saveBtn = document.getElementById('modalSaveBtn');

const detailOverlay = document.getElementById('detailOverlay');
const detailCloseBtn = document.getElementById('detailCloseBtn');
const detailSaveBtn = document.getElementById('detailSaveBtn');
const detailTitle = document.getElementById('detailTitle');
const detailName = document.getElementById('detailName');
const detailHomePage = document.getElementById('detailHomePage');
const detailUrlContainer = document.getElementById('detailUrlContainer');
const detailParamContainer = document.getElementById('detailParamContainer');

const nameInput = document.getElementById('modalName');
const homePageInput = document.getElementById('modalHomePage');
const urlInput = document.getElementById('modalUrl');
const paramInput = document.getElementById('modalParam');
const urlTypeSelect = document.getElementById('modalUrlType');
const paramTypeSelect = document.getElementById('modalParamType');

const detailNameInput = document.getElementById('detailName');
const detailHomePageInput = document.getElementById('detailHomePage');
const detailUrlInput = document.getElementById('detailUrl');
const detailParamInput = document.getElementById('detailParam');
const detailUrlTypeSelect = document.getElementById('detailUrlType');
const detailParamTypeSelect = document.getElementById('detailParamType');

let currentDetailCard = null;

function updateCount() {
    const cards = document.querySelectorAll('.transfer-card');
    const badge = document.getElementById('cardCount');
    if (badge) badge.textContent = cards.length;
};

async function renderCards() {
    const cardList = document.getElementById('cardList');
    const transfers = await getTransfers();
    
    if (!Array.isArray(transfers) || transfers.length === 0) {
        cardList.innerHTML = `
            <div style="text-align:center; color:#8b949e; padding:30px 0; font-size:14px;">
                <i class="fas fa-inbox" style="font-size:24px; display:block; margin-bottom:10px;"></i>
                暂无中转规则，点击下方添加
            </div>
        `;
        updateCount();
        return;
    }
    
    cardList.innerHTML = transfers.map((item, index) => `
        <div class="transfer-card" data-index="${index}">
            <div class="card-left">
                <img width="20" src="./imgs/web.png">
                <a href="${item.homePage}" class="card-name">${item.name || '未命名'}</a>
            </div>
            <div class="card-actions">
                <button class="settings-btn" data-index="${index}" title="编辑"><i class="fas fa-cog"></i></button>
                <button class="del-btn" data-index="${index}" title="删除"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    
    updateCount();
    console.log('刷新成功: ', transfers);
}


// ===== 输入框切换 =====
function updateInputHeights() {
    const urlType = urlTypeSelect.value;
    const paramType = paramTypeSelect.value;

    // URL 输入框
    const urlParent = urlInput.parentNode;
    const isUrlMulti = (urlType === '多个' || urlType === 'JS');

    if (isUrlMulti && urlInput.tagName !== 'TEXTAREA') {
        const newEl = document.createElement('textarea');
        newEl.id = 'modalUrl';
        newEl.placeholder = urlType === 'JS' ? '// JavaScript 代码' : '每行一个正则';
        newEl.value = urlInput.value;
        newEl.className = 'input-multiline';
        urlParent.replaceChild(newEl, urlInput);
        urlInput = newEl;
    } else if (!isUrlMulti && urlInput.tagName !== 'INPUT') {
        const newEl = document.createElement('input');
        newEl.type = 'text';
        newEl.id = 'modalUrl';
        newEl.placeholder = 'example.com/go/.*';
        newEl.value = urlInput.value;
        urlParent.replaceChild(newEl, urlInput);
        urlInput = newEl;
    }

    // 参数输入框
    const paramParent = paramInput.parentNode;
    const isParamMulti = (paramType === '多个' || paramType === 'JS');

    if (isParamMulti && paramInput.tagName !== 'TEXTAREA') {
        const newEl = document.createElement('textarea');
        newEl.id = 'modalParam';
        newEl.placeholder = paramType === 'JS' ? '// JavaScript 代码' : '每行一个参数';
        newEl.value = paramInput.value;
        newEl.className = 'input-multiline';
        paramParent.replaceChild(newEl, paramInput);
        paramInput = newEl;
    } else if (!isParamMulti && paramInput.tagName !== 'INPUT') {
        const newEl = document.createElement('input');
        newEl.type = 'text';
        newEl.id = 'modalParam';
        newEl.placeholder = 'redirect';
        newEl.value = paramInput.value;
        paramParent.replaceChild(newEl, paramInput);
        paramInput = newEl;
    }
}

function updateDetailInputHeights() {
    const urlType = detailUrlTypeSelect.value;
    const paramType = detailParamTypeSelect.value;

    // URL 输入框
    const urlParent = detailUrlInput.parentNode;
    const isUrlMulti = (urlType === '多个' || urlType === 'JS');

    if (isUrlMulti && detailUrlInput.tagName !== 'TEXTAREA') {
        const newEl = document.createElement('textarea');
        newEl.id = 'modalUrl';
        newEl.placeholder = urlType === 'JS' ? '// JavaScript 代码' : '每行一个正则';
        newEl.value = detailUrlInput.value;
        newEl.className = 'input-multiline';
        urlParent.replaceChild(newEl, detailUrlInput);
        detailUrlInput = newEl;
    } else if (!isUrlMulti && detailUrlInput.tagName !== 'INPUT') {
        const newEl = document.createElement('input');
        newEl.type = 'text';
        newEl.id = 'modalUrl';
        newEl.placeholder = 'example.com/go/.*';
        newEl.value = detailUrlInput.value;
        urlParent.replaceChild(newEl, detailUrlInput);
        detailUrlInput = newEl;
    }

    // 参数输入框
    const paramParent = detailParamInput.parentNode;
    const isParamMulti = (paramType === '多个' || paramType === 'JS');

    if (isParamMulti && detailParamInput.tagName !== 'TEXTAREA') {
        const newEl = document.createElement('textarea');
        newEl.id = 'modalParam';
        newEl.placeholder = paramType === 'JS' ? '// JavaScript 代码' : '每行一个参数';
        newEl.value = detailParamInput.value;
        newEl.className = 'input-multiline';
        paramParent.replaceChild(newEl, detailParamInput);
        detailParamInput = newEl;
    } else if (!isParamMulti && detailParamInput.tagName !== 'INPUT') {
        const newEl = document.createElement('input');
        newEl.type = 'text';
        newEl.id = 'modalParam';
        newEl.placeholder = 'redirect';
        newEl.value = detailParamInput.value;
        paramParent.replaceChild(newEl, detailParamInput);
        detailParamInput = newEl;
    }
}

// ===== 显示详情 =====
window.showDetail = async (card) => {
    if (!card) return;
    currentDetailCard = card;
    const index = card.dataset.index;
    const transfers = await getTransfers();
    const transfer = transfers[index];

    const name = transfer.name || '';
    const homePage = transfer.homePage || '';
    
    const specialUrl = transfer?.special?.url;
    const specialParam = transfer?.special?.param;
    
    const url = transfer.url || '';
    const param = transfer.param || '';

    detailTitle.textContent = '编辑: ' + name;
    detailName.value = name;
    detailHomePage.value = homePage;

    // URL
    if (Array.isArray(specialUrl)) {
        detailUrlTypeSelect.value = '多个';
        const textarea = document.createElement('textarea');
        textarea.id = 'detailUrl';
        textarea.value = specialUrl.join('\n');
        textarea.rows = Math.min(specialUrl.length + 1, 8);
        detailUrlContainer.innerHTML = '';
        detailUrlContainer.appendChild(textarea);
    } else if (specialUrl === 'js') {
        detailUrlTypeSelect.value = 'JS';
        const textarea = document.createElement('textarea');
        textarea.id = 'detailUrl';
        textarea.value = url;
        textarea.rows = Math.min(url.split('\n').length + 1, 8);
        detailUrlContainer.innerHTML = '';
        detailUrlContainer.appendChild(textarea);
    } else {
        detailUrlTypeSelect.value = '单个';
        detailUrlContainer.innerHTML = `<input type="text" id="detailUrl" value="${url}">`;
    }

    // Param
    if (Array.isArray(specialParam)) {
        detailParamTypeSelect.value = '多个';
        const textarea = document.createElement('textarea');
        textarea.id = 'detailUrl';
        textarea.value = specialParam.join('\n');
        textarea.rows = Math.min(specialParam.length + 1, 8);
        detailParamContainer.innerHTML = '';
        detailParamContainer.appendChild(textarea);
    } else if (specialParam === 'js') {
        detailParamTypeSelect.value = 'JS';
        const textarea = document.createElement('textarea');
        textarea.id = 'detailUrl';
        textarea.value = param;
        textarea.rows = Math.min(param.split('\n').length + 1, 8);
        detailParamContainer.innerHTML = '';
        detailParamContainer.appendChild(textarea);
    } else {
        detailParamTypeSelect.value = '单个';
        detailParamContainer.innerHTML = `<input type="text" id="detailParam" value="${param}">`;
    }

    detailOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function closeDetail() {
    detailOverlay.classList.remove('active');
    document.body.style.overflow = '';
    currentDetailCard = null;
}

async function saveDetail() {
    if (!currentDetailCard) return;

    const name = detailNameInput.value.trim() || '未命名';
    const homePage = detailHomePageInput.value.trim() || 'https://example.com';
    const url = detailUrlInput.value.trim() || '.*';
    const param = detailParamInput.value.trim() || 'redirect';
    const urlType = detailUrlTypeSelect.value;
    const paramType = detailParamTypeSelect.value;

    const item = {
        name: name,
        homePage: homePage
    };

    item.special = item.special || {};

    if (urlType === 'JS') {
        item.url = url;
        item.special.url = 'js';
    } else if (urlType === '多个') {
        item.special.url = url.split('\n').filter(s => s.trim());
    } else {
        item.url = url;
    }
    item.url.replace(/^https?:\/\//, '')

    if (paramType === 'JS') {
        item.url = param;
        item.special.param = 'js'
    } else if (paramType === '多个') {
        item.special.param = param.split('\n').filter(s => s.trim());
    } else {
        item.param = param;
    }

    const transfers = await getTransfers();
    const index = parseInt(currentDetailCard.dataset.index);
    
    if (!isNaN(index) && index >= 0 && index < transfers.length) {
        transfers[index] = item;
        
        await setTransfers(transfers);
        console.log('保存成功:', item);
    }
    closeDetail();
    await renderCards();
}

// ===== 新建弹窗 =====
function openModal() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const url = new URL(tab.url);
        const fullUrl = url.hostname + url.pathname
        const params = [...url.searchParams.keys()];
        const redirectParams = getRedirectParams();
        let paramResult = null;

        for (const p of redirectParams) {
            if (params.includes(p)) {
                paramResult = p;
                break;
            }
        }

        nameInput.value = tab.title || '新中转';
        homePageInput.value = (url.protocol && fullUrl) ? (url.protocol + '//' + fullUrl) : 'https://example.com/';
        urlInput.value = fullUrl || 'example.com/go/';
        paramInput.value = paramResult || 'redirect';
        urlTypeSelect.value = '单个';
        paramTypeSelect.value = '单个';

        const urlParent = urlInput.parentNode;
        if (urlInput.tagName === 'TEXTAREA') {
            const newEl = document.createElement('input');
            newEl.type = 'text';
            newEl.id = 'modalUrl';
            newEl.placeholder = 'example.com/go/.*';
            newEl.value = 'example.com/go/';
            urlParent.replaceChild(newEl, urlInput);
            urlInput = newEl;
        }

        const paramParent = paramInput.parentNode;
        if (paramInput.tagName === 'TEXTAREA') {
            const newEl = document.createElement('input');
            newEl.type = 'text';
            newEl.id = 'modalParam';
            newEl.placeholder = 'redirect';
            newEl.value = 'redirect';
            paramParent.replaceChild(newEl, paramInput);
            paramInput = newEl;
        }

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== 事件绑定 =====
urlTypeSelect.addEventListener('change', updateInputHeights);
paramTypeSelect.addEventListener('change', updateInputHeights);

detailUrlTypeSelect.addEventListener('change', updateDetailInputHeights);
detailParamTypeSelect.addEventListener('change', updateDetailInputHeights);

addBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
});

detailCloseBtn.addEventListener('click', closeDetail);
detailSaveBtn.addEventListener('click', saveDetail);
detailOverlay.addEventListener('click', function(e) {
    if (e.target === detailOverlay) closeDetail();
});

saveBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim() || '未命名';
    const homePage = homePageInput.value.trim() || 'https://example.com';
    const url = urlInput.value.trim() || '.*';
    const param = paramInput.value.trim() || 'redirect';
    const urlType = urlTypeSelect.value;
    const paramType = paramTypeSelect.value;

    const item = {
        name: name,
        homePage: homePage
    };

    item.special = item.special || {};

    if (urlType === 'JS') {
        item.url = url;
        item.special.url = 'js';
    } else if (urlType === '多个') {
        item.special.url = url.split('\n').filter(s => s.trim());
    } else {
        item.url = url;
    }
    item.url.replace(/^https?:\/\//, '')

    if (paramType === 'JS') {
        item.url = param;
        item.special.param = 'js'
    } else if (paramType === '多个') {
        item.special.param = param.split('\n').filter(s => s.trim());
    } else {
        item.param = param;
    }

    const current = await getTransfers();
    current.push(item);
    setTransfers(current);
    console.log('添加成功: ', item);
    closeModal();
    await renderCards();
});

document.getElementById('cardList').addEventListener('click', async function(e) {
    const delBtn = e.target.closest('.del-btn');
    if (delBtn) {
        e.stopPropagation();
        const index = parseInt(delBtn.dataset.index);
        if (confirm('确定要删除这个规则吗？')) {
            const transfers = await getTransfers();
            console.log('删除成功: ', transfers[index]);
            transfers.splice(index, 1);
            await setTransfers(transfers);
            await renderCards();
        }
        return;
    }
    
    const settingsBtn = e.target.closest('.settings-btn');
    if (settingsBtn) {
        e.stopPropagation();
        const card = settingsBtn.closest('.transfer-card');
        if (card) showDetail(card);
    }
});

document.getElementById('cardList').addEventListener('contextmenu', function(e) {
    const card = e.target.closest('.transfer-card');
    if (card) {
        e.preventDefault();
        window.showDetail(card);
    }
});

renderCards();