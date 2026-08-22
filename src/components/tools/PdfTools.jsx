import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FilePlus, Download, Trash2, Combine, Split, Image as ImageIcon, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function PdfMerger() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) return alert('يرجى اختيار ملفين PDF على الأقل للدمج');
    setIsProcessing(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `merged-document-${Date.now()}.pdf`;
      link.click();

      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء دمج ملفات الـ PDF. يرجى التأكد من صحة الملفات.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff' }}>
        <Combine size={20} color="#38bdf8" /> دمج ملفات PDF
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>قم بتجميع عدة ملفات PDF في مستند واحد مرتّب وبسرعة عالية في المتصفح.</p>

      {/* File Upload Box */}
      <label style={{
        border: '2px dashed rgba(59, 130, 246, 0.4)',
        borderRadius: '1rem',
        padding: '2rem',
        textAlign: 'center',
        cursor: 'pointer',
        background: 'rgba(37, 99, 235, 0.06)',
        display: 'block'
      }}>
        <FilePlus size={36} color="#38bdf8" style={{ marginBottom: '0.5rem' }} />
        <p style={{ fontWeight: 700, color: '#ffffff' }}>اضغط لاختيار ملفات PDF أو اسحبها هنا</p>
        <span style={{ fontSize: '0.75rem', color: '#93c5fd' }}>يمكنك اختيار أكثر من ملف دفعة واحدة</span>
        <input type="file" accept="application/pdf" multiple onChange={handleFileChange} style={{ display: 'none' }} />
      </label>

      {/* File List */}
      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h4 style={{ fontSize: '0.85rem', color: '#94a3b8' }}>الملفات المختارة ({files.length}):</h4>
          {files.map((file, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 1rem', background: 'rgba(10, 20, 48, 0.6)', borderRadius: '0.6rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '80%', color: '#f8fafc' }}>
                {i + 1}. {file.name} ({Math.round(file.size / 1024)} KB)
              </span>
              <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex' }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <button onClick={mergePdfs} disabled={isProcessing} className="btn-gradient" style={{ marginTop: '0.75rem' }}>
            {isProcessing ? <><Loader2 size={18} className="animate-spin" /> جاري الدمج...</> : <><Combine size={18} /> دمج الملفات الآن وتحميل الـ PDF</>}
          </button>
        </div>
      )}
    </div>
  );
}

export function ImagesToPdf() {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const convertToPdf = async () => {
    if (images.length === 0) return alert('يرجى اختيار صور أولاً');
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const imgFile of images) {
        const arrayBuffer = await imgFile.arrayBuffer();
        let embedImg;
        if (imgFile.type.includes('png')) {
          embedImg = await pdfDoc.embedPng(arrayBuffer);
        } else {
          embedImg = await pdfDoc.embedJpg(arrayBuffer);
        }

        const page = pdfDoc.addPage([embedImg.width, embedImg.height]);
        page.drawImage(embedImg, {
          x: 0,
          y: 0,
          width: embedImg.width,
          height: embedImg.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `images-to-pdf-${Date.now()}.pdf`;
      link.click();

      confetti({ particleCount: 80, spread: 60 });
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء تحويل الصور إلى PDF. تأكد من أن الصور بصيغة PNG أو JPG.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff' }}>
        <ImageIcon size={20} color="#00d2ff" /> تحويل الصور إلى PDF
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>حَوّل مجموعة من الصور (JPG/PNG) إلى ملف PDF احترافي وموحد.</p>

      <label style={{
        border: '2px dashed rgba(0, 210, 255, 0.4)',
        borderRadius: '1rem',
        padding: '2rem',
        textAlign: 'center',
        cursor: 'pointer',
        background: 'rgba(0, 210, 255, 0.05)',
        display: 'block'
      }}>
        <ImageIcon size={36} color="#00d2ff" style={{ marginBottom: '0.5rem' }} />
        <p style={{ fontWeight: 700, color: '#ffffff' }}>اختيار الصور من الجهاز</p>
        <span style={{ fontSize: '0.75rem', color: '#93c5fd' }}>تدعم صيغ PNG و JPG</span>
        <input type="file" accept="image/png, image/jpeg" multiple onChange={handleImageChange} style={{ display: 'none' }} />
      </label>

      {images.length > 0 && (
        <div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>الصور المختارة ({images.length}):</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {images.map((img, i) => (
              <div key={i} style={{ width: '70px', height: '70px', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                <img src={URL.createObjectURL(img)} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          <button onClick={convertToPdf} disabled={isProcessing} className="btn-gradient">
            {isProcessing ? <><Loader2 size={18} className="animate-spin" /> جاري التجهيز...</> : <><Download size={18} /> تحميل كملف PDF</>}
          </button>
        </div>
      )}
    </div>
  );
}

export function PdfSplitter() {
  const [file, setFile] = useState(null);
  const [pageRange, setPageRange] = useState('1');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSplit = async () => {
    if (!file) return alert('يرجى اختيار ملف PDF أولاً');
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      const totalPages = srcPdf.getPageCount();
      const pageIndicesToKeep = [];

      const parts = pageRange.split(',');
      for (let part of parts) {
        part = part.trim();
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              if (i >= 1 && i <= totalPages) pageIndicesToKeep.push(i - 1);
            }
          }
        } else {
          const pageNum = parseInt(part, 10);
          if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
            pageIndicesToKeep.push(pageNum - 1);
          }
        }
      }

      if (pageIndicesToKeep.length === 0) {
        alert(`يرجى تحديد أرقام صفحات صحيحة بين 1 و ${totalPages}`);
        setIsProcessing(false);
        return;
      }

      const copiedPages = await newPdf.copyPages(srcPdf, pageIndicesToKeep);
      copiedPages.forEach(p => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `extracted-pages-${Date.now()}.pdf`;
      link.click();

      confetti({ particleCount: 70 });
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء استخراج الصفحات.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff' }}>
        <Split size={20} color="#60a5fa" /> استخراج وتقسيم الـ PDF
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>حدد الصفحات التي تريد استخراجها وحفظها في مستند مستقل.</p>

      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} className="glass-input" />

      {file && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>أرقام الصفحات للاستخراج (مثال: 1-3 أو 1, 4, 7):</label>
            <input type="text" className="glass-input" value={pageRange} onChange={(e) => setPageRange(e.target.value)} />
          </div>

          <button onClick={handleSplit} disabled={isProcessing} className="btn-gradient">
            {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Split size={18} />} استخراج الصفحات المختارة
          </button>
        </div>
      )}
    </div>
  );
}
