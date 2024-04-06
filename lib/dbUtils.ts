import { db } from "@/db";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const getUserFromClerkId = async () => {
  const userFromClerk = await currentUser();

  if (!userFromClerk) {
    throw new Error("No user found");
  }

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.clerkId, userFromClerk?.id ?? ""),
  });

  return user;
};

export const syncUser = async () => {
  const user = await getUserFromClerkId();

  if (!user) {
    redirect("/onboarding");
  }
};
