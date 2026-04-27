import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { allMovies } from "@/data";

export default function MoviesPage() {
  const movies = allMovies;

  return (
    <main className="min-h-screen bg-background pb-20" dir="rtl">
      <Navbar />
      
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 border-r-4 border-blue-500 pr-3">
          كل الأفلام
        </h1>
        
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie: any) => (
              <div key={movie.id} className="w-full">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">لا توجد أفلام متاحة حالياً.</p>
          </div>
        )}
      </div>
    </main>
  );
}
