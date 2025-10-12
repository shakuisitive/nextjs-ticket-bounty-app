"use client";

import { useQueryStates } from "nuqs";
import { paginationOptions, paginationParser } from "../search-params";
import { Pagination } from "@/components/pagination";
const TicketPagination = () => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  return <Pagination pagination={pagination} onPagination={setPagination} />;
};

export { TicketPagination };
