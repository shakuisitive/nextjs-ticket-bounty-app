"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const createTicket = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.ticket.create({
    data: { title, content },
  });

  revalidatePath(ticketsPath());
};
