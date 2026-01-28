// NextGear Professional Engine
// Optimized for Speed & Privacy

let tools = [];
const worker = new Worker('worker.js');

// --- Main Data Loader ---
async function loadTools() {
    try {
        const [tRes, cRes] = await Promise.all([
            fetch('data/tools.json'),
            fetch('data/content.json')
        ]);
        if (!tRes.ok) throw new Error('Failed to load tools');
        tools = await tRes.json();
        window.contentDB = cRes.ok ? await cRes.json() : { jokes: [], facts: [], quotes: [] };
    } catch (error) {
        console.error('Error loading data:', error);
        alert('فشل تحميل البيانات:\n' + error.message + '\n\nيرجى التأكد من مسار الملفات (data/tools.json).');
    }
}

// --- Worker Handler ---
function handlePDF(id, data) {
    return new Promise((resolve) => {
        worker.onmessage = function (e) {
            const { result, type } = e.data;
            if (type === 'pdf') {
                const blob = new Blob([result], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                resolve(`<iframe src="${url}" style="width:100%;height:500px;border:none"></iframe><br><a href="${url}" download="document.pdf" class="pro-btn" style="display:inline-block;margin-top:10px">تحميل PDF</a>`);
            } else {
                resolve(result);
            }
        };
        worker.postMessage({ id, data });
    });
}

function handleImageWorker(id, bmp) {
    return new Promise((resolve) => {
        worker.onmessage = function (e) {
            const { result } = e.data;
            if (result instanceof ImageBitmap) {
                const cvs = document.createElement('canvas');
                cvs.width = result.width;
                cvs.height = result.height;
                const ctx = cvs.getContext('2d');
                ctx.drawImage(result, 0, 0);
                resolve(cvs);

                worker.onmessage = function (ev) {
                    const { result: res } = ev.data;
                    const out = document.getElementById('mOutVal');
                    out.innerText = res;
                    document.getElementById('mOutBox').style.display = 'block';
                };
            } else {
                resolve(result);
            }
        };
        worker.postMessage({ id, data: { bitmap: bmp } }, [bmp]);
    });
}

const engine = {
    // --- Video ---
    'yt_thumb': async (d) => {
        // Smart Regex for all YouTube URL types (Shorts, Embed, Mobile, Console)
        const idMatch = d.url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (!idMatch || !idMatch[1]) return '<div style="color:red;font-weight:bold">❌ عذراً، الرابط غير صحيح. تأكد من نسخ رابط فيديو يوتيوب صالح.</div>';

        const vid = idMatch[1];
        const qualities = [
            { name: 'Max HD (1080p)', key: 'maxresdefault.jpg' },
            { name: 'High (720p)', key: 'sddefault.jpg' }, // sd is often best alternative
            { name: 'Medium (480p)', key: 'hqdefault.jpg' },
            { name: 'Standard (360p)', key: 'mqdefault.jpg' }
        ];

        let html = `<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:15px;margin-top:15px;">`;

        for (const q of qualities) {
            const imgUrl = `https://img.youtube.com/vi/${vid}/${q.key}`;
            html += `
            <div style="background:#f8fafc;padding:10px;border-radius:10px;border:1px solid #e2e8f0;text-align:center">
                <img src="${imgUrl}" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:8px;margin-bottom:8px" onload="this.style.opacity=1" onerror="this.src='https://via.placeholder.com/320x180?text=Not+Available';this.style.opacity=0.5">
                <div style="font-weight:bold;margin-bottom:5px;font-size:0.9rem">${q.name}</div>
                <button onclick="downloadYTImage('${imgUrl}', '${vid}_${q.name.split(' ')[0]}')" class="pro-btn" style="width:100%;padding:5px 0;font-size:0.85rem">📥 تحميل مباشر</button>
            </div>`;
        }
        html += `</div>`;
        return html;
    },
    'vid_aud': () => "⚠️ يتطلب هذا الأمر معالجة خادم (FFmpeg Server-side).",
    'vid_trim': () => "⚠️ ميزة القص تتطلب رفع الملف (قريباً).",
    'vid_mute': () => "✅ تم استلام الطلب (محاكاة).",
    'vid_info': (d) => `المقاس: ${(d.file.size / 1024 / 1024).toFixed(2)} MB\nالنوع: ${d.file.type}`,
    'vid_spd': () => "⚠️ تغيير السرعة يحتاج معالجة متقدمة.",
    'vid_gif': () => "⚠️ تحويل GIF يتطلب موارد عالية.",
    'vid_pic': () => "⚠️ أخذ اللقطات غير مدعوم في هذا الإصدار.",
    'vid_rot': () => "⚠️ التدوير يتطلب إعادة ترميز.",
    'vid_mir': () => "⚠️ العكس يتطلب إعادة ترميز.",

    // --- Audio ---
    'tts': (d) => {
        if (!window.speechSynthesis) return 'غير مدعوم';
        const u = new SpeechSynthesisUtterance(d.txt);
        u.lang = d.lang || 'ar-SA';
        speechSynthesis.speak(u);
        return 'جاري القراءة... 🔊';
    },
    // --- Audio ---
    'aud_conv': (d) => ({ id: 'aud_conv', args: ['-i', 'input.mp3', 'output.wav'], file: d.file }),
    'aud_comp': (d) => ({ id: 'aud_comp', args: ['-i', 'input.mp3', '-map', '0:a:0', '-b:a', '96k', 'output.mp3'], file: d.file }),
    'aud_rev': (d) => ({ id: 'aud_rev', args: ['-i', 'input.mp3', '-af', 'areverse', 'output.mp3'], file: d.file }),
    'tts': (d) => { speakText(d.txt, 'ar-SA'); return "جاري النطق..."; },
    'aud_rec': () => {
        if (window.isRecording) {
            stopRecording();
            window.isRecording = false;
            return "تم إيقاف التسجيل. جاري المعالجة...";
        } else {
            startRecording().then(ok => {
                if (ok) {
                    window.isRecording = true;
                    document.querySelector('#mOutVal').innerText = "🔴 جاري التسجيل... اضغط تشغيل مرة أخرى للإيقاف";
                }
            });
            return "جاري بدء التسجيل...";
        }
    },
    'aud_gen': (d) => { playTone(d.f, d.d); return `تشغيل ${d.hz}Hz لمدة ${d.s} ثانية`; },

    // --- PDF ---
    'txt2pdf': (d) => ({ id: 'txt2pdf', txt: d.txt }),
    'img2pdf': (d) => "Image to PDF handling in worker...", // Simplified for now
    'pdf_mrg': (d) => {
        const f1 = document.getElementById('inp_f1').files[0];
        const f2 = document.getElementById('inp_f2').files[0];
        if (!f1 || !f2) return "يرجى اختيار ملفين";
        worker.postMessage({ id: 'pdf_mrg', data: { files: [f1, f2] } });
        return "جاري دمج الملفات...";
    },
    'pdf_spl': () => "Use Preview to Delete Pages (Split Logic Pending)",
    'pdf_inf': (d) => `الملف: ${d.f ? d.f.name : '-'}`,
    'pdf_wat': () => "Wait for Canvas Implementation",
    'pdf_rot': () => "Wait for PDF-Lib Rotation",
    'pdf_lock': () => "Wait for Encryption Implementation",
    'pdf_meta': () => "Wait for Metadata Implementation",
    'pdf_clr': (d) => {
        const file = document.getElementById('inp_f').files[0];
        if (!file) return "الرجاء اختيار ملف PDF أولاً";
        openPdfSelector(file, 'delete');
        return "جاري تحليل الملف...";
    },

    // --- Converters ---
    'c_len': (d) => `KM: ${d.v / 1000} | CM: ${d.v * 100} | Inch: ${(d.v * 39.37).toFixed(2)}`,
    'c_wgt': (d) => `Gram: ${d.v * 1000} | Lbs: ${(d.v * 2.204).toFixed(2)}`,
    'c_tmp': (d) => `F: ${(d.v * 1.8 + 32).toFixed(1)} | K: ${(Number(d.v) + 273.15).toFixed(1)}`,
    'c_spd': (d) => `MPH: ${(d.v * 0.621).toFixed(1)} | M/S: ${(d.v / 3.6).toFixed(1)}`,
    'c_tim': (d) => `Sec: ${d.v * 60} | Hr: ${(d.v / 60).toFixed(2)}`,
    'c_dig': (d) => `KB: ${d.v * 1024} | GB: ${(d.v / 1024).toFixed(3)}`,
    'c_cur': (d) => `SAR: ${(d.v * 3.75).toFixed(2)} | EUR: ${(d.v * 0.92).toFixed(2)} (تقريبي)`,
    'c_are': (d) => `KM²: ${d.v / 1000000} | Hectare: ${d.v / 10000}`,
    'c_prs': (d) => `PSI: ${(d.v * 14.5).toFixed(2)} | Pascal: ${d.v * 100000}`,
    'c_pow': (d) => `KW: ${d.v / 1000} | HP: ${(d.v / 745.7).toFixed(2)}`,

    // --- Decoration ---
    'd_bold': (d) => d.txt.replace(/[a-zA-Z]/g, c => String.fromCodePoint(c.codePointAt(0) + 119789)),
    'd_ital': (d) => d.txt,
    'd_bub': (d) => d.txt.split('').map(c => c.match(/[a-z]/i) ? String.fromCodePoint(c.codePointAt(0) + 9327) : c).join(''),
    'd_sqr': (d) => d.txt,
    'd_cur': (d) => d.txt,
    'd_uln': (d) => d.txt.split('').join('\u0332'),
    'd_str': (d) => d.txt.split('').join('\u0336'),
    'd_inv': (d) => d.txt.split('').reverse().join(''),
    'd_mor': () => ".... . .-.. .-.. ---",
    'd_emo': (d) => d.txt + " 😀",

    // --- Math ---
    'age': (d) => calculateAge(d.bd),
    'bmi': (d) => { const h = d.h / 100; const b = (d.w / (h * h)).toFixed(1); return `BMI: ${b} (${b < 18.5 ? 'نحيف' : b < 25 ? 'طبيعي' : b < 30 ? 'وزن زائد' : 'سمنة'})`; },
    'loan': (d) => `القسط: ${(d.a / d.m).toFixed(2)}`,
    'vat': (d) => `الإجمالي: ${(d.v * 1.15).toFixed(2)}`,
    'disc': (d) => `الصافي: ${(d.p * (1 - d.d / 100)).toFixed(2)}`,
    'pct': (d) => `${((d.p / d.v) * 100).toFixed(1)}%`,
    'zak': (d) => `الزكاة: ${(d.v / 40).toFixed(2)}`,
    'gpa': () => "4.0 (يحتاج تفصيل)",
    'sal': (d) => `الساعة: ${(d.s / 240).toFixed(2)}`,
    'rnd': (d) => Math.floor(Math.random() * d.m),

    // --- Games ---
    'rps': () => "", // Logic handled by custom UI
    'dice': () => Math.floor(Math.random() * 6) + 1,
    'coin': () => Math.random() > 0.5 ? 'وجه' : 'قفا',
    'guess': (d) => { const r = Math.floor(Math.random() * 10) + 1; return d.v == r ? '🎉' : `❌ (${r})`; },
    'love': (d) => `${Math.floor(Math.random() * 100)}% ❤️`,
    'joke': () => window.contentDB?.jokes[Math.floor(Math.random() * window.contentDB.jokes.length)] || "...",
    'fact': () => window.contentDB?.facts[Math.floor(Math.random() * window.contentDB.facts.length)] || "...",
    'quote': () => window.contentDB?.quotes[Math.floor(Math.random() * window.contentDB.quotes.length)] || "...",
    'pass': (d) => d.p.length > 8 ? 'Strong ✅' : 'Weak ⚠️',
    'react': () => "اضغط بسرعة! (قريباً)",

    // --- CSS Tools (NEW) ---
    'css_grad': () => `background: linear-gradient(90deg, #${Math.random().toString(16).substr(2, 6)}, #${Math.random().toString(16).substr(2, 6)});`,
    'css_box': () => `box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);`,
    'css_txt': () => `text-shadow: 2px 2px 4px #000000;`,
    'css_bor': () => `border-radius: 15px;`,
    'css_flx': () => `display: flex; justify-content: center; align-items: center;`,
    'css_grid': () => `display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;`,
    'css_filt': () => `filter: grayscale(100%);`,
    'css_anim': () => `@keyframes example { from {opacity:0;} to {opacity:1;} }`,
    'css_clip': () => `clip-path: circle(50% at 50% 50%);`,
    'css_min': (d) => d.c.replace(/\s+/g, '').replace(/:\s+/g, ':'),

    // --- Image Tools (NEW) ---
    'img_res': () => "يتم تغيير الحجم (canvas)...",
    'img_crop': () => "يتم القص (canvas)...",
    'img_comp': () => "يتم الضغط (canvas)...",
    'img_conv': () => "يتم التحويل (canvas)...",
    'img_filt': (d) => processImg(d.img, (ctx, cvs) => {
        if (d.f == 'gray') ctx.filter = 'grayscale(100%)';
        else if (d.f == 'sepia') ctx.filter = 'sepia(100%)';
        else if (d.f == 'inv') ctx.filter = 'invert(100%)';
        ctx.drawImage(document.getElementById('tempImg'), 0, 0);
    }),
    'img_col': () => "#FF5733 (Mock)",
    'img_b64': (d) => new Promise((resolve) => {
        const r = new FileReader();
        r.onload = (e) => resolve(`<textarea rows="5">${e.target.result}</textarea>`);
        r.readAsDataURL(d.img);
    }),
    'img_rot': () => "Rotate logic placeholder",
    'img_bg': () => "⚠️ حذف الخلفية يتطلب API خارجي.",
    'img_wat': () => "⚠️ إضافة علامة مائية تتطلب Canvas مخصص.",

    // --- Misc Tools (NEW) ---
    'misc_pass': (d) => Math.random().toString(36).slice(-d.l) + Math.random().toString(36).slice(-d.l),
    'misc_uuid': () => crypto.randomUUID(),
    'misc_qr': (d) => window.open(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${d.t}`),
    'misc_ip': () => "192.168.1.1 (Local Mock)",
    'misc_ua': () => navigator.userAgent,
    'misc_stop': () => `
        <div id="stopwatch">00:00:00</div>
        <button onclick="toggleStopwatch()" class="pro-btn">Start/Stop</button>
        <button onclick="resetStopwatch()" class="pro-btn">Reset</button>
    `,
    'misc_time': () => new Date().toLocaleTimeString('ar-SA'),
    'misc_date': (d) => {
        const diff = Math.abs(new Date(d.d2) - new Date(d.d1));
        return Math.ceil(diff / (1000 * 60 * 60 * 24)) + " يوم";
    },
    'misc_count': (d) => `Timer for ${d.m} mins started!`,
    'misc_lorem': (d) => "Lorem ipsum dolor sit amet...".repeat(d.n || 1)
};

// Helper for Image Tools
function convertImg(file, mime, ext) {
    return new Promise((resolve) => {
        if (!file) return resolve('اختر صورة أولاً');
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.id = 'tempImg';
            img.onload = () => {
                const cvs = document.createElement('canvas');
                cvs.width = img.width;
                cvs.height = img.height;
                const ctx = cvs.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const resInfo = cvs.toDataURL(mime);
                resolve(`<img src="${resInfo}" style="max-width:300px"><br><a href="${resInfo}" download="image.${ext}" class="pro-btn" style="display:inline-block;margin-top:10px">تحميل الصورة</a>`);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function processImg(file, drawFn) {
    return new Promise((resolve) => {
        if (!file) return resolve('اختر صورة أولاً');
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.id = 'tempImg';
            img.onload = () => {
                const cvs = document.createElement('canvas');
                cvs.width = img.width;
                cvs.height = img.height;
                const ctx = cvs.getContext('2d');
                drawFn(ctx, cvs); // Apply custom drawing/filter
                const resInfo = cvs.toDataURL();
                resolve(`<img src="${resInfo}" style="max-width:300px"><br><a href="${resInfo}" download="edited.png" class="pro-btn" style="display:inline-block;margin-top:10px">تحميل الصورة</a>`);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

let activeToolId = null;

async function initPage(category) {
    if (tools.length === 0) await loadTools();

    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    // Filter
    tools.filter(t => t.cat === category || (t.isBanner && (category === 'student' || category === 'dev'))).forEach(t => {
        const card = document.createElement('div');
        card.className = `tool-card ${t.isBanner ? 'banner' : ''}`;
        card.innerHTML = `
            ${t.isBanner ? '' : `<div class="icon-box">${t.icon}</div>`}
            <div class="tool-name">${t.name}</div>
            <div class="tool-desc">${t.desc}</div>
        `;
        if (t.isBanner) {
            card.onclick = () => window.open(t.link);
        } else {
            card.onclick = () => openTool(t);
        }
        grid.appendChild(card);
    });
}

function openTool(tool) {
    activeToolId = tool.id;
    Memory.addHistory(tool.id);
    Memory.set('last_tool', tool.id);
    document.getElementById('mTitle').innerHTML = `${tool.icon} ${tool.name}`;

    const fields = document.getElementById('mInputs');
    fields.innerHTML = '';

    // Special Live Decoration Mode
    if (tool.cat === 'decor') {
        document.getElementById('mOutBox').style.display = 'none';
        document.getElementById('modal').classList.add('open');

        fields.innerHTML = `
            <div class="field">
                <label>اكتب النص الإنجليزي هنا:</label>
                <textarea id="liveDecorInput" rows="3" placeholder="Type here..." style="font-family:sans-serif"></textarea>
            </div>
            <div id="decorResults" style="max-height:400px;overflow-y:auto;margin-top:15px;padding-right:5px"></div>
        `;

        const inp = document.getElementById('liveDecorInput');
        inp.focus();
        updateLiveDecorations(''); // Show placeholder

        inp.addEventListener('input', (e) => {
            updateLiveDecorations(e.target.value);
        });

        // Hide run button for decor since it's live
        document.querySelector('.run-btn').style.display = 'none';

        return; // Stop standard generation
    }

    // --- Phase 14: Special Games UI (RPS) ---
    if (tool.id === 'rps') {
        document.getElementById('mOutBox').style.display = 'none';
        document.getElementById('modal').classList.add('open');
        fields.innerHTML = `
            <div style="display:flex;justify-content:center;gap:20px;margin:30px 0;">
                <button onclick="playRPS('rock')" style="font-size:3rem;background:none;border:none;cursor:pointer;transition:transform 0.2s" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">🪨</button>
                <button onclick="playRPS('paper')" style="font-size:3rem;background:none;border:none;cursor:pointer;transition:transform 0.2s" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">📄</button>
                <button onclick="playRPS('scissors')" style="font-size:3rem;background:none;border:none;cursor:pointer;transition:transform 0.2s" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">✂️</button>
            </div>
            <div id="rpsResult" style="text-align:center;min-height:100px;"></div>
        `;
        document.querySelector('.run-btn').style.display = 'none';
        return;
    }

    // --- Phase 13: Reactive Engine (Converters & Math) ---
    const isReactive = ['converters', 'math', 'tools', 'css'].includes(tool.cat) || ['age', 'bmi', 'loan', 'vat', 'disc', 'pct', 'zak', 'sal', 'rnd'].includes(tool.id);

    if (isReactive) {
        document.querySelector('.run-btn').style.display = 'none';
        // Auto-run initially if possible
        setTimeout(() => runTool(), 100);
    } else {
        document.querySelector('.run-btn').style.display = 'block';
    }

    if (tool.inputs) {
        tool.inputs.forEach(inp => {
            const div = document.createElement('div');
            div.className = 'field';
            let html = `<label>${inp.l || inp.n}</label>`;

            if (inp.t === 'select') {
                html += `<select id="inp_${inp.n}">${inp.o.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`;
            } else if (inp.t === 'textarea') {
                html += `<textarea id="inp_${inp.n}" rows="4"></textarea>`;
            } else if (inp.t === 'file') {
                html += `<input type="file" id="inp_${inp.n}">`;
            } else if (inp.t === 'date') {
                html += `<input type="date" id="inp_${inp.n}">`;
            } else {
                html += `<input type="${inp.t}" id="inp_${inp.n}" value="${inp.d || ''}">`;
            }
            div.innerHTML = html;
            fields.appendChild(div);
        });

        // Attach Listeners for Reactivity
        if (isReactive) {
            const inputs = fields.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', debounce(() => runTool(), 50));
            });
        }
    }

    document.getElementById('mOutBox').style.display = 'none';
    document.getElementById('modal').classList.add('open');
}

function closeModal() {
    document.getElementById('modal').classList.remove('open');
}

async function runTool() {
    try {
        const tool = tools.find(t => t.id === activeToolId);
        const data = {};
        if (tool.inputs) {
            tool.inputs.forEach(inp => {
                const el = document.getElementById(`inp_${inp.n}`);
                if (inp.t === 'file') {
                    data[inp.n] = el.files[0];
                } else {
                    data[inp.n] = el.value;
                }
            });
        }

        let res;

        // List of tools processed by worker
        const workerTools = ['cnt', 'rev', 'cln', 'bin', 'bde', 'rep', 'eml', 'url', 'num', 'slug', 'wpm', 'remdup', 'bmi', 'avg', 'jsn', 'gen'];

        if (activeToolId === 'txt2pdf') {
            document.getElementById('mOutVal').innerHTML = '⏳ جاري إنشاء ملف PDF...';
            document.getElementById('mOutBox').style.display = 'block';
            res = await handlePDF(activeToolId, data);
        } else if (['imgbw', 'flip', 'blur'].includes(activeToolId)) {
            document.getElementById('mOutVal').innerHTML = '⏳ جاري معالجة الصورة...';
            document.getElementById('mOutBox').style.display = 'block';
            res = await handleImageWorker(activeToolId, data.img);
        } else if (workerTools.includes(activeToolId)) {
            document.getElementById('mOutVal').innerHTML = '⏳ جاري المعالجة...';
            document.getElementById('mOutBox').style.display = 'block';
            worker.postMessage({ id: activeToolId, data: data });
            return;
        }

        res = engine[activeToolId] ? engine[activeToolId](data) : 'Under Development';

        if (res instanceof Promise) {
            document.getElementById('mOutVal').innerHTML = '⏳ جاري المعالجة...';
            document.getElementById('mOutBox').style.display = 'block';
            res = await res;
        }

        const out = document.getElementById('mOutVal');
        if (typeof res === 'object' && res instanceof HTMLElement) {
            out.innerHTML = '';
            out.appendChild(res);
        } else if (typeof res === 'string' && res.trim().startsWith('<')) {
            out.innerHTML = res;
        } else {
            out.innerText = res;
        }
        document.getElementById('mOutBox').style.display = 'block';

    } catch (e) {
        alert('حدث خطأ، تأكد من المدخلات');
        console.error(e);
    }
}

// --- Smart UX & Memory ---
const Memory = {
    get: (k) => JSON.parse(localStorage.getItem(k) || 'null'),
    set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),

    addHistory: (id) => {
        let h = Memory.get('history') || [];
        h = h.filter(x => x !== id);
        h.unshift(id);
        if (h.length > 5) h.pop();
        Memory.set('history', h);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modal').onclick = (e) => {
        if (e.target.id === 'modal') closeModal();
    }
});

// Stopwatch
window.toggleStopwatch = () => {
    if (window.stopwatchRun) {
        clearInterval(window.stopwatchTimer);
        window.stopwatchRun = false;
    } else {
        window.stopwatchTimer = setInterval(() => {
            window.stopwatchSec++;
            const h = Math.floor(window.stopwatchSec / 3600).toString().padStart(2, '0');
            const m = Math.floor((window.stopwatchSec % 3600) / 60).toString().padStart(2, '0');
            const s = (window.stopwatchSec % 60).toString().padStart(2, '0');
            document.getElementById('stopwatch').innerText = `${h}:${m}:${s}`;
        }, 1000);
        window.stopwatchRun = true;
    }
}
window.resetStopwatch = () => {
    clearInterval(window.stopwatchTimer);
    window.stopwatchSec = 0;
    window.stopwatchRun = false;
    document.getElementById('stopwatch').innerText = '00:00:00';
}

// --- Text Decoration Engine (Mega Decorator) ---
const textStyles = {
    'bold': { n: 'Bold (Serif)', m: { 'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳', 'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙' } },
    'bold_sans': { n: 'Bold (Sans)', m: { 'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇', 'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭' } },
    'italic': { n: 'Italic', m: { 'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧', 'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍' } },
    'script': { n: 'Script', m: { 'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏', 'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵' } },
    'bubble': { n: 'Bubble', m: { 'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ', 'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ' } },
    'square': { n: 'Square', m: { 'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅉', 'z': '🅉', 'A': '🄰', 'B': '🄱', 'C': '🄲', 'D': '🄳', 'E': '🄴', 'F': '🄵', 'G': '🄶', 'H': '🄷', 'I': '🄸', 'J': '🄹', 'K': '🄺', 'L': '🄻', 'M': '🄼', 'N': '🄽', 'O': '🄾', 'P': '🄿', 'Q': '🅀', 'R': '🅁', 'S': '🅂', 'T': '🅃', 'U': '🅄', 'V': '🅅', 'W': '🅆', 'X': '🅇', 'Y': '🅉', 'Z': '🅉' } },
    'gothic': { n: 'Gothic', m: { 'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥', 'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷', 'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ', 'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ' } },
    'mono': { n: 'Monospace', m: { 'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣', 'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉' } },
    'double': { n: 'Double Struck', m: { 'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫', 'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ' } }
};

function decorateText(text, styleKey) {
    if (!textStyles[styleKey]) return text;
    const map = textStyles[styleKey].m;
    return text.split('').map(char => map[char] || char).join(''); // Smart filter: keeps char if not in map
}

function updateLiveDecorations(text) {
    const container = document.getElementById('decorResults');
    if (!container) return;
    container.innerHTML = '';

    if (!text) {
        container.innerHTML = '<div style="color:#888;text-align:center;padding:10px">ابدأ الكتابة لتر الزخرفة فوراً...</div>';
        return;
    }

    Object.keys(textStyles).forEach(key => {
        const style = textStyles[key];
        const res = decorateText(text, key);

        const card = document.createElement('div');
        card.className = 'decor-card';
        card.style.cssText = 'background:#f8fafc;padding:12px;margin-bottom:10px;border-radius:8px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center';

        card.innerHTML = `
            <div>
                <div style="font-size:0.75rem;color:#64748b;margin-bottom:4px">${style.n}</div>
                <div style="font-size:1.1rem;font-family:sans-serif">${res}</div>
            </div>
            <button class="pro-btn" style="width:auto;padding:5px 12px;font-size:0.9rem" onclick="copyDecor('${res.replace(/'/g, "\\'")}')">نسخ</button>
        `;
        container.appendChild(card);
    });
}

window.copyDecor = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        showToast('تم النسخ! 📋');
    });
}

function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        t.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 20px;border-radius:20px;z-index:9999;font-size:0.9rem;opacity:0;transition:0.3s';
        document.body.appendChild(t);
    }
    t.innerText = msg;
    t.style.opacity = 1;
    t.style.bottom = '30px';
    setTimeout(() => {
        t.style.opacity = 0;
        t.style.bottom = '20px';
    }, 2000);
}

// --- i18n Engine ---
let currentLang = localStorage.getItem('ng_lang') || 'ar';
let translations = {};

async function loadLanguage(lang) {
    try {
        const res = await fetch(`locales/${lang}.json`);
        if (!res.ok) throw new Error('Lang file not found');
        translations = await res.json();
        currentLang = lang;
        localStorage.setItem('ng_lang', lang);
        applyLanguage();
    } catch (e) {
        console.error('i18n Error:', e);
    }
}

function applyLanguage() {
    // 1. Direction & Fonts
    document.documentElement.dir = translations.dir || 'rtl';
    document.documentElement.lang = currentLang;

    // 2. Static UI Elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations.ui && translations.ui[key]) {
            el.innerText = translations.ui[key];
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations.ui[key];
            }
        }
    });

    // 3. Update Tools Data (Runtime override)
    tools.forEach(t => {
        if (translations.tools && translations.tools[t.id]) {
            t.name = translations.tools[t.id].n;
            t.desc = translations.tools[t.id].d;
        }
    });

    // 4. Update Categories
    if (translations.categories) {
        // Logic to update category headers if they exist in DOM
        // For now, assuming re-render handles it via tool names
    }

    // 5. Re-render Grid
    const pageCat = document.body.dataset.category || 'all';
    if (typeof renderGrid === 'function') {
        renderGrid(pageCat);
    }
}

// Initialize i18n
window.addEventListener('load', () => {
    // Inject Language Selector if not present
    if (!document.querySelector('.lang-select')) {
        const header = document.querySelector('.header-content');
        if (header) {
            const sel = document.createElement('select');
            sel.className = 'lang-select';
            sel.style.cssText = "margin: 0 15px; padding: 5px; border-radius: 5px; border: 1px solid #ccc; background: white; color: #333;";
            sel.innerHTML = `
                <option value="ar">🇸🇦 العربية</option>
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="pt">🇵🇹 Português</option>
                <option value="ru">🇷🇺 Русский</option>
                <option value="tr">🇹🇷 Türkçe</option>
                <option value="id">🇮🇩 Indonesia</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="hi">🇮🇳 हिन्दी</option>
            `;
            sel.value = currentLang;
            sel.onchange = (e) => loadLanguage(e.target.value);

            const search = document.querySelector('.search-box');
            if (search) {
                header.insertBefore(sel, search);
            } else {
                header.appendChild(sel);
            }
        }
    }

    // Load Language
    loadLanguage(currentLang);
});

// --- PDF Visual Selector Logic ---
let pdfSelectedPages = new Set();
let currentPdfFile = null;

async function openPdfSelector(file, mode) {
    if (!window.pdfjsLib) {
        alert("مكتبة PDF.js غير محملة! تأكد من فتح صفحة PDF Tools");
        return;
    }

    currentPdfFile = file;
    pdfSelectedPages.clear();
    const grid = document.getElementById('pdfGrid');
    grid.innerHTML = '<div style="text-align:center;width:100%">⏳ جاري قراءة الملف...</div>';
    document.getElementById('pdfModal').classList.add('open');

    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

        grid.innerHTML = ''; // Clear loading

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 0.5 });

            const card = document.createElement('div');
            card.className = 'pdf-page-card';
            card.dataset.page = i - 1; // 0-based for internal logic

            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const context = canvas.getContext('2d');

            await page.render({ canvasContext: context, viewport: viewport }).promise;

            const img = document.createElement('img');
            img.src = canvas.toDataURL();

            card.appendChild(img);
            card.innerHTML += `<div class="pdf-page-num">صفحة ${i}</div>`;

            card.onclick = () => {
                const p = Number(card.dataset.page);
                if (pdfSelectedPages.has(p)) {
                    pdfSelectedPages.delete(p);
                    card.classList.remove('selected');
                } else {
                    pdfSelectedPages.add(p);
                    card.classList.add('selected');
                }
            };

            grid.appendChild(card);
        }

        const btn = document.getElementById('pdfActionBtn');
        btn.onclick = () => {
            if (pdfSelectedPages.size === 0) return alert('اختر صفحة واحدة على الأقل');

            document.getElementById('mOutVal').innerText = "⏳ جاري المعالجة في الخلفية...";
            document.getElementById('mOutBox').style.display = 'block';
            closePdfModal();

            // Send to Worker
            worker.postMessage({
                id: 'pdf_delete',
                data: {
                    file: currentPdfFile,
                    pages: Array.from(pdfSelectedPages)
                }
            });
        };

    } catch (error) {
        console.error(error);
        alert("خطأ في قراءة ملف PDF");
        closePdfModal();
    }
}

window.closePdfModal = () => {
    document.getElementById('pdfModal').classList.remove('open');
}

// YouTube Downloader Helper
window.downloadYTImage = async (url, name) => {
    try {
        const btn = event.target;
        const oldText = btn.innerText;
        btn.innerText = '⏳ جاري التحميل...';
        btn.disabled = true;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${name}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

        btn.innerText = '✅ تم التحميل!';
        setTimeout(() => {
            btn.innerText = oldText;
            btn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('Download failed:', error);
        alert('فشل التحميل المباشر (CORS Policy). سيتم فتح الصورة في نافذة جديدة.');
        window.open(url, '_blank');
        event.target.innerText = '❌ فشل (تم الفتح)';
    }
}

// Debounce Helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Confetti Engine
window.fireConfetti = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.style.cssText = `
            position: fixed;
            top: 50%; left: 50%;
            width: 10px; height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(div);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let x = 0, y = 0;
        let start = Date.now();

        const anim = setInterval(() => {
            const dt = (Date.now() - start) / 16;
            x += vx;
            y += vy + (0.1 * dt); // Gravity
            div.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

            if (Date.now() - start > 1500) {
                clearInterval(anim);
                div.remove();
            }
        }, 16);
    }
};

// Precise Age Calculation
window.calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    return `${years} سنة، و ${months} شهر، و ${days} يوم`;
};

// RPS Game Logic
window.playRPS = (userChoice) => {
    const choices = ['rock', 'paper', 'scissors'];
    const pcChoice = choices[Math.floor(Math.random() * 3)];
    const map = { 'rock': '🪨', 'paper': '📄', 'scissors': '✂️' };

    let result = '';
    let color = '';

    if (userChoice === pcChoice) {
        result = 'تعادل! 😐';
        color = '#f59e0b';
    } else if (
        (userChoice === 'rock' && pcChoice === 'scissors') ||
        (userChoice === 'paper' && pcChoice === 'rock') ||
        (userChoice === 'scissors' && pcChoice === 'paper')
    ) {
        result = 'أنت فزت! 🎉';
        color = '#10b981';
        fireConfetti();
    } else {
        result = 'الكمبيوتر فاز! 🤖';
        color = '#ef4444';
    }

    const out = document.getElementById('rpsResult');
    out.innerHTML = `
        <div style="font-size:2rem;margin-bottom:10px">
            <span style="display:inline-block;animation:bounce 0.5s">أنت: ${map[userChoice]}</span> 
            <span style="margin:0 20px">VS</span> 
            <span style="display:inline-block;animation:bounce 0.5s reverse">الكمبيوتر: ${map[pcChoice]}</span>
        </div>
        <div style="font-size:1.5rem;font-weight:bold;color:${color}">${result}</div>
    `;
};

// --- Native Audio Tools ---
window.speakText = (text, lang = 'ar-SA') => {
    if (!window.speechSynthesis) return alert("متصفحك لا يدعم هذه الميزة");
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.includes(lang.split('-')[0])) || voices[0];
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
};

let mediaRecorder;
let audioChunks = [];
window.startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.controls = true;

            // UI Update
            const container = document.getElementById('mOutVal');
            container.innerHTML = '<h5>تم التسجيل!</h5>';
            container.appendChild(audio);

            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = `recording_${Date.now()}.webm`;
            link.className = 'pro-btn';
            link.innerText = '💾 تحميل التسجيل';
            link.style.marginTop = '10px';
            link.style.display = 'inline-block';
            container.appendChild(document.createElement('br'));
            container.appendChild(link);

            audioChunks = [];
        };
        mediaRecorder.start();
        return true;
    } catch (e) {
        alert('فشل الوصول للميكروفون: ' + e.message);
        return false;
    }
};

window.stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
};

window.playTone = (freq = 440, dur = 2) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + dur);
    osc.stop(ctx.currentTime + dur);
};

// --- Instant Video Frame ---
window.captureVideoFrame = (file, time) => {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.currentTime = time;
        video.muted = true;
        video.playsInline = true;

        video.onloadeddata = () => {
            video.currentTime = time; // Ensure seek
        };

        video.onseeked = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.95));
            URL.revokeObjectURL(video.src);
        };

        video.onerror = () => resolve(null);
    });
};
