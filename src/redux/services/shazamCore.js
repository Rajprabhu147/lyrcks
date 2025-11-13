/* eslint-disable no-await-in-loop */
/* eslint-disable no-promise-executor-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://shazam-api6.p.rapidapi.com";

// raw baseQuery reading key from Vite env and adding Host header
const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const key = import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY;
    if (key) {
      headers.set("X-RapidAPI-Key", key);
      headers.set("X-RapidAPI-Host", "shazam-api6.p.rapidapi.com");
    }
    return headers;
  },
});

// wrapper to log API errors and retry on 429 (exponential backoff)
const baseQueryWithRetry = async (args, api, extraOptions) => {
  let result;
  let delay = 500;
  const maxAttempts = 4;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    result = await rawBaseQuery(args, api, extraOptions);

    if (result?.error) {
      // eslint-disable-next-line no-console
      console.error("Shazam API error:", {
        status: result.error.status,
        data: result.error.data ?? result.error,
        args,
        attempt,
      });
    }

    // if not rate-limited, return immediately
    if (!result?.error || result.error.status !== 429) {
      return result;
    }

    // if 429, check Retry-After header (in seconds) and wait accordingly
    const retryAfter =
      result?.meta?.response?.headers?.get?.("Retry-After") ??
      result?.meta?.response?.headers?.get?.("retry-after") ??
      "0";
    const waitMs =
      parseInt(retryAfter, 10) > 0 ? parseInt(retryAfter, 10) * 1000 : delay;

    if (attempt < maxAttempts) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, waitMs));
      delay *= 2;
      // eslint-disable-next-line no-continue
      continue;
    }

    return result; // give up after max attempts
  }

  return result;
};

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    // Top charts / songs globally
    getTopCharts: builder.query({
      query: () => "/shazam/top_tracks_chart",
    }),

    // Top songs by genre (guard empty genre)
    getSongsByGenre: builder.query({
      query: (genre) => {
        if (!genre) return "/shazam/top_tracks_chart";
        return `/shazam/top_tracks_chart?genre=${encodeURIComponent(
          genre
        )}&limit=20`;
      },
    }),

    // Song details by track ID (guard and encode)
    getSongDetails: builder.query({
      query: ({ songid }) => {
        if (!songid) return "/shazam/get_track_details";
        return `/shazam/get_track_details?track_id=${encodeURIComponent(
          songid
        )}`;
      },
    }),

    // Related songs for a track
    getSongRelated: builder.query({
      query: ({ songid }) => {
        if (!songid) return "/shazam/related_tracks";
        return `/shazam/related_tracks?track_id=${encodeURIComponent(songid)}`;
      },
    }),

    // Artist details
    getArtistDetails: builder.query({
      query: (artistId) => {
        if (!artistId) return "/shazam/get_artist_details";
        return `/shazam/get_artist_details?artist_id=${encodeURIComponent(
          artistId
        )}`;
      },
    }),

    // Top artists chart
    getTopArtists: builder.query({
      query: () => "/shazam/top_artists_chart",
    }),

    // Top songs by country (guard empty countryCode)
    getSongsByCountry: builder.query({
      query: (countryCode) => {
        if (!countryCode) return "/shazam/top_tracks_chart";
        return `/shazam/top_tracks_chart?country=${encodeURIComponent(
          countryCode
        )}&limit=20`;
      },
    }),

    // Search songs and artists
    getSongsBySearch: builder.query({
      query: (searchTerm) => {
        if (!searchTerm) return "/shazam/search";
        return `/shazam/search?query=${encodeURIComponent(
          searchTerm
        )}&limit=10`;
      },
    }),

    // Artist top tracks
    getArtistTopTracks: builder.query({
      query: (artistId) => {
        if (!artistId) return "/shazam/get_artist_top_tracks";
        return `/shazam/get_artist_top_tracks?artist_id=${encodeURIComponent(
          artistId
        )}`;
      },
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
