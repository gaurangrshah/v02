import { useEffect, useState } from 'react';

/**
 * from use-hooks
 * Debounces a value by delaying its update until a specified delay has passed.
 * @param value The value to be debounced.
 * @param delay The delay in milliseconds before updating the debounced value.
 * @returns The debounced value.
 */
export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}
