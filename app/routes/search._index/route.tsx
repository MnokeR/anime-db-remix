import { Await, useSearchParams } from "@remix-run/react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import AnimeCard from "~/components/AnimeCard";
import Loading from "~/components/Loading";
import { useInView } from "~/hooks/useInView";
import { fetchSearchData } from "~/lib/api/fetch-data";
import { getNewSearchParams } from "~/lib/api/get-search-params";

function SearchIndex() {
  const [searchParams] = useSearchParams();
  const params = getNewSearchParams(searchParams);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["search", params],
      queryFn: async ({ pageParam }) =>
        await fetchSearchData({ pageParam, params }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const pageInfo = lastPage.data.Page.pageInfo;
        return pageInfo.hasNextPage ? pageInfo.currentPage + 1 : undefined;
      },
      staleTime: 1000 * 60 * 25,
    });

  const containerRef = useInView({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      <section className="flex flex-wrap justify-center gap-5">
        <Suspense fallback={<Loading />}>
          <Await resolve={data}>
            {data.pages.map((page) =>
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
          </Await>
        </Suspense>
      </section>
      {hasNextPage && !isFetchingNextPage && <div ref={containerRef} />}
      {isFetchingNextPage && <Loading />}
    </>
  );
}

export default SearchIndex;
