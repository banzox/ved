"use client";
import { useState, useEffect } from "react";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse watchlist", e);
      }
    }
  }, []);

  const toggleWatchlist = (id: string) => {
    const newWatchlist = watchlist.includes(id)
      ? watchlist.filter((itemId) => itemId !== id)
      : [...watchlist, id];
    
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  const isInWatchlist = (id: string) => watchlist.includes(id);

  return { watchlist, toggleWatchlist, isInWatchlist };
}
