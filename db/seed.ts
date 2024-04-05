import { faker } from "@faker-js/faker";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/db/schema";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client, { schema });

const TOTAL_USERS = 100;
const TOTAL_SKILLS = 50;
const TOTAL_SKILLS_TO_ADD = 5;
const allProficiency = ["beginner", "intermediate", "expert"] as const;

async function main() {
  console.log("Seeding database...");
  const skillsToPushed = [];
  const usersList = [];
  const usersToSkillsList = [];

  for (let i = 0; i < TOTAL_SKILLS; i++) {
    skillsToPushed.push({
      id: faker.database.mongodbObjectId(),
      name: faker.person.jobTitle(),
      icon: faker.image.avatar(),
    });
  }

  for (let i = 0; i < TOTAL_USERS; i++) {
    const user = {
      id: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      profile_image: faker.image.avatar(),
    };

    usersList.push(user);
  }

  const skillsFromDb = await db
    .insert(schema.skills)
    .values(skillsToPushed)
    .onConflictDoNothing()
    .returning();

  console.log("Seeded Skills");

  const usersFromDb = await db
    .insert(schema.users)
    .values(usersList)
    .onConflictDoNothing()
    .returning();

  console.log("Seeded Users");

  for (let index = 0; index < usersFromDb.length; index++) {
    const user = usersFromDb[index];
    let skillIds: string[] = [];

    for (let index = 0; index < TOTAL_SKILLS_TO_ADD; index++) {
      const skillId =
        skillsFromDb[Math.floor(Math.random() * skillsFromDb.length)].id;
      skillIds = Array.from(new Set([...skillIds, skillId]));
    }

    console.log({ skillIds });

    for (let skillIndex = 0; skillIndex < skillIds.length; skillIndex++) {
      usersToSkillsList.push({
        userId: user.id,
        skillId: skillIds[skillIndex],
        experience: Math.floor(Math.random() * 15 + 1),
        proficiency:
          allProficiency[Math.floor(Math.random() * allProficiency.length)],
      });
    }
  }

  console.log({ usersToSkillsList });
  await db.insert(schema.usersToSkills).values(usersToSkillsList);
  console.log("Seeded Users to Skills");
}

main();
