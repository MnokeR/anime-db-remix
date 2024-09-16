import { AnimeDetail } from "~/lib/types/query-types";
import FormatAnime from "./FormatAnime";
import FormatManga from "./FormatManga";
import { NavLink } from "@remix-run/react";
import { DogIcon, LayoutDashboardIcon } from "lucide-react";

type SidebarProps = {
  data: AnimeDetail;
};
function Sidebar({ data }: SidebarProps) {
  return (
    <div className="flex flex-col w-full md:w-[320px] p-5 bg-secondary rounded-xl gap-5">
      <img
        src={data.coverImage.large}
        alt="cover"
        width={280}
        className="self-center w-full sm:w-auto"
      />
      <div>
        <NavLink to={`/anime/${data.id}`}>
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
        {data.type === "ANIME" && <FormatAnime data={data} />}
        {data.type === "MANGA" && <FormatManga data={data} />}
      </div>
    </div>
  );
}

export default Sidebar;
