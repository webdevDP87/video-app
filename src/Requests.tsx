const apiKey: string = '8bd571e7945e3a610f397bff1b4b6727';
let type

type Requests = {
    fetchTrendingAll: string;
    fetchTrendingMovies: string;
    fetchTrendingTV: string;
    fetchActionMovies: string;
    fetchHistoryMovies: string;
    fetchSinceFictionMovies: string;
    fetchComedyTVShows: string;
    fetchMisteryTVShows: string;
    fetchWarAndPoliticsTVShows: string;
    fetchGenres: string;
};

export const requests: Requests = {
    fetchTrendingAll: `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${apiKey}`,
    fetchTrendingMovies: `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${apiKey}`,
    fetchTrendingTV: `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${apiKey}`,
    fetchActionMovies: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&vote_average.gte=8&with_genres=28&api_key=${apiKey}`,
    fetchHistoryMovies: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&vote_average.gte=8&with_genres=36&api_key=${apiKey}`,
    fetchSinceFictionMovies: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&vote_average.gte=8&with_genres=878&api_key=${apiKey}`,
    fetchComedyTVShows: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=vote_count.desc&vote_average.gte=8&with_genres=35&api_key=${apiKey}`,
    fetchMisteryTVShows: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=vote_count.desc&vote_average.gte=8&with_genres=9648&api_key=${apiKey}`,
    fetchWarAndPoliticsTVShows: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=vote_count.desc&vote_average.gte=8&with_genres=10768&api_key=${apiKey}`,
    fetchGenres: `https://api.themoviedb.org/3/genre/${type}/list&api_key=${apiKey}`,
}