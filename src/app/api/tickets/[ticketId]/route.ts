import { NextResponse } from "next/server";
import { getTicket } from "@/features/ticket/queries/get-ticket";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  return NextResponse.json(ticket);
}
