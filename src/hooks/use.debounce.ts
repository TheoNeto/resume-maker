import { useEffect, useState } from "react";

export const useDebaunce = <T>(value: T, delay?: number): T => {
  const [debounceValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => clearTimeout(timer);
  }, [delay, value]);

  return debounceValue;
};
