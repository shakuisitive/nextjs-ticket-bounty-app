"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { z } from "zod";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: { message: string },
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
    return { message: "Something went wrong" };
  }
  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }

  return {
    message: "Ticket Created",
  };
};
