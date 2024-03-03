'use client'

import { ErrorComponent, type ErrorComponentProps } from "@/components/error"

export default function GlobalError({
  error,
  reset,
}: ErrorComponentProps) {
  return <ErrorComponent error={error} reset={reset} />
}
