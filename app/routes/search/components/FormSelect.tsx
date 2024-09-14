import { useSearchParams } from "@remix-run/react";
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

  const renderOptions = options.map((option) => (
    <SelectItem key={option.value} value={option.value} className="z-20">
      {option.label}
    </SelectItem>
  ));

  const handleSelect = (value: string) => {
    if (value === "none") {
      searchParams.delete(param);
      setSearchParams(searchParams);
    } else {
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
          <SelectItem value="none" className="z-20">
            {param}
          </SelectItem>
          {renderOptions}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default FormSelect;
