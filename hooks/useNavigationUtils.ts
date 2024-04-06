import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useNavigationUtils() {
  const searchParams = useSearchParams();

  const getQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    return params.toString();
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return {
    getQueryString,
    createQueryString,
  };
}
