const TOWER_DATA = {
    arrow: {
        name: 'برج کمان',
        description: 'یک کمان خودکار دقیق با برد بلند و قیمت مناسب، گزینه‌ای عالی از نظر ارزش خرید.',
        exDescription: 'هر ۵ حمله یک تیر انفجاری (آسیب ۳۰ منطقه‌ای) شلیک می‌کند؛ هر ۴۵ حمله یک تیر سیگنال شلیک می‌کند که پس از ۲ ثانیه در محل برخورد، بارانی از تیر به مدت ۳ ثانیه فرود می‌آورد.',
        color: '#8bc34a',
        projectileColor: '#dcedc8',
        levels: [
            { cost: 200, damage: 2, range: 5, fireRate: 39 },
            { cost: 250, damage: 4, range: 5.5, fireRate: 39 },
            { cost: 300, damage: 6, range: 6, fireRate: 36 },
            { cost: 500, damage: 10, range: 6.5, fireRate: 36 },
            { cost: 1500, damage: 20, range: 7, fireRate: 30, specialAttackRate: 5, specialDamage: 30, specialBlastRadius: 3, specialSignalRate: 45 }
        ]
    },
    cannon: {
        name: 'توپ جنگی',
        description: 'با باروت، گلوله‌هایی با ضربه بالا شلیک می‌کند که آسیب زیادی دارند و برد نسبتاً بلندی دارند؛ برخورد به دشمنان در شعاع ۱ خانه اطراف هدف، ۶۰٪ آسیب پاشیده ایجاد می‌کند.',
        exDescription: 'هر ۱۰ حمله یک پرتو تقویت‌شده شلیک می‌کند که به دشمنان معمولی بر اساس درصد جان فعلی‌شان آسیب می‌زند؛ به رئیس‌ها ۵ برابر آسیب حمله معمولی وارد می‌کند (لیزر اثر پاشیده ندارد).',
        color: '#795548',
        projectileColor: '#d7ccc8',
        levels: [
            { cost: 400, damage: 8, range: 6.5, fireRate: 60 },
            { cost: 500, damage: 12, range: 7, fireRate: 55 },
            { cost: 600, damage: 16, range: 8, fireRate: 50 },
            { cost: 700, damage: 20, range: 9, fireRate: 45 },
            { cost: 2000, damage: 60, range: 10, fireRate: 42, specialAttackRate: 10, specialPercentDamage: 0.05 }
        ]
    },
    magic: {
        name: 'برج جادویی',
        description: 'یک برج آسیب جادویی با آسیب بالا و برد بلند که توسط یک جادوگر حرفه‌ای اداره می‌شود. دشمنان ضربه‌خورده دچار شکستن دفاع می‌شوند و ۱۵٪ آسیب بیشتری دریافت می‌کنند.',
        exDescription: 'هر حمله یک لایه آسیب‌پذیری به دشمن اضافه می‌کند، هر دشمن حداکثر ۵۰ لایه می‌تواند داشته باشد و هر لایه آسیب دریافتی را ۱٪ افزایش می‌دهد.',
        color: '#9c27b0',
        projectileColor: '#e1bee7',
        levels: [
            { cost: 500, damage: 12, range: 7, fireRate: 70 },
            { cost: 600, damage: 17, range: 7, fireRate: 65 },
            { cost: 700, damage: 25, range: 8, fireRate: 60 },
            { cost: 800, damage: 32, range: 8, fireRate: 55 },
            { cost: 2500, damage: 100, range: 10, fireRate: 50 }
        ]
    },
    slow: {
        name: 'برج کندکننده',
        description: 'زمستان فرا رسیده است... به همه دشمنان در برد خود آسیب می‌زند و آنها را کند می‌کند. سطح EX می‌تواند دشمنان را یخ بزند. سطوح ۴ و EX تحت تأثیر افزایش برد سکوی موسیقی قرار نمی‌گیرند.',
        exDescription: 'هر ۵ حمله یک نشان یخ اضافه می‌کند؛ با رسیدن به ۱۵ لایه، دشمن یخ می‌زند (معمولی ۴ ثانیه / رئیس ۲ ثانیه).',
        exLimit: 5,
        color: '#03a9f4',
        levels: [
            { cost: 400, damage: 3, range: 3, slow: 0.2, fireRate: 100 },
            { cost: 500, damage: 5, range: 3.5, slow: 0.25, fireRate: 96 },
            { cost: 600, damage: 7, range: 4, slow: 0.3, fireRate: 90 },
            { cost: 700, damage: 10, range: 4.5, slow: 0.35, fireRate: 84 },
            { cost: 2200, damage: 12, range: 5, slow: 0.4, fireRate: 72 }
        ]
    },
    blast: {
        name: 'برج انفجاری',
        description: 'هنر یعنی انفجار! برج انفجاری به هدف و دشمنان اطراف آن در یک شعاع کوچک آسیب انفجاری وارد می‌کند.',
        exDescription: 'هنگامی که یک انفجار همزمان به چندین دشمن برخورد می‌کند، آسیب اضافی وارد می‌کند.',
        exLimit: 3,
        limit: 8,
        color: '#ff5722',
        projectileColor: '#ffccbc',
        levels: [
            { cost: 600, damage: 8, range: 4.5, fireRate: 90, blastRadius: 2.5 },
            { cost: 650, damage: 13, range: 5, fireRate: 85, blastRadius: 3 },
            { cost: 700, damage: 20, range: 5.5, fireRate: 80, blastRadius: 4 },
            { cost: 800, damage: 30, range: 6, fireRate: 75, blastRadius: 5 },
            { cost: 3000, damage: 80, range: 7, fireRate: 150, blastRadius: 6, specialMultiplier: 20 }
        ]
    },
    gamma: {
        name: 'پرتو گاما',
        description: 'این چیز خوبی نیست... حمله پرتو گاما به دشمنان اطراف هدف سرایت کرده و دوباره به آنها آسیب می‌زند.',
        limit: 10,
        color: '#D32F2F',
        projectileColor: '#FFCDD2',
        levels: [
            { cost: 400, damage: 7, range: 5, fireRate: 90, chainTargets: 5, chainRadius: 5 },
            { cost: 600, damage: 12, range: 6, fireRate: 78, chainTargets: 7, chainRadius: 6 },
            { cost: 700, damage: 18, range: 6.5, fireRate: 66, chainTargets: 9, chainRadius: 7 },
            { cost: 850, damage: 25, range: 7, fireRate: 48, chainTargets: 12, chainRadius: 8 }
        ]
    },
    sun: { name: 'برج آفتاب', description: 'داوری از خورشید! برج آفتاب به طور مداوم روی یک دشمن واحد قفل می‌کند و آسیب آن به مرور زمان افزایش می‌یابد.', exDescription: 'میدان گرمایی +۳۵٪ برد؛ دشمنان در شعاع ۱ خانه اطراف هدف اصلی، ۱۰٪ تا ۴۰٪ آسیب اضافی از آسیب دریافتی متحمل می‌شوند (طی ۵ ثانیه افزایش می‌یابد). دشمنان در میدان، ۸۰٪ کندی کمتری از برج کندکننده دریافت می‌کنند و از نشان یخ مصون هستند.', exLimit: 3, limit: 6, color: '#ffeb3b', levels: [{ cost: 700, minDamage: 0.5, maxDamage: 110, range: 7, rampUpTime: 840 },{ cost: 800, minDamage: 1, maxDamage: 220, range: 8, rampUpTime: 840 },{ cost: 1000, minDamage: 2, maxDamage: 440, range: 8.5, rampUpTime: 840 },{ cost: 1450, minDamage: 4, maxDamage: 660, range: 9, rampUpTime: 840 },{ cost: 3000, minDamage: 6, maxDamage: 800, range: 11, rampUpTime: 750, heatFieldRangeBonus: 0.35, heatDamageRadius: 1 }] },
    gatlingGun: {
        name: 'خط مسلسل',
        description: 'یک خط از چندین خوشه مسلسل که به طور همزمان به چندین دشمن در برد خود حمله می‌کند. اگر دشمنان کافی نباشند، آتش متمرکز می‌شود.',
        exDescription: 'به ازای هر ۱۵۰۰ گلوله شلیک‌شده، یک مرحله ارتقا می‌یابد (حداکثر مرحله V)، هر مرحله ۵٪ آسیب و ۵٪ سرعت شلیک افزایش می‌دهد.',
        color: '#607d8b',
        projectileColor: '#ffeb3b',
        limit: 5,
        exLimit: 3,
        levels: [
            { cost: 1200, damage: 4, range: 6, fireRate: 20, shotsPerRound: 3 },
            { cost: 1400, damage: 5, range: 7, fireRate: 15, shotsPerRound: 4 },
            { cost: 1600, damage: 6, range: 8, fireRate: 13, shotsPerRound: 5 },
            { cost: 2000, damage: 8, range: 10, fireRate: 12, shotsPerRound: 5 },
            { cost: 6000, damage: 12, range: 12, fireRate: 10, shotsPerRound: 7 }
        ]
    },
    electricCore: { name: 'هسته الکتریکی', description: 'بشریت وارد عصر برق شد... به برج‌های دوست در برد خود سرعت حمله می‌دهد. از سطح ۲ به بالا می‌تواند اورکلاک کند و اثر را به طور موقت به سه برابر افزایش دهد.', color: '#4dd0e1', limit: 2, levels: [{ cost: 800, range: 4, buff: 1.05 },{ cost: 1000, range: 5, buff: 1.10 },{ cost: 1200, range: 5.5, buff: 1.15 },{ cost: 1500, range: 6, buff: 1.20 }] },
    tesla: {
        name: 'برج تسلا',
        description: 'جریان قوی! صاعقه‌ای زنجیره‌ای شلیک می‌کند که به چندین دشمن آسیب زده و آنها را گیج می‌کند.',
        exDescription: 'هر حمله ۲٪ به آسیب خود اضافه می‌کند، حداکثر ۱۰۰٪. پس از ۲ ثانیه توقف حمله، این افزایش از بین می‌رود.',
        color: '#00e5ff',
        limit: 4,
        levels: [
            { cost: 700, damage: 6, range: 5, fireRate: 140, targets: 2, stun: 0.2 },
            { cost: 800, damage: 10, range: 6, fireRate: 130, targets: 3, stun: 0.25 },
            { cost: 900, damage: 17, range: 7, fireRate: 125, targets: 4, stun: 0.3 },
            { cost: 1000, damage: 25, range: 7.5, fireRate: 120, targets: 4, stun: 0.33 },
            { cost: 4000, damage: 50, range: 8, fireRate: 110, targets: 5, stun: 0.35 }
        ]
    },
    thiefClaw: {
        name: 'چنگال دزد',
        description: 'از ثروتمندان بگیر و به فقرا بده! چنگال دزد با قیمت کم، هنگام حمله شانس دزدیدن پول دارد؛ یک برج تهاجمی اقتصادی، اما آسیب آن بسیار کم است.',
        exDescription: 'به حملات خود یک نشان جایزه به مدت ۳ ثانیه اضافه می‌کند. کشتن دشمنان دارای نشان جایزه، ۳۰ پول اضافی به همراه دارد. برای ارتقا به سطح EX، چنگال دزد سطح ۴ باید مجموعاً ۱۵۰۰ پول دزیده باشد.',
        color: '#ffd700',
        limit: 6,
        exLimit: 2,
        projectileColor: '#fff59d',
        levels: [
            { cost: 200, damage: 2, range: 4, fireRate: 90, attacksForGold: 20, goldPerProc: 30 },
            { cost: 250, damage: 3, range: 4,   fireRate: 78, attacksForGold: 20, goldPerProc: 35 },
            { cost: 300, damage: 5, range: 4.5, fireRate: 66, attacksForGold: 15, goldPerProc: 40 },
            { cost: 450, damage: 7, range: 5.5,   fireRate: 54, attacksForGold: 15, goldPerProc: 60 },
            { cost: 1800, damage: 10, range: 7, fireRate: 50, attacksForGold: 10, goldPerProc: 70 }
        ]
    },
    musicStand: { name: 'سکوی موسیقی', description: 'موسیقی گوش می‌دهید؟ سکوی موسیقی به برج‌های دوست در برد خود تخفیف ارتقا، افزایش برد و افزایش آسیب می‌دهد. از سطح ۴ به بالا دارای قابلیت فعال است که هرچه برج‌های بیشتری در برد باشند، پول بیشتری می‌دهد. این قابلیت به طور موقت آسیب حمله برج‌های درون برد را نیز افزایش می‌دهد.', color: '#e91e63', limit: 1, levels: [
        { cost: 1200, range: 6, upgradeDiscount: 0.95, rangeBuff: 1.10, damageBuff: 1.04 },
        { cost: 1500, range: 7, upgradeDiscount: 0.9,  rangeBuff: 1.12, damageBuff: 1.08 },
        { cost: 1800, range: 8, upgradeDiscount: 0.8,  rangeBuff: 1.15, damageBuff: 1.12 },
        { cost: 2500, range: 10, upgradeDiscount: 0.75, rangeBuff: 1.20, damageBuff: 1.15 }
    ]},
    militaryBase: { name: 'پایگاه نظامی', description: 'بله قربان! پایگاه نظامی نمی‌تواند حمله کند، اما به طور دوره‌ای سربازان دوست تولید می‌کند.', exDescription: 'به طور اضافی واحدهای تانک قدرتمند تولید می‌کند که آسیب منطقه‌ای دارند.', exLimit: 1, color: '#b0bec5', limit: 2, levels: [
        { cost: 1500, spawnRate: 3600, spawnCount: 2 },
        { cost: 1300, spawnRate: 3480, spawnCount: 3 },
        { cost: 1500, spawnRate: 3360, spawnCount: 4 },
        { cost: 2000, spawnRate: 3240, spawnCount: 5 },
        { cost: 4200, spawnRate: 3240, spawnCount: 5, tankSpawnRate: 2160, tankSpawnCount: 1 }
    ]},
    matrix: {
        name: 'برج ماتریکس',
        description: 'اتحاد یعنی قدرت! برج ماتریکس می‌تواند با دیگر برج‌های ماتریکس ارتباط برقرار کرده و تقویت دریافت کند. هر ارتباط باعث افزایش آسیب، سرعت شلیک، برد و کاهش زمان داغی می‌شود.',
        exDescription: 'برج ماتریکس EX هرگز داغ نمی‌کند. هنگامی که در یک شبکه ارتباطی وجود دارد، همه برج‌های ماتریکس آن شبکه افزایش آسیب و سرعت شلیک دریافت می‌کنند.',
        exLimit: 1,
        color: '#f44336',
        projectileColor: '#ffcdd2',
        limit: 10,
        levels: [
            { cost: 300, damage: 5, range: 4.5, fireRate: 30, attacksBeforeOverheat: 8, overheatDuration: 360 },
            { cost: 400, damage: 7, range: 5,   fireRate: 27, attacksBeforeOverheat: 8, overheatDuration: 360 },
            { cost: 600, damage: 8.5, range: 5.5, fireRate: 25, attacksBeforeOverheat: 8, overheatDuration: 360 },
            { cost: 800, damage: 11, range: 6, fireRate: 24, attacksBeforeOverheat: 8, overheatDuration: 360 },
            { cost: 4000, damage: 20, range: 7, fireRate: 20, attacksBeforeOverheat: Infinity, overheatDuration: 0 }
        ]
    },
    destroyer: {
        name: 'تخریب‌گر',
        description: 'سلاح تاکتیکی. با کلیک روی دکمه استقرار، بلافاصله باز شده و تمام پول فعلی را خالی می‌کند و بر اساس آن آسیب ویرانگر وارد می‌کند. حمله ۳۰ ثانیه ادامه دارد و پس از بسته شدن، در دور فعلی و دور بعدی قابل استقرار مجدد نیست. پرتو لیزر می‌تواند از دشمنان عبور کرده و امواج گسترده منتشر کند. در حین استقرار و پس از ورود به حالت خنک‌سازی قابل فروش نیست.',
        color: '#212121',
        projectileColor: '#000000',
        limit: 1,
        levels: [
            { cost: 500, damage: 0, range: 10, fireRate: 60 }
        ]
    },
    battery: {
        name: 'باتری',
        description: 'منبع انرژی پشتیبان. حمله نمی‌کند، اما در ابتدای هر موج ۷۰/۱۰۰/۲۰۰/۳۵۰ پول به بازیکن می‌دهد. زمانی که ۶ باتری سطح حداکثر در زمین وجود داشته باشد، هر موج پول اضافی دریافت می‌شود.',
        color: '#4caf50',
        limit: 6,
        levels: [
            { cost: 300, goldPerWave: 70 },
            { cost: 400, goldPerWave: 100 },
            { cost: 600, goldPerWave: 200 },
            { cost: 800, goldPerWave: 350 }
        ]
    },
    missileSilo: {
        name: 'چاه موشک',
        description: 'ضربه دقیق! یک موشک کروز به سمت دشمن شلیک می‌کند که به دشمنان در شعاع وسیع اطراف نقطه برخورد آسیب زیاد و گیج‌کنندگی طولانی وارد می‌کند. توجه داشته باشید که موشک کروز تأخیر پرواز دارد و برای اهداف با سرعت بالا چندان مؤثر نیست؛ ارتقا می‌تواند سرعت پرواز را افزایش دهد.',
        exDescription: 'به یک پرتابگر سری موشک تبدیل می‌شود که ۴ موشک جستجوگر پشت سر هم شلیک می‌کند و ضربات و کنترل منطقه‌ای متعددی ایجاد می‌کند.',
        exLimit: 1,
        color: '#B0BEC5',
        projectileColor: '#E0E0E0',
        limit: 2,
        levels: [
            { cost: 1500, damage: 120, range: 20, fireRate: 1200, stun: 3, flightTime: 180, blastRadius: 4 },
            { cost: 2000, damage: 200, range: 20, fireRate: 1080, stun: 4, flightTime: 250, blastRadius: 4.3 },
            { cost: 2500, damage: 400, range: 20, fireRate: 960, stun: 5, flightTime: 200, blastRadius: 4.7 },
            { cost: 3000, damage: 800, range: 20, fireRate: 840, stun: 6.5, flightTime: 100, blastRadius: 5 },
                    {
            cost: 7000,
            damage: 200,
            range: 20,
            fireRate: 900,
            stun: 4,
            flightTime: 90,
            blastRadius: 2.5,
            salvoCount: 4,
            salvoInterval: 30
        }
        ]
    },
    gravityBeacon: {
        name: 'چراغ راهنمای جاذبه',
        description: 'اینجا غیرقابل عبور است... یک پالس جاذبه منتشر می‌کند که همه دشمنان در برد را در امتداد مسیر به عقب می‌راند. اثر روی رئیس‌ها ضعیف‌تر است. فقط زمانی فعال می‌شود که دشمن وارد برد حمله شود (پس از ورود، ۰.۵ ثانیه تأخیر در حمله).',
        color: '#4FC3F7',
        limit: 4,
        levels: [
            { cost: 200, range: 3,   fireRate: 390, pushback: 1 },
            { cost: 300, range: 3.5, fireRate: 384, pushback: 1.3 },
            { cost: 400, range: 4,   fireRate: 372, pushback: 1.7 },
            { cost: 500, range: 4.5, fireRate: 360, pushback: 2 }
        ]
    },
    shrineOfMerit: {
        name: 'محراب افتخار',
        description: 'میراث باستانی و مرموز. به دشمنان حمله نمی‌کند، اما هر دشمنی که در برد آن کشته شود، پاداش پول اضافی به بازیکن می‌دهد.',
        color: '#FFD700',
        limit: 2,
        levels: [
            { cost: 500, range: 3.8,   moneyMultiplier: 0.1, baseGold: 5 },
            { cost: 600, range: 4, moneyMultiplier: 0.3, baseGold: 8 },
            { cost: 800, range: 4.3,   moneyMultiplier: 0.5, baseGold: 12 },
            { cost: 1000, range: 4.7, moneyMultiplier: 0.7, baseGold: 18 }
        ]
    },
        annihilator: {
        name: 'ناوبر',
        description: 'زمان درو... روی دشمنی با کمترین درصد جان قفل می‌کند و بر اساس جان فعلی آن، آسیب زیادی وارد می‌کند. هرچه جان کمتر باشد، آسیب بیشتر است. به رئیس‌ها فقط آسیب معمولی وارد می‌کند.',
        exDescription: 'به دشمنان با جان بالای ۷۰٪ آسیب معمولی و به دشمنان با جان زیر ۷۰٪ ۱۶۰٪ آسیب وارد می‌کند؛ این اثر روی رئیس‌ها نیز اعمال می‌شود.',
        exLimit: 2,
        color: '#BDBDBD',
        projectileColor: '#FFD700',
        levels: [
            { cost: 1000, damage: 50, range: 6, fireRate: 120 },
            { cost: 1200, damage: 100, range: 6.5, fireRate: 115 },
            { cost: 1800, damage: 200, range: 6.5, fireRate: 110 },
            { cost: 2300, damage: 400, range: 7, fireRate: 100 },
            { cost: 7500, damage: 600, range: 8, fireRate: 80 }
        ]
    },
    spotlight: {
        name: 'نورافکن',
        description: 'نورافکن با روشنایی بالا که به طور مداوم به دشمنان پرتو می‌تاباند و به منطقه تحت تابش آسیب مداوم وارد می‌کند. ارتقای نورافکن شدت آن را افزایش داده و به همه دشمنان منطقه آسیب سوختگی قابل توجهی اضافه می‌کند.',
        exDescription: 'نقاط ضعف دشمنان در زیر نورافکن واضح‌تر می‌شود. برج‌های دفاعی ما هنگام حمله به دشمنان در منطقه روشن، شانس ضربه بحرانی دارند.',
        color: '#fff8e1',
        projectileColor: '#fffde7',
        limit: 1,
        exLimit: 1,
        levels: [
            { cost: 3000, damage: 8, range: 7, fireRate: 60, beamSpread: 1 },
            { cost: 3500, damage: 13, range: 8.5, fireRate: 54, beamSpread: 1.5, burnPercent: 0.001, bossBurnPercent: 0.001 },
            { cost: 4000, damage: 27, range: 10, fireRate: 42, beamSpread: 2, burnPercent: 0.002, bossBurnPercent: 0.0015 },
            { cost: 5000, damage: 50, range: 12, fireRate: 30, beamSpread: 2.5, burnPercent: 0.003, bossBurnPercent: 0.002 },
            { cost: 8000, damage: 84, range: 15, fireRate: 24, beamSpread: 3, burnPercent: 0.003, bossBurnPercent: 0.002, critChance: 0.25 }
        ]
    },
    pursuit: {
        name: 'تعقیب‌گر',
        description: 'آرایه دفاعی لیزر. به سرعت چندین موشک ردیاب پشت سر هم شلیک می‌کند که به اطراف نقطه برخورد آسیب منطقه‌ای وارد می‌کند. موشک‌ها اختلال ایجاد می‌کنند و با انباشت ۸۰ لایه، دشمن به مدت ۳ ثانیه در مسیر معکوس حرکت می‌کند. در سطح ۳ دید مشترک باز می‌شود و برد همه تعقیب‌گرها به هم متصل می‌شود. تحت تأثیر تداخل الکترومغناطیسی، نمی‌تواند از افزایش سرعت حمله هسته الکتریکی بهره‌مند شود.',
        exDescription: 'پس از هر بار بارگذاری کامل، زمان بارگذاری سایر تعقیب‌گرهای در حال بارگذاری کاهش می‌یابد. با فعال‌سازی قابلیت فعال، آسیب خود را ۲۰٪ افزایش داده و ۵۰ موشک پشت سر هم شلیک می‌کند؛ هر ۱۰ موشک، زمان بارگذاری همه تعقیب‌گرها را ۲ ثانیه کاهش می‌دهد.',
        color: '#cfd8dc',
        projectileColor: '#ffffff',
        limit: 5,
        exLimit: 2,
        levels: [
            { cost: 1000, damage: 20, range: 3.5, reloadTime: 600, missileCount: 3, blastRadius: 1.6 },
            { cost: 1500, damage: 50, range: 4, reloadTime: 540, missileCount: 5, blastRadius: 1.8 },
            { cost: 2500, damage: 80, range: 4.5, reloadTime: 480, missileCount: 8, blastRadius: 2.1, sharedVision: true },
            { cost: 3500, damage: 100, range: 5, reloadTime: 420, missileCount: 10, blastRadius: 2.4, sharedVision: true },
            { cost: 5500, damage: 160, range: 6, reloadTime: 360, missileCount: 12, blastRadius: 2.6, sharedVision: true, reloadSync: true }
        ]
    },
    heavyWeapons: {
        name: 'ایستگاه سلاح سنگین',
        description: 'ایستگاه سلاح ترکیبی. با نرخ شلیک بسیار بالا، گلوله‌های زره‌پوش فلزی شلیک می‌کند تا دفاع دشمن را در هم بشکند و مجهز به سیستم موشک 9M133 "کورنت" برای پوشش آتش سنگین است. بهترین انتخاب برای خروجی خشونت‌آمیز. اما به دلیل کمبود مواد و مهمات، قیمت آن بسیار گران است.',
        color: '#e8eaed',
        projectileColor: '#ffeb3b',
        limit: 1,
        levels: [
            { cost: 4000,  damage: 20,  range: 6,    fireRate: 6,   missileDamage: 60,  missileBlastRadius: 2, missileFireRate: 360 },
            { cost: 6000,  damage: 40,  range: 7.5,  fireRate: 4.8, missileDamage: 130, missileBlastRadius: 3, missileFireRate: 270 },
            { cost: 8000,  damage: 80,  range: 9,    fireRate: 3.6, missileDamage: 220, missileBlastRadius: 4, missileFireRate: 180 },
            { cost: 12000, damage: 135, range: 11,   fireRate: 2.7, missileDamage: 480, missileBlastRadius: 5, missileFireRate: 120 }
        ]
    },
    boomerang: {
        name: 'تیغه بازگشتی',
        description: 'سلاح فوق‌العاده برای مراحل میانی. یک تیغه چرخان به سمت موقعیت فعلی هدف پرتاب می‌کند؛ تیغه پس از رسیدن به هدف، در آنجا می‌چرخد. به دشمنانی که در مسیر پرواز با آن برخورد کنند، ۳ بار آسیب می‌زند و پس از رسیدن، به دشمنان در محدوده توقف، هر ۰.۱۷۵ ثانیه یک بار آسیب می‌زند. هر تیغه حداکثر ۵ ضربه بحرانی می‌زند. انتخابگر هدف جهت پرتاب را تعیین می‌کند.',
        exDescription: 'سطح EX: تیغه سریع‌تر پرواز می‌کند و به دشمنان در حالت کند/یخ‌زده/سوزان/گیج، ۲ برابر آسیب وارد می‌کند. پایه چوبی دارای نقش‌های قرمز است و تیغه دوگانه به چهار تیغه با دنباله قرمز تبدیل می‌شود.',
        exLimit: 3,
        color: '#8d6e63',
        projectileColor: '#cfd8dc',
        levels: [
            { cost: 500,  damage: 3,  range: 5,   fireRate: 180, lingerTime: 120 },
            { cost: 700,  damage: 5,  range: 5.5, fireRate: 156, lingerTime: 180 },
            { cost: 900,  damage: 8,  range: 6,   fireRate: 132, lingerTime: 240 },
            { cost: 1200, damage: 12, range: 6.5, fireRate: 108, lingerTime: 300 },
            { cost: 3000, damage: 17, range: 7,   fireRate: 90,  lingerTime: 480 }
        ]
    },
    frostPunish: {
        name: 'مجازات یخ',
        description: 'یادگاری که توسط الهه جنگ و یخبندان، هارونی، محافظت می‌شود. تیرهای قدرتمندی با انرژی صفر مطلق شلیک می‌کند که دشمنان را نابود می‌کند. خشمگین کردن الهه به معنای بدشانسی است؛ دشمنانی که در حالت کندی بالا دوباره مورد اصابت قرار گیرند، شدیدترین مجازات را دریافت می‌کنند.',
        color: '#4fc3f7',
        projectileColor: '#b3e5fc',
        limit: 6,
        levels: [
            { cost: 800,  damage: 50,  range: 5,   fireRate: 300, slow: 0.4 },
            { cost: 1500, damage: 100, range: 7,   fireRate: 270, slow: 0.5 },
            { cost: 2200, damage: 200, range: 8,   fireRate: 240, slow: 0.6 },
            { cost: 3500, damage: 320, range: 9.5, fireRate: 180, slow: 0.7 }
        ]
    }
};