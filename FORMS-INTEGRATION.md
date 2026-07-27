# Forms Integration Guide

This document explains how to set up the contact and demo request forms with SendGrid and Zoho CRM integration using Cloudflare Pages Functions.

## Overview

When a user submits a contact or demo request form, the following happens automatically:

1. **SendGrid Email**: A thank you email is sent to the user (with BCCs to your team)
2. **SendGrid List**: The contact is added to a specific email list for marketing
3. **Zoho CRM**: A contact and account are created in Zoho CRM with tags for segmentation

All integrations run in parallel for optimal performance using serverless Cloudflare Functions.

## Architecture

```
User submits form
    |
    v
Cloudflare Pages Function (/api/contact or /api/demo)
    |
    +-- SendGrid API (send email)
    |
    +-- SendGrid API (add to list)
    |
    +-- Zoho CRM API (create contact & account)
    |
    v
Response to user
```

## Prerequisites

1. **SendGrid Account** with:
   - API key with Mail Send and Marketing permissions
   - At least one marketing list created

2. **Zoho CRM Account** with:
   - OAuth client credentials
   - Refresh token for API access

3. **Cloudflare Pages** deployment (already configured)

## Step 1: SendGrid Setup

### 1.1 Create API Key

1. Log in to [SendGrid Dashboard](https://app.sendgrid.com)
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Name: `Coretex Axiom Website`
5. Permissions: **Restricted Access**
   - **Mail Send**: Full Access
   - **Marketing**: Full Access (for lists)
6. Click **Create & View**
7. **Copy the API key immediately** (you won't see it again!)

### 1.2 Create Marketing Lists

1. Go to **Marketing** → **Contacts**
2. Click **Create List**
3. Create two lists:
   - **Contact Form Submissions**
   - **Demo Requests**
4. Copy the List IDs:
   - Click on each list
   - The ID is in the URL: `.../lists/{list-id}/...`

### 1.3 Create Dynamic Templates

The website uses SendGrid Dynamic Templates with multi-language support. You need to create 4 templates (2 forms × 2 languages):

#### Contact Form Templates

1. Go to **Email API** → **Dynamic Templates**
2. Click **Create a Dynamic Template**
3. Name: `Contact Form - English`
4. Click **Add Version** → **Blank Template** → **Code Editor**
5. Design your email template with these available variables:
   ```handlebars
   {{firstName}}   <!-- First name -->
   {{lastName}}    <!-- Last name -->
   {{topic}}       <!-- Contact topic (sales, support, etc.) -->
   {{message}}     <!-- User's message -->
   {{language}}    <!-- Language code (en/de) -->
   ```
6. Save and copy the **Template ID** (starts with `d-`)
7. Repeat for `Contact Form - German` with German content

#### Demo Request Templates

1. Create another Dynamic Template
2. Name: `Demo Request - English`
3. Design your email template with these available variables:
   ```handlebars
   {{firstName}}   <!-- First name -->
   {{lastName}}    <!-- Last name -->
   {{company}}     <!-- Company name -->
   {{jobTitle}}    <!-- Job title -->
   {{industry}}    <!-- Industry -->
   {{companySize}} <!-- Company size -->
   {{message}}     <!-- Optional message -->
   {{language}}    <!-- Language code (en/de) -->
   ```
4. Save and copy the **Template ID**
5. Repeat for `Demo Request - German` with German content

**Language Detection**: The system automatically detects the user's language from:
1. Explicit `language` field in form data (if provided)
2. Referer URL path (e.g., `/en/contact` → English, `/de/contact` → German)
3. Defaults to English if no language detected

### 1.4 Set Up Sender Email

1. Go to **Settings** → **Sender Authentication**
2. Verify your domain or single sender email
3. Use `noreply@coretex-axiom.com` as sender (update in `functions/lib/sendgrid.js` if different)

## Step 2: Zoho CRM Setup

### 2.1 Create OAuth Client

1. Log in to [Zoho API Console](https://api-console.zoho.eu) (use .eu for European data center)
2. Click **Add Client**
3. Choose **Server-based Applications**
4. Fill in details:
   - **Client Name**: Coretex Axiom Website
   - **Homepage URL**: `https://coretex-axiom.pages.dev`
   - **Authorized Redirect URIs**: `https://coretex-axiom.pages.dev/callback`
5. Click **Create**
6. Copy **Client ID** and **Client Secret**

### 2.2 Generate Refresh Token

To get a long-lived refresh token:

1. Build authorization URL (replace placeholders):
   ```
   https://accounts.zoho.eu/oauth/v2/auth?
     scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&
     client_id={CLIENT_ID}&
     response_type=code&
     access_type=offline&
     redirect_uri=https://coretex-axiom.pages.dev/callback
   ```

2. Open this URL in a browser
3. Authorize the application
4. Copy the **authorization code** from the redirect URL

5. Exchange code for refresh token (use curl or Postman):
   ```bash
   curl -X POST "https://accounts.zoho.eu/oauth/v2/token" \
     -d "code={AUTHORIZATION_CODE}" \
     -d "client_id={CLIENT_ID}" \
     -d "client_secret={CLIENT_SECRET}" \
     -d "redirect_uri=https://coretex-axiom.pages.dev/callback" \
     -d "grant_type=authorization_code"
   ```

6. Save the **refresh_token** from the response (this never expires)

### 2.3 Configure CRM Fields (Optional)

To use custom fields:

1. Go to **Settings** → **Customization** → **Modules and Fields**
2. Select **Contacts** or **Accounts**
3. Add any custom fields you need
4. Update the field API names in `functions/lib/zoho.js`

## Step 3: Cloudflare Environment Variables

### 3.1 Set Environment Variables in Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select **Pages** → **coretex-axiom**
3. Go to **Settings** → **Environment variables**
4. Add **Production** variables:

#### SendGrid Variables

| Variable Name | Value | Type |
|---------------|-------|------|
| `SENDGRID_API_KEY` | Your SendGrid API key | Encrypted |
| `SENDGRID_BCC_EMAILS` | `sales@eliatra.com,info@eliatra.com` | Plain text |
| `SENDGRID_CONTACT_LIST_ID` | Your contact list ID | Plain text |
| `SENDGRID_DEMO_LIST_ID` | Your demo list ID | Plain text |
| `SENDGRID_TEMPLATE_CONTACT_EN` | Template ID for English contact form (e.g., `d-abc123...`) | Plain text |
| `SENDGRID_TEMPLATE_CONTACT_DE` | Template ID for German contact form | Plain text |
| `SENDGRID_TEMPLATE_DEMO_EN` | Template ID for English demo request | Plain text |
| `SENDGRID_TEMPLATE_DEMO_DE` | Template ID for German demo request | Plain text |

#### Zoho CRM Variables

| Variable Name | Value | Type |
|---------------|-------|------|
| `ZOHO_CLIENT_ID` | Your Zoho Client ID | Plain text |
| `ZOHO_CLIENT_SECRET` | Your Zoho Client Secret | Encrypted |
| `ZOHO_REFRESH_TOKEN` | Your Zoho refresh token | Encrypted |

### 3.2 Set Preview Environment Variables (Optional)

Repeat the same for **Preview** environments if you want forms to work on feature branches.

## Step 4: Deploy

### 4.1 Local Testing

For local development:

1. Create `.env` file (from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Add all the environment variables with real values

3. Run locally:
   ```bash
   npm run dev
   ```

4. Test forms at `http://localhost:5173`

**Note**: Cloudflare Pages Functions only work in production/preview environments, not with `vite dev`. For local testing, consider using [Wrangler](https://developers.cloudflare.com/workers/wrangler/):

```bash
npx wrangler pages dev dist
```

### 4.2 Deploy to Production

Push to the main branch:

```bash
git add .
git commit -m "Add forms integration with SendGrid and Zoho CRM"
git push origin main
```

The GitLab CI/CD pipeline will automatically deploy to Cloudflare Pages.

## Step 5: Testing

### 5.1 Test Contact Form

1. Go to `https://coretex-axiom.pages.dev/en/company/contact`
2. Fill out the form
3. Submit

**Expected Results**:
- User receives thank you email
- Contact appears in SendGrid contact list
- Contact created in Zoho CRM with "Website Lead" tag

### 5.2 Test Demo Form

1. Go to `https://coretex-axiom.pages.dev/en/demo`
2. Fill out the form with company information
3. Submit

**Expected Results**:
- User receives demo request confirmation email
- Contact appears in SendGrid demo list
- Contact AND Account created in Zoho CRM
- Both tagged with "Website Lead" and "Demo Request"

### 5.3 Check Logs

To debug issues:

1. Go to Cloudflare Dashboard → **Pages** → **coretex-axiom**
2. Click on the deployment
3. Go to **Functions** tab
4. Check **Real-time logs** for errors

## Customization

### Modify Email Templates

The website uses SendGrid Dynamic Templates for emails. To customize:

1. Go to [SendGrid Dashboard](https://app.sendgrid.com) → **Email API** → **Dynamic Templates**
2. Find the template you want to edit (Contact Form or Demo Request)
3. Click **Edit** → Select the version
4. Use the visual editor or code editor to customize:
   - **Subject line**: Can include dynamic variables like `{{name}}`
   - **Email content**: Design using drag-and-drop or HTML
   - **Variables**: Access form data using handlebars syntax (e.g., `{{company}}`, `{{message}}`)

#### Available Template Variables

**Contact Form Templates**:
- `{{firstName}}` - First name of the submitter
- `{{lastName}}` - Last name of the submitter
- `{{topic}}` - Contact topic (e.g., "sales", "support")
- `{{message}}` - User's message
- `{{language}}` - Language code ("en" or "de")

**Demo Request Templates**:
- `{{firstName}}`, `{{lastName}}` - Name components
- `{{company}}` - Company name
- `{{jobTitle}}` - Job title
- `{{industry}}` - Industry
- `{{companySize}}` - Company size
- `{{message}}` - Optional message
- `{{language}}` - Language code ("en" or "de")

### Add New Language Support

To add a new language (e.g., French):

1. **Create new templates** in SendGrid:
   - `Contact Form - French`
   - `Demo Request - French`
2. **Add environment variables**:
   - `SENDGRID_TEMPLATE_CONTACT_FR=d-your-french-template-id`
   - `SENDGRID_TEMPLATE_DEMO_FR=d-your-french-demo-template-id`
3. **Update language detection** in `functions/lib/sendgrid.js`:
   ```javascript
   export function detectLanguage(formData, request = null) {
     // Check explicit language in form data
     if (formData.language && ['en', 'de', 'fr'].includes(formData.language)) {
       return formData.language;
     }
     // Check referer header
     if (request) {
       const referer = request.headers.get('referer') || '';
       if (referer.includes('/de/')) return 'de';
       if (referer.includes('/en/')) return 'en';
       if (referer.includes('/fr/')) return 'fr';
     }
     return 'en'; // default
   }
   ```

### Change BCC Recipients

Update the environment variable `SENDGRID_BCC_EMAILS`:

```
sales@eliatra.com,support@eliatra.com,ceo@eliatra.com
```

### Add Custom Fields to Zoho CRM

Edit `functions/lib/zoho.js` → `createContact()`:

```javascript
const payload = {
  data: [
    {
      First_Name: firstName,
      Last_Name: lastName,
      // Add your custom fields
      Custom_Field_API_Name: value,
    }
  ]
};
```

### Modify Tags/Labels

Edit `functions/lib/zoho.js`:

```javascript
Tag: [
  { name: 'Website Lead' },
  { name: 'High Priority' },  // Add custom tags
],
```

## Troubleshooting

### Form Submission Fails

**Error**: "Unable to submit form"

**Solutions**:
1. Check browser console for errors
2. Verify environment variables are set in Cloudflare
3. Check Cloudflare Functions logs

### Email Not Received

**Solutions**:
1. Check spam folder
2. Verify sender email is authenticated in SendGrid
3. Check SendGrid Activity Feed for delivery status
4. Verify `SENDGRID_API_KEY` has Mail Send permissions

### Contact Not Added to List

**Solutions**:
1. Verify `SENDGRID_CONTACT_LIST_ID` is correct
2. Check SendGrid API key has Marketing permissions
3. View Cloudflare Functions logs for errors

### Zoho CRM Not Creating Records

**Solutions**:
1. Verify refresh token is valid:
   ```bash
   curl -X POST "https://accounts.zoho.eu/oauth/v2/token" \
     -d "refresh_token={REFRESH_TOKEN}" \
     -d "client_id={CLIENT_ID}" \
     -d "client_secret={CLIENT_SECRET}" \
     -d "grant_type=refresh_token"
   ```
2. Check Zoho CRM API permissions
3. Verify field API names match your CRM configuration
4. Check Cloudflare Functions logs

### Duplicate Contacts in Zoho

This is expected! The API checks for duplicates by email:
- If contact exists: Uses existing contact ID
- If account exists: Uses existing account ID
- Still links them and updates tags

## Segmentation in Zoho CRM

### Create Segments

To segment leads from the website:

1. Go to Zoho CRM → **Contacts** or **Accounts**
2. Create a custom view:
   - **Name**: Website Leads
   - **Criteria**: `Tag` contains `Website Lead`
3. Further segment by:
   - **Demo Requests**: `Tag` contains `Demo Request`
   - **Contact Form**: `Tag` contains `Contact Form`

### Automation

Set up workflows in Zoho CRM:

1. Go to **Setup** → **Automation** → **Workflow Rules**
2. Create rules triggered by:
   - **Tag** = "Demo Request"
   - **Lead Source** = "Website Demo Request"
3. Actions:
   - Assign to sales rep
   - Send internal notification
   - Create follow-up task

## Security Best Practices

1. **Never commit** `.env` file with real credentials
2. **Use encrypted** environment variables for API keys
3. **Rotate tokens** periodically (SendGrid API keys, Zoho refresh tokens)
4. **Monitor** Cloudflare Functions logs for suspicious activity
5. **Rate limiting**: Consider adding rate limiting to prevent abuse
6. **CAPTCHA**: Consider adding CAPTCHA for production (hCaptcha, Turnstile)

## API Endpoints

### POST /api/contact

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "topic": "sales",
  "message": "I'm interested in learning more...",
  "privacyAccepted": true
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you for your message...",
  "details": {
    "email": "sent",
    "list": "added",
    "crm": "created"
  }
}
```

### POST /api/demo

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "jobTitle": "CTO",
  "industry": "technology",
  "companySize": "201-500",
  "message": "We need AI for...",
  "privacyAccepted": true
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you for your demo request...",
  "details": {
    "email": "sent",
    "list": "added",
    "crm": "created"
  }
}
```

## Additional Resources

- [SendGrid API Documentation](https://docs.sendgrid.com/api-reference)
- [Zoho CRM API Documentation](https://www.zoho.com/crm/developer/docs/api/v3/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Cloudflare Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)

## Support

For issues or questions:
- Check Cloudflare Functions logs first
- Review SendGrid Activity Feed
- Check Zoho CRM API logs
- Contact your development team
