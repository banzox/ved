import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, Sliders, Crop, Download, Zap, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ImageCompressor() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState('image/webp');
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [originalSize, setOriginalSize] = useState(0);

  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setOriginalSize(file.size);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  useEffect(() => {
    if (!previewUrl) return;

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedBlob(blob);
            setCompressedSize(blob.size);
          }
        },
        format,
        quality
      );
    };
  }, [previewUrl, quality, format]);

  const handleDownload = () => {
    if (!compressedBlob) return;
    const ext = format.split('/')[1];
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed-image-${Date.now()}.${ext}`;
    a.click();

    confetti({ particleCount: 70 });
  };

  const savingsPercent = originalSize > 0 && compressedSize > 0 
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Zap size={20} color="var(--accent-purple)" /> ضغط وتقليل حجم الصور
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>قلّل حجم الصور مع المعاينة الفورية لفرق الحجم دون التأثير على الجودة الملحوظة.</p>

      <input type="file" accept="image/*" onChange={handleImageUpload} className="glass-input" />

      {previewUrl && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>مستوى الضغط والجودة: ({Math.round(quality * 100)}%)</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>صيغة التصدير المستهدفة:</label>
              <select className="glass-input" value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="image/webp">WebP (أفضل ضغط وأداء ممتاز)</option>
                <option value="image/jpeg">JPEG / JPG (متوافق مع الجميع)</option>
                <option value="image/png">PNG (بدون فقدان للجودة)</option>
              </select>
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-glow)' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>الحجم الأصلي:</span>
              <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{(originalSize / 1024).toFixed(1)} KB</p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>الحجم بعد الضغط:</span>
              <p style={{ fontWeight: 800, fontSize: '1.1rem', color: '#10b981' }}>{(compressedSize / 1024).toFixed(1)} KB</p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>نسبة التوفير:</span>
              <p style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-purple)' }}>-{savingsPercent}%</p>
            </div>
          </div>

          {/* Image Preview */}
          <div style={{ textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '0.75rem', padding: '1rem', maxHeight: '350px', overflow: 'hidden' }}>
            <img src={compressedBlob ? URL.createObjectURL(compressedBlob) : previewUrl} alt="compressed preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '0.5rem', objectFit: 'contain' }} />
          </div>

          <button onClick={handleDownload} className="btn-gradient">
            <Download size={18} /> تحميل الصورة المضغوطة
          </button>
        </div>
      )}
    </div>
  );
}

export function ImageCropResize() {
  const [imageSrc, setImageSrc] = useState(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [aspectRatio, setAspectRatio] = useState('free');

  const canvasRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
    };
    reader.readAsDataURL(file);
  };

  const applyPreset = (ratio, defaultW = 1080) => {
    setAspectRatio(ratio);
    if (ratio === '1:1') { setWidth(defaultW); setHeight(defaultW); }
    else if (ratio === '16:9') { setWidth(defaultW); setHeight(Math.round(defaultW * 9 / 16)); }
    else if (ratio === '9:16') { setWidth(Math.round(defaultW * 9 / 16)); setHeight(defaultW); }
  };

  const handleExport = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const link = document.createElement('a');
      link.download = `resized-image-${width}x${height}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      confetti({ particleCount: 70 });
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Crop size={20} color="var(--accent-cyan)" /> قص وتعديل أبعاد الصور
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>غير أبعاد الصورة بالبكسل أو اختر أبعاد جاهزة لمنصات السوشيال ميديا.</p>

      <input type="file" accept="image/*" onChange={handleUpload} className="glass-input" />

      {imageSrc && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Quick Presets */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>أبعاد جاهزة (Presets):</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className={`btn-secondary ${aspectRatio === '1:1' ? 'btn-gradient' : ''}`} onClick={() => applyPreset('1:1')}>🟩 مربع 1:1 (Insta Post)</button>
              <button className={`btn-secondary ${aspectRatio === '9:16' ? 'btn-gradient' : ''}`} onClick={() => applyPreset('9:16')}>📱 ستوري 9:16 (Reels/TikTok)</button>
              <button className={`btn-secondary ${aspectRatio === '16:9' ? 'btn-gradient' : ''}`} onClick={() => applyPreset('16:9')}>📺 عريض 16:9 (YouTube)</button>
            </div>
          </div>

          {/* Width Height Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>العرض (Width px):</label>
              <input type="number" className="glass-input" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 100)} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>الارتفاع (Height px):</label>
              <input type="number" className="glass-input" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 100)} />
            </div>
          </div>

          <button onClick={handleExport} className="btn-gradient">
            <Download size={18} /> حفظ الصورة بالأبعاد الجديدة
          </button>
        </div>
      )}
    </div>
  );
}

export function ImageFilters() {
  const [imageSrc, setImageSrc] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [grayscale, setGrayscale] = useState(0);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImageSrc(URL.createObjectURL(file));
  };

  const filterStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) grayscale(${grayscale}%)`,
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '0.75rem'
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.filter = filterStyle.filter;
      ctx.drawImage(img, 0, 0);

      const link = document.createElement('a');
      link.download = `filtered-image-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();

      confetti({ particleCount: 70 });
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Sliders size={20} color="var(--accent-pink)" /> استوديو التأثيرات والفلاتر
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>عدّل الإضاءة، التشبع، والتباين وأضف تأثير أبيض وأسود بلمسة واحدة.</p>

      <input type="file" accept="image/*" onChange={handleUpload} className="glass-input" />

      {imageSrc && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ textAlign: 'center' }}>
            <img src={imageSrc} alt="filter preview" style={filterStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>السطوع ({brightness}%):</label>
              <input type="range" min="20" max="200" value={brightness} onChange={(e) => setBrightness(e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>التباين ({contrast}%):</label>
              <input type="range" min="20" max="200" value={contrast} onChange={(e) => setContrast(e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>التشبع ({saturate}%):</label>
              <input type="range" min="0" max="200" value={saturate} onChange={(e) => setSaturate(e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>أبيض وأسود ({grayscale}%):</label>
              <input type="range" min="0" max="100" value={grayscale} onChange={(e) => setGrayscale(e.target.value)} style={{ width: '100%' }} />
            </div>
          </div>

          <button onClick={handleDownload} className="btn-gradient">
            <Download size={18} /> تحميل الصورة المعالجة
          </button>
        </div>
      )}
    </div>
  );
}
