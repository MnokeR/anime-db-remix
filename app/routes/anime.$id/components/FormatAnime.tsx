import { AnimeDetail } from "~/lib/types/query-types";
import ListItem from "./ListItem";

function FormatAnime({ data }: { data: AnimeDetail }) {
  return (
    <>
      <ListItem label="Release" info={`${data.season} ${data.seasonYear}`} />
      <ListItem label="Status" info={data.status} />
      <ListItem label="Format" info={data.format} />
      <ListItem label="Episodes" info={data.episodes} />
      <ListItem label="Source" info={data.source} />
      <ListItem label="Origin" info={data.countryOfOrigin} />
      {data.studios.edges.map(
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
