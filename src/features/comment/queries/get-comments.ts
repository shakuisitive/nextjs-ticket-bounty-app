"use server";

import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string) => {
  try {
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

    return comments;
  } catch (error) {
    console.log("Something went wrong: " + JSON.stringify(error));
  }
};
