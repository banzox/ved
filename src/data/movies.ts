export interface MovieDetails {
  id: string;
  title: string;
  description: string;
  rating: number;
  year: number;
  duration: string;
  genre: string[];
  image: string; // للصورة المصغرة (Thumbnail)
  coverImage?: string; // للخلفية العريضة (Background/Cover) - اختياري
  videoUrl?: string; // رابط المشاهدة (YouTube iframe url مثلاً)
  type: 'movie' | 'series';
}

export const allContent: MovieDetails[] = [
  // ----------- الأفلام -----------
  {
    id: "1",
    title: "أوبنهايمر",
    description: "قصة العالم جيه. روبرت أوبنهايمر ودوره في تطوير القنبلة الذرية.",
    rating: 8.9,
    year: 2023,
    duration: "180 دقيقة",
    genre: ["سيرة ذاتية", "دراما", "تاريخ"],
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
    type: "movie"
  },
  {
    id: "2",
    title: "قاتل الشياطين",
    description: "تكملة لأحداث الأنمي الشهير في فيلم مليء بالإثارة والتشويق.",
    rating: 9.1,
    year: 2024,
    duration: "110 دقيقة",
    genre: ["أنمي", "أكشن", "خيال"],
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1935&auto=format&fit=crop",
    type: "movie"
  },
  {
    id: "3",
    title: "مدينة الكويكبات",
    description: "فيلم خيال علمي كوميدي يحمل طابعاً فنياً فريداً.",
    rating: 7.5,
    year: 2023,
    duration: "105 دقيقة",
    genre: ["كوميديا", "خيال علمي"],
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop",
    type: "movie"
  },
  
  // ----------- المسلسلات -----------
  {
    id: "10",
    title: "صراع العروش",
    description: "صراع ملحمي بين العائلات النبيلة للسيطرة على العرش الحديدي.",
    rating: 9.5,
    year: 2019,
    duration: "60 دقيقة/حلقة",
    genre: ["دراما", "فانتازيا", "أكشن"],
    image: "https://images.unsplash.com/photo-1588675646184-f5b0b0b0b6d2?q=80&w=1974&auto=format&fit=crop",
    type: "series"
  },
  {
    id: "11",
    title: "بريكنج باد",
    description: "مدرس كيمياء يتحول إلى صانع مخدرات بعد تشخيصه بمرض السرطان.",
    rating: 9.8,
    year: 2013,
    duration: "47 دقيقة/حلقة",
    genre: ["دراما", "جريمة", "إثارة"],
    image: "https://images.unsplash.com/photo-1550029330-01962f2f7b19?q=80&w=2015&auto=format&fit=crop",
    type: "series"
  }
];

// دوال مساعدة لجلب البيانات
export const getLatestMovies = () => allContent.filter(c => c.type === 'movie');
export const getExclusiveSeries = () => allContent.filter(c => c.type === 'series');
export const getContentById = (id: string) => allContent.find(c => c.id === id);
