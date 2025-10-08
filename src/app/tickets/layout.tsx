import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { signInPath } from "@/paths";
import { redirect } from "next/navigation";

const AuthenticatedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  await getAuthOrRedirect();

  return <>children</>;
};

export default AuthenticatedLayout;
