import { useOutletContext } from "@remix-run/react";
import Heading2 from "~/components/Heading2";
import { AnimeDetail } from "~/lib/types/query-types";
import Markdown from "markdown-to-jsx";

import Relation from "./components/Relation";
import { Badge } from "~/components/ui/badge";

function AnimeIndex() {
  const { data } = useOutletContext<{ data: AnimeDetail }>();
  const media = data.Media;

  const renderMainCast = media.characterPreview.edges.map(
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

  return (
    <div className="flex-1 flex flex-col pt-5 gap-10">
      <article>
        <h1 className="text-xl md:text-2xl text-primary font-semibold mb-2">
          {media.title.userPreferred}
        </h1>
        <Markdown
          options={{ overrides: { br: { component: "br", props: {} } } }}
        >
          {media.description}
        </Markdown>

        <div className="pt-5 flex flex-wrap gap-2">
          {media.genres.map((genre) => (
            <Badge key={genre}>{genre}</Badge>
          ))}
        </div>
      </article>

      <article>
        <Heading2>
          Main Cast<span>View All</span>
        </Heading2>
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
