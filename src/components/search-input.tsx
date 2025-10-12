"use client";

import { Input } from "@/components/ui/input";
import { searchParser } from "@/features/ticket/search-params";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearch(value);
    },
    250
  );

  return (
    <Input
      onChange={handleSearch}
      placeholder={placeholder}
      defaultValue={search || ""}
    />
  );
};

export { SearchInput };
