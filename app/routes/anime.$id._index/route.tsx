import { useOutletContext } from "@remix-run/react";
import Heading2 from "~/components/Heading2";
import { AnimeDetail } from "~/lib/types/query-types";
import Markdown from "markdown-to-jsx";

import Relation from "./components/Relation";

function AnimeIndex() {
  const { anime } = useOutletContext<{ anime: AnimeDetail }>();

  const renderMainCast = anime.characterPreview.edges.map(
    (character) =>
      character.role === "MAIN" && (
        <img
          key={character.id}
          src={character.node.image.large}
          alt="cover"
          width={134}
        />
      )
  );
  console.log(anime);

  return (
    <div className="flex-1 flex flex-col pt-5 gap-10">
      <article>
        <h1 className="text-2xl text-primary font-semibold mb-2">
          {anime.title.userPreferred}
        </h1>

        <Markdown>{anime.description}</Markdown>

        <div className="pt-5 flex flex-wrap gap-2">
          {anime.genres.map((genre) => (
            <span
              key={genre}
              className="bg-primary text-primary-foreground py-1 px-2 text-sm rounded"
            >
              {genre}
            </span>
          ))}
        </div>
      </article>

      <article>
        <Heading2>Main Cast</Heading2>
        <div className="flex flex-wrap justify-center md:justify-normal mt-5 gap-5">
          {renderMainCast}
        </div>
      </article>
      <article>
        <Heading2>Relations</Heading2>
        <div className="flex flex-wrap justify-center md:justify-normal mt-5 gap-5">
          <Relation />
        </div>
      </article>
    </div>
  );
}

export default AnimeIndex;
