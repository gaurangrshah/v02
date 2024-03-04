import { env } from '@/lib/env.mjs';
import {
  Component,
  ComponentPropsWithRef,
  ComponentType,
  PropsWithChildren,
} from 'react';
/**
 * The main purpose of this component is to provide a way to communicate the app is in fallback mode
 * pass the fallback in as a child to this component if it errors it will display a red border
 * around the wrapped children
 *
 *
 * @param {{
 *   children: React.ReactNode;
 * }} {
 *   children,
 * }
 * @return {*}
 */
export default function Fallback({ children }: { children: React.ReactNode }) {
  const isDev = env.NEXT_PUBLIC_CURRENT_ENV === 'dev';

  return isDev ? (
    <div className='rounded-xl border-4 border-red-500'>{children}</div>
  ) : (
    <>{children}</>
  );
}
