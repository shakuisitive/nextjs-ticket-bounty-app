"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { isOwner } from "./../../auth/utils/is-owner";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  const { user } = await getAuthOrRedirect();
  try {
    const ticket = await prisma.ticket.findFirst({ where: { id } });

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState(
        "ERROR",
        "You're not authorized to perform this action."
      );
    }

    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState("SUCCESS", "Status updated");
};
