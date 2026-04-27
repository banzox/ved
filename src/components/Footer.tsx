import Link from "next/link";
import { PlaySquare, Globe, Send, Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <PlaySquare className="w-8 h-8 text-blue-500" />
              <span className="font-bold text-xl tracking-tight text-white">نت<span className="text-blue-500">فليكس</span> العرب</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              منصتك الأولى لمشاهدة أحدث الأفلام والمسلسلات العربية والأجنبية بجودة عالية. استمتع بتجربة مشاهدة لا مثيل لها.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-zinc-800 transition-all">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-zinc-800 transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-zinc-800 transition-all">
                <Play className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-blue-500 transition-colors">الرئيسية</Link></li>
              <li><Link href="/movies" className="hover:text-blue-500 transition-colors">الأفلام</Link></li>
              <li><Link href="/series" className="hover:text-blue-500 transition-colors">المسلسلات</Link></li>
              <li><Link href="/watchlist" className="hover:text-blue-500 transition-colors">قائمتي</Link></li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="text-white font-bold mb-6">قانوني</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/privacy" className="hover:text-blue-500 transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="hover:text-blue-500 transition-colors">شروط الاستخدام</Link></li>
              <li><Link href="/dmca" className="hover:text-blue-500 transition-colors">حقوق الملكية (DMCA)</Link></li>
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h4 className="text-white font-bold mb-6">تطبيقاتنا</h4>
            <p className="text-sm text-gray-400 mb-4">قريباً على متجر التطبيقات</p>
            <div className="space-y-3">
              <div className="bg-zinc-900 border border-white/5 p-3 rounded-lg flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">🍎</div>
                <div>
                  <div className="text-[10px] text-gray-500">Download on the</div>
                  <div className="text-xs font-bold text-white">App Store</div>
                </div>
              </div>
              <div className="bg-zinc-900 border border-white/5 p-3 rounded-lg flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">🤖</div>
                <div>
                  <div className="text-[10px] text-gray-500">Get it on</div>
                  <div className="text-xs font-bold text-white">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} نتفليكس العرب. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <span>صُنع بكل ❤️ لعشاق السينما العربية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
