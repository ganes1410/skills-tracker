"use client";
import AddSkillForm from "@/components/form/AddSkillForm";
import AppInput from "@/components/form/AppInput";
import { Input } from "@/components/ui/input";
import { SkillWithProficiency } from "@/types";
import { useState } from "react";
import SkillsList from "@/components/form/SkillsList";
import { Skill } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CreateUserForm({
  skillsList,
  onSubmitCreateUser,
}: {
  skillsList: Skill[];
  onSubmitCreateUser: (data: any) => void;
}) {
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

    toast.error("Skill already added");
  };

  const onRemoveSkillFromList = (skillId: string) => {
    const updatedSkillsList = addedSkillsList.filter(
      (skill) => skill.id !== skillId
    );

    setAddedSkillsList(updatedSkillsList);
  };

  const onSubmit = (formData: FormData) => {
    if (!addedSkillsList.length) {
      toast.error("Please add at least one skill");

      return;
    }

    const rawFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
      skillsWithProficiency: addedSkillsList.map((skill) => ({
        id: skill.id,
        proficiency: skill.proficiency,
      })),
    };

    onSubmitCreateUser(rawFormData);
  };

  return (
    <form className="my-8" action={onSubmit}>
      <AppInput label="Name" name="name">
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your full name"
          required
        />
      </AppInput>
      <AppInput label="Email" name="email">
        <Input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Enter your primary email"
        />
      </AppInput>
      <AppInput label="Skills" name="skills">
        <SkillsList
          skills={addedSkillsList}
          onUpdateProficiencyLevel={onAddSkillToList}
          onRemoveSkillFromList={onRemoveSkillFromList}
        />
        <AddSkillForm
          hasSkills={Boolean(addedSkillsList.length)}
          onAddSkillToList={onAddSkillToList}
          skillsList={skillsList}
        />
      </AppInput>

      <Button type="submit" variant="default">
        Finish
      </Button>
    </form>
  );
}
