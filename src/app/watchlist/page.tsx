"use client";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { allContent } from "@/data";
import { useWatchlist } from "@/hooks/useWatchlist";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  const savedMovies = allContent.filter((movie: any) => 
    watchlist.includes(movie.id)
  );

  return (
    <main className="min-h-screen bg-background pb-20" dir="rtl">
      <Navbar />
      
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-2 border-r-4 border-blue-500 pr-3">
          قائمتي
        </h1>
        <p className="text-gray-400 mb-8">لديك {savedMovies.length} عمل محفوظ</p>
        
        {savedMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {savedMovies.map((movie: any) => (
              <div key={movie.id} className="w-full">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 bg-zinc-900/50 border border-white/5 rounded-2xl">
            <p className="text-xl mb-4">قائمة مفضلاتك فارغة حالياً.</p>
            <p className="text-sm">تصفح الأفلام وأضف ما يعجبك هنا لمشاهدته لاحقاً!</p>
          </div>
        )}
      </div>
    </main>
  );
}
