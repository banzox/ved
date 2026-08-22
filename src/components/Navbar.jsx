import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Star, Layers, FileText, Image, Music, Share2, PackageCheck, QrCode, Code2, Palette, Globe, Smartphone } from 'lucide-react';
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
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--border-color)', background: 'rgba(9, 13, 22, 0.88)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem' }}>
        
        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveCategory('all')}>
            <div style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))', padding: '0.6rem', borderRadius: '0.85rem', display: 'flex', boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}>
              <Sparkles size={24} color="#fff" />
            </div>
            <div>
              <h1 className="gradient-text" style={{ fontSize: '1.45rem', fontWeight: 900, lineHeight: 1.1 }}>{t('siteTitle', 'common')}</h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{t('siteTagline', 'common')}</p>
            </div>
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', minWidth: '260px', flex: 1, maxWidth: '420px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', [isRtl ? 'right' : 'left']: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="glass-input"
              placeholder={t('searchPlaceholder', 'common')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ [isRtl ? 'paddingRight' : 'paddingLeft']: '2.8rem' }}
            />
          </div>

          {/* Actions: Language Selector & PWA Install */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            
            {/* Language Switcher Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: '1px solid var(--border-color)',
                  background: 'rgba(255,255,255,0.04)'
                }}
              >
                <Globe size={16} color="var(--accent-purple)" />
                <span>{currentLangObj.flag}</span>
                <span style={{ fontSize: '0.8rem' }}>{currentLangObj.label}</span>
              </button>

              {showLangMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '115%',
                    [isRtl ? 'left' : 'right']: 0,
                    zIndex: 60,
                    background: '#121829',
                    border: '1px solid var(--border-glow)',
                    borderRadius: '0.75rem',
                    padding: '0.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    minWidth: '140px'
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
                        borderRadius: '0.5rem',
                        border: 'none',
                        background: lang === l.code ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                        color: lang === l.code ? '#fff' : 'var(--text-muted)',
                        fontWeight: lang === l.code ? 700 : 500,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: isRtl ? 'right' : 'left',
                        fontFamily: 'inherit'
                      }}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PWA Install */}
            {canInstall && (
              <button
                onClick={handleInstallClick}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  borderColor: 'var(--accent-purple)',
                  color: '#c084fc',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}
              >
                <Smartphone size={16} /> {t('pwaInstall', 'common')}
              </button>
            )}

            <span className="badge badge-purple" style={{ display: 'none', '@media (min-width: 900px)': { display: 'inline-flex' } }}>
              {t('safeBadge', 'common')}
            </span>
          </div>

        </div>

        {/* Category Navigation Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
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
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  border: isActive ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                  background: isActive ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(6, 182, 212, 0.15))' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#fff' : 'var(--text-muted)'
                }}
              >
                <Icon size={16} color={isActive ? '#c084fc' : 'currentColor'} />
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
