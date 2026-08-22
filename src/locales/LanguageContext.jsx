import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('omnitools_lang');
      if (saved && ['ar', 'en', 'es', 'fr', 'de'].includes(saved)) {
        return saved;
      }
      // Check browser language
      const browserLang = navigator.language.slice(0, 2);
      if (['ar', 'en', 'es', 'fr', 'de'].includes(browserLang)) {
        return browserLang;
      }
    } catch {
      // fallback
    }
    return 'ar';
  });

  const setLanguage = (newLang) => {
    if (['ar', 'en', 'es', 'fr', 'de'].includes(newLang)) {
      setLangState(newLang);
      try {
        localStorage.setItem('omnitools_lang', newLang);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const isRtl = lang === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key, section = 'common') => {
    try {
      if (translations[lang] && translations[lang][section] && translations[lang][section][key]) {
        return translations[lang][section][key];
      }
      // Fallback to English, then Arabic
      if (translations['en'] && translations['en'][section] && translations['en'][section][key]) {
        return translations['en'][section][key];
      }
      if (translations['ar'] && translations['ar'][section] && translations['ar'][section][key]) {
        return translations['ar'][section][key];
      }
    } catch {
      // fallback key
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t, isRtl: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
