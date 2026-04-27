import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { allContent } from "@/data";

export function generateStaticParams() {
  const genres = new Set<string>();
  allContent.forEach((movie: any) => {
    movie.genre.forEach((g: string) => genres.add(g));
  });
  
  return Array.from(genres).map((genre) => ({
    genre: encodeURIComponent(genre),
  }));
}

export default async function GenrePage({ params }: { params: Promise<{ genre: string }> }) {
  const { genre: encodedGenre } = await params;
  const genre = decodeURIComponent(encodedGenre);

  const results = allContent.filter((movie: any) => 
    movie.genre.some((g: string) => g.toLowerCase() === genre.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background pb-20" dir="rtl">
      <Navbar />
      
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-2 border-r-4 border-blue-500 pr-3">
          تصنيف: {genre}
        </h1>
        <p className="text-gray-400 mb-8">يوجد {results.length} عمل في هذا التصنيف</p>
        
        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {results.map((movie: any) => (
              <div key={movie.id} className="w-full">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">لا توجد أعمال متاحة في هذا التصنيف حالياً.</p>
          </div>
        )}
      </div>
    </main>
  );
}
