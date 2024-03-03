export type ErrorComponentProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

import { useEffect } from "react";

export function ErrorComponent({ error, reset, }: ErrorComponentProps) {
  useEffect(() => {
    // Report the error to an error tracking service
    console.error("Error:", error)

  }, [error])
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        // Attempt to recover by trying to re-render the segment
        onClick={reset}
      >
        Try again
      </button>
    </div>
  )
}
