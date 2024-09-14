import { AnimeDetail } from "~/lib/types/query-types";
import FormatAnime from "./FormatAnime";
import FormatManga from "./FormatManga";

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
        {data.type === "ANIME" && <FormatAnime data={data} />}
        {data.type === "MANGA" && <FormatManga data={data} />}
      </div>
    </div>
  );
}

export default Sidebar;
