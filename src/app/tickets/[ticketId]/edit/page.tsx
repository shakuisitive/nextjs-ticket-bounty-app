import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { TicketUpdateForm } from "@/features/ticket/components/ticket-update-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

const TicketEditPage = async ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  return (
    <div className="flex-1 flex flex-col justify-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-[440px] animate-fade-from-top"
        content={
          <>
            <TicketUpdateForm ticket={{ ...ticket }} />
          </>
        }
      />
    </div>
  );
};

export default TicketEditPage;
