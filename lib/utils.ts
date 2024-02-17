import { type ClassValue, clsx } from 'clsx';
import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789');

/* -------------------------------------------------------------------------- */
/*                                STRING UTILS                                */
/* -------------------------------------------------------------------------- */
/**
 * truncate a string to a certain length
 *
 * @export
 * @param {string} str
 * @param {number} n
 * @return {*}
 */
export function truncate(str: string, n: number) {
  return str?.length > n ? str.substring(0, n - 1) + '...' : str;
}
