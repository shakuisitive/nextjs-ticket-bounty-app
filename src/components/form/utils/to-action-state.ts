import { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldError: Record<string, string[]>;
  timestamps: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldError: {},
  timestamps: Date.now(),
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: error.issues[0].message,
      fieldError: error.flatten().fieldErrors,
      payload: formData,
      timestamps: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message || "Something went wrong",
      fieldError: {},
      payload: formData,
      timestamps: Date.now(),
    };
  } else {
    return {
      status: "ERROR",
      message: "Something went wrong",
      fieldError: {},
      payload: formData,
      timestamps: Date.now(),
    };
  }
};

export const toActionState = (
  message: string,
  status: ActionState["status"]
): ActionState => ({
  status,
  message,
  fieldError: {},
  timestamps: Date.now(),
});
