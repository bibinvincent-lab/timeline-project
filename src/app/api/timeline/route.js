import data from "@/data/timeline.json";

export async function GET() {
  return Response.json(data);
}