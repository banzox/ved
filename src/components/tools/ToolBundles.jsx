import React, { useState } from 'react';
import { PackageCheck, Sparkles, FileText, Image as ImageIcon, CheckCircle, ArrowRight } from 'lucide-react';
import { BioGenerator, FancyTextDecorator, CaptionGenerator } from './SocialTools';
import { ImageCompressor } from './ImageTools';
import { PdfMerger, ImagesToPdf } from './PdfTools';

export function CreatorBundle() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: '1. توليد كابشن إبداعي', component: CaptionGenerator },
    { title: '2. زخرفة العناوين', component: FancyTextDecorator },
    { title: '3. ضغط صورة الغلاف', component: ImageCompressor },
    { title: '4. إعداد بايو الحساب', component: BioGenerator },
  ];

  const StepComponent = steps[activeStep].component;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PackageCheck size={22} color="var(--accent-purple)" /> حزمة صناع المحتوى (Content Creator Pack)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>مجموعة أدوات متكاملة لإعداد منشورك وتجهيز حسابك بجميع التفاصيل في محطة واحدة.</p>
        </div>
      </div>

      {/* Stepper Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              border: activeStep === idx ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
              background: activeStep === idx ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.03)',
              color: activeStep === idx ? '#fff' : 'var(--text-muted)',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
        <StepComponent />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        <button
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prev) => prev - 1)}
          className="btn-secondary"
        >
          الخطوة السابقة
        </button>
        <button
          disabled={activeStep === steps.length - 1}
          onClick={() => setActiveStep((prev) => prev + 1)}
          className="btn-gradient"
        >
          الخطوة التالية <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export function DocumentBundle() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: '1. تحويل الصور لـ PDF', component: ImagesToPdf },
    { title: '2. دمج ملفات الـ PDF', component: PdfMerger },
  ];

  const StepComponent = steps[activeStep].component;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={22} color="var(--accent-cyan)" /> حزمة المستندات (Document Pack)
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>حوّل صورك لملفات PDF ثم اجمعها ورتبها في ملف نهائي موحد بسهولة.</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              border: activeStep === idx ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
              background: activeStep === idx ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.03)',
              color: activeStep === idx ? '#fff' : 'var(--text-muted)',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
        <StepComponent />
      </div>
    </div>
  );
}
