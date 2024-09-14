import { useOutletContext } from "@remix-run/react";
import Heading2 from "~/components/Heading2";
import { AnimeDetail } from "~/lib/types/query-types";
import Markdown from "markdown-to-jsx";

function AnimeIndex() {
  const { anime } = useOutletContext<{ anime: AnimeDetail }>();

  const renderMainCast = anime.characterPreview.edges.map(
    (character) =>
      character.role === "MAIN" && (
        <img
          key={character.id}
          src={character.node.image.large}
          alt="cover"
          width={185}
        />
      )
  );

  const renderRelations = anime.relations.edges.map((relation) => (
    <img
      key={relation.id}
      src={relation.node.coverImage.large}
      alt="cover"
      width={185}
    />
  ));

  return (
    <div className="flex-1 flex flex-col pt-5 gap-10">
      <article>
        <h1 className="text-2xl text-primary font-semibold mb-2">
          {anime.title.userPreferred}
        </h1>
        <p>
          <Markdown>{anime.description}</Markdown>
        </p>
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
          {renderRelations}
        </div>
      </article>
    </div>
  );
}

export default AnimeIndex;
