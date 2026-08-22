import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ColorStudio() {
  const [color1, setColor1] = useState('#8b5cf6');
  const [color2, setColor2] = useState('#ec4899');
  const [gradientAngle, setGradientAngle] = useState(135);
  const [gradientType, setGradientType] = useState('linear');
  const [copied, setCopied] = useState(false);

  // Convert HEX to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgb1 = hexToRgb(color1);
  const rgbString1 = `rgb(${rgb1.r}, ${rgb1.g}, ${rgb1.b})`;

  const gradientCss =
    gradientType === 'linear'
      ? `linear-gradient(${gradientAngle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  const copyCss = () => {
    navigator.clipboard.writeText(`background: ${gradientCss};`);
    setCopied(true);
    confetti({ particleCount: 50 });
    setTimeout(() => setCopied(false), 2000);
  };

  const generateRandomColors = () => {
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor1(randomColor());
    setColor2(randomColor());
    confetti({ particleCount: 40 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Palette size={22} color="var(--accent-pink)" /> استوديو الألوان والتدرجات (Gradient Studio)
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          ابتكر تدرجات لونية عصرية، تحويل الصيغ (HEX/RGB)، وانسخ كود الـ CSS المباشر.
        </p>
      </div>

      {/* Live Preview Box */}
      <div
        style={{
          background: gradientCss,
          height: '180px',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.2)',
          transition: 'all 0.3s ease',
        }}
      >
        <button
          onClick={copyCss}
          className="btn-secondary"
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '0.6rem 1.2rem',
            fontSize: '0.9rem',
          }}
        >
          {copied ? <><Check size={16} color="#10b981" /> تم نسخ الـ CSS!</> : <><Copy size={16} /> نسخ كود التدرج CSS</>}
        </button>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
        
        {/* Color 1 */}
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>اللون الأول (Start Color):</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              style={{ width: '40px', height: '40px', border: 'none', borderRadius: '0.4rem', cursor: 'pointer', background: 'transparent' }}
            />
            <input
              type="text"
              className="glass-input"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}
            />
          </div>
        </div>

        {/* Color 2 */}
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>اللون الثاني (End Color):</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              style={{ width: '40px', height: '40px', border: 'none', borderRadius: '0.4rem', cursor: 'pointer', background: 'transparent' }}
            />
            <input
              type="text"
              className="glass-input"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}
            />
          </div>
        </div>

        {/* Angle */}
        {gradientType === 'linear' && (
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>زاوية التدرج: ({gradientAngle}°)</label>
            <input
              type="range"
              min="0"
              max="360"
              value={gradientAngle}
              onChange={(e) => setGradientAngle(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={generateRandomColors} className="btn-gradient">
          <Sparkles size={16} /> توليد ألوان عشوائية مبهرة
        </button>
        <button
          className={`btn-secondary ${gradientType === 'linear' ? 'btn-gradient' : ''}`}
          onClick={() => setGradientType('linear')}
        >
          خطي (Linear)
        </button>
        <button
          className={`btn-secondary ${gradientType === 'radial' ? 'btn-gradient' : ''}`}
          onClick={() => setGradientType('radial')}
        >
          دائري (Radial)
        </button>
      </div>

    </div>
  );
}
