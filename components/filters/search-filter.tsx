"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

function SearchFilter() {
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
    [pathname, router, searchParams]
  );

  const handleSearch = useDebouncedCallback((term) => {
    createQueryString("q", term);
  }, 300);

  return (
    <div className="mb-10 w-full max-w-md">
      <Input
        defaultValue={searchParams.get("q") || ""}
        type="search"
        placeholder="Search Users"
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
      />
    </div>
  );
}

export default SearchFilter;
