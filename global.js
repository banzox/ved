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

    // For relative HTML links, we need a relative prefix (e.g. "../../")
    // Simple heuristic: Count how many levels deep we are relative to where index.html likely is.
    // Better approach: User passes depth or we let the relative links in the injected HTML use the calculated relative path.
    // Let's rely on the relative path of the script tag itself if it's relative.
    const relativeRoot = myScript.getAttribute('src').replace('global.js', '');

    // --- Search Index (The Registry) ---
    // This will be populated with all 100 tools locally
    window.searchIndex = [
        // --- Video ---
        { id: 'yt_thumb', n: { ar: 'صورة يوتيوب', en: 'YouTube Thumbnail' }, url: 'tools/video/thumb.html', cat: 'video' },

        // --- Math ---
        { id: 'bmi', n: { ar: 'حاسبة الوزن (BMI)', en: 'BMI Calculator' }, url: 'tools/math/bmi.html', cat: 'math' },
        { id: 'age', n: { ar: 'حاسبة العمر', en: 'Age Calculator' }, url: 'tools/math/age.html', cat: 'math' },
        { id: 'loan', n: { ar: 'حاسبة القروض', en: 'Loan Calculator' }, url: 'tools/math/loan.html', cat: 'math' },
        { id: 'disc', n: { ar: 'حاسبة الخصم', en: 'Discount Calculator' }, url: 'tools/math/discount.html', cat: 'math' },
        { id: 'zak', n: { ar: 'حاسبة الزكاة', en: 'Zakat Calculator' }, url: 'tools/math/zakat.html', cat: 'math' },

        // --- Converters ---
        { id: 'c_len', n: { ar: 'محول الطول', en: 'Length Converter' }, url: 'tools/conv/length.html', cat: 'conv' },
        { id: 'c_wgt', n: { ar: 'محول الوزن', en: 'Weight Converter' }, url: 'tools/conv/weight.html', cat: 'conv' },
        { id: 'c_spd', n: { ar: 'محول السرعة', en: 'Speed Converter' }, url: 'tools/conv/speed.html', cat: 'conv' },
        { id: 'c_cur', n: { ar: 'محول العملات', en: 'Currency Converter' }, url: 'tools/conv/currency.html', cat: 'conv' },
        { id: 'temp', n: { ar: 'محول الحرارة', en: 'Temperature Converter' }, url: 'tools/conv/temperature.html', cat: 'conv' },

        // --- Text ---
        { id: 'cnt', n: { ar: 'عداد الكلمات', en: 'Word Counter' }, url: 'tools/text/counter.html', cat: 'text' },
        { id: 'rev', n: { ar: 'عكس النصوص', en: 'Text Reverser' }, url: 'tools/text/reverse.html', cat: 'text' },
        { id: 'bin', n: { ar: 'تحويل ثنائي', en: 'Binary Converter' }, url: 'tools/text/binary.html', cat: 'text' },
        { id: 'decor', n: { ar: 'زخرفة النصوص', en: 'Text Decoration' }, url: 'tools/text/decor.html', cat: 'text' },

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
        { id: 'pdf_txt', n: { ar: 'نص إلى PDF', en: 'Text to PDF' }, url: 'tools/pdf/txt2pdf.html', cat: 'pdf' }
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
    const currentLang = localStorage.getItem('ng_lang') || 'ar';
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
            'privacy': 'Privacy Policy', 'contact': 'Contact Us'
        }
    };

    function t(key) {
        const langDict = commonDict[currentLang] || commonDict['en'];
        return langDict[key] || commonDict['en'][key] || key;
    }

    // --- 4. Layout Injection ---
    function injectLayout() {
        // A. Header / Sidebar
        const headerEl = document.getElementById('app-header');
        if (headerEl) {
            headerEl.innerHTML = `
                <nav class="sidebar">
                    <a href="${relativeRoot}index.html" class="brand"><i>⚡</i> <span>NextGear</span></a>
                    <div class="nav-menu">
                        <a href="${relativeRoot}index.html" class="nav-item"><i>🏠</i> <span data-i18n="home">Home</span></a>
                        <a href="${relativeRoot}student.html" class="nav-item"><i>📝</i> <span data-i18n="student">Student</span></a>
                        <a href="${relativeRoot}math.html" class="nav-item"><i>🔢</i> <span data-i18n="math">Math</span></a>
                        <a href="${relativeRoot}conv.html" class="nav-item"><i>🔄</i> <span data-i18n="conv">Converters</span></a>
                        <a href="${relativeRoot}dev.html" class="nav-item"><i>💻</i> <span data-i18n="dev">Developers</span></a>
                        <a href="${relativeRoot}social.html" class="nav-item"><i>📱</i> <span data-i18n="social">Social</span></a>
                        <a href="${relativeRoot}files.html" class="nav-item"><i>📂</i> <span data-i18n="files">Files</span></a>
                        <a href="${relativeRoot}game.html" class="nav-item"><i>🎮</i> <span data-i18n="games">Games</span></a>
                    </div>
                    <div class="pro-card">
                        <h4 data-i18n="pro">NextGear Pro</h4>
                        <button class="pro-btn" onclick="window.open('http://nextgear.space')">UPGRADE</button>
                    </div>
                </nav>
            `;
        }

        // B. Top Bar (Search + Lang)
        // Typically normally in .header-area inside main, but we can inject a standard top bar if needed.
        // For this user request, we assume .header-area exists in the Page Content, OR we inject a standard Container.
        // Let's create a standard top-bar helper if #app-topbar exists, otherwise expect page to have it.

        // C. Footer
        const footerEl = document.getElementById('app-footer');
        if (footerEl) {
            footerEl.innerHTML = `
                <div style="text-align:center; padding:20px; color:#64748b; font-size:0.9rem; border-top:1px solid #e2e8f0; margin-top:40px;">
                    <span data-i18n="footer_copy">© 2026 NextGear</span> | 
                    <a href="${relativeRoot}privacy.html" style="color:inherit" data-i18n="privacy">Privacy</a> | 
                    <a href="${relativeRoot}contact.html" style="color:inherit" data-i18n="contact">Contact</a>
                </div>
            `;
        }

        // D. Inject CSS automatically if not present?
        // User didn't strictly ask, but it's helpful.
        if (!document.querySelector('link[href*="style.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = relativeRoot + 'style.css';
            document.head.appendChild(link);
        }
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
            el.innerText = t(key);
            if (el.tagName === 'INPUT') el.placeholder = t(key);
        });
    }

    function setupLangSwitch() {
        if (document.getElementById('global-lang-select')) return;

        // Find best place: .header-area or append to body or specific #lang-container
        const container = document.querySelector('.header-area') || document.querySelector('.page-info') || document.body;

        const sel = document.createElement('select');
        sel.id = 'global-lang-select';
        sel.style.cssText = "padding: 5px 10px; border-radius: 8px; border: 1px solid #ccc; margin: 0 15px;";

        const flags = {
            'ar': '🇸🇦 العربية', 'en': '🇺🇸 English', 'es': '🇪🇸 Español',
            'fr': '🇫🇷 Français', 'pt': '🇵🇹 Português', 'ru': '🇷🇺 Русский'
        };

        Object.keys(flags).forEach(code => {
            const opt = document.createElement('option');
            opt.value = code;
            opt.innerText = flags[code];
            if (code === currentLang) opt.selected = true;
            sel.appendChild(opt);
        });

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
