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
        alert('فشل تحميل البيانات، يرجى تحديث الصفحة');
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
                // Draw to canvas
                const cvs = document.createElement('canvas');
                cvs.width = result.width;
                cvs.height = result.height;
                const ctx = cvs.getContext('2d');
                ctx.drawImage(result, 0, 0);
                resolve(cvs); // Return canvas element

                // Restore default worker message handler for other tools
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
    'yt_thumb': (d) => {
        const v = d.url.split('v=')[1] || d.url.split('/').pop();
        if (!v || v.length < 5) return 'رابط غير صحيح';
        const i = `https://img.youtube.com/vi/${v}/maxresdefault.jpg`;
        return `<img src="${i}" style="width:100%;border-radius:10px"><br><a href="${i}" target="_blank" class="pro-btn">تحميل</a>`;
    },
    'vid_aud': (d) => "⚠️ يتطلب هذا الأمر معالجة خادم (FFmpeg Server-side).",
    'vid_trim': (d) => "⚠️ ميزة القص تتطلب رفع الملف (قريباً).",
    'vid_mute': (d) => "✅ تم استلام الطلب (محاكاة).",
    'vid_info': (d) => `المقاس: ${(d.file.size / 1024 / 1024).toFixed(2)} MB\nالنوع: ${d.file.type}`,
    'vid_spd': (d) => "⚠️ تغيير السرعة يحتاج معالجة متقدمة.",
    'vid_gif': (d) => "⚠️ تحويل GIF يتطلب موارد عالية.",
    'vid_pic': (d) => "⚠️ أخذ اللقطات غير مدعوم في هذا الإصدار.",
    'vid_rot': (d) => "⚠️ التدوير يتطلب إعادة ترميز.",
    'vid_mir': (d) => "⚠️ العكس يتطلب إعادة ترميز.",

    // --- Audio ---
    'tts': (d) => {
        if (!window.speechSynthesis) return 'غير مدعوم';
        const u = new SpeechSynthesisUtterance(d.txt);
        u.lang = d.lang || 'ar-SA';
        speechSynthesis.speak(u);
        return 'جاري القراءة... 🔊';
    },
    'aud_rec': () => {
        return `🔴 <button class="pro-btn" onclick="alert('Start Rec')">تسجيل</button>`;
    },
    'aud_trim': (d) => "⚠️ قص الصوت غير متوفر حالياً.",
    'aud_vol': (d) => "⚠️ رفع الصوت غير متوفر حالياً.",
    'aud_spd': (d) => "⚠️ تسريع الصوت غير متوفر حالياً.",
    'aud_rev': (d) => "⚠️ عكس الصوت غير متوفر حالياً.",
    'aud_bpm': (d) => "TAP TAP TAP (BPM Calc UI needed)",
    'aud_gen': (d) => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.frequency.value = d.hz;
        osc.connect(ctx.destination);
        osc.start();
        setTimeout(() => osc.stop(), 1000);
        return `تشغيل ${d.hz}Hz لمدة ثانية`;
    },
    'aud_info': (d) => `الحجم: ${(d.file.size / 1024).toFixed(2)} KB`,
    'aud_conv': (d) => "⚠️ التحويل يتطلب خادم.",

    // --- PDF ---
    'txt2pdf': (d) => "يتم المعالجة عبر pdf-lib...",
    'img2pdf': (d) => "يتم المعالجة عبر pdf-lib...",
    'pdf_mrg': (d) => "⚠️ دمج الملفات يتطلب مكتبة متقدمة.",
    'pdf_spl': (d) => "⚠️ التقسيم يتطلب مكتبة متقدمة.",
    'pdf_inf': (d) => `الملف: ${d.f ? d.f.name : '-'}`,
    'pdf_wat': (d) => "⚠️ العلامة المائية غير متوفرة.",
    'pdf_rot': (d) => "⚠️ التدوير غير متوفر.",
    'pdf_lock': (d) => "⚠️ التشفير غير متوفر.",
    'pdf_meta': (d) => "⚠️ تعديل الوصف غير متوفر.",
    'pdf_clr': (d) => "⚠️ الحذف غير متوفر.",

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
    'd_mor': (d) => ".... . .-.. .-.. ---",
    'd_emo': (d) => d.txt + " 😀",

    // --- Math ---
    'age': (d) => `العمر: ${Math.floor((Date.now() - new Date(d.bd)) / 31557600000)} سنة`,
    'bmi': (d) => `BMI: ${(d.w / ((d.h / 100) ** 2)).toFixed(1)}`,
    'loan': (d) => `القسط: ${(d.a / d.m).toFixed(2)}`,
    'vat': (d) => `الإجمالي: ${(d.v * 1.15).toFixed(2)}`,
    'disc': (d) => `الصافي: ${(d.p * (1 - d.d / 100)).toFixed(2)}`,
    'pct': (d) => `${((d.p / d.v) * 100).toFixed(1)}%`,
    'zak': (d) => `الزكاة: ${(d.v / 40).toFixed(2)}`,
    'gpa': (d) => "4.0 (يحتاج تفصيل)",
    'sal': (d) => `الساعة: ${(d.s / 240).toFixed(2)}`,
    'rnd': (d) => Math.floor(Math.random() * d.m),

    // --- Games ---
    'rps': (d) => { const c = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]; return `PC: ${c}`; },
    'dice': () => Math.floor(Math.random() * 6) + 1,
    'coin': () => Math.random() > 0.5 ? 'وجه' : 'قفا',
    'guess': (d) => { const r = Math.floor(Math.random() * 10) + 1; return d.v == r ? '🎉' : `❌ (${r})`; },
    'love': (d) => `${Math.floor(Math.random() * 100)}% ❤️`,
    'joke': () => window.contentDB?.jokes[Math.floor(Math.random() * window.contentDB.jokes.length)] || "...",
    'fact': () => window.contentDB?.facts[Math.floor(Math.random() * window.contentDB.facts.length)] || "...",
    'quote': () => window.contentDB?.quotes[Math.floor(Math.random() * window.contentDB.quotes.length)] || "...",
    'pass': (d) => d.p.length > 8 ? 'Strong ✅' : 'Weak ⚠️',
    'react': () => "اضغط بسرعة! (قريباً)",

    // --- Legacy / Shared ---
    'img2png': (d) => convertImg(d.img, 'image/png', 'png'),
    'img2jpg': (d) => convertImg(d.img, 'image/jpeg', 'jpg'),
    'img2webp': (d) => convertImg(d.img, 'image/webp', 'webp'),
    'imgbw': (d) => processImg(d.img, (ctx, cvs) => {
        ctx.filter = 'grayscale(100%)';
        ctx.drawImage(document.getElementById('tempImg'), 0, 0);
    }),
    'flip': (d) => processImg(d.img, (ctx, cvs) => {
        ctx.translate(cvs.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(document.getElementById('tempImg'), 0, 0);
    }),
    'blur': (d) => processImg(d.img, (ctx, cvs) => {
        ctx.filter = 'blur(5px)';
        ctx.drawImage(document.getElementById('tempImg'), 0, 0);
    })
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
                drawFn(ctx, cvs);
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

    const fields = document.getElementById('mFields'); // Fixed from mInputs to match or I need to check HTML
    const inputContainer = document.getElementById('mInputs'); // In HTML it is mInputs
    inputContainer.innerHTML = '';

    if (tool.inputs) {
        tool.inputs.forEach(inp => {
            const div = document.createElement('div');
            div.className = 'field';
            let html = `<label>${inp.l}</label>`;

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
            inputContainer.appendChild(div);
        });
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
            return; // Exit, worker will handle output
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

    // History
    addHistory: (id) => {
        let h = Memory.get('history') || [];
        h = h.filter(x => x !== id); // Remove duplicates
        h.unshift(id); // Add to top
        if (h.length > 5) h.pop(); // Keep last 5
        Memory.set('history', h);
    },

    // Fisher-Yates Shuffle
    shuffle: (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};

// Global Init
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modal').onclick = (e) => {
        if (e.target.id === 'modal') closeModal();
    }

    // Check for history
    const lastTool = Memory.get('last_tool');
    if (lastTool) console.log('Welcome back! Last tool used:', lastTool);
});

// Stopwatch Helper
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
