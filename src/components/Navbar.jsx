import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Star, Layers, FileText, Image, Music, Share2, PackageCheck, QrCode, Code2, Palette, Globe, Smartphone, ChevronDown } from 'lucide-react';
import { useLanguage } from '../locales/LanguageContext';

export default function Navbar({ activeCategory, setActiveCategory, searchQuery, setSearchQuery, favoritesCount }) {
  const { lang, setLanguage, t, isRtl } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setCanInstall(false);
    }
    setDeferredPrompt(null);
  };

  const languages = [
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  const categories = [
    { id: 'all', label: t('all', 'categories'), icon: Layers },
    { id: 'pdf', label: t('pdf', 'categories'), icon: FileText },
    { id: 'images', label: t('images', 'categories'), icon: Image },
    { id: 'qr', label: t('qr', 'categories'), icon: QrCode },
    { id: 'text', label: t('text', 'categories'), icon: FileText },
    { id: 'dev', label: t('dev', 'categories'), icon: Code2 },
    { id: 'colors', label: t('colors', 'categories'), icon: Palette },
    { id: 'audio', label: t('audio', 'categories'), icon: Music },
    { id: 'social', label: t('social', 'categories'), icon: Share2 },
    { id: 'bundles', label: t('bundles', 'categories'), icon: PackageCheck },
    { id: 'favorites', label: `${t('favorites', 'categories')} (${favoritesCount})`, icon: Star },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
      background: 'rgba(5, 11, 24, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)'
    }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0.85rem 1.25rem' }}>
        
        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem' }}>
          
          {/* Brand Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
            onClick={() => setActiveCategory('all')}
          >
            <div style={{
              background: 'linear-gradient(135deg, #1d4ed8, #00d2ff)',
              padding: '0.55rem',
              borderRadius: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(0, 210, 255, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}>
              <Sparkles size={22} color="#ffffff" />
            </div>
            <div>
              <h1 className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.3px' }}>
                {t('siteTitle', 'common')}
              </h1>
              <p style={{ fontSize: '0.72rem', color: '#93c5fd', marginTop: '0.15rem', fontWeight: 500 }}>
                {t('siteTagline', 'common')}
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', minWidth: '240px', flex: 1, maxWidth: '440px' }}>
            <Search
              size={17}
              color="#60a5fa"
              style={{
                position: 'absolute',
                [isRtl ? 'right' : 'left']: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              className="glass-input"
              placeholder={t('searchPlaceholder', 'common')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                [isRtl ? 'paddingRight' : 'paddingLeft']: '2.6rem',
                fontSize: '0.88rem',
                paddingTop: '0.65rem',
                paddingBottom: '0.65rem',
                borderRadius: '9999px',
                background: 'rgba(10, 20, 48, 0.65)',
                borderColor: 'rgba(59, 130, 246, 0.25)'
              }}
            />
          </div>

          {/* Actions: Language & PWA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            
            {/* Language Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                  background: 'rgba(15, 28, 65, 0.6)'
                }}
              >
                <Globe size={15} color="#38bdf8" />
                <span>{currentLangObj.flag}</span>
                <span style={{ fontSize: '0.8rem', color: '#f8fafc' }}>{currentLangObj.label}</span>
                <ChevronDown size={13} color="#94a3b8" />
              </button>

              {showLangMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    [isRtl ? 'left' : 'right']: 0,
                    zIndex: 60,
                    background: '#0a1430',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    borderRadius: '0.85rem',
                    padding: '0.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6), 0 0 15px rgba(37, 99, 235, 0.25)',
                    minWidth: '145px'
                  }}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setShowLangMenu(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.6rem',
                        border: 'none',
                        background: lang === l.code ? 'rgba(37, 99, 235, 0.3)' : 'transparent',
                        color: lang === l.code ? '#ffffff' : '#94a3b8',
                        fontWeight: lang === l.code ? 700 : 500,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: isRtl ? 'right' : 'left',
                        fontFamily: 'inherit',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PWA Button */}
            {canInstall && (
              <button
                onClick={handleInstallClick}
                className="btn-gradient"
                style={{
                  padding: '0.5rem 0.9rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  boxShadow: '0 0 15px rgba(0, 210, 255, 0.35)'
                }}
              >
                <Smartphone size={15} /> {t('pwaInstall', 'common')}
              </button>
            )}

            <div style={{ display: 'none', '@media (min-width: 900px)': { display: 'flex' } }}>
              <span className="badge badge-blue">
                {t('safeBadge', 'common')}
              </span>
            </div>

          </div>

        </div>

        {/* Category Navigation Pills with smooth horizontal scroll */}
        <div style={{
          display: 'flex',
          gap: '0.45rem',
          marginTop: '1rem',
          overflowX: 'auto',
          paddingBottom: '0.35rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  fontFamily: 'inherit',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.7)' : '1px solid rgba(59, 130, 246, 0.15)',
                  background: isActive ? 'linear-gradient(135deg, rgba(29, 78, 216, 0.45), rgba(6, 182, 212, 0.25))' : 'rgba(15, 28, 65, 0.35)',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  boxShadow: isActive ? '0 0 15px rgba(37, 99, 235, 0.35)' : 'none'
                }}
              >
                <Icon size={15} color={isActive ? '#38bdf8' : 'currentColor'} />
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
