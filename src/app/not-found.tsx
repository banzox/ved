import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col" dir="rtl">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Big 404 */}
          <div className="relative mb-8">
            <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-500/30 to-transparent leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white mb-2">الصفحة غير موجودة</p>
                <p className="text-gray-400 text-sm md:text-base">
                  يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها.
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              الصفحة الرئيسية
            </Link>
            <Link
              href="/movies"
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 px-8 py-3 rounded-lg font-bold transition-all"
            >
              <Search className="w-5 h-5" />
              تصفح الأفلام
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
