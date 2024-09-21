import { defer, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { animeDetailQuery, BASE_URL } from "~/lib/api/queries";
import { AnimeDetail } from "~/lib/types/query-types";

export const animeDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.animeId;
  const variables = {
    id,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "applicatoin/json",
      apply: "application/json",
    },
    body: JSON.stringify({
      query: animeDetailQuery,
      variables,
    }),
    cf: {
      cacheTtl: 5,
      cacheEverything: true,
    },
  };

  const res = await fetch(BASE_URL, options);
  const data: { data: AnimeDetail } = await res.json();
  return defer(
    { data: data.data },
    {
      headers: {
        "Cache-Control": "public, max-age=120, stale-while-revalidate=900",
      },
    }
  );
};
