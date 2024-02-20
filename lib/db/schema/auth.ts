import {
  blob,
  index,
  integer,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
  id: text('id').primaryKey(),
  // other user attributes
  name: text('name'),
  email: text('email'),
  username: text('username'),
});

export const sessions = sqliteTable(
  'user_session',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    activeExpires: blob('active_expires', {
      mode: 'bigint',
    }).notNull(),
    idleExpires: blob('idle_expires', {
      mode: 'bigint',
    }).notNull(),
  },
  (table) => ({
    sessionUserIdIdx: index('session_user_id_idx').on(table.userId),
  })
);

export const keys = sqliteTable('user_key', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
  hashedPassword: text('hashed_password'),
});

export const tokens = sqliteTable(
  'user_token',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    issuedAt: blob('issued_at', {
      mode: 'bigint',
    }).notNull(),
    expiresAt: blob('expires_at', {
      mode: 'bigint',
    }).notNull(),
  },
  (table) => ({
    tokenUserIdIdx: index('token_user_id_idx').on(table.userId),
  })
);

export const roles = sqliteTable(
  'user_role',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    role: text('role').notNull(),
  },
  (table) => ({
    roleUserIdIdx: index('role_user_id_idx').on(table.userId),
  })
);

export const subscribers = sqliteTable(
  'user_subscriber',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').references(() => users.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }),
    verified: integer('verified', { mode: 'boolean' }).notNull(),
    verificationToken: text('verification_token').notNull(),
  },
  (table) => ({
    subscriberUserIdIdx: index('subscriber_user_id_idx').on(table.userId),
  })
);
