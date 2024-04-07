import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useNavigationUtils() {
  const searchParams = useSearchParams();

  const getQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    return params;
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  return {
    getQueryString,
    createQueryString,
  };
}
