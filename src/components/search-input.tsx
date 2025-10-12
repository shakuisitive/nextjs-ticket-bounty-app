"use client";

import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onChange(value);
    },
    250
  );

  return (
    <Input
      onChange={handleSearch}
      placeholder={placeholder}
      defaultValue={value}
    />
  );
};

export { SearchInput };
