"use client";

import { CardCompact } from "@/components/card-compact";
import { getComments } from "../queries/get-comments";
import { CommentCreateForm } from "./comment-create-form";
import { CommentItem } from "./comment-item";
import { CommentDeleteButton } from "./comment-delete-button";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { CommentWithMetadata } from "../types";
import { Button } from "@/components/ui/button";

type CommentsProps = {
  ticketId: string;
  comments?: CommentWithMetadata[];
};

const Comments = ({ ticketId, comments = [] }: CommentsProps) => {
  const handleMore = async () => {
    const result = await getComments(ticketId);
    console.log(result);
  };

  return (
    <>
      <CardCompact
        title="Create comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />

      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [<CommentDeleteButton key="0" id={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center ml-8">
        <Button onClick={handleMore} variant="ghost">
          More
        </Button>
      </div>
    </>
  );
};

export { Comments };
