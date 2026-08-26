# Cloudflare Architecture — Pages Hosting Model

Date: 2026-08-17

Plan: **Cloudflare Pro** (zone) + **Cloudflare Pages** (hosting)

Assumption: the website is **fully hosted on Cloudflare Pages** and the AWS Lambda form
backend is **replaced by Cloudflare Pages Functions**. This is the architecture being built
on the `cloudflare-migration` / `15-add-turnstile` branches; production `search-guard.com`
still runs the legacy stack (SFTP/nginx origin) until cutover.

Measured from outside the network against:
- Staging (Pages): `https://search-guard-website.pages.dev/`
- Production (legacy): `https://search-guard.com/`

Related docs: [`PERFORMANCE.md`](PERFORMANCE.md), [`SEO.md`](SEO.md), [`CLAUDE.md`](CLAUDE.md)
(note: `CLAUDE.md` §1/§10 on this branch still describe the legacy SFTP deployment).

---

## Executive Summary

Moving from the SFTP/nginx origin to Cloudflare Pages **dissolves most of the previous
edge-layer problems by construction** rather than by configuration:

- There is **no origin server anymore**. Pages serves every file from Cloudflare's network,
  so the entire "cache HTML at the edge" problem class (previously >1.2 s of mobile TTFB)
  disappears. No cache rules, no tiered cache, no post-deploy purges needed.
- Measured on staging today: **HTTP 103 Early Hints + 200**, **Brotli** encoding, HTTP/3,
  correct **404** for unknown routes, `_headers` security/cache headers applied, `_redirects`
  legacy 301s working. All of this required manual fixing on the legacy stack.
- The form backend moves **same-origin** (`/api/contact`, `/api/newsletter`), which makes
  Cloudflare security products applicable to form traffic for the first time — and Turnstile
  provides the actual bot protection at application level.

What still needs deliberate work:

1. **The zone-level bot challenge that 403-blocks HTML on production must be resolved before
   cutover** — Pages behind a custom domain still sits behind the zone's WAF/bot products,
   so the problem would carry over to the new stack unchanged.
2. **Turnstile is not yet merged**: it exists only on `15-add-turnstile`. The staging
   deployment currently accepts tokenless form POSTs (verified 2026-08-06).
3. **Cutover mechanics**: custom domain attach, env vars, DNS, CI cleanup.

---

## Deployment Model (target)

- Build: Next.js static export → `out/` (renamed `dist/` in CI), built in **GitLab CI**
  (`npm run build`), not by Cloudflare.
- Deploy: `wrangler pages deploy dist --project-name=search-guard-website
  --branch=cloudflare-migration` — a **direct-upload** Pages project. Cloudflare has no Git
  integration; nothing deploys unless the GitLab job runs.
- Functions: the repo-root `functions/` directory is compiled by wrangler into a single
  Worker deployed atomically with the static files.
- Edge config as code: `public/_headers` (security + browser-cache headers) and
  `public/_redirects` (~130 legacy 301s, `/blog/page/1/` canonicalization) ship with every
  deploy.
- `wrangler.toml`: project name + `pages_build_output_dir` only; all secrets live in the
  Pages project settings (dashboard), not in the repo.

### Branch → deployment mapping

| Branch | Effect |
|---|---|
| `cloudflare-migration` | Deploys as the Pages project's **production** deployment → `search-guard-website.pages.dev` |
| `15-add-turnstile` | Temporarily also deploys to the same URL (same `--branch` flag) |
| `master` | Legacy pipeline: SFTP to nginx + zone cache purge (unchanged until cutover) |

⚠️ Both migration branches write to the **same URL — last pipeline wins**. This has already
caused a confusing rollback-like incident (2026-08-06: a `cloudflare-migration` deploy
silently replaced the Turnstile deployment). Merge `15-add-turnstile` into
`cloudflare-migration` and drop the temporary rule as soon as practical.

Known cosmetic CI bug: the job echoes
`https://<commit-sha-8>.search-guard-website.pages.dev` as "Deployment URL", but
direct-upload deployments get a random hash, not the commit SHA. The real URL is in
wrangler's own output line.

---

## What Pages Makes Obsolete (from the previous edge analysis)

The prior version of this document prescribed an 8-step plan against the SFTP origin.
Status under Pages:

| Previous step | Status on Pages |
|---|---|
| Cache HTML at the edge (cache rule) | **Obsolete** — no origin; Pages serves from Cloudflare's network |
| Smart Tiered Cache | **Obsolete** — no origin to shield |
| Brotli | **Done automatically** — verified `content-encoding: br` on staging |
| Early Hints | **Done automatically** — verified `HTTP/2 103` on staging |
| Origin nginx cache headers | **Replaced** by `public/_headers` — verified applied |
| Post-deploy zone cache purge | **Unnecessary** for Pages (deploys are atomic). Remove the CI purge job at cutover unless zone-level cache rules are added for the custom domain |
| Stop challenging HTML (bot products) | **Still required** — zone products front the custom domain regardless of hosting; see below |
| Rocket Loader off | **Still required** — zone setting, applies to the custom domain |

Field-data baseline from the legacy stack (CrUX p75, 2026-08-17): mobile LCP **3099 ms**
(fail), TTFB **1671 ms** (fail); desktop passing throughout. TTFB was dominated by origin
round trips + the bot-challenge JS (measured at 3085 ms main-thread, 82% of page JS). Both
causes are structurally absent on Pages — expect mobile TTFB in the desktop range
(~200–400 ms) after cutover, pending the zone fix below. CrUX is a 28-day rolling window;
field confirmation lags ~a month after cutover.

---

## Functions Layer (replaces AWS Lambda)

Three endpoints under `functions/api/`, sharing `functions/lib/{sendgrid,zoho,matrix,logger}.js`
(+ `turnstile.js` on the Turnstile branch):

### `POST /api/contact`
Replaces the `sg-contact-form` Lambda. Validates required fields, then runs **four
integrations in parallel** via `Promise.allSettled` (one failing never blocks the others):
1. Matrix room notification
2. SendGrid welcome email — country-routed template + partner BCCs (`SENDGRID_SENDMAIL_KEY`)
3. SendGrid marketing-list add (`SENDGRID_MARKETING_KEY`, `SENDGRID_CONTACT_LIST_ID`)
4. Zoho CRM: OAuth refresh → dedupe-or-create contact + account → link → attach message
   as a Note (`ZOHO_*` vars; `ZOHO_DC` selects the data center)

Always returns 200 with per-integration status in `details`; the visitor is never shown a
failure. **No retry/queue**: if e.g. Zoho is down, that lead is never written to the CRM —
the Matrix notification and sales@ BCC are the recovery source.

### `POST /api/newsletter`
Replaces the `sg-newsletter-signup` Lambda. SendGrid list subscribe + Matrix notification,
same allSettled/200 pattern. List IDs come from the client payload.

### `POST /api/uptime`
New (no Lambda predecessor). Uptime Kuma webhook → Matrix (`UPTIME_MATRIX_ROOM_ID`, falls
back to `MATRIX_ROOM_ID`) + email via SendGrid (`UPTIME_*` vars). Authenticated by a shared
secret in the `X-Webhook-Token` header (constant-time compare).

### Spam protection — Turnstile (branch `15-add-turnstile`, ⚠️ not yet merged)
- Widget rendered in all four contact-form components + the PreFooter newsletter form;
  site key hardcoded in `src/config/turnstile.js` (public by design;
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY` overrides at build time).
- Server-side: `functions/lib/turnstile.js` verifies `cf-turnstile-response` against
  `/siteverify` (`TURNSTILE_SECRET_KEY`), **fail-closed**, before any integration runs.
  Rejections reuse the legacy cryptic convention: `"INVALID FORMAT 0x7c"` (failed/missing
  token), `0x7d` (server-side problem).
- Replaces the old heuristic spam filter (RU geo, gmail.com block, URL-in-name checks).
- **Until merged, the deployed staging functions accept tokenless POSTs** (verified: direct
  curl without token → 200, all integrations fired).

### Failure alerting (same branch)
After `allSettled`, any failed integration triggers a ⚠️ alert message into the same Matrix
room, listing each failed step and its error — the compensation for Pages Functions having
**no persistent logs** (real-time tail only: deployment → Functions → log stream, or
`wrangler pages deployment tail`). Logger runs DEBUG on `*.pages.dev`, INFO on
`search-guard.com` / `ENVIRONMENT=production`.

### Environment variables (Pages project settings; local: `.dev.vars`)
`SENDGRID_SENDMAIL_KEY`, `SENDGRID_MARKETING_KEY`, `SENDGRID_CONTACT_LIST_ID`,
`MATRIX_SERVER_URL`, `MATRIX_ROOM_ID`, `MATRIX_TOKEN`, `ZOHO_DC`, `ZOHO_CLIENT_ID`,
`ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`, `TURNSTILE_SECRET_KEY` (Turnstile branch),
`UPTIME_WEBHOOK_TOKEN`, `UPTIME_MATRIX_ROOM_ID`, `UPTIME_FROM_EMAIL`, `UPTIME_FROM_NAME`,
`ENVIRONMENT`. Set for **Production** (and Preview if previews should work); changes apply
only to the **next** deployment.

---

## Zone-Level Security (applies to the custom domain after cutover)

Requests to `search-guard.com` traverse the zone's security pipeline **before** reaching
Pages. Two consequences:

### 1. The HTML-blocking challenge must be fixed — it would survive the migration
Production today: `GET /` → **403 "Attention Required"**, `no-store`, even with full browser
headers (re-verified 2026-08-17, unchanged since the original analysis). The associated
JS-detection script costs real browsers ~3 s of main-thread time. Pointing the domain at
Pages does not change this; the zone fires first.

Diagnose via **Security → Events** (Action = Block, read the Service column), then apply the
matching fix — first candidate: **Security → Bots → JavaScript Detections → off**; then
Super Bot Fight Mode categories → Allow/Managed Challenge. Full decision table in the git
history of this file (pre-Pages revision).

### 2. Same-origin `/api/*` makes scoped protection possible — and worth having
With forms POSTing to the zone (instead of cross-origin to AWS, which no Cloudflare rule
could ever see), defense-in-depth on top of Turnstile becomes available:

```
# Security → WAF → Rate limiting rules
Expression:  (starts_with(http.request.uri.path, "/api/") and http.request.method eq "POST")
Rate:        5 requests / 1 minute per IP
Action:      Block, 1 minute timeout
```

```
# Optional: Security → WAF → Custom rules — keep bot products away from static pages
Name:        Skip bot protection for static pages
Expression:  (not starts_with(http.request.uri.path, "/api/"))
Action:      Skip → Super Bot Fight Mode
```

Do **not** put a Managed Challenge on `/api/*`: the endpoints are consumed via `fetch()`
from the site's own JS, which cannot answer an interactive challenge — Turnstile fills that
role at the application level.

---

## Measured Evidence (2026-08-17)

### Staging — Pages (`search-guard-website.pages.dev`)

| Probe | Result |
|---|---|
| `GET /` | `HTTP/2 103` (Early Hints) → `200`; `cache-control: public, max-age=0, must-revalidate`; HSTS + `X-Frame-Options` from `_headers`; HTTP/3 advertised |
| `/_next/static/chunks/framework-*.js` | `200`, `max-age=2592000` (from `_headers`), **`content-encoding: br`**, ETag |
| Unknown route | **`404`** (custom 404 page, correct status — a legacy-stack config concern, automatic here) |
| `/kibana-tenants` (legacy URL) | **`301` → `/blog/kibana-tenants/`** via `_redirects` |
| `GET /api/contact` | `404` — expected: only `onRequestPost` is defined, other methods fall through to (nonexistent) static assets |

### Production — legacy stack (`search-guard.com`)

| Probe | Result |
|---|---|
| `GET /` (full browser headers) | **`403`** challenge page, `no-store` — unchanged; blocks HTML and sitemap for non-allowlisted crawlers |

---

## Cutover Checklist (legacy → Pages)

1. Merge `15-add-turnstile` → `cloudflare-migration`; remove the temporary dual-branch
   deploy rule from `.gitlab-ci.yml`.
2. Verify all environment variables in the Pages project (Production env), including
   `TURNSTILE_SECRET_KEY` and `ENVIRONMENT=production`.
3. Fix the zone bot-challenge configuration (see above) — verify `GET /` returns 200 to a
   browser-headered curl on the legacy stack first, so the fix is proven before it fronts
   Pages.
4. Turnstile widget: add `search-guard.com` and `www.search-guard.com` to the widget's
   allowed hostnames (keep `search-guard-website.pages.dev` for staging).
5. Attach the custom domain to the Pages project (Custom domains tab); Cloudflare adjusts
   DNS automatically since the zone is on the same account. Cover the `www` variant.
6. Smoke-test via the pages.dev URL and then the domain: home, `/contacts/` (submit a real
   test through the widget), a `_redirects` legacy URL, an unknown route (must be 404),
   `sitemap.xml`, `robots.txt`.
7. Test-fire the failure alerting once in production config (e.g. temporarily invalid
   `ZOHO_REFRESH_TOKEN` → submit → expect ⚠️ in Matrix → restore).
8. Retire legacy CI: remove SFTP deploy + cache-purge jobs; archive the nginx origin after
   a soak period.
9. Search Console: confirm sitemap reads succeed post-cutover (they may have been failing
   under the 403 regime for non-Google crawlers all along).
10. Watch CrUX (~28 days) for the mobile TTFB/LCP improvement.

---

## Verification Commands

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 \
(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

# HTML: expect 103 + 200, no challenge
curl -sI -A "$UA" https://search-guard.com/ | grep -iE "^HTTP|cache-control"

# Assets: expect br + long max-age
curl -sI -A "$UA" -H 'Accept-Encoding: gzip, br' \
  https://search-guard.com/_next/static/chunks/framework-*.js \
  | grep -iE "^HTTP|content-encoding|cache-control"

# 404 contract
curl -sI -A "$UA" https://search-guard.com/definitely-not-a-page/ | grep "^HTTP"

# Bot rejection (safe: rejected before any integration runs — requires Turnstile deployed)
curl -s -w "\n%{http_code}\n" -X POST https://search-guard.com/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"first_name":"T","last_name":"T","email":"t@example.com","company":"T","message":"t"}'
# expect: "INVALID FORMAT 0x7c" / 400
# ⚠️ Without Turnstile deployed, this fires ALL integrations (email/CRM/Matrix) — clean up after.
```

---

## Do Not

- Enable **Rocket Loader** on the zone — breaks React hydration and the consent-gated GTM
  script.
- Add zone **cache rules for HTML** on the custom domain — unnecessary on Pages and risks
  serving stale deploys; Pages handles its own invalidation.
- Put an interactive **challenge on `/api/*`** — `fetch()` clients can't solve it;
  Turnstile covers this.
- POST test submissions to `/api/contact` on a deployment **without** Turnstile — the
  request is accepted and fires real emails, CRM records, and Matrix messages.
- Rely on function logs for anything after the fact — they are real-time only; the Matrix
  failure alerts are the durable signal.

---

## Open Items / Risks

- **Turnstile unmerged** (`15-add-turnstile` → `cloudflare-migration`): staging functions
  currently accept tokenless POSTs. Highest-priority item.
- **Dual-branch deploys to one URL**: last pipeline wins; already caused one silent
  rollback. Resolved by the merge above.
- **No retry for failed integrations**: an outage of Zoho/SendGrid loses that step's data
  permanently (Matrix alert + sales@ BCC are the manual-recovery path). Acceptable for
  current volumes; revisit with Cloudflare Queues if the project ever moves to Workers.
- **Pages Functions have no persistent logs**; Cloudflare recommends Workers (with static
  assets) for new projects and ships observability improvements there first. A later
  Pages → Workers migration would gain persistent Workers Logs with minimal code change —
  not urgent.
- **CI "Deployment URL" echo is wrong** (commit SHA vs. actual deployment hash) — cosmetic.
