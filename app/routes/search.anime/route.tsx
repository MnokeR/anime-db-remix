import Form from "./components/Form";
import AnimeSearchResults from "./components/AnimeSearchResults";
import { HydrationBoundary } from "@tanstack/react-query";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import Loading from "~/components/Loading";
import AnimeListCat from "../_index/components/AnimeListCat";
import { animeLoader } from "./loader";

export const loader = animeLoader;

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
