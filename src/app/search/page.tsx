"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { allContent } from "@/data";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = allContent.filter((movie: any) => 
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.description.toLowerCase().includes(query.toLowerCase()) ||
    movie.genre.some((g: string) => g.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-2 border-r-4 border-blue-500 pr-3">
        نتائج البحث عن: {query}
      </h1>
      <p className="text-gray-400 mb-8">تم العثور على {results.length} نتيجة</p>
      
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
          <p className="text-xl">لم يتم العثور على نتائج تطابق بحثك.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background pb-20" dir="rtl">
      <Navbar />
      <Suspense fallback={<div className="pt-24 text-center text-white">جاري البحث...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
