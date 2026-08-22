import React from 'react';
import { BookOpen, Clock, ArrowUpRight, Sparkles, Combine, Zap, QrCode, Lock, Camera, MessageCircle, FileText } from 'lucide-react';
import { useLanguage } from '../../locales/LanguageContext';
import { blogPosts } from '../../data/blogPosts';

export default function BlogSection({ onSelectPost }) {
  const { lang, t, isRtl } = useLanguage();

  const iconMap = {
    Combine: Combine,
    Zap: Zap,
    QrCode: QrCode,
    Lock: Lock,
    Camera: Camera,
    MessageCircle: MessageCircle,
    FileText: FileText,
  };

  return (
    <section style={{ marginTop: '3.5rem', marginBottom: '2.5rem' }}>
      
      {/* Section Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '1.75rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-blue">
              <BookOpen size={13} style={{ [isRtl ? 'marginLeft' : 'marginRight']: '0.35rem' }} />
              {t('blogBadge', 'blog') || 'الأدلة والمقالات التعليمية'}
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.3px' }}>
            {t('blogTitle', 'blog') || 'مركز المعرفة وشروحات الأدوات'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            {t('blogSubtitle', 'blog') || 'أدلة إرشادية ونصائح تخصصية لتحقيق أقصى استفادة من أدوات المنصة.'}
          </p>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.25rem'
      }}>
        {blogPosts.map((post) => {
          const Icon = iconMap[post.icon] || FileText;
          const title = post.titles[lang] || post.titles['en'];
          const excerpt = post.excerpts[lang] || post.excerpts['en'];
          const readTime = post.readTime[lang] || post.readTime['en'];

          return (
            <article
              key={post.id}
              className="tool-card animate-fade-in"
              onClick={() => onSelectPost(post)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px',
                border: '1px solid rgba(59, 130, 246, 0.22)'
              }}
            >
              <div>
                {/* Card Top Meta */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{
                    padding: '0.55rem',
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(0, 210, 255, 0.15))',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} color="#38bdf8" />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.76rem', color: '#93c5fd', background: 'rgba(37, 99, 235, 0.1)', padding: '0.25rem 0.6rem', borderRadius: '9999px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <Clock size={13} color="#38bdf8" />
                    <span>{readTime}</span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 style={{
                  fontSize: '1.08rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.4,
                  marginBottom: '0.5rem'
                }}>
                  {title}
                </h3>

                {/* Article Excerpt */}
                <p style={{
                  fontSize: '0.84rem',
                  color: '#94a3b8',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {excerpt}
                </p>
              </div>

              {/* Bottom Action Link */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '1.25rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(59, 130, 246, 0.12)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#60a5fa'
              }}>
                <span>{t('readArticle', 'blog') || 'قراءة المقال كاملاً'}</span>
                <ArrowUpRight size={15} color="#38bdf8" />
              </div>
            </article>
          );
        })}
      </div>

    </section>
  );
}
