import { Suspense } from "react";
import { Await, Outlet, useLoaderData } from "@remix-run/react";
import Loading from "~/components/Loading";
import Sidebar from "./components/Sidebar";
import { animeDetailsLoader } from "./loader";

export const loader = animeDetailsLoader;

function Anime() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div className="flex-1 view-transition">
      <Suspense fallback={<Loading />}>
        <Await resolve={data}>
          {(data) => (
            <>
              <div className="hidden md:block">
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
    </div>
  );
}
export default Anime;
