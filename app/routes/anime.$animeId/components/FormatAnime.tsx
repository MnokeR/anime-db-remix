import { AnimeDetail } from "~/lib/types/query-types";
import ListItem from "./ListItem";

function FormatAnime({ data }: { data: AnimeDetail }) {
  const anime = data.Media;
  return (
    <>
      <ListItem label="Release" info={`${anime.season} ${anime.seasonYear}`} />
      <ListItem label="Status" info={anime.status} />
      <ListItem label="Format" info={anime.format} />
      <ListItem label="Episodes" info={anime.episodes} />
      <ListItem label="Source" info={anime.source} />
      <ListItem label="Origin" info={anime.countryOfOrigin} />
      {anime.studios.edges.map(
        (studio) =>
          studio.isMain && (
            <ListItem
              key={studio.node.id}
              label="Studio"
              info={studio.node.name}
            />
          )
      )}
    </>
  );
}

export default FormatAnime;
