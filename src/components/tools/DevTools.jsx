import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, FileCode, KeyRound, Shield, RefreshCw, Download, FileSpreadsheet, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export function JsonFormatter() {
  const [inputJson, setInputJson] = useState('{\n  "name": "OmniTools",\n  "features": ["PDF", "Images", "QR", "Text"],\n  "status": "online",\n  "speed": 100\n}');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (indent = 2) => {
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutputJson(formatted);
      setError(null);
      confetti({ particleCount: 40 });
    } catch (err) {
      setError(err.message);
      setOutputJson('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setError(null);
      confetti({ particleCount: 40 });
    } catch (err) {
      setError(err.message);
      setOutputJson('');
    }
  };

  const convertToCsv = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      if (arr.length === 0 || typeof arr[0] !== 'object') {
        throw new Error('يجب أن يكون الـ JSON مصفوفة من الكائنات (Array of Objects) للتحويل لـ CSV');
      }

      const headers = Object.keys(arr[0]);
      const csvRows = [headers.join(',')];

      for (const row of arr) {
        const values = headers.map((header) => {
          const val = row[header] === undefined ? '' : row[header];
          return `"${String(val).replace(/"/g, '""')}"`;
        });
        csvRows.push(values.join(','));
      }

      setOutputJson(csvRows.join('\n'));
      setError(null);
      confetti({ particleCount: 50 });
    } catch (err) {
      setError(err.message);
      setOutputJson('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputJson || inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff' }}>
          <Code2 size={22} color="#38bdf8" /> منسق ومحول الـ JSON & CSV
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          تنسيق كود JSON، ضغطه، التحقق من سلامته البرمجية، وتحويله لملف CSV بضغطة زر.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', color: '#cbd5e1' }}>الـ JSON المدخل:</label>
          <textarea
            className="glass-input"
            rows="10"
            style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', color: '#cbd5e1' }}>النتيجة المنسقة / المحولة:</label>
          <textarea
            className="glass-input"
            rows="10"
            readOnly
            style={{ fontFamily: 'monospace', fontSize: '0.85rem', background: 'rgba(0,0,0,0.4)', borderColor: error ? '#f87171' : 'rgba(59, 130, 246, 0.2)' }}
            value={outputJson || (error ? `❌ خطأ في الـ JSON:\n${error}` : 'اضغط على أحد أزرار المعالجة أدناه...')}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => formatJson(2)} className="btn-gradient">
          <FileCode size={16} /> تنسيق مرتب (Beautify 2-spaces)
        </button>
        <button onClick={minifyJson} className="btn-secondary">
          <Terminal size={16} /> ضغط السطور (Minify)
        </button>
        <button onClick={convertToCsv} className="btn-secondary">
          <FileSpreadsheet size={16} /> تحويل إلى CSV
        </button>
        {outputJson && (
          <button onClick={copyToClipboard} className="btn-secondary" style={{ marginRight: 'auto' }}>
            {copied ? <><Check size={16} color="#10b981" /> تم النسخ</> : <><Copy size={16} /> نسخ النتيجة</>}
          </button>
        )}
      </div>
    </div>
  );
}

export function Base64Tool() {
  const [mode, setMode] = useState('text');
  const [textInput, setTextInput] = useState('أومني تولز - المنصة الشاملة');
  const [encodedOutput, setEncodedOutput] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeText = () => {
    try {
      const bytes = new TextEncoder().encode(textInput);
      const binString = String.fromCodePoint(...bytes);
      setEncodedOutput(btoa(binString));
      confetti({ particleCount: 40 });
    } catch (err) {
      alert('حدث خطأ أثناء التشفير');
    }
  };

  const decodeText = () => {
    try {
      const binString = atob(textInput.trim());
      const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
      setEncodedOutput(new TextDecoder().decode(bytes));
      confetti({ particleCount: 40 });
    } catch (err) {
      alert('صيغة Base64 غير صالحة');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFileBase64(reader.result);
      confetti({ particleCount: 50 });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff' }}>
          <Lock size={22} color="#00d2ff" /> مشفر ومفكك Base64 (نصوص وملفات)
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          تشفير وفك تشفير النصوص والملفات والصور إلى صيغة Base64 مباشرة.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          className={`btn-secondary ${mode === 'text' ? 'btn-gradient' : ''}`}
          onClick={() => setMode('text')}
        >
          نصوص (Text)
        </button>
        <button
          className={`btn-secondary ${mode === 'file' ? 'btn-gradient' : ''}`}
          onClick={() => setMode('file')}
        >
          ملفات وصور (File to Base64)
        </button>
      </div>

      {mode === 'text' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <textarea
            className="glass-input"
            rows="4"
            placeholder="اكتب النص هنا..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={encodeText} className="btn-gradient">
              تشفير إلى Base64
            </button>
            <button onClick={decodeText} className="btn-secondary">
              فك تشفير من Base64
            </button>
          </div>

          {encodedOutput && (
            <div style={{ background: 'rgba(10, 20, 48, 0.5)', padding: '1rem', borderRadius: '0.85rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <label style={{ fontSize: '0.8rem', color: '#93c5fd', display: 'block', marginBottom: '0.3rem' }}>النتيجة:</label>
              <textarea className="glass-input" rows="4" readOnly value={encodedOutput} style={{ fontFamily: 'monospace' }} />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(encodedOutput);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="btn-secondary"
                style={{ marginTop: '0.5rem', width: '100%' }}
              >
                {copied ? <><Check size={16} color="#10b981" /> تم النسخ</> : <><Copy size={16} /> نسخ النتيجة</>}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="file" onChange={handleFileUpload} className="glass-input" />
          {fileBase64 && (
            <div style={{ background: 'rgba(10, 20, 48, 0.5)', padding: '1rem', borderRadius: '0.85rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <label style={{ fontSize: '0.8rem', color: '#93c5fd', display: 'block', marginBottom: '0.3rem' }}>Base64 Data URI:</label>
              <textarea className="glass-input" rows="6" readOnly value={fileBase64} style={{ fontFamily: 'monospace', fontSize: '0.8rem' }} />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(fileBase64);
                  alert('تم نسخ Data URI للحافظة!');
                }}
                className="btn-gradient"
                style={{ marginTop: '0.5rem', width: '100%' }}
              >
                <Copy size={16} /> نسخ كود الـ Base64 كاملاً
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function SecuritySuite() {
  const [passLength, setPassLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copiedPass, setCopiedPass] = useState(false);

  // Hash Generator
  const [hashInput, setHashInput] = useState('');
  const [sha256Hash, setSha256Hash] = useState('');

  const generatePassword = () => {
    let chars = '';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) return alert('يرجى اختيار نوع أحرف واحد على الأقل');

    let password = '';
    const array = new Uint32Array(passLength);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < passLength; i++) {
      password += chars[array[i] % chars.length];
    }

    setGeneratedPassword(password);
    confetti({ particleCount: 50 });
  };

  const computeHash = async (text) => {
    setHashInput(text);
    if (!text) {
      setSha256Hash('');
      return;
    }
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    setSha256Hash(hashHex);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff' }}>
          <Shield size={22} color="#10b981" /> مولد كلمات المرور والهاشات الآمنة
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          توليد كلمات سر عشوائية عالية التشفير وحساب تجزئة SHA-256 محلياً.
        </p>
      </div>

      {/* Password Generator */}
      <div style={{ background: 'rgba(10, 20, 48, 0.5)', padding: '1.25rem', borderRadius: '0.85rem', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff' }}>
          <KeyRound size={18} color="#38bdf8" /> مولد كلمات المرور القوية
        </h4>

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>طول كلمة المرور: ({passLength} حرف)</label>
          <input type="range" min="8" max="64" value={passLength} onChange={(e) => setPassLength(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#94a3b8' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} /> أحرف كبيرة (A-Z)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} /> أحرف صغيرة (a-z)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} /> أرقام (0-9)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} /> رموز خاصة (!@#$)
          </label>
        </div>

        <button onClick={generatePassword} className="btn-gradient">
          <Sparkles size={16} /> توليد كلمة مرور جديدة
        </button>

        {generatedPassword && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(37, 99, 235, 0.15)', padding: '0.75rem 1rem', borderRadius: '0.6rem', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', flex: 1, wordBreak: 'break-all' }}>{generatedPassword}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedPassword);
                setCopiedPass(true);
                setTimeout(() => setCopiedPass(false), 2000);
              }}
              className="btn-secondary"
            >
              {copiedPass ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
            </button>
          </div>
        )}
      </div>

      {/* SHA-256 Hasher */}
      <div style={{ background: 'rgba(10, 20, 48, 0.5)', padding: '1.25rem', borderRadius: '0.85rem', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff' }}>
          <Terminal size={18} color="#00d2ff" /> حاسبة الهاش الفورية (SHA-256)
        </h4>
        <input
          type="text"
          className="glass-input"
          placeholder="اكتب أي نص أو كلمة لحساب الهاش..."
          value={hashInput}
          onChange={(e) => computeHash(e.target.value)}
        />
        {sha256Hash && (
          <div>
            <label style={{ fontSize: '0.75rem', color: '#93c5fd' }}>SHA-256 Hash:</label>
            <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', wordBreak: 'break-all', background: 'rgba(0,0,0,0.4)', padding: '0.75rem', borderRadius: '0.5rem', color: '#ffffff' }}>{sha256Hash}</p>
          </div>
        )}
      </div>
    </div>
  );
}
