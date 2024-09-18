import { AnimeSearch, SearchParams } from "../types/query-types";
import { BASE_URL, searchQuery } from "./queries";

export const fetchSearchData = async ({
  pageParam = 1,
  params,
}: {
  pageParam: number;
  params: SearchParams;
}) => {
  const variables = {
    search: params.term,
    type: params.type ? params.type : "ANIME",
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
      "Cache-Control": "max-age-1500, public",
    },
    body: JSON.stringify({
      query: searchQuery,
      variables,
    }),
    cf: {
      cacheTtl: 5,
      cacheEverything: true,
    },
  };
  const resp = await fetch(BASE_URL, options);

  if (!resp.ok) throw new Error(`Network error: ${resp.statusText}`);

  const data = await resp.json();
  return data as { data: AnimeSearch };
};
