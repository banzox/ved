import React, { useState } from 'react';
import { FileText, Copy, Check, Trash2, Download, AlignLeft, Sparkles, RefreshCw, BarChart2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function TextCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Statistics calculation
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const charsWithSpaces = text.length;
  const charsWithoutSpaces = text.replace(/\s+/g, '').length;
  const sentences = trimmed ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0) : 0;
  const paragraphs = trimmed ? text.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
  
  // Reading & speaking times
  const readingTimeMinutes = (words / 200).toFixed(1);
  const speakingTimeMinutes = (words / 130).toFixed(1);

  // Text Transformations
  const transformCase = (type) => {
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'title':
        setText(
          text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        );
        break;
      case 'snake':
        setText(
          text
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '_')
        );
        break;
      case 'kebab':
        setText(
          text
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
        );
        break;
      case 'camel':
        setText(
          text
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
        );
        break;
      default:
        break;
    }
  };

  // Text Cleaners
  const cleanExtraSpaces = () => {
    setText(text.replace(/[^\S\r\n]+/g, ' ').trim());
  };

  const removeEmptyLines = () => {
    setText(
      text
        .split('\n')
        .filter((line) => line.trim().length > 0)
        .join('\n')
    );
  };

  const removeDuplicates = () => {
    const lines = text.split('\n');
    const unique = Array.from(new Set(lines));
    setText(unique.join('\n'));
    confetti({ particleCount: 40 });
  };

  const sortLines = (ascending = true) => {
    const lines = text.split('\n');
    lines.sort((a, b) => (ascending ? a.localeCompare(b) : b.localeCompare(a)));
    setText(lines.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 50 });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `document-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={22} color="var(--accent-cyan)" /> محلل وعداد النصوص الذكي
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          إحصاء دقيق للكلمات والحروف، حساب وقت القراءة، أدوات تنظيف وتبديل حالة الأحرف.
        </p>
      </div>

      {/* Stats Cards Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
        <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid var(--border-glow)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>الكلمات</span>
          <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-purple)', margin: 0 }}>{words}</p>
        </div>

        <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>الحروف (مع مسافات)</span>
          <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)', margin: 0 }}>{charsWithSpaces}</p>
        </div>

        <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid rgba(236, 72, 153, 0.3)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>الحروف (بدون مسافات)</span>
          <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-pink)', margin: 0 }}>{charsWithoutSpaces}</p>
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>الفقرات / الجمل</span>
          <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', margin: 0 }}>{paragraphs} / {sentences}</p>
        </div>

        <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid rgba(245, 158, 11, 0.3)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>وقت القراءة المقدر</span>
          <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f59e0b', margin: 0 }}>~{readingTimeMinutes} دقيقة</p>
        </div>
      </div>

      {/* Main Text Area */}
      <textarea
        className="glass-input"
        rows="8"
        placeholder="الصق أو اكتب النص هنا لتحليله فورياً..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ fontSize: '0.95rem', lineHeight: 1.6 }}
      />

      {/* Quick Action Toolbars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        
        {/* Case Converters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>تبديل الحالة:</span>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => transformCase('upper')}>UPPERCASE</button>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => transformCase('lower')}>lowercase</button>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => transformCase('title')}>Title Case</button>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => transformCase('camel')}>camelCase</button>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => transformCase('snake')}>snake_case</button>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => transformCase('kebab')}>kebab-case</button>
        </div>

        {/* Text Cleaners */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>أدوات التنظيف:</span>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={cleanExtraSpaces}>إزالة المسافات الزائدة</button>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={removeEmptyLines}>حذف الأسطر الفارغة</button>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={removeDuplicates}>حذف الأسطر المكررة</button>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => sortLines(true)}>ترتيب أ-ي (A-Z)</button>
        </div>

        {/* Global Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button onClick={copyToClipboard} className="btn-gradient" style={{ flex: 1 }}>
            {copied ? <><Check size={18} color="#10b981" /> تم النسخ بنجاح</> : <><Copy size={18} /> نسخ النص المعدل</>}
          </button>
          <button onClick={downloadText} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Download size={18} /> حفظ كملف TXT
          </button>
          <button onClick={() => setText('')} className="btn-secondary" style={{ color: '#ef4444' }}>
            <Trash2 size={18} /> مسح
          </button>
        </div>

      </div>
    </div>
  );
}
