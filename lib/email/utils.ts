import { z } from 'zod';

export const emailSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email(),
});
