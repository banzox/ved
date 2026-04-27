import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Star, Clock, Calendar, PlayCircle } from "lucide-react";
import { allContent } from "@/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import WatchSection from "@/components/WatchSection";
import WatchlistButton from "@/components/WatchlistButton";
import ShareButton from "@/components/ShareButton";
import MovieCard from "@/components/MovieCard";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const movieData: any = allContent.find((c: any) => c.id === id);
  
  if (!movieData) return { title: "غير موجود" };

  return {
    title: `${movieData.title} - مشاهدة مباشرة`,
    description: movieData.description,
    openGraph: {
      title: movieData.title,
      description: movieData.description,
      images: [movieData.image],
    },
  };
}

export function generateStaticParams() {
  return allContent.map((item) => ({
    id: item.id,
  }));
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const movieData: any = allContent.find((c: any) => c.id === id);

  if (!movieData) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-background pb-20 relative" dir="rtl">
      {/* Background Cover Image Backdrop */}
      {movieData.coverImage && (
        <div 
          className="absolute top-0 left-0 w-full h-[60vh] z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url(${movieData.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to bottom, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
          }}
        />
      )}

      <div className="relative z-10">
        <Navbar />
        
        <WatchSection 
          initialVideoUrl={movieData.videoUrl} 
          episodes={movieData.episodes} 
        />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Details */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{movieData.title}</h1>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold">HD</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-1 text-yellow-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{movieData.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{movieData.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{movieData.duration}</span>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              {movieData.genre?.map((g: string, i: number) => (
                <Link 
                  key={i} 
                  href={`/genre/${encodeURIComponent(g)}`}
                  className="px-3 py-1 bg-zinc-800 border border-white/5 rounded-full text-xs text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  {g}
                </Link>
              ))}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 border-r-4 border-blue-500 pr-4">
              {movieData.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <WatchlistButton id={movieData.id} />
              <ShareButton title={movieData.title} />
            </div>
          </div>

          {/* Info Card */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 sticky top-24 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                معلومات العمل
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>النوع</span>
                  <span className="text-white font-bold">{movieData.type === 'movie' ? 'فيلم' : 'مسلسل'}</span>
                </div>
                <div className="border-t border-white/5"></div>
                <div className="flex justify-between text-gray-400">
                  <span>السنة</span>
                  <span className="text-white font-bold">{movieData.year}</span>
                </div>
                <div className="border-t border-white/5"></div>
                <div className="flex justify-between text-gray-400">
                  <span>التقييم</span>
                  <span className="text-yellow-500 font-bold">{movieData.rating} / 10</span>
                </div>
                <div className="border-t border-white/5"></div>
                <div className="flex justify-between text-gray-400">
                  <span>المدة</span>
                  <span className="text-white font-bold">{movieData.duration}</span>
                </div>
                {movieData.episodes && (
                  <>
                    <div className="border-t border-white/5"></div>
                    <div className="flex justify-between text-gray-400">
                      <span>عدد الحلقات</span>
                      <span className="text-white font-bold">{movieData.episodes.length}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Content */}
        {(() => {
          const related = allContent
            .filter((c: any) => c.id !== movieData.id && c.genre?.some((g: string) => movieData.genre?.includes(g)))
            .slice(0, 5);
          if (related.length === 0) return null;
          return (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6 border-r-4 border-blue-500 pr-3">أعمال مشابهة</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {related.map((item: any) => (
                  <div key={item.id} className="w-full">
                    <MovieCard movie={item} />
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
      </div>
    </main>
  );
}
