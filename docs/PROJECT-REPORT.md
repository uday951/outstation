# Project report: Best Ambulance Service outstation website

Prepared 4 November 2026. Every test result below comes from a run against the final dependency set (Astro 7.4.5). The only later changes were removing one unverified schema field (`availableLanguage`) and a final clean build. The build was confirmed to complete without that field, but the test suite and schema validator were not re-run after it.

## 0. Before launch: decisions and facts needed from the business

| # | Item | Why it matters |
| --- | --- | --- |
| 1 | **Export anything worth keeping from the old admin panel** (`/admin/login`) | Decided: this site replaces bestambulance.in and has no admin dashboard. Leads arrive by email or webhook, and payments are managed in the Cashfree dashboard. The old panel goes away with the old site, and it was never opened, so its contents are unknown. |
| 2 | **Test Cashfree with real sandbox keys** | Decided: advance payments stay. The code is built, but has only been tested against a local stand-in for Cashfree. No real checkout has run. See "Cashfree payments" in section 8. |
| 3 | **Connect a form delivery channel** (Resend or a webhook) | Until then forms honestly fail and redirect people to phone and WhatsApp. Real email delivery has not been tested. |
| 4 | **Confirm the vehicle branding** | Photos show "Lucky Ambulance" and other numbers (9347134108, 7288020108, 8686427425, 9398328703), not +91 88210 84108. Number plates are also visible. Confirm these are fine to publish. |
| 5 | **Confirm route figures** | See the table in section 7. Nellore especially. |
| 6 | **Legal and medical review** | See section 11. |
| 7 | **Confirm the brand on the vehicles and email** | The site now says Outstation Ambulance, but the photos show "Lucky Ambulance" and the email address is care@bestambulance.in. |
| 8 | **Confirm the domain still suits the new name** | The plan is to replace bestambulance.in, which now wouldn't match the brand name. |

## 1. Reference pages inspected

Crawled 4 November 2026. robots.txt and sitemap.xml were both read.

- **Server HTML of all 124 live pages** (123 in the sitemap, plus `/book`, which the sitemap omits): title, description, canonical, headings, schema types, links, forms and images were extracted from every page. The site renders on the server, so this is the real content.
- **Rendered in the browser (desktop):** `/`, `/contact`, `/services`, `/services/outstation-ambulance`, `/services/outstation-ambulance/hyderabad-to-bangalore`, `/about`, `/fleet`, `/faq`, `/book`.
- **Rendered at mobile width:** homepage only.
- **Content read in full:** home, about, contact, services, fleet, faq, book, testimonials, our-brands, safety-standards, hospitals hub, all 6 policies, all 9 route pages, 19 service pages (emergency, ICU, ventilator, oxygen, ALS, BLS, cardiac, trauma, neonatal, patient transport, hospital transfer, air, train, medical escort, airport, freezer box, mortuary, standby, outstation), and 7 location pages (LB Nagar, Secunderabad, Gachibowli, Kukatpally, Banjara Hills, Jubilee Hills, HITEC City).
- **Extracted but not read line by line:** the other service pages (the variants that were consolidated), the other location pages, the hospital detail pages, and the 15 blog posts.
- **Not exercised:** their forms and the advance-payment flow were not submitted, the push prompt was not accepted, and their location prompt was not allowed.
- `/review`, `/careers`, `/gallery` and `/sitemap` return 404.

Full URL inventory: 36 services, 35 locations, 9 outstation routes, 10 hospitals, 15 blog posts, and home, about, contact, services, locations, hospitals, our-brands, fleet, testimonials, blog, faq, safety-standards, privacy-policy, terms, refund-policy, cancellation-policy, service-delivery-policy, disclaimer, book.

## 2. Reference feature inventory, and what was done with each

| Reference feature | This site |
| --- | --- |
| Call and WhatsApp in header, dock, page heroes and footer | Built, with prefilled messages by route and service |
| Mobile dock: Call, WhatsApp, Location, Callback | Built: Call, WhatsApp, Plan, Callback |
| Share location | Built as an opt-in button in the pickup field |
| Callback form | Built (`/contact#callback`) |
| Contact form | Built |
| `/book` with advance payment (Cashfree) | Split in two: `/book` sends the request, `/pay` takes the advance once a coordinator has confirmed the trip and amount |
| "Which ambulance?" two-question finder | Built as a plain list of links, with no JavaScript |
| BLS vs ALS vs ICU vs Oxygen table | Built |
| Equipment list | Built |
| How-it-works steps, why-us, FAQ | Built, rewritten |
| Coverage map (hover) | Replaced by the to-scale route ladder and a locality list |
| Fleet photos | Built, using the real photos |
| Safety and standards page | Built |
| Operating brands | Moved to About, with outbound links. `/our-brands` redirects there |
| Testimonials | **Omitted.** Only one review exists ("good service"). `/testimonials` redirects to About. Add real reviews later |
| Site search | **Omitted**: not useful at this size for an urgent task. Can be added |
| Tawk.to chat, Microsoft Clarity, push prompt, location prompt on load | **Omitted on purpose**: they add weight and interruptions at a stressful moment. Add analytics when you choose one, and update the Privacy Policy first |
| Time-based greeting | Omitted (decorative) |
| "24×7 / 35+ / ~15 min / 100%" stat tiles | **Not reused.** They conflict (~15 min vs 15–20 min elsewhere) and "100%" cannot be verified |
| Schema: MedicalBusiness, Service, BreadcrumbList, Article, FAQPage | Reused except FAQPage (section 5) |

## 3. Implemented pages (66 rendered, 55 indexable)

- **Main (8):** Home, About, Plan a Transfer (`/book`), Contact, FAQ, Fleet, Hospitals, Safety and Standards
- **Services (20):** hub, Outstation Ambulance, ICU, Ventilator, Oxygen, ALS, BLS, Patient Transport, Hospital-to-Hospital Transfer, Neonatal and Pediatric, Medical Escort, Train Coordination, Air Coordination, Airport Transfer, Emergency, Cardiac, Trauma and Accident, Freezer Box, Mortuary, Standby and Event
- **Routes (11):** Hyderabad to Warangal, Khammam, Guntur, Vijayawada, Nellore, Tirupati, Bangalore, Visakhapatnam, Chennai, Mumbai, Delhi
- **Locations (9):** hub, Hyderabad, Secunderabad, LB Nagar, Gachibowli, Kukatpally, Banjara Hills, Jubilee Hills, HITEC City
- **Guides (7):** hub; how to book; choosing the right ambulance; information needed; preparing a patient; oxygen planning; hospital-to-hospital guidance
- **Legal, draft and noindex (6):** Privacy, Terms, Disclaimer, Refund, Cancellation, Service Delivery
- **System (5):** 404, request received, request not sent, pay an advance, payment status (all noindex)
- 73 URLs of the current site redirect (301) to the page that absorbed them or the closest match (section 9).

**Deliberately not built**

- *Pune:* you listed it as an example, but the business names only Bangalore, Chennai, Vijayawada, Mumbai and Delhi as frequent routes, and publishes pages for Warangal, Nellore, Tirupati, Visakhapatnam, Guntur and Khammam. Routing data has it at about 560 km. Add it in `routes.ts` once confirmed. Until then, Pune is handled through "other destinations, case by case".
- *Thin variants:* 17 service variants were consolidated into stronger pages, all with redirects, and 28 location pages became a hub list rather than near-duplicate pages. The Hyderabad location page is new. See section 9 if this site replaces the current one.

## 4. Functionality checklist

| Feature | Status | How it was checked |
| --- | --- | --- |
| Booking form with all requested fields | Done | Browser |
| Client and server validation (same rules) | Done | Browser, API |
| Error summary, focus handling, field-level errors in visual order | Done | Browser |
| Loading state | Done | Browser ("Sending…", busy, disabled) |
| Success only after real delivery | Done | Browser and test webhook received the data |
| Failure panel, details kept, phone and WhatsApp fallback | Done | Browser with no channel, API with a failing webhook |
| Works without JavaScript | Done | Simulated browser posts (303 to a result page). Not tested with JavaScript actually disabled |
| Spam protection: honeypot, rate limit, origin check | Done | API |
| Direct calling | Done | All `tel:` links audited on 61 pages. Not dialled |
| WhatsApp: float, dock, service and route CTAs, prefilled | Done | Link format and text checked. **Not opened in WhatsApp** |
| Geolocation button | Built | **Not tested with a real location** (code path only) |
| Prefill via `/book?to=&type=` | Done | Browser |
| Advance payment via Cashfree | Built | 38 API checks and browser flows against a local mock. **No real sandbox checkout yet** (section 8) |
| Sensitive medical data | Minimised | General condition only; the form asks people not to send a diagnosis |

## 5. SEO checklist

Skills used: `seo-local`, `seo-programmatic`, `seo-schema` guidance, and the `metadata_template.py` gate from the SEO skill.

**Technical (checked on the running production build)**

- Self-referencing canonical, unique title and description, one H1 and no skipped heading levels on all 61 crawled pages: 0 issues
- Clean URLs, trailing slash redirect (301), true 404 status
- XML sitemap with 55 URLs; noindex pages excluded; robots.txt points to it
- Open Graph and Twitter metadata; alt text and dimensions on all images
- Internal links: no broken or redirected links, no broken assets
- HTTPS is a hosting step

**Thin content gates**

| Set | Worst overlap with closest sibling | Minimum words |
| --- | --- | --- |
| Routes | 33% | 478 |
| Locations | 23% | 322 |
| Services | 16% | 338 |
| Guides | 28% | 466 |

- Metadata gate: 55 pages checked, 0 templated, site risk **low**
- Overlap is measured on 6-word sequences in the page body, including repeated page furniture. Smaller utility pages (blog hub, safety, hospitals, fleet, about) are 206–267 words.

**Structured data**

- MedicalBusiness (with Ambulance as `additionalType`), WebSite, WebPage, AboutPage, ContactPage, BreadcrumbList, Service, Article
- Schema.org validator: **no errors or warnings** on 5 sample pages. Google's Rich Results Test needs a public URL, so run it after launch.
- **No FAQPage:** Google retired FAQ rich results in May 2026. FAQs remain visible on the page.
- **No geo coordinates:** the reference site's coordinates are the city centre, not the LB Nagar address. Add real ones.
- **No ratings or reviews**, and no medical credentials.

**Local and keywords**

- NAP comes from one file, so it stays consistent across the site and schema
- Keyword research was by live search only. **No search volume data**: no keyword tool is connected
- Search showed cost is a major intent, and a competitor publishes per-trip fares. This site explains what drives cost, because the business publishes no prices

**Not possible yet:** Search Console, CrUX field data, PageSpeed on a live URL, indexing checks. All need a public domain.

## 6. Architecture and stack

- **Astro 7.4.5** with `@astrojs/node`: static pages, plus one server route, `POST /api/enquiry`
- **Tailwind CSS 4, shadcn/ui and React Bits** on React islands, with custom CSS tokens and two self-hosted variable fonts
- **JavaScript:** small vanilla scripts on all pages; React loads only on the home page, when its islands scroll into view.
- **Data-driven content** in `src/data/*`
- **Node:** Astro 7 needs 22.23.4 or newer. This machine has 22.14, and it was not changed. Node is a project dev dependency instead, so `npm run` works. The host must supply its own Node 22.23.4+.
- **Hosting:** Render web service from `render.yaml`, in Singapore, on the always-on `0.5c-512mb` plan. The free plan sleeps after 15 minutes and takes about a minute to wake, which is unsafe here. Only `bestambulance.in` is indexable; any other address gets noindex. Tested by reproducing Render's commands and variables on a clean Windows copy with Node 22.23.4. **Not yet run on Render or on Linux.**
- **Why Astro 7:** Astro 5 was tried first for the installed Node, but `npm audit` showed serious issues, including a crash from a malformed Host header and an AVIF image RCE. `npm audit` now reports **0 vulnerabilities**.

**Design system** (`src/styles/global.css`): light, chosen by the client. Deep navy `#0f1b3d`, blue `#2152d9`, with red `#d42a39` kept for calling; Manrope for display and Geist for reading, both self-hosted; large radii, soft shadows, frosted header, soft card glow that follows the cursor, and scroll reveals that respect reduced motion. Distinctive to this site: an interactive route map plotted from real coordinates and a hero route planner. The logo is still a placeholder mark, so replace it with the official one.

**Component libraries:** Tailwind CSS 4, shadcn/ui (Button) and React Bits (SpotlightCard, CountUp), the last two as React islands on the home page. React Bits is MIT with a Commons Clause: fine inside this website, but the components can't be resold on their own. Icons are Lucide (ISC).

**Skills:** `ui-ux-pro-max` and `emil-design-eng` were used. No skill is named "EMLI"; `emil-design-eng` is assumed to be what you meant. `reverse-engineer-anything` (REA) is for binaries and packaged apps, so the site was inspected with a browser and an HTTP crawl instead, keeping its practice of separating what was observed from what is unknown.

## 7. Contact details reused

Reuse authorised by you for Best Ambulance Service.

| Detail | Value | Source |
| --- | --- | --- |
| Brand | Outstation Ambulance | Requested by the client |
| Operator | Best Ambulance Service | Site. Shown beside the GSTIN and PAN, which are registered to it. **Please confirm this wording.** |
| Phone and WhatsApp | +91 88210 84108 | Site |
| Email | care@bestambulance.in | Site, schema |
| Address | 5-5-871, Chintalkunta Check Post Bus Stop, near NASA Hospitals, LB Nagar, Hyderabad 500074 | **Schema only**, not shown on their pages. Please confirm it should be public |
| Hours | 24×7 | Site, schema |
| GSTIN and PAN | 36BRNPJ8525Q1ZV, BRNPJ8525Q | Site footer |
| Founder | Lucky | About page |
| Maps link | Address search URL | **Not a verified listing.** Replace it with the Google Business Profile link |

**Route figures for the business to confirm** (checked with OSRM road routing)

| Route | Published | Used on this site | Note |
| --- | --- | --- | --- |
| Nellore | 370 km, 6–7 h | ~450 km, 8–9 h | Routing gives 448 km. The published figure looks wrong |
| Visakhapatnam | 620 km | ~620 km | 623 km via Vijayawada, 561 km via Khammam |
| Tirupati | 570 km | ~555 km | Routing gives 551–553 km |
| Warangal | 145 km | ~150 km | Routing gives 149–154 km |
| Khammam | 200 km | ~195 km | Routing gives 194–197 km |
| Chennai | via NH44 / NH716 | via NH65, NH16 | Routing prefers the coastal line |
| Mumbai | Named, no figures | ~710 km, 13–15 h | **Time is my estimate** |
| Delhi | Named, no figures | ~1,510 km, 28–34 h | **Time is my estimate** |

Town-by-town distances on the route strips come from the same routing data and are labelled approximate. Planning notes on route pages (junctions, traffic, typical break points) are general geography I wrote, not statements from the business, and are worth a quick read by a driver.

**Other reference site issues**

- Its outstation page says route pages exist for Mumbai and Delhi, but neither is in its sitemap.
- Its live Refund and Cancellation pages publicly show "Note for internal review" and `[REVIEW]` placeholders. Worth fixing now, whatever happens with this project.

## 8. Features needing backend or third-party setup

- **Form delivery:** code is complete; needs a Resend key and verified sender, or a webhook URL
- **Advance payment:** code complete; needs Cashfree keys and a sandbox run (below)
- **Google Business Profile, Search Console, Bing Places:** owner access needed
- **Analytics:** none installed; choose one and update the Privacy Policy first
- **Rate limit:** in memory per server instance. Fine for one server; needs a shared store if scaled out

### Cashfree payments

**How it works**

1. A coordinator confirms the trip and amount, and can send a link such as `/pay?ref=BA-261104-9FEF&amount=5000`.
2. The customer accepts the refund and cancellation policies. The server creates the order, using keys the browser never sees.
3. Cashfree's checkout takes the payment. Cashfree's script loads only at this moment, not on any other visit.
4. Back on `/pay/status`, the server asks Cashfree whether the order is paid. The return to the site is not treated as proof.
5. Cashfree's signed webhook records success even if the customer closes the tab. The business gets one notice through the same channel as form leads.

Emergencies never need payment first, and the pay page says so.

**To finish, in this order**

1. Get **test** keys from the Cashfree dashboard, and put them in `.env` (`CASHFREE_CLIENT_ID`, `CASHFREE_CLIENT_SECRET`, `CASHFREE_ENV=sandbox`). Please do not paste keys into chat.
2. Run one sandbox payment on the Render `onrender.com` address, with Cashfree's webhook pointed at `/api/payment/webhook` there. Add the keys in Render's Environment tab for this, not in a file.
3. **Confirm the webhook signature is accepted.** Cashfree's docs conflict: the description shows a `.` between timestamp and body, while all its code samples have none. The site follows the code samples. A mismatch would show as 401s, and payments would then only be recorded when the customer returns to the status page.
4. Set a low-value live test with live keys and `CASHFREE_ENV=production`, then refund it.

**Dashboard changes at cutover**

- Move the webhook URL from the current site's endpoint to `https://bestambulance.in/api/payment/webhook`. The current address is unknown.
- Check the domain whitelist. It should already cover bestambulance.in, and Cashfree says requests take up to 24 hours.
- Cashfree requires Contact, Terms and Refund/Cancellation pages. Ours currently show a DRAFT banner, so finish legal review before going live.

**My assumptions, please confirm**

- ₹100 to ₹2,00,000 online limit (`src/lib/payment.ts`). This is a guard against typos that I chose, not a business rule.
- Customers type the amount themselves, as on the current site. A prefilled link reduces mistakes, but the amount stays editable, so check it against the quote.
- Paying does not by itself book a vehicle.

**Not included**

- Payment history or admin screens. The Cashfree dashboard is the record, and refunds are made there.
- GST invoices or receipts beyond Cashfree's own. Ask your accountant what is required.
- Automatic notices for failed payments or refunds.

## 9. Unfinished, or decided by you

- Real form delivery is not connected (item 0.3)
- **Decided: this site replaces bestambulance.in.** The domain is now the default for canonicals, sitemap and schema. Nothing has been deployed, and the live site has not been changed.
- **Redirects:** all 126 old paths tested on the production build (124 crawled pages, plus `/sitemap.xml` and `/robots.txt`): 53 still serve directly, 73 redirect in one hop, 0 broken.

**Expected search impact**

- Redirects do not preserve everything. The 28 locality pages and 10 hospital pages now go to a hub, which Google may treat as a weaker match, so rankings for searches like "ambulance in Ameerpet" may fall.
- 15 blog posts are gone, including first-aid topics such as stroke and heart attack signs. These redirect to the closest service page, which does not answer the same question, so that traffic may be lost.
- The homepage now targets outstation searches rather than "emergency ambulance Hyderabad". Emergency searches now rely mostly on `/services/emergency-ambulance`.
- Before cutover, check Search Console for which of these old pages actually earn clicks. Rebuild any that do, with content specific to that page.

**Cutover checklist**

1. Export any past leads, bookings or reviews you want to keep from the old admin panel. It will stop working at cutover, and no replacement is planned.
2. Complete the Cashfree sandbox test and dashboard changes (section 8).
3. Back up the current site and its deployment settings, so you can roll back.
4. Export Search Console's top pages and keep the current sitemap as a record.
5. Finish legal review. The current policy pages are indexed, and the drafts here are noindex, so publishing unreviewed would remove them from Google.
6. Deploy to Render from `render.yaml` (steps in the README). This first deploy uses its `onrender.com` address, stays noindex and does not touch the live site.
7. Configure form delivery in Render's Environment tab, and send a real test on the `onrender.com` address.
8. Switch over at a quiet time with someone watching the phone line: set `SITE_URL=https://bestambulance.in`, rebuild, add the custom domain, then change DNS. Then test calls, WhatsApp, forms and redirects on the live domain.
9. Resubmit the sitemap in Search Console, and watch coverage and 404s for several weeks.

**Also still open**

- Old image URLs (`/images/...`, `/brand/...`) are not redirected, so old image search results will break. This is minor.
- The logo is a simple original mark. Replace it if the business wants its own; it was not reused, as instructed.
- Photos are phone-quality and real. A short professional shoot would lift the brand more than anything else on this list.

## 10. Test results

All on the production build, run locally.

| Test | Result |
| --- | --- |
| Crawl and SEO audit (61 pages) | 0 issues |
| Layout sweep: 64 pages at 320, 375, 768, 1024, 1440 px (320 checks) | 0 horizontal overflow, 0 broken eager images, 0 tap targets under 40 px at 375 px (text links in paragraphs excluded) |
| axe WCAG 2.1 A/AA and best practice (64 pages, desktop width) | 0 violations |
| Lighthouse mobile (4 pages) | Performance 97–100; accessibility, best practices, SEO all 100; LCP 1.7–2.3 s; CLS 0; TBT 0 ms |
| Lighthouse desktop (4 pages) | All 100; LCP 0.4–0.5 s |
| Page weight | 138–204 KiB |
| Console and network on those 4 pages | 0 errors, 0 failed requests |
| API: valid, invalid, no channel, webhook failure, honeypot, cross-origin, no-JS, proxied, wrong method, rate limit | All as designed |
| Malformed Host header | Server stays up |
| Payment API against a local mock of Cashfree: 38 checks (validation, no keys, gateway down, forged or altered webhooks, one notice per payment, retry on notice failure, no customer data in status, no secrets in browser files) | 38 passed |
| Payment browser flows, with Cashfree's checkout stubbed: errors, prefill, loading, handoff, checkout error; paid, pending, failed and unknown status screens | Pass |
| Cashfree's real script from its CDN | Loads and exposes `checkout`. Not run with a real session |
| `/pay`, status, `/book`, `/terms`, `/privacy-policy` at 5 widths, axe at one | 0 overflow, 0 violations |
| Old URLs after payment work | 126 of 126 still work |
| Keyboard: skip link, menu open with Enter, Escape closes and returns focus | Pass |
| Visual review | Desktop 1366 px: home sections, route, service, legal, footer, menu. Mobile 375 px: home, route, menu, form states, footer, service |

**Limits of this testing**

- Lighthouse numbers are local, with no real network or CDN. They are not field data.
- Tested in Chromium only. **No real phones, Safari or Firefox.**
- Reduced-motion rules are present in the CSS, but were not observed with the setting on.
- Tablet widths were covered by the automated layout sweep, not visual review.
- No screen reader test.

## 11. Legal and medical content needing review

- **All 6 legal pages** show `DRAFT - BUSINESS REVIEW REQUIRED`, highlight `[CONFIRM]` items, and are noindex. Needed: legal entity, jurisdiction, liability clause, refund timeframe, cancellation windows, data retention, processors, and a grievance contact under India's DPDP Act 2023. Please have a lawyer review them.
- **Guides and service pages** contain general health information. Ask a qualified clinician to review them, especially the oxygen guide and the fitness-to-travel wording, and then add the reviewer's name. YMYL pages benefit from this.
- **Operational claims** such as crew training, paramedics on board, pre-shift checks, free freezer box delivery and the 15–20 minute response are the business's own published statements. They were **not independently verified**. No licence or regulatory compliance is claimed anywhere.

## 12. Recommended next steps

1. Export anything needed from the old admin panel, and run the Cashfree sandbox test (sections 0 and 8).
2. Connect form delivery and send a real test to the coordinators' phone or inbox.
3. Business confirms section 7 and the vehicle branding.
4. Legal and clinical review, then flip the legal pages to indexable.
5. Follow the cutover checklist in section 9. After launch on HTTPS, submit the sitemap to Search Console and Bing, run the Rich Results Test and PageSpeed, and test on a real Android phone and iPhone.
6. Link the Google Business Profile and add real coordinates to the schema.
7. Add real reviews with permission, and consider published price ranges, since searchers look for them.
8. Add Pune and other routes only as the business confirms them, and only with something specific to say.
