'use client' // Error components must be Client Components

import { ErrorComponent, type ErrorComponentProps } from "@/components/error"

export default function Error({
  error,
  reset,
}: ErrorComponentProps) {
  return <ErrorComponent error={error} reset={reset} />
}
