import { Skill } from "@/db/schema";

export type SkillWithProficiency = Skill & {
  proficiency: "beginner" | "intermediate" | "expert";
};
