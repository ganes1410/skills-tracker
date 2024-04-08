import CreateUserForm from "@/components/form/CreateUserForm";
import { db } from "@/db";
import { UsersToSkills, skills, users, usersToSkills } from "@/db/schema";
import { SkillWithProficiency } from "@/types";
import { auth } from "@clerk/nextjs";
import { like } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Onboarding({
  searchParams,
}: {
  searchParams: {
    skillsearch?: string;
  };
}) {
  const { userId } = auth();
  const searchQuery = Boolean(searchParams?.skillsearch)
    ? like(skills.name, "%" + searchParams.skillsearch + "%")
    : undefined;

  const skillsList = await db.query.skills.findMany({
    limit: 5,
    where: searchQuery,
  });

  async function createUser(data: {
    name: string;
    email: string;
    skillsWithProficiency: SkillWithProficiency[];
  }) {
    "use server";

    console.log({ data });

    const user = await db
      .insert(users)
      .values({
        clerkId: userId ?? "",
        name: data.name,
        email: data.email,
      })
      .returning();

    if (user?.[0]) {
      const createdUser = user[0];
      const skillsToBeAdded: UsersToSkills[] = [];

      data.skillsWithProficiency.forEach((skill) => {
        skillsToBeAdded.push({
          userId: createdUser.id,
          skillId: skill.id,
          proficiency: skill.proficiency,
        });
      });

      await db.insert(usersToSkills).values(skillsToBeAdded);

      redirect("/dashboard");
    }
  }

  return (
    <div>
      <h1 className="font-black text-3xl">Let&apos;s get you set up!</h1>
      <p className="mt-3">
        Please update these details before we can take you to the world&apos;s
        most beautiful dashboard.
      </p>
      <CreateUserForm skillsList={skillsList} onSubmit={createUser} />
    </div>
  );
}
