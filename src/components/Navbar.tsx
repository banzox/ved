"use client";
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar({ lang }: { lang: string }) {
  return (
    <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-end px-6 py-4">
        <LanguageSwitcher currentLang={lang} />
      </div>
    </header>
  );
}
