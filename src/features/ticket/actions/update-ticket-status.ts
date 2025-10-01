"use server";

import {
  toActionState,
  fromErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { TicketStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try {
    await prisma.ticket.update({
      where: { id },
      data: {
        status,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState("Status updated", "SUCCESS");
};
