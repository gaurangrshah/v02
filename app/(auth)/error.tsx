'use client'

import { ErrorComponent, type ErrorComponentProps } from "@/components/error"


export default function Error({
  error,
  reset,
}: ErrorComponentProps) {

  return <ErrorComponent error={error} reset={reset} />
}
