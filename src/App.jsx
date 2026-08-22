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
  QrCode, Code2, Lock, KeyRound, Palette, Layers, Shield, FileCheck2, Info,
  ArrowRight
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
      iconColor: '#38bdf8',
      component: QrGenerator
    },

    // PDF Tools
    {
      id: 'pdf-merge',
      category: 'pdf',
      icon: Combine,
      iconColor: '#60a5fa',
      component: PdfMerger
    },
    {
      id: 'pdf-split',
      category: 'pdf',
      icon: Split,
      iconColor: '#00d2ff',
      component: PdfSplitter
    },
    {
      id: 'img-to-pdf',
      category: 'pdf',
      icon: ImageIcon,
      iconColor: '#38bdf8',
      component: ImagesToPdf
    },

    // Image Tools
    {
      id: 'img-compress',
      category: 'images',
      icon: Zap,
      iconColor: '#00d2ff',
      component: ImageCompressor
    },
    {
      id: 'img-crop',
      category: 'images',
      icon: Crop,
      iconColor: '#60a5fa',
      component: ImageCropResize
    },
    {
      id: 'img-filters',
      category: 'images',
      icon: Sliders,
      iconColor: '#93c5fd',
      component: ImageFilters
    },

    // Text Tools
    {
      id: 'text-counter',
      category: 'text',
      icon: FileText,
      iconColor: '#38bdf8',
      component: TextCounter
    },
    {
      id: 'fancy-text',
      category: 'text',
      icon: Sparkles,
      iconColor: '#60a5fa',
      component: FancyTextDecorator
    },

    // Dev Tools
    {
      id: 'json-formatter',
      category: 'dev',
      icon: Code2,
      iconColor: '#38bdf8',
      component: JsonFormatter
    },
    {
      id: 'base64-tool',
      category: 'dev',
      icon: Lock,
      iconColor: '#60a5fa',
      component: Base64Tool
    },
    {
      id: 'security-suite',
      category: 'dev',
      icon: KeyRound,
      iconColor: '#00d2ff',
      component: SecuritySuite
    },

    // Color Tools
    {
      id: 'color-studio',
      category: 'colors',
      icon: Palette,
      iconColor: '#60a5fa',
      component: ColorStudio
    },

    // Audio Tools
    {
      id: 'audio-convert',
      category: 'audio',
      icon: Music,
      iconColor: '#38bdf8',
      component: AudioConverter
    },
    {
      id: 'audio-trim',
      category: 'audio',
      icon: Scissors,
      iconColor: '#93c5fd',
      component: AudioTrimmer
    },

    // Social Tools
    {
      id: 'insta-bio',
      category: 'social',
      icon: Camera,
      iconColor: '#60a5fa',
      component: BioGenerator
    },
    {
      id: 'caption-gen',
      category: 'social',
      icon: Video,
      iconColor: '#38bdf8',
      component: CaptionGenerator
    },
    {
      id: 'wa-link',
      category: 'social',
      icon: MessageCircle,
      iconColor: '#00d2ff',
      component: WhatsappLinkBuilder
    },

    // Bundles
    {
      id: 'creator-pack',
      category: 'bundles',
      icon: PackageCheck,
      iconColor: '#38bdf8',
      component: CreatorBundle
    },
    {
      id: 'doc-pack',
      category: 'bundles',
      icon: PackageCheck,
      iconColor: '#60a5fa',
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
      <main style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', padding: '1.75rem 1.25rem', flex: 1 }}>
        
        {/* Hero Section */}
        {activeCategory === 'all' && !searchQuery && (
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              marginBottom: '2.5rem',
              background: 'radial-gradient(ellipse at top right, rgba(37, 99, 235, 0.22), transparent 70%), linear-gradient(135deg, rgba(14, 28, 62, 0.85), rgba(7, 13, 29, 0.95))',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(59, 130, 246, 0.28)'
            }}
          >
            {/* Ambient Background Glow */}
            <div style={{
              position: 'absolute',
              top: '-80px',
              right: isRtl ? 'auto' : '-80px',
              left: isRtl ? '-80px' : 'auto',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(0, 210, 255, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '820px', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                <span className="badge badge-blue" style={{ fontSize: '0.78rem', background: 'rgba(37, 99, 235, 0.2)' }}>
                  {t('badge', 'hero')}
                </span>
              </div>

              <h2 className="hero-title" style={{ fontSize: '2.25rem', fontWeight: 900, lineHeight: 1.25, marginBottom: '0.85rem', color: '#ffffff' }}>
                {t('title1', 'hero')} <span className="gradient-text">{t('titleGradient', 'hero')}</span>
              </h2>

              <p className="hero-desc" style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: '720px' }}>
                {t('description', 'hero')}
              </p>
              
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button className="btn-gradient" onClick={() => setActiveCategory('qr')}>
                  <QrCode size={17} /> {t('ctaQr', 'hero')}
                </button>
                <button className="btn-secondary" onClick={() => setActiveCategory('bundles')}>
                  <PackageCheck size={17} color="#38bdf8" /> {t('ctaBundles', 'hero')}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: '#93c5fd', padding: '0.4rem 0.6rem' }}>
                  <ShieldCheck size={17} color="#38bdf8" /> {t('securityBadge', 'hero')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tools Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.2px' }}>
              {t(activeCategory, 'categories')}
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginTop: '0.15rem' }}>
              {t('foundTools', 'common')} ({filteredTools.length}) {t('readyToUse', 'common')}
            </p>
          </div>
        </div>

        {/* Responsive Tools Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(285px, 1fr))',
          gap: '1.15rem'
        }}>
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
                  minHeight: '215px'
                }}
              >
                <div>
                  {/* Top Card Bar */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(6, 182, 212, 0.15))',
                      padding: '0.65rem',
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(59, 130, 246, 0.25)'
                    }}>
                      <Icon size={21} color={tItem.iconColor || '#38bdf8'} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {tItem.badge && (
                        <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                          {tItem.badge}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(tItem.id);
                        }}
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '0.45rem',
                          cursor: 'pointer',
                          padding: '0.35rem',
                          color: isFav ? '#f59e0b' : '#64748b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease'
                        }}
                        title={t('addToFav', 'common')}
                      >
                        <Star size={16} fill={isFav ? '#f59e0b' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 style={{ fontSize: '1.08rem', fontWeight: 800, marginBottom: '0.45rem', color: '#ffffff', lineHeight: 1.3 }}>
                    {tItem.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.55 }}>
                    {tItem.description}
                  </p>
                </div>

                {/* Bottom Card Action Link */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1.15rem',
                  paddingTop: '0.7rem',
                  borderTop: '1px solid rgba(59, 130, 246, 0.12)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#60a5fa'
                }}>
                  <span>{t('runTool', 'common')}</span>
                  <ArrowUpRight size={15} color="#38bdf8" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <Sparkles size={42} color="#60a5fa" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{t('emptySearchTitle', 'common')}</h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '0.4rem' }}>{t('emptySearchDesc', 'common')}</p>
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

      {/* Legal & Policy Modals */}
      {activeLegalModal && (
        <LegalModal
          type={activeLegalModal}
          onClose={() => setActiveLegalModal(null)}
        />
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(59, 130, 246, 0.15)',
        background: '#040916',
        padding: '2.25rem 1.25rem',
        marginTop: '3.5rem'
      }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff' }}>{t('siteTitle', 'common')}</p>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>{t('copyright', 'common')}</p>
            </div>

            {/* Legal Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.84rem' }}>
              <button
                onClick={() => setActiveLegalModal('privacy')}
                style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, padding: 0 }}
              >
                {t('privacyPolicy', 'common')}
              </button>
              <span style={{ color: 'rgba(59, 130, 246, 0.3)' }}>•</span>
              <button
                onClick={() => setActiveLegalModal('terms')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, padding: 0 }}
              >
                {t('termsOfService', 'common')}
              </button>
              <span style={{ color: 'rgba(59, 130, 246, 0.3)' }}>•</span>
              <button
                onClick={() => setActiveLegalModal('about')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, padding: 0 }}
              >
                {t('aboutUs', 'common')} / {t('contactUs', 'common')}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(59, 130, 246, 0.1)', paddingTop: '1rem', fontSize: '0.8rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span>{t('madeWithLove', 'common')}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#38bdf8' }}>
              <ShieldCheck size={15} color="#00d2ff" /> Google AdSense & GDPR Ready
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
