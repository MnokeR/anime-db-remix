import { Link, useOutletContext } from "@remix-run/react";
import { capitalize } from "~/lib/capitalize";
import { relationOrder } from "~/lib/relationOrder";
import { AnimeDetail } from "~/lib/types/query-types";

function Relation() {
  const { anime } = useOutletContext<{ anime: AnimeDetail }>();

  const renderList = relationOrder.map((relationType) =>
    anime.relations.edges.map(
      (relation) =>
        relation.relationType === relationType && (
          <Link key={relation.id} to={`/anime/${relation.node.id}`}>
            <div className="relative w-[127px] h-[190px]">
              <img
                className="object-contain w-full h-full"
                src={relation.node.coverImage.large}
                alt="cover"
                width={127}
              />
              <div className="absolute bottom-0 w-full text-center text-sm bg-secondary/80 py-1">
                {capitalize(relation.relationType)}
              </div>
            </div>
          </Link>
        )
    )
  );

  return renderList;
}

export default Relation;
