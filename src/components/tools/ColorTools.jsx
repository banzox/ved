import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ColorStudio() {
  const [color1, setColor1] = useState('#0066ff');
  const [color2, setColor2] = useState('#00d2ff');
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
    const blues = ['#0066ff', '#00d2ff', '#38bdf8', '#1d4ed8', '#0284c7', '#2563eb', '#60a5fa', '#0f172a', '#ffffff'];
    const c1 = blues[Math.floor(Math.random() * blues.length)];
    let c2 = blues[Math.floor(Math.random() * blues.length)];
    if (c1 === c2) c2 = '#00d2ff';
    setColor1(c1);
    setColor2(c2);
    confetti({ particleCount: 40 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff' }}>
          <Palette size={22} color="#00d2ff" /> استوديو الألوان والتدرجات (Gradient Studio)
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
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
          boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.2)',
          transition: 'all 0.3s ease',
        }}
      >
        <button
          onClick={copyCss}
          className="btn-secondary"
          style={{
            background: 'rgba(5, 10, 24, 0.75)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '0.65rem 1.3rem',
            fontSize: '0.9rem',
            fontWeight: 700
          }}
        >
          {copied ? <><Check size={16} color="#10b981" /> تم نسخ الـ CSS!</> : <><Copy size={16} /> نسخ كود التدرج CSS</>}
        </button>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', background: 'rgba(10, 20, 48, 0.6)', padding: '1rem', borderRadius: '0.85rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
        
        {/* Color 1 */}
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>اللون الأول (Start Color):</label>
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
          <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>اللون الثاني (End Color):</label>
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
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>زاوية التدرج: ({gradientAngle}°)</label>
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
          <Sparkles size={16} /> توليد ألوان زرقاء ملكية مبهرة
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
