"use client";

import { useQueryStates } from "nuqs";
import { SortSelect, SortSelectOption } from "@/components/sort-select";
import { sortOptions, sortParser } from "../search-params";

type TicketSortSelectProp = {
  options: SortSelectOption[];
};

export const TicketSortSelect = ({ options }: TicketSortSelectProp) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  return <SortSelect options={options} value={sort} onChange={setSort} />;
};
