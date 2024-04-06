"use client";
import AddSkillForm from "@/components/form/AddSkillForm";
import AppInput from "@/components/form/AppInput";
import { Input } from "@/components/ui/input";
import { Skill } from "@/db/schema";
import { SkillWithProficiency } from "@/types";
import { useState } from "react";

export default function CreateUserForm({
  skillsList,
}: {
  skillsList: Skill[];
}) {
  const [addedSkillsList, setAddedSkillsList] = useState<
    SkillWithProficiency[]
  >([]);

  const onAddSkillToList = (skillWithProficiency: SkillWithProficiency) => {
    setAddedSkillsList([...addedSkillsList, skillWithProficiency]);
  };

  return (
    <form className="my-8">
      <AppInput label="Name" name="name">
        <Input type="text" id="name" placeholder="Enter your full name" />
      </AppInput>
      <AppInput label="Email" name="email">
        <Input type="email" id="email" placeholder="Enter your primary email" />
      </AppInput>
      <AppInput label="Skills" name="skills">
        <AddSkillForm
          onAddSkillToList={onAddSkillToList}
          skillsList={skillsList}
        />
      </AppInput>
    </form>
  );
}
