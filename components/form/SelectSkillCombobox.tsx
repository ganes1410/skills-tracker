"use client";
import { useEffect, useState } from "react";
import { Skill } from "@/db/schema";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import useNavigationUtils from "@/hooks/useNavigationUtils";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function SelectSkillCombobox({
  selectedSkill,
  onAddSkill,
}: {
  selectedSkill: Skill | null;
  onAddSkill: (skill: Skill) => Promise<void>;
}) {
  const { createQueryString } = useNavigationUtils();

  const [allSkillsList, setAllSkillsList] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useDebouncedCallback((term) => {
    setSearchQuery(term);
  }, 300);

  const handleSkillSelect = (skill: Skill) => {
    onAddSkill(skill);
  };

  useEffect(() => {
    handleSearch("");
  }, [handleSearch]);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await fetch(`/api/skills?skillsearch=${searchQuery}`);
      const skills = await response.json();

      setAllSkillsList(skills);
    };

    fetchSkills();
  }, [searchQuery]);

  return (
    <div className="rounded-lg border shadow-md min-h-64">
      <Input
        placeholder="Search skills..."
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
      />
      <div>
        {!allSkillsList?.length ? (
          <p className="text-sm text-center py-8">No results found.</p>
        ) : (
          <div className="pt-2">
            {allSkillsList.map((skill) => (
              <div
                key={skill.id}
                onClick={() => handleSkillSelect(skill)}
                className={cn(
                  skill.id === selectedSkill?.id
                    ? "bg-gray-100"
                    : "hover:bg-gray-50",
                  "flex items-center px-2 py-2 cursor-pointer"
                )}
              >
                <span>
                  <Image
                    src={skill?.icon ?? ""}
                    alt={skill.name}
                    className="h-6 w-6 rounded-full mr-2 border-2 border-gray-500"
                    width={24}
                    height={24}
                  />
                </span>
                <span className="text-sm">{skill.name}</span>
                <CheckIcon
                  fontSize={24}
                  className={cn(
                    "ml-auto h-5 w-auto",
                    skill.id === selectedSkill?.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
