import { useSearchParams } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import AnimeCard from "~/components/AnimeCard";
import Loading from "~/components/Loading";
import { useInView } from "~/hooks/useInView";
import { fetchMangaSearch } from "~/lib/api/fetch-data";
import { getUpdatedMangaSearchParams } from "~/lib/api/get-search-params";

function MangaSearchResults() {
  const [searchParams] = useSearchParams();
  const params = getUpdatedMangaSearchParams(searchParams);

  const {
    data,
    status,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search-manga", params],
    queryFn: async ({ pageParam }) =>
      await fetchMangaSearch({ pageParam, params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage?.data.Page.pageInfo;
      return pageInfo?.hasNextPage ? pageInfo.currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 10,
  });
  const containerRef = useInView({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  if (status === "pending") return <Loading />;
  if (status === "error") return <div>(`Error: ${error.message}`)</div>;

  return (
    <>
      <section className="flex flex-wrap justify-center gap-5">
        {data?.pages.map((page) =>
          page.data.Page.media.map((anime) => (
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

export default MangaSearchResults;
