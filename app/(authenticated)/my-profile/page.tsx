import CreateUserForm from "@/components/form/CreateUserForm";
import { db } from "@/db";
import { UsersToSkills, skills, users, usersToSkills } from "@/db/schema";
import { SkillWithProficiency } from "@/types";
import { auth } from "@clerk/nextjs";
import { eq, like } from "drizzle-orm";
import { redirect } from "next/navigation";

async function MyProfile({
  searchParams,
}: {
  searchParams: {
    skillsearch?: string;
  };
}) {
  const searchQuery = Boolean(searchParams?.skillsearch)
    ? like(skills.name, "%" + searchParams.skillsearch + "%")
    : undefined;

  const skillsList = await db.query.skills.findMany({
    limit: 5,
    where: searchQuery,
  });
  const currentUser = auth();
  const userDataQuery = await db.query.users.findMany({
    with: {
      usersToSkills: {
        with: {
          skill: true,
        },
      },
    },
    // @ts-ignore
    where: eq(users.clerkId, currentUser.userId),
  });
  const userData = userDataQuery?.[0];

  console.log({ userData: JSON.stringify(userData) });
  async function updateUser(data: {
    name: string;
    email: string;
    skillsWithProficiency: SkillWithProficiency[];
  }) {
    "use server";

    console.log({ data });

    const user = await db
      .update(users)
      .set({ name: data.name, email: data.email })
      .where(eq(users.id, userData.id))
      .returning();

    if (user?.[0]) {
      const userToBeUpdated = user[0];
      const skillsToBeAdded: UsersToSkills[] = [];

      await db
        .delete(usersToSkills)
        .where(eq(usersToSkills.userId, userToBeUpdated.id));

      data.skillsWithProficiency.forEach((skill) => {
        skillsToBeAdded.push({
          userId: userToBeUpdated.id,
          skillId: skill.id,
          proficiency: skill.proficiency,
        });
      });

      await db.insert(usersToSkills).values(skillsToBeAdded);

      redirect("/dashboard");
    }
  }
  return (
    <>
      <h1>My Profile</h1>
      <CreateUserForm
        skillsList={skillsList}
        onSubmit={updateUser}
        defaultValues={{
          name: userData.name,
          email: userData.email,
          skills: userData.usersToSkills.map((userToSkill) => ({
            ...userToSkill.skill,
            proficiency: userToSkill.proficiency ?? "beginner",
          })),
        }}
      />
    </>
  );
}

export default MyProfile;
