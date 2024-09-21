import { defer, json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMangaSearch } from "~/lib/api/fetch-data";
import { getMangaSearchParams } from "~/lib/api/get-search-params";
import { BASE_URL, mangaQuery } from "~/lib/api/queries";
import {
  currentSeason,
  currentSeasonYear,
  nextSeason,
  nextSeasonYear,
} from "~/lib/seasons";
import { MangaList } from "~/lib/types/query-types";

export const mangaLoader = async ({ request }: LoaderFunctionArgs) => {
  const queryClient = new QueryClient();
  const params: Record<string, string | undefined> =
    getMangaSearchParams(request);
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
        query: mangaQuery,
        variables,
      }),
      cf: {
        cacheTtl: 5,
        cacheEverything: true,
      },
    };
    const res = await fetch(BASE_URL, options);
    const data: { data: MangaList } = await res.json();
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
      queryKey: ["search-manga"],
      queryFn: async ({ pageParam }) =>
        await fetchMangaSearch({ pageParam, params }),
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
