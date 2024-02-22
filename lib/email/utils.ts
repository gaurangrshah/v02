import { z } from 'zod';

export const emailSchema = z.object({
  name: z.string().min(3, { message: 'A name is required' }),
  email: z.string().email({ message: 'Please provide a valid email address' }),
});
