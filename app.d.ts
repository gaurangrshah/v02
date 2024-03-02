// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('@/lib/auth/lucia').Auth;
  type DatabaseUserAttributes = {
    username: string;
    name: string;
    email: string;
  };
  type DatabaseSessionAttributes = {};
}

declare module 'analytics-plugin-do-not-track';
declare module '@analytics/google-tag-manager';
declare module '@analytics/google-analytics';
