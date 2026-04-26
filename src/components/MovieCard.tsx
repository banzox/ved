import Link from "next/link";
import { Star, Play } from "lucide-react";

export interface Movie {
  id: string;
  title: string;
  rating: number;
  year: number;
  image: string;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/watch/${movie.id}`} className="group relative block w-40 md:w-48 shrink-0 rounded-xl overflow-hidden bg-zinc-800 transition-all duration-300 hover:scale-105 hover:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <div className="aspect-[2/3] relative w-full">
        {/* We use an img tag instead of next/image since unoptimized is true and it's easier for arbitrary URLs in demo */}
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
          <div className="bg-blue-600/90 rounded-full p-4 shadow-lg shadow-blue-500/30 backdrop-blur-sm">
            <Play className="w-6 h-6 text-white fill-current ml-1" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-right">
          <h3 className="text-white font-bold text-sm md:text-base line-clamp-1 mb-1">{movie.title}</h3>
          <div className="flex items-center justify-between text-xs text-gray-300">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-3 h-3 fill-current" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
            <span>{movie.year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
