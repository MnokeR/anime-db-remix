import Form from "./components/Form";
import AnimeSearchResults from "./components/AnimeSearchResults";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAnimeSearchParams } from "~/lib/api/get-search-params";
import { BASE_URL } from "~/lib/api/queries";
import { animeOptions } from "~/lib/api/query-options";
import { AnimesList } from "~/lib/types/query-types";
import { defer, json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { fetchAnimeSearch } from "~/lib/api/fetch-data";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import Loading from "~/components/Loading";
import AnimeListCat from "../_index/components/AnimeListCat";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const queryClient = new QueryClient();
  const params: Record<string, string | undefined> =
    getAnimeSearchParams(request);
  const hasParams = Object.values(params).some((value) => value !== undefined);

  if (!hasParams) {
    const res = await fetch(BASE_URL, animeOptions);
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

function SearchAnime() {
  const loaderData = useLoaderData<typeof loader>();
  const data = "data" in loaderData ? loaderData.data : undefined;
  const dehydratedState =
    "dehydratedState" in loaderData ? loaderData.dehydratedState : undefined;

  return (
    <>
      <section className="no-transition">
        <Form />
      </section>
      {data && (
        <section className="flex flex-col gap-10 view-transition">
          <Suspense fallback={<Loading />}>
            <Await resolve={data}>
              {
                <>
                  <AnimeListCat
                    tReg="TRENDING"
                    tRed="NOW"
                    cat={data.trending.media}
                  />
                  <AnimeListCat
                    tReg="CURRENT"
                    tRed="SEASON"
                    cat={data.season.media}
                  />
                  <AnimeListCat
                    tReg="NEXT"
                    tRed="SEASON"
                    cat={data.nextSeason.media}
                  />
                  <AnimeListCat
                    tReg="MOST"
                    tRed="POPULAR"
                    cat={data.popular.media}
                  />
                  <AnimeListCat tReg="TOP" tRed="RATED" cat={data.top.media} />
                </>
              }
            </Await>
          </Suspense>
        </section>
      )}
      {dehydratedState && (
        <HydrationBoundary state={dehydratedState}>
          <AnimeSearchResults />
        </HydrationBoundary>
      )}
    </>
  );
}

export default SearchAnime;
