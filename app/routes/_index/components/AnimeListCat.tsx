import AnimeCard from "~/components/AnimeCard";
import Heading from "~/components/Heading";
import { AnimeShort } from "~/lib/types/query-types";

type AnimeListCatProps = {
  tReg: string;
  tRed: string;
  cat: AnimeShort[];
};

function AnimeListCat({ tReg, tRed, cat }: AnimeListCatProps) {
  return (
    <div>
      <Heading regular={tReg} red={tRed} className="text-center" />
      <div className="flex flex-wrap justify-center gap-5">
        {cat.map((anime) => (
          <AnimeCard
            key={anime.id}
            id={anime.id}
            image={anime.coverImage.large}
            title={anime.title.userPreferred}
            format={anime.format}
          />
        ))}
      </div>
    </div>
  );
}

export default AnimeListCat;
