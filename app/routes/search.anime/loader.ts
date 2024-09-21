import { defer, json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchAnimeSearch } from "~/lib/api/fetch-data";
import { getAnimeSearchParams } from "~/lib/api/get-search-params";
import { animeQuery, BASE_URL } from "~/lib/api/queries";
import {
  currentSeason,
  currentSeasonYear,
  nextSeason,
  nextSeasonYear,
} from "~/lib/seasons";
import { AnimesList } from "~/lib/types/query-types";

export const animeLoader = async ({ request }: LoaderFunctionArgs) => {
  const queryClient = new QueryClient();
  const params: Record<string, string | undefined> =
    getAnimeSearchParams(request);
  const hasParams = Object.values(params).some((value) => value !== undefined);

  if (!hasParams) {
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
        cacheTtl: 5,
        cacheEverything: true,
      },
    };
    const res = await fetch(BASE_URL, options);
    const data: { data: AnimesList } = await res.json();
    return defer(
      { data: data.data },
      {
        headers: {
          "Cache-Control": "public, stale-while-revalidate=6000",
        },
      }
    );
  } else {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["search-anime"],
      queryFn: async ({ pageParam }) =>
        await fetchAnimeSearch({ pageParam, params }),
      initialPageParam: 1,
    });
    const dehydratedState = dehydrate(queryClient);
    return json(
      { dehydratedState },
      {
        headers: {
          "Cache-Control": "public, stale-while-revalidate=6000",
        },
      }
    );
  }
};
