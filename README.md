# Outstation Ambulance website

Built with Astro 7, React islands, Tailwind CSS 4, shadcn/ui and React Bits. Pages are static, with server endpoints for enquiries and payments.

Full project report, including everything that still needs the business's input: [docs/PROJECT-REPORT.md](docs/PROJECT-REPORT.md)

## Run it

```bash
npm install
```

```bash
npm run dev
```

The project includes its own Node (22.23.4) as a dev dependency, so `npm run` scripts work even if your system Node is older.

## Build and host

This site replaces bestambulance.in. Canonicals, sitemap, robots.txt and schema use `SITE_URL`, which defaults to that domain. Only that domain is indexable; any other address gets noindex. Read the cutover checklist in the project report before switching the live site.

```bash
npm run build
```

```bash
npm start
```

- Node 22.23.4 or newer in the 22 line is required. `npm start` runs `dist/server/entry.mjs`; use `HOST` and `PORT` to set the address.

## Deploy on Render

`render.yaml` defines the service: an always-on web service in Singapore on Render's `0.5c-512mb` plan. Don't use the free plan: it sleeps after 15 minutes idle and takes about a minute to wake, which is unsafe for an ambulance site.

1. Push this project to a GitHub, GitLab or Bitbucket repository. Render deploys from Git.
2. In Render, choose **New > Blueprint** and select the repository. The first deploy goes to its own `onrender.com` address, stays noindex, and does not affect bestambulance.in.
3. Add these under the service's **Environment** tab, then redeploy:

| Variable | Value | When |
| --- | --- | --- |
| `LEAD_WEBHOOK_URL`, or `RESEND_API_KEY` with `LEAD_TO_EMAIL` and `LEAD_FROM_EMAIL` | Your delivery channel | Before relying on the forms |
| `CASHFREE_CLIENT_ID`, `CASHFREE_CLIENT_SECRET` | Test keys | For the sandbox test |
| `CASHFREE_ENV` | `production`, with live keys | Only when taking real payments |
| `SITE_URL` | `https://bestambulance.in` | Only at cutover |

**Cutover**, after the checklist in the project report:

1. Set `SITE_URL` to `https://bestambulance.in`, and choose **Save, rebuild, and deploy**. This value is built into the pages.
2. Under **Settings > Custom Domains**, add `bestambulance.in`. Render adds `www` and redirects it to the root domain.
3. Update DNS as Render shows, remove any `AAAA` records, and click **Verify**. Render then issues the HTTPS certificate.

## Make the forms deliver

Copy `.env.example` to `.env` (or set the same variables on the host) and configure at least one channel:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` | Email through Resend |
| `LEAD_WEBHOOK_URL` | POST JSON to a webhook (Google Sheet script, Make, Zapier, CRM) |

Until one is set, forms tell visitors the request was **not sent** and offer phone and WhatsApp. They never show a false success. After configuring, send one real test and confirm it arrives.

## Take advance payments

Set `CASHFREE_CLIENT_ID`, `CASHFREE_CLIENT_SECRET` and `CASHFREE_ENV` (see `.env.example`). It stays in test mode unless `CASHFREE_ENV` is exactly `production`. Point Cashfree's webhook at `/api/payment/webhook`. Without keys, `/pay` says online payment is unavailable and charges nothing. Follow the sandbox steps in section 8 of the project report before taking real payments.

## Where to change things

| Change | File |
| --- | --- |
| Phone, WhatsApp, email, address, GSTIN | `src/data/business.ts` (updates the whole site and schema) |
| Routes, distances, times | `src/data/routes.ts` |
| Services | `src/data/services.ts` |
| Locations and hospitals | `src/data/locations.ts` |
| FAQs | `src/data/faqs.ts` |
| Guides | `src/data/guides.ts` |
| Legal text | `src/data/legal.ts` |
| Colours, type, spacing | tokens at the top of `src/styles/global.css` |

## Publishing a legal page after review

1. Remove the `[CONFIRM ...]` items in `src/data/legal.ts` and set `reviewed: true` on that page.
2. Remove its path from `draftLegal` in `astro.config.mjs`, so that it joins the sitemap.
