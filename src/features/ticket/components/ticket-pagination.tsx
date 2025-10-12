"use client";

import { useQueryStates } from "nuqs";
import { Pagination } from "@/components/pagination";
import { paginationOptions, paginationParser } from "../search-params";

type TicketPaginationProps = {
  paginatedTicketMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

const TicketPagination = ({
  paginatedTicketMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  return (
    <Pagination
      pagination={pagination}
      paginatedMetadata={paginatedTicketMetadata}
      onPagination={setPagination}
    />
  );
};

export { TicketPagination };
