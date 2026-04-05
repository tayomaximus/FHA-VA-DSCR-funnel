# Mortgage Funnel Pages

Three high-converting mortgage funnel pages for paid traffic (Google Ads, YouTube).

Built with Next.js 14 App Router, TypeScript, and Tailwind CSS. No heavy UI libraries. Optimized for speed and mobile UX.

---

## Funnel URLs

| Funnel | Route | Theme |
|---|---|---|
| FHA Buyer | `/fha` | Blue/green — first-time buyers |
| VA Buyer | `/va` | Navy/gold — veterans & active duty |
| DSCR Investor | `/dscr` | Dark indigo — real estate investors |

Each funnel is a fully self-contained single page: intro → questions (one at a time) → lead form → thank you.

---

## Setup & Run

### Prerequisites
- Node.js 18+
- npm or yarn

### Install

```bash
npm install
```

### Environment variables

```bash
cp .env.local.example .env.local
# Edit .env.local with your values (see section below)
```

### Dev server

```bash
npm run dev
# → http://localhost:3000
# Funnels: /fha   /va   /dscr
```

### Production build

```bash
npm run build
npm run start
```

---

## Editing Funnel Content

**All text, questions, and themes are in one file:**

```
config/funnels.ts
```

Each funnel config includes:

| Field | What it controls |
|---|---|
| `companyName` | Header logo/text |
| `intro.headline` | Hero headline |
| `intro.subheadline` | Hero subheadline |
| `intro.ctaLabel` | CTA button text |
| `intro.trustItems` | Three trust signals below subheadline |
| `questions[]` | The question flow (see below) |
| `leadCapture.headline` | Lead form title |
| `leadCapture.ctaLabel` | Submit button text |
| `thankYou.headline` | Thank you headline |
| `thankYou.body` | Thank you body copy |
| `thankYou.callToAction.phone` | Phone number on thank you screen |
| `theme.*` | All colors |

### Adding or changing a question

Each question in the `questions` array supports:

```ts
{
  id: 'unique_id',          // used as the answer key in submissions
  label: 'Question text?',
  type: 'single-choice',    // or: 'text' | 'number' | 'phone' | 'email'
  required: true,
  options: [                // only for single-choice
    { label: 'Display label', value: 'stored_value' },
  ],
  placeholder: 'e.g. 350000',  // for text/number inputs
}
```

Single-choice questions **auto-advance** after the user taps an option (no "Next" button needed — reduces friction).

Text/number inputs require a "Continue" button click (or Enter key).

---

## Connecting Lead Delivery

When a lead submits the form, it hits `POST /api/submit-lead`.

**Option 1 — Webhook (easiest):**

Set `LEAD_WEBHOOK_URL` in `.env.local` to any webhook URL:

```env
LEAD_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/
```

Works with: Zapier, Make (Integromat), n8n, GoHighLevel, any webhook receiver.

The full payload sent to the webhook:

```json
{
  "name": "Jane Smith",
  "phone": "5551234567",
  "email": "jane@example.com",
  "funnel": "fha",
  "answers": {
    "property_type": "single_family",
    "purchase_price": "350000",
    "timeline": "1_3_months",
    "credit_score": "680_plus",
    "working_with_agent": "no"
  },
  "submittedAt": "2025-01-15T18:30:00.000Z",
  "pageUrl": "https://yourdomain.com/fha",
  "referrer": "https://google.com"
}
```

**Option 2 — CRM / email service directly:**

Open `app/api/submit-lead/route.ts` and add your CRM SDK call in the marked section. Examples for GoHighLevel, HubSpot, and Salesforce are commented in that file.

---

## Connecting Google Ads / gtag Tracking

### 1. Enable the gtag script

Open `app/layout.tsx` and uncomment the two `<script>` blocks:

```tsx
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
/>
<script dangerouslySetInnerHTML={{ __html: `...` }} />
```

### 2. Set your Measurement ID

```env
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Set per-funnel Google Ads conversion IDs

Find your Conversion ID and Label in Google Ads → Goals → Conversions.

```env
NEXT_PUBLIC_GADS_CONVERSION_ID_FHA=AW-XXXXXXXXXX
NEXT_PUBLIC_GADS_CONVERSION_LABEL_FHA=xxxxxxxxxxxx

NEXT_PUBLIC_GADS_CONVERSION_ID_VA=AW-XXXXXXXXXX
NEXT_PUBLIC_GADS_CONVERSION_LABEL_VA=xxxxxxxxxxxx

NEXT_PUBLIC_GADS_CONVERSION_ID_DSCR=AW-XXXXXXXXXX
NEXT_PUBLIC_GADS_CONVERSION_LABEL_DSCR=xxxxxxxxxxxx
```

### Tracking events fired automatically

| Event | When |
|---|---|
| `funnel_started` | User clicks the CTA on the intro screen |
| `step_completed` | User advances past each question |
| `lead_submitted` | Lead form successfully submitted |
| `thank_you_viewed` | Thank you screen is displayed |
| `conversion` | Google Ads conversion (on `lead_submitted`) |

All events are fired via `window.gtag()` and `window.dataLayer` push (GTM compatible).

### Google Tag Manager alternative

If using GTM instead of gtag directly:

1. Add your GTM snippet to `app/layout.tsx`
2. In GTM, create triggers on the custom events listed above
3. The `window.dataLayer.push()` calls happen automatically

---

## File Structure

```
├── app/
│   ├── layout.tsx                  Root layout (font, metadata, gtag setup)
│   ├── globals.css                 Base styles + animations
│   ├── page.tsx                    Dev home page (links to funnels)
│   ├── fha/page.tsx                FHA funnel page
│   ├── va/page.tsx                 VA funnel page
│   ├── dscr/page.tsx               DSCR funnel page
│   └── api/submit-lead/route.ts    Lead submission API route
│
├── components/
│   ├── FunnelPage.tsx              Main orchestrator (state machine)
│   ├── QuestionStep.tsx            Single question renderer
│   ├── LeadCaptureForm.tsx         Name / phone / email form
│   ├── ProgressBar.tsx             Fixed top progress indicator
│   └── ThankYouState.tsx           Success screen
│
├── config/
│   └── funnels.ts                  ← EDIT THIS to change content/questions
│
├── lib/
│   ├── tracking.ts                 gtag / dataLayer event helpers
│   ├── validation.ts               Form validation utilities
│   └── submitLead.ts               Lead submission service
│
├── .env.local.example              Copy → .env.local and fill in values
└── README.md
```

---

## Customizing the Company Name / Logo

Each funnel config has a `companyName` field in `config/funnels.ts`. This is rendered as text in the header. To use a logo image instead, edit the header section in `components/FunnelPage.tsx`.

---

## Performance Notes

- No client-side routing library — Next.js App Router handles code splitting automatically
- Inter font loaded via `next/font/google` (zero layout shift, subset-optimized)
- No images used in funnels (text-only = fast first paint)
- CSS purged by Tailwind at build time — minimal stylesheet
- All theme colors applied via inline styles (no dynamic class name generation)
- Single-choice questions auto-advance — reduces click count per session

---

## Placeholders / Assumptions

- **Company name**: Replace `"MortgagePro"` in each funnel config with your actual company name
- **Phone numbers**: Replace the `callToAction.phone` values in `config/funnels.ts`
- **Footer links**: "Privacy Policy" `href="#"` in `FunnelPage.tsx` — link to your actual policy page
- **Tracking IDs**: All set to placeholder values — fill in `.env.local` before going live
- **Lead delivery**: Defaults to console log in dev — set `LEAD_WEBHOOK_URL` or add CRM integration before launch
- **NMLS / compliance copy**: Add your license number and required disclosures to the footer in `FunnelPage.tsx`
