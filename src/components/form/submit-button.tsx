import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button disabled={pending} type="submit">
        {pending && (
          <LucideLoaderCircle className="animate-spin mr-2 w-4 h-4" />
        )}
        {label}
      </Button>
    </>
  );
};

export { SubmitButton };
