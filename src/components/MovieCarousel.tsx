"use client";
import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import MovieCard, { Movie } from "./MovieCard";

export default function MovieCarousel({ title, movies }: { title: string, movies: Movie[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // In RTL, right scroll is positive, left is negative (but depends on browser)
      // Usually, scrolling right means we want to see more content to the left
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 w-full" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white border-r-4 border-blue-500 pr-3">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-zinc-800/80 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors border border-white/5"
            aria-label="تمرير لليمين"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-zinc-800/80 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors border border-white/5"
            aria-label="تمرير لليسار"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative group w-full">
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-4"
        >
          {movies.map(movie => (
            <div key={movie.id} className="flex-none">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
