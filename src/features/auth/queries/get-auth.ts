import { signInPath } from "@/paths";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
export const getAuth = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
};
