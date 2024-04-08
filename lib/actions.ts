import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserDetails({
  userId,
  isCurrentUser,
}: {
  userId: string;
  isCurrentUser: boolean;
}) {
  const userDataQuery = await db.query.users.findMany({
    with: {
      usersToSkills: {
        with: {
          skill: true,
        },
      },
    },
    // @ts-ignore
    where: isCurrentUser ? eq(users.clerkId, userId) : eq(users.id, userId),
  });

  return userDataQuery?.[0];
}
