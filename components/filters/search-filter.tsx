"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import useNavigationUtils from "@/hooks/useNavigationUtils";

function SearchFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString, getQueryString } = useNavigationUtils();

  const handleSearch = useDebouncedCallback((term) => {
    const qs = createQueryString("q", term);
    router.replace(`${pathname}?${qs}`);
  }, 300);

  return (
    <div className="mb-10 w-full max-w-md">
      <Input
        defaultValue={getQueryString()?.get("q") || ""}
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
