import { sql } from 'drizzle-orm';
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
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

export const sessions = sqliteTable(
  'user_session',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    activeExpires: blob('active_expires', {
      mode: 'bigint',
    }).notNull(),
    idleExpires: blob('idle_expires', {
      mode: 'bigint',
    }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }),
    updatedAt: integer('updated_at', { mode: 'timestamp' }),
  },
  (table) => ({
    sessionUserIdIdx: index('session_user_id_idx').on(table.userId),
  })
);

export const keys = sqliteTable(
  'user_key',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    hashedPassword: text('hashed_password'),
  },
  (table) => ({
    sessionUserIdIdx: index('user_key_user_id_idx').on(table.userId),
  })
);

// export const tokens = sqliteTable(
//   'user_token',
//   {
//     id: text('id').primaryKey(),
//     userId: text('user_id')
//       .notNull()
//       .references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
//     issuedAt: blob('issued_at', {
//       mode: 'bigint',
//     }).notNull(),
//     expiresAt: blob('expires_at', {
//       mode: 'bigint',
//     }).notNull(),
//     createdAt: integer('created_at', { mode: 'timestamp' }),
//     updatedAt: integer('updated_at', { mode: 'timestamp' }),
//   },
//   (table) => ({
//     tokenUserIdIdx: index('token_user_id_idx').on(table.userId),
//   })
// );

// export const roles = sqliteTable(
//   'user_role',
//   {
//     id: text('id').primaryKey(),
//     userId: text('user_id')
//       .notNull()
//       .references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
//     role: text('role').notNull(),
//     createdAt: integer('created_at', { mode: 'timestamp' }),
//     updatedAt: integer('updated_at', { mode: 'timestamp' }),
//   },
//   (table) => ({
//     roleUserIdIdx: index('role_user_id_idx').on(table.userId),
//   })
// );

export const subscribers = sqliteTable(
  'user_subscriber',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').references(() => users.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }),
    email: text('email').notNull().unique(),
    verified: integer('verified', { mode: 'boolean' }).notNull(),
    verificationToken: text('verification_token').notNull().unique(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    // @TODO: add this to the next migration then update subscriber service
    // updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    //   sql`CURRENT_TIMESTAMP`
    // ),
  },
  (table) => ({
    subscriberUserIdIdx: index('subscriber_user_id_idx').on(table.userId),
  })
);
