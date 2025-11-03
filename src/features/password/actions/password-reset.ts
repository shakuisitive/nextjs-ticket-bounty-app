"use server";

import { z } from "zod";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { ActionState } from "@/components/form/utils/to-action-state";
import { signInPath } from "@/paths";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";

const passwordResetSchema = z
  .object({
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const passwordReset = async (
  tokenId: string,
  actionState: ActionState,
  formData: FormData
) => {
  try {
    const { password } = passwordResetSchema.parse(
      Object.fromEntries(formData)
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  setCookieByKey("toast", "Successfully reset password");
  redirect(signInPath());
};
