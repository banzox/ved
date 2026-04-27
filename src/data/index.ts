import moviesData from './movies.json';
import seriesData from './series.json';

export const allMovies = moviesData.content || [];
export const allSeries = seriesData.content || [];

export const allContent = [...allMovies, ...allSeries];

export const getLatestMovies = (limit: number = 10) => {
  return [...allMovies].reverse().slice(0, limit);
};

export const getLatestSeries = (limit: number = 10) => {
  return [...allSeries].reverse().slice(0, limit);
};

export const getFeaturedContent = (limit: number = 3) => {
  return allContent
    .filter((item: any) => item.coverImage || item.image)
    .slice(-limit)
    .reverse();
};

export const getContentById = (id: string) => {
  return allContent.find((item: any) => item.id === id);
};
