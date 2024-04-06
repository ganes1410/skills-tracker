import { db } from "@/db";
import { skills } from "@/db/schema";
import SkillFilterClient from "./skill-filter-client";

async function SkillFilter() {
  const allSKills = await db.select().from(skills).all();
  const skillOptions = allSKills.map((skill) => ({
    label: skill.name,
    value: skill.id,
  }));

  return <SkillFilterClient skillOptions={skillOptions} />;
}

export default SkillFilter;
