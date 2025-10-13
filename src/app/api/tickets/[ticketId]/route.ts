import { getTicket } from "@/features/ticket/queries/get-ticket";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  return NextResponse.json(ticket);
}
