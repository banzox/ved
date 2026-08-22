import React, { useEffect } from 'react';
import { X, Clock, Calendar, ArrowRight, ArrowUpRight, Sparkles, BookOpen, Share2 } from 'lucide-react';
import { useLanguage } from '../../locales/LanguageContext';

export default function ArticleModal({ post, onClose, onOpenTool }) {
  const { lang, t, isRtl } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const title = post.titles[lang] || post.titles['en'];
  const excerpt = post.excerpts[lang] || post.excerpts['en'];
  const contentSections = post.contents[lang] || post.contents['en'] || [];
  const readTime = post.readTime[lang] || post.readTime['en'];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('linkCopied', 'common') || 'تم نسخ رابط المقال للحافظة!');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(3, 7, 18, 0.9)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        padding: '0.75rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.25rem 1.75rem',
          position: 'relative',
          background: 'radial-gradient(ellipse at top, rgba(15, 28, 65, 0.96), rgba(7, 13, 29, 0.98))',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          borderRadius: '1.25rem',
          boxShadow: '0 25px 65px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(37, 99, 235, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Meta Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
          paddingBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="badge badge-blue">
              <BookOpen size={13} style={{ [isRtl ? 'marginLeft' : 'marginRight']: '0.35rem' }} />
              {t(post.category, 'categories') || 'أدلة إرشادية'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#93c5fd' }}>
              <Clock size={14} color="#38bdf8" /> {readTime}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#64748b' }}>
              <Calendar size={14} /> {post.date}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleShare}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: '0.6rem',
                padding: '0.5rem',
                cursor: 'pointer',
                color: '#93c5fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="مشاركة المقال"
            >
              <Share2 size={17} />
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: '0.6rem',
                padding: '0.5rem',
                cursor: 'pointer',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Article Title */}
        <h1 style={{
          fontSize: '1.65rem',
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1.35,
          marginBottom: '1rem',
          letterSpacing: '-0.3px'
        }}>
          {title}
        </h1>

        {/* Excerpt Lead */}
        <p style={{
          fontSize: '1rem',
          color: '#cbd5e1',
          lineHeight: 1.7,
          marginBottom: '1.75rem',
          padding: '0.9rem 1.25rem',
          background: 'rgba(37, 99, 235, 0.1)',
          borderRadius: '0.85rem',
          border: isRtl ? 'right' : 'left',
          borderInlineStart: '4px solid #38bdf8'
        }}>
          {excerpt}
        </p>

        {/* Structured Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          {contentSections.map((sec, idx) => (
            <div key={idx} style={{ background: 'rgba(10, 20, 48, 0.5)', padding: '1.25rem', borderRadius: '0.85rem', border: '1px solid rgba(59, 130, 246, 0.18)' }}>
              <h3 style={{
                fontSize: '1.12rem',
                fontWeight: 800,
                color: '#60a5fa',
                marginBottom: '0.6rem'
              }}>
                {sec.heading}
              </h3>
              <p style={{
                fontSize: '0.92rem',
                color: '#e2e8f0',
                lineHeight: 1.75,
                whiteSpace: 'pre-line'
              }}>
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        {/* Smart Interactive Call-To-Action Box */}
        {post.relatedToolId && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.35), rgba(6, 182, 212, 0.2))',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '1px solid rgba(56, 189, 248, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: '0 8px 30px rgba(37, 99, 235, 0.25)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                <Sparkles size={16} /> {t('tryToolTitle', 'blog') || 'هل ترغب بتجربة الأداة المشروحة الآن؟'}
              </div>
              <p style={{ fontSize: '0.88rem', color: '#f8fafc', margin: 0 }}>
                {t('tryToolSubtitle', 'blog') || 'جميع الأدوات مجانية 100% وتعمل محلياً داخل متصفحك بأمان تام.'}
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenTool(post.relatedToolId);
              }}
              className="btn-gradient"
              style={{
                fontSize: '0.9rem',
                padding: '0.7rem 1.4rem',
                borderRadius: '0.75rem',
                boxShadow: '0 0 20px rgba(0, 210, 255, 0.4)'
              }}
            >
              <span>{t('launchToolNow', 'blog') || 'تشغيل الأداة مباشرة'}</span>
              <ArrowUpRight size={17} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
