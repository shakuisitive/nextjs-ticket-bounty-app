"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const title = formData.get("title");
    const content = formData.get("content");

    const data = upsertTicketSchema.parse({ title, content });
    await prisma.ticket.upsert({
      where: { id: id || "" },
      create: data,
      update: data,
    });
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }
  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }

  return toActionState("Ticket created successfully", "SUCCESS");
};
