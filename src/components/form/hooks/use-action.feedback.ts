"use client";

import { ActionState } from "./../utils/to-action-state";
import { useEffect, useRef } from "react";

type OnArgs = {
  actionState: ActionState;
};

type useActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

export const useActionFeedback = (
  actionState: ActionState,
  options: useActionFeedbackOptions
) => {
  const prevTimestamps = useRef(actionState.timestamps);
  const isUpdate = prevTimestamps.current !== actionState.timestamps;

  useEffect(() => {
    if (!isUpdate) return;

    const { message, status } = actionState;
    if (status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }

    if (status === "ERROR") {
      if (options.onError) {
        options.onError?.({ actionState });
      }
    }

    prevTimestamps.current = actionState.timestamps;
  }, [actionState, options, isUpdate]);
};
