"use server";

import { ticketPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { toActionState } from "@/components/form/utils/to-action-state";
import { ActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export const createComment = async (
  ticketId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));

    await prisma.comment.create({
      data: { ...data, ticketId, userId: user.id },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketPath(ticketId));

  return toActionState("SUCCESS", "Comment created");
};
