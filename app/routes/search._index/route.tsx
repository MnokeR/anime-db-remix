import { useSearchParams } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import AnimeCard from "~/components/AnimeCard";
import Loading from "~/components/Loading";
import { useInView } from "~/hooks/useInView";
import { fetchSearchResults } from "~/lib/api/fetch-search-data";

function SearchIndex() {
  const [searchParams] = useSearchParams();
  const term = searchParams.get("term") || undefined;
  const type = searchParams.get("Type") || undefined;
  const year = searchParams.get("Year") || undefined;
  const season = searchParams.get("Season") || undefined;
  const format = searchParams.get("Format") || undefined;
  const airStatus = searchParams.get("Status") || undefined;
  const sort = searchParams.get("Sort") || undefined;
  const genres = searchParams.get("Genres") || undefined;

  const params = { term, type, year, season, format, airStatus, sort, genres };
  const {
    data,
    status,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search-results", params],
    queryFn: async ({ pageParam }) =>
      await fetchSearchResults(pageParam, params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage;
      return pageInfo?.pageInfo.hasNextPage
        ? pageInfo.pageInfo.currentPage + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 24,
    refetchOnMount: false,
  });
  const containerRef = useInView({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  if (status === "pending") return <Loading />;
  if (status === "error") return console.log(error.message);

  const pages = data?.pages;

  return (
    <>
      <section className="flex flex-wrap justify-center gap-5">
        {pages?.map((page) =>
          page?.media.map((anime) => (
            <AnimeCard
              key={anime.id}
              id={anime.id}
              image={anime.coverImage.large}
              title={anime.title.userPreferred}
              format={anime.format}
            />
          ))
        )}
      </section>
      {hasNextPage && !isFetchingNextPage && <div ref={containerRef} />}
      {isFetchingNextPage && <Loading />}
    </>
  );
}

export default SearchIndex;
