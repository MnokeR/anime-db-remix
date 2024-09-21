import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import AnimeListCat from "../_index/components/AnimeListCat";
import { HydrationBoundary } from "@tanstack/react-query";
import MangaSearchResults from "./components/MangaSearchResults";
import Form from "../search.anime/components/Form";
import { mangaLoader } from "./loader";
import LoadingSkeleton from "~/components/LoadingSkeleton";

export const loader = mangaLoader;

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
        <Suspense fallback={<LoadingSkeleton />}>
          <section className="flex flex-col gap-10 view-transition">
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
          </section>
        </Suspense>
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
