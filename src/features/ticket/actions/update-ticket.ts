"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const updateTicket = async (id: string, formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.ticket.update({
    where: { id },
    data: { title, content },
  });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
