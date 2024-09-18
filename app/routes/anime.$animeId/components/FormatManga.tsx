import { AnimeDetail } from "~/lib/types/query-types";
import ListItem from "./ListItem";

function FormatManga({ data }: { data: AnimeDetail }) {
  const manga = data.Media;
  return (
    <>
      <ListItem
        label="Start Date"
        info={`${manga.startDate.month}/${manga.startDate.day}/${manga.startDate.year}`}
      />
      <ListItem label="Format" info={manga.format} />
      <ListItem label="Chapters" info={manga.chapters} />
      <ListItem label="Status" info={manga.status} />
      <ListItem label="Source" info={manga.source} />
      <ListItem label="Origin" info={manga.countryOfOrigin} />
    </>
  );
}

export default FormatManga;
