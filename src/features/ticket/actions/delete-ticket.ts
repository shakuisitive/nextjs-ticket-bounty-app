"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { toActionState } from "@/components/form/utils/to-action-state";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const deleteTicket = async (id: string) => {
  await new Promise((r) => setTimeout(r, 2000));

  const { user } = await getAuthOrRedirect();
  try {
    const ticket = await prisma.ticket.findFirst({
      where: { id },
    });

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState(
        "ERROR",
        "You're not authorized to perform this action."
      );
    }

    await prisma.ticket.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());
  await setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
};
