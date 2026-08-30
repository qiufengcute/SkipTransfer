import { getTransfers, setTransfers, getRedirectParams } from './tools.js';

const ui = {
    overlay: document.getElementById('modalOverlay'),
    addBtn: document.getElementById('addTransferBtn'),
    cancelBtn: document.getElementById('modalCancelBtn'),
    saveBtn: document.getElementById('modalSaveBtn'),
    detailOverlay: document.getElementById('detailOverlay'),
    detailCloseBtn: document.getElementById('detailCloseBtn'),
    detailSaveBtn: document.getElementById('detailSaveBtn'),
    detailTitle: document.getElementById('detailTitle'),
    detailName: document.getElementById('detailName'),
    detailHomePage: document.getElementById('detailHomePage'),
    detailUrlContainer: document.getElementById('detailUrlContainer'),
    detailParamContainer: document.getElementById('detailParamContainer'),
    cardList: document.getElementById('cardList'),
    modalName: document.getElementById('modalName'),
    modalHomePage: document.getElementById('modalHomePage'),
    modalUrl: document.getElementById('modalUrl'),
    modalParam: document.getElementById('modalParam'),
    modalUrlType: document.getElementById('modalUrlType'),
    modalParamType: document.getElementById('modalParamType'),
    modalUrlContainer: document.getElementById('modalUrlContainer'),
    modalParamContainer: document.getElementById('modalParamContainer'),
    detailUrl: document.getElementById('detailUrl'),
    detailParam: document.getElementById('detailParam'),
    detailUrlType: document.getElementById('detailUrlType'),
    detailParamType: document.getElementById('detailParamType')
};

const state = {
    currentDetailCard: null
};

let modalUrlInput = ui.modalUrl;
let modalParamInput = ui.modalParam;
let detailUrlInput = ui.detailUrl;
let detailParamInput = ui.detailParam;

function updateCount() {
    const badge = document.getElementById('cardCount');
    if (badge) {
        badge.textContent = document.querySelectorAll('.transfer-card').length;
    }
}

function buildEmptyState() {
    return `
        <div style="text-align:center; color:#8b949e; padding:30px 0; font-size:14px;">
            <i class="fas fa-inbox" style="font-size:24px; display:block; margin-bottom:10px;"></i>
            暂无中转规则，点击下方添加
        </div>
    `;
}

function normalizeFieldValue(rawValue, type, fallback = '') {
    const value = String(rawValue ?? '').trim();

    if (!value) {
        return fallback;
    }

    if (type === '多个') {
        return value
            .split(/\n+/)
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return value;
}

function createInputElement({ id, value = '', placeholder = '', className = '' }) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.value = value;
    input.placeholder = placeholder;
    if (className) {
        input.className = className;
    }
    return input;
}

function createTextareaElement({ id, value = '', placeholder = '', rows = 3, className = '' }) {
    const textarea = document.createElement('textarea');
    textarea.id = id;
    textarea.value = value;
    textarea.placeholder = placeholder;
    textarea.rows = rows;
    if (className) {
        textarea.className = className;
    }
    return textarea;
}

function replaceField(container, currentElement, { id, value, placeholder, multiline, className = '' }) {
    const nextElement = multiline
        ? createTextareaElement({
            id,
            value,
            placeholder,
            rows: Math.min(Math.max((value.split('\n').length || 1), 2), 8),
            className
        })
        : createInputElement({
            id,
            value,
            placeholder,
            className
        });

    if (currentElement && currentElement.parentNode === container) {
        container.replaceChild(nextElement, currentElement);
    } else {
        container.innerHTML = '';
        container.appendChild(nextElement);
    }

    return nextElement;
}

function syncFieldMode(container, currentElement, type, { id, value = '', placeholder = '' }) {
    const isMulti = type === '多个';

    if (isMulti && currentElement?.tagName !== 'TEXTAREA') {
        return replaceField(container, currentElement, {
            id,
            value: value,
            placeholder,
            multiline: true,
            className: 'input-multiline'
        });
    }

    if (!isMulti && currentElement?.tagName !== 'INPUT') {
        return replaceField(container, currentElement, {
            id,
            value: value,
            placeholder,
            multiline: false
        });
    }

    if (currentElement) {
        currentElement.value = value;
        currentElement.placeholder = placeholder;
    }

    return currentElement;
}

function buildTransferItemFromForm({ nameElement, homePageElement, urlElement, paramElement, urlTypeElement, paramTypeElement }) {
    const name = (nameElement.value || '').trim() || '未命名';
    const homePage = (homePageElement.value || '').trim() || 'https://example.com';

    return {
        name,
        homePage,
        url: normalizeFieldValue(urlElement.value, urlTypeElement.value, '.*'),
        param: normalizeFieldValue(paramElement.value, paramTypeElement.value, 'redirect')
    };
}

async function renderCards() {
    const transfers = await getTransfers();

    if (!Array.isArray(transfers) || transfers.length === 0) {
        ui.cardList.innerHTML = buildEmptyState();
        updateCount();
        return;
    }

    ui.cardList.innerHTML = transfers
        .map((item, index) => `
            <div class="transfer-card" data-index="${index}">
                <div class="card-left">
                    <img width="20" src="./imgs/web.png" alt="site icon">
                    <a href="${item.homePage || '#'}" class="card-name">${item.name || '未命名'}</a>
                </div>
                <div class="card-actions">
                    <button class="settings-btn" data-index="${index}" title="编辑"><i class="fas fa-cog"></i></button>
                    <button class="del-btn" data-index="${index}" title="删除"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `)
        .join('');

    updateCount();
}

function syncModalInputHeights() {
    modalUrlInput = syncFieldMode(ui.modalUrlContainer, modalUrlInput, ui.modalUrlType.value, {
        id: 'modalUrl',
        value: modalUrlInput?.value || 'example.com/go/',
        placeholder: 'example.com/go/.*'
    });

    modalParamInput = syncFieldMode(ui.modalParamContainer, modalParamInput, ui.modalParamType.value, {
        id: 'modalParam',
        value: modalParamInput?.value || 'redirect',
        placeholder: 'redirect'
    });
}

function syncDetailInputHeights() {
    detailUrlInput = syncFieldMode(ui.detailUrlContainer, detailUrlInput, ui.detailUrlType.value, {
        id: 'detailUrl',
        value: detailUrlInput?.value || '.*',
        placeholder: 'example.com/go/.*'
    });

    detailParamInput = syncFieldMode(ui.detailParamContainer, detailParamInput, ui.detailParamType.value, {
        id: 'detailParam',
        value: detailParamInput?.value || 'redirect',
        placeholder: 'redirect'
    });
}

function toggleOverlay(overlayElement, isOpen) {
    if (!overlayElement) return;

    overlayElement.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function openModal() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        if (!tab || !tab.url) {
            return;
        }

        try {
            const url = new URL(tab.url);
            const fullUrl = `${url.hostname}${url.pathname}`;
            const params = [...url.searchParams.keys()];
            const redirectParams = getRedirectParams();
            const paramResult = redirectParams.find((param) => params.includes(param)) || 'redirect';

            ui.modalName.value = tab.title || '新中转';
            ui.modalHomePage.value = url.protocol ? `${url.protocol}//${fullUrl}` : 'https://example.com/';
            ui.modalUrl.value = fullUrl || 'example.com/go/';
            ui.modalParam.value = paramResult;
            ui.modalUrlType.value = '单个';
            ui.modalParamType.value = '单个';

            modalUrlInput = syncFieldMode(ui.modalUrlContainer, modalUrlInput, '单个', {
                id: 'modalUrl',
                value: fullUrl || 'example.com/go/',
                placeholder: 'example.com/go/.*'
            });

            modalParamInput = syncFieldMode(ui.modalParamContainer, modalParamInput, '单个', {
                id: 'modalParam',
                value: paramResult,
                placeholder: 'redirect'
            });

            toggleOverlay(ui.overlay, true);
        } catch (error) {
            console.error('打开添加弹窗失败:', error);
        }
    });
}

function closeModal() {
    toggleOverlay(ui.overlay, false);
}

async function showDetail(card) {
    if (!card) {
        return;
    }

    state.currentDetailCard = card;
    const index = Number.parseInt(card.dataset.index, 10);
    const transfers = await getTransfers();
    const transfer = transfers[index];

    if (!transfer) {
        return;
    }

    const urlValue = Array.isArray(transfer.url) ? transfer.url.join('\n') : String(transfer.url || '.*');
    const paramValue = Array.isArray(transfer.param) ? transfer.param.join('\n') : String(transfer.param || 'redirect');

    ui.detailTitle.textContent = `编辑: ${transfer.name || '未命名'}`;
    ui.detailName.value = transfer.name || '';
    ui.detailHomePage.value = transfer.homePage || '';

    ui.detailUrlType.value = Array.isArray(transfer.url) ? '多个' : '单个';
    ui.detailParamType.value = Array.isArray(transfer.param) ? '多个' : '单个';

    detailUrlInput = syncFieldMode(ui.detailUrlContainer, detailUrlInput, ui.detailUrlType.value, {
        id: 'detailUrl',
        value: urlValue,
        placeholder: 'example.com/go/.*'
    });

    detailParamInput = syncFieldMode(ui.detailParamContainer, detailParamInput, ui.detailParamType.value, {
        id: 'detailParam',
        value: paramValue,
        placeholder: 'redirect'
    });

    toggleOverlay(ui.detailOverlay, true);
}

function closeDetail() {
    toggleOverlay(ui.detailOverlay, false);
    state.currentDetailCard = null;
}

async function saveDetail() {
    if (!state.currentDetailCard) {
        return;
    }

    const item = buildTransferItemFromForm({
        nameElement: ui.detailName,
        homePageElement: ui.detailHomePage,
        urlElement: detailUrlInput,
        paramElement: detailParamInput,
        urlTypeElement: ui.detailUrlType,
        paramTypeElement: ui.detailParamType
    });

    const transfers = await getTransfers();
    const index = Number.parseInt(state.currentDetailCard.dataset.index, 10);

    if (!Number.isNaN(index) && index >= 0 && index < transfers.length) {
        transfers[index] = item;
        await setTransfers(transfers);
    }

    closeDetail();
    await renderCards();
}

async function saveNewTransfer(event) {
    event.preventDefault();

    const item = buildTransferItemFromForm({
        nameElement: ui.modalName,
        homePageElement: ui.modalHomePage,
        urlElement: modalUrlInput,
        paramElement: modalParamInput,
        urlTypeElement: ui.modalUrlType,
        paramTypeElement: ui.modalParamType
    });

    const transfers = await getTransfers();
    transfers.push(item);
    await setTransfers(transfers);
    closeModal();
    await renderCards();
}

function bindEvents() {
    ui.modalUrlType.addEventListener('change', syncModalInputHeights);
    ui.modalParamType.addEventListener('change', syncModalInputHeights);
    ui.detailUrlType.addEventListener('change', syncDetailInputHeights);
    ui.detailParamType.addEventListener('change', syncDetailInputHeights);

    ui.addBtn.addEventListener('click', openModal);
    ui.cancelBtn.addEventListener('click', closeModal);
    ui.saveBtn.addEventListener('click', saveNewTransfer);

    ui.detailCloseBtn.addEventListener('click', closeDetail);
    ui.detailSaveBtn.addEventListener('click', saveDetail);

    ui.overlay.addEventListener('click', (event) => {
        if (event.target === ui.overlay) {
            closeModal();
        }
    });

    ui.detailOverlay.addEventListener('click', (event) => {
        if (event.target === ui.detailOverlay) {
            closeDetail();
        }
    });

    ui.cardList.addEventListener('click', async (event) => {
        const deleteButton = event.target.closest('.del-btn');
        if (deleteButton) {
            event.stopPropagation();
            const index = Number.parseInt(deleteButton.dataset.index, 10);

            if (confirm('确定要删除这个规则吗？')) {
                const transfers = await getTransfers();
                transfers.splice(index, 1);
                await setTransfers(transfers);
                await renderCards();
            }
            return;
        }

        const settingsButton = event.target.closest('.settings-btn');
        if (settingsButton) {
            event.stopPropagation();
            const card = settingsButton.closest('.transfer-card');
            if (card) {
                await showDetail(card);
            }
        }
    });

    ui.cardList.addEventListener('contextmenu', async (event) => {
        const card = event.target.closest('.transfer-card');
        if (card) {
            event.preventDefault();
            await showDetail(card);
        }
    });
}

window.showDetail = showDetail;

bindEvents();
renderCards();
