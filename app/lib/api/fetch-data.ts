import { AnimeSearch, SearchParams } from "../types/query-types";
import { BASE_URL, animeSearchQuery, mangaSearchQuery } from "./queries";

export const fetchAnimeSearch = async ({
  pageParam = 1,
  params,
}: {
  pageParam: number;
  params: SearchParams;
}) => {
  const variables = {
    search: params.term,
    type: "ANIME",
    genres: params.genres,
    seasonYear: params.year,
    season: params.season,
    format: params.format,
    status: params.airStatus,
    sort: params.term ? "SEARCH_MATCH" : params.sort,
    page: pageParam,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "Cache-Control": "public, max-age=120, stale-while-revalidate=900",
    },
    body: JSON.stringify({
      query: animeSearchQuery,
      variables,
    }),
    cf: {
      cacheTtl: 0,
      cacheEverything: true,
    },
  };

  try {
    const resp = await fetch(BASE_URL, options);
    const data = await resp.json();
    return data as { data: AnimeSearch };
  } catch (error) {
    console.error(error);
  }
};

export const fetchMangaSearch = async ({
  pageParam = 1,
  params,
}: {
  pageParam: number;
  params: SearchParams;
}) => {
  const variables = {
    search: params.term,
    type: "MANGA",
    genres: params.genres,
    year: params.year ? params.year + "%" : undefined,
    season: params.season,
    format: params.format,
    status: params.airStatus,
    sort: params.term ? "SEARCH_MATCH" : params.sort,
    page: pageParam,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "Cache-Control": "public, max-age=120, stale-while-revalidate=900",
    },
    body: JSON.stringify({
      query: mangaSearchQuery,
      variables,
    }),
    cf: {
      cacheTtl: 0,
      cacheEverything: true,
    },
  };
  try {
    const resp = await fetch(BASE_URL, options);
    const data = await resp.json();
    return data as { data: AnimeSearch };
  } catch (error) {
    console.error(error);
  }
};
