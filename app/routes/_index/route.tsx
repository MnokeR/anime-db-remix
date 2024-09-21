import { defer, MetaFunction } from "@remix-run/cloudflare";
import { Suspense } from "react";
import { Await, useLoaderData } from "@remix-run/react";
import HeroSection from "./components/HeroSection";
import AnimeListCat from "./components/AnimeListCat";
import Loading from "~/components/Loading";
import { animeQuery, BASE_URL } from "~/lib/api/queries";
import {
  currentSeason,
  currentSeasonYear,
  nextSeason,
  nextSeasonYear,
} from "~/lib/seasons";
import { HomeAnimesList } from "~/lib/types/query-types";

export const meta: MetaFunction = () => {
  return [
    { title: "AnimeDB" },
    { name: "description", content: "Your source for Anime!" },
  ];
};

export const loader = async () => {
  const variables = {
    type: "ANIME",
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
  const data: { data: HomeAnimesList } = await res.json();
  return defer(
    { data: data.data },
    {
      headers: {
        "Cache-Control": "public, stale-while-revalidate=6000",
      },
    }
  );
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <section className="flex justify-center">
        <HeroSection />
      </section>
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
    </div>
  );
}
