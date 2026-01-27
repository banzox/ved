
// --- Data & Logic ---

let tools = [];
const worker = new Worker('worker.js');

worker.onmessage = function (e) {
    const { result } = e.data;
    const out = document.getElementById('mOutVal');
    out.innerText = result;
    document.getElementById('mOutBox').style.display = 'block';
};

async function loadTools() {
    try {
        const response = await fetch('data/tools.json');
        if (!response.ok) throw new Error('Failed to load tools');
        tools = await response.json();
    } catch (error) {
        console.error('Error loading tools:', error);
        alert('فشل تحميل البيانات، يرجى تحديث الصفحة');
    }
}

// PDF Helper
async function loadPDFLib() {
    if (window.PDFLib) return;
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
    });
}

async function handlePDF(id, data) {
    await loadPDFLib();
    const { PDFDocument, rgb } = PDFLib;

    if (id === 'txt2pdf') {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        // Simple text wrapping or just writing text
        // Note: pdf-lib text drawing is basic. For long text we need wrapping logic.
        // For this MVP, we will print small text or just dump it.
        const fontSize = 12;
        page.drawText(data.txt, {
            x: 50,
            y: height - 50,
            size: fontSize,
            color: rgb(0, 0, 0),
            maxWidth: width - 100,
            lineHeight: fontSize + 2,
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        // Open PDF in new tab/iframe
        return `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`;
    }
    return 'PDF Tool Not Implemented Yet';
}

async function handleImageWorker(id, file) {
    if (!file) return 'Please select an image first.';

    // Create Bitmap
    const bmp = await createImageBitmap(file);

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
    // Student
    'cnt': (d) => `الكلمات: ${d.txt.trim().split(/\s+/).length} | الأحرف: ${d.txt.length}`,
    'rev': (d) => d.txt.split('').reverse().join(''),
    'cln': (d) => d.txt.replace(/\s+/g, ' ').trim(),
    'upr': (d) => d.txt.toUpperCase(),
    'lwr': (d) => d.txt.toLowerCase(),
    'cap': (d) => d.txt.replace(/\b\w/g, c => c.toUpperCase()),
    'bin': (d) => d.txt.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '),
    'bde': (d) => d.txt.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join(''),
    'rep': (d) => Array(Number(d.cnt) || 5).fill(d.txt).join(' '),
    'eml': (d) => (d.txt.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) || []).join('\n'),
    'url': (d) => (d.txt.match(/https?:\/\/[^\s]+/g) || []).join('\n'),
    'num': (d) => (d.txt.match(/\d+/g) || []).join(' '),
    'slug': (d) => d.txt.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
    'morse': (d) => ".... . .-.. .-.. ---",
    'wpm': (d) => `الوقت المقدر: ${(d.txt.trim().split(/\s+/).length / 200).toFixed(1)} دقيقة`,
    'sort': (d) => d.txt.split('\n').sort().join('\n'),
    'sortr': (d) => d.txt.split('\n').sort().reverse().join('\n'),
    'noc': (d) => d.txt.replace(/[^\u0621-\u064A\s]/g, ''),
    'snake': (d) => d.txt.trim().toLowerCase().replace(/\s+/g, '_'),
    'camel': (d) => d.txt.trim().toLowerCase().replace(/\s+(.)/g, (m, c) => c.toUpperCase()),
    'kebab': (d) => d.txt.trim().toLowerCase().replace(/\s+/g, '-'),
    'pascal': (d) => d.txt.trim().replace(/\b\w/g, c => c.toUpperCase()).replace(/\s+/g, ''),
    'remdup': (d) => [...new Set(d.txt.split('\n'))].join('\n'),
    'revw': (d) => d.txt.split(' ').reverse().join(' '),
    'nln': (d) => d.txt.replace(/\n/g, ' '),

    // Math
    'age': (d) => { const dif = Date.now() - new Date(d.bd).getTime(); return `عمرك: ${Math.floor(dif / 31557600000)} سنة`; },
    'bmi': (d) => { const h = d.h / 100; const b = (d.w / (h * h)).toFixed(2); return `BMI: ${b} (${b < 25 ? 'طبيعي' : 'زائد'})`; },
    'vat': (d) => `السعر شامل الضريبة: ${(d.p * 1.15).toFixed(2)}`,
    'disc': (d) => `السعر بعد الخصم: ${(d.price * (1 - d.perc / 100)).toFixed(2)}`,
    'loan': (d) => `القسط: ${(d.amount / d.months).toFixed(2)} شهرياً`,
    'zak': (d) => `الزكاة الواجبة: ${(d.money / 40).toFixed(2)}`,
    'sav': (d) => `ستجمع في السنة: ${d.m * 12}`,
    'sal': (d) => `ساعة عملك تساوي: ${(d.s / (30 * 8)).toFixed(2)}`,
    'tip': (d) => `الإكرامية: ${(d.bill * d.perc / 100).toFixed(2)} | الإجمالي: ${(d.bill * (1 + d.perc / 100)).toFixed(2)}`,
    'area': (d) => `المساحة: ${d.l * d.w}`,
    'cir': (d) => `المساحة: ${(Math.PI * d.r * d.r).toFixed(2)}`,
    'tri': (d) => `المساحة: ${(0.5 * d.b * d.h).toFixed(2)}`,
    'pwd': (d) => Math.pow(d.b, d.e),
    'pct': (d) => (d.pc / 100) * d.val,
    'sqrt': (d) => Math.sqrt(d.v),
    'avg': (d) => { const n = d.nums.split(' ').map(Number); return n.reduce((a, b) => a + b, 0) / n.length; },
    'min': (d) => Math.min(...d.nums.split(' ').map(Number)),
    'max': (d) => Math.max(...d.nums.split(' ').map(Number)),
    'rand': (d) => Math.floor(Math.random() * (d.max - d.min + 1) + d.min),
    'hyp': (d) => Math.hypot(d.a, d.b).toFixed(2),

    // Conv
    'c2f': (d) => (d.v * 9 / 5) + 32,
    'f2c': (d) => (d.v - 32) * 5 / 9,
    'k2m': (d) => d.v * 0.621371,
    'm2k': (d) => d.v / 0.621371,
    'k2l': (d) => d.v * 2.20462,
    'l2k': (d) => d.v / 2.20462,
    'cm2i': (d) => d.v / 2.54,
    'i2cm': (d) => d.v * 2.54,
    'm2g': (d) => d.v / 1024,
    'g2m': (d) => d.v * 1024,
    'pxr': (d) => d.v / 16 + ' rem',
    'r2p': (d) => d.v * 16 + ' px',
    'l2ml': (d) => d.v * 1000,
    'ml2l': (d) => d.v / 1000,
    'd2h': (d) => d.v * 24,
    'h2m': (d) => d.v * 60,
    'm2s': (d) => d.v * 60,
    'kh2mp': (d) => d.v * 0.621371,
    'mp2kh': (d) => d.v / 0.621371,
    'psi': (d) => d.v * 0.0689476,

    // Dev
    'jsn': (d) => JSON.stringify(JSON.parse(d.txt), null, 2),
    'b64': (d) => btoa(d.txt),
    'dec': (d) => atob(d.txt),
    'ue': (d) => encodeURIComponent(d.txt),
    'ud': (d) => decodeURIComponent(d.txt),
    'gen': (d) => Math.random().toString(36).slice(-d.len),
    'css': (d) => { let c = d.hex.replace('#', ''); return `rgb(${parseInt(c.substr(0, 2), 16)}, ${parseInt(c.substr(2, 2), 16)}, ${parseInt(c.substr(4, 2), 16)})` },
    'rgb': (d) => '#' + ((1 << 24) + (Number(d.r) << 16) + (Number(d.g) << 8) + Number(d.b)).toString(16).slice(1),
    'uuid': () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => { var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); }),
    'ip': () => "127.0.0.1 (Localhost)",
    'sql': (d) => d.txt.replace(/SELECT|FROM|WHERE|AND|OR|ORDER BY|LIMIT/g, "\n$&"),
    'lorem': (d) => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(d.n),
    'htmle': (d) => d.txt.replace(/[\u00A0-\u9999<>&]/g, i => '&#' + i.charCodeAt(0) + ';'),
    'unix': () => Date.now(),
    'ua': () => navigator.userAgent,

    // Social
    'bio': (d) => `✨ ${d.txt} ✨`,
    'wht': (d) => window.open(`https://wa.me/${d.num}`),
    'tag': () => "#explorer #trend #viral #fyp #new #love",
    'lnk': (d) => d.url.startsWith('https') ? 'آمن (SSL Available)' : 'غير آمن (HTTP)',
    'memo': (d) => `تم الحفظ: ${d.txt.substring(0, 20)}...`,
    'caption': () => "الحياة رحلة وليست وجهة. 🌍 #travel",
    'yt': () => "كيف تبرمج موقع بدقيقة? 💻",
    'tweet': (d) => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(d.txt)}`),
    'qr': (d) => window.open(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${d.txt}`),
    'passc': (d) => d.txt.length > 8 ? 'قوية ✅' : 'ضعيفة ❌',

    // Game
    'dice': () => Math.floor(Math.random() * 6) + 1,
    'rps': (d) => { const c = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]; return `أنت: ${d.c} | الحاسوب: ${c} | ${d.c == c ? 'تعادل' : 'جرب مرة أخرى'}` },
    'love': (d) => `نسبة الحب بين ${d.n1} و ${d.n2} هي ${Math.floor(Math.random() * 100)}% ❤️`,
    'coin': () => Math.random() > 0.5 ? 'وجه' : 'قفا',
    'guess': (d) => { let r = Math.floor(Math.random() * 10) + 1; return d.v == r ? 'صح! 🎉' : `خطأ، الرقم كان ${r}` },
    'joke': () => "مرة واحد حب يطور نفسه، لقى التحديث بفلوس 😂",
    'fact': () => "هل تعلم أن العسل لا يفسد أبداً؟",
    'quote': () => "لا تؤجل عمل اليوم إلى الغد.",
    'emoj': (d) => d.txt.replace(/love/g, '❤️').replace(/happy/g, '😊').replace(/sad/g, '😢'),
    'decision': (d) => Math.random() > 0.5 ? 'نعم، توكل على الله' : 'لا، ابحث عن خيار آخر',

    // Files
    'img2png': (d) => convertImg(d.img, 'image/png', 'png'),
    'img2jpg': (d) => convertImg(d.img, 'image/jpeg', 'jpg'),
    'img2webp': (d) => convertImg(d.img, 'image/webp', 'webp'),
    'imgbw': (d) => processImg(d.img, (ctx, cvs) => {
        ctx.filter = 'grayscale(100%)';
        ctx.drawImage(document.getElementById('tempImg'), 0, 0);
    }),
    'imginfo': (d) => new Promise((resolve) => {
        if (!d.img) return resolve('اختر ملفاً');
        const i = new Image();
        i.onload = () => resolve(`النوع: ${d.img.type}\nالحجم: ${(d.img.size / 1024).toFixed(2)} KB\nالأبعاد: ${i.width}x${i.height}`);
        i.src = URL.createObjectURL(d.img);
    }),
    'img64': (d) => new Promise((resolve) => {
        if (!d.img) return resolve('اختر ملفاً');
        const r = new FileReader();
        r.onload = (e) => resolve(`<textarea style="width:100%" rows="5">${e.target.result}</textarea>`);
        r.readAsDataURL(d.img);
    }),
    'b64img': (d) => `<img src="${d.txt.startsWith('data:') ? d.txt : 'data:image/png;base64,' + d.txt}" style="max-width:100%;border-radius:10px">`,
    'txt2pdf': (d) => {
        const w = window.open('', '_blank');
        w.document.write(`<pre style="font-family:monospace;padding:20px">${d.txt}</pre>`);
        w.document.close();
        w.print();
        return 'تم فتح نافذة الطباعة (اختر Save as PDF)';
    },
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

    const fields = document.getElementById('mFields');
    fields.innerHTML = '';

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
            } else {
                html += `<input type="${inp.t}" id="inp_${inp.n}" value="${inp.d || ''}">`;
            }
            div.innerHTML = html;
            fields.appendChild(div);
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
        const workerTools = ['cnt', 'rev', 'cln', 'upr', 'lwr', 'cap', 'bin', 'bde', 'rep', 'eml', 'url', 'num', 'slug', 'wpm', 'sort', 'sortr', 'remdup', 'bmi', 'avg', 'jsn', 'gen'];

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

function search(q) {
    const v = q.toLowerCase();
    document.querySelectorAll('.tool-card').forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(v) ? 'flex' : 'none';
    });
}
