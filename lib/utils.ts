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

export const sql24HoursAgo = `datetime('now', '-24 hours')`;

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};

/**
 * Generates a random token of the specified length.
 *
 * @param length The length of the token to generate.
 * @returns The randomly generated token.
 */
export function generateRandomToken(length: number) {
  let token = '';
  // allowed characters in the token
  const characters =
    '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    // generate a random character from the allowed characters
    token += characters.charAt(Math.floor(Math.random() * charactersLength));

    // add a '-' every 6 digits
    if ((i + 1) % 6 === 0 && i !== length - 1) {
      token += '-';
    }
  }

  return token;
}

/**
 * Returns the current date and time in the format "YYYY-MM-DD HH:mm:ss".
 * @returns {string} The current date and time.
 */
export function datetimeNow() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
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

// PLACEHOLDER LOADER - while image is transforming
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#E3FADB" offset="20%" />
      <stop stop-color="#ace896" offset="50%" />
      <stop stop-color="#E3FADB" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#E3FADB" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(shimmer(1000, 1000))}`;
