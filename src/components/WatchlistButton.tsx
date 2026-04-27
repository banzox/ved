"use client";
import { Heart } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";

export default function WatchlistButton({ id }: { id: string }) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const active = isInWatchlist(id);

  return (
    <button 
      onClick={() => toggleWatchlist(id)}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
        active 
          ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20" 
          : "bg-zinc-800 hover:bg-zinc-700 text-white border border-white/5"
      }`}
    >
      <Heart className={`w-5 h-5 ${active ? "fill-current" : ""}`} />
      {active ? "مضاف لقائمتي" : "أضف للقائمة"}
    </button>
  );
}
