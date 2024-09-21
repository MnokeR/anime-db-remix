import { AnimeDetail } from "~/lib/types/query-types";
import FormatAnime from "./FormatAnime";
import FormatManga from "./FormatManga";

type SidebarProps = {
  data: AnimeDetail;
};
function Sidebar({ data }: SidebarProps) {
  const anime = data.Media;
  return (
    <div className="flex md:flex-col w-full md:w-[320px] p-5 bg-none rounded-xl gap-5">
      <img
        src={anime.coverImage.large}
        alt="cover"
        width={280}
        className="w-[200px] h-auto md:w-[280px] object-contain self-start anime-card-cover z-10"
        style={{ viewTransitionName: "expand-image" }}
      />
      <div className="flex flex-col space-y-2">
        {anime.type === "ANIME" && <FormatAnime data={data} />}
        {anime.type === "MANGA" && <FormatManga data={data} />}
      </div>
    </div>
  );
}

export default Sidebar;
