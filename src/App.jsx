import React, { useState, useEffect, lazy } from 'react';
import Navbar from './components/Navbar';
import ToolModal from './components/ToolModal';
import LegalModal from './components/legal/LegalModal';
import { LanguageProvider, useLanguage } from './locales/LanguageContext';

// Icons
import { 
  FileText, Combine, Split, Image as ImageIcon, Zap, Crop, 
  Sliders, Music, Scissors, Camera, Sparkles, Video, MessageCircle, 
  PackageCheck, Star, ArrowUpRight, ShieldCheck, Heart, Terminal,
  QrCode, Code2, Lock, KeyRound, Palette, Layers, Shield, FileCheck2, Info
} from 'lucide-react';

// Lazy Loaded Tool Components for Ultra-Fast Initial Load
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

function MainApp() {
  const { lang, t, isRtl } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState(null);
  const [activeLegalModal, setActiveLegalModal] = useState(null);

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

  const toolDefinitions = [
    // QR Tools
    {
      id: 'qr-generator',
      category: 'qr',
      icon: QrCode,
      iconColor: '#8b5cf6',
      component: QrGenerator
    },

    // PDF Tools
    {
      id: 'pdf-merge',
      category: 'pdf',
      icon: Combine,
      iconColor: '#8b5cf6',
      component: PdfMerger
    },
    {
      id: 'pdf-split',
      category: 'pdf',
      icon: Split,
      iconColor: '#ec4899',
      component: PdfSplitter
    },
    {
      id: 'img-to-pdf',
      category: 'pdf',
      icon: ImageIcon,
      iconColor: '#06b6d4',
      component: ImagesToPdf
    },

    // Image Tools
    {
      id: 'img-compress',
      category: 'images',
      icon: Zap,
      iconColor: '#10b981',
      component: ImageCompressor
    },
    {
      id: 'img-crop',
      category: 'images',
      icon: Crop,
      iconColor: '#f59e0b',
      component: ImageCropResize
    },
    {
      id: 'img-filters',
      category: 'images',
      icon: Sliders,
      iconColor: '#ec4899',
      component: ImageFilters
    },

    // Text Tools
    {
      id: 'text-counter',
      category: 'text',
      icon: FileText,
      iconColor: '#06b6d4',
      component: TextCounter
    },
    {
      id: 'fancy-text',
      category: 'text',
      icon: Sparkles,
      iconColor: '#f59e0b',
      component: FancyTextDecorator
    },

    // Dev Tools
    {
      id: 'json-formatter',
      category: 'dev',
      icon: Code2,
      iconColor: '#8b5cf6',
      component: JsonFormatter
    },
    {
      id: 'base64-tool',
      category: 'dev',
      icon: Lock,
      iconColor: '#06b6d4',
      component: Base64Tool
    },
    {
      id: 'security-suite',
      category: 'dev',
      icon: KeyRound,
      iconColor: '#10b981',
      component: SecuritySuite
    },

    // Color Tools
    {
      id: 'color-studio',
      category: 'colors',
      icon: Palette,
      iconColor: '#ec4899',
      component: ColorStudio
    },

    // Audio Tools
    {
      id: 'audio-convert',
      category: 'audio',
      icon: Music,
      iconColor: '#8b5cf6',
      component: AudioConverter
    },
    {
      id: 'audio-trim',
      category: 'audio',
      icon: Scissors,
      iconColor: '#06b6d4',
      component: AudioTrimmer
    },

    // Social Tools
    {
      id: 'insta-bio',
      category: 'social',
      icon: Camera,
      iconColor: '#ec4899',
      component: BioGenerator
    },
    {
      id: 'caption-gen',
      category: 'social',
      icon: Video,
      iconColor: '#06b6d4',
      component: CaptionGenerator
    },
    {
      id: 'wa-link',
      category: 'social',
      icon: MessageCircle,
      iconColor: '#10b981',
      component: WhatsappLinkBuilder
    },

    // Bundles
    {
      id: 'creator-pack',
      category: 'bundles',
      icon: PackageCheck,
      iconColor: '#8b5cf6',
      component: CreatorBundle
    },
    {
      id: 'doc-pack',
      category: 'bundles',
      icon: PackageCheck,
      iconColor: '#06b6d4',
      component: DocumentBundle
    }
  ];

  // Map dynamic translations to each tool
  const tools = toolDefinitions.map((tDef) => {
    const localized = t(tDef.id, 'tools') || {};
    return {
      ...tDef,
      title: localized.title || tDef.id,
      description: localized.description || '',
      badge: localized.badge || '',
      categoryLabel: localized.categoryLabel || t(tDef.category, 'categories')
    };
  });

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
            <div style={{ maxWidth: '780px' }}>
              <span className="badge badge-purple" style={{ marginBottom: '1rem' }}>
                {t('badge', 'hero')}
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.3, marginBottom: '0.75rem' }}>
                {t('title1', 'hero')} <span className="gradient-text">{t('titleGradient', 'hero')}</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {t('description', 'hero')}
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-gradient" onClick={() => setActiveCategory('qr')}>
                  <QrCode size={18} /> {t('ctaQr', 'hero')}
                </button>
                <button className="btn-secondary" onClick={() => setActiveCategory('bundles')}>
                  <PackageCheck size={18} /> {t('ctaBundles', 'hero')}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={18} color="#10b981" /> {t('securityBadge', 'hero')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tools Grid Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              {t(activeCategory, 'categories')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {t('foundTools', 'common')} ({filteredTools.length}) {t('readyToUse', 'common')}
            </p>
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filteredTools.map((tItem) => {
            const Icon = tItem.icon;
            const isFav = favorites.includes(tItem.id);
            return (
              <div
                key={tItem.id}
                className="tool-card animate-fade-in"
                onClick={() => setActiveTool(tItem)}
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
                      <Icon size={22} color={tItem.iconColor} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {tItem.badge && (
                        <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{tItem.badge}</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(tItem.id);
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', color: isFav ? '#f59e0b' : 'var(--text-muted)' }}
                        title={t('addToFav', 'common')}
                      >
                        <Star size={18} fill={isFav ? '#f59e0b' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {tItem.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {tItem.description}
                  </p>
                </div>

                {/* Bottom Card Action */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-purple)' }}>
                  <span>{t('runTool', 'common')}</span>
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
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{t('emptySearchTitle', 'common')}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{t('emptySearchDesc', 'common')}</p>
            <button className="btn-gradient" style={{ marginTop: '1.25rem' }} onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
              {t('viewAll', 'common')}
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

      {/* Legal & Policy Modals (AdSense Requirements) */}
      {activeLegalModal && (
        <LegalModal
          type={activeLegalModal}
          onClose={() => setActiveLegalModal(null)}
        />
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(9, 13, 22, 0.95)', padding: '2rem 1.5rem', marginTop: '3rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontWeight: 800, fontSize: '1.05rem' }}>{t('siteTitle', 'common')}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{t('copyright', 'common')}</p>
            </div>

            {/* Legal Links for AdSense Approval */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <button
                onClick={() => setActiveLegalModal('privacy')}
                style={{ background: 'none', border: 'none', color: 'var(--accent-purple)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, padding: 0 }}
              >
                {t('privacyPolicy', 'common')}
              </button>
              <span style={{ color: 'var(--border-color)' }}>•</span>
              <button
                onClick={() => setActiveLegalModal('terms')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, padding: 0 }}
              >
                {t('termsOfService', 'common')}
              </button>
              <span style={{ color: 'var(--border-color)' }}>•</span>
              <button
                onClick={() => setActiveLegalModal('about')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, padding: 0 }}
              >
                {t('aboutUs', 'common')} / {t('contactUs', 'common')}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>{t('madeWithLove', 'common')}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={14} color="#10b981" /> Google AdSense & GDPR Ready
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
