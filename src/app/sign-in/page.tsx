import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { signUpPath, passwordForgotPath } from "@/paths";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<SignInForm />}
        footer={
          <>
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              No account yet?
            </Link>
            <Link
              className="text-sm text-muted-foreground"
              href={passwordForgotPath()}
            >
              Forgot password?
            </Link>
          </>
        }
      />
    </div>
  );
};

export default SignInPage;
