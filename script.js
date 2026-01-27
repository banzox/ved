
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
        let page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 12;
        const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

        // Professional Text Wrapping
        const text = data.txt || '';
        const lines = text.split('\n');
        let y = height - 50;
        const margin = 50;
        const maxWidth = width - (margin * 2);

        for (const line of lines) {
            let currentLine = '';
            const words = line.split(' ');

            for (const word of words) {
                const testLine = currentLine + (currentLine ? ' ' : '') + word;
                const textWidth = font.widthOfTextAtSize(testLine, fontSize);

                if (textWidth > maxWidth) {
                    // Draw current line and start new one
                    if (y < 50) { // New page if bottom reached
                        page = pdfDoc.addPage();
                        y = height - 50;
                    }
                    page.drawText(currentLine, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
                    y -= (fontSize + 5);
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            }
            // Draw last part of line
            if (y < 50) { page = pdfDoc.addPage(); y = height - 50; }
            page.drawText(currentLine, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
            y -= (fontSize + 5);
        }

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
    'cap': (d) => d.txt.replace(/\b\w/g, c => c.toUpperCase()),
    'bin': (d) => d.txt.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '),
    'bde': (d) => d.txt.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join(''),
    'rep': (d) => Array(Number(d.cnt) || 5).fill(d.txt).join(' '),
    'eml': (d) => (d.txt.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) || []).join('\n'),
    'url': (d) => (d.txt.match(/(https?:\/\/[^\s]+|www\.[^\s]+)/g) || []).join('\n'),
    'num': (d) => (d.txt.match(/\d+/g) || []).join(' '),
    'slug': (d) => d.txt.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
    'morse': (d) => {
        const morseCode = { 'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--', 'z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', ' ': '/' };
        return d.txt.toLowerCase().split('').map(c => morseCode[c] || c).join(' ');
    },
    'wpm': (d) => `الوقت المقدر: ${(d.txt.trim().split(/\s+/).length / 200).toFixed(1)} دقيقة`,
    'noc': (d) => d.txt.replace(/[^\u0621-\u064A\s]/g, ''),
    'pascal': (d) => d.txt.trim().replace(/\b\w/g, c => c.toUpperCase()).replace(/\s+/g, ''),
    'remdup': (d) => [...new Set(d.txt.split('\n'))].join('\n'),
    'revw': (d) => d.txt.split(' ').reverse().join(' '),
    'nln': (d) => d.txt.replace(/\n/g, ' '),
    'tts': (d) => {
        if (!window.speechSynthesis) return 'متصفحك لا يدعم القراءة الصوتية';
        const u = new SpeechSynthesisUtterance(d.txt);
        u.lang = d.lang || 'ar-SA';
        speechSynthesis.speak(u);
        return 'جاري القراءة... 🔊';
    },

    // Math
    'age': (d) => { const dif = Date.now() - new Date(d.bd).getTime(); return `عمرك: ${Math.floor(dif / 31557600000)} سنة`; },
    'bmi': (d) => { const h = d.h / 100; const b = (d.w / (h * h)).toFixed(2); return `BMI: ${b} (${b < 18.5 ? 'نحيف' : b < 25 ? 'طبيعي' : 'سمنة'})`; },
    'vat': (d) => `السعر شامل الضريبة: ${(d.p * 1.15).toFixed(2)}`,
    'disc': (d) => `السعر بعد الخصم: ${(d.price * (1 - d.perc / 100)).toFixed(2)}`,
    'loan': (d) => `القسط الشهري (بدون فوائد): ${(d.amount / d.months).toFixed(2)}`,
    'zak': (d) => `الزكاة الواجبة: ${(d.money / 40).toFixed(2)}`,
    'sav': (d) => `ستجمع في السنة: ${d.m * 12}`,
    'sal': (d) => `ساعة عملك تساوي: ${(d.s / (30 * 8)).toFixed(2)}`,
    'pwd': (d) => Math.pow(d.b, d.e),
    'pct': (d) => ((d.pc / 100) * d.val).toFixed(2),
    'sqrt': (d) => Math.sqrt(d.v).toFixed(4),
    'avg': (d) => { const n = d.nums.split(' ').map(Number); return (n.reduce((a, b) => a + b, 0) / n.length).toFixed(2); },
    'min': (d) => Math.min(...d.nums.split(' ').map(Number)),
    'max': (d) => Math.max(...d.nums.split(' ').map(Number)),
    'rand': (d) => Math.floor(Math.random() * (d.max - d.min + 1) + d.min),
    'hyp': (d) => Math.hypot(d.a, d.b).toFixed(2),
    'stop': () => {
        window.stopwatchSec = 0; window.stopwatchRun = false;
        return `<div id="stopwatch" style="font-size:40px;font-weight:bold;margin:20px 0;direction:ltr">00:00:00</div>
        <button onclick="toggleStopwatch()" class="pro-btn" style="width:auto;margin:5px">ابدأ / إيقاف</button>
        <button onclick="resetStopwatch()" class="pro-btn" style="width:auto;margin:5px;background:#ef4444">تصفير</button>`;
    },

    // Conv
    'c2f': (d) => ((d.v * 9 / 5) + 32).toFixed(1),
    'f2c': (d) => ((d.v - 32) * 5 / 9).toFixed(1),
    'k2m': (d) => (d.v * 0.621371).toFixed(2),
    'm2k': (d) => (d.v / 0.621371).toFixed(2),
    'k2l': (d) => (d.v * 2.20462).toFixed(2),
    'l2k': (d) => (d.v / 2.20462).toFixed(2),
    'cm2i': (d) => (d.v / 2.54).toFixed(2),
    'i2cm': (d) => (d.v * 2.54).toFixed(2),
    'm2g': (d) => (d.v / 1024).toFixed(4),
    'g2m': (d) => (d.v * 1024).toFixed(2),
    'pxr': (d) => (d.v / 16).toFixed(3) + ' rem',
    'r2p': (d) => (d.v * 16).toFixed(0) + ' px',
    'l2ml': (d) => d.v * 1000,
    'ml2l': (d) => d.v / 1000,
    'd2h': (d) => d.v * 24,
    'h2m': (d) => d.v * 60,
    'm2s': (d) => d.v * 60,
    'kh2mp': (d) => (d.v * 0.621371).toFixed(1),
    'mp2kh': (d) => (d.v / 0.621371).toFixed(1),
    'psi': (d) => (d.v * 0.0689476).toFixed(2),

    // Dev
    'jsn': (d) => { try { return JSON.stringify(JSON.parse(d.txt), null, 2); } catch { return 'Invalid JSON'; } },
    'b64': (d) => btoa(d.txt),
    'dec': (d) => atob(d.txt),
    'ue': (d) => encodeURIComponent(d.txt),
    'ud': (d) => decodeURIComponent(d.txt),
    'gen': (d) => Math.random().toString(36).slice(-d.len),
    'css': (d) => { let c = d.hex.replace('#', ''); return `rgb(${parseInt(c.substr(0, 2), 16)}, ${parseInt(c.substr(2, 2), 16)}, ${parseInt(c.substr(4, 2), 16)})` },
    'rgb': (d) => '#' + ((1 << 24) + (Number(d.r) << 16) + (Number(d.g) << 8) + Number(d.b)).toString(16).slice(1),
    'uuid': () => crypto.randomUUID(),
    'ip': () => "127.0.0.1 (Localhost)",
    'sql': (d) => d.txt.replace(/SELECT|FROM|WHERE|AND|OR|ORDER BY|LIMIT/g, "\n$&"),
    'lorem': (d) => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(d.n),
    'htmle': (d) => d.txt.replace(/[\u00A0-\u9999<>&]/g, i => '&#' + i.charCodeAt(0) + ';'),
    'unix': () => Date.now(),
    'ua': () => navigator.userAgent,
    'md': (d) => `<div style="text-align:left;background:#fff;padding:10px;border:1px solid #ccc">${d.txt.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>').replace(/\n/g, '<br>')}</div>`,
    'whois': (d) => window.open(`https://who.is/whois/${d.dom}`),
    'speed': () => {
        const s = (Math.random() * 50 + 10).toFixed(1);
        return `سرعة التحميل التقديرية: ${s} Mbps (محاكاة)`;
    },

    // Social
    'bio': (d) => `✨ ${d.txt} ✨`,
    'wht': (d) => window.open(`https://wa.me/${d.num}`),
    'tag': () => ['#explorer', '#saudi', '#trend', '#viral', '#fyp', '#new', '#design', '#tech'].sort(() => 0.5 - Math.random()).slice(0, 5).join(' '),
    'lnk': (d) => d.url.startsWith('https') ? '✅ آمن (SSL Secured)' : '⚠️ غير آمن (HTTP)',
    'memo': (d) => { Memory.set('memo_tmp', d.txt); return `تم الحفظ بنجاح!`; },
    'caption': () => {
        const caps = ["الحياة رحلة، استمتع بالطريق 🛣️", "كن أنت التغيير الذي تريده في العالم 🌍", "ابتسم، فالحياة جميلة 😊", "النجاح يبدأ بخطوة 🚀"];
        return caps[Math.floor(Math.random() * caps.length)];
    },
    'yt': () => {
        const ideas = ["فلوق يوم كامل", "شرح مهارة جديدة", "رد فعل (Reaction)", "تحدي مع الأصدقاء", "مراجعة منتج تقني"];
        return ideas[Math.floor(Math.random() * ideas.length)];
    },
    'tweet': (d) => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(d.txt)}`),
    'qr': (d) => window.open(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${d.txt}`),
    'passc': (d) => {
        const s = d.txt.length;
        if (s < 6) return 'ضعيفة جداً 🔴';
        if (s < 10) return 'متوسطة 🟡';
        if (d.txt.match(/[A-Z]/) && d.txt.match(/[0-9]/)) return 'قوية وممتازة 🟢';
        return 'جيدة 🔵';
    },
    'thumb': (d) => {
        const v = d.url.split('v=')[1] || d.url.split('/').pop();
        if (!v || v.length < 5) return 'رابط يوتيوب غير صحيح';
        const i = `https://img.youtube.com/vi/${v}/maxresdefault.jpg`;
        return `<img src="${i}" style="width:100%;border-radius:10px"><br><a href="${i}" target="_blank" class="pro-btn" style="display:inline-block;margin-top:10px">تحميل الصورة</a>`;
    },

    // Game
    'dice': () => Math.floor(Math.random() * 6) + 1,
    'rps': (d) => { const c = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]; return `أنت: ${d.c} | الحاسوب: ${c} | ${d.c == c ? 'تعادل 😐' : ((d.c == 'rock' && c == 'scissors') || (d.c == 'paper' && c == 'rock') || (d.c == 'scissors' && c == 'paper')) ? 'فزت! 🎉' : 'خسرت 😢'}` },
    'love': (d) => `نسبة التوافق بين ${d.n1} و ${d.n2} هي ${Math.floor(Math.random() * 30 + 70)}% ❤️ (مجرد لعبة)`,
    'coin': () => Math.random() > 0.5 ? 'وجه (صورة)' : 'قفا (كتابة)',
    'guess': (d) => { let r = Math.floor(Math.random() * 10) + 1; return d.v == r ? 'إجابة صحيحة! 🎉' : `خطأ، الرقم المخفي كان ${r}` },
    'joke': () => {
        const j = ["مرة واحد حب يطور نفسه، لقى التحديث بفلوس 😂", "ليش السمك يخاف من التكنولوجيا؟ عشان الشبكة 🕸️", "طالب نام في المحاضرة، حلم أنه يجاوب، صحي لقى نفسه يصفق 👏"];
        return j[Math.floor(Math.random() * j.length)];
    },
    'fact': () => {
        const f = ["العسل هو الطعام الوحيد الذي لا يفسد.", "قلب الروبيان يقع في رأسه.", "الأخطبوط له 3 قلوب.", "الفضاء صامت تماماً."];
        return f[Math.floor(Math.random() * f.length)];
    },
    'quote': () => {
        const q = ["لا تؤجل عمل اليوم إلى الغد.", "الوقت كالسيف إن لم تقطعه قطعك.", "العلم نور والجهل ظلام.", "كن صبوراً فالدروس تأتي مع الوقت."];
        return q[Math.floor(Math.random() * q.length)];
    },
    'emoj': (d) => d.txt.replace(/love/g, '❤️').replace(/happy/g, '😊').replace(/sad/g, '😢').replace(/fire/g, '🔥').replace(/star/g, '⭐'),
    'decision': (d) => Math.random() > 0.5 ? 'نعم، فكرة جيدة ✅' : 'لا، تجنب هذا الأمر ❌',

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
