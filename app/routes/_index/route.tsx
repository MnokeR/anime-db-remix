import { MetaFunction } from "@remix-run/cloudflare";
import { Suspense } from "react";
import { Await, useLoaderData } from "@remix-run/react";
import HeroSection from "./components/HeroSection";
import AnimeListCat from "./components/AnimeListCat";

import LoadingSkeleton from "~/components/LoadingSkeleton";
import { homeLoader } from "./loader";

export const meta: MetaFunction = () => {
  return [
    { title: "AnimeDB" },
    { name: "description", content: "Your source for Anime!" },
  ];
};

export const loader = homeLoader;

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <section className="flex justify-center">
        <HeroSection />
      </section>
      <Suspense fallback={<LoadingSkeleton />}>
        <section className="flex flex-col gap-10 view-transition">
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
        </section>
      </Suspense>
    </div>
  );
}
