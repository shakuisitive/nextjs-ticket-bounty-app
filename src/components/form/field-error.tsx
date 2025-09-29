import { ActionState } from "./utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  const message = actionState.fieldError[name]?.[0];
  return <span className="text-sm text-red-500">{message}</span>;
};

export { FieldError };
