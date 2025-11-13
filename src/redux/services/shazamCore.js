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
    // Get Top tracks in city
    getTopCharts: builder.query({
      query: () => "/shazam/top_tracks_city",
    }),

    // Get Top artist tracks
    getSongsByGenre: builder.query({
      query: () => "/shazam/top_artist_tracks",
    }),

    // Get Top tracks in country
    getSongsByCountry: builder.query({
      query: (countryCode) =>
        `/shazam/top_tracks_country?country=${countryCode}&limit=20`,
    }),

    // Get Search track
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/shazam/search_artist?query=${encodeURIComponent(
          searchTerm
        )}&limit=10`,
    }),
    // Search for artists
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/shazam/search_artist?query=${encodeURIComponent(
          searchTerm
        )}&limit=10`,
    }),

    // Get About artist
    getArtistDetails: builder.query({
      query: () => "/shazam/about_artist",
    }),

    // Get About Track
    getTrackDetails: builder.query({
      query: () => "/shazam/about_track",
    }),

    // Get top artists
    getTopArtists: builder.query({
      query: () => "/shazam/top_artist_tracks",
    }),

    // Get artist top tracks
    getArtistTopTracks: builder.query({
      query: (artistId) => `/shazam/top_artist_tracks?artist_id=${artistId}`,
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
