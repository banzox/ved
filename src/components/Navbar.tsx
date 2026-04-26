"use client";
import Link from "next/link";
import { Search, Menu, X, PlaySquare } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <PlaySquare className="w-8 h-8 text-blue-500" />
              <span className="font-bold text-xl tracking-tight text-white">نت<span className="text-blue-500">فليكس</span> العرب</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 space-x-reverse">
              <Link href="/" className="text-white hover:text-blue-400 transition-colors px-3 py-2 rounded-md font-medium">الرئيسية</Link>
              <Link href="/movies" className="text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md font-medium">الأفلام</Link>
              <Link href="/series" className="text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md font-medium">المسلسلات</Link>
              <Link href="/new" className="text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md font-medium">المضافة حديثاً</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <button className="text-gray-300 hover:text-white p-2">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/10" dir="rtl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium">الرئيسية</Link>
            <Link href="/movies" className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium">الأفلام</Link>
            <Link href="/series" className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium">المسلسلات</Link>
            <Link href="/new" className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium">المضافة حديثاً</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
