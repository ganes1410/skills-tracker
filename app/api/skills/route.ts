import { db } from "@/db";
import { skills } from "@/db/schema";
import { like } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("skillsearch");

  const searchQuery = Boolean(query)
    ? like(skills.name, "%" + query + "%")
    : undefined;

  const matchedSkills = await db.query.skills.findMany({
    limit: 5,
    where: searchQuery,
  });
  return new Response(JSON.stringify(matchedSkills), {
    status: 200,
  });
}
