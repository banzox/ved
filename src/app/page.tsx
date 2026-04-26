import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import MovieCarousel from "@/components/MovieCarousel";

// Dummy Data
const latestMovies = [
  { id: "1", title: "أوبنهايمر", rating: 8.9, year: 2023, image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop" },
  { id: "2", title: "قاتل الشياطين", rating: 9.1, year: 2024, image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1935&auto=format&fit=crop" },
  { id: "3", title: "مدينة الكويكبات", rating: 7.5, year: 2023, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop" },
  { id: "4", title: "حرب النجوم", rating: 8.0, year: 2022, image: "https://images.unsplash.com/photo-1478479405421-ce83c92fb3ba?q=80&w=1974&auto=format&fit=crop" },
  { id: "5", title: "ذا باتمان", rating: 8.5, year: 2022, image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=2070&auto=format&fit=crop" },
  { id: "6", title: "المريخي", rating: 8.1, year: 2015, image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" },
];

const exclusiveSeries = [
  { id: "10", title: "صراع العروش", rating: 9.5, year: 2019, image: "https://images.unsplash.com/photo-1588675646184-f5b0b0b0b6d2?q=80&w=1974&auto=format&fit=crop" },
  { id: "11", title: "بريكنج باد", rating: 9.8, year: 2013, image: "https://images.unsplash.com/photo-1550029330-01962f2f7b19?q=80&w=2015&auto=format&fit=crop" },
  { id: "12", title: "أشياء غريبة", rating: 8.7, year: 2022, image: "https://images.unsplash.com/photo-1620025983226-c2250269f884?q=80&w=2015&auto=format&fit=crop" },
  { id: "13", title: "بيكي بلايندرز", rating: 8.8, year: 2022, image: "https://images.unsplash.com/photo-1625014618427-fbc980b974f5?q=80&w=1964&auto=format&fit=crop" },
  { id: "14", title: "فايكنجز", rating: 8.6, year: 2020, image: "https://images.unsplash.com/photo-1540864319808-1111623910c2?q=80&w=2070&auto=format&fit=crop" },
];

export default function Home() {
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
