"use client";
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    // Remove current lang from pathname
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath || `/${newLang}`);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-colors text-sm font-medium"
    >
      <Globe size={16} className="text-blue-400" />
      <span>{currentLang === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
}
