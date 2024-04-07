"use client";
import AddSkillForm from "@/components/form/AddSkillForm";
import AppInput from "@/components/form/AppInput";
import { Input } from "@/components/ui/input";
import { SkillWithProficiency } from "@/types";
import { Suspense, useState } from "react";
import SkillsList from "@/components/form/SkillsList";

export default function CreateUserForm() {
  const [addedSkillsList, setAddedSkillsList] = useState<
    SkillWithProficiency[]
  >([]);

  const onAddSkillToList = (skillWithProficiency: SkillWithProficiency) => {
    const match = addedSkillsList.find(
      (skill) => skill.id === skillWithProficiency.id
    );

    if (!match) {
      setAddedSkillsList([...addedSkillsList, skillWithProficiency]);

      return;
    }

    const updatedSkillsList = addedSkillsList.map((skill) => {
      if (skill.id === skillWithProficiency.id) {
        return skillWithProficiency;
      }

      return skill;
    });

    setAddedSkillsList(updatedSkillsList);
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
        <SkillsList
          skills={addedSkillsList}
          onUpdateProficiencyLevel={onAddSkillToList}
        />
        <AddSkillForm
          hasSkills={Boolean(addedSkillsList.length)}
          onAddSkillToList={onAddSkillToList}
        />
      </AppInput>
    </form>
  );
}
