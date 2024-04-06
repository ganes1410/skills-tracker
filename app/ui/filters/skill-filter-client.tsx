"use client";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { FilterParams } from "@/lib/definitions";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { MultiSelect } from "react-multi-select-component";

function SkillFilterClient({
  skillOptions,
}: {
  skillOptions: { label: string; value: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams]
  );
  return (
    <MultiSelect
      options={skillOptions}
      value={
        searchParams.get("skills")
          ? JSON.parse(searchParams.get("skills")!)
          : []
      }
      onChange={(selected: unknown) => {
        createQueryString("skills", JSON.stringify(selected));
      }}
      labelledBy="Select"
    />
  );
}

export default SkillFilterClient;
