export type FilterParams = {
    value: string | { label: string; value: string }[];
    createQueryString: (name: string, value: string) => void;
  };
  