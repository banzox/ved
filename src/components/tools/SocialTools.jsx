import React, { useState } from 'react';
import { Share2, Copy, Check, Sparkles, MessageCircle, Camera, Video, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export function BioGenerator() {
  const [category, setCategory] = useState('tech');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [generatedBio, setGeneratedBio] = useState('');
  const [copied, setCopied] = useState(false);

  const biosData = {
    tech: [
      (n, t) => `🚀 | ${n || 'مطور وسنّاع مجد'}\n💼 | ${t || 'صانع محتوى تقني وخبير برمجيات'}\n🌐 | تبسيط التقنية والبرمجة باللغة العربية\n👇 | تصفح مشاريعي الأخيرة من الرابط:`,
      (n, t) => `💻 ${n || 'شغوف بالتطوير'}\n✨ ${t || 'مصمم ومنشئ تطبيقات'}\n⚡ نحو مستقبل تقني أسرع وأسهل\n📌 تابع جديدي يومياً ⬇️`,
    ],
    business: [
      (n, t) => `🏆 | ${n || 'رائد أعمال'}\n📈 | ${t || 'مستشار تسويق وبناء براندات'}\n🎯 | نساعدك في زيادة مبيعاتك ونمو مشروعك\n📩 | للتواصل والاستشارات الخاطفة ⬇️`,
      (n, t) => `💎 ${n || 'عالم الأعمال'}\n🔥 ${t || 'صانع الفرص والاستثمارات'}\n✨ الأفكار العظيمة تبدأ بخطوة صغيرة`,
    ],
    personal: [
      (n, t) => `🌿 | ${n || 'عاشق للشغف والمعرفة'}\n📸 | ${t || 'أشارك يومياتي والتجارب الملهمة'}\n✨ كن أنت التغيير الذي تتمنى رؤيته\n📍 الخرطوم | الرياض | دبي`,
      (n, t) => `✨ ${n || 'حالم ومبتكر'}\n🎧 الموزيك | القراءة | السفر والتصوير\n💫 أثر يدوم وفكرة تستحق`,
    ],
    aesthetic: [
      (n, t) => `𝒲𝑒𝓁𝒸𝑜𝓂𝑒 𝓉𝑜 𝓂𝓎 𝓌𝑜𝓇𝓁𝒹 ✨\n👤 | ${n || 'أناقة وبساطة'}\n🎨 | ${t || 'فنون وتصمِيم صامت'}\n☽ 𝒮𝓉𝒶𝓎 𝒸𝒶𝓁𝓂 𝒶𝓃𝒹 𝒸𝓇𝑒𝒶𝓉𝑒 ♡`,
    ]
  };

  const handleGenerate = () => {
    const templates = biosData[category] || biosData.tech;
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    const result = randomTemplate(name, title);
    setGeneratedBio(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBio);
    setCopied(true);
    confetti({ particleCount: 60 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Camera size={20} color="var(--accent-pink)" /> مولد بايو انستغرام احترافي
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>ولّد سير ذاتية (Bio) مجهزة بالإيموجي والتنسيقات الجذابة لحسابك.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>اسم الحساب / الشخصية:</label>
          <input type="text" className="glass-input" placeholder="مثال: أحمد علي" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>المجال / التخصص:</label>
          <input type="text" className="glass-input" placeholder="مثال: مصمم جرافيك، رائد أعمال" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </div>

      <div>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>تصنيف البايو:</label>
        <select className="glass-input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="tech">💻 تقني ومطور (Tech & Developer)</option>
          <option value="business">💼 أعمال وتجسير مبيعات (Business)</option>
          <option value="personal">✨ شخصي ويلهم (Personal & Lifestyle)</option>
          <option value="aesthetic">🎨 جمالي وأنيق (Aesthetic Fonts)</option>
        </select>
      </div>

      <button onClick={handleGenerate} className="btn-gradient">
        <Sparkles size={18} /> توليد بايو جديد الآن
      </button>

      {generatedBio && (
        <div style={{ background: 'rgba(18, 24, 41, 0.9)', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid var(--accent-pink)', position: 'relative' }}>
          <pre style={{ fontFamily: 'inherit', fontSize: '0.95rem', whiteSpace: 'pre-wrap', color: '#fff', lineHeight: 1.6 }}>{generatedBio}</pre>
          
          <button onClick={copyToClipboard} className="btn-secondary" style={{ marginTop: '1rem', width: '100%' }}>
            {copied ? <><Check size={18} color="#10b981" /> تم النسخ بنجاح!</> : <><Copy size={18} /> نسخ البايو للحافظة</>}
          </button>
        </div>
      )}
    </div>
  );
}

export function FancyTextDecorator() {
  const [inputText, setInputText] = useState('أدواتك المجانية');

  const arabicDecorations = [
    (text) => `✨ ﴿ ${text} ﴾ ✨`,
    (text) => `★彡 [ ${text} ] 彡★`,
    (text) => `░▒▓█ ${text} █▓▒░`,
    (text) => `⚡ « ${text} » ⚡`,
    (text) => `◈⚙️◈ ${text} ◈⚙️◈`,
    (text) => `👑 ⦓ ${text} ⦔ 👑`,
    (text) => `✦✧✦ ${text} ✦✧✦`,
  ];

  const copyText = (decorated) => {
    navigator.clipboard.writeText(decorated);
    confetti({ particleCount: 50 });
    alert('تم نسخ النص المزخرف!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Sparkles size={20} color="var(--accent-purple)" /> زخرفة النصوص والأسماء
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>أدخل أي نص أو اسم باللغة العربية أو الإنجليزية واصل على نصوص مزخرفة بضغطة زر.</p>

      <input type="text" className="glass-input" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="أدخل النص هنا..." />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {arabicDecorations.map((fn, i) => {
          const decorated = fn(inputText || 'نص تجريبي');
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '1rem', fontWeight: 600 }}>{decorated}</span>
              <button onClick={() => copyText(decorated)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                <Copy size={14} /> نسخ
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CaptionGenerator() {
  const [platform, setPlatform] = useState('tiktok');
  const [topic, setTopic] = useState('');
  const [resultCaption, setResultCaption] = useState('');

  const handleGenerate = () => {
    const hashtags = '#اكسبلور #تيك_توك #تصميم #محتوى #تريند #فيديو';
    let baseText = '';
    if (platform === 'tiktok') {
      baseText = `🔥 سر جديد سيعجبك بالتأكيد حول (${topic || 'هذا الموضوع'})!\nجربه الآن وشاهد الفرق بنفسك 👀👇\n\nلا تنسَ الفولو واللايك للمزيد! ❤️\n\n${hashtags}`;
    } else if (platform === 'facebook') {
      baseText = `📌 هل تساءلت يوماً عن أهمية (${topic || 'هذا الفكر المبدع'})؟\nإليك أهم 3 خطوات سريعة لتطبيقها بنجاح اليوم:\n1️⃣ التخطيط الجيد.\n2️⃣ الاستمرارية والتطبيق.\n3️⃣ التطوير المستمر.\n\nشاركونا آرائكم في التعليقات! 👇💬\n\n#فيسبوك #محتوى_قيم #أعمال`;
    } else {
      baseText = `✨ إلهام اليوم حول (${topic || 'صناعة الإبداع'}):\n"النجاح يتكون من خطوات صغيرة يومية." 💡\n\nاحفظ المنشور للمراجعة لاحقاً 📌\n\n#انستغرام #إلهام #تطوير_الذات`;
    }

    setResultCaption(baseText);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Video size={20} color="var(--accent-cyan)" /> مولد كابشن فيسبوك وتيك توك
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>أصنع منشورات وكابشن تفاعلي مع الهاشتاجات النشطة لمنصاتك.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>المنصة المستهدفة:</label>
          <select className="glass-input" value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="tiktok">🎵 تيك توك (TikTok)</option>
            <option value="facebook">📘 فيسبوك (Facebook)</option>
            <option value="instagram">📸 انستغرام (Instagram)</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>موضوع المنشور:</label>
          <input type="text" className="glass-input" placeholder="مثال: التسويق، البرمجة..." value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
      </div>

      <button onClick={handleGenerate} className="btn-gradient">
        <Sparkles size={18} /> توليد كابشن واقتراح هاشتاجات
      </button>

      {resultCaption && (
        <div style={{ background: 'rgba(18, 24, 41, 0.9)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--accent-cyan)' }}>
          <pre style={{ fontFamily: 'inherit', fontSize: '0.9rem', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{resultCaption}</pre>
          <button onClick={() => { navigator.clipboard.writeText(resultCaption); alert('تم نسخ الكابشن!'); }} className="btn-secondary" style={{ marginTop: '0.75rem', width: '100%' }}>
            <Copy size={16} /> نسخ النص كاملاً
          </button>
        </div>
      )}
    </div>
  );
}

export function WhatsappLinkBuilder() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('السلام عليكم، أود الاستفسار عن...');
  const [generatedLink, setGeneratedLink] = useState('');

  const buildLink = () => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) return alert('يرجى كتابة رقم الهاتف شاملاً رمز الدولة بدون +');
    const encodedMsg = encodeURIComponent(message);
    const url = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
    setGeneratedLink(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MessageCircle size={20} color="#10b981" /> مولد رابط واتساب المباشر
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>أنشئ رابط مراسلة فورية لواتساب بدون الحاجة لحفظ الرقم في جهات الاتصال.</p>

      <div>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>رقم الهاتف مع رمز الدولة (مثال: 249912345678):</label>
        <input type="text" className="glass-input" placeholder="2499xxxxxxx أو 9665xxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>رسالة ترحيبية مجهزة مسبقاً:</label>
        <textarea className="glass-input" rows="3" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      <button onClick={buildLink} className="btn-gradient" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
        <Send size={18} /> إنشاء الرابط المباشر
      </button>

      {generatedLink && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #10b981', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ fontSize: '0.85rem', wordBreak: 'break-all', fontWeight: 600, color: '#34d399' }}>{generatedLink}</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a href={generatedLink} target="_blank" rel="noreferrer" className="btn-gradient" style={{ flex: 1, textDecoration: 'none' }}>
              <Send size={16} /> فتح الدردشة الآن
            </a>
            <button onClick={() => { navigator.clipboard.writeText(generatedLink); alert('تم نسخ الرابط!'); }} className="btn-secondary">
              <Copy size={16} /> نسخ الرابط
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
