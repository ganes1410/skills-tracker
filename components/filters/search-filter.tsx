"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import useNavigationUtils from "@/hooks/useNavigationUtils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

function SearchFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString, getQueryString } = useNavigationUtils();

  const handleSearch = useDebouncedCallback((term) => {
    const qs = createQueryString("q", term);
    router.replace(`${pathname}?${qs}`);
  }, 300);

  return (
    <div className="mb-10 w-full max-w-md mx-auto relative">
      <Input
        className="pl-8"
        defaultValue={getQueryString()?.get("q") || ""}
        type="search"
        placeholder="Search Users"
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
      />
      <MagnifyingGlassIcon className="w-6 h-auto absolute left-2 top-1.5" />
    </div>
  );
}

export default SearchFilter;
