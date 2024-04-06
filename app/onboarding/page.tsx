import CreateUserForm from "@/components/form/CreateUserForm";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { like } from "drizzle-orm";
import { Suspense } from "react";

export default async function Onboarding({
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

  return (
    <div>
      <h1 className="font-black text-3xl">Let&apos;s get you set up!</h1>
      <p className="mt-3">
        Please update these details before we can take you to the world&apos;s
        most beautiful dashboard.
      </p>
      <Suspense>
        <CreateUserForm skillsList={skillsList} />
      </Suspense>
    </div>
  );
}
