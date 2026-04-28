"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calculator, PieChart, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar({ dict, lang }: { dict: any, lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: dict.common.dashboard, href: `/${lang}`, icon: LayoutDashboard },
    { name: dict.common.compound_interest, href: `/${lang}/calculator/compound`, icon: Calculator },
    { name: dict.common.expenses, href: `/${lang}/expenses`, icon: PieChart },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-zinc-900 rounded-lg text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} h-full w-64 bg-zinc-950 border-${lang === 'ar' ? 'l' : 'r'} border-white/10
        transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0')}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            FinMax
          </h1>
        </div>

        <nav className="mt-6 flex flex-col gap-2 px-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link 
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}
                `}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
