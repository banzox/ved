"use client";
import { Play, Info } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import moviesData from "@/data/movies.json";

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get latest 3 movies or series that have a coverImage
  const featured = moviesData.content
    .filter((item: any) => item.coverImage || item.image)
    .slice(-3)
    .reverse();

  useEffect(() => {
    if (featured.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const currentItem: any = featured[currentIndex];

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] flex items-center bg-zinc-900 overflow-hidden" dir="rtl">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url('${currentItem.coverImage || currentItem.image}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-background/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20">
        <div className="max-w-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4" key={currentItem.id}>
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
            {currentItem.type === 'movie' ? 'فيلم مميز' : 'مسلسل مميز'}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {currentItem.title}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 line-clamp-3">
            {currentItem.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href={`/watch/${currentItem.id}`} 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
              شاهد الآن
            </Link>
            <Link 
              href={`/watch/${currentItem.id}`} 
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10 px-8 py-3 rounded-lg font-bold transition-all"
            >
              <Info className="w-5 h-5" />
              المزيد من التفاصيل
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
