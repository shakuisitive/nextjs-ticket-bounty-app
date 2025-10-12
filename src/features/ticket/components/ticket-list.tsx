import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";
import { Placeholder } from "@/components/placeholder";
import { ParsedSearchParams } from "../search-params";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";
import { TicketPagination } from "./ticket-pagination";

type TicketListProps = {
  userId?: string;
  searchParams: Awaited<ParsedSearchParams>;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="max-w-[420px] w-full flex gap-x-2">
        <TicketSearchInput placeholder="Search tickets ..." />
        <TicketSortSelect
          options={[
            { label: "Newest", sortValue: "desc", sortKey: "createdAt" },
            { label: "Oldest", sortValue: "asc", sortKey: "createdAt" },
            { label: "Bounty", sortValue: "desc", sortKey: "bounty" },
          ]}
        />
      </div>

      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
      <div className="max-w-[420px] w-full flex gap-x-2">
        <TicketPagination />
      </div>
    </div>
  );
};

export { TicketList };
