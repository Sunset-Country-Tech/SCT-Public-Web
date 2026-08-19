# Sunset Country Tech Public Website

Public-facing website for Sunset Country Tech, built with Next.js, TypeScript and Tailwind CSS.

The site presents local technology services across Mildura and Sunraysia, including computer repairs, IT support, digital literacy, business IT, installations, networking and 3D printing. It uses the supplied Sunset Country Tech logo and icon artwork in `public/brand`.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Docker-compatible standalone Next.js output

## Routes

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

## Required Environment

Copy `.env.example` into `.env.local` for local development and set:

- `NEXT_PUBLIC_SITE_URL`
- `INTERNAL_INTAKE_API_URL`
- `PUBLIC_INTAKE_SECRET`
- `SCT_INTERNAL_INTAKE_URL`
- `SCT_PUBLIC_INTAKE_SECRET`

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

Run the app image directly on host port `3001`:

```bash
docker run --rm -p 3001:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3001 \
  -e INTERNAL_INTAKE_API_URL=https://internal.example.com/api/public-contact-intake \
  -e PUBLIC_INTAKE_SECRET=replace-with-shared-secret \
  sunset-country-tech
```

Run with Docker Compose:

```bash
docker compose up --build
```

Compose serves the site at:

```text
http://localhost:3001
```

The compose setup starts only the public web container.

Set these variables before running Compose when you want contact form submissions to reach the internal app:

```bash
INTERNAL_INTAKE_API_URL=https://internal.example.com/api/public-contact-intake
PUBLIC_INTAKE_SECRET=replace-with-shared-secret
docker compose up --build
```

The route also accepts these alias names if you copied them from the internal app instructions:

```bash
SCT_INTERNAL_INTAKE_URL=https://INTERNAL_DOMAIN/api/public-contact-intake
SCT_PUBLIC_INTAKE_SECRET=same-secret-as-internal-PUBLIC_INTAKE_SECRET
```

## Contact Intake Integration

The Contact page mounts the hosted form with:

```html
<div id="sct-contact-form"></div>
<script
  src="https://sunsetcountry.tech/embed/contact"
  data-mount="#sct-contact-form"
  data-min-height="1120px"
  async
></script>
```

Do not add a second local contact form to the Contact page. The hosted embed contains the styled form, multipart upload handling, validation and submission.

The hosted form submits to `POST /api/contact`. The form also has plain HTML fallback attributes: `action="/api/contact"`, `method="post"` and `encType="multipart/form-data"`. That public endpoint validates the form, checks the honeypot and file limits, then forwards the original `multipart/form-data` request to `INTERNAL_INTAKE_API_URL` or `SCT_INTERNAL_INTAKE_URL`.

The forwarded request includes:

- `x-sct-public-intake-secret: <PUBLIC_INTAKE_SECRET>`
- `x-sct-public-source: sunset-country-tech-public-web`
- `x-forwarded-for: <client-ip>`

Expected internal endpoint:

```text
POST /api/public-contact-intake
```

Required forwarded form fields:

- `name`
- `email`
- `phone`
- `suburb`
- `service`
- `message`
- `device`
- `preferredSupport`
- `photos`
- `companyWebsite`

If the intake URL or shared secret is missing, `/api/contact` returns a safe `503` response instead of silently dropping the enquiry.

## Deployment Notes

- `next.config.ts` uses `output: "standalone"` for Docker and self-hosted Node deployments.
- `Dockerfile` copies `public` and `.next/static` into the runtime image so static assets and optimized brand images are available.
- Set `NEXT_PUBLIC_SITE_URL` to the public production URL before building/deploying.
- Set `INTERNAL_INTAKE_API_URL` and `PUBLIC_INTAKE_SECRET`, or the `SCT_*` aliases, so contact enquiries are delivered to the internal app.
