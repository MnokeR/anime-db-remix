import { AnimeDetail } from "~/lib/types/query-types";
import FormatAnime from "./FormatAnime";
import FormatManga from "./FormatManga";
import { NavLink } from "@remix-run/react";
import { DogIcon, LayoutDashboardIcon } from "lucide-react";

type SidebarProps = {
  data: AnimeDetail;
};
function Sidebar({ data }: SidebarProps) {
  const anime = data.Media;
  return (
    <div className="flex flex-col w-full md:w-[320px] p-5 bg-secondary rounded-xl gap-5">
      <img
        src={anime.coverImage.large}
        alt="cover"
        width={280}
        className="self-center w-full sm:w-auto"
      />
      <div>
        <NavLink to={`/anime/${anime.id}`}>
          <div className="inline-flex items-center gap-4">
            <span>
              <LayoutDashboardIcon />
            </span>
            Overview
          </div>
        </NavLink>
        <NavLink to="characters">
          <div className="inline-flex items-center gap-4">
            <span>
              <DogIcon />
            </span>
            Characters
          </div>
        </NavLink>
        {anime.type === "ANIME" && <FormatAnime data={data} />}
        {anime.type === "MANGA" && <FormatManga data={data} />}
      </div>
    </div>
  );
}

export default Sidebar;
