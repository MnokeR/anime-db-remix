import { Outlet, useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "~/components/Loading";
import { fetchAnime } from "~/lib/api/fetch-anime-data";
import Sidebar from "./components/Sidebar";

function Anime() {
  const { id } = useParams();
  const animeId = Number(id);

  const { data, status, error } = useQuery({
    queryKey: ["anime", animeId],
    queryFn: () => fetchAnime(animeId),
    staleTime: 1000 * 60 * 24,
  });

  if (status === "pending") return <Loading />;
  if (status === "error") return console.log(error.message);

  return (
    <main className="flex-1">
      <div>
        {data?.bannerImage && (
          <img
            src={data?.bannerImage}
            alt="banner"
            className="object-cover w-full max-h-[400px]"
          />
        )}
      </div>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-wrap gap-5 p-5">
          <Sidebar data={data!} />
          <Outlet context={{ anime: data }} />
        </div>
      </div>
    </main>
  );
}

export default Anime;
