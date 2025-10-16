"use client";

import { useState } from "react";
import { CardCompact } from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";
import { PaginatedData } from "@/types/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", ticketId],
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    });

  // const [comments, setComments] = useState(paginatedComments.list);
  // const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  const handleMore = () => fetchNextPage();

  const handleDeleteComment = (id: string) => {
    // setComments((prevComments) =>
    //   prevComments.filter((comment) => comment.id !== id)
    // );
  };

  const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
    // if (!comment) return;
    // setComments((prevComments) => [comment, ...prevComments]);
  };

  return (
    <>
      <CardCompact
        title="Create comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateContent={handleCreateComment}
          />
        }
      />

      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex flex-col justify-center ml-8">
          <Button
            onClick={handleMore}
            variant="ghost"
            disabled={isFetchingNextPage}
          >
            More
          </Button>
        </div>
      )}
    </>
  );
};

export { Comments };
