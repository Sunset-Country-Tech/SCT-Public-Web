# Sunset Country Tech Internal Operations

Private operations app for Sunset Country Tech. This is an internal repair-management, lightweight CRM and field-service system for customers, jobs, devices, quotes, invoices, payments, Digital Literacy sessions, Business IT work, 3D printing jobs, communications and documents.

## Architecture

- Next.js 16 App Router, TypeScript and Tailwind CSS.
- PostgreSQL is the preferred production database, modelled in `prisma/schema.prisma`.
- Prisma is the intended ORM layer for migrations and application queries.
- Authentication is required for internal routes. The current implementation uses configured staff accounts, bcrypt password hashes, signed HTTP-only session cookies, CSRF protection on sign-in and role-based authorization helpers. Production should set `AUTH_SECRET` and `INTERNAL_USERS_JSON`.
- Public access is limited to secure quote approval links under `/q/[token]`.
- Uploaded files and generated PDFs should be stored outside the database. Use a provider-neutral file store and keep PostgreSQL focused on metadata and access rules.
- Email, SMS, accounting and calendar are intentionally provider-neutral adapter layers so Hnry, Xero, MYOB, SMS-Gate, SMTP/API email and Google Calendar can be added later without coupling them to core job data.

## Required Environment

Copy `.env.example` into `.env.local` for local development and set:

- `DATABASE_URL`
- `AUTH_SECRET`
- `INTERNAL_USERS_JSON`
- `NEXT_PUBLIC_SITE_URL`
- file, email, SMS, accounting and calendar provider values as integrations are enabled

Do not commit real secrets.

## Development

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Development fallback account:

- email: `owner@sunsetcountry.tech`
- password: `sunset-demo-2026`
- role: `Owner`

Production does not allow the fallback account. Configure real staff accounts through `INTERNAL_USERS_JSON`.

## Database

The Prisma schema covers the operational entities:

- users, roles and permissions
- customers, businesses, sites and devices
- jobs, status history, notes, files, parts and labour
- quotes, quote items and approvals
- invoices, invoice items, payments and receipts
- appointments, communications, tasks and audit history
- warranties and warranty claims
- Digital Literacy profiles, skills and sessions
- 3D printing jobs and network assets
- templates and generated documents

Recommended setup:

```bash
npx prisma generate
npx prisma migrate dev --name initial_operations_schema
```

An initial migration is included at `prisma/migrations/20260812000000_initial_operations_schema/migration.sql`.
Production migrations should be reviewed before deployment.

Generate production staff password hashes:

```bash
npm run auth:hash-password -- "a-long-temporary-password"
```

Put the resulting hash in each `INTERNAL_USERS_JSON` user record. Roles are assigned in that JSON and cannot be selected on the login page.

Example:

```json
[
  {
    "id": "owner",
    "email": "owner@sunsetcountry.tech",
    "name": "Owner",
    "role": "Owner",
    "passwordHash": "$2b$12$..."
  },
  {
    "id": "tech-1",
    "email": "tech@sunsetcountry.tech",
    "name": "Technician",
    "role": "Technician",
    "passwordHash": "$2b$12$..."
  }
]
```

## Seed Data

The UI currently uses clearly fake development data in `src/lib/operations-data.ts`. When Prisma is wired in, create `prisma/seed.ts` for development-only records and guard it so fake data cannot be run against production.

## Core Workflows

Implemented product surfaces:

- repair intake to job, diagnosis, quote, approval, invoice, payment, collection and warranty readiness
- on-site IT bookings, job tracking and service report readiness
- Digital Literacy goals, skills, sessions and customer-friendly summary readiness
- 3D printing request, design, quote, approval, print and invoice readiness
- dashboard alerts, quick actions, global search, status badges, tasks, exports and reports
- secure customer quote approval route that avoids exposing internal app data

## Security Notes

- Internal routes are protected by middleware.
- Sessions are signed and stored in HTTP-only cookies.
- Staff roles are assigned server-side from configured user records.
- Sign-in uses a CSRF token and basic rate limiting.
- Server-side authorization helpers model role permissions; do not rely on hidden buttons for real authorization.
- Customer data, private files and credentials are sensitive.
- Do not store customer passwords or network credentials in plain text. Add an encrypted credential vault only if there is a strong operational need.
- Soft deletion is modelled for critical records.
- Audit logs are modelled for critical changes.
- Validate uploaded files and block executable formats before storing them.

## Documents and PDFs

Server-side document generation should create branded A4 PDFs for:

- intake receipt
- quote and quote approval
- diagnostic report and service report
- invoice, payment receipt and collection receipt
- warranty receipt
- Digital Literacy session summary
- IT site assessment
- 3D print order
- data transfer authorisation

Store generated files in the configured file store and save metadata in `GeneratedDocument`.

## Backups and Restore

Back up:

- PostgreSQL database using provider snapshots and scheduled logical dumps.
- uploaded file storage using provider snapshots, replication or scheduled object export.
- application configuration and environment variable inventory without exposing secret values.

Restore procedure:

1. Restore PostgreSQL to a new database.
2. Restore or reconnect uploaded file storage.
3. Deploy the same app version.
4. Recreate runtime secrets.
5. Run smoke tests for login, job lookup, quote approval, invoice totals and document download.

## Deployment

This project now uses the standard Next.js build flow. Choose a hosting provider that supports the required Next.js runtime, then configure PostgreSQL, file storage and runtime secrets for that environment.
