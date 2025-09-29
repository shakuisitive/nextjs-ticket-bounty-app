import { Ticket } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTicket } from "../actions/update-ticket";

type TicketUpdateFormTypes = { ticket: Ticket };

const TicketUpdateForm = ({ ticket }: TicketUpdateFormTypes) => {
  return (
    <form
      action={updateTicket.bind(null, ticket.id)}
      className="flex flex-col gap-y-2"
    >
      {/* NOTE FOR SHAKIR:
          - If we want, we can also have a hidden id input field and that will pass that id to formData.
          - But .bind looks better.
       */}
      <Label htmlFor="title">Title</Label>
      <Input type="text" name="title" id="title" defaultValue={ticket.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea name="content" id="content" defaultValue={ticket.content} />

      <Button type="submit">Update</Button>
    </form>
  );
};

export { TicketUpdateForm };
