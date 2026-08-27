const leaderboardModal = document.getElementById('leaderboard-modal');
const leaderboardAccount = document.getElementById('leaderboard-account');
const leaderboardTabs = document.getElementById('leaderboard-map-tabs');
const leaderboardStatus = document.getElementById('leaderboard-status');
const leaderboardList = document.getElementById('leaderboard-list');
let leaderboardActiveMap = 'MAP1';
let leaderboardMe = null;

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

async function fetchJson(url, options = {}) {
    const response = await fetch(url, { credentials: 'same-origin', ...options });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
        const error = new Error(body.error || `درخواست ناموفق (${response.status})`);
        error.status = response.status;
        throw error;
    }
    return body;
}

function renderLeaderboardTabs() {
    leaderboardTabs.innerHTML = Object.keys(MAP_DATA).map(mapId => {
        const active = mapId === leaderboardActiveMap;
        return `<button type="button" class="leaderboard-map-tab${active ? ' active' : ''}" data-leaderboard-map="${mapId}" role="tab" aria-selected="${active}">${escapeHtml(MAP_DATA[mapId].name || mapId)}</button>`;
    }).join('');
}

function renderLeaderboardAccount() {
    if (leaderboardMe?.authenticated && leaderboardMe.user) {
        const user = leaderboardMe.user;
        leaderboardAccount.innerHTML = `ورود شده: <b>${escapeHtml(user.name || user.username)}</b><span>（${escapeHtml(user.username)}）</span><button type="button" class="leaderboard-logout" data-leaderboard-logout>خروج</button>`;
        return;
    }
    if (leaderboardMe?.oauthReady) {
        leaderboardAccount.innerHTML = `برای ثبت امتیاز باید وارد LinuxDo شوید.<button type="button" class="leaderboard-login" data-leaderboard-login>ورود با LinuxDo</button>`;
    } else {
        leaderboardAccount.textContent = 'برای ثبت امتیاز باید با LinuxDo وارد شوید (تنظیمات ورود در حال آماده‌سازی).';
    }
}

function renderLeaderboardEntries(entries) {
    if (!entries.length) {
        leaderboardList.innerHTML = '<li class="leaderboard-empty">هنوز رکوردی برای این نقشه ثبت نشده است. اولین نفری باشید که بازی را کامل کرده و آن را آپلود می‌کند.</li>';
        return;
    }
    leaderboardList.innerHTML = entries.map((entry, index) => {
        const rankClass = entry.rank <= 3 ? ' top-three' : '';
        const bonus = Math.round(Number(entry.skillMultiplier || 1) * 100 - 100);
        const replayOutdated = Number(entry.replayVersion || 1) !== 3;
        return `<li class="leaderboard-entry"><span class="leaderboard-rank${rankClass}">#${entry.rank}</span><span class="leaderboard-player"><b>${escapeHtml(entry.name || entry.username)}</b><span>@${escapeHtml(entry.username)}</span>${replayOutdated ? '<span class="leaderboard-replay-stale">نسخه بازپخش قدیمی است</span>' : ''}</span><span class="leaderboard-loadout" data-leaderboard-loadout="${index}" aria-label="برج‌های استفاده شده در این بازی"></span><span class="leaderboard-score">${Number(entry.score || 0).toLocaleString()}<small>سرعت ${Number(entry.speedScore || 0).toLocaleString()} · پایه ${Number(entry.baseScore || 0).toLocaleString()} · متخصص +${bonus}%</small></span><button type="button" class="watch-replay-btn" data-watch-replay="${escapeHtml(entry.replayId)}">تماشای بازپخش</button></li>`;
    }).join('');
    entries.forEach((entry, index) => renderLeaderboardLoadout(leaderboardList.querySelector(`[data-leaderboard-loadout="${index}"]`), entry.towerPool));
}

function renderLeaderboardLoadout(container, towerPool) {
    if (!container) return;
    const types = Array.isArray(towerPool) ? towerPool.filter(type => TOWER_DATA[type]).slice(0, NORMAL_TOWER_POOL_SIZE) : [];
    if (!types.length) {
        container.innerHTML = '<span class="leaderboard-loadout-empty">تنظیمات برج ذخیره نشده</span>';
        return;
    }
    const modelSize = window.matchMedia('(max-width: 700px)').matches ? 34 : 36;
    for (const type of types) {
        const model = document.createElement('span');
        model.className = 'leaderboard-loadout-tower';
        model.title = TOWER_DATA[type].name;
        model.setAttribute('aria-label', TOWER_DATA[type].name);
        const modelCanvas = document.createElement('canvas');
        modelCanvas.width = modelSize;
        modelCanvas.height = modelSize;
        model.appendChild(modelCanvas);
        const previewTower = new Tower(modelSize / 2, modelSize / 2, type);
        previewTower.draw(modelCanvas.getContext('2d'), modelSize / 50);
        container.appendChild(model);
    }
}

async function loadLeaderboard(mapId = leaderboardActiveMap, notice = '') {
    if (!MAP_DATA[mapId]) mapId = 'MAP1';
    leaderboardActiveMap = mapId;
    renderLeaderboardTabs();
    leaderboardStatus.textContent = 'در حال بارگذاری رتبه‌بندی...';
    leaderboardList.replaceChildren();
    try {
        const [me, board] = await Promise.all([
            fetchJson('/td/api/me'),
            fetchJson(`/td/api/leaderboard?map=${encodeURIComponent(leaderboardActiveMap)}&limit=50`)
        ]);
        leaderboardMe = me;
        renderLeaderboardAccount();
        renderLeaderboardEntries(Array.isArray(board.entries) ? board.entries : []);
        leaderboardStatus.textContent = notice || `${MAP_DATA[leaderboardActiveMap].name} · مجموعاً ${Array.isArray(board.entries) ? board.entries.length : 0} رکورد`;
    } catch (error) {
        leaderboardAccount.textContent = 'ارتباط با رتبه‌بندی برقرار نیست.';
        leaderboardStatus.textContent = `بارگذاری ناموفق: ${error.message}`;
        leaderboardList.innerHTML = '<li class="leaderboard-empty">لطفاً دوباره تلاش کنید.</li>';
    }
}

async function openLeaderboard(mapId = leaderboardActiveMap, notice = '') {
    leaderboardModal.style.display = 'flex';
    await loadLeaderboard(mapId, notice);
}

function closeLeaderboard() {
    leaderboardModal.style.display = 'none';
}

async function watchReplay(replayId) {
    if (!replayId) return;
    leaderboardStatus.textContent = 'در حال دانلود بازپخش...';
    try {
        const payload = await fetchJson(`/td/api/replays/${encodeURIComponent(replayId)}`);
        closeLeaderboard();
        startReplayFromPayload(payload.replay);
    } catch (error) {
        leaderboardStatus.textContent = `بارگذاری بازپخش ناموفق: ${error.message}`;
    }
}

async function uploadCurrentScore() {
    if (!lastVictoryResult || !replayRecorder || isReplayMode || isTestMode) return;
    const uploadButton = document.getElementById('upload-score-btn');
    uploadButton.disabled = true;
    uploadButton.textContent = 'در حال بررسی ورود...';
    try {
        const me = await fetchJson('/td/api/me');
        if (!me.authenticated) {
            window.location.assign('/td/auth/linuxdo/login');
            return;
        }
        uploadButton.textContent = 'در حال آپلود...';
        const replay = { ...replayRecorder, actions: replayRecorder.actions.slice(), result: lastVictoryResult };
        const result = await fetchJson('/td/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mapId: selectedMap,
                score: lastVictoryResult.totalScore,
                speedScore: lastVictoryResult.speedScore,
                baseScore: lastVictoryResult.baseScore,
                skillMultiplier: 1 + lastVictoryResult.expertBonus,
                replay
            })
        });
        modal.style.display = 'none';
        const notice = result.uploaded
            ? `آپلود موفق! رتبه فعلی شما: #${result.rank}.`
            : `امتیاز قبلی بهتر (${Number(result.bestScore).toLocaleString()}) پوشش داده نشد.`;
        await openLeaderboard(selectedMap, notice);
    } catch (error) {
        if (error.status === 401) {
            window.location.assign('/td/auth/linuxdo/login');
            return;
        }
        uploadButton.disabled = false;
        uploadButton.textContent = 'آپلود به رتبه‌بندی';
        alert(`آپلود ناموفق: ${error.message}`);
    }
}

document.getElementById('open-leaderboard-btn').addEventListener('click', () => openLeaderboard());
document.getElementById('leaderboard-close-x').addEventListener('click', closeLeaderboard);
leaderboardModal.addEventListener('click', event => { if (event.target === leaderboardModal) closeLeaderboard(); });
leaderboardTabs.addEventListener('click', event => {
    const button = event.target.closest('[data-leaderboard-map]');
    if (button) loadLeaderboard(button.dataset.leaderboardMap);
});
leaderboardAccount.addEventListener('click', event => {
    if (event.target.closest('[data-leaderboard-login]')) window.location.assign('/td/auth/linuxdo/login');
    if (event.target.closest('[data-leaderboard-logout]')) window.location.assign('/td/auth/logout');
});
leaderboardList.addEventListener('click', event => {
    const button = event.target.closest('[data-watch-replay]');
    if (button) watchReplay(button.dataset.watchReplay);
});
document.getElementById('upload-score-btn').addEventListener('click', uploadCurrentScore);

selectMapBtn.addEventListener('click', showMapSelection);
startTestBtn.addEventListener('click', () => {
    selectedMap = 'MAP1';
    startGame('test');
});
startGameFromMapBtn.addEventListener('click', () => startGame('normal'));
backToTowerSelectBtn.addEventListener('click', () => {
    mapSelectionScreen.style.display = 'none';
    selectionScreen.style.display = 'flex';
});

function lockBrowserZoomControls() {
    window.addEventListener('wheel', (event) => {
        if (event.ctrlKey) event.preventDefault();
    }, { passive: false });

    window.addEventListener('keydown', (event) => {
        const key = event.key;
        if ((event.ctrlKey || event.metaKey) && (key === '+' || key === '-' || key === '=' || key === '0')) {
            event.preventDefault();
        }
    });

    ['gesturestart', 'gesturechange', 'gestureend'].forEach(eventName => {
        window.addEventListener(eventName, event => event.preventDefault(), { passive: false });
    });
}

lockBrowserZoomControls();
window.addEventListener('resize', () => {
    updateGameStageScale();
    resizeCanvas();
    requestAnimationFrame(updateModernPanelPosition);
});
window.onload = () => {
    updateGameStageScale();
    initializeSelectionScreen();
    AudioDirector.playHome();
    maybeShowAnnouncement();
    const query = new URLSearchParams(window.location.search);
    if (query.get('leaderboard') === '1') {
        closeAnnouncement();
        openLeaderboard('MAP1', query.get('auth') === 'success' ? 'ورود با LinuxDo موفقیت‌آمیز بود، می‌توانید امتیاز خود را آپلود کنید.' : '');
        history.replaceState({}, '', window.location.pathname);
    }
};

['pointerdown', 'keydown'].forEach(eventName => window.addEventListener(eventName, () => AudioDirector.unlock(), { passive: true }));