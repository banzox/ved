import React, { useEffect, Suspense } from 'react';
import { X, Star, Loader2 } from 'lucide-react';

export default function ToolModal({ tool, onClose, isFavorite, onToggleFavorite }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!tool) return null;

  const ToolComponent = tool.component;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '0.75rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '800px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '1.75rem',
          position: 'relative',
          background: 'radial-gradient(ellipse at top, rgba(15, 28, 65, 0.95), rgba(7, 13, 29, 0.98))',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(37, 99, 235, 0.25)',
          borderRadius: '1.25rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
          paddingBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              padding: '0.6rem',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(0, 210, 255, 0.2))',
              borderRadius: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(59, 130, 246, 0.35)'
            }}>
              {React.createElement(tool.icon, { size: 24, color: tool.iconColor || '#38bdf8' })}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{tool.title}</h2>
              <span className="badge badge-blue" style={{ marginTop: '0.2rem' }}>{tool.categoryLabel}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => onToggleFavorite(tool.id)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '0.6rem',
                padding: '0.5rem',
                cursor: 'pointer',
                color: isFavorite ? '#f59e0b' : '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="إضافة للمفضلة"
            >
              <Star size={18} fill={isFavorite ? '#f59e0b' : 'none'} />
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
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

        {/* Tool Component Render with Suspense */}
        <div style={{ marginTop: '0.75rem' }}>
          <Suspense
            fallback={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3.5rem 1rem', gap: '0.85rem', color: '#60a5fa' }}>
                <Loader2 size={38} className="animate-spin" />
                <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>جاري فتح الأداة بسرعة فائقة...</span>
              </div>
            }
          >
            <ToolComponent />
          </Suspense>
        </div>

      </div>
    </div>
  );
}
