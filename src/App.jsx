import React, { useState, useEffect, lazy } from 'react';
import Navbar from './components/Navbar';
import ToolModal from './components/ToolModal';

// Icons
import { 
  FileText, Combine, Split, Image as ImageIcon, Zap, Crop, 
  Sliders, Music, Scissors, Camera, Sparkles, Video, MessageCircle, 
  PackageCheck, Star, ArrowUpRight, ShieldCheck, Heart, Terminal,
  QrCode, Code2, Lock, KeyRound, Palette, Layers
} from 'lucide-react';

// Lazy Loaded Tool Components for Ultra-Fast Initial Load (Code Splitting)
const PdfMerger = lazy(() => import('./components/tools/PdfTools').then(m => ({ default: m.PdfMerger })));
const ImagesToPdf = lazy(() => import('./components/tools/PdfTools').then(m => ({ default: m.ImagesToPdf })));
const PdfSplitter = lazy(() => import('./components/tools/PdfTools').then(m => ({ default: m.PdfSplitter })));

const ImageCompressor = lazy(() => import('./components/tools/ImageTools').then(m => ({ default: m.ImageCompressor })));
const ImageCropResize = lazy(() => import('./components/tools/ImageTools').then(m => ({ default: m.ImageCropResize })));
const ImageFilters = lazy(() => import('./components/tools/ImageTools').then(m => ({ default: m.ImageFilters })));

const QrGenerator = lazy(() => import('./components/tools/QrTools').then(m => ({ default: m.QrGenerator })));

const TextCounter = lazy(() => import('./components/tools/TextTools').then(m => ({ default: m.TextCounter })));

const JsonFormatter = lazy(() => import('./components/tools/DevTools').then(m => ({ default: m.JsonFormatter })));
const Base64Tool = lazy(() => import('./components/tools/DevTools').then(m => ({ default: m.Base64Tool })));
const SecuritySuite = lazy(() => import('./components/tools/DevTools').then(m => ({ default: m.SecuritySuite })));

const ColorStudio = lazy(() => import('./components/tools/ColorTools').then(m => ({ default: m.ColorStudio })));

const AudioConverter = lazy(() => import('./components/tools/AudioTools').then(m => ({ default: m.AudioConverter })));
const AudioTrimmer = lazy(() => import('./components/tools/AudioTools').then(m => ({ default: m.AudioTrimmer })));

const BioGenerator = lazy(() => import('./components/tools/SocialTools').then(m => ({ default: m.BioGenerator })));
const FancyTextDecorator = lazy(() => import('./components/tools/SocialTools').then(m => ({ default: m.FancyTextDecorator })));
const CaptionGenerator = lazy(() => import('./components/tools/SocialTools').then(m => ({ default: m.CaptionGenerator })));
const WhatsappLinkBuilder = lazy(() => import('./components/tools/SocialTools').then(m => ({ default: m.WhatsappLinkBuilder })));

const CreatorBundle = lazy(() => import('./components/tools/ToolBundles').then(m => ({ default: m.CreatorBundle })));
const DocumentBundle = lazy(() => import('./components/tools/ToolBundles').then(m => ({ default: m.DocumentBundle })));

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState(null);

  // Synchronize favorites with LocalStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('omnitools_favorites');
      return saved ? JSON.parse(saved) : ['qr-generator', 'img-compress', 'pdf-merge', 'text-counter', 'json-formatter'];
    } catch {
      return ['qr-generator', 'img-compress', 'pdf-merge', 'text-counter'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('omnitools_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const tools = [
    // QR Tools
    {
      id: 'qr-generator',
      category: 'qr',
      categoryLabel: 'رموز الـ QR',
      title: 'استوديو الـ QR Code الذكي',
      description: 'أنشئ رموز QR مخصصة للروابط والواي فاي والهواتف مع تحكم كامل بالألوان.',
      icon: QrCode,
      iconColor: '#8b5cf6',
      badge: 'جديد ومميز ⚡',
      component: QrGenerator
    },

    // PDF Tools
    {
      id: 'pdf-merge',
      category: 'pdf',
      categoryLabel: 'أدوات PDF',
      title: 'دمج ملفات PDF',
      description: 'تجميع عدة ملفات PDF في مستند واحد مرتّب وبسرعة عالية في المتصفح.',
      icon: Combine,
      iconColor: '#8b5cf6',
      badge: 'شائع',
      component: PdfMerger
    },
    {
      id: 'pdf-split',
      category: 'pdf',
      categoryLabel: 'أدوات PDF',
      title: 'استخراج وتقسيم الـ PDF',
      description: 'حدد أرقام الصفحات واستخرجها في ملف PDF مستقل.',
      icon: Split,
      iconColor: '#ec4899',
      badge: 'مفيد',
      component: PdfSplitter
    },
    {
      id: 'img-to-pdf',
      category: 'pdf',
      categoryLabel: 'أدوات PDF',
      title: 'تحويل الصور إلى PDF',
      description: 'حَوّل مجموعة من الصور (JPG/PNG) إلى ملف PDF احترافي وموحد.',
      icon: ImageIcon,
      iconColor: '#06b6d4',
      badge: 'أساسي',
      component: ImagesToPdf
    },

    // Image Tools
    {
      id: 'img-compress',
      category: 'images',
      categoryLabel: 'أدوات الصور',
      title: 'ضغط وتقليل حجم الصور',
      description: 'قلّل حجم صورك بنسبة تصل إلى 80% مع المعاينة الفورية لفرق الجودة والحجم.',
      icon: Zap,
      iconColor: '#10b981',
      badge: 'أكثر استخداماً',
      component: ImageCompressor
    },
    {
      id: 'img-crop',
      category: 'images',
      categoryLabel: 'أدوات الصور',
      title: 'قص وتعديل أبعاد الصور',
      description: 'اقتطع واضبط أبعاد الصور للمنشورات والستوري (1:1, 9:16, 16:9).',
      icon: Crop,
      iconColor: '#f59e0b',
      badge: 'أساسي',
      component: ImageCropResize
    },
    {
      id: 'img-filters',
      category: 'images',
      categoryLabel: 'أدوات الصور',
      title: 'استوديو الفلاتر والتأثيرات',
      description: 'تعديل السطوع، التباين، التشبع، وإضافة تأثيرات وتعديلات لونية سريعة.',
      icon: Sliders,
      iconColor: '#ec4899',
      badge: 'إبداعي',
      component: ImageFilters
    },

    // Text Tools
    {
      id: 'text-counter',
      category: 'text',
      categoryLabel: 'محلل النصوص',
      title: 'محلل وعداد النصوص الذكي',
      description: 'إحصاء الكلمات والحروف، تقدير وقت القراءة، وتنظيف وتغيير حالة الأحرف.',
      icon: FileText,
      iconColor: '#06b6d4',
      badge: 'جديد 📝',
      component: TextCounter
    },
    {
      id: 'fancy-text',
      category: 'text',
      categoryLabel: 'محلل النصوص',
      title: 'مزخرف النصوص والأسماء',
      description: 'زخرفة النصوص والأسماء باللغتين العربية والإنجليزية بأشكال متعددة.',
      icon: Sparkles,
      iconColor: '#f59e0b',
      badge: 'شائع',
      component: FancyTextDecorator
    },

    // Dev Tools
    {
      id: 'json-formatter',
      category: 'dev',
      categoryLabel: 'المطورين',
      title: 'منسق ومحول JSON & CSV',
      description: 'تنسيق وترتيب كود JSON، ضغطه، التحقق من الأخطاء، والتحويل لـ CSV.',
      icon: Code2,
      iconColor: '#8b5cf6',
      badge: 'تقني 💻',
      component: JsonFormatter
    },
    {
      id: 'base64-tool',
      category: 'dev',
      categoryLabel: 'المطورين',
      title: 'مشفر ومفكك Base64',
      description: 'تحويل وتشفير النصوص والصور والملفات لصيغة Base64 والعكس.',
      icon: Lock,
      iconColor: '#06b6d4',
      badge: 'سريع',
      component: Base64Tool
    },
    {
      id: 'security-suite',
      category: 'dev',
      categoryLabel: 'المطورين',
      title: 'مولد كلمات المرور والهاشات',
      description: 'توليد كلمات سر قوية مشفرة عشوائياً وحساب تجزئة SHA-256 محلياً.',
      icon: KeyRound,
      iconColor: '#10b981',
      badge: 'أمان 🔒',
      component: SecuritySuite
    },

    // Color Tools
    {
      id: 'color-studio',
      category: 'colors',
      categoryLabel: 'الألوان والتصميم',
      title: 'استوديو الألوان والتدرجات',
      description: 'توليد تدرجات CSS حديثة، تحويل الألوان HEX/RGB، ونسخ الكود فورياً.',
      icon: Palette,
      iconColor: '#ec4899',
      badge: 'إبداعي 🎨',
      component: ColorStudio
    },

    // Audio Tools
    {
      id: 'audio-convert',
      category: 'audio',
      categoryLabel: 'الصوتيات',
      title: 'محول الصيغ الصوتية (MP3/WAV)',
      description: 'حَول أي ملف صوتي من صيغ متعددة إلى MP3 أو WAV مباشرة.',
      icon: Music,
      iconColor: '#8b5cf6',
      badge: 'مفضل',
      component: AudioConverter
    },
    {
      id: 'audio-trim',
      category: 'audio',
      categoryLabel: 'الصوتيات',
      title: 'قاطع ومُقطع الصوتيات',
      description: 'حدد التوقيت الزمني وقص مقطع صوّتي محدد بوضوح.',
      icon: Scissors,
      iconColor: '#06b6d4',
      badge: 'سريع',
      component: AudioTrimmer
    },

    // Social Tools
    {
      id: 'insta-bio',
      category: 'social',
      categoryLabel: 'السوشيال ميديا',
      title: 'مولد بايو انستغرام',
      description: 'سير ذاتية جاهزة ومزخرفة بالإيموجي لتغيير بايو حسابك واجتذاب المتابعين.',
      icon: Camera,
      iconColor: '#ec4899',
      badge: 'تريند',
      component: BioGenerator
    },
    {
      id: 'caption-gen',
      category: 'social',
      categoryLabel: 'السوشيال ميديا',
      title: 'مولد كابشن تيك توك وفيسبوك',
      description: 'اقتراح منشورات تفاعلية وهاشتاجات نشطة لنشرها في منصتك.',
      icon: Video,
      iconColor: '#06b6d4',
      badge: 'ذكي',
      component: CaptionGenerator
    },
    {
      id: 'wa-link',
      category: 'social',
      categoryLabel: 'السوشيال ميديا',
      title: 'مولد رابط واتساب المباشر',
      description: 'أنشئ رابط مراسلة فورية لواتساب بدون حفظ رقم الهاتف.',
      icon: MessageCircle,
      iconColor: '#10b981',
      badge: 'مهم',
      component: WhatsappLinkBuilder
    },

    // Bundles
    {
      id: 'creator-pack',
      category: 'bundles',
      categoryLabel: 'حزم الأدوات',
      title: 'حزمة صناع المحتوى',
      description: 'منظومة كاملة: كابشن + زخرفة + ضغط الغلاف + بايو في شاشة واحدة متتابعة.',
      icon: PackageCheck,
      iconColor: '#8b5cf6',
      badge: 'حزمة شاملة ⚡',
      component: CreatorBundle
    },
    {
      id: 'doc-pack',
      category: 'bundles',
      categoryLabel: 'حزم الأدوات',
      title: 'حزمة المستندات',
      description: 'حوّل صورك لـ PDF ثم اجمعها ورتبها في ملف واحد متناسق.',
      icon: PackageCheck,
      iconColor: '#06b6d4',
      badge: 'حزمة مستندات',
      component: DocumentBundle
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredTools = tools.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'favorites') return favorites.includes(t.id) && matchesSearch;
    if (activeCategory === 'all') return matchesSearch;
    return t.category === activeCategory && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation Bar */}
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
      />

      {/* Main Container */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '2rem 1.5rem', flex: 1 }}>
        
        {/* Hero Section */}
        {activeCategory === 'all' && !searchQuery && (
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem', background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6), rgba(18, 24, 41, 0.8))', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: '750px' }}>
              <span className="badge badge-purple" style={{ marginBottom: '1rem' }}>✨ منصة الأدوات المتكاملة 100% بدون إنترنت (Offline PWA)</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.3, marginBottom: '0.75rem' }}>
                كل الأدوات اليومية التي تحتاجهـا في <span className="gradient-text">مكان واحد وبسرعة فائقة!</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                أدوات الـ PDF، استوديو الـ QR Code، محلل النصوص، حقيبة المطورين، ضغط الصور، محولات الصوتيات، وتوليد المحتوى - كل ذلك يعمل مباشرة داخل متصفحك بسرعة فايقة وبسرية تامة.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-gradient" onClick={() => setActiveCategory('qr')}>
                  <QrCode size={18} /> تجربة استوديو الـ QR
                </button>
                <button className="btn-secondary" onClick={() => setActiveCategory('bundles')}>
                  <PackageCheck size={18} /> حزم الأدوات المتسلسلة
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={18} color="#10b981" /> خصوصية تامة بدون رفع ملفات
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tools Grid Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              {activeCategory === 'all' && 'جميع الأدوات المتاحة'}
              {activeCategory === 'pdf' && 'أدوات مستندات الـ PDF'}
              {activeCategory === 'images' && 'استوديو تعديل وضغط الصور'}
              {activeCategory === 'qr' && 'استوديو رموز الـ QR'}
              {activeCategory === 'text' && 'أدوات ومحلل النصوص'}
              {activeCategory === 'dev' && 'حقيبة أدوات المطورين والبرمجة'}
              {activeCategory === 'colors' && 'استوديو الألوان والتدرجات'}
              {activeCategory === 'audio' && 'محولات وقواطع الصوتيات'}
              {activeCategory === 'social' && 'أدوات السوشيال ميديا وصناعة المحتوى'}
              {activeCategory === 'bundles' && 'حزم الأدوات المدمجة (خطوة بخطوة)'}
              {activeCategory === 'favorites' && 'أدواتك المفضلة'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              تم العثور على ({filteredTools.length}) أداة جاهزة للاستخدام الفوري.
            </p>
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filteredTools.map((t) => {
            const Icon = t.icon;
            const isFav = favorites.includes(t.id);
            return (
              <div
                key={t.id}
                className="tool-card animate-fade-in"
                onClick={() => setActiveTool(t)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Top Card Bar */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '0.75rem', borderRadius: '0.75rem' }}>
                      <Icon size={22} color={t.iconColor} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {t.badge && (
                        <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{t.badge}</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(t.id);
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', color: isFav ? '#f59e0b' : 'var(--text-muted)' }}
                        title="إضافة للمفضلة"
                      >
                        <Star size={18} fill={isFav ? '#f59e0b' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {t.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {t.description}
                  </p>
                </div>

                {/* Bottom Card Action */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-purple)' }}>
                  <span>تشغيل الأداة</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <Sparkles size={40} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>لم نجد أي أداة مطابقة لبحثك</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>جرب البحث بكلمات أخرى أو تصفح كل الفئات.</p>
            <button className="btn-gradient" style={{ marginTop: '1.25rem' }} onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
              عرض كل الأدوات
            </button>
          </div>
        )}

      </main>

      {/* Active Tool Modal */}
      {activeTool && (
        <ToolModal
          tool={activeTool}
          onClose={() => setActiveTool(null)}
          isFavorite={favorites.includes(activeTool.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(9, 13, 22, 0.95)', padding: '2rem 1.5rem', marginTop: '3rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontWeight: 800, fontSize: '1rem' }}>أدواتك | OmniTools Hub</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>جميع الحقوق محفوظة © 2026 - مفتوح المصدر (MIT)</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            صنع بكل <Heart size={16} color="#ef4444" fill="#ef4444" /> لخدمة المستخدم العربي
          </div>
        </div>
      </footer>

    </div>
  );
}
