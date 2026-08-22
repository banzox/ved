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
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      padding: '1rem'
    }} onClick={onClose}>
      
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.75rem',
          position: 'relative',
          background: '#121829',
          border: '1px solid var(--border-glow)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '0.75rem' }}>
              {React.createElement(tool.icon, { size: 24, color: tool.iconColor || 'var(--accent-purple)' })}
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{tool.title}</h2>
              <span className="badge badge-purple">{tool.categoryLabel}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => onToggleFavorite(tool.id)}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: isFavorite ? '#f59e0b' : 'var(--text-muted)' }}
              title="إضافة للمفضلة"
            >
              <Star size={18} fill={isFavorite ? '#f59e0b' : 'none'} />
            </button>

            <button
              onClick={onClose}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tool Component Render with Suspense */}
        <div style={{ marginTop: '1rem' }}>
          <Suspense
            fallback={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', gap: '0.75rem', color: 'var(--accent-purple)' }}>
                <Loader2 size={36} className="animate-spin" />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>جاري تحميل الأداة بسرعة فائقة...</span>
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
