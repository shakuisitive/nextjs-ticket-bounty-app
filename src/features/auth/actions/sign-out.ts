"use server";

import { lucia } from "@/lib/lucia";
import { signInPath } from "@/paths";
import { redirect } from "next/navigation";
import { getAuth } from "./../queries/get-auth";

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  await lucia.invalidateSession(session.id);
};
