import { db } from "@/db";
import UserCard from "@/components/user-card";
import { like } from "drizzle-orm";
import { users } from "@/db/schema";
import SearchFilter from "@/components/filters/search-filter";
import { auth } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    skills?: string;
  };
}) {
  const query = searchParams?.q || "";
  const searchQuery = Boolean(query)
    ? like(users.name, "%" + query + "%")
    : undefined;
  const currentUserInfo = auth();

  const allUsersWithSkills = await db.query.users.findMany({
    with: {
      usersToSkills: {
        with: {
          skill: true,
        },
      },
    },
    where: searchQuery,
    orderBy: (users, { desc }) => [desc(users.updatedAt)],
    limit: 30,
  });

  return (
    <>
      <SearchFilter />

      {allUsersWithSkills.length === 0 ? (
        <p className="text-center font-bold"> No users found</p>
      ) : (
        <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 pt-4 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <Suspense
            fallback={
              <p className="text-center font-black text-2xl">Loading...</p>
            }
          >
            {allUsersWithSkills.map((user) => {
              const skills = user.usersToSkills.map(
                (userToSkill) => userToSkill.skill
              );
              return (
                <UserCard
                  key={user.id}
                  userName={user.name}
                  userId={user.id}
                  skills={skills}
                  isCurrentUser={currentUserInfo?.userId === user.clerkId}
                />
              );
            })}
          </Suspense>
        </div>
      )}
    </>
  );
}
