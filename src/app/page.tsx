import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import MovieCarousel from "@/components/MovieCarousel";
import moviesData from "@/data/movies.json";

export default function Home() {
  const latestMovies = moviesData.content.filter((c: any) => c.type === 'movie');
  const exclusiveSeries = moviesData.content.filter((c: any) => c.type === 'series');

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />
      <HeroSlider />
      
      <div className="mt-[-2rem] relative z-20">
        <MovieCarousel title="أحدث الأفلام" movies={latestMovies} />
        <MovieCarousel title="مسلسلات حصرية" movies={exclusiveSeries} />
        <MovieCarousel title="أفلام الأكشن والإثارة" movies={[...latestMovies].reverse()} />
      </div>
    </main>
  );
}
