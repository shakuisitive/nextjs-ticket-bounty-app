import { signInPath } from "@/paths";
import { redirect } from "next/navigation";
import { getAuth } from "@/features/auth/actions/get-auth";

export const getAuthOrRedirect = async () => {
  const auth = await getAuth();

  if (!auth.user) redirect(signInPath());
};
