"use client";
import { useState } from "react";
import { PlayCircle, ChevronDown, List } from "lucide-react";

interface Episode {
  season: number;
  episode: number;
  title?: string;
  videoUrl: string;
}

interface WatchSectionProps {
  initialVideoUrl?: string;
  episodes?: Episode[];
}

export default function WatchSection({ initialVideoUrl, episodes }: WatchSectionProps) {
  const [currentUrl, setCurrentUrl] = useState(initialVideoUrl || (episodes && episodes.length > 0 ? episodes[0].videoUrl : ""));
  const [selectedEpisode, setSelectedEpisode] = useState(episodes && episodes.length > 0 ? 0 : -1);

  const handleEpisodeClick = (index: number, url: string) => {
    setSelectedEpisode(index);
    setCurrentUrl(url);
    // Scroll to player
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Player Section */}
      <div className="pt-16 bg-black/50 w-full">
        <div className="max-w-5xl mx-auto aspect-video relative group">
          {currentUrl ? (
            <iframe 
              src={currentUrl} 
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

      {/* Episodes Section (If any) */}
      {episodes && episodes.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-6 text-white">
              <List className="w-5 h-5 text-blue-500" />
              <h3 className="text-xl font-bold">قائمة الحلقات</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {episodes.map((ep, index) => (
                <button
                  key={index}
                  onClick={() => handleEpisodeClick(index, ep.videoUrl)}
                  className={`p-3 rounded-lg border transition-all text-center ${
                    selectedEpisode === index 
                      ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20" 
                      : "bg-zinc-800 border-white/5 text-gray-400 hover:border-blue-500/50 hover:text-white"
                  }`}
                >
                  <div className="text-xs opacity-70 mb-1">الموسم {ep.season}</div>
                  <div className="font-bold">الحلقة {ep.episode}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
