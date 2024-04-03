import { db } from "@/db";

export default async function Home() {
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
    <main className="flex min-h-screen flex-col  justify-between p-24">
      <h1>Skills Tracker</h1>
      {allUsersWithSkills.map((user) => (
        <div key={user.id} className="mb-10">
          <p>{user.name}</p>

          <p>Skills:</p>
          <ul>
            {user.usersToSkills.map((userToSkill) => (
              <li key={userToSkill.skillId}>{userToSkill.skill.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
