"use client";
import { SkillWithProficiency } from "@/types";
import SkillProficiencySlider from "@/components/form/SkillProficiencySlider";
import { PROFICIENCY_LEVELS } from "@/contants";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function SkillsList({
  skills,
  onUpdateProficiencyLevel,
  onRemoveSkillFromList,
}: {
  skills: SkillWithProficiency[];
  onUpdateProficiencyLevel: (skill: SkillWithProficiency) => void;
  onRemoveSkillFromList: (skillId: string) => void;
}) {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent}>
      {skills.map((skill) => {
        const proficiencyIndex = PROFICIENCY_LEVELS.indexOf(skill.proficiency);
        return (
          <div
            key={skill.id}
            className="flex my-2 justify-between items-center gap-3"
          >
            <div className="flex-[0.5] text-sm font-semibold">{skill.name}</div>
            <SkillProficiencySlider
              className="flex-[0.25]"
              defaultValue={[proficiencyIndex]}
              max={2}
              step={1}
              onValueChange={(value) => {
                onUpdateProficiencyLevel({
                  ...skill,
                  proficiency: PROFICIENCY_LEVELS[value[0]],
                });
              }}
            />
            <p className="text-sm text-right font-semibold flex-[0.25]">
              {PROFICIENCY_LEVELS[proficiencyIndex]}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemoveSkillFromList(skill.id)}
            >
              <TrashIcon color="red" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
