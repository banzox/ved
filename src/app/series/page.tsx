import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { allSeries } from "@/data";

export default function SeriesPage() {
  const series = allSeries;

  return (
    <main className="min-h-screen bg-background pb-20" dir="rtl">
      <Navbar />
      
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 border-r-4 border-blue-500 pr-3">
          كل المسلسلات
        </h1>
        
        {series.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {series.map((item: any) => (
              <div key={item.id} className="w-full">
                <MovieCard movie={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">لا توجد مسلسلات متاحة حالياً.</p>
          </div>
        )}
      </div>
    </main>
  );
}
