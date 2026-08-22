import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, Check, Wifi, Globe, Type, Phone, Mail, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export function QrGenerator() {
  const [qrType, setQrType] = useState('url');
  
  // Input fields
  const [urlInput, setUrlInput] = useState('https://nextgear.space');
  const [textInput, setTextInput] = useState('أهلاً بك في منصة أومني تولز');
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState({ to: '', subject: '', body: '' });
  const [wifiInput, setWifiInput] = useState({ ssid: '', password: '', encryption: 'WPA' });

  // Customization
  const [fgColor, setFgColor] = useState('#0066ff');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(280);
  const [errorCorrection, setErrorCorrection] = useState('M');

  // Output
  const [dataUrl, setDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute QR string based on active tab
  const getQrValue = () => {
    switch (qrType) {
      case 'url':
        return urlInput.trim() || 'https://nextgear.space';
      case 'text':
        return textInput || 'OmniTools';
      case 'phone':
        return phoneInput ? `tel:${phoneInput.replace(/\s+/g, '')}` : 'tel:';
      case 'email':
        return `mailto:${emailInput.to}?subject=${encodeURIComponent(emailInput.subject)}&body=${encodeURIComponent(emailInput.body)}`;
      case 'wifi':
        return `WIFI:T:${wifiInput.encryption};S:${wifiInput.ssid};P:${wifiInput.password};;`;
      default:
        return urlInput;
    }
  };

  const generateQRCode = async () => {
    try {
      const qrValue = getQrValue();
      const url = await QRCode.toDataURL(qrValue, {
        width: qrSize,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorCorrection,
      });
      setDataUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [qrType, urlInput, textInput, phoneInput, emailInput, wifiInput, fgColor, bgColor, qrSize, errorCorrection]);

  const handleDownload = (format = 'png') => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `qrcode-${qrType}-${Date.now()}.${format}`;
    a.click();
    confetti({ particleCount: 60, spread: 50 });
  };

  const copyToClipboard = async () => {
    try {
      if (!dataUrl) return;
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      confetti({ particleCount: 50 });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard copy error:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff' }}>
            <QrCode size={22} color="#38bdf8" /> استوديو الـ QR Code الذكي
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            أنشئ رموز QR مخصصة للروابط وشبكات الواي فاي وأرقام الهواتف بألوانك المفضلة.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.4rem',
        flexWrap: 'wrap',
        background: 'rgba(10, 20, 48, 0.6)',
        padding: '0.4rem',
        borderRadius: '0.85rem',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        {[
          { id: 'url', label: 'رابط ويب', icon: Globe },
          { id: 'wifi', label: 'شبكة Wi-Fi', icon: Wifi },
          { id: 'text', label: 'نص عادي', icon: Type },
          { id: 'phone', label: 'رقم هاتف', icon: Phone },
          { id: 'email', label: 'بريد إلكتروني', icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = qrType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setQrType(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.95rem',
                borderRadius: '0.6rem',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, #1d4ed8, #0284c7)' : 'transparent',
                color: isActive ? '#ffffff' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 15px rgba(2, 132, 199, 0.4)' : 'none'
              }}
            >
              <Icon size={15} color={isActive ? '#38bdf8' : 'currentColor'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Inputs vs Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Left: Inputs & Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Dynamic Inputs */}
          {qrType === 'url' && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', color: '#cbd5e1' }}>رابط الموقع (URL):</label>
              <input
                type="url"
                className="glass-input"
                placeholder="https://example.com"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
            </div>
          )}

          {qrType === 'wifi' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>اسم شبكة الواي فاي (SSID):</label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="MyHome_5G"
                  value={wifiInput.ssid}
                  onChange={(e) => setWifiInput({ ...wifiInput, ssid: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>كلمة المرور:</label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="••••••••"
                  value={wifiInput.password}
                  onChange={(e) => setWifiInput({ ...wifiInput, password: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>نوع التشفير:</label>
                <select
                  className="glass-input"
                  value={wifiInput.encryption}
                  onChange={(e) => setWifiInput({ ...wifiInput, encryption: e.target.value })}
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (الأكثر شيوعاً)</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">بدون كلمة سر (Open)</option>
                </select>
              </div>
            </div>
          )}

          {qrType === 'text' && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', color: '#cbd5e1' }}>النص المطلوب تشفيره:</label>
              <textarea
                className="glass-input"
                rows="4"
                placeholder="اكتب أي نص أو ملاحظة..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </div>
          )}

          {qrType === 'phone' && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', color: '#cbd5e1' }}>رقم الهاتف (مع رمز الدولة):</label>
              <input
                type="tel"
                className="glass-input"
                placeholder="+966501234567"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
              />
            </div>
          )}

          {qrType === 'email' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>البريد المستلم:</label>
                <input
                  type="email"
                  className="glass-input"
                  placeholder="contact@example.com"
                  value={emailInput.to}
                  onChange={(e) => setEmailInput({ ...emailInput, to: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>الموضوع:</label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="استفسار هام"
                  value={emailInput.subject}
                  onChange={(e) => setEmailInput({ ...emailInput, subject: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Color & Style Controls */}
          <div style={{
            background: 'rgba(10, 20, 48, 0.5)',
            padding: '1rem',
            borderRadius: '0.85rem',
            border: '1px solid rgba(59, 130, 246, 0.18)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#93c5fd' }}>لون الرمز:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  style={{ width: '36px', height: '36px', border: 'none', borderRadius: '0.4rem', cursor: 'pointer', background: 'transparent' }}
                />
                <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#ffffff' }}>{fgColor}</span>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#93c5fd' }}>لون الخلفية:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  style={{ width: '36px', height: '36px', border: 'none', borderRadius: '0.4rem', cursor: 'pointer', background: 'transparent' }}
                />
                <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#ffffff' }}>{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Preview & Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          background: 'rgba(10, 20, 48, 0.75)',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <div style={{
            background: bgColor,
            padding: '1.25rem',
            borderRadius: '1rem',
            boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255,255,255,0.1)'
          }}>
            {dataUrl ? (
              <img src={dataUrl} alt="Generated QR" style={{ maxWidth: '240px', width: '100%', height: 'auto', display: 'block' }} />
            ) : (
              <div style={{ width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                <RefreshCw size={24} className="animate-spin" />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', width: '100%', flexWrap: 'wrap' }}>
            <button onClick={() => handleDownload('png')} className="btn-gradient" style={{ flex: 1 }}>
              <Download size={18} /> تحميل PNG
            </button>
            <button onClick={copyToClipboard} className="btn-secondary" style={{ padding: '0.75rem 1rem' }}>
              {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
