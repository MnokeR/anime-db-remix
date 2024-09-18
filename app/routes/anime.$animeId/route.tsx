import { Suspense } from "react";
import { Await, Outlet, useLoaderData } from "@remix-run/react";
import { defer, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { animeDetailQuery, BASE_URL } from "~/lib/api/queries";
import type { AnimeDetail } from "~/lib/types/query-types";
import Loading from "~/components/Loading";
import Sidebar from "./components/Sidebar";

export const loader = async ({ params }: LoaderFunctionArgs) => {
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
    { headers: { "Cache-Control": "max-age=1500, must-revalidate" } }
  );
};

function Anime() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <main className="flex-1">
      <Suspense fallback={<Loading />}>
        <Await resolve={data}>
          {(data) => (
            <>
              <div>
                {data.Media.bannerImage && (
                  <img
                    src={data.Media.bannerImage}
                    alt="banner"
                    className="object-cover w-full max-h-[400px]"
                  />
                )}
              </div>
              <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-wrap gap-5 p-5">
                  <Sidebar data={data} />
                  <Outlet context={{ data: data }} />
                </div>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
export default Anime;
