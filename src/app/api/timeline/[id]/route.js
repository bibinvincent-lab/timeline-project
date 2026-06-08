import data from "@/data/timeline.json";
import { NextResponse } from "next/server";

export async function GET(
  request,
  { params }
) {
  const { id } = await params;

  const event = data.find(
    (item) => item.id.toString() === id
  );

  if (!event) {
    return NextResponse.json(
      {
        message: "Event not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(event);
}