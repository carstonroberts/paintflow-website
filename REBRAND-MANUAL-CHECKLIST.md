# Rebrand Manual Checklist — PaintFlow → PaintStride

Items that require human action or image re-rendering. Code changes are handled in the accompanying PR.

---

## Visual / Image Assets

- [ ] **OG image** (`public/og-image.png` or similar) — check if it contains the PaintFlow wordmark visually. If so, re-render with "PaintStride" before deploy.
- [ ] **Favicon** (`public/favicon.svg`, `public/logo.png`) — check if it contains text or a PF monogram. If so, update the artwork.
- [ ] **Dashboard screenshots** (`public/dashboard.png`, `public/dashboard.webp`, `public/screenshots/`) — inspect whether any screenshot shows "PaintFlow" in the app UI. If so, retake the screenshot from the rebranded CRM app after that PR deploys.
- [ ] **Founder video poster** — if used anywhere, check for PaintFlow branding in the still frame.

---

## Infrastructure

- [ ] **Railway app name** (`api/checkout.ts` line 1) — the URL `https://paintstride-crm-production.up.railway.app` is what the code now expects. Confirm the Railway service was renamed in the Railway dashboard when the CRM PR deploys, or update this URL to match whatever the actual new deployment URL is.
- [ ] **Vercel domain config** — add `paintstride.com` as the Production domain in the Vercel project settings. Also add `www.paintstride.com` as an alias. The `getpaintflow.com` 301 redirect rules in `vercel.json` require that both old and new domains be configured in Vercel for the redirect to fire.
- [ ] **Stripe webhook / checkout URLs** — verify any Stripe dashboard webhook endpoints and success/cancel redirect URLs that referenced `getpaintflow.com` are updated to `paintstride.com`.

---

## Email / Communications

- [ ] **Support email** — `carston@paintstride.com` is referenced in Refund, Terms, and Privacy pages. Confirm this address is set up (or update back to `carston@getpaintflow.com` if keeping the old address during transition).
- [ ] **Transactional emails** (Stripe receipts, welcome emails) — update sender domain and any brand references in email templates.

---

## SEO / Analytics

- [ ] **Google Search Console** — submit a "Change of Address" from `getpaintflow.com` → `paintstride.com` after both domains are live in Vercel.
- [ ] **Sitemap submission** — submit `https://paintstride.com/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- [ ] **Google Analytics / Plausible** — add `paintstride.com` as a tracked domain.
- [ ] **Backlinks / directory listings** — update any contractor directory or review site profiles (Houzz, Angi, G2, Capterra etc.) that link to `getpaintflow.com`.

---

## Coordination

- [ ] **Deploy order** — merge the `paintflow-crm` rebrand PR first (or simultaneously). `paintstride-crm-production.up.railway.app` must be live before checkout works on the marketing site.
- [ ] **DNS cutover** — point `paintstride.com` to Vercel before or at launch. Keep `getpaintflow.com` DNS alive for the 301 redirect rules to fire.
