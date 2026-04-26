"use client";
import { Play, Info } from "lucide-react";
import Link from "next/link";

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] flex items-center bg-zinc-900 overflow-hidden" dir="rtl">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-background/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
            حصرياً
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            المهمة المستحيلة: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              الحساب الميت
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 line-clamp-3">
            يعود إيثان هانت وفريقه في أخطر مهمة لهم على الإطلاق: تعقب سلاح مرعب جديد يهدد البشرية جمعاء قبل أن يقع في الأيدي الخطأ.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/watch/1" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
              شاهد الآن
            </Link>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10 px-8 py-3 rounded-lg font-bold transition-all">
              <Info className="w-5 h-5" />
              المزيد من التفاصيل
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
