import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-api7.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_SHAZAM_API_KEY);
      headers.set("X-RapidAPI-Host", "shazam-api7.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get top charts globally
    getTopCharts: builder.query({
      query: () => "/charts/get-top-songs-in-world",
    }),

    // Get charts by country
    getChartsByCountry: builder.query({
      query: (countryCode) =>
        `/charts/get-top-songs-in-country?country_code=${countryCode}`,
    }),

    // Get charts by city
    getChartsByCity: builder.query({
      query: ({ cityName, countryCode }) =>
        `/charts/get-top-songs-in-city?city_name=${cityName}&country_code=${countryCode}`,
    }),

    // Search for songs/artists
    searchSongs: builder.query({
      query: (searchTerm) => `/search?query=${searchTerm}`,
    }),

    // Get song details by track ID
    getSongDetails: builder.query({
      query: (trackId) => `/songs/get-details?id=${trackId}`,
    }),

    // Get related songs
    getRelatedSongs: builder.query({
      query: (trackId) => `/songs/list-similarities?id=${trackId}`,
    }),

    // Get artist details
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/get-details?id=${artistId}`,
    }),

    // Get artist top songs
    getArtistTopSongs: builder.query({
      query: (artistId) => `/artists/get-top-songs?id=${artistId}`,
    }),

    // Get artist albums
    getArtistAlbums: builder.query({
      query: (artistId) => `/artists/get-albums?id=${artistId}`,
    }),

    // Get song lyrics (if available)
    getSongLyrics: builder.query({
      query: (trackId) => `/songs/get-lyrics?id=${trackId}`,
    }),

    // Get similar artists
    getSimilarArtists: builder.query({
      query: (artistId) => `/artists/get-similar?id=${artistId}`,
    }),

    // Get album details
    getAlbumDetails: builder.query({
      query: (albumId) => `/albums/get-details?id=${albumId}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetChartsByCountryQuery,
  useGetChartsByCityQuery,
  useSearchSongsQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
  useGetArtistAlbumsQuery,
  useGetSongLyricsQuery,
  useGetSimilarArtistsQuery,
  useGetAlbumDetailsQuery,
} = shazamApi;
