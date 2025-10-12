import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "./../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: Awaited<ParsedSearchParams>
) => {
  const where = {
    userId,
    ...(typeof searchParams.search === "string" && {
      title: {
        contains: searchParams.search,
        mode: "insensitive" as const,
      },
    }),
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      take,
      skip,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.ticket.count({ where }),
  ]);

  return {
    list: tickets,
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
