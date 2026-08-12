import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ToolModal from './components/ToolModal';

// Icons
import { 
  FileText, Combine, Split, Image as ImageIcon, Zap, Crop, 
  Sliders, Music, Scissors, Camera, Sparkles, Video, MessageCircle, 
  PackageCheck, Star, ArrowUpRight, ShieldCheck, Heart, Terminal
} from 'lucide-react';

// Tool Components
import { PdfMerger, ImagesToPdf, PdfSplitter } from './components/tools/PdfTools';
import { ImageCompressor, ImageCropResize, ImageFilters } from './components/tools/ImageTools';
import { AudioConverter, AudioTrimmer } from './components/tools/AudioTools';
import { BioGenerator, FancyTextDecorator, CaptionGenerator, WhatsappLinkBuilder } from './components/tools/SocialTools';
import { CreatorBundle, DocumentBundle } from './components/tools/ToolBundles';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(['img-compress', 'pdf-merge', 'insta-bio']);
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
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
      badge: 'جديد',
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
      badge: 'مفيد',
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
      id: 'fancy-text',
      category: 'social',
      categoryLabel: 'السوشيال ميديا',
      title: 'مزخرف النصوص والأسماء',
      description: 'زخرفة النصوص والأسماء باللغتين العربية والإنجليزية بأشكال متعددة.',
      icon: Sparkles,
      iconColor: '#f59e0b',
      badge: 'شائع',
      component: FancyTextDecorator
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
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    
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
            <div style={{ maxWidth: '700px' }}>
              <span className="badge badge-purple" style={{ marginBottom: '1rem' }}>✨ منصة الأدوات المجانية 100%</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.3, marginBottom: '0.75rem' }}>
                كل الأدوات اليومية التي تحتاجهـا في <span className="gradient-text">مكان واحد!</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                أدوات الـ PDF، ضغط وتقطيع الصور، محولات الصوتيات، ومولدات بايو وكابشن شبكات التواصل الاجتماعي - كل ذلك يعمل مباشرة داخل متصفحك بسرعة فايقة وبسرية تامة.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-gradient" onClick={() => setActiveCategory('bundles')}>
                  <PackageCheck size={18} /> تجربة حزم الأدوات المدمجة
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={18} color="#10b981" /> بدون تسجيل أو رفع للملفات
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
            {activeCategory === 'all' && 'جميع الأدوات المتاحة'}
            {activeCategory === 'pdf' && '📄 أدوات ملفات PDF'}
            {activeCategory === 'images' && '🖼️ أدوات واستوديو الصور'}
            {activeCategory === 'audio' && '🎵 أدوات الصوتيات والـ MP3'}
            {activeCategory === 'social' && '📱 أدوات السوشيال ميديا والتكست'}
            {activeCategory === 'bundles' && '📦 حزم الأدوات المدمجة'}
            {activeCategory === 'favorites' && '⭐ أدواتك المفضلة'}
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.5rem' }}>
              ({filteredTools.length})
            </span>
          </h3>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>لم نجد أي أداة مطابقة لبحثك.</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>جرب البحث عن كلمة أخرى أو تصفح التصنيفات.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              const isFav = favorites.includes(tool.id);

              return (
                <div
                  key={tool.id}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onClick={() => setActiveTool(tool)}
                >
                  <div>
                    {/* Top Row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                        <Icon size={24} color={tool.iconColor} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="badge badge-purple">{tool.badge}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(tool.id);
                          }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: isFav ? '#f59e0b' : 'var(--text-dim)', padding: '0.2rem' }}
                        >
                          <Star size={18} fill={isFav ? '#f59e0b' : 'none'} />
                        </button>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>{tool.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>{tool.description}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: 700 }}>تشغيل الأداة</span>
                    <ArrowUpRight size={18} color="var(--accent-purple)" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Tool Modal Launcher */}
      {activeTool && (
        <ToolModal
          tool={activeTool}
          onClose={() => setActiveTool(null)}
          isFavorite={favorites.includes(activeTool.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(9, 13, 22, 0.95)', padding: '1.5rem', textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          منصة الأدوات الشاملة (OmniTools) © 2026 - جميع الأدوات تعمل مجاناً وحلياً على جهازك 100%.
        </p>
      </footer>

    </div>
  );
}
