import { defer } from "@remix-run/cloudflare";
import { animeQuery, BASE_URL } from "~/lib/api/queries";
import {
  currentSeason,
  currentSeasonYear,
  nextSeason,
  nextSeasonYear,
} from "~/lib/seasons";
import { AnimesList } from "~/lib/types/query-types";

export const homeLoader = async () => {
  const variables = {
    season: currentSeason,
    seasonYear: currentSeasonYear,
    nextSeason: nextSeason,
    nextYear: nextSeasonYear,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: animeQuery,
      variables,
    }),
    cf: {
      cacheTtl: 0,
      cacheEverything: true,
    },
  };
  const res = await fetch(BASE_URL, options);
  const data: { data: AnimesList } = await res.json();
  if (!data || !data.data) {
    throw new Response("Failed to load data", { status: 500 });
  }
  return defer(
    { data: data.data },
    {
      headers: {
        "Cache-Control": "public, max-age=120, stale-while-revalidate=900",
      },
    }
  );
};
