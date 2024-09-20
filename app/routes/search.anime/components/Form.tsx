import { useSearchParams } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import { useDebounce } from "~/hooks/useDebounce";
import FormSelect from "./FormSelect";
import {
  selectFormat,
  selectGenres,
  selectSeason,
  selectSort,
  selectStatus,
  selectType,
  selectYear,
} from "~/lib/search-options";

function Form() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get("term") || ""
  );

  const debounce = useDebounce(searchValue, 500);
  const prevDebounce = useRef(debounce);

  useEffect(() => {
    if (debounce !== prevDebounce.current) {
      if (searchValue) {
        setSearchParams((prev) => {
          prev.set("term", debounce);
          return prev;
        });
      } else {
        searchParams.delete("term");
        setSearchParams(searchParams);
      }
      prevDebounce.current = debounce;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce, searchParams, setSearchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mx-4">
        <Input
          className="max-w-[300px]"
          name="term"
          type="search"
          placeholder="Search"
          defaultValue={searchParams.get("term") || ""}
          onChange={(e) => handleChange(e)}
        />
        <FormSelect options={selectType} param="Type" />
        <FormSelect options={selectGenres} param="Genres" />
        <FormSelect options={selectYear} param="Year" />
        <FormSelect options={selectSeason} param="Season" />
        <FormSelect options={selectFormat} param="Format" />
        <FormSelect options={selectStatus} param="Status" />
        <FormSelect options={selectSort} param="Sort" />
      </div>
      <div className="flex justify-center pt-5">
        {searchValue && <p>&quot;{searchValue}&quot;</p>}
      </div>
    </>
  );
}

export default Form;