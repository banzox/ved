import React from 'react';
import { Search, Sparkles, Star, Layers, FileText, Image, Music, Share2, PackageCheck } from 'lucide-react';

export default function Navbar({ activeCategory, setActiveCategory, searchQuery, setSearchQuery, favoritesCount }) {
  const categories = [
    { id: 'all', label: 'كل الأدوات', icon: Layers },
    { id: 'pdf', label: 'أدوات PDF', icon: FileText },
    { id: 'images', label: 'أدوات الصور', icon: Image },
    { id: 'audio', label: 'الصوتيات', icon: Music },
    { id: 'social', label: 'السوشيال ميديا', icon: Share2 },
    { id: 'bundles', label: 'حزم الأدوات', icon: PackageCheck },
    { id: 'favorites', label: `المفضلة (${favoritesCount})`, icon: Star },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--border-color)', background: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem' }}>
        
        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveCategory('all')}>
            <div style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))', padding: '0.6rem', borderRadius: '0.85rem', display: 'flex', boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}>
              <Sparkles size={24} color="#fff" />
            </div>
            <div>
              <h1 className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>أدواتك | OmniTools</h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>منصة الأدوات المجانية والمتكاملة 100% في المتصفح</p>
            </div>
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', minWidth: '280px', flex: 1, maxWidth: '450px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="glass-input"
              placeholder="ابحث عن أداة (مثال: بي دي اف، ضغط صور، بايو...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingRight: '2.8rem' }}
            />
          </div>

          {/* Stat Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-purple">⚡ معالجة سريعة وآمنة 100%</span>
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
