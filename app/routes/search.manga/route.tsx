import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import Loading from "~/components/Loading";

import { BASE_URL } from "~/lib/api/queries";
import { mangaOptions } from "~/lib/api/query-options";
import { MangaList } from "~/lib/types/query-types";
import AnimeListCat from "../_index/components/AnimeListCat";
import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getMangaSearchParams } from "~/lib/api/get-search-params";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchMangaSearch } from "~/lib/api/fetch-data";
import MangaSearchResults from "./components/MangaSearchResults";
import Form from "../search.anime/components/Form";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const queryClient = new QueryClient();
  const params: Record<string, string | undefined> =
    getMangaSearchParams(request);
  const hasParams = Object.values(params).some((value) => value !== undefined);

  if (!hasParams) {
    const res = await fetch(BASE_URL, mangaOptions);
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

function SearchManga() {
  const loaderData = useLoaderData<typeof loader>();
  const data = "data" in loaderData ? loaderData.data : undefined;
  const dehydratedState =
    "dehydratedState" in loaderData ? loaderData.dehydratedState : undefined;

  return (
    <>
      <section>
        <Form />
      </section>
      {data && (
        <section className="flex flex-col gap-10 view-transition">
          <Suspense fallback={<Loading />}>
            <Await resolve={data}>
              <AnimeListCat
                tReg="TRENDING"
                tRed="NOW"
                cat={data.trending.media}
              />
              <AnimeListCat
                tReg="POPULAR"
                tRed="MANHWA"
                cat={data.manhwa.media}
              />

              <AnimeListCat
                tReg="MOST"
                tRed="POPULAR"
                cat={data.popular.media}
              />
              <AnimeListCat tReg="TOP" tRed="RATED" cat={data.top.media} />
            </Await>
          </Suspense>
        </section>
      )}
      {dehydratedState && (
        <HydrationBoundary state={dehydratedState}>
          <MangaSearchResults />
        </HydrationBoundary>
      )}
    </>
  );
}

export default SearchManga;
