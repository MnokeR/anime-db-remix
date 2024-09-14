import { MetaFunction } from "@remix-run/cloudflare";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeData } from "~/lib/api/fetch-home-data";
import HeroSection from "./components/HeroSection";
import AnimeListCat from "./components/AnimeListCat";
import Loading from "~/components/Loading";

export const meta: MetaFunction = () => {
  return [
    { title: "AnimeDB" },
    { name: "description", content: "Your source for Anime!" },
  ];
};

export default function Index() {
  const { data, status, error } = useQuery({
    queryKey: ["home-animes"],
    queryFn: async () => await fetchHomeData(),
    staleTime: 1000 * 60 * 24,
    refetchOnMount: false,
  });

  if (status === "pending") return <Loading />;
  if (status === "error") return console.log(error);

  return (
    <main>
      <section className="flex px-4 justify-center">
        <HeroSection />
      </section>
      <section className="flex flex-col gap-10">
        <AnimeListCat tReg="TRENDING" tRed="NOW" cat={data!.trending.media} />
        <AnimeListCat tReg="CURRENT" tRed="SEASON" cat={data!.season.media} />
        <AnimeListCat tReg="NEXT" tRed="SEASON" cat={data!.nextSeason.media} />
        <AnimeListCat tReg="MOST" tRed="POPULAR" cat={data!.popular.media} />
        <AnimeListCat tReg="TOP" tRed="RATED" cat={data!.top.media} />
      </section>
    </main>
  );
}
