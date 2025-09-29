"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

export const upsertTicket = async (
  id: string | undefined,
  _actionState: { message: string },
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const data = { title, content };

  await prisma.ticket.upsert({
    where: { id: id || "" },
    create: data,
    update: data,
  });

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }

  return {
    message: "Ticket Created",
  };
};
