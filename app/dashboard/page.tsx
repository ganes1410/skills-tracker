import { db } from "@/db";
import UserCard from "../ui/user-card";
import UserFilters from "../ui/user-filters";
import { like } from "drizzle-orm";
import { users } from "@/db/schema";

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) {
  const query = searchParams?.q || "";
  console.log({ query2: query });
  const allUsersWithSkills = await db.query.users.findMany({
    with: {
      usersToSkills: {
        with: {
          skill: true,
        },
      },
    },
    where: Boolean(query) ? like(users.name, "%" + query + "%") : undefined,
  });

  console.log({ allUsersWithSkills, query });

  return (
    <>
      <UserFilters />
      {allUsersWithSkills.length === 0 ? (
        <p> No users found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allUsersWithSkills.map((user) => {
            const skills = user.usersToSkills.map(
              (userToSkill) => userToSkill.skill
            );
            return (
              <UserCard
                key={user.id}
                userName={user.name}
                profileImage={user.profile_image}
                skills={skills}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
