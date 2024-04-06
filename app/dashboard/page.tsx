import { db } from "@/db";
import UserCard from "../ui/user-card";

export default async function Dashboard() {
  const allUsersWithSkills = await db.query.users.findMany({
    with: {
      usersToSkills: {
        with: {
          skill: true,
        },
      },
    },
  });
  return (
    <main className="flex flex-col justify-center items-center min-h-screen min-w-screen p-24">
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
    </main>
  );
}
