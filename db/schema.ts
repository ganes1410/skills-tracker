import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
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
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    skillsId: integer("skills_id")
      .notNull()
      .references(() => skills.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.skillsId] }),
  })
);

export const usersToSkillsRelations = relations(usersToSkills, ({ one }) => ({
  skill: one(skills, {
    fields: [usersToSkills.skillsId],
    references: [skills.id],
  }),
  user: one(users, {
    fields: [usersToSkills.userId],
    references: [users.id],
  }),
}));
