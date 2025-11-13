/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-api6.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY
      );
      headers.set("X-RapidAPI-Host", "shazam-api6.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get top charts/songs globally
    getTopCharts: builder.query({
      query: () => "/shazam/top_tracks_chart",
    }),

    // Get top songs by genre
    getSongsByGenre: builder.query({
      query: (genre) => `/shazam/top_tracks_chart?genre=${genre}&limit=20`,
    }),

    // Get song details by track ID
    getSongDetails: builder.query({
      query: ({ songid }) => `/shazam/get_track_details?track_id=${songid}`,
    }),

    // Get related songs
    getSongRelated: builder.query({
      query: ({ songid }) => `/shazam/related_tracks?track_id=${songid}`,
    }),

    // Get artist details
    getArtistDetails: builder.query({
      query: (artistId) => `/shazam/get_artist_details?artist_id=${artistId}`,
    }),

    // Get top artists
    getTopArtists: builder.query({
      query: () => "/shazam/top_artists_chart",
    }),

    // Get top songs by country
    getSongsByCountry: builder.query({
      query: (countryCode) =>
        `/shazam/top_tracks_chart?country=${countryCode}&limit=20`,
    }),

    // Search for songs and artists
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/shazam/search?query=${encodeURIComponent(searchTerm)}&limit=10`,
    }),

    // Get artist top tracks
    getArtistTopTracks: builder.query({
      query: (artistId) =>
        `/shazam/get_artist_top_tracks?artist_id=${artistId}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetTopArtistsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistTopTracksQuery,
} = shazamCoreApi;
