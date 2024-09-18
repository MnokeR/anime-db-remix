import { capitalize } from "~/lib/capitalize";

type ListItemProps = {
  label: string;
  info: string | number | boolean;
};
function ListItem({ label, info }: ListItemProps) {
  return (
    <div className="font-serif pb-1">
      <p className="text-primary">{label}</p>
      <p className="text-sm">
        {typeof info === "string" ? capitalize(info) : info || "-"}
      </p>
    </div>
  );
}

export default ListItem;
