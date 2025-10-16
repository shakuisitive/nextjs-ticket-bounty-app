"use server";

import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string, cursor?: number) => {
  const { user } = await getAuth();

  const where = {
    ticketId,
    createdAt: {
      lt: cursor ? new Date(cursor) : new Date(),
    },
  };

  // const skip = offset ?? 0;
  const take = 2;

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      // skip,
      take,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      // hasNextPage: count > skip + take,
      hasNextPage: true,
      cursor: comments.at(-1)?.createdAt.valueOf(),
    },
  };
};
