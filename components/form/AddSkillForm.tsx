"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SelectSkillCombobox from "@/components/form/SelectSkillCombobox";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Skill } from "@/db/schema";
import { useState } from "react";
import SkillProficiencySlider from "@/components/form/SkillProficiencySlider";
import { cn } from "@/lib/utils";
import { SkillWithProficiency } from "@/types";

export default function AddSkillForm({
  skillsList,
  onAddSkillToList,
}: {
  skillsList: Skill[];
  onAddSkillToList: (skill: SkillWithProficiency) => void;
}) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [proficiencyLevel, setProficiencyLevel] = useState(1);
  const [parent] = useAutoAnimate();

  const onAddSkill = async (skill: Skill) => {
    setSelectedSkill(skill);
  };

  const handleProficiencyLevelChange = (value: number[]) => {
    if (!value.length) {
      return;
    }

    setProficiencyLevel(value[0]);
  };

  const handleAddSkillToList = () => {
    onAddSkillToList({
      ...selectedSkill!,
      proficiency: ["Beginner", "Intermediate", "Expert"][proficiencyLevel],
    });
    setSelectedSkill(null);
    setProficiencyLevel(1);
  };

  return (
    <div className="flex flex-col gap-2 mb-6">
      <Drawer>
        <DrawerTrigger asChild>
          <Button type="button" variant="outline" className="max-w-36">
            Add skill
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Add skill</DrawerTitle>
              <DrawerDescription>
                You can also set your proficiency level here.
              </DrawerDescription>
            </DrawerHeader>
            <div ref={parent} className="px-4 my-4">
              <SelectSkillCombobox
                selectedSkill={selectedSkill}
                onAddSkill={onAddSkill}
                list={skillsList}
              />
              {selectedSkill && (
                <div className="mt-8">
                  <div>
                    Set your proficiency level in{" "}
                    <span className="font-bold">{selectedSkill.name}</span>
                  </div>
                  <div className="my-6">
                    <SkillProficiencySlider
                      defaultValue={[1]}
                      max={2}
                      step={1}
                      onValueChange={handleProficiencyLevelChange}
                    />
                    <p
                      className={cn(
                        "mt-4 font-bold",
                        proficiencyLevel === 2
                          ? "text-right"
                          : proficiencyLevel === 1
                          ? "text-center"
                          : "text-left"
                      )}
                    >
                      {["Beginner", "Intermediate", "Expert"][proficiencyLevel]}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  disabled={!selectedSkill}
                  type="button"
                  onClick={handleAddSkillToList}
                >
                  Add
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
