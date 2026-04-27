"use client";
import Link from "next/link";
import { Search, Menu, X, PlaySquare } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

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
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="بحث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900 border border-white/10 text-white text-sm rounded-full py-1.5 px-4 pr-10 focus:outline-none focus:border-blue-500 transition-all w-40 focus:w-64"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <Search className="w-4 h-4" />
              </button>
            </form>
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
          <div className="px-4 pt-2 pb-3 space-y-3 sm:px-3">
            <form onSubmit={handleSearch} className="relative w-full mb-4">
              <input
                type="text"
                placeholder="ابحث عن فيلم أو مسلسل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900 border border-white/10 text-white text-sm rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </button>
            </form>
            <div className="space-y-1">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium">الرئيسية</Link>
              <Link href="/movies" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium">الأفلام</Link>
              <Link href="/series" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium">المسلسلات</Link>
              <Link href="/new" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium">المضافة حديثاً</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
