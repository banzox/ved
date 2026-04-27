import Navbar from "@/components/Navbar";
import { Star, Clock, Calendar, Download, PlayCircle, Share2, Heart } from "lucide-react";
import moviesData from "@/data/movies.json";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return moviesData.content.map((item) => ({
    id: item.id,
  }));
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const movieData: any = moviesData.content.find((c: any) => c.id === id);

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
        
        {/* Player Section */}
        <div className="pt-16 bg-black/50 w-full">
          <div className="max-w-5xl mx-auto aspect-video relative group">
            {movieData.videoUrl ? (
              <iframe 
                src={movieData.videoUrl} 
                className="w-full h-full border-x border-b border-zinc-800"
                allowFullScreen 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 border-x border-b border-zinc-800 flex flex-col items-center justify-center text-zinc-500">
                <PlayCircle className="w-20 h-20 mb-4 opacity-50 group-hover:opacity-100 group-hover:text-blue-500 transition-all cursor-pointer transform group-hover:scale-110" />
                <p className="text-xl">لا يوجد رابط مشغل متاح حالياً</p>
              </div>
            )}
          </div>
        </div>

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
                <span key={i} className="px-3 py-1 bg-zinc-800 border border-white/5 rounded-full text-xs text-gray-300">
                  {g}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 border-r-4 border-blue-500 pr-4">
              {movieData.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                <Heart className="w-5 h-5" />
                أضف للقائمة
              </button>
              <button className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                <Share2 className="w-5 h-5" />
                مشاركة
              </button>
            </div>
          </div>

          {/* Download Section */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 sticky top-24 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-500" />
                روابط التحميل
              </h3>
              
              <div className="space-y-3">
                <button className="w-full group relative flex items-center justify-between p-4 rounded-lg bg-zinc-800 hover:bg-blue-600 transition-all border border-white/5 overflow-hidden">
                  <span className="font-bold text-white relative z-10">جودة 1080p</span>
                  <span className="text-xs text-gray-400 group-hover:text-white/80 relative z-10">2.4 GB</span>
                </button>
                
                <button className="w-full group relative flex items-center justify-between p-4 rounded-lg bg-zinc-800 hover:bg-blue-600 transition-all border border-white/5 overflow-hidden">
                  <span className="font-bold text-white relative z-10">جودة 720p</span>
                  <span className="text-xs text-gray-400 group-hover:text-white/80 relative z-10">1.2 GB</span>
                </button>
                
                <button className="w-full group relative flex items-center justify-between p-4 rounded-lg bg-zinc-800 hover:bg-blue-600 transition-all border border-white/5 overflow-hidden">
                  <span className="font-bold text-white relative z-10">جودة 480p</span>
                  <span className="text-xs text-gray-400 group-hover:text-white/80 relative z-10">600 MB</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
