"use server";

import { verifyPasswordHash } from "@/features/password/utils/hash-and-verify";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { generatePasswordResetLink } from "../utils/generate-password-reset-link";

const passwordChangeSchema = z.object({
  password: z.string().min(6).max(191),
});

export const passwordChange = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const auth = await getAuthOrRedirect();
  try {
    const { password } = passwordChangeSchema.parse(
      Object.fromEntries(formData)
    );

    const user = await prisma.user.findUnique({
      where: {
        id: auth.user.id,
      },
    });

    if (!user) {
      return toActionState("ERROR", "Invalid credentials");
    }
    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState("ERROR", "Invalid credentials");
    }

    const passwordResetLink = await generatePasswordResetLink(user.id);

    // TODO: Send email with reset link
    // instead we will just print it to the console for now
    console.log(passwordResetLink);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Check your email for a reset link");
};
