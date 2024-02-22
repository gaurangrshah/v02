import { twMerge } from 'tailwind-merge';

import { ZodError, ZodType } from 'zod';
import { customAlphabet } from 'nanoid';

import { type ClassValue, clsx } from 'clsx';

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

/**
 * Debounces a callback function.
 * @param callback The callback function to be debounced.
 * @param wait The debounce wait time in milliseconds.
 * @returns A debounced version of the callback function.
 */
export const debounce = (callback: (...args: any[]) => void, wait: number) => {
  let timeoutId: number | null = null;
  return (...args: any[]) => {
    window.clearTimeout(Number(timeoutId));
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

/**
 * Generates a random secure token.
 *
 * @returns {string} The generated token.
 */
export function generateRandomSecureToken(length = 32) {
  return customAlphabet(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    32
  )();
}

/**
 * @SEE: blog.stackademic.com/form-validation-with-zod-8e30c9fb464a
 * Handles a ZodError with a single level of issues.
 * #NOTE: used by handleZodValidation below
 * @param {ZodError<unknown>} error - The ZodError object to handle.
 * @returns {string | Record<string, string>} - The error message or a record of form data with error messages.
 */
export const handleOneLevelZodError = ({ issues }: ZodError<unknown>) => {
  const formData: Record<string, string> = {};

  // check to make sure there is no nested issues
  if (issues.length === 1 && issues[0].path.length < 1)
    return issues[0].message;

  issues.forEach(({ path, message }) => {
    formData[path.join('-')] = message;
  });

  return formData;
};

/**
 * Validates the given form data against the provided schema.
 *
 * @param formData - The form data to validate.
 * @param schema - The schema to validate against.
 * @returns An object containing the validation result.
 */
export function validateSchema(formData: FormData, schema: ZodType<any, any>) {
  try {
    const data = schema.parse(Object.fromEntries(formData));
    return { success: true, data, error: null };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: handleOneLevelZodError(error),
        data: null,
      };
    }
  }
}
