# Sunset Country Tech Public Website

Public-facing website for Sunset Country Tech, built with Next.js, TypeScript and Tailwind CSS.

The site presents local technology services across Mildura and Sunraysia, including computer repairs, IT support, digital literacy, business IT, installations, networking and 3D printing. It uses the supplied Sunset Country Tech logo and icon artwork in `public/brand`.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Prisma schema for protected operations data
- Docker-compatible standalone Next.js output

## Public Routes

- `/`
- `/services`
- `/digital-literacy`
- `/business-it`
- `/3d-printing`
- `/about`
- `/service-areas`
- `/contact`
- `/privacy`
- `/terms`

The app also contains protected internal operations routes and secure quote approval routes:

- `/operations`
- `/login`
- `/q/[token]`

## Required Environment

Copy `.env.example` into `.env.local` for local development and set:

- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `AUTH_SECRET`
- `INTERNAL_USERS_JSON`
- file, email, SMS, accounting and calendar provider values as integrations are enabled

Do not commit real secrets.

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Docker

The app uses Next.js standalone output for smaller production images.

Build the production image:

```bash
docker build -t sunset-country-tech .
```

Run the app image directly:

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e DATABASE_URL=postgresql://postgres:postgres@host.docker.internal:5432/sunset_country_tech \
  -e AUTH_SECRET=replace-with-a-long-random-secret \
  -e INTERNAL_USERS_JSON='[{"id":"owner","email":"owner@sunsetcountry.tech","name":"Owner","role":"Owner","passwordHash":"$2b$12$replace-with-bcrypt-hash"}]' \
  sunset-country-tech
```

Run the app with a local PostgreSQL container:

```bash
docker compose up --build
```

The compose file is intended for local container testing only. Replace `AUTH_SECRET`, `INTERNAL_USERS_JSON` and database credentials before production use.

## Database

The Prisma schema lives in `prisma/schema.prisma`. It models the protected operations system behind the public website, including users, customers, jobs, quotes, invoices, appointments, communications, Digital Literacy profiles and 3D printing jobs.

Generate Prisma client:

```bash
npx prisma generate
```

Apply local development migrations:

```bash
npx prisma migrate dev
```

Apply production migrations:

```bash
npx prisma migrate deploy
```

Generate production staff password hashes:

```bash
npm run auth:hash-password -- "a-long-temporary-password"
```

Put the resulting hash in each `INTERNAL_USERS_JSON` user record.

## Deployment Notes

- `next.config.ts` uses `output: "standalone"` for Docker and self-hosted Node deployments.
- `Dockerfile` copies `public` and `.next/static` into the runtime image so static assets and optimized brand images are available.
- Set `NEXT_PUBLIC_SITE_URL` to the public production URL before building/deploying.
- Configure real production values for `AUTH_SECRET`, `INTERNAL_USERS_JSON` and `DATABASE_URL`.
- Run Prisma migrations before using protected operations routes in production.
