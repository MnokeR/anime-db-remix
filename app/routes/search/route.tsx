import { defer, json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchSearchData } from "~/lib/api/fetch-data";
import { getSearchParams } from "~/lib/api/get-search-params";
import Form from "./components/Form";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const queryClient = new QueryClient();
  const params = getSearchParams(request);

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["search"],
    queryFn: async ({ pageParam }) =>
      await fetchSearchData({ pageParam, params }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 20,
  });
  const dehydratedState = dehydrate(queryClient);
  return json(
    { dehydratedState },
    { headers: { "Cache-Control": "max-age=1500 must-revalidate" } }
  );
};

function Search() {
  const { dehydratedState } = useLoaderData<typeof loader>();

  return (
    <main>
      <section>
        <Form />
      </section>
      <HydrationBoundary state={dehydratedState}>
        <Outlet />
      </HydrationBoundary>
    </main>
  );
}

export default Search;
