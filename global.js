// NextGear Global Logic (Layout, i18n, Paths)
(function () {

    // --- 1. Path & Resource Helper ---
    // Calculates path back to root based on script location
    const scripts = document.getElementsByTagName('script');
    const myScript = scripts[scripts.length - 1]; // The currently executing script (global.js)
    const scriptPath = myScript.src;
    // If we are in /tools/video/, global.js is at ../../global.js
    // We can just extract the path to the folder containing global.js from the src attribute
    const rootPath = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1); // e.g., "file:///C:/.../ved/" or "../"

    const relativeRoot = myScript.getAttribute('src').replace('global.js', '');

    // --- 1.5 Adsterra Config ---
    window.AdsConfig = {
        enabled: true,
        header: '',     // Place your Adsterra 728x90 script here
        sidebar: '',    // Place your Adsterra 160x600 script here
        footer: '',     // Place your Adsterra 300x250/728x90 script here
        native: ''      // Place your Adsterra Native script here
    };

    // --- Search Index (The Registry) ---
    // This will be populated with all 100 tools locally
    window.searchIndex = [
        // --- Video ---
        // --- Social ---
        { id: 'yt_thumb', n: { ar: 'صورة يوتيوب', en: 'YouTube Thumbnail' }, url: 'tools/video/yt-thumb.html', cat: 'social' },
        { id: 'ig_prof', n: { ar: 'بروفايل انستقرام', en: 'Instagram Profile' }, url: 'tools/social/ig.html', cat: 'social' },

        // --- Video ---
        { id: 'vid_info', n: { ar: 'معلومات الفيديو', en: 'Video Info' }, url: 'tools/video/info.html', cat: 'video' },
        { id: 'age', n: { ar: 'حاسبة العمر', en: 'Age Calculator' }, url: 'tools/math/age.html', cat: 'math' },
        { id: 'loan', n: { ar: 'حاسبة القروض', en: 'Loan Calculator' }, url: 'tools/math/loan.html', cat: 'math' },
        { id: 'disc', n: { ar: 'حاسبة الخصم', en: 'Discount Calculator' }, url: 'tools/math/discount.html', cat: 'math' },
        { id: 'zak', n: { ar: 'حاسبة الزكاة', en: 'Zakat Calculator' }, url: 'tools/math/zakat.html', cat: 'math' },

        // --- Converters ---
        { id: 'c_len', n: { ar: 'محول الطول', en: 'Length Converter' }, url: 'tools/conv/length.html', cat: 'conv' },
        { id: 'c_wgt', n: { ar: 'محول الوزن', en: 'Weight Converter' }, url: 'tools/conv/weight.html', cat: 'conv' },
        { id: 'c_spd', n: { ar: 'محول السرعة', en: 'Speed Converter' }, url: 'tools/conv/speed.html', cat: 'conv' },
        { id: 'c_cur', n: { ar: 'محول العملات', en: 'Currency Converter' }, url: 'tools/conv/currency.html', cat: 'conv' },
        { id: 'c_tmp', n: { ar: 'محول الحرارة', en: 'Temperature Converter' }, url: 'tools/conv/temperature.html', cat: 'conv' },

        // --- Student ---
        { id: 'cnt', n: { ar: 'عداد الكلمات', en: 'Word Counter' }, url: 'tools/text/counter.html', cat: 'student' },
        { id: 'rev', n: { ar: 'عكس النصوص', en: 'Text Reverser' }, url: 'tools/text/reverse.html', cat: 'student' },
        { id: 'bin', n: { ar: 'تحويل ثنائي', en: 'Binary Converter' }, url: 'tools/text/binary.html', cat: 'student' },
        { id: 'decor', n: { ar: 'زخرفة النصوص', en: 'Text Decoration' }, url: 'tools/text/decor.html', cat: 'student' },
        { id: 'rep', n: { ar: 'مكرر النصوص', en: 'Text Repeater' }, url: 'tools/text/repeater.html', cat: 'student' },
        { id: 'slug', n: { ar: 'مولد الروابط', en: 'Slug Generator' }, url: 'tools/text/slug.html', cat: 'student' },
        { id: 'cln', n: { ar: 'منظف النصوص', en: 'Text Cleaner' }, url: 'tools/text/clean.html', cat: 'student' },
        { id: 'eml', n: { ar: 'استخراج الإيميلات', en: 'Email Extractor' }, url: 'tools/text/email.html', cat: 'student' },
        { id: 'url', n: { ar: 'استخراج الروابط', en: 'URL Extractor' }, url: 'tools/text/url.html', cat: 'student' },
        { id: 'num', n: { ar: 'استخراج الأرقام', en: 'Number Extractor' }, url: 'tools/text/number.html', cat: 'student' },
        { id: 'wpm', n: { ar: 'وقت القراءة', en: 'Reading Time' }, url: 'tools/text/wpm.html', cat: 'student' },
        { id: 'remdup', n: { ar: 'حذف التكرار', en: 'Remove Duplicates' }, url: 'tools/text/duplicates.html', cat: 'student' },
        { id: 'txt_sort', n: { ar: 'ترتيب الأسطر', en: 'Sort Lines' }, url: 'tools/text/sort.html', cat: 'student' },
        { id: 'txt_shuf', n: { ar: 'بعثرة الأسطر', en: 'Shuffle Lines' }, url: 'tools/text/shuffle.html', cat: 'student' },

        // --- Dev ---
        { id: 'json', n: { ar: 'منسق JSON', en: 'JSON Formatter' }, url: 'tools/dev/json.html', cat: 'dev' },
        { id: 'b64', n: { ar: 'محول Base64', en: 'Base64 Converter' }, url: 'tools/dev/base64.html', cat: 'dev' },
        { id: 'urlenc', n: { ar: 'تشفير الروابط', en: 'URL Encoder' }, url: 'tools/dev/url.html', cat: 'dev' },
        { id: 'rgb', n: { ar: 'محول الألوان', en: 'Color Converter' }, url: 'tools/dev/color.html', cat: 'dev' },

        // --- Games ---
        { id: 'xo', n: { ar: 'لعبة X-O', en: 'Tic Tac Toe' }, url: 'tools/game/xo.html', cat: 'game' },
        { id: 'rps', n: { ar: 'حجرة ورقة مقص', en: 'Rock Paper Scissors' }, url: 'tools/game/rps.html', cat: 'game' },
        { id: 'dice', n: { ar: 'رمي النرد', en: 'Dice Roller' }, url: 'tools/game/dice.html', cat: 'game' },
        { id: 'love', n: { ar: 'مقياس الحب', en: 'Love Calculator' }, url: 'tools/game/love.html', cat: 'game' },
        { id: 'guess', n: { ar: 'تخمين الرقم', en: 'Guess Number' }, url: 'tools/game/guess.html', cat: 'game' },

        // --- Misc ---
        { id: 'misc_uuid', n: { ar: 'مولد UUID', en: 'UUID Generator' }, url: 'tools/misc/uuid.html', cat: 'misc' },
        { id: 'misc_qr', n: { ar: 'باركود QR', en: 'QR Code' }, url: 'tools/misc/qr.html', cat: 'misc' },
        { id: 'misc_stop', n: { ar: 'ساعة إيقاف', en: 'Stopwatch' }, url: 'tools/misc/stopwatch.html', cat: 'misc' },
        { id: 'misc_ip', n: { ar: 'عنوان IP', en: 'IP Checker' }, url: 'tools/misc/ip.html', cat: 'misc' },
        { id: 'misc_pass', n: { ar: 'مولد كلمات سر', en: 'Password Generator' }, url: 'tools/misc/pass.html', cat: 'misc' },

        // --- Image ---
        { id: 'img_res', n: { ar: 'تغيير حجم الصورة', en: 'Image Resizer' }, url: 'tools/image/resize.html', cat: 'image' },
        { id: 'img_cmp', n: { ar: 'ضغط الصور', en: 'Image Compressor' }, url: 'tools/image/compress.html', cat: 'image' },

        // --- Audio ---
        { id: 'aud_rec', n: { ar: 'مسجل الصوت', en: 'Audio Recorder' }, url: 'tools/audio/record.html', cat: 'audio' },

        // --- PDF ---
        { id: 'txt2pdf', n: { ar: 'نص إلى PDF', en: 'Text to PDF' }, url: 'tools/pdf/txt2pdf.html', cat: 'pdf' }
    ];

    window.searchTools = (query) => {
        if (!query) return [];
        query = query.toLowerCase();
        return window.searchIndex.filter(t =>
            t.n.ar.includes(query) || t.n.en.toLowerCase().includes(query)
        ).map(t => ({
            name: currentLang === 'ar' ? t.n.ar : t.n.en,
            url: relativeRoot + t.url
        }));
    };

    // --- 2. i18n Setup ---
    const supportedLangs = ['ar', 'en', 'es', 'fr', 'pt', 'ru', 'tr', 'id', 'de', 'hi'];
    const currentLang = (localStorage.getItem('ng_lang') || 'ar').toLowerCase();
    const isRTL = ['ar', 'he', 'fa', 'ur'].includes(currentLang);

    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    // --- 3. Dictionary ---
    const commonDict = {
        'ar': {
            'home': 'الرئيسية', 'student': 'نصوص وطلاب', 'math': 'حساب ومال',
            'conv': 'تحويلات', 'dev': 'مطورين', 'social': 'اجتماعي',
            'files': 'ملفات', 'games': 'ألعاب', 'pro': 'ترقية الآن',
            'search': 'بحث سريع...', 'footer_copy': 'جميع الحقوق محفوظة © NextGear 2026',
            'privacy': 'سياسة الخصوصية', 'contact': 'اتصل بنا'
        },
        'en': {
            'home': 'Home', 'student': 'Student & Text', 'math': 'Math & Finance',
            'conv': 'Converters', 'dev': 'Developers', 'social': 'Social Media',
            'files': 'Files API', 'games': 'Games', 'pro': 'Upgrade Pro',
            'search': 'Search...', 'footer_copy': 'All rights reserved © NextGear 2026',
            'privacy': 'Privacy Policy', 'contact': 'Contact Us',
            'home_title': 'Welcome 👋', 'home_desc': 'The largest collection of free Arabic tools (100+ tools).',
            'cat_vid': 'Video', 'cat_aud': 'Audio', 'cat_pdf': 'PDF Tools',
            'cat_conv': 'Converters', 'cat_decor': 'Decoration', 'cat_math': 'Math',
            'cat_student': 'Student', 'cat_game': 'Games'
        },
        'ar': {
            'home_title': 'مرحباً بك 👋', 'home_desc': 'أكبر مكتبة أدوات عربية مجانية (100+ أداة).',
            'cat_vid': 'فيديو', 'cat_aud': 'صوتيات', 'cat_pdf': 'أدوات PDF',
            'cat_conv': 'محولات', 'cat_decor': 'زخرفة', 'cat_math': 'حساب',
            'cat_student': 'نصوص وطلاب', 'cat_game': 'ألعاب'
        }
    };

    function t(key) {
        const langDict = commonDict[currentLang] || commonDict['en'];
        const val = langDict[key] || commonDict['en'][key];
        return val; // Returns undefined if not found
    }

    function injectLayout() {
        // A. Sidebar
        const headerEl = document.getElementById('app-header');
        if (headerEl) {
            headerEl.innerHTML = `
                <nav class="sidebar">
                    <a href="${relativeRoot}index.html" class="brand"><i>⚡</i> <span class="brand-text">NextGear VIP</span></a>
                    <div class="nav-menu">
                        <a href="${relativeRoot}index.html" class="nav-item ${window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ? 'active' : ''}"><i>🏠</i> <span>Home</span></a>
                        <a href="${relativeRoot}student.html" class="nav-item ${window.location.pathname.endsWith('student.html') ? 'active' : ''}"><i>📚</i> <span>Student</span></a>
                        <a href="${relativeRoot}math.html" class="nav-item ${window.location.pathname.endsWith('math.html') ? 'active' : ''}"><i>🧮</i> <span>Math</span></a>
                        <a href="${relativeRoot}converters.html" class="nav-item ${window.location.pathname.endsWith('converters.html') ? 'active' : ''}"><i>🔄</i> <span>Converters</span></a>
                        <a href="${relativeRoot}dev.html" class="nav-item ${window.location.pathname.endsWith('dev.html') ? 'active' : ''}"><i>🛠️</i> <span>Dev</span></a>
                        <a href="${relativeRoot}social.html" class="nav-item ${window.location.pathname.endsWith('social.html') ? 'active' : ''}"><i>📱</i> <span>Social</span></a>
                        <a href="${relativeRoot}files.html" class="nav-item ${window.location.pathname.endsWith('files.html') || window.location.pathname.endsWith('pdf.html') ? 'active' : ''}"><i>📂</i> <span>Files</span></a>
                        <a href="${relativeRoot}games.html" class="nav-item ${window.location.pathname.endsWith('games.html') ? 'active' : ''}"><i>🎮</i> <span>Games</span></a>
                    </div>
                    
                    <div id="side-ad-slot" class="ad-container ad-sidebar">
                        ${window.AdsConfig.sidebar || '<div style="opacity:0.2; font-size:9px">VIP SPACE</div>'}
                    </div>

                    <div class="pro-card" style="margin-top:auto">
                        <button class="run-btn" style="padding:12px; font-size:12px; border-radius:12px;" onclick="window.open('http://nextgear.space')">PRO ACCESS</button>
                    </div>
                </nav>
            `;
        }

        const main = document.querySelector('.main');
        if (main) {
            if (!document.getElementById('top-ad-zone')) {
                const adZone = document.createElement('div');
                adZone.id = 'top-ad-zone';
                adZone.className = 'ad-container ad-header';
                adZone.innerHTML = window.AdsConfig.header || '<div>ADSTERRA AD ZONE</div>';
                main.insertBefore(adZone, main.firstChild);
            }

            if (!document.querySelector('.header-content')) {
                const headContent = document.createElement('div');
                headContent.className = 'header-content';
                headContent.innerHTML = `
                    <div class="search-box" style="background:var(--bg-card); border:1px solid var(--glass-border); flex:1">
                        <i style="color:var(--primary)">🔍</i>
                        <input type="text" id="main-search" placeholder="${t('search') || 'Search tools...'}" oninput="handleGlobalSearch(this.value)" style="background:transparent; border:none; color:white">
                    </div>
                    <div id="lang-hook"></div>
                 `;
                const ad = document.getElementById('top-ad-zone');
                main.insertBefore(headContent, ad ? ad.nextSibling : main.firstChild);
            }
        }

        const footerEl = document.getElementById('app-footer');
        if (footerEl) {
            footerEl.innerHTML = `
                <div class="ad-container ad-footer">
                    ${window.AdsConfig.footer || '<div>GLOBAL FOOTER AD</div>'}
                </div>
                <div style="text-align:center; padding:50px 0; opacity:0.6; font-size:12px">
                    © 2026 NEXTGEAR ELITE | <a href="${relativeRoot}privacy.html" style="color:var(--primary)">Privacy</a>
                </div>
            `;
        }
    }

    // Search Helper
    window.handleGlobalSearch = function (q) {
        // 1. Local Filtering (if on a category page with a #grid)
        if (typeof window.search === 'function') {
            window.search(q);
        }

        // 2. Global Results (Navigation Dropdown)
        if (typeof searchTools === 'function') {
            const results = searchTools(q);
            showSearchResults(results);
        }
    };

    function showSearchResults(results) {
        let list = document.getElementById('search-results');
        if (!list) {
            list = document.createElement('div');
            list.id = 'search-results';
            list.className = 'search-results-dropdown';
            const searchBox = document.querySelector('.search-box');
            if (searchBox) searchBox.appendChild(list);
        }

        if (results.length === 0) {
            list.style.display = 'none';
            return;
        }

        list.style.display = 'block';
        list.innerHTML = results.map(r => `
            <div class="search-res-item" onclick="window.location.href='${r.url}'">
                <span>${r.name}</span>
                <small>Open Tool</small>
            </div>
        `).join('');
    }

    // Close search dropdown on click away
    document.addEventListener('click', (e) => {
        const list = document.getElementById('search-results');
        if (list && !e.target.closest('.search-box')) {
            list.style.display = 'none';
        }
    });

    // D. Inject CSS automatically if not present?
    // User didn't strictly ask, but it's helpful.
    if (!document.querySelector('link[href*="style.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = relativeRoot + 'style.css';
        document.head.appendChild(link);
    }

    // --- 5. Initialization ---
    window.addEventListener('DOMContentLoaded', () => {
        injectLayout();     // 1. Inject HTML
        translateAll();     // 2. Translate Everything
        setupLangSwitch();  // 3. Add Lang Switcher
    });

    function translateAll() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);
            if (translation) {
                el.innerText = translation;
                if (el.tagName === 'INPUT') el.placeholder = translation;
            }
        });
    }

    function setupLangSwitch() {
        if (document.getElementById('global-lang-select')) return;

        // Find best place: .header-area or append to body or specific #lang-container
        const container = document.getElementById('lang-hook') || document.querySelector('.header-content') || document.body;

        const sel = document.createElement('select');
        sel.id = 'global-lang-select';
        sel.style.cssText = "padding: 5px 10px; border-radius: 8px; border: 1px solid #ccc; margin: 0 15px;";

        const flags = {
            'ar': '🇸🇦 العربية', 'en': '🇺🇸 English', 'es': '🇪🇸 Español',
            'fr': '🇫🇷 Français', 'pt': '🇵🇹 Português', 'ru': '🇷🇺 Русский',
            'tr': '🇹🇷 Türkçe', 'id': '🇮🇩 Indonesia', 'de': '🇩🇪 Deutsch', 'hi': '🇮🇳 हिन्दी'
        };

        Object.keys(flags).forEach(code => {
            const opt = document.createElement('option');
            opt.value = code;
            opt.innerText = flags[code];
            if (code === currentLang) opt.selected = true;
            sel.appendChild(opt);
        });

        sel.className = 'lang-select';
        sel.addEventListener('change', (e) => {
            localStorage.setItem('ng_lang', e.target.value);
            window.location.reload();
        });

        if (container.firstChild) {
            container.insertBefore(sel, container.firstChild);
        } else {
            container.appendChild(sel);
        }
    }

    // --- 6. Helpers (Image Processor) ---
    window.processImage = function (file, callback) {
        return new Promise((resolve, reject) => {
            if (!file) return resolve('❌ Select image first');
            if (!file.type.startsWith('image/')) return resolve('❌ Not an image');

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const cvs = document.createElement('canvas');
                    const ctx = cvs.getContext('2d');
                    try {
                        const resUrl = callback(ctx, cvs, img);
                        resolve(resUrl);
                    } catch (err) {
                        console.error(err);
                        resolve('❌ Error processing image');
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    // Expose Global Helper
    window.NextGear = {
        lang: currentLang,
        t: t,
        dir: isRTL ? 'rtl' : 'ltr',
        root: relativeRoot
    };

})();
