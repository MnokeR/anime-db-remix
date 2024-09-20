import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import AnimeCard from "~/components/AnimeCard";
import Loading from "~/components/Loading";
import { useInView } from "~/hooks/useInView";
import { fetchAnimeSearch, fetchManga } from "~/lib/api/fetch-data";
import { getUpdatedAnimeSearchParams } from "~/lib/api/get-search-params";

export const loader = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["search-anime"],
    queryFn: async () => await fetchManga(),
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
};

function AnimeSearchResults() {
  const { dehydratedState } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const params = getUpdatedAnimeSearchParams(searchParams);

  const {
    data,
    status,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search-anime", params],
    queryFn: async ({ pageParam }) =>
      await fetchAnimeSearch({ pageParam, params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage.data.Page.pageInfo;
      return pageInfo.hasNextPage ? pageInfo.currentPage + 1 : undefined;
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
    <HydrationBoundary state={dehydratedState}>
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
    </HydrationBoundary>
  );
}

export default AnimeSearchResults;
