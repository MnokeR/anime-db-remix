import { AnimeDetail } from "~/lib/types/query-types";
import ListItem from "./ListItem";

function FormatManga({ data }: { data: AnimeDetail }) {
  return (
    <>
      <ListItem
        label="Start Date"
        info={`${data.startDate.month}/${data.startDate.day}/${data.startDate.year}`}
      />
      <ListItem label="Format" info={data.format} />
      <ListItem label="Chapters" info={data.chapters} />
      <ListItem label="Status" info={data.status} />
      <ListItem label="Source" info={data.source} />
      <ListItem label="Origin" info={data.countryOfOrigin} />
    </>
  );
}

export default FormatManga;
