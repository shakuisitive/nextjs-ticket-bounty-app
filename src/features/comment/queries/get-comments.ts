"use server";

import { isOwner } from "@/features/auth/utils/is-owner";
import { getAuth } from "@/features/auth/actions/get-auth";
import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string) => {
  try {
    const { user } = await getAuth();

    const comments = await prisma.comment.findMany({
      where: {
        ticketId,
      },
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
    });

    return comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    }));
  } catch (error) {
    console.log("Something went wrong: " + JSON.stringify(error));
  }
};
