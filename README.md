# v02 - G.Shah Dev

Personal portfolio and freelance web development business website.

**Production:** https://gshahdev.com

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Auth:** Lucia
- **Database:** Turso (libSQL) + Drizzle ORM
- **UI:** Radix UI + Tailwind CSS + shadcn/ui
- **Email:** React Email + Resend
- **Analytics:** Vercel Analytics, Speed Insights, Umami (personal team)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start Turso dev database
pnpm turso:dev

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm turso:dev` - Start local Turso database
- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:push` - Push schema to database
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm email` - Preview email templates

## Deployment

Deployed on Vercel with automatic deployments from main branch.

## Analytics

- Vercel Analytics (built-in)
- Vercel Speed Insights (built-in)
- Umami (self-hosted, **personal** team)
