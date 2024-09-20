import { useNavigate, useSearchParams } from "@remix-run/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type FormSelectProps = {
  options: { label: string | number; value: string; default?: boolean }[];
  param: string;
};

function FormSelect({ options, param }: FormSelectProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const renderOptions = options.map((option) => (
    <SelectItem key={option.value} value={option.value}>
      {option.label}
    </SelectItem>
  ));

  const handleSelect = (value: string) => {
    if (param === "Type" && value === "MANGA") {
      // Navigate to "/search/manga?type=MANGA"
      navigate("/search/manga?type=MANGA");
      return;
    } else if (param === "Type" && value === "ANIME") {
      // Navigate to "/search?type=ANIME"
      navigate("/search?type=ANIME");
    } else if (param === "Type" && value === "none") {
      navigate("/search");
    } else if (value === "none") {
      // Handle removal of the parameter if the value is "none"
      searchParams.delete(param);
      setSearchParams(searchParams, { replace: true });
    } else {
      // Set the parameter for other values
      setSearchParams((prev) => {
        prev.set(param, value);
        return prev;
      });
    }
  };

  return (
    <Select
      onValueChange={handleSelect}
      defaultValue={searchParams.get(param) || ""}
    >
      <SelectTrigger className="w-max">
        <SelectValue placeholder={param} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="none">{param}</SelectItem>
          {renderOptions}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default FormSelect;
