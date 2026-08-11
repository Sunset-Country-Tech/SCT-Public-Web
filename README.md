# Sunset Country Tech

Modern responsive website for Sunset Country Tech, a local technology support business serving Mildura, Sunraysia and surrounding areas by arrangement.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Edit content

Most website copy and sections live in `src/app/page.tsx`.

The enquiry form lives in `src/components/ContactForm.tsx`. Real contact details are intentionally left as placeholders until the business supplies an email, phone number and social links.

## Contact form integration

The form validates required fields in the browser. To connect it to a provider such as Formspree, Resend, a custom API route, SMTP backend or another form endpoint, add:

```bash
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://your-form-endpoint.example
```

Without that variable, the form shows a local success state so the UI can be reviewed safely.

## Site URL

Set `NEXT_PUBLIC_SITE_URL` to the final website URL in production. This is used for social preview metadata.

## Production checks

```bash
npm run lint
npm run build
```

## Deploy

This is a standard Next.js app and can be deployed to platforms that support Next.js, including Vercel, Netlify or a compatible Node hosting environment. Add the contact form endpoint in the host's environment variables before going live.
