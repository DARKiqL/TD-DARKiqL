const wikiModal = document.getElementById('wiki-modal');
const wikiTabsEl = document.getElementById('wiki-tabs');
const wikiBodyEl = document.getElementById('wiki-body');
let wikiActiveTab = 'towers';
let wikiBuilt = false;

const WIKI_STAT_LABELS = {
    cost: 'قیمت', damage: 'آسیب', range: 'برد', fireRate: 'فاصله بین حملات', slow: 'کندی',
    blastRadius: 'شعاع انفجار', minDamage: 'حداقل آسیب', maxDamage: 'حداکثر آسیب', rampUpTime: 'زمان شارژ',
    buff: 'افزایش سرعت حمله', targets: 'تعداد اهداف', stun: 'گیج‌کنندگی',
    attacksForGold: 'فاصله دزدیدن', goldPerProc: 'پول در هر بار',
    upgradeDiscount: 'تخفیف ارتقا', rangeBuff: 'افزایش برد', damageBuff: 'افزایش آسیب', spawnRate: 'فاصله تولید',
    spawnCount: 'تعداد تولید', attacksBeforeOverheat: 'حمله قبل از داغی', shotsPerRound: 'تعداد شلیک در هر دور',
    goldPerWave: 'درآمد هر موج', pushback: 'فاصله عقب‌راندن', moneyMultiplier: 'ضریب پول اضافی', baseGold: 'پول پایه',
    tankSpawnRate: 'فاصله تولید تانک', tankSpawnCount: 'تعداد تانک', chainTargets: 'اهداف زنجیره‌ای', chainRadius: 'برد زنجیره‌ای',
    specialAttackRate: 'فاصله ویژه', specialDamage: 'آسیب ویژه', specialBlastRadius: 'شعاع انفجار ویژه',
    specialSignalRate: 'فاصله تیر سیگنال', specialPercentDamage: 'آسیب درصدی', specialMultiplier: 'افزایش آسیب برخورد',
    reloadTime: 'زمان بارگذاری', missileCount: 'تعداد موشک', flightTime: 'زمان پرواز', salvoCount: 'تعداد تیراندازی پیاپی',
    salvoInterval: 'فاصله تیراندازی پیاپی', burnPercent: 'درصد سوختن', bossBurnPercent: 'درصد سوختن رئیس', critChance: 'احتمال ضربه بحرانی',
    beamSpread: 'پراکندگی پرتو', heatFieldRangeBonus: 'افزایش برد میدان', heatDamageRadius: 'شعاع سوختگی',
    overheatDuration: 'مدت داغی', sharedVision: 'دید مشترک', reloadSync: 'همگام‌سازی بارگذاری',
    missileDamage: 'آسیب موشک', missileBlastRadius: 'شعاع انفجار موشک', missileFireRate: 'فاصله حملات موشک',
    lingerTime: 'مدت ماندگاری'
};
const WIKI_STAT_ORDER = ['damage','minDamage','maxDamage','range','fireRate','lingerTime','missileDamage','missileBlastRadius','missileFireRate','reloadTime','missileCount','blastRadius','slow','stun','targets','chainTargets','chainRadius','shotsPerRound','buff','damageBuff','rangeBuff','upgradeDiscount','rampUpTime','burnPercent','bossBurnPercent','critChance','beamSpread','heatFieldRangeBonus','heatDamageRadius','attacksBeforeOverheat','overheatDuration','spawnRate','spawnCount','tankSpawnRate','tankSpawnCount','goldPerWave','attacksForGold','goldPerProc','pushback','moneyMultiplier','baseGold','flightTime','salvoCount','salvoInterval','specialAttackRate','specialDamage','specialBlastRadius','specialSignalRate','specialPercentDamage','specialMultiplier','cost','sharedVision','reloadSync'];

function formatWikiStat(key, value) {
    if (value === true) return 'بله';
    if (value === false || value === undefined || value === null) return '—';
    switch (key) {
        case 'fireRate': case 'rampUpTime': case 'spawnRate': case 'tankSpawnRate': case 'reloadTime': case 'flightTime': case 'salvoInterval': case 'overheatDuration': case 'missileFireRate': case 'lingerTime': {
            const sec = value / 60;
            let str = sec < 0.1 ? sec.toFixed(3) : sec < 1 ? sec.toFixed(2) : (sec % 1 === 0 ? sec.toFixed(0) : sec.toFixed(1));
            if (str.indexOf('.') !== -1) str = str.replace(/0+$/, '').replace(/\.$/, '');
            return str + 's';
        }
        case 'slow': return Math.round(value * 100) + '%';
        case 'buff': case 'rangeBuff': case 'damageBuff': return '+' + Math.round((value - 1) * 100) + '%';
        case 'upgradeDiscount': return Math.round(value * 100) + '%';
        case 'stun': return value + 's';
        case 'burnPercent': case 'bossBurnPercent': case 'specialPercentDamage': return (value * 100).toFixed(value < 0.01 ? 2 : 1) + '%';
        case 'critChance': return Math.round(value * 100) + '%';
        case 'moneyMultiplier': case 'heatFieldRangeBonus': return '+' + Math.round(value * 100) + '%';
        case 'attacksBeforeOverheat': return value === Infinity ? '∞' : value;
        default: return value;
    }
}

function wikiEnemyBaseHp(wave) {
    if (wave <= 10) return Math.floor(40 * Math.pow(1.15, wave));
    if (wave <= 20) { const hpAt10 = 40 * Math.pow(1.15, 10); return Math.floor(hpAt10 * Math.pow(1.33, wave - 10)); }
    const hpAt10 = 45 * Math.pow(1.15, 10); const hpAt20 = hpAt10 * Math.pow(1.25, 10); return Math.floor(hpAt20 * Math.pow(1.18, wave - 20));
}

const WIKI_ENEMIES = [
    { type: 'normal', name: 'دشمن معمولی', hpMult: 1, speed: 1.0, size: 10, color: '#bdbdbd', appearance: 'واحد پایه در موج‌های ۱ تا ۳۰', desc: 'دشمن استاندارد، بدون مقاومت یا قابلیت ویژه.', traits: ['جان پایه: بر اساس فرمول رشد موج محاسبه می‌شود', 'سرعت حرکت پایه: ×1.0', 'پاداش کشتن: ۵ + پاداش موج'] },
    { type: 'fast', name: 'دشمن سریع', hpMult: 0.8, speed: 2.5, size: 8, color: '#fff176', appearance: 'از موج ۱۱ به بعد ظاهر می‌شود', desc: 'واحد با جان کم و تحرک بالا، اولویت تست پوشش آتش و کنترل کندی.', traits: ['جان اصلی: ۸۰٪ دشمن معمولی', 'سرعت حرکت پایه: ×2.5', 'مقاومت کنترل اضافی ندارد'] },
    { type: 'strong', name: 'دشمن قوی', hpMult: 2.2, speed: 0.7, size: 20, color: '#ef5350', appearance: 'از موج ۲۱ به بعد ظاهر می‌شود', desc: 'واحد سنگین با جان بالا و سرعت حرکت کم.', traits: ['جان اصلی: ۲.۲ برابر دشمن معمولی', 'سرعت حرکت پایه: ×0.7', 'مقاومت کنترل اضافی ندارد'] },
    { type: 'shield', name: 'دشمن دارای سپر', hpMult: 1.7, speed: 0.85, size: 15, color: '#42a5f5', appearance: 'از موج ۱ ظاهر می‌شود؛ تعداد با موج افزایش می‌یابد', desc: 'دارای سپری مستقل برای تحمل آسیب؛ تا زمانی که سپر نشکسته، هیچ کاهش‌اثری نمی‌پذیرد.', traits: ['جان اصلی: ۱.۷ برابر دشمن معمولی', 'جان سپر: ۵۰٪ جان پایه', 'در زمان وجود سپر، در برابر کندی، گیج‌کنندگی، یخ‌زدگی، سوختن، شکستن دفاع و اختلال سرگردانی مصون است', 'پس از شکستن سپر، کنترل‌پذیری恢复正常'] },
    { type: 'summoner', name: 'احضارکننده', hpMult: 3, speed: 0.5, size: 18, color: '#9c27b0', appearance: 'در موج‌های ۱۰، ۱۵، ۲۰ و ۲۵ هر کدام ۱ عدد، در انتهای صف ثابت', desc: 'واحد با سرعت کم و جان بالا؛ هرچه بیشتر زنده بماند، نیروی کمکی بیشتری تولید می‌کند.', traits: ['جان اصلی: ۳ برابر دشمن معمولی', 'سرعت حرکت پایه: ×0.5', 'هر ۵۰ ثانیه در موقعیت فعلی ۲ دشمن معمولی و ۱ دشمن دارای سپر احضار می‌کند', 'نیروهای کمکی، جان و پاداش موج فعلی را به ارث می‌برند'] },
    { type: 'boss', name: 'رئیس', hpMult: 75, speed: 1.0, size: 25, color: '#ce93d8', appearance: 'فقط در موج ۳۰ به تنهایی ظاهر می‌شود', desc: 'رئیس موج نهایی، با توانایی سرکوب سراسری مرحله‌ای و مقاومت در برابر کنترل.', traits: ['جان اصلی: ۷۵ برابر دشمن معمولی', 'سرعت حرکت پایه: ×1.0', 'مدت کندی و گیج‌کنندگی نصف می‌شود', 'آستانه یخ‌زدگی ۴۰ لایه، یخ‌زدگی ۲ ثانیه طول می‌کشد', 'وقتی جان به ۷۵٪ / ۵۰٪ / ۲۵٪ رسید، موج ضربه‌ای تمام صفحه منتشر می‌کند که برج‌های دفاعی را ۳.۳ ثانیه گیج می‌کند؛ تخریب‌گرهای در حال استقرار مصون هستند'] },
    { type: 'dummy', name: 'آدمک آزمایشی', hpMult: null, speed: 0, size: 50, color: '#9e9e9e', appearance: 'فقط در زمین تست ظاهر می‌شود', desc: 'هدف ثابت برای اندازه‌گیری DPS.', traits: ['جان ثابت: ۱۰۰,۰۰۰', 'سرعت حرکت پایه: ۰', 'پس از کشته شدن، در زمین تست جان بازنشانی می‌شود'] }
];

function buildWikiTowers() {
    let html = '<div class="wiki-section-title">راهنمای تصویری برج‌های دفاعی</div>';
    html += '<p class="wiki-note">واحد برد، خانه (۱ خانه = ۴۰ پیکسل) است؛ واحد زمان برای فاصله حملات/بارگذاری، ثانیه است. قیمت مربوط به هزینه ساخت سطح اول یا ارتقا است. سطح EX معمولاً نیاز به شرایط خاص برای ارتقا دارد.</p>';
    html += '<div class="wiki-grid">';
    for (const key in TOWER_DATA) {
        const t = TOWER_DATA[key];
        const levelCount = t.levels.length;
        const allKeys = new Set();
        t.levels.forEach(lv => Object.keys(lv).forEach(k => allKeys.add(k)));
        const statKeys = WIKI_STAT_ORDER.filter(k => allKeys.has(k));
        const accent = t.color || '#e0e0e0';
        html += `<div class="wiki-card" style="--card-accent:${accent}">`;
        html += `<div class="wiki-card-heading"><canvas class="wiki-model" width="76" height="76" data-wiki-tower-model="${key}" role="img" aria-label="${t.name} مدل"></canvas><div>`;
        html += `<h3>${t.name}`;
        if (t.limit) html += `<span class="wiki-limit">حداکثر تعداد ${t.limit}</span>`;
        if (t.exLimit) html += `<span class="wiki-limit">حداکثر تعداد EX ${t.exLimit}</span>`;
        if (!t.limit) html += `<span class="wiki-limit">نامحدود</span>`;
        html += `</h3></div></div>`;
        html += `<span class="wiki-feature-title">ویژگی‌های پایه</span><p class="wiki-desc">${t.description || 'بدون توضیح اضافی.'}</p>`;
        if (t.exDescription) html += `<span class="wiki-feature-title">ویژگی‌های سطح EX</span><p class="wiki-ex">${t.exDescription}</p>`;
        html += `<table class="wiki-table"><thead><tr><th>ویژگی</th>`;
        for (let i = 0; i < levelCount; i++) html += `<th>${i === levelCount - 1 && t.exDescription ? 'EX' : (i + 1) + 'سطح'}</th>`;
        html += `</tr></thead><tbody>`;
        for (const sk of statKeys) {
            html += `<tr><td style="text-align:left;color:#9e9e9e">${WIKI_STAT_LABELS[sk] || sk}</td>`;
            for (let i = 0; i < levelCount; i++) {
                const isEx = i === levelCount - 1 && t.exDescription;
                html += `<td class="${isEx ? 'ex-row' : (sk === 'cost' ? 'lvl' : '')}">${formatWikiStat(sk, t.levels[i][sk])}</td>`;
            }
            html += `</tr>`;
        }
        html += `</tbody></table>`;
        if (key === 'pursuit') {
            html += `<p class="wiki-skill">قابلیت فعال «حالت اضافه بار» (EX): زمان بازیابی ۶۰ ثانیه → افزایش ۲۰٪ قدرت حمله، شلیک ۵۰ موشک پیاپی، هر ۱۰ موشک ۲ ثانیه از زمان بارگذاری همه تعقیب‌گرها کم می‌کند. دشمنان گیج شده همچنان تحت تأثیر سرگردانی به سمت مخالف حرکت می‌کنند.</p>`;
        }
        if (key === 'frostPunish') {
            html += `<p class="wiki-skill">مکانیزم دقیق: یک تیر یخ‌زده به سمت یک هدف شلیک می‌کند و آسیب زیادی وارد کرده و کندی شدیدی اعمال می‌کند (کندی با دیگر کندی‌ها به صورت ضربی جمع می‌شود؛ اگر هدف در حالت سوختن باشد، این کندی نصف می‌شود).<br>مجازات الهه: اگر قبل از برخورد، هدف حداقل ۴۰٪ کندی داشته باشد یا در حالت یخ‌زدگی باشد، این آسیب ×۲ می‌شود و ۶۰٪ آن آسیب به صورت انفجار در محدوده ۲ خانه اطراف هدف پخش می‌شود و همزمان یک صاعقه از آسمان فرود می‌آید.<br>نشان یخ: هر ۵ حمله، ۱ لایه نشان یخ به هدف اضافه می‌کند، با رسیدن به ۱۵ لایه، دشمن یخ می‌زند (معمولی ۴ ثانیه / رئیس ۲ ثانیه)، تعداد لایه‌ها با برج کندکننده مشترک است.<br>رئیس: اثر کندی روی رئیس ۵۰٪ کاهش می‌یابد.</p>`;
        }
        html += `</div>`;
    }
    html += `</div>`;
    return html;
}

function buildWikiEnemies() {
    const waves = [1, 5, 10, 15, 20, 25, 30];
    let html = '<div class="wiki-section-title">راهنمای تصویری دشمنان</div>';
    html += '<p class="wiki-note">سرعت بر اساس مقدار پایه (× ضریب نقشه) است، ۱.۰ تقریباً برابر با ۱ خانه در ثانیه است. جان بر اساس مقدار پایه (× ضریب دشمن × ضریب جان نقشه) است. رئیس در موج ۳۰ ظاهر می‌شود.</p>';
    html += '<div class="wiki-grid">';
    for (const e of WIKI_ENEMIES) {
        html += `<div class="wiki-card wiki-enemy-card" style="--card-accent:${e.color}">`;
        html += `<div class="wiki-card-heading"><canvas class="wiki-model" width="76" height="76" data-wiki-enemy-model="${e.type}" role="img" aria-label="${e.name} مدل"></canvas><div><h3>${e.name}</h3><span class="wiki-limit">${e.appearance}</span></div></div>`;
        html += `<span class="wiki-feature-title">ویژگی‌های واحد</span><p class="wiki-desc">${e.desc}</p>`;
        if (e.hpMult !== null) {
            html += `<div class="wiki-stat-list">`;
            html += `<div><span class="wiki-stat-key">ضریب جان</span>×${e.hpMult}</div>`;
            html += `<div><span class="wiki-stat-key">سرعت حرکت</span>×${e.speed}</div>`;
            html += `<div><span class="wiki-stat-key">حجم</span>${e.size}px</div>`;
            html += `</div>`;
            html += `<table class="wiki-table" style="margin-top:6px"><thead><tr><th>موج</th>${waves.map(w => `<th>${w}</th>`).join('')}</tr></thead><tbody><tr><td style="color:#9e9e9e">جان</td>`;
            for (const w of waves) {
                const hp = Math.floor(wikiEnemyBaseHp(w) * e.hpMult);
                html += `<td>${hp.toLocaleString()}</td>`;
            }
            html += `</tr></tbody></table>`;
        } else {
            html += `<div class="wiki-stat-list"><div><span class="wiki-stat-key">جان</span>۱۰۰,۰۰۰</div><div><span class="wiki-stat-key">سرعت حرکت</span>۰</div></div>`;
        }
        html += `<span class="wiki-feature-title">قوانین دقیق</span><div class="wiki-stat-list">${e.traits.map(trait => `<div>${trait}</div>`).join('')}</div>`;
        html += `</div>`;
    }
    html += `</div>`;
    html += '<div class="wiki-section-title">فرمول رشد جان</div>';
    html += '<div class="wiki-card" style="--card-accent:#4dd0e1"><div class="wiki-stat-list">';
    html += `<div><span class="wiki-stat-key">موج‌های ۱ تا ۱۰</span>baseHp = ⌊40 × 1.15^wave⌋</div>`;
    html += `<div><span class="wiki-stat-key">موج‌های ۱۱ تا ۲۰</span>baseHp = ⌊(40×1.15¹⁰) × 1.33^(wave−10)⌋</div>`;
    html += `<div><span class="wiki-stat-key">موج‌های ۲۱ تا ۳۰</span>baseHp = ⌊(45×1.15¹⁰×1.25¹⁰) × 1.18^(wave−20)⌋</div>`;
    html += `<div><span class="wiki-stat-key">پاداش پول</span>۵ + ضریب موج (≤۱۰: +wave؛ ≤۲۰: +۱۰+(wave−۱۰)×۲؛ &gt;۲۰: +۳۰+(wave−۲۰)×۳)</div>`;
    html += `</div></div>`;
    html += '<div class="wiki-section-title">ترکیب موج</div>';
    html += '<div class="wiki-card" style="--card-accent:#ffd700"><div class="wiki-stat-list">';
    html += `<div><span class="wiki-stat-key">تعداد کل</span>≤۵ موج: ۴+۲w؛ ≤۱۰ موج: ۶+۲w؛ ≤۲۰ موج: ۸+۲w؛ &gt;۲۰ موج: ۴+۲w</div>`;
    html += `<div><span class="wiki-stat-key">تعداد سپر</span>≤۱۰ موج:۱ ≤۱۵ موج:۲ ≤۲۰ موج:۳ ≤۳۰ موج:۴</div>`;
    html += `<div><span class="wiki-stat-key">تعداد سریع</span>≥۱۱ موج: min(۵, ⌊تعداد کل×۰.۲۵⌋)</div>`;
    html += `<div><span class="wiki-stat-key">تعداد قوی</span>≥۲۱ موج: min(۵, ⌊تعداد کل×۰.۲۵⌋)</div>`;
    html += `<div><span class="wiki-stat-key">احضارکننده</span>موج‌های ۱۰/۱۵/۲۰/۲۵ هر کدام ۱ عدد (ثابت در انتهای صف)</div>`;
    html += `<div><span class="wiki-stat-key">رئیس</span>موج ۳۰ (موج نهایی) به تنهایی ۱ عدد</div>`;
    html += `<div><span class="wiki-stat-key">فاصله تولد</span>هر ۰.۵ ثانیه ۱ عدد</div>`;
    html += `</div></div>`;
    html += '<div class="wiki-section-title">توضیح اثرات کنترل</div>';
    html += '<div class="wiki-card" style="--card-accent:#ce93d8"><div class="wiki-stat-list">';
    html += `<div><span class="wiki-stat-key">گیج‌کنندگی</span>حرکت متوقف می‌شود؛ اگر همزمان در حالت سرگردانی باشد، همچنان به سمت مخالف حرکت می‌کند</div>`;
    html += `<div><span class="wiki-stat-key">سرگردانی (تعقیب)</span>با انباشت ۸۰ لایه اختلال فعال می‌شود، به مدت ۳ ثانیه در مسیر معکوس حرکت می‌کند، هر بار فعال‌سازی +۱۰٪ مقاومت</div>`;
    html += `<div><span class="wiki-stat-key">یخ‌زدگی (EX برج کندکننده)</span>معمولی ۱۵ لایه یخ‌زدگی ۴ ثانیه / رئیس ۴۰ لایه یخ‌زدگی ۲ ثانیه</div>`;
    html += `<div><span class="wiki-stat-key">مصونیت سپر</span>در زمان وجود سپر، در برابر همه کاهش‌اثرها مصون است</div>`;
    html += `<div><span class="wiki-stat-key">مقاومت رئیس</span>کندی/گیج‌کنندگی نصف، آستانه یخ‌زدگی بالاتر</div>`;
    html += `</div></div>`;
    return html;
}

const WIKI_TAB_ICONS = {
    towers: '<svg class="ui-svg-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V9l7-5 7 5v11M3 20h18M9 20v-5h6v5M8 9h.01M16 9h.01"/></svg>',
    enemies: '<svg class="ui-svg-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16v-5a7 7 0 0 1 14 0v5M8 15h.01M16 15h.01M9 19c1.8 1.3 4.2 1.3 6 0M4 7 2.5 5.5M20 7l1.5-1.5"/></svg>'
};

function renderWikiTowerModel(canvasEl, type) {
    const modelSize = canvasEl.width;
    const modelCtx = canvasEl.getContext('2d');
    modelCtx.clearRect(0, 0, modelSize, modelSize);
    const previewTower = new Tower(modelSize / 2, modelSize / 2, type);
    previewTower.draw(modelCtx, modelSize / 50);
}

function renderWikiEnemyModel(canvasEl, type) {
    const modelCtx = canvasEl.getContext('2d');
    const enemy = new Enemy(1, type);
    const isLargeModel = type === 'boss' || type === 'dummy';
    const targetRadius = isLargeModel ? 18 : 23;
    const modelScale = targetRadius / Math.max(enemy.size, 1);
    modelCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    modelCtx.save();
    modelCtx.translate(canvasEl.width / 2, canvasEl.height * .57);
    modelCtx.scale(modelScale, modelScale);
    const animTime = enemy.animPhase;
    switch (type) {
        case 'shield': enemy.drawShieldModel(modelCtx, animTime, 1); break;
        case 'fast': enemy.drawFastModel(modelCtx, animTime, 1); break;
        case 'strong': enemy.drawStrongModel(modelCtx, animTime, 1); break;
        case 'boss': enemy.drawBossModel(modelCtx, animTime, 1); break;
        case 'summoner': enemy.drawSummonerModel(modelCtx, animTime, 1); break;
        case 'dummy': enemy.drawDummyModel(modelCtx, animTime); break;
        default: enemy.drawNormalModel(modelCtx, animTime, 1); break;
    }
    modelCtx.restore();
}

function renderWikiModels() {
    wikiBodyEl.querySelectorAll('[data-wiki-tower-model]').forEach(canvasEl => renderWikiTowerModel(canvasEl, canvasEl.dataset.wikiTowerModel));
    wikiBodyEl.querySelectorAll('[data-wiki-enemy-model]').forEach(canvasEl => renderWikiEnemyModel(canvasEl, canvasEl.dataset.wikiEnemyModel));
}

function renderWiki() {
    wikiBodyEl.innerHTML = wikiActiveTab === 'towers' ? buildWikiTowers() : buildWikiEnemies();
    renderWikiModels();
    wikiBodyEl.scrollTop = 0;
}

function renderWikiTabs() {
    const tabs = [['towers', 'برج‌ها'], ['enemies', 'دشمنان']];
    wikiTabsEl.innerHTML = tabs.map(([key, label]) => `<button type="button" class="wiki-tab${key === wikiActiveTab ? ' active' : ''}" data-wiki-tab="${key}">${WIKI_TAB_ICONS[key]}${label}</button>`).join('');
}

function openWiki() {
    renderWikiTabs();
    renderWiki();
    wikiModal.style.display = 'flex';
    wikiBuilt = true;
}
function closeWiki() { wikiModal.style.display = 'none'; }

wikiTabsEl.addEventListener('click', event => {
    const btn = event.target.closest('[data-wiki-tab]');
    if (!btn) return;
    wikiActiveTab = btn.dataset.wikiTab;
    renderWikiTabs();
    renderWiki();
});
document.getElementById('open-wiki-btn').addEventListener('click', openWiki);
document.getElementById('wiki-close-x').addEventListener('click', closeWiki);
wikiModal.addEventListener('click', event => { if (event.target === wikiModal) closeWiki(); });
window.addEventListener('keydown', event => { if (event.key === 'Escape' && wikiModal.style.display === 'flex') closeWiki(); });