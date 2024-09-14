import { useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { useDebounce } from "~/hooks/useDebounce";
import FormSelect from "./FormSelect";
import {
  selectFormat,
  selectSeason,
  selectSort,
  selectStatus,
  selectType,
  selectYear,
} from "~/lib/search-options";

function Form() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const debounce = useDebounce(searchValue, 500);

  useEffect(() => {
    if (searchValue) {
      setSearchParams((prev) => {
        prev.set("term", debounce);
        return prev;
      });
    } else {
      searchParams.delete("term");
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  return (
    <div className="flex flex-wrap gap-2 justify-center mx-4">
      <Input
        className="max-w-[300px]"
        name="term"
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <FormSelect options={selectType} param="Type" />
      <FormSelect options={selectYear} param="Year" />
      <FormSelect options={selectSeason} param="Season" />
      <FormSelect options={selectFormat} param="Format" />
      <FormSelect options={selectStatus} param="Status" />
      <FormSelect options={selectSort} param="Sort" />
      <p>{debounce}</p>
    </div>
  );
}

export default Form;
