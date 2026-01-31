// NextGear Professional Engine
// Optimized for Speed & Privacy

let tools = [];
const worker = new Worker('worker.js');

// --- Main Data Loader ---
async function loadTools() {
    // Hardcoded Data to fix loading issues
    tools = [
        {
            "id": "yt_thumb",
            "cat": "social",
            "url": "tools/video/thumb.html",
            "name": "صورة يوتيوب",
            "icon": "🖼️",
            "desc": "تحميل صور الفيديو",
            "inputs": [
                {
                    "n": "url",
                    "l": "رابط الفيديو",
                    "t": "text"
                }
            ]
        },
        {
            "id": "vid_aud",
            "cat": "video",
            "name": "فيديو إلى صوت",
            "icon": "🎵",
            "desc": "استخراج الصوت MP3",
            "inputs": [
                {
                    "n": "file",
                    "l": "الفيديو",
                    "t": "file"
                }
            ]
        },
        {
            "id": "vid_trim",
            "cat": "video",
            "name": "قص الفيديو",
            "icon": "✂️",
            "desc": "تحديد بداية ونهاية",
            "inputs": [
                {
                    "n": "file",
                    "l": "الفيديو",
                    "t": "file"
                },
                {
                    "n": "s",
                    "l": "من (ثانية)",
                    "t": "number"
                },
                {
                    "n": "e",
                    "l": "إلى (ثانية)",
                    "t": "number"
                }
            ]
        },
        {
            "id": "vid_mute",
            "cat": "video",
            "name": "كتم الصوت",
            "icon": "🔇",
            "desc": "إزالة الصوت من الفيديو",
            "inputs": [
                {
                    "n": "file",
                    "l": "الفيديو",
                    "t": "file"
                }
            ]
        },
        {
            "id": "vid_info",
            "cat": "video",
            "name": "معلومات الفيديو",
            "icon": "ℹ️",
            "desc": "الحجم، الدقة، النوع",
            "inputs": [
                {
                    "n": "file",
                    "l": "الفيديو",
                    "t": "file"
                }
            ]
        },
        {
            "id": "vid_spd",
            "cat": "video",
            "name": "تغيير السرعة",
            "icon": "⏩",
            "desc": "تسريع/تبطي الفيديو",
            "inputs": [
                {
                    "n": "file",
                    "l": "الفيديو",
                    "t": "file"
                },
                {
                    "n": "spd",
                    "l": "السرعة (0.5 - 2)",
                    "t": "number",
                    "d": 2
                }
            ]
        },
        {
            "id": "vid_gif",
            "cat": "video",
            "name": "فيديو إلى GIF",
            "icon": "🎞️",
            "desc": "تحويل لقطة متحركة",
            "inputs": [
                {
                    "n": "file",
                    "l": "الفيديو",
                    "t": "file"
                }
            ]
        },
        {
            "id": "vid_pic",
            "cat": "video",
            "name": "لقطة شاشة",
            "icon": "📸",
            "desc": "أخذ صورة من الفيديو",
            "inputs": [
                {
                    "n": "file",
                    "l": "الفيديو",
                    "t": "file"
                },
                {
                    "n": "t",
                    "l": "عند الدقيقة",
                    "t": "number"
                }
            ]
        },
        {
            "id": "vid_rot",
            "cat": "video",
            "name": "تدوير الفيديو",
            "icon": "💫",
            "desc": "قلب الفيديو 90 درجة",
            "inputs": [
                {
                    "n": "file",
                    "l": "الفيديو",
                    "t": "file"
                }
            ]
        },
        {
            "id": "vid_mir",
            "cat": "video",
            "name": "عكس الاتجاه",
            "icon": "↔️",
            "desc": "Mirror Effect",
            "inputs": [
                {
                    "n": "file",
                    "l": "الفيديو",
                    "t": "file"
                }
            ]
        },
        {
            "id": "tts",
            "cat": "audio",
            "name": "نص إلى صوت",
            "icon": "🗣️",
            "desc": "قراءة النصوص (AI)",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                },
                {
                    "n": "lang",
                    "l": "اللغة",
                    "t": "select",
                    "o": [
                        "ar-SA",
                        "en-US"
                    ]
                }
            ]
        },
        {
            "id": "aud_rec",
            "cat": "audio",
            "name": "مسجل صوت",
            "icon": "🎙️",
            "desc": "تسجيل صوتي مباشر",
            "inputs": []
        },
        {
            "id": "aud_trim",
            "cat": "audio",
            "name": "قص الصوت",
            "icon": "✂️",
            "desc": "اقتصاص مقطع صوتي",
            "inputs": [
                {
                    "n": "file",
                    "l": "الصوت",
                    "t": "file"
                }
            ]
        },
        {
            "id": "aud_vol",
            "cat": "audio",
            "name": "رفع الصوت",
            "icon": "🔊",
            "desc": "تضخيم مستوى الصوت",
            "inputs": [
                {
                    "n": "file",
                    "l": "الصوت",
                    "t": "file"
                }
            ]
        },
        {
            "id": "aud_spd",
            "cat": "audio",
            "name": "سرعة الصوت",
            "icon": "⏩",
            "desc": "تغيير سرعة الملف",
            "inputs": [
                {
                    "n": "file",
                    "l": "الصوت",
                    "t": "file"
                }
            ]
        },
        {
            "id": "aud_rev",
            "cat": "audio",
            "name": "عكس الصوت",
            "icon": "🔙",
            "desc": "تشغيل بالمقلوب",
            "inputs": [
                {
                    "n": "file",
                    "l": "الصوت",
                    "t": "file"
                }
            ]
        },
        {
            "id": "aud_bpm",
            "cat": "audio",
            "name": "حاسبة النقر",
            "icon": "🥁",
            "desc": "BPM Tapper",
            "inputs": []
        },
        {
            "id": "aud_gen",
            "cat": "audio",
            "name": "مولد ذبذبات",
            "icon": "〰️",
            "desc": "توليد تردد (Hz)",
            "inputs": [
                {
                    "n": "hz",
                    "l": "التردد هرتز",
                    "t": "number",
                    "d": 440
                }
            ]
        },
        {
            "id": "aud_info",
            "cat": "audio",
            "name": "فحص ملف",
            "icon": "ℹ️",
            "desc": "معلومات الملف الصوتي",
            "inputs": [
                {
                    "n": "file",
                    "l": "الصوت",
                    "t": "file"
                }
            ]
        },
        {
            "id": "aud_conv",
            "cat": "audio",
            "name": "محول الصيغ",
            "icon": "🔄",
            "desc": "WAV/MP3 (Mock)",
            "inputs": [
                {
                    "n": "file",
                    "l": "الصوت",
                    "t": "file"
                }
            ]
        },
        {
            "id": "txt2pdf",
            "cat": "pdf",
            "name": "نص إلى PDF",
            "icon": "📄",
            "desc": "إنشاء ملف من نص",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "img2pdf",
            "cat": "pdf",
            "name": "صورة إلى PDF",
            "icon": "🖼️",
            "desc": "تحويل الصور لملف",
            "inputs": [
                {
                    "n": "img",
                    "l": "الصورة",
                    "t": "file"
                }
            ]
        },
        {
            "id": "pdf_mrg",
            "cat": "pdf",
            "name": "دمج PDF",
            "icon": "📑",
            "desc": "دمج ملفين معاً",
            "inputs": [
                {
                    "n": "f1",
                    "l": "ملف 1",
                    "t": "file"
                },
                {
                    "n": "f2",
                    "l": "ملف 2",
                    "t": "file"
                }
            ]
        },
        {
            "id": "pdf_spl",
            "cat": "pdf",
            "name": "تقسيم PDF",
            "icon": "✂️",
            "desc": "استخراج صفحة",
            "inputs": [
                {
                    "n": "f",
                    "l": "الملف",
                    "t": "file"
                },
                {
                    "n": "p",
                    "l": "رقم الصفحة",
                    "t": "number"
                }
            ]
        },
        {
            "id": "pdf_inf",
            "cat": "pdf",
            "name": "معلومات PDF",
            "icon": "ℹ️",
            "desc": "عدد الصفحات والمؤلف",
            "inputs": [
                {
                    "n": "f",
                    "l": "الملف",
                    "t": "file"
                }
            ]
        },
        {
            "id": "pdf_wat",
            "cat": "pdf",
            "name": "علامة مائية",
            "icon": "©️",
            "desc": "إضافة نص للصفحات",
            "inputs": [
                {
                    "n": "f",
                    "l": "الملف",
                    "t": "file"
                },
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "text"
                }
            ]
        },
        {
            "id": "pdf_rot",
            "cat": "pdf",
            "name": "تدوير PDF",
            "icon": "🔄",
            "desc": "تدوير كل الصفحات",
            "inputs": [
                {
                    "n": "f",
                    "l": "الملف",
                    "t": "file"
                }
            ]
        },
        {
            "id": "pdf_lock",
            "cat": "pdf",
            "name": "قفل PDF",
            "icon": "🔒",
            "desc": "إضافة كلمة سر",
            "inputs": [
                {
                    "n": "f",
                    "l": "الملف",
                    "t": "file"
                },
                {
                    "n": "p",
                    "l": "كلمة السر",
                    "t": "text"
                }
            ]
        },
        {
            "id": "pdf_meta",
            "cat": "pdf",
            "name": "تعديل الوصف",
            "icon": "📝",
            "desc": "تغيير العنوان/المؤلف",
            "inputs": [
                {
                    "n": "f",
                    "l": "الملف",
                    "t": "file"
                },
                {
                    "n": "t",
                    "l": "العنوان الجديد",
                    "t": "text"
                }
            ]
        },
        {
            "id": "pdf_clr",
            "cat": "pdf",
            "name": "حذف صفحات",
            "icon": "🗑️",
            "desc": "حذف صفحة محددة",
            "inputs": [
                {
                    "n": "f",
                    "l": "الملف",
                    "t": "file"
                },
                {
                    "n": "p",
                    "l": "رقم الصفحة",
                    "t": "number"
                }
            ]
        },
        {
            "id": "cnt",
            "cat": "student",
            "name": "عداد الكلمات",
            "icon": "📝",
            "desc": "Word & Char Counter",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "rev",
            "cat": "student",
            "name": "عكس النص",
            "icon": "🔄",
            "desc": "Text Reverser",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "bin",
            "cat": "student",
            "name": "تحويل ثنائي",
            "icon": "🔢",
            "desc": "Binary Encoder",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "rep",
            "cat": "student",
            "name": "مكرر النصوص",
            "icon": "🔁",
            "desc": "Text Repeater",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                },
                {
                    "n": "cnt",
                    "l": "عدد المرات",
                    "t": "number",
                    "d": 10
                }
            ]
        },
        {
            "id": "slug",
            "cat": "student",
            "name": "مولد الروابط",
            "icon": "🔗",
            "desc": "Slug Generator",
            "inputs": [
                {
                    "n": "txt",
                    "l": "العنوان",
                    "t": "text"
                }
            ]
        },
        {
            "id": "cln",
            "cat": "student",
            "name": "منظف النصوص",
            "icon": "🧹",
            "desc": "Remove extra spaces",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "eml",
            "cat": "student",
            "name": "استخراج الإيميلات",
            "icon": "📧",
            "desc": "Extract emails from text",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "url",
            "cat": "student",
            "name": "استخراج الروابط",
            "icon": "🔗",
            "desc": "Extract URLs from text",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "num",
            "cat": "student",
            "name": "استخراج الأرقام",
            "icon": "🔢",
            "desc": "Extract numbers from text",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "wpm",
            "cat": "student",
            "name": "وقت القراءة",
            "icon": "⏱️",
            "desc": "Estimated reading time",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "remdup",
            "cat": "student",
            "name": "حذف التكرار",
            "icon": "🚫",
            "desc": "Remove duplicate lines",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "txt_sort",
            "cat": "student",
            "name": "ترتيب الأسطر",
            "icon": "📉",
            "desc": "Sort lines alphabetically",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "txt_shuf",
            "cat": "student",
            "name": "بعثرة الأسطر",
            "icon": "🎲",
            "desc": "Shuffle lines",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "c_len",
            "cat": "conv",
            "name": "محول الطول",
            "url": "tools/conv/length.html",
            "icon": "📏",
            "desc": "M, KM, CM, MM, Inch, Ft",
            "inputs": [
                {
                    "n": "v",
                    "l": "القيمة بالمتر",
                    "t": "number"
                }
            ]
        },
        {
            "id": "c_wgt",
            "cat": "conv",
            "name": "محول الوزن",
            "url": "tools/conv/weight.html",
            "icon": "⚖️",
            "desc": "KG, G, LBS, OZ",
            "inputs": [
                {
                    "n": "v",
                    "l": "القيمة بالكيلو",
                    "t": "number"
                }
            ]
        },
        {
            "id": "c_tmp",
            "cat": "conv",
            "name": "محول الحرارة",
            "icon": "🌡️",
            "desc": "C, F, K",
            "inputs": [
                {
                    "n": "v",
                    "l": "الدرجة (C)",
                    "t": "number"
                }
            ]
        },
        {
            "id": "c_spd",
            "cat": "conv",
            "name": "محول السرعة",
            "url": "tools/conv/speed.html",
            "icon": "🚗",
            "desc": "KPH, MPH, M/S",
            "inputs": [
                {
                    "n": "v",
                    "l": "السرعة (Km/h)",
                    "t": "number"
                }
            ]
        },
        {
            "id": "c_tim",
            "cat": "conv",
            "name": "محول الزمن",
            "icon": "⏰",
            "desc": "Sec, Min, Hour, Day",
            "inputs": [
                {
                    "n": "v",
                    "l": "الدقائق",
                    "t": "number"
                }
            ]
        },
        {
            "id": "c_dig",
            "cat": "conv",
            "name": "محول التخزين",
            "icon": "💾",
            "desc": "B, KB, MB, GB, TB",
            "inputs": [
                {
                    "n": "v",
                    "l": "الحجم (MB)",
                    "t": "number"
                }
            ]
        },
        {
            "id": "c_cur",
            "cat": "conv",
            "name": "محول العملات",
            "url": "tools/conv/currency.html",
            "icon": "💵",
            "desc": "USD, EUR, SAR (Static)",
            "inputs": [
                {
                    "n": "v",
                    "l": "الدولار ($)",
                    "t": "number"
                }
            ]
        },
        {
            "id": "c_are",
            "cat": "conv",
            "name": "محول المساحة",
            "icon": "⬛",
            "desc": "M2, KM2, Acre",
            "inputs": [
                {
                    "n": "v",
                    "l": "المتر المربع",
                    "t": "number"
                }
            ]
        },
        {
            "id": "c_prs",
            "cat": "conv",
            "name": "محول الضغط",
            "icon": "🔧",
            "desc": "Bar, PSI, Pascal",
            "inputs": [
                {
                    "n": "v",
                    "l": "البار (Bar)",
                    "t": "number"
                }
            ]
        },
        {
            "id": "c_pow",
            "cat": "conv",
            "name": "محول الطاقة",
            "icon": "⚡",
            "desc": "Watt, KW, HP",
            "inputs": [
                {
                    "n": "v",
                    "l": "الوات (Watt)",
                    "t": "number"
                }
            ]
        },
        {
            "id": "d_bold",
            "cat": "decor",
            "name": "خط عريض",
            "icon": "𝐁",
            "desc": "Bold Text Generator",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص (English)",
                    "t": "text"
                }
            ]
        },
        {
            "id": "d_ital",
            "cat": "decor",
            "name": "خط مائل",
            "icon": "𝐼",
            "desc": "Italic Text",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص (English)",
                    "t": "text"
                }
            ]
        },
        {
            "id": "d_bub",
            "cat": "decor",
            "name": "دوائر",
            "icon": "Ⓞ",
            "desc": "Bubble Text",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص (English)",
                    "t": "text"
                }
            ]
        },
        {
            "id": "d_sqr",
            "cat": "decor",
            "name": "مربعات",
            "icon": "🅂",
            "desc": "Square Text",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص (English)",
                    "t": "text"
                }
            ]
        },
        {
            "id": "d_cur",
            "cat": "decor",
            "name": "مشخبط",
            "icon": "𝒞",
            "desc": "Cursive Text",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص (English)",
                    "t": "text"
                }
            ]
        },
        {
            "id": "d_uln",
            "cat": "decor",
            "name": "تحته خط",
            "icon": "U̲",
            "desc": "Underline Text",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص (English)",
                    "t": "text"
                }
            ]
        },
        {
            "id": "d_str",
            "cat": "decor",
            "name": "مشطوب",
            "icon": "S̶",
            "desc": "Strikethrough",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص (English)",
                    "t": "text"
                }
            ]
        },
        {
            "id": "d_inv",
            "cat": "decor",
            "name": "مقلوب",
            "icon": "🙃",
            "desc": "Upside Down",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص (English)",
                    "t": "text"
                }
            ]
        },
        {
            "id": "d_mor",
            "cat": "decor",
            "name": "شفرة مورس",
            "icon": "📡",
            "desc": "تشفير مورس",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص (English)",
                    "t": "text"
                }
            ]
        },
        {
            "id": "d_emo",
            "cat": "decor",
            "name": "إيموجي",
            "icon": "😀",
            "desc": "نص إلى إيموجي",
            "inputs": [
                {
                    "n": "txt",
                    "l": "النص",
                    "t": "text"
                }
            ]
        },
        {
            "id": "age",
            "cat": "math",
            "name": "حاسبة العمر",
            "icon": "🎂",
            "desc": "احسب عمرك",
            "inputs": [
                {
                    "n": "bd",
                    "l": "الميلاد",
                    "t": "date"
                }
            ]
        },
        {
            "id": "bmi",
            "cat": "math",
            "name": "كتلة الجسم",
            "url": "tools/math/bmi.html",
            "icon": "⚖️",
            "desc": "BMI Calculator",
            "inputs": [
                {
                    "n": "w",
                    "l": "الوزن",
                    "t": "number"
                },
                {
                    "n": "h",
                    "l": "الطول سم",
                    "t": "number"
                }
            ]
        },
        {
            "id": "loan",
            "cat": "math",
            "url": "tools/math/loan.html",
            "name": "القسط الشهري",
            "icon": "🏦",
            "desc": "حساب القروض",
            "inputs": [
                {
                    "n": "a",
                    "l": "المبلغ",
                    "t": "number"
                },
                {
                    "n": "m",
                    "l": "الأشهر",
                    "t": "number"
                }
            ]
        },
        {
            "id": "vat",
            "cat": "math",
            "name": "ضريبة القيمة (VAT)",
            "icon": "💰",
            "desc": "حساب 15%",
            "inputs": [
                {
                    "n": "v",
                    "l": "المبلغ",
                    "t": "number"
                }
            ]
        },
        {
            "id": "disc",
            "cat": "math",
            "url": "tools/math/discount.html",
            "name": "حاسبة الخصم",
            "icon": "🏷️",
            "desc": "حساب السعر بعد الخصم",
            "inputs": [
                {
                    "n": "p",
                    "l": "السعر",
                    "t": "number"
                },
                {
                    "n": "d",
                    "l": "الخصم %",
                    "t": "number"
                }
            ]
        },
        {
            "id": "pct",
            "cat": "math",
            "name": "حساب النسبة",
            "icon": "٪",
            "desc": "حساب نسبة مئوية",
            "inputs": [
                {
                    "n": "p",
                    "l": "الجزء",
                    "t": "number"
                },
                {
                    "n": "v",
                    "l": "الكل",
                    "t": "number"
                }
            ]
        },
        {
            "id": "zak",
            "cat": "math",
            "url": "tools/math/zakat.html",
            "name": "حاسبة الزكاة",
            "icon": "🕌",
            "desc": "ربع العشر (2.5%)",
            "inputs": [
                {
                    "n": "v",
                    "l": "المبلغ المدخر",
                    "t": "number"
                }
            ]
        },
        {
            "id": "gpa",
            "cat": "math",
            "name": "المعدل التراكمي",
            "icon": "🎓",
            "desc": "GPA Calculator",
            "inputs": [
                {
                    "n": "g",
                    "l": "درجات المواد",
                    "t": "text"
                }
            ]
        },
        {
            "id": "sal",
            "cat": "math",
            "name": "حاسبة الراتب",
            "icon": "💸",
            "desc": "راتب الساعة",
            "inputs": [
                {
                    "n": "s",
                    "l": "الراتب الشهري",
                    "t": "number"
                }
            ]
        },
        {
            "id": "rnd",
            "cat": "math",
            "name": "رقم عشوائي",
            "icon": "🎲",
            "desc": "Random Number",
            "inputs": [
                {
                    "n": "m",
                    "l": "الحد الأقصى",
                    "t": "number"
                }
            ]
        },
        {
            "id": "rps",
            "cat": "game",
            "name": "حجرة ورقة مقص",
            "url": "tools/game/rps.html",
            "icon": "✂️",
            "desc": "لعبة كلاسيكية",
            "inputs": []
        },
        {
            "id": "dice",
            "cat": "game",
            "name": "رمي النرد",
            "url": "tools/game/dice.html",
            "icon": "🎲",
            "desc": "رقم من 1-6",
            "inputs": []
        },
        {
            "id": "coin",
            "cat": "game",
            "name": "قرعة عملة",
            "icon": "🪙",
            "desc": "وجه أو قفا",
            "inputs": []
        },
        {
            "id": "guess",
            "cat": "game",
            "name": "تخمين الرقم",
            "url": "tools/game/guess.html",
            "icon": "❓",
            "desc": "من 1 إلى 10",
            "inputs": [
                {
                    "n": "v",
                    "l": "توقعك",
                    "t": "number"
                }
            ]
        },
        {
            "id": "love",
            "cat": "game",
            "name": "مقياس الحب",
            "url": "tools/game/love.html",
            "icon": "❤️",
            "desc": "للتسلية فقط",
            "inputs": [
                {
                    "n": "n1",
                    "l": "الاسم الأول",
                    "t": "text"
                },
                {
                    "n": "n2",
                    "l": "الاسم الثاني",
                    "t": "text"
                }
            ]
        },
        {
            "id": "joke",
            "cat": "game",
            "name": "نكتة عشوائية",
            "icon": "😂",
            "desc": "اضحك من قلبك",
            "inputs": []
        },
        {
            "id": "xo",
            "cat": "game",
            "name": "لعبة X-O",
            "icon": "❌",
            "desc": "Tic Tac Toe",
            "inputs": []
        },
        {
            "id": "ig_prof",
            "cat": "social",
            "name": "بروفايل انستقرام",
            "icon": "📸",
            "desc": "تحميل صورة البروفايل",
            "inputs": [
                {
                    "n": "user",
                    "l": "اسم المستخدم",
                    "t": "text"
                }
            ]
        },
        {
            "id": "fact",
            "cat": "game",
            "name": "هل تعلم؟",
            "icon": "💡",
            "desc": "معلومة عشوائية",
            "inputs": []
        },
        {
            "id": "quote",
            "cat": "game",
            "name": "اقتباس",
            "icon": "📜",
            "desc": "حكمة",
            "inputs": []
        },
        {
            "id": "pass",
            "cat": "game",
            "name": "فحص الباسوورد",
            "icon": "🔐",
            "desc": "اختبار قوة",
            "inputs": [
                {
                    "n": "p",
                    "l": "كلمة السر",
                    "t": "text"
                }
            ]
        },
        {
            "id": "react",
            "cat": "game",
            "name": "سرعة البديهة",
            "icon": "⚡",
            "desc": "قريباً",
            "inputs": []
        },
        {
            "id": "json",
            "cat": "dev",
            "name": "JSON Formatter",
            "desc": "Beautify/Minify",
            "url": "tools/dev/json.html",
            "icon": "{}"
        },
        {
            "id": "b64",
            "cat": "dev",
            "name": "Base64 Text",
            "desc": "Encode/Decode",
            "url": "tools/dev/base64.html",
            "icon": "64"
        },
        {
            "id": "urlenc",
            "cat": "dev",
            "name": "URL Encoder",
            "desc": "Escape Chars",
            "url": "tools/dev/url.html",
            "icon": "🔗"
        },
        {
            "id": "rgb",
            "cat": "dev",
            "name": "Color Convert",
            "desc": "HEX <-> RGB",
            "url": "tools/dev/color.html",
            "icon": "🎨"
        },
        {
            "id": "css_grad",
            "cat": "css",
            "name": "Gradient Gen",
            "icon": "🌈",
            "desc": "مولد تدرج ألوان",
            "inputs": []
        },
        {
            "id": "css_box",
            "cat": "css",
            "name": "Box Shadow",
            "icon": "📦",
            "desc": "ظل الصندوق",
            "inputs": []
        },
        {
            "id": "css_txt",
            "cat": "css",
            "name": "Text Shadow",
            "icon": "🅰️",
            "desc": "ظل النص",
            "inputs": []
        },
        {
            "id": "css_bor",
            "cat": "css",
            "name": "Border Radius",
            "icon": "⭕",
            "desc": "حواف دائرية",
            "inputs": []
        },
        {
            "id": "css_flx",
            "cat": "css",
            "name": "Flexbox",
            "icon": "📐",
            "desc": "مساعد فليكس",
            "inputs": []
        },
        {
            "id": "css_grid",
            "cat": "css",
            "name": "Grid Gen",
            "icon": "▦",
            "desc": "مولد تخطيط",
            "inputs": []
        },
        {
            "id": "css_filt",
            "cat": "css",
            "name": "CSS Filters",
            "icon": "🎨",
            "desc": "فلاتر الصور",
            "inputs": []
        },
        {
            "id": "css_anim",
            "cat": "css",
            "name": "Animations",
            "icon": "🎬",
            "desc": "مكتبة أنيميشن",
            "inputs": []
        },
        {
            "id": "css_clip",
            "cat": "css",
            "name": "Clip Path",
            "icon": "✂️",
            "desc": "قص الأشكال",
            "inputs": []
        },
        {
            "id": "css_min",
            "cat": "css",
            "name": "Minifier",
            "icon": "📉",
            "desc": "ضغط كود CSS",
            "inputs": [
                {
                    "n": "c",
                    "l": "Code",
                    "t": "textarea"
                }
            ]
        },
        {
            "id": "img_res",
            "cat": "image",
            "name": "تغيير الحجم",
            "icon": "📏",
            "desc": "Resize Image",
            "inputs": [
                {
                    "n": "img",
                    "t": "file"
                },
                {
                    "n": "w",
                    "l": "Width",
                    "t": "number"
                }
            ]
        },
        {
            "id": "img_crop",
            "cat": "image",
            "name": "قص الصورة",
            "icon": "✂️",
            "desc": "Crop Image",
            "inputs": [
                {
                    "n": "img",
                    "t": "file"
                }
            ]
        },
        {
            "id": "img_comp",
            "cat": "image",
            "name": "ضغط الصورة",
            "icon": "🗜️",
            "desc": "Compress JPG/PNG",
            "inputs": [
                {
                    "n": "img",
                    "t": "file"
                }
            ]
        },
        {
            "id": "img_conv",
            "cat": "image",
            "name": "تحويل الصيغة",
            "icon": "🔄",
            "desc": "To PNG/JPG/WEBP",
            "inputs": [
                {
                    "n": "img",
                    "t": "file"
                }
            ]
        },
        {
            "id": "img_filt",
            "cat": "image",
            "name": "فلاتر وتأثيرات",
            "icon": "🎨",
            "desc": "Grayscale, Blur...",
            "inputs": [
                {
                    "n": "img",
                    "t": "file"
                },
                {
                    "n": "f",
                    "l": "فلتر",
                    "t": "select",
                    "o": [
                        "gray",
                        "sepia",
                        "inv"
                    ]
                }
            ]
        },
        {
            "id": "img_col",
            "cat": "image",
            "name": "استخراج ألوان",
            "icon": "💊",
            "desc": "Color Picker",
            "inputs": [
                {
                    "n": "img",
                    "t": "file"
                }
            ]
        },
        {
            "id": "img_b64",
            "cat": "image",
            "name": "صورة إلى Base64",
            "icon": "📄",
            "desc": "تحويل لنص",
            "inputs": [
                {
                    "n": "img",
                    "t": "file"
                }
            ]
        },
        {
            "id": "img_rot",
            "cat": "image",
            "name": "تدوير/قلب",
            "icon": "🔄",
            "desc": "Rotate & Flip",
            "inputs": [
                {
                    "n": "img",
                    "t": "file"
                }
            ]
        },
        {
            "id": "img_bg",
            "cat": "image",
            "name": "حذف الخلفية",
            "icon": "🎭",
            "desc": "AI Remove BG",
            "inputs": [
                {
                    "n": "img",
                    "t": "file"
                }
            ]
        },
        {
            "id": "img_wat",
            "cat": "image",
            "name": "علامة مائية",
            "icon": "©️",
            "desc": "Watermark",
            "inputs": [
                {
                    "n": "img",
                    "t": "file"
                }
            ]
        },
        {
            "id": "misc_pass",
            "cat": "misc",
            "name": "مـولد باسوورد",
            "url": "tools/misc/pass.html",
            "icon": "🔐",
            "desc": "كلمات سر قوية",
            "inputs": [
                {
                    "n": "l",
                    "l": "الطول",
                    "t": "number",
                    "d": 16
                }
            ]
        },
        {
            "id": "misc_uuid",
            "cat": "misc",
            "name": "UUID Generator",
            "url": "tools/misc/uuid.html",
            "icon": "🆔",
            "desc": "v4 IDs",
            "inputs": []
        },
        {
            "id": "misc_qr",
            "cat": "misc",
            "name": "QR Code",
            "url": "tools/misc/qr.html",
            "icon": "📱",
            "desc": "إنشاء باركود",
            "inputs": [
                {
                    "n": "t",
                    "l": "النص/الرابط",
                    "t": "text"
                }
            ]
        },
        {
            "id": "misc_ip",
            "cat": "misc",
            "name": "عنوان IP",
            "url": "tools/misc/ip.html",
            "icon": "🌐",
            "desc": "My IP Checker",
            "inputs": []
        },
        {
            "id": "misc_ua",
            "cat": "misc",
            "name": "معلومات المتصفح",
            "icon": "💻",
            "desc": "User Agent Info",
            "inputs": []
        },
        {
            "id": "misc_stop",
            "cat": "misc",
            "name": "ساعة إيقاف",
            "url": "tools/misc/stopwatch.html",
            "icon": "⏱️",
            "desc": "Stopwatch",
            "inputs": []
        },
        {
            "id": "misc_time",
            "cat": "misc",
            "name": "الساعة الآن",
            "icon": "🕰️",
            "desc": "الوقت الحالي",
            "inputs": []
        },
        {
            "id": "misc_date",
            "cat": "misc",
            "name": "فرق التاريخ",
            "icon": "📅",
            "desc": "حساب الأيام",
            "inputs": [
                {
                    "n": "d1",
                    "l": "من",
                    "t": "date"
                },
                {
                    "n": "d2",
                    "l": "إلى",
                    "t": "date"
                }
            ]
        },
        {
            "id": "misc_count",
            "cat": "misc",
            "name": "مؤقت تنازلي",
            "icon": "⏳",
            "desc": "Countdown",
            "inputs": [
                {
                    "n": "m",
                    "l": "دقيقة",
                    "t": "number"
                }
            ]
        },
        {
            "id": "misc_lorem",
            "cat": "misc",
            "name": "نص تلقائي",
            "icon": "📝",
            "desc": "Lorem Ipsum",
            "inputs": [
                {
                    "n": "n",
                    "l": "فقرات",
                    "t": "number"
                }
            ]
        }
    ];

    window.contentDB = {
        "jokes": [
            "مرة واحد حب يطور نفسه، لقى التحديث بفلوس 😂",
            "ليش السمك يخاف من التكنولوجيا؟ عشان الشبكة 🕸️",
            "طالب نام في المحاضرة، حلم أنه يجاوب، صحي لقى نفسه يصفق 👏",
            "ليه الكمبيوتر راح للدكتور؟ عشان عنده فيروس 🦠",
            "مرة قمر مات، دفنوه في الهلال 🌙",
            "واحد بنى قصر في الهواء، طاح عليه 🏗️",
            "ليش القطارات مهمة؟ لأن تحتها خطين 🚂",
            "مرة مدرس رياضة أغمى عليه، جابوله كورة فاق ⚽",
            "واحد بلع فوطة، نشف ريقه 🧖",
            "نملة تزوجت فيل، مات الفيل، فضلت طول عمرها تدفن فيه 🐜",
            "ليه الصعيدي بياكل بملعقة طويلة؟ علشان يشوف الأكل بوضوح 🥄",
            "واحد بخيل اشترى آلة حاسبة، شال منها الصفر علشان يوفر 📟",
            "مرة واحد خلف 7 عيال، سمى نفسه سفن أب 🥤",
            "واحد غبي شاف يافطة مكتوب عليها ممنوع الوقوف، انبطح 🛑",
            "ليه الناموسة مبتذاكرش؟ عشان بتطير من كتاب لكتاب 🦟"
        ],
        "facts": [
            "العسل هو الطعام الوحيد الذي لا يفسد.",
            "قلب الروبيان يقع في رأسه.",
            "الأخطبوط له 3 قلوب.",
            "الفضاء صامت تماماً.",
            "عين النعامة أكبر من دماغها.",
            "التفاح يوقظك أكثر من القهوة.",
            "الكرسي الكهربائي اخترعه طبيب أسنان 🦷",
            "الماء الساخن يتجمد أسرع من الماء البارد.",
            "لا يمكنك دغدغة نفسك.",
            "القطط تقضي 70% من حياتها نائمة.",
            "حاسة التذوق عند الفراشة في أقدامها.",
            "ذاكرة السمكة الذهبية تدوم لثلاث ثوانٍ فقط.",
            "كوكب الزهرة هو الكوكب الوحيد الذي يدور في اتجاه عقارب الساعة.",
            "عدد النجوم في الكون أكثر من حبات الرمل على الأرض.",
            "الزرافة ليس لها أحبال صوتية."
        ],
        "quotes": [
            "لا تؤجل عمل اليوم إلى الغد.",
            "الوقت كالسيف إن لم تقطعه قطعك.",
            "العلم نور والجهل ظلام.",
            "كن صبوراً فالدروس تأتي مع الوقت.",
            "القناعة كنز لا يفنى.",
            "من جد وجد ومن زرع حصد.",
            "عامل الناس كما تحب أن يعاملوك.",
            "الابتسامة هي مفتاح القلوب.",
            "لا يأس مع الحياة ولا حياة مع اليأس.",
            "اطلب العلم من المهد إلى اللحد.",
            "من سار على الدرب وصل.",
            "الناجح لا يشتكي من الظروف.",
            "الثقة بالنفس أول خطوات النجاح.",
            "أفضل وقت لزراعة شجرة كان أمس، وأفضل وقت ثاني هو اليوم.",
            "الأفعال أبلغ من الأقوال."
        ]
    };
}

// --- Global Worker Response Handler ---
worker.onmessage = function (e) {
    const { id, result, type } = e.data;
    const out = document.getElementById('mOutVal');
    const box = document.getElementById('mOutBox');

    if (!out || !box) return;

    if (type === 'pdf') {
        const blob = new Blob([result], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        out.innerHTML = `<iframe src="${url}" style="width:100%;height:500px;border:none;border-radius:12px;box-shadow:var(--shadow-lg);"></iframe><br><a href="${url}" download="document.pdf" class="run-btn" style="display:inline-block;margin-top:20px;width:auto;padding:12px 24px;">📥 تحميل PDF</a>`;
    } else if (result instanceof ImageBitmap) {
        const cvs = document.createElement('canvas');
        cvs.width = result.width;
        cvs.height = result.height;
        const ctx = cvs.getContext('2d');
        ctx.drawImage(result, 0, 0);
        out.innerHTML = '';
        out.appendChild(cvs);
        const downloadLink = document.createElement('a');
        downloadLink.href = cvs.toDataURL('image/png');
        downloadLink.download = 'processed_image.png';
        downloadLink.className = 'run-btn';
        downloadLink.style.cssText = 'display:inline-block;margin-top:20px;width:auto;padding:12px 24px;';
        downloadLink.innerText = '📥 تحميل الصورة';
        out.appendChild(document.createElement('br'));
        out.appendChild(downloadLink);
    } else {
        out.innerText = result;
    }
    box.style.display = 'block';
};

const engine = {
    // --- Video ---
    'yt_thumb': async (d) => {
        const idMatch = d.url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (!idMatch || !idMatch[1]) return '<div style="color:red;font-weight:bold">❌ Invalid Link</div>';
        const vid = idMatch[1];
        const qualities = [
            { name: 'Max HD', key: 'maxresdefault.jpg' },
            { name: 'High', key: 'sddefault.jpg' },
            { name: 'Medium', key: 'hqdefault.jpg' }
        ];
        let html = `<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(150px, 1fr));gap:15px;margin-top:15px;">`;
        for (const q of qualities) {
            const imgUrl = `https://img.youtube.com/vi/${vid}/${q.key}`;
            html += `<div style="background:var(--bg-card);padding:10px;border-radius:12px;border:1px solid var(--glass-border);text-align:center">
                <img src="${imgUrl}" style="width:100%;border-radius:8px;margin-bottom:8px">
                <div style="font-weight:bold;margin-bottom:5px;">${q.name}</div>
                <a href="${imgUrl}" target="_blank" download="thumb.jpg" class="pro-btn" style="padding:5px 10px;font-size:0.8rem">📥 Download</a>
            </div>`;
        }
        return html + `</div>`;
    },
    'vid_info': (d) => {
        return new Promise(resolve => {
            const v = document.createElement('video');
            v.src = URL.createObjectURL(d.file);
            v.onloadedmetadata = () => {
                resolve(`
                    <div style="text-align:left; font-family:monospace; padding:15px; background:rgba(0,0,0,0.2); border-radius:12px;">
                        <b>File:</b> ${d.file.name}<br>
                        <b>Size:</b> ${(d.file.size / 1024 / 1024).toFixed(2)} MB<br>
                        <b>Type:</b> ${d.file.type}<br>
                        <b>Resolution:</b> ${v.videoWidth}x${v.videoHeight}<br>
                        <b>Duration:</b> ${v.duration.toFixed(2)}s
                    </div>
                `);
            };
        });
    },
    'aud_info': (d) => {
        return new Promise(resolve => {
            const a = new Audio();
            a.src = URL.createObjectURL(d.file);
            a.onloadedmetadata = () => {
                resolve(`
                    <div style="text-align:left; font-family:monospace; padding:15px; background:rgba(0,0,0,0.2); border-radius:12px;">
                        <b>File:</b> ${d.file.name}<br>
                        <b>Size:</b> ${(d.file.size / 1024 / 1024).toFixed(2)} MB<br>
                        <b>Type:</b> ${d.file.type}<br>
                        <b>Duration:</b> ${a.duration.toFixed(2)}s
                    </div>
                `);
            };
        });
    },
    'vid_pic': (d) => {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(d.file);
            video.onloadedmetadata = () => {
                video.currentTime = Math.min(d.t || 1, video.duration);
                video.onseeked = () => {
                    const cvs = document.createElement('canvas');
                    cvs.width = video.videoWidth; cvs.height = video.videoHeight;
                    cvs.getContext('2d').drawImage(video, 0, 0);
                    const res = cvs.toDataURL('image/jpeg');
                    resolve(`<img src="${res}" style="max-width:100%"><br><a href="${res}" download="frame.jpg" class="pro-btn">📥 Download Frame</a>`);
                };
            };
        });
    },
    'vid_aud': () => "⚠️ Audio extraction requires server-side processing (FFmpeg).",
    'vid_trim': () => "✂️ Video trimming requires server-side processing.",
    'vid_mute': () => "🔇 Muting video requires server-side processing.",
    'vid_spd': () => "⏩ Speed change requires advanced video player.",
    'vid_gif': () => "🎞️ GIF conversion requires high processing resources.",
    'vid_rot': () => "💫 Rotation available in image editing after capture.",
    'vid_mir': () => "↔️ Mirroring available in image editing.",

    // --- Audio ---
    'tts': (d) => {
        if (!window.speechSynthesis) return 'Not Supported';
        const u = new SpeechSynthesisUtterance(d.txt);
        u.lang = d.lang || 'ar-SA';
        speechSynthesis.speak(u);
        return '🔊 Playing...';
    },
    'aud_rec': () => {
        if (window.isRecording) {
            window.stopRecording();
            window.isRecording = false;
            return "Stopped.";
        } else {
            window.startRecording();
            window.isRecording = true;
            return "🔴 Recording...";
        }
    },
    'aud_bpm': () => {
        window.bpmTaps = window.bpmTaps || [];
        const now = Date.now();
        window.bpmTaps.push(now);
        if (window.bpmTaps.length > 8) window.bpmTaps.shift();

        let bpm = 0;
        if (window.bpmTaps.length > 1) {
            const diffs = [];
            for (let i = 1; i < window.bpmTaps.length; i++) {
                diffs.push(window.bpmTaps[i] - window.bpmTaps[i - 1]);
            }
            const avg = diffs.reduce((a, b) => a + b) / diffs.length;
            bpm = Math.round(60000 / avg);
        }

        return `
            <div style="text-align:center; padding:30px;">
                <div style="font-size:64px; font-weight:800; color:var(--primary); margin-bottom:20px;">${bpm || '--'}</div>
                <div style="font-size:18px; margin-bottom:30px; opacity:0.7;">BPM (Beats Per Minute)</div>
                <button class="run-btn" style="width:200px; height:200px; border-radius:50%; font-size:24px;" 
                    onclick="event.stopPropagation(); document.getElementById('mOutVal').innerHTML = engine.aud_bpm()">TAP</button>
            </div>
        `;
    },
    'aud_gen': (d) => { window.playTone(d.hz, 3); return `🔊 Tone ${d.hz}Hz (3s)`; },
    'aud_rev': () => "🔙 Reversing audio requires heavy processing.",

    // --- Image Tools (Client Side Canvas) ---
    'img_res': (d) => processImage(d.img, (ctx, cvs, img) => {
        const scale = d.w / img.width;
        cvs.width = d.w;
        cvs.height = img.height * scale;
        ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
        return cvs.toDataURL('image/jpeg', 0.9);
    }),
    'img_crop': (d) => processImage(d.img, (ctx, cvs, img) => {
        const size = Math.min(img.width, img.height);
        cvs.width = size;
        cvs.height = size;
        ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);
        return cvs.toDataURL('image/jpeg', 1.0);
    }),
    'img_comp': (d) => processImage(d.img, (ctx, cvs, img) => {
        cvs.width = img.width;
        cvs.height = img.height;
        ctx.drawImage(img, 0, 0);
        return cvs.toDataURL('image/jpeg', 0.5);
    }),
    'img_conv': (d) => processImage(d.img, (ctx, cvs, img) => {
        cvs.width = img.width;
        cvs.height = img.height;
        ctx.drawImage(img, 0, 0);
        return cvs.toDataURL('image/png');
    }),
    'img_filt': (d) => processImage(d.img, (ctx, cvs, img) => {
        cvs.width = img.width;
        cvs.height = img.height;
        if (d.f === 'gray') ctx.filter = 'grayscale(100%)';
        else if (d.f === 'sepia') ctx.filter = 'sepia(100%)';
        else if (d.f === 'inv') ctx.filter = 'invert(100%)';
        ctx.drawImage(img, 0, 0);
        return cvs.toDataURL('image/jpeg');
    }),
    'img_col': (d) => processImage(d.img, (ctx, cvs, img) => {
        cvs.width = 1; cvs.height = 1;
        ctx.drawImage(img, 0, 0, 1, 1);
        const p = ctx.getImageData(0, 0, 1, 1).data;
        const hex = "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1);
        return `<div style="background:${hex};width:100px;height:100px;border-radius:10px;margin:10px auto"></div>Color: <b style="font-size:1.5rem">${hex}</b>`;
    }),
    'img_rot': (d) => processImage(d.img, (ctx, cvs, img) => {
        cvs.width = img.height;
        cvs.height = img.width;
        ctx.translate(cvs.width / 2, cvs.height / 2);
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        return cvs.toDataURL('image/jpeg');
    }),
    'img_bg': () => "🎭 Background removal needs AI Server (Remove.bg API).",
    'img_wat': (d) => processImage(d.img, (ctx, cvs, img) => {
        cvs.width = img.width;
        cvs.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.font = 'bold 30px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'center';
        ctx.fillText('NextGear', cvs.width / 2, cvs.height / 2);
        return cvs.toDataURL('image/jpeg');
    }),
    'img_b64': (d) => {
        return new Promise((resolve) => {
            const r = new FileReader();
            r.onload = (e) => resolve(`<textarea rows="8" style="width:100%;background:#000;color:#0f0;">${e.target.result}</textarea>`);
            r.readAsDataURL(d.img);
        });
    },

    // --- Misc ---
    'misc_pass': (d) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let pass = '';
        for (let i = 0; i < (d.l || 16); i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
        return pass;
    },
    'misc_uuid': () => crypto.randomUUID(),
    'misc_qr': (d) => `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(d.t)}" style="border:10px solid white;border-radius:12px;">`,
    'misc_ip': async () => {
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            return `📍 Your Public IP: <span style="color:var(--primary); font-family:monospace; font-size:1.5rem;">${data.ip}</span>`;
        } catch (e) { return "❌ Could not fetch IP"; }
    },
    'misc_ua': () => `<div style="padding:20px; background:rgba(0,0,0,0.2); border-radius:12px; font-family:monospace; font-size:13px; line-height:1.6;">${navigator.userAgent}</div>`,
    'misc_stop': () => {
        setTimeout(() => window.toggleStopwatch(), 10);
        return `<div id="stopwatch" style="font-size:4rem; font-weight:800; color:var(--primary); margin:20px 0;">00:00.00</div>
                <div style="display:flex; justify-content:center; gap:10px;">
                    <button onclick="window.resetStopwatch()" class="back-btn">Reset</button>
                </div>`;
    },
    'c_cur': (d) => {
        const rates = { SAR: 3.75, EUR: 0.92, EGP: 48.5, KWD: 0.31 };
        let html = `<div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-top:20px;">`;
        for (const [code, rate] of Object.entries(rates)) {
            html += `<div style="padding:15px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:12px; text-align:center;">
                        <div style="color:var(--text-muted); font-size:12px;">${code}</div>
                        <div style="font-size:20px; font-weight:700;">${(d.v * rate).toFixed(2)}</div>
                    </div>`;
        }
        return html + `</div>`;
    },
    'c_spd': (d) => {
        const mph = (d.v * 0.621).toFixed(1);
        const ms = (d.v / 3.6).toFixed(1);
        const knot = (d.v / 1.852).toFixed(1);
        return `<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div class="stat-box"><b>MPH</b><br>${mph}</div>
                    <div class="stat-box"><b>M/S</b><br>${ms}</div>
                    <div class="stat-box"><b>Knot</b><br>${knot}</div>
                </div>`;
    },
    // PDF worker-handled tools should return nothing or a message that triggers the UI
    'pdf_wat': (d) => { worker.postMessage({ id: 'pdf_wat', data: d }); return '⏳ Adding Watermark...'; },
    'pdf_rot': (d) => { worker.postMessage({ id: 'pdf_rot', data: d }); return '⏳ Rotating Pages...'; },
    'c_tim': (d) => `Sec: ${d.v * 60} | Hr: ${(d.v / 60).toFixed(2)}`,
    'c_dig': (d) => `KB: ${d.v * 1024} | GB: ${(d.v / 1024).toFixed(3)}`,
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
    'age': (d) => window.calculateAge ? window.calculateAge(d.bd) : 'Error',
    'bmi': (d) => { const h = d.h / 100; const b = (d.w / (h * h)).toFixed(1); return `BMI: ${b} (${b < 18.5 ? 'نحيف' : b < 25 ? 'طبيعي' : b < 30 ? 'وزن زائد' : 'سمنة'})`; },
    'loan': (d) => `Monthly: ${(d.a / d.m).toFixed(2)}`,
    'vat': (d) => `Total (inc 15%): ${(d.v * 1.15).toFixed(2)}`,
    'disc': (d) => `Net Price: ${(d.p * (1 - d.d / 100)).toFixed(2)}`,
    'pct': (d) => `Percentage: ${((d.p / d.v) * 100).toFixed(1)}%`,
    'zak': (d) => `Zakat: ${(d.v / 40).toFixed(2)}`,
    'gpa': (d) => {
        const grades = d.g.split(',').map(Number);
        if (grades.some(isNaN)) return "يرجى إدخال الدرجات مفصولة بفاصلة";
        const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
        const gpa = (avg / 25).toFixed(2); // Mock 4.0 scale
        return `Average: ${avg.toFixed(1)}% | GPA: ${gpa}/4.0`;
    },
    'sal': (d) => `Hourly: ${(d.s / 240).toFixed(2)}`,
    'rnd': (d) => `Generated: ${Math.floor(Math.random() * d.m)}`,

    // --- Social ---
    'ig_prof': (d) => `<div style="text-align:center"><img src="https://images.weserv.nl/?url=https://www.instagram.com/${d.user}/?__a=1" style="width:150px;border-radius:50%;border:4px solid var(--primary);"><br><a href="https://www.instagram.com/${d.user}/" target="_blank" class="pro-btn" style="margin-top:10px">Open Profile</a></div>`,

    // --- Games ---
    'xo': () => {
        return `<div id="xo-game" style="display:grid;grid-template-columns:repeat(3, 80px);gap:10px;justify-content:center;margin:20px 0;">
            ${Array(9).fill(0).map((_, i) => `<div onclick="window.playXO(this, ${i})" style="width:80px;height:80px;background:var(--bg-card);border:1px solid var(--glass-border);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:2rem;cursor:pointer;"></div>`).join('')}
        </div><div id="xo-status" style="text-align:center;font-weight:bold;color:var(--primary);">Player X Turn</div>`;
    },
    'rps': () => "", // Logic handled by custom UI
    'dice': () => `🎲 Result: ${Math.floor(Math.random() * 6) + 1}`,
    'coin': () => `🪙 Result: ${Math.random() > 0.5 ? 'Heads' : 'Tails'}`,
    'guess': (d) => { const r = Math.floor(Math.random() * 10) + 1; return d.v == r ? '🎉 Correct!' : `❌ Wrong, it was ${r}`; },
    'love': (d) => `${Math.floor(Math.random() * 101)}% ❤️`,
    'joke': () => window.contentDB?.jokes[Math.floor(Math.random() * window.contentDB.jokes.length)] || "Loading...",
    'fact': () => window.contentDB?.facts[Math.floor(Math.random() * window.contentDB.facts.length)] || "Loading...",
    'quote': () => window.contentDB?.quotes[Math.floor(Math.random() * window.contentDB.quotes.length)] || "Loading...",
    'pass': (d) => d.p && d.p.length > 8 ? 'Strong ✅' : 'Weak ⚠️',
    'react': () => "اضغط بسرعة! (قريباً)",

    // --- CSS Tools ---
    'css_grad': () => `background: linear-gradient(90deg, #00f2ff, #ff007a);`,
    'css_box': () => `box-shadow: 0 10px 30px rgba(0,0,0,0.5);`,
    'css_txt': () => `text-shadow: 2px 2px 10px rgba(0,242,255,0.5);`,
    'css_bor': () => `border-radius: 20px;`,
    'css_flx': () => `display: flex; justify-content: center; align-items: center;`,
    'css_grid': () => `display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;`,
    'css_filt': () => `filter: grayscale(100%);`,
    'css_anim': () => `@keyframes example { from {opacity:0;} to {opacity:1;} }`,
    'css_clip': () => `clip-path: circle(50% at 50% 50%);`,
    'css_min': (d) => `<textarea class="code-out">${d.c.replace(/\s+/g, '').replace(/:\s+/g, ':')}</textarea>`,
    'img_b64': (d) => {
        return new Promise((resolve) => {
            const r = new FileReader();
            r.onload = (e) => resolve(`<textarea class="code-out">${e.target.result}</textarea>`);
            r.readAsDataURL(d.img);
        });
    },
};

// --- Utilities & Media Helpers ---
window.copyToClipboard = (txt) => {
    navigator.clipboard.writeText(txt);
    alert('Copied to Clipboard!');
};

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

    // Ensure Tool View Container Exists
    let toolView = document.getElementById('tool-view');
    if (!toolView) {
        // If we are on a dashboard page (like student.html), we might not need tool-view at all if everything is migrated
        // But for hybrid, we keep it.
        const main = document.querySelector('.main');
        if (main) {
            toolView = document.createElement('div');
            toolView.id = 'tool-view';
            toolView.className = 'tool-view';
            main.appendChild(toolView);
        }
    }

    const grid = document.getElementById('grid');
    if (!grid) return; // Guard
    grid.innerHTML = '';

    // Reset View State
    grid.style.display = 'grid';
    if (toolView) toolView.style.display = 'none';
    const hdr = document.querySelector('.header-area');
    if (hdr) hdr.style.display = 'flex';

    // Filter
    tools.filter(t => t.cat === category || (t.isBanner && (category === 'student' || category === 'dev'))).forEach(t => {
        const card = document.createElement('div');
        card.className = `tool-card ${t.isBanner ? 'banner' : ''}`;
        card.innerHTML = `
            ${t.isBanner ? '' : `<div class="icon-box">${t.icon}</div>`}
            <div class="tool-name">${t.name}</div>
            <div class="tool-desc">${t.desc}</div>
            <div class="card-glow"></div>
        `;
        if (t.isBanner) {
            card.onclick = () => window.open(t.link);
        } else {
            // ALWAYS use internal openTool for SPA consistency and VIP UI
            card.onclick = () => openTool(t);
        }
        grid.appendChild(card);
    });
}

function openTool(tool) {
    activeToolId = tool.id;
    Memory.addHistory(tool.id);
    Memory.set('last_tool', tool.id);

    // 1. Setup Tool View UI
    const toolView = document.getElementById('tool-view');
    const grid = document.getElementById('grid');
    const hdr = document.querySelector('.header-area');

    if (grid) grid.style.display = 'none';
    if (hdr) hdr.style.display = 'none';
    if (toolView) {
        toolView.style.display = 'block';
        toolView.classList.add('active');
        toolView.innerHTML = `
            <div class="tool-head">
                <div class="tool-info-box">
                    <div class="icon-box">${tool.icon}</div>
                    <div>
                        <h2 style="font-size:28px; font-weight:800;">${tool.name}</h2>
                        <p style="color:var(--text-muted);">${tool.desc || ''}</p>
                    </div>
                </div>
                <button class="back-btn" onclick="closeToolView()"><i>←</i> <span>${currentLang === 'ar' ? 'عودة' : 'Back'}</span></button>
            </div>
            <div id="mInputs"></div>
            <button class="run-btn" onclick="runTool()">${translations.ui.run_btn || 'Run'}</button>
            
            <!-- Ad Slot 4: Native Ad -->
            <div id="native-ad-slot" class="ad-container ad-native">
                ${window.AdsConfig.native || '<div style="opacity:0.3">SPONSORED TOOL AD (ADSTERRA)</div>'}
            </div>

            <div class="output-area" id="mOutBox">
                <div style="font-weight:bold; margin-bottom:10px; color:var(--primary);">${currentLang === 'ar' ? 'النتيجة:' : 'Result:'}</div>
                <div class="output-val" id="mOutVal"></div>
            </div>
        `;
    }

    const fields = document.getElementById('mInputs');
    if (!fields) return;

    // Special Live Decoration Mode
    if (tool.cat === 'decor') {
        document.getElementById('mOutBox').style.display = 'none';
        fields.innerHTML = `
            <div class="field">
                <label style="display:block; margin-bottom:10px; font-weight:600; color:var(--gray-600);">${currentLang === 'ar' ? 'اكتب النص هنا:' : 'Type text here:'}</label>
                <textarea id="liveDecorInput" rows="3" placeholder="Type here..." style="background:var(--white); border:1px solid var(--gray-200); color:var(--gray-900); padding:15px; border-radius:12px; width:100%; box-shadow:var(--shadow-sm);"></textarea>
            </div>
            <div id="decorResults" style="display:grid; grid-template-columns:1fr 1fr; gap:15px; max-height:500px; overflow-y:auto; margin-top:20px; padding:10px;"></div>
        `;

        const inp = document.getElementById('liveDecorInput');
        if (inp) {
            inp.focus();
            updateLiveDecorations('');
            inp.addEventListener('input', (e) => updateLiveDecorations(e.target.value));
        }
        const runBtn = document.querySelector('.run-btn');
        if (runBtn) runBtn.style.display = 'none';
        return;
    }

    // Standard Inputs
    if (tool.inputs) {
        tool.inputs.forEach(inp => {
            const div = document.createElement('div');
            div.className = 'field';
            div.style.marginBottom = '20px';
            let html = `<label style="display:block; margin-bottom:10px; font-weight:600; color:var(--gray-600);">${inp.l || inp.n}</label>`;

            const inputStyle = 'background:var(--white); border:1px solid var(--gray-200); color:var(--gray-900); padding:12px 18px; border-radius:12px; width:100%; font-size:16px; transition:0.3s; box-shadow:var(--shadow-sm);';

            if (inp.t === 'select') {
                html += `<select id="inp_${inp.n}" style="${inputStyle} cursor:pointer;">${inp.o.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`;
            } else if (inp.t === 'textarea') {
                html += `<textarea id="inp_${inp.n}" rows="5" style="${inputStyle}"></textarea>`;
            } else if (inp.t === 'file') {
                html += `<input type="file" id="inp_${inp.n}" style="${inputStyle}">`;
            } else {
                html += `<input type="${inp.t}" id="inp_${inp.n}" value="${inp.d || ''}" style="${inputStyle}">`;
            }
            div.innerHTML = html;
            fields.appendChild(div);
        });
    } else {
        fields.innerHTML = `<div style="padding:40px; text-align:center; color:var(--gray-600); background:var(--gray-100); border-radius:15px;">${currentLang === 'ar' ? 'جاهز للبدء' : 'Ready to start'}</div>`;
    }
}

function closeToolView() {
    document.getElementById('tool-view').style.display = 'none';
    document.getElementById('tool-view').classList.remove('active');

    document.getElementById('grid').style.display = 'grid'; // Restore Grid
    const hdr = document.querySelector('.header-area');
    if (hdr) hdr.style.display = 'flex'; // Restore Header
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
        const workerTools = ['cnt', 'rev', 'cln', 'bin', 'bde', 'rep', 'eml', 'url', 'num', 'slug', 'wpm', 'remdup', 'bmi', 'avg', 'jsn', 'gen', 'json', 'txt2pdf', 'c_len', 'c_wgt', 'c_tmp', 'txt_sort', 'txt_shuf', 'pdf_mrg', 'pdf_spl', 'pdf_clr', 'pdf_rot', 'pdf_wat'];

        if (activeToolId === 'txt2pdf' || ['imgbw', 'flip', 'blur', 'img_res', 'img_crop', 'img_comp', 'img_conv', 'img_filt', 'img_rot'].includes(activeToolId) || workerTools.includes(activeToolId)) {
            document.getElementById('mOutVal').innerHTML = '⏳ Processing...';
            document.getElementById('mOutBox').style.display = 'block';

            if (['imgbw', 'flip', 'blur', 'img_res', 'img_crop', 'img_comp', 'img_conv', 'img_filt', 'img_rot'].includes(activeToolId)) {
                // For image tools, we need to get the bitmap first
                const file = data.img;
                if (!file) {
                    document.getElementById('mOutVal').innerHTML = 'Please select a file';
                    return;
                }
                createImageBitmap(file).then(bmp => {
                    worker.postMessage({ id: activeToolId, data: { ...data, bitmap: bmp } }, [bmp]);
                });
            } else {
                worker.postMessage({ id: activeToolId, data: data });
            }
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
            out.innerHTML = `
                <div style="font-size:1.2rem;margin-bottom:15px;">${res}</div>
                <button onclick="copyToClipboard('${String(res).replace(/'/g, "\\'")}')" class="pro-btn" style="width:auto;padding:8px 20px;">📋 Copy Result</button>
            `;
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
let currentLang = (localStorage.getItem('ng_lang') || 'ar').toLowerCase();
let translations = {};

async function loadLanguage(lang) {
    try {
        const root = window.NextGear && window.NextGear.root ? window.NextGear.root : './';
        const res = await fetch(`${root || './'}locales/${lang.toLowerCase()}.json`);
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
        // Check UI, Categories, or Tools for translation
        let txt = (translations.ui && translations.ui[key]) ||
            (translations.categories && translations.categories[key]) ||
            (translations.tools && translations.tools[key] && translations.tools[key].n);

        // Handle mapped category keys if named differently (e.g. cat_vid -> categories.video)
        if (!txt && key.startsWith('cat_')) {
            const shortKey = key.replace('cat_', '');
            txt = translations.categories && translations.categories[shortKey];
        }
        if (!txt && key.startsWith('desc_')) {
            const shortKey = key.replace('desc_', '');
            // descriptions aren't clearly mapped in categories object, but we can try
        }

        if (txt) {
            el.innerText = txt;
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = txt;
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
    if (!document.querySelector('.lang-select') && !document.getElementById('global-lang-select')) {
        const header = document.querySelector('.header-content') || document.querySelector('.header-area');
        if (header) {
            const sel = document.createElement('select');
            sel.className = 'lang-select';
            sel.id = 'script-lang-select';
            sel.style.cssText = "margin: 0 15px; padding: 5px; border-radius: 5px; border: 1px solid #ccc; background: white; color: #333;";
            sel.innerHTML = `
                <option value="ar">🇸🇦 العربية</option>
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="pt">🇵تالبرتغالية</option>
                <option value="ru">🇷🇺 Русский</option>
                <option value="tr">🇹🇷 Türkçe</option>
                <option value="id">🇮🇩 Indonesia</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="hi">🇮🇳 हिन्दी</option>
            `;
            sel.value = currentLang;
            sel.onchange = (e) => loadLanguage(e.target.value);

            const search = document.querySelector('.search-box') || document.querySelector('.search');
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

// Global Search Logic for Category Pages
window.search = (query) => {
    const q = query.toLowerCase();
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach(card => {
        const name = card.querySelector('.tool-name').innerText.toLowerCase();
        const desc = card.querySelector('.tool-desc').innerText.toLowerCase();
        if (name.includes(q) || desc.includes(q)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

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

// --- Image Processor Helper ---
function processImage(file, callback) {
    return new Promise((resolve) => {
        if (!file) return resolve('❌ يرجى اختيار صورة أولاً');
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const cvs = document.createElement('canvas');
                const ctx = cvs.getContext('2d');
                const resUrl = callback(ctx, cvs, img);
                if (resUrl.startsWith('<')) resolve(resUrl);
                else resolve(`<img src="${resUrl}" style="max-width:100%;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.1)"><br><a href="${resUrl}" download="edited_image.png" class="pro-btn">💾 تحميل الصورة</a>`);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// --- Additional Logic ---
window.calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age + " سنة";
};

let stopwatchInterval;
let stopwatchTime = 0;
window.toggleStopwatch = () => {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    } else {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            const h = Math.floor(stopwatchTime / 3600);
            const m = Math.floor((stopwatchTime % 3600) / 60);
            const s = stopwatchTime % 60;
            const el = document.getElementById('stopwatch');
            if (el) el.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }, 1000);
    }
};
window.resetStopwatch = () => {
    stopwatchTime = 0;
    const el = document.getElementById('stopwatch');
    if (el) el.innerText = "00:00:00";
};

let xoBoard = Array(9).fill(null);
let xoTurn = 'X';
window.playXO = (el, i) => {
    if (xoBoard[i] || !el) return;
    xoBoard[i] = xoTurn;
    el.innerText = xoTurn;
    el.style.color = xoTurn === 'X' ? '#00efcc' : '#ff007a';

    // Win Logic
    const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let w of wins) {
        if (xoBoard[w[0]] && xoBoard[w[0]] === xoBoard[w[1]] && xoBoard[w[0]] === xoBoard[w[2]]) {
            document.getElementById('xo-status').innerText = `Winner: ${xoTurn}! 🎉`;
            xoBoard.fill('DONE');
            return;
        }
    }

    if (xoBoard.every(b => b)) return document.getElementById('xo-status').innerText = "Draw! 🤝";

    xoTurn = xoTurn === 'X' ? 'O' : 'X';
    document.getElementById('xo-status').innerText = `Player ${xoTurn} Turn`;
};
