import { v4 as uuidv4 } from "uuid";
import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").default(uuidv4()).primaryKey(),
  clerkId: text("clerk_id").unique().notNull(),
  name: text("name"),
  email: text("email"),
  profileImageUrl: text("profile_image_url"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToSkills: many(usersToSkills),
}));

export const skills = sqliteTable("skills", {
  id: text("id").notNull().primaryKey(),
  name: text("skill_name")
    .default(sql`''`)
    .notNull(),
  icon: text("skill_icon"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const skillsRelations = relations(skills, ({ many }) => ({
  usersToSkills: many(usersToSkills),
}));

export const usersToSkills = sqliteTable(
  "users_to_skills",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    skillId: text("skill_id")
      .notNull()
      .references(() => skills.id),
    experience: integer("experience").notNull(),
    proficiency: text("proficiency", {
      enum: ["beginner", "intermediate", "expert"],
    }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.skillId] }),
  })
);

export const usersToSkillsRelations = relations(usersToSkills, ({ one }) => ({
  skill: one(skills, {
    fields: [usersToSkills.skillId],
    references: [skills.id],
  }),
  user: one(users, {
    fields: [usersToSkills.userId],
    references: [users.id],
  }),
}));


export type Skill = typeof skills.$inferSelect
