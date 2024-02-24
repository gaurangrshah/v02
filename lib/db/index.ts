import { drizzle } from 'drizzle-orm/libsql';

import { env } from '@/lib/env.mjs';
import { createClient } from '@libsql/client';

export const sqlite = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(sqlite);
