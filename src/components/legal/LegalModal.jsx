import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, Info, Mail } from 'lucide-react';
import { useLanguage } from '../../locales/LanguageContext';

export default function LegalModal({ type, onClose }) {
  const { lang, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!type) return null;

  const content = {
    privacy: {
      ar: {
        title: 'سياسة الخصوصية (Privacy Policy)',
        sections: [
          {
            heading: '1. معالجة البيانات داخل المتصفح (100% Client-Side)',
            text: 'نحن في منصة OmniTools Hub نضع خصوصية المستخدم في المقام الأول. جميع الأدوات المتاحة على هذا الموقع (بما في ذلك دمج وتقسيم مستندات PDF، ضغط الصور، تحويل ومعالجة الصوتيات، تشفير Base64 وتوليد أكواد الـ QR) تعمل بالكامل وبنسبة 100% داخل متصفح المستخدم (Client-Side Execution) باستخدام أحدث تقنيات HTML5 Canvas و WebAudio API و Web Crypto API. لا يتم أبداً رفع أو تخزين أو فحص أي من ملفاتك، صورك، أو مستنداتك على أي خوادم خارجية.'
          },
          {
            heading: '2. ملفات تعريف الارتباط وإعلانات الطرف الثالث (Google AdSense)',
            text: 'قد يستخدم موقعنا ملفات تعريف ارتباط (Cookies) أساسية لحفظ تفضيلاتك اللغوية وقائمة الأدوات المفضلة لديك محلياً (LocalStorage). كما قد تستخدم شبكات الإعلانات التابعة لجهات خارجية، بما في ذلك Google AdSense، ملفات تعريف الارتباط لعرض الإعلانات المخصصة بناءً على زياراتك السابقة لهذا الموقع أو لمواقع أخرى على الإنترنت. يمكنك تعطيل الإعلانات المخصصة عبر زيارة إعدادات إعلانات Google (Google Ads Settings).'
          },
          {
            heading: '3. الامتثال للائحة العامة لحماية البيانات (GDPR & CCPA)',
            text: 'نحن نحترم حقوق المستخدمين بموجب اللائحة العامة لحماية البيانات (GDPR) وقانون خصوصية المستهلك في كاليفورنيا (CCPA). نظراً لأننا لا نجمع أو نعالج أو نخزن أي بيانات تعريف شخصية على خوادمنا، فإن بياناتك آمنة تماماً ومحمية.'
          }
        ]
      },
      en: {
        title: 'Privacy Policy',
        sections: [
          {
            heading: '1. 100% In-Browser & Client-Side Processing',
            text: 'At OmniTools Hub, your privacy is our absolute priority. All tools provided on this portal—including PDF merging and splitting, image compression, audio conversion, Base64 encoding, and QR code generation—execute 100% locally inside your web browser via HTML5 Canvas, WebAudio API, and WebAssembly. None of your files, images, or documents are ever uploaded, processed, or stored on external servers.'
          },
          {
            heading: '2. Cookies and Third-Party Advertising (Google AdSense)',
            text: 'We use local storage strictly to remember your language preference and favorite tools. Third-party vendors, including Google, use cookies to serve ads based on prior visits to our website or other sites. Google’s use of advertising cookies enables it and its partners to serve ads based on your visit. You may opt out of personalized advertising by visiting Google Ads Settings.'
          },
          {
            heading: '3. GDPR & CCPA Compliance',
            text: 'We strictly comply with global privacy standards, including GDPR and CCPA. Because our utility architecture requires no user registration and does not collect, track, or harvest personal identifiable information, your digital footprint remains under your complete control.'
          }
        ]
      },
      es: {
        title: 'Política de Privacidad',
        sections: [
          {
            heading: '1. Procesamiento 100% en el Navegador (Sin Servidor)',
            text: 'En OmniTools Hub, la privacidad de nuestros usuarios es fundamental. Todas las herramientas disponibles (fusión de PDF, compresión de imágenes, conversores de audio, códigos QR y utilidades de desarrollo) se ejecutan al 100% dentro de tu navegador web. Ninguno de tus archivos, imágenes o datos se sube ni se almacena en servidores externos.'
          },
          {
            heading: '2. Cookies y Publicidad de Terceros (Google AdSense)',
            text: 'Utilizamos almacenamiento local únicamente para recordar tus preferencias de idioma y herramientas favoritas. Proveedores externos, incluido Google, pueden utilizar cookies para mostrar anuncios personalizados basados en visitas anteriores a este y otros sitios web. Puedes gestionar tus preferencias en la Configuración de Anuncios de Google.'
          },
          {
            heading: '3. Cumplimiento del RGPD y CCPA',
            text: 'Cumplimos rigurosamente con las normativas internacionales de protección de datos (RGPD y CCPA). Dado que no recopilamos ni almacenamos datos personales en servidores, tu navegación y tus archivos permanecen completamente privados y seguros.'
          }
        ]
      },
      fr: {
        title: 'Politique de Confidentialité',
        sections: [
          {
            heading: '1. Traitement 100% Local dans le Navigateur',
            text: 'Chez OmniTools Hub, la confidentialité est notre engagement absolu. Tous les outils (fusion de PDF, compression d\'images, conversion audio, générateur de QR codes) fonctionnent à 100% dans votre navigateur via HTML5 et WebAudio API. Vos fichiers et documents ne sont jamais téléversés ni stockés sur des serveurs distants.'
          },
          {
            heading: '2. Cookies et Publicités Tiers (Google AdSense)',
            text: 'Nous utilisons le stockage local uniquement pour sauvegarder votre choix de langue et vos favoris. Des régies publicitaires tierces, notamment Google AdSense, peuvent utiliser des cookies pour diffuser des annonces adaptées à votre navigation. Vous pouvez désactiver les annonces personnalisées via les paramètres Google Ads.'
          },
          {
            heading: '3. Conformité RGPD et Protection des Données',
            text: 'Notre plateforme respecte scrupuleusement les directives du RGPD. Aucune donnée personnelle n\'étant collectée ou transmise à des tiers, vos fichiers restent strictement sous votre contrôle exclusif.'
          }
        ]
      },
      de: {
        title: 'Datenschutzerklärung',
        sections: [
          {
            heading: '1. 100% Lokale Verarbeitung im Browser (Client-Side)',
            text: 'Bei OmniTools Hub hat der Schutz Ihrer Privatsphäre oberste Priorität. Alle auf dieser Website angebotenen Werkzeuge (PDF-Zusammenführung, Bildkompression, Audiokonverter, QR-Code-Generator usw.) werden zu 100% lokal in Ihrem Browser ausgeführt. Es werden zu keinem Zeitpunkt Dateien, Bilder oder Daten auf externe Server hochgeladen oder gespeichert.'
          },
          {
            heading: '2. Cookies und Drittanbieter-Werbung (Google AdSense)',
            text: 'Wir nutzen LocalStorage ausschließlich zur Speicherung Ihrer Spracheinstellung und Favoriten. Drittanbieter, einschließlich Google AdSense, verwenden Cookies zur Schaltung relevanter Anzeigen basierend auf Ihren vorherigen Website-Besuchen. Sie können personalisierte Werbung in den Google-Anzeigeneinstellungen deaktivieren.'
          },
          {
            heading: '3. DSGVO-Konformität',
            text: 'Wir halten uns strikt an die europäischen Datenschutzrichtlinien (DSGVO). Da keine personenbezogenen Daten erhoben oder auf Servern verarbeitet werden, bleibt Ihre Privatsphäre vollständig gewahrt.'
          }
        ]
      }
    },
    terms: {
      ar: {
        title: 'شروط الاستخدام (Terms of Service)',
        sections: [
          {
            heading: '1. الاستخدام المجاني والمشروع',
            text: 'توفر منصة OmniTools Hub جميع أدواتها بشكل مجاني بالكامل للأفراد والمطورين وصناع المحتوى والشركات للاستخدام الشخصي والتجاري المشروع، وفقاً لرخصة المصدر المفتوح MIT.'
          },
          {
            heading: '2. إخلاء المسؤولية',
            text: 'يتم تقديم الخدمات والأدوات "كما هي" دون أي ضمانات صريحة أو ضمنية. نحن نسعى دائماً لتقديم أعلى درجات الدقة والسرعة ولكن لا نتحمل المسؤولية عن أي أخطاء غير مقصودة في نتائج المعالجة.'
          }
        ]
      },
      en: {
        title: 'Terms of Service',
        sections: [
          {
            heading: '1. Permitted and Free Use',
            text: 'OmniTools Hub offers all web utilities free of charge for personal, educational, and commercial purposes under the MIT Open Source License.'
          },
          {
            heading: '2. Disclaimer of Warranties',
            text: 'Services and tools are provided "as is" and "as available" without warranties of any kind. While we maintain the highest standards of precision and performance, we assume no liability for unintended data inconsistencies.'
          }
        ]
      },
      es: {
        title: 'Términos de Servicio',
        sections: [
          {
            heading: '1. Uso Libre y Gratuito',
            text: 'OmniTools Hub ofrece todas sus herramientas de forma gratuita para uso personal y comercial bajo la Licencia de Código Abierto MIT.'
          },
          {
            heading: '2. Descargo de Responsabilidad',
            text: 'Las utilidades se proporcionan "tal cual" sin garantías de ningún tipo. Nos esforzamos por garantizar la máxima precisión y rapidez en cada proceso.'
          }
        ]
      },
      fr: {
        title: 'Conditions d\'Utilisation',
        sections: [
          {
            heading: '1. Utilisation Libre et Gratuite',
            text: 'OmniTools Hub met à disposition l\'ensemble de ses outils gratuitement pour un usage personnel et professionnel, sous licence open source MIT.'
          },
          {
            heading: '2. Exclusion de Garantie',
            text: 'Les services sont fournis « en l\'état » sans garantie expresse ou implicite, bien que nous veillions à assurer une fiabilité et une sécurité maximales.'
          }
        ]
      },
      de: {
        title: 'Nutzungsbedingungen',
        sections: [
          {
            heading: '1. Kostenlose und Zulässige Nutzung',
            text: 'OmniTools Hub stellt alle Werkzeuge kostenlos für den persönlichen und geschäftlichen Gebrauch unter der MIT-Open-Source-Lizenz zur Verfügung.'
          },
          {
            heading: '2. Haftungsausschluss',
            text: 'Die Bereitstellung aller Funktionen erfolgt ohne Gewähr. Wir bemühen uns kontinuierlich um höchste Ausfallsicherheit, Präzision und Geschwindigkeit.'
          }
        ]
      }
    },
    about: {
      ar: {
        title: 'من نحن ومعلومات الاتصال (About & Contact)',
        sections: [
          {
            heading: 'منصة OmniTools Hub',
            text: 'منصة ويب متكاملة مصممة لتوفير أدوات يومية خفيفة وسريعة للمستخدمين وصناع المحتوى والمطورين حول العالم، مع التركيز على الخصوصية التامة وسرعة الأداء دون الحاجة لتحميل برامج خارجية أو تسجيل حسابات.'
          },
          {
            heading: 'تواصل معنا (Contact Us)',
            text: 'لأي استفسارات، اقتراحات لأدوات جديدة، أو شراكات إعلانية، يسعدنا تواصلكم عبر البريد الإلكتروني: contact@nextgear.space'
          }
        ]
      },
      en: {
        title: 'About Us & Contact',
        sections: [
          {
            heading: 'About OmniTools Hub',
            text: 'OmniTools Hub is an open web utility portal crafted to empower creators, developers, and daily internet users with fast, secure, and client-side processing tools that protect user privacy.'
          },
          {
            heading: 'Get in Touch',
            text: 'For feedback, feature requests, or inquiries, please contact our team at: contact@nextgear.space'
          }
        ]
      },
      es: {
        title: 'Sobre Nosotros y Contacto',
        sections: [
          {
            heading: 'Sobre OmniTools Hub',
            text: 'OmniTools Hub es una plataforma diseñada para ofrecer herramientas web rápidas, gratuitas y seguras a desarrolladores y creadores de todo el mundo.'
          },
          {
            heading: 'Contacto',
            text: 'Para sugerencias, soporte o consultas comerciales, escríbenos a: contact@nextgear.space'
          }
        ]
      },
      fr: {
        title: 'À Propos et Contact',
        sections: [
          {
            heading: 'À Propos d\'OmniTools Hub',
            text: 'OmniTools Hub est une suite d\'utilitaires web gratuits conçue pour offrir rapidité, sécurité et simplicité aux utilisateurs du monde entier.'
          },
          {
            heading: 'Nous Contacter',
            text: 'Pour toute suggestion, partenariat ou question, écrivez-nous à : contact@nextgear.space'
          }
        ]
      },
      de: {
        title: 'Über Uns & Kontakt',
        sections: [
          {
            heading: 'Über OmniTools Hub',
            text: 'OmniTools Hub ist ein modernes Web-Portal mit kostenlosen, schnellen und datenschutzfreundlichen Werkzeugen für Anwender weltweit.'
          },
          {
            heading: 'Kontaktieren Sie Uns',
            text: 'Für Feedback, Anregungen oder geschäftliche Anfragen erreichen Sie uns unter: contact@nextgear.space'
          }
        ]
      }
    }
  };

  const activeDoc = content[type] && content[type][lang] ? content[type][lang] : content[type]['en'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 8, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          background: '#121829',
          border: '1px solid var(--border-glow)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '0.75rem' }}>
              {type === 'privacy' && <ShieldCheck size={22} color="var(--accent-purple)" />}
              {type === 'terms' && <FileText size={22} color="var(--accent-cyan)" />}
              {type === 'about' && <Info size={22} color="var(--accent-pink)" />}
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{activeDoc.title}</h2>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', lineHeight: 1.7, color: 'var(--text-color)' }}>
          {activeDoc.sections.map((sec, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--accent-purple)' }}>{sec.heading}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{sec.text}</p>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="btn-gradient" style={{ marginTop: '1.5rem', width: '100%' }}>
          {t('close', 'common')}
        </button>
      </div>
    </div>
  );
}
