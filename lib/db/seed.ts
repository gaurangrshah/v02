// @SEE: https://anasrin.vercel.app/blog/seeding-database-with-drizzle-orm/

import { drizzle } from 'drizzle-orm/libsql';

import { createClient } from '@libsql/client';
import { generateLuciaPasswordHash } from 'lucia/utils';

import { env } from '../env.mjs';
import { keys, users } from './schema/auth';

const main = async () => {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  const seedPassword = process.env.SEED_USER_PASSWORD;
  if (!seedPassword) {
    throw new Error(
      'SEED_USER_PASSWORD is not set. Set it in the environment before running db:seed.'
    );
  }
  const hashedPassword = await generateLuciaPasswordHash(seedPassword);

  const client = createClient({
    url: env.DATABASE_URL,
  });
  const db = drizzle(client);
  console.log('⏳ Seeding database...');

  const start = Date.now();

  const userData: (typeof users.$inferInsert)[] = [
    {
      id: '001',
      username: 'gsdev',
      email: 'gaurang.r.shah@gmail.com',
      name: 'GSdev',
    },
  ];

  const [me] = await db
    .insert(users)
    .values(userData)
    .onConflictDoUpdate({ target: users.id, set: { ...userData[0] } })
    .returning();
  if (!me) {
    throw new Error('Failed to create user');
  }

  const keyData: (typeof keys.$inferInsert)[] = [
    {
      id: 'username:gsdev',
      userId: me.id,
      hashedPassword,
    },
  ];

  await db
    .insert(keys)
    .values(keyData)
    .onConflictDoUpdate({ target: keys.id, set: { ...keyData[0] } })
    .returning();

  const end = Date.now();

  console.log(`✅⏳ Database seeded in ${end - start}ms`);

  process.exit(0);
};

main().catch((err) => {
  console.error('❌ Database seeding failed');
  console.error(err);
  process.exit(1);
});
