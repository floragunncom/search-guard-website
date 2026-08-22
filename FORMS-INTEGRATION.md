# Forms Integration Guide

How the Search Guard website's **contact** and **newsletter** forms are processed
by Cloudflare Pages Functions, and how to configure, run, and debug them.

This replaces the previous AWS Lambda / API Gateway backend
(`56dmarth25.execute-api…` for contact, `45xbqthu4l.execute-api…` for
newsletter). **The AWS Lambdas and their AWS SSM parameters are obsolete** — the
source of truth for secrets is now Cloudflare Pages (production) and a local
`.dev.vars` file (development). The old code is kept for reference only under
`old_aws_functions/`.

## Overview

There are exactly **two** forms, each backed by one Pages Function:

| Form | Endpoint | Function | Frontend components |
|------|----------|----------|---------------------|
| Contact | `POST /api/contact` | `functions/api/contact.js` | `ContactForm`, `ContactFormSuperSlim`, `ContactFormSuperSlimOnly`, `ContactFormSuperSlimOnlyNoNL` |
| Newsletter | `POST /api/newsletter` | `functions/api/newsletter.js` | `Email/Email.js` (in `PreFooter`) |

Both endpoints are defined once in `src/config/apiEndpoints.js` (overridable via
`NEXT_PUBLIC_CONTACT_API_URL` / `NEXT_PUBLIC_NEWSLETTER_API_URL`). They are
same-origin relative paths, so no CORS is involved in production.

All integrations run in parallel via `Promise.allSettled`, so one failing
integration never blocks the others — the response reports per-integration
status and the endpoint still returns HTTP 200.

## Architecture

```
User submits form
      |
      v
Cloudflare Pages Function  (/api/contact  or  /api/newsletter)
      |
      +-- Matrix        (room notification)
      +-- SendGrid mail (contact only: welcome email to filler+partners, plus guaranteed sales@ copy)
      +-- SendGrid list (add contact / subscribe)
      +-- Zoho CRM      (contact only: create/dedup Contact + Account, link, add Note)
      |
      v
JSON response { success, message, details: { matrix, email, list, crm } }
```

Shared helpers live in `functions/lib/`: `sendgrid.js`, `zoho.js`, `matrix.js`,
`logger.js`.

## Field contracts

### Contact (`/api/contact`) — snake_case

| Field | Required | Notes |
|-------|----------|-------|
| `first_name` | ✅ | |
| `last_name` | ✅ | |
| `email` | ✅ | validated; `gmail.com` is rejected as spam (see below) |
| `company` | ✅ | |
| `message` | ✅ | |
| `job_position` | optional | → Zoho `Title` |
| `phone` | optional | → Zoho `Phone` |
| `country` | optional | drives email routing + Zoho `Mailing_Country` (Contact) & `Billing_Country` (Account) |
| `newsletter` | optional | opt-in checkbox; submitted as `"on"` (or boolean) |

### Newsletter (`/api/newsletter`)

| Field | Required | Notes |
|-------|----------|-------|
| `email` | ✅ | validated |
| `ids` | ✅ | SendGrid marketing list id(s); single value or array |

## Emails sent

The two forms behave very differently — be clear about who receives what.

### Contact form (`/api/contact`)

Sends the country-routed welcome email via SendGrid (`sendContactWelcomeEmail`)
as **two separate Mail Send requests** (built by `buildContactWelcomePayloads`):

1. **Form-filler copy** — **To:** the requestor (the `email` they submitted);
   **BCC:** the country-specific partner(s) only (e.g.
   `exceleratesystems@pipedrivemail.com`; France also adds
   `iquackenbos@search-guard.com`). Normal, compliant handling (suppression lists
   respected; unsubscribe untouched).
2. **Guaranteed sales@ copy** — **To:** `sales@floragunn.com`, a dedicated request
   that **bypasses all SendGrid suppression lists** and carries **no unsubscribe
   mechanism** (`mail_settings.bypass_list_management.enable = true`,
   `tracking_settings.subscription_tracking.enable = false`, no `asm`, no
   `List-Unsubscribe` header). This guarantees the internal sales team always
   receives the lead even if `sales@` ever landed on a suppression list.

Both use the same `from` ("The Search Guard Team" &lt;sales@floragunn.com&gt;),
country-routed template, and `dynamic_template_data`. **Why split:**
`bypass_list_management` and `subscription_tracking` are request-level in the v3
Mail Send API — they can't be scoped to just the BCC — so sales@ gets its own
request to keep the bypass away from the requestor and partners. The guarantee is
applied by `applyGuaranteedDelivery(payload)`, which triggers on any payload whose
to/cc/bcc includes `sales@floragunn.com` (a no-op otherwise). Both requests are
sent with `Promise.allSettled`; if either fails the function throws so
`details.email` reflects it.

> **Template caveat (item 4):** the `[unsubscribe]` tag, if present, would live
> inside the SendGrid **dynamic template** (`d-…`), not in this payload. The code
> adds none — but verify the templates in the SendGrid UI to be fully certain.

Adding the contact to the SendGrid marketing list does **not** itself send an
email (unless a double opt-in / welcome automation is configured on the list in
SendGrid).

### Newsletter form (`/api/newsletter`)

Sends **no email** from this code. It only:

- subscribes the address to the given SendGrid marketing list(s), and
- posts a Matrix room notification.

Any welcome/confirmation email to the subscriber would come from SendGrid-side
list automation (double opt-in), not from this function.

### At a glance

| | Email to requestor | Email to sales/partners | Non-email notice |
|---|---|---|---|
| Contact | ✅ thank-you email (partners BCC'd) | ✅ dedicated guaranteed copy to sales@ | Matrix room message |
| Newsletter | ❌ none | ❌ none | Matrix room message |

## Integrations

### Matrix
Posts an HTML notice to the configured room. Never hard-fails. Config:
`MATRIX_SERVER_URL`, `MATRIX_ROOM_ID`, `MATRIX_TOKEN`.

### SendGrid — two keys (matches the old Lambda)
- **`SENDGRID_SENDMAIL_KEY`** — "Mail Send" scope; sends the contact welcome email.
- **`SENDGRID_MARKETING_KEY`** — "Marketing" scope; adds contacts to lists /
  subscribes newsletter emails.

A single key does **not** work: mail send and marketing are separate SendGrid
scopes, and the project's keys are scoped individually.

**Country-routed welcome email** (`functions/lib/sendgrid.js`): the contact form
selects a dynamic template and partner BCC list based on the `country` form
field (mapped to an ISO code via `countryNameToCode`). Sender is
`sales@floragunn.com` / "The Search Guard Team". Template IDs and BCC routing are
ported verbatim from the old Lambda:

| Country group | Template | BCC (besides sales@floragunn.com) |
|---------------|----------|-----------------------------------|
| DE | `d-facb4519…` | exceleratesystems@pipedrivemail.com |
| AT, CH | `d-b7e911a6…` | exceleratesystems@pipedrivemail.com |
| FR (+FR territories) | `d-e377e3d2…` | exceleratesystems@…, iquackenbos@search-guard.com |
| US, UM, CA | `d-bfdb550d…` | exceleratesystems@… |
| Latin America (MX, BR, AR, …) | `d-88b2734f…` | exceleratesystems@… |
| GB, UK | `d-f57641b0…` | exceleratesystems@… |
| RU | `d-849d4d53…` | exceleratesystems@… (note: RU is spam-blocked upstream) |
| default / everything else | `d-74bd1335…` | exceleratesystems@… |

> Note: `CF-IPCountry` is only present on real Cloudflare traffic, so country
> routing is exercised via the `country` **form field**, not the header. Locally
> (`wrangler pages dev`) the header is absent.

### Zoho CRM (contact only)
US data center (`ZOHO_DC=US`). The function refreshes its own access token, then
**deduplicates**: it searches for an existing Contact by email and Account by
name, reuses them if found, otherwise creates them, and links the Contact to the
Account. Field mapping:

| Submitted field | Zoho field |
|-----------------|-----------|
| `first_name` | Contact `First_Name` (create only) |
| `last_name` | Contact `Last_Name` (create only) |
| `email` | Contact `Email` |
| `job_position` | Contact `Title` |
| `phone` | Contact `Phone` |
| `country` | Contact `Mailing_Country` **and** Account `Billing_Country` |
| `newsletter` (opt-in) | Contact `Newsletter` (boolean, create only) |
| `company` | Account `Account_Name` (+ Contact↔Account link) |
| `message` | **Note** attached to the Contact (see below) |

**Existing records are backfilled, never overwritten.** New records get the full
mapping (all fields start empty). When a submission is deduplicated onto an
existing record, the code fills only the fields that are **currently empty** and
never changes a value that already exists:

- Existing **Contact** (`updateContact`): backfills `Phone`, `Title`,
  `Mailing_Country` only where blank. `First_Name`/`Last_Name` and `Newsletter`
  are never touched — a web form must not clobber curated names or silently
  revoke a newsletter opt-in.
- Existing **Account** (`updateAccount`): backfills `Billing_Country` only if the
  account has none. An account is company-level data shared across contacts, so
  a single submitter never overwrites a curated billing country.

This holds across all four new/existing combinations of Contact × Account. (The
backfill reads the existing record returned by the search; on the rare case
where the search misses but Zoho reports a duplicate on create, the record is
re-fetched so the backfill still sees current values.)

**Message as a Note:** the message is stored as a Zoho **Note** on the contact
(`addNoteToContact`), not a record field. This runs for both newly created and
pre-existing (deduplicated) contacts, so every inquiry is preserved. The note
body also includes company/country/phone/job-title/newsletter context.

We intentionally do **not** set `Lead_Source`, `Account_Source`, `Tag`, or
`trigger: ['workflow']` (those were speculative additions in the boilerplate;
unknown Zoho picklist/tag values are silently dropped, and workflow triggers can
fire unintended automation). Record creation uses `trigger: []`.

> The `Newsletter` field is a **custom** field on the Contacts layout — it must
> exist in the Zoho org or that write is silently ignored.

### Spam handling (contact only)
Ported from the old Lambda and evaluated **before anything else runs**. If a
submission matches any rule below, the function returns HTTP `400` with a
deliberately cryptic body (`"INVALID FORMAT 0x7c"`, or `0x7d` on a malformed
request) and **no integrations fire** — no email is sent, no CRM record is
created, no list add, no Matrix notice.

Rejection rules:
- `CF-IPCountry` header == `RU` (present only on real Cloudflare traffic, not local dev)
- `first_name` or `last_name` contains `:` or `http`
- `message` contains `www.gclnk.com`
- `email` contains `gmail.com`

The cryptic error text is intentional — it gives bots no useful signal about why
they were blocked. The **newsletter** endpoint has no spam filter; it only
validates the email format and that at least one list id is present.

## Environment variables

Set these as **Cloudflare Pages secrets** (production) and in local `.dev.vars`.
`ENVIRONMENT` is provided via `wrangler.toml [vars]`, not as a secret.

| Variable | Purpose |
|----------|---------|
| `ENVIRONMENT` | `migration` = DEBUG logging; `production` = INFO (see `functions/lib/logger.js`) |
| `SENDGRID_SENDMAIL_KEY` | SendGrid key, Mail Send scope |
| `SENDGRID_MARKETING_KEY` | SendGrid key, Marketing scope |
| `SENDGRID_CONTACT_LIST_ID` | Marketing list the contact form subscribes to |
| `MATRIX_SERVER_URL` | e.g. `https://matrix.eliatra.com` |
| `MATRIX_ROOM_ID` | e.g. `!cDItuVWiwhqITUADtb:eliatra.com` |
| `MATRIX_TOKEN` | Matrix access token |
| `ZOHO_DC` | Data center: `US` (default) \| `EU` \| `IN` \| `AU` \| `JP` |
| `ZOHO_CLIENT_ID` | Zoho OAuth client id |
| `ZOHO_CLIENT_SECRET` | Zoho OAuth client secret |
| `ZOHO_REFRESH_TOKEN` | Zoho refresh token (scope `ZohoCRM.modules.ALL`) |

`.dev.vars.example` documents the full set. `.dev.vars` is git-ignored.

## Local development / debugging

`next dev` does **not** run the Pages Functions — use Cloudflare's local runtime:

```bash
# 1. Provide secrets (choose one):
cp .dev.vars.example .dev.vars   # then fill in real values
#   -- or, legacy one-off seed from AWS SSM (SSM is obsolete; Zoho creds there
#      are stale — you'll still need to supply fresh Zoho values manually):
./scripts/pull-dev-secrets.sh

# 2. Build the static site once (Functions are auto-discovered from functions/)
npm run build-local && rm -rf dist && mv out dist

# 3. Run the local Pages runtime (serves site + functions at :8788)
npx wrangler pages dev
```

Fastest iteration is curl against the endpoints (functions hot-reload on save):

```bash
curl -i -X POST http://localhost:8788/api/newsletter \
  -H 'content-type: application/json' \
  -d '{"email":"you@example.com","ids":["<list-id>"]}'

curl -i -X POST http://localhost:8788/api/contact \
  -H 'content-type: application/json' \
  -d '{"first_name":"A","last_name":"B","email":"you@example.com",
       "company":"Acme","country":"Germany","message":"hi"}'
```

Do **not** test with a `@gmail.com` address (spam-blocked). Read the DEBUG logs in
the wrangler terminal and the `details` object in the response to see which
integration failed and why.

To validate Zoho creds without side effects (no email, no CRM write):

```bash
curl -s -X POST "https://accounts.zoho.com/oauth/v2/token" \
  --data-urlencode "refresh_token=$RT" --data-urlencode "client_id=$CI" \
  --data-urlencode "client_secret=$CS" --data-urlencode "grant_type=refresh_token"
# ok => access_token + scope; invalid_client => client id/secret wrong;
# invalid_code => refresh token wrong
```

## Production secrets & deploy

- **Project:** `search-guard-website`. **Production branch:** `cloudflare-migration`
  (so the CLI's production-scoped secret store is the one in use).
- Upload/refresh secrets in bulk from a KEY=VALUE file (e.g. a filtered `.dev.vars`):

  ```bash
  npx wrangler pages secret bulk <file> --project-name search-guard-website
  npx wrangler pages secret list --project-name search-guard-website
  ```

  `wrangler pages secret` writes to the **production** environment only; preview
  secrets must be set in the Cloudflare dashboard.
- Secrets apply on the **next deploy** — existing deployments are not
  retroactively updated.
- Deploy is via `.gitlab-ci.yml` (`wrangler pages deploy dist --project-name …`).

## Troubleshooting (issues actually seen during migration)

| Symptom | Cause / fix |
|---------|-------------|
| `email: failed`, SendGrid `401 "not authorized to send mail"` | The key lacks Mail Send scope. `SENDGRID_SENDMAIL_KEY` must have Mail Send; `SENDGRID_MARKETING_KEY` must have Marketing. |
| `crm: failed`, Zoho `invalid_client` (all DCs) | `client_id`/`client_secret` pair rejected — stale/wrong. Copy both together from the same Self Client; regenerate the secret if unsure. |
| Zoho `invalid_code` | Client is valid but the refresh token is wrong / from a different client. Mint a new refresh token from that client. |
| Zoho `OAUTH_SCOPE_MISMATCH` (401 on CRM calls) | Refresh token has the wrong scope (e.g. ZohoInvoice). Regenerate the grant code with `ZohoCRM.modules.ALL`. |
| Zoho `INVALID_QUERY` (400) on search | A value with `(` `)` `,` `:` breaks the search criteria. Handled by `sanitizeCriteriaValue()` in `zoho.js` — searches are sanitized; records still store the original value. |
| `Newsletter` value not saved in Zoho | The custom `Newsletter` field is missing from the Contacts layout. |
| Country routing always default locally | `CF-IPCountry` is absent under `wrangler pages dev`; routing uses the `country` form field regardless. |

## Reference

- Old AWS implementations (parity reference): `old_aws_functions/`
- SendGrid API: https://www.twilio.com/docs/sendgrid/api-reference
- Zoho CRM API v3: https://www.zoho.com/crm/developer/docs/api/v3/
- Cloudflare Pages Functions: https://developers.cloudflare.com/pages/functions/
- Wrangler: https://developers.cloudflare.com/workers/wrangler/
