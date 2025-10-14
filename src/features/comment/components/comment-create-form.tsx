"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";
import { CommentWithMetadata } from "../types";

type CommentCreateFormProps = {
  ticketId: string;
  onCreateContent?: (comment: CommentWithMetadata | undefined) => void;
};
const CommentCreateForm = ({
  ticketId,
  onCreateContent,
}: CommentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE
  );

  const handleSuccess = (
    actionState: ActionState<CommentWithMetadata | undefined>
  ) => {
    onCreateContent?.(actionState.data);
  };

  return (
    <Form actionState={actionState} action={action} onSuccess={handleSuccess}>
      <Textarea name="content" />
      <FieldError actionState={actionState} name="content" />
      <SubmitButton label="Comment" />
    </Form>
  );
};

export { CommentCreateForm };
