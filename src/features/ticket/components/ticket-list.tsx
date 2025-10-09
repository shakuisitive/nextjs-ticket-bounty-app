import { SearchInput } from "@/components/search-input";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";
import { SearchParams } from "../search-params";
import { Placeholder } from "@/components/placeholder";
import { SortSelect } from "@/components/sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: Awaited<SearchParams>;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="max-w-[420px] w-full flex gap-x-2">
        <SearchInput placeholder="Search tickets ..." />
        <SortSelect
          defaultValue="newest"
          options={[
            { label: "Newest", value: "newest" },
            { label: "Bounty", value: "bounty" },
          ]}
        />
      </div>

      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  );
};

export { TicketList };
