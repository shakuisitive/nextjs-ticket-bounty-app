import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "./../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: Awaited<ParsedSearchParams>
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      ...(typeof searchParams.search === "string" && {
        title: {
          contains: searchParams.search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      ...(searchParams.sort === "newest" && { createdAt: "desc" }),
      ...(searchParams.sort === "bounty" && { bounty: "desc" }),
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
