
// --- Data & Logic ---

const tools = [
    // --- 1. STUDENT / TEXT (25 Tools) ---
    { id: 'cnt', cat: 'student', name: 'عداد الكلمات', icon: '📝', desc: 'حساب عدد الكلمات والأحرف', inputs: [{ n: 'txt', l: 'النص', t: 'textarea' }] },
    { id: 'rev', cat: 'student', name: 'عكس النص', icon: '🔄', desc: 'قلب النصوص', inputs: [{ n: 'txt', l: 'النص', t: 'text' }] },
    { id: 'cln', cat: 'student', name: 'تنظيف النص', icon: '🧹', desc: 'إزالة المسافات الزائدة', inputs: [{ n: 'txt', l: 'النص', t: 'textarea' }] },
    { id: 'upr', cat: 'student', name: 'أحرف كبيرة', icon: '🔠', desc: 'Uppercase', inputs: [{ n: 'txt', l: 'English Text', t: 'textarea' }] },
    { id: 'lwr', cat: 'student', name: 'أحرف صغيرة', icon: '🔡', desc: 'Lowercase', inputs: [{ n: 'txt', l: 'English Text', t: 'textarea' }] },
    { id: 'cap', cat: 'student', name: 'العناوين', icon: 'Abc', desc: 'Capitalize Words', inputs: [{ n: 'txt', l: 'English Text', t: 'textarea' }] },
    { id: 'bin', cat: 'student', name: 'نص إلى Binary', icon: '01', desc: 'تحويل للغة الآلة', inputs: [{ n: 'txt', l: 'النص', t: 'text' }] },
    { id: 'bde', cat: 'student', name: 'Binary إلى نص', icon: '🔣', desc: 'فك تشفير الآلة', inputs: [{ n: 'txt', l: 'كود 010101', t: 'text' }] },
    { id: 'rep', cat: 'student', name: 'تكرار النص', icon: '🔁', desc: 'كرر جملة 100 مرة', inputs: [{ n: 'txt', l: 'النص', t: 'text' }, { n: 'cnt', l: 'العدد', t: 'number', d: 100 }] },
    { id: 'eml', cat: 'student', name: 'سحب ايميلات', icon: '📧', desc: 'استخراج البريد من نص طويل', inputs: [{ n: 'txt', l: 'النص المخلوط', t: 'textarea' }] },
    { id: 'url', cat: 'student', name: 'سحب روابط', icon: '🔗', desc: 'استخراج الروابط من نص', inputs: [{ n: 'txt', l: 'النص المخلوط', t: 'textarea' }] },
    { id: 'num', cat: 'student', name: 'سحب أرقام', icon: '#️⃣', desc: 'استخراج الأرقام فقط', inputs: [{ n: 'txt', l: 'النص', t: 'textarea' }] },
    { id: 'slug', cat: 'student', name: 'Slug Generator', icon: '🐌', desc: 'تحويل عنوان لرابط', inputs: [{ n: 'txt', l: 'العنوان', t: 'text' }] },
    { id: 'morse', cat: 'student', name: 'شفرة مورس', icon: '📡', desc: 'ترجمة لمورس', inputs: [{ n: 'txt', l: 'النص', t: 'text' }] },
    { id: 'wpm', cat: 'student', name: 'وقت القراءة', icon: '⏱️', desc: 'كم دقيقة لقراءة النص؟', inputs: [{ n: 'txt', l: 'النص', t: 'textarea' }] },
    { id: 'sort', cat: 'student', name: 'ترتيب أ-ي', icon: '⬇️', desc: 'ترتيب الأسطر أبجدياً', inputs: [{ n: 'txt', l: 'قائمة (سطر سطر)', t: 'textarea' }] },
    { id: 'sortr', cat: 'student', name: 'ترتيب ي-أ', icon: '⬆️', desc: 'ترتيب عكسي', inputs: [{ n: 'txt', l: 'قائمة (سطر سطر)', t: 'textarea' }] },
    { id: 'noc', cat: 'student', name: 'أزالة التشكيل', icon: '◌', desc: 'حذف الحركات العربية', inputs: [{ n: 'txt', l: 'النص المشكّل', t: 'textarea' }] },
    { id: 'snake', cat: 'student', name: 'snake_case', icon: '🐍', desc: 'تحويل لنمط الثعبان', inputs: [{ n: 'txt', l: 'Text', t: 'text' }] },
    { id: 'camel', cat: 'student', name: 'camelCase', icon: '🐫', desc: 'تحويل لنمط الجمل', inputs: [{ n: 'txt', l: 'Text', t: 'text' }] },
    { id: 'kebab', cat: 'student', name: 'kebab-case', icon: '🍢', desc: 'تحويل لنمط الكباب', inputs: [{ n: 'txt', l: 'Text', t: 'text' }] },
    { id: 'pascal', cat: 'student', name: 'PascalCase', icon: '🅿️', desc: 'تحويل لنمط باسكال', inputs: [{ n: 'txt', l: 'Text', t: 'text' }] },
    { id: 'remdup', cat: 'student', name: 'حذف التكرار', icon: '✂️', desc: 'حذف الأسطر المكررة', inputs: [{ n: 'txt', l: 'القائمة', t: 'textarea' }] },
    { id: 'revw', cat: 'student', name: 'عكس الكلمات', icon: '🔙', desc: 'عكس ترتيب الكلمات', inputs: [{ n: 'txt', l: 'الجملة', t: 'text' }] },
    { id: 'nln', cat: 'student', name: 'دمج الأسطر', icon: '📄', desc: 'تحويل الأسطر لنص واحد', inputs: [{ n: 'txt', l: 'النص', t: 'textarea' }] },


    // --- 2. MATH (20 Tools) ---
    { id: 'age', cat: 'math', name: 'حاسبة العمر', icon: '🎂', desc: 'احسب عمرك بالتفصيل', inputs: [{ n: 'bd', l: 'تاريخ الميلاد', t: 'date' }] },
    { id: 'bmi', cat: 'math', name: 'الوزن المثالي (BMI)', icon: '⚖️', desc: 'تحليل الجسم', inputs: [{ n: 'w', l: 'الوزن (كجم)', t: 'number' }, { n: 'h', l: 'الطول (سم)', t: 'number' }] },
    { id: 'vat', cat: 'math', name: 'حاسبة الضريبة', icon: '🏷️', desc: 'إضافة ضريبة 15%', inputs: [{ n: 'p', l: 'المبلغ', t: 'number' }] },
    { id: 'disc', cat: 'math', name: 'حاسبة الخصم', icon: '✂️', desc: 'السعر بعد التخفيض', inputs: [{ n: 'price', l: 'السعر الأصلي', t: 'number' }, { n: 'perc', l: 'نسبة الخصم %', t: 'number' }] },
    { id: 'loan', cat: 'math', name: 'القسط الشهري', icon: '🏦', desc: 'حاسبة القروض المبسطة', inputs: [{ n: 'amount', l: 'قيمة القرض', t: 'number' }, { n: 'months', l: 'عدد الأشهر', t: 'number' }] },
    { id: 'zak', cat: 'math', name: 'زكاة المال', icon: '🕌', desc: 'نصاب زكاة المال', inputs: [{ n: 'money', l: 'المبلغ المدخر', t: 'number' }] },
    { id: 'sav', cat: 'math', name: 'خطة توفير', icon: '🐖', desc: 'كم ستجمع في سنة؟', inputs: [{ n: 'm', l: 'التوفير الشهري', t: 'number' }] },
    { id: 'sal', cat: 'math', name: 'راتب الساعة', icon: '💵', desc: 'كم قيمة ساعة عملك؟', inputs: [{ n: 's', l: 'الراتب الشهري', t: 'number' }] },
    { id: 'tip', cat: 'math', name: 'البقشيش', icon: '🍽️', desc: 'حساب الإكرامية', inputs: [{ n: 'bill', l: 'الفاتورة', t: 'number' }, { n: 'perc', l: 'النسبة %', t: 'number', d: 10 }] },
    { id: 'area', cat: 'math', name: 'مساحة مستطيل', icon: '⬛', desc: 'طول × عرض', inputs: [{ n: 'l', l: 'الطول', t: 'number' }, { n: 'w', l: 'العرض', t: 'number' }] },
    { id: 'cir', cat: 'math', name: 'مساحة دائرة', icon: '⚪', desc: 'نصف القطر', inputs: [{ n: 'r', l: 'نصف القطر', t: 'number' }] },
    { id: 'tri', cat: 'math', name: 'مساحة مثلث', icon: '🔺', desc: 'القاعدة والارتفاع', inputs: [{ n: 'b', l: 'القاعدة', t: 'number' }, { n: 'h', l: 'الارتفاع', t: 'number' }] },
    { id: 'pwd', cat: 'math', name: 'الأس (Power)', icon: '📈', desc: 'الأس والقوى', inputs: [{ n: 'b', l: 'الرقم', t: 'number' }, { n: 'e', l: 'الأس', t: 'number' }] },
    { id: 'pct', cat: 'math', name: 'النسبة المئوية', icon: '％', desc: 'احسب نسبة من رقم', inputs: [{ n: 'val', l: 'الرقم الكلي', t: 'number' }, { n: 'pc', l: 'النسبة', t: 'number' }] },
    { id: 'sqrt', cat: 'math', name: 'الجذر التربيعي', icon: '🌲', desc: 'Square Root', inputs: [{ n: 'v', l: 'الرقم', t: 'number' }] },
    { id: 'avg', cat: 'math', name: 'المتوسط الحسابي', icon: '📊', desc: 'Average', inputs: [{ n: 'nums', l: 'أرقام مفصولة بمسافة', t: 'text' }] },
    { id: 'min', cat: 'math', name: 'أصغر رقم', icon: '⬇️', desc: 'Minimum', inputs: [{ n: 'nums', l: 'أرقام مفصولة بمسافة', t: 'text' }] },
    { id: 'max', cat: 'math', name: 'أكبر رقم', icon: '⬆️', desc: 'Maximum', inputs: [{ n: 'nums', l: 'أرقام مفصولة بمسافة', t: 'text' }] },
    { id: 'rand', cat: 'math', name: 'رقم عشوائي', icon: '🎲', desc: 'بين رقمين', inputs: [{ n: 'min', l: 'من', t: 'number' }, { n: 'max', l: 'إلى', t: 'number' }] },
    { id: 'hyp', cat: 'math', name: 'الوتر (فيثاغورس)', icon: '📐', desc: 'ضلع المثلث القائم', inputs: [{ n: 'a', l: 'الضلع الأول', t: 'number' }, { n: 'b', l: 'الضلع الثاني', t: 'number' }] },


    // --- 3. CONVERTERS (20 Tools) ---
    { id: 'c2f', cat: 'conv', name: 'حرارة (C إلى F)', icon: '🌡️', desc: 'تحويل درجة الحرارة', inputs: [{ n: 'v', l: 'الدرجة (C)', t: 'number' }] },
    { id: 'f2c', cat: 'conv', name: 'حرارة (F إلى C)', icon: '🌡️', desc: 'تحويل درجة الحرارة', inputs: [{ n: 'v', l: 'الدرجة (F)', t: 'number' }] },
    { id: 'k2m', cat: 'conv', name: 'مسافة (كم إلى ميل)', icon: '🛣️', desc: 'تحويل المسافات', inputs: [{ n: 'v', l: 'المسافة (كم)', t: 'number' }] },
    { id: 'm2k', cat: 'conv', name: 'مسافة (ميل إلى كم)', icon: '🛣️', desc: 'تحويل المسافات', inputs: [{ n: 'v', l: 'المسافة (ميل)', t: 'number' }] },
    { id: 'k2l', cat: 'conv', name: 'وزن (كغ إلى باوند)', icon: '⚖️', desc: 'تحويل الأوزان', inputs: [{ n: 'v', l: 'الوزن (كغ)', t: 'number' }] },
    { id: 'l2k', cat: 'conv', name: 'وزن (باوند إلى كغ)', icon: '⚖️', desc: 'تحويل الأوزان', inputs: [{ n: 'v', l: 'الوزن (lbs)', t: 'number' }] },
    { id: 'cm2i', cat: 'conv', name: 'طول (سم إلى إنش)', icon: '📏', desc: 'تحويل الأطوال', inputs: [{ n: 'v', l: 'الطول (سم)', t: 'number' }] },
    { id: 'i2cm', cat: 'conv', name: 'طول (إنش إلى سم)', icon: '📏', desc: 'تحويل الأطوال', inputs: [{ n: 'v', l: 'الطول (inch)', t: 'number' }] },
    { id: 'm2g', cat: 'conv', name: 'تخزين (MB إلى GB)', icon: '💾', desc: 'تحويل الداتا', inputs: [{ n: 'v', l: 'الحجم (MB)', t: 'number' }] },
    { id: 'g2m', cat: 'conv', name: 'تخزين (GB إلى MB)', icon: '💾', desc: 'تحويل الداتا', inputs: [{ n: 'v', l: 'الحجم (GB)', t: 'number' }] },
    { id: 'pxr', cat: 'conv', name: 'Web (PX إلى REM)', icon: '🎨', desc: 'للمصممين', inputs: [{ n: 'v', l: 'Pixel', t: 'number' }] },
    { id: 'r2p', cat: 'conv', name: 'Web (REM إلى PX)', icon: '🎨', desc: 'للمصممين', inputs: [{ n: 'v', l: 'Rem', t: 'number' }] },
    { id: 'l2ml', cat: 'conv', name: 'حجم (لتر إلى مل)', icon: '🥛', desc: 'تحويل السوائل', inputs: [{ n: 'v', l: 'لتر', t: 'number' }] },
    { id: 'ml2l', cat: 'conv', name: 'حجم (مل إلى لتر)', icon: '🥛', desc: 'تحويل السوائل', inputs: [{ n: 'v', l: 'مليلتر', t: 'number' }] },
    { id: 'd2h', cat: 'conv', name: 'وقت (أيام لساعات)', icon: '⏰', desc: 'تحويل الزمن', inputs: [{ n: 'v', l: 'أيام', t: 'number' }] },
    { id: 'h2m', cat: 'conv', name: 'وقت (ساعات لدقائق)', icon: '⏱️', desc: 'تحويل الزمن', inputs: [{ n: 'v', l: 'ساعات', t: 'number' }] },
    { id: 'm2s', cat: 'conv', name: 'وقت (دقائق لثواني)', icon: '⏲️', desc: 'تحويل الزمن', inputs: [{ n: 'v', l: 'دقائق', t: 'number' }] },
    { id: 'kh2mp', cat: 'conv', name: 'سرعة (Km/h -> Mph)', icon: '🚗', desc: 'تحويل السرعة', inputs: [{ n: 'v', l: 'Km/h', t: 'number' }] },
    { id: 'mp2kh', cat: 'conv', name: 'سرعة (Mph -> Km/h)', icon: '🚗', desc: 'تحويل السرعة', inputs: [{ n: 'v', l: 'Mph', t: 'number' }] },
    { id: 'psi', cat: 'conv', name: 'ضغط (PSI -> Bar)', icon: '🔧', desc: 'تحويل الضغط', inputs: [{ n: 'v', l: 'PSI', t: 'number' }] },

    // --- 4. DEV (15 Tools) ---
    { id: 'jsn', cat: 'dev', name: 'تنسيق JSON', icon: '{}', desc: 'Beautify JSON', inputs: [{ n: 'txt', l: 'JSON Minified', t: 'textarea' }] },
    { id: 'b64', cat: 'dev', name: 'Base64 Encode', icon: '🔒', desc: 'Text to Base64', inputs: [{ n: 'txt', l: 'Text', t: 'textarea' }] },
    { id: 'dec', cat: 'dev', name: 'Base64 Decode', icon: '🔓', desc: 'Base64 to Text', inputs: [{ n: 'txt', l: 'Base64 String', t: 'textarea' }] },
    { id: 'ue', cat: 'dev', name: 'URL Encode', icon: '🔗', desc: 'Safe URL', inputs: [{ n: 'txt', l: 'Link', t: 'text' }] },
    { id: 'ud', cat: 'dev', name: 'URL Decode', icon: '🔗', desc: 'Readable URL', inputs: [{ n: 'txt', l: 'Encoded Link', t: 'text' }] },
    { id: 'gen', cat: 'dev', name: 'باسوورد قوي', icon: '🔑', desc: 'Random Password', inputs: [{ n: 'len', l: 'الطول', t: 'number', d: 12 }] },
    { id: 'css', cat: 'dev', name: 'HEX to RGB', icon: '🎨', desc: 'Color Convert', inputs: [{ n: 'hex', l: 'Hex Code (#fff)', t: 'text' }] },
    { id: 'rgb', cat: 'dev', name: 'RGB to HEX', icon: '🎨', desc: 'Color Convert', inputs: [{ n: 'r', l: 'R', t: 'number' }, { n: 'g', l: 'G', t: 'number' }, { n: 'b', l: 'B', t: 'number' }] },
    { id: 'uuid', cat: 'dev', name: 'UUID Generator', icon: '🆔', desc: 'V4 Unique ID', inputs: [] },
    { id: 'ip', cat: 'dev', name: 'My IP', icon: '🌐', desc: 'Show Local IP info', inputs: [] },
    { id: 'sql', cat: 'dev', name: 'SQL Formatter', icon: '🗄️', desc: 'Simple Format', inputs: [{ n: 'txt', l: 'Single Line SQL', t: 'textarea' }] },
    { id: 'lorem', cat: 'dev', name: 'Lorem Ipsum', icon: '📝', desc: 'نص عشوائي للتصميم', inputs: [{ n: 'n', l: 'عدد الفقرات', t: 'number', d: 3 }] },
    { id: 'htmle', cat: 'dev', name: 'HTML Entities', icon: '&;', desc: 'Convert chars to entities', inputs: [{ n: 'txt', l: 'Text', t: 'textarea' }] },
    { id: 'unix', cat: 'dev', name: 'Unix Timestamp', icon: '⏰', desc: 'Current Epoch', inputs: [] },
    { id: 'ua', cat: 'dev', name: 'User Agent', icon: '🕵️', desc: 'متصفحك ونظامك', inputs: [] },


    // --- 5. SOCIAL (10 Tools) ---
    { id: 'bio', cat: 'social', name: 'زخرفة بايو', icon: '✨', desc: 'تزيين النصوص', inputs: [{ n: 'txt', l: 'النص', t: 'text' }] },
    { id: 'wht', cat: 'social', name: 'واتس اب مباشر', icon: '💬', desc: 'بدون حفظ رقم', inputs: [{ n: 'num', l: 'الرقم مع المفتاح (966..)', t: 'number' }] },
    { id: 'tag', cat: 'social', name: 'مولد هاشتاق', icon: '#️⃣', desc: 'هاشتاقات مشهورة', inputs: [] },
    { id: 'lnk', cat: 'social', name: 'فحص الروابط', icon: '🔍', desc: 'تأكد من سلامة الرابط', inputs: [{ n: 'url', l: 'الرابط', t: 'text' }] },
    { id: 'memo', cat: 'social', name: 'مفكرة سريعة', icon: '🗒️', desc: 'حفظ نص مؤقت', inputs: [{ n: 'txt', l: 'النص', t: 'textarea' }] },
    { id: 'caption', cat: 'social', name: 'كابشن انستقرام', icon: '📸', desc: 'عبارات جاهزة', inputs: [] },
    { id: 'yt', cat: 'social', name: 'عنوان يوتيوب', icon: '📺', desc: 'فكرة فيديو', inputs: [] },
    { id: 'tweet', cat: 'social', name: 'رابط تغريدة', icon: '🐦', desc: 'اصنع رابط للمشاركة', inputs: [{ n: 'txt', l: 'التغريدة', t: 'textarea' }] },
    { id: 'qr', cat: 'social', name: 'QR Code', icon: '📱', desc: 'رابط لـ QR (رابط خارجي)', inputs: [{ n: 'txt', l: 'الرابط/النص', t: 'text' }] },
    { id: 'passc', cat: 'social', name: 'فحص كلمة السر', icon: '🛡️', desc: 'مدى قوة الباسوورد', inputs: [{ n: 'txt', l: 'كلمة السر', t: 'text' }] },


    // --- 6. GAMES (10 Tools) ---
    { id: 'dice', cat: 'game', name: 'رمي النرد', icon: '🎲', desc: 'رقم عشوائي من 1-6', inputs: [] },
    { id: 'rps', cat: 'game', name: 'حجرة ورقة مقص', icon: '✂️', desc: 'العب ضد الكمبيوتر', inputs: [{ n: 'c', l: 'اختر حركتك', t: 'select', o: ['rock', 'paper', 'scissors'] }] },
    { id: 'love', cat: 'game', name: 'مقياس الحب', icon: '❤️', desc: 'للمرح فقط', inputs: [{ n: 'n1', l: 'اسمك', t: 'text' }, { n: 'n2', l: 'اسم الشريك', t: 'text' }] },
    { id: 'coin', cat: 'game', name: 'عملة معدنية', icon: '🪙', desc: 'قرعة (وجه/قفا)', inputs: [] },
    { id: 'guess', cat: 'game', name: 'تخمين الرقم', icon: '❓', desc: 'خمن رقم من 1-10', inputs: [{ n: 'v', l: 'تخمينك', t: 'number' }] },
    { id: 'joke', cat: 'game', name: 'نكتة بايخة', icon: '🤡', desc: 'نكت عشوائية', inputs: [] },
    { id: 'fact', cat: 'game', name: 'هل تعلم؟', icon: '🧠', desc: 'معلومات عامة', inputs: [] },
    { id: 'quote', cat: 'game', name: 'اقتباس', icon: '📜', desc: 'حكمة اليوم', inputs: [] },
    { id: 'emoj', cat: 'game', name: 'ترجمة ايموجي', icon: '😀', desc: 'حول نص لإيموجي', inputs: [{ n: 'txt', l: 'النص', t: 'text' }] },
    { id: 'decision', cat: 'game', name: 'صناع القرار', icon: '🔮', desc: 'نعم أم لا؟', inputs: [{ n: 'q', l: 'السؤال', t: 'text' }] },



    // --- 7. FILES (10 Tools) ---
    { id: 'img2png', cat: 'files', name: 'إلى PNG', icon: '🖼️', desc: 'تحويل الصورة إلى PNG', inputs: [{ n: 'img', l: 'الصورة', t: 'file' }] },
    { id: 'img2jpg', cat: 'files', name: 'إلى JPG', icon: '🖼️', desc: 'تحويل الصورة إلى JPG', inputs: [{ n: 'img', l: 'الصورة', t: 'file' }] },
    { id: 'img2webp', cat: 'files', name: 'إلى WebP', icon: '🖼️', desc: 'تحويل الصورة إلى WebP', inputs: [{ n: 'img', l: 'الصورة', t: 'file' }] },
    { id: 'imgbw', cat: 'files', name: 'أبيض وأسود', icon: '⚫', desc: 'تحويل لأبيض وأسود', inputs: [{ n: 'img', l: 'الصورة', t: 'file' }] },
    { id: 'img64', cat: 'files', name: 'صورة إلى Base64', icon: '🔢', desc: 'تحويل لنص Base64', inputs: [{ n: 'img', l: 'الصورة', t: 'file' }] },
    { id: 'b64img', cat: 'files', name: 'Base64 إلى صورة', icon: '🖼️', desc: 'عرض كود Base64 كصورة', inputs: [{ n: 'txt', l: 'كود Base64', t: 'textarea' }] },
    { id: 'txt2pdf', cat: 'files', name: 'نص إلى PDF', icon: '📄', desc: 'حفظ النص كملف PDF', inputs: [{ n: 'txt', l: 'النص', t: 'textarea' }] },
    { id: 'imginfo', cat: 'files', name: 'معلومات الصورة', icon: 'ℹ️', desc: 'الحجم والأبعاد والنوع', inputs: [{ n: 'img', l: 'الصورة', t: 'file' }] },
    { id: 'flip', cat: 'files', name: 'قلب الصورة', icon: '↔️', desc: 'عكس الاتجاه (Mirror)', inputs: [{ n: 'img', l: 'الصورة', t: 'file' }] },
    { id: 'blur', cat: 'files', name: 'تمويه (Blur)', icon: '🌫️', desc: 'إضافة ضبابية للصورة', inputs: [{ n: 'img', l: 'الصورة', t: 'file' }] },


    // Featured
    { id: 'adv', cat: 'featured', name: 'استضافة Cloudflare', icon: '☁️', desc: 'أفضل استضافة لموقعك', link: 'http://nextgear.space', isBanner: true }
];

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
        if(!d.img) return resolve('اختر ملفاً');
        const i = new Image();
        i.onload = () => resolve(`النوع: ${d.img.type}\nالحجم: ${(d.img.size/1024).toFixed(2)} KB\nالأبعاد: ${i.width}x${i.height}`);
        i.src = URL.createObjectURL(d.img);
    }),
    'img64': (d) => new Promise((resolve) => {
        if(!d.img) return resolve('اختر ملفاً');
        const r = new FileReader();
        r.onload = (e) => resolve(`<textarea style="width:100%" rows="5">${e.target.result}</textarea>`);
        r.readAsDataURL(d.img);
    }),
    'b64img': (d) => `<img src="${d.txt.startsWith('data:')?d.txt:'data:image/png;base64,'+d.txt}" style="max-width:100%;border-radius:10px">`,
    'txt2pdf': (d) => {
        const w = window.open('','_blank');
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
        if(!file) return resolve('اختر صورة أولاً');
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
        if(!file) return resolve('اختر صورة أولاً');
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

function initPage(category) {
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

        let res = engine[activeToolId] ? engine[activeToolId](data) : 'Under Development';

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

// Global Init
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modal').onclick = (e) => {
        if (e.target.id === 'modal') closeModal();
    }
});

function search(q) {
    const v = q.toLowerCase();
    document.querySelectorAll('.tool-card').forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(v) ? 'flex' : 'none';
    });
}
