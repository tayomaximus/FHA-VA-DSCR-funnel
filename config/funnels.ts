// ─────────────────────────────────────────────────────────────────────────────
// config/funnels.ts
//
// ALL funnel content lives here: headlines, questions, copy, themes.
// Edit this file to change text, add/remove questions, or adjust colors.
// No changes to core component logic are required.
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────

export type QuestionType = 'single-choice' | 'text' | 'number' | 'phone' | 'email'

export interface QuestionOption {
  label: string
  value: string
}

export interface Question {
  id: string
  label: string
  type: QuestionType
  options?: QuestionOption[]   // required for single-choice
  placeholder?: string          // for text/number/phone/email inputs
  required?: boolean
}

export interface FunnelTheme {
  primary: string        // main brand color (buttons, progress bar, etc.)
  primaryDark: string    // hover / active state for primary
  primaryLight: string   // light tint for badges, selected option bg
  accent: string         // check marks, trust icons, success indicators
  background: string     // page background
  surface: string        // card / input background
  text: string           // primary text color
  textMuted: string      // secondary / subdued text
  border: string         // input borders, dividers
  isDark: boolean        // true → dark-themed page (flips contrasts)
}

export interface FunnelConfig {
  id: string
  companyName: string    // shown in the header — replace with your name/logo
  // ── Intro screen ─────────────────────────────────────────────
  intro: {
    badge?: string       // small pill label above headline (optional)
    headline: string
    subheadline: string
    ctaLabel: string
    trustItems: string[] // 3 short trust signals shown below subheadline
  }
  // ── Questions ────────────────────────────────────────────────
  questions: Question[]
  // ── Lead capture step ────────────────────────────────────────
  leadCapture: {
    headline: string
    subheadline: string
    ctaLabel: string
    privacyNote: string
  }
  // ── Thank you state ───────────────────────────────────────────
  thankYou: {
    headline: string
    body: string
    callToAction?: {
      label: string
      phone: string
    }
  }
  // ── Visual theme ─────────────────────────────────────────────
  theme: FunnelTheme
}

// ─────────────────────────────────────────────────────────────────────────────
// FHA FUNNEL — First-Time Buyers
// Route: /fha
// Theme: approachable, trust-building, blue/green
// ─────────────────────────────────────────────────────────────────────────────
export const fhaFunnel: FunnelConfig = {
  id: 'fha',
  companyName: 'MortgagePro',

  intro: {
    badge: 'FHA Loan Program',
    headline: 'Own a Home with as Little as 3.5% Down',
    subheadline:
      'Find out how much you qualify for in under 60 seconds — no credit check required to start.',
    ctaLabel: 'Check My Eligibility →',
    trustItems: [
      'No credit pull to check',
      'Takes about 60 seconds',
      'Free — no obligation',
    ],
  },

  questions: [
    {
      id: 'property_type',
      label: 'What type of property are you looking to buy?',
      type: 'single-choice',
      required: true,
      options: [
        { label: 'Single-Family Home', value: 'single_family' },
        { label: 'Condo or Townhome', value: 'condo' },
        { label: 'Multi-Unit (2–4 units)', value: 'multi_unit' },
        { label: 'Manufactured Home', value: 'manufactured' },
      ],
    },
    {
      id: 'purchase_price',
      label: 'What is your estimated purchase price?',
      type: 'number',
      placeholder: 'e.g. 350000',
      required: true,
    },
    {
      id: 'timeline',
      label: 'How soon are you looking to buy?',
      type: 'single-choice',
      required: true,
      options: [
        { label: 'As soon as possible', value: 'asap' },
        { label: '1–3 months', value: '1_3_months' },
        { label: '3–6 months', value: '3_6_months' },
        { label: 'Just exploring my options', value: 'exploring' },
      ],
    },
    {
      id: 'credit_score',
      label: 'What is your estimated credit score?',
      type: 'single-choice',
      required: true,
      options: [
        { label: '680 or above', value: '680_plus' },
        { label: '640–679', value: '640_679' },
        { label: '580–639', value: '580_639' },
        { label: "I'm not sure", value: 'unknown' },
      ],
    },
    {
      id: 'working_with_agent',
      label: 'Are you currently working with a real estate agent?',
      type: 'single-choice',
      required: true,
      options: [
        { label: 'Yes, I have an agent', value: 'yes' },
        { label: 'No, not yet', value: 'no' },
        { label: 'I already have a property in mind', value: 'property_in_mind' },
      ],
    },
  ],

  leadCapture: {
    headline: "You're almost there — get your free rate quote.",
    subheadline:
      'A licensed mortgage advisor will reach out within one business day to walk you through your options.',
    ctaLabel: 'Get My Free Quote',
    privacyNote: 'Your information is secure and never shared without your consent.',
  },

  thankYou: {
    headline: "You're all set!",
    body: 'Thank you! A licensed FHA mortgage specialist will contact you shortly to review your options and answer any questions.',
    callToAction: {
      label: 'Or call us directly:',
      phone: '(800) 555-0100',
    },
  },

  theme: {
    primary: '#1D64D0',
    primaryDark: '#1751B0',
    primaryLight: '#EFF6FF',
    accent: '#059669',
    background: '#F0F9FF',
    surface: '#FFFFFF',
    text: '#111827',
    textMuted: '#6B7280',
    border: '#CBD5E1',
    isDark: false,
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// VA FUNNEL — Veterans & Active Duty
// Route: /va
// Theme: patriotic modern, deep navy / amber gold
// ─────────────────────────────────────────────────────────────────────────────
export const vaFunnel: FunnelConfig = {
  id: 'va',
  companyName: 'MortgagePro',

  intro: {
    badge: 'VA Loan Benefit',
    headline: '$0 Down. No PMI. Your VA Benefit Is Waiting.',
    subheadline:
      'See what you qualify for in under a minute — with no impact to your credit score.',
    ctaLabel: 'Check My VA Eligibility →',
    trustItems: [
      'No down payment required',
      'No private mortgage insurance',
      '100% free to check',
    ],
  },

  questions: [
    {
      id: 'military_status',
      label: 'Which best describes your military status?',
      type: 'single-choice',
      required: true,
      options: [
        { label: 'Active Duty', value: 'active_duty' },
        { label: 'Veteran / Retired', value: 'veteran' },
        { label: 'National Guard or Reserve', value: 'guard_reserve' },
        { label: 'Surviving Spouse', value: 'surviving_spouse' },
      ],
    },
    {
      id: 'va_benefit_used',
      label: 'Have you used your VA home loan benefit before?',
      type: 'single-choice',
      required: true,
      options: [
        { label: 'No — this would be my first time', value: 'first_time' },
        { label: 'Yes, once before', value: 'used_once' },
        { label: 'Yes, multiple times', value: 'used_multiple' },
      ],
    },
    {
      id: 'purchase_price',
      label: 'What is your target purchase price?',
      type: 'number',
      placeholder: 'e.g. 450000',
      required: true,
    },
    {
      id: 'timeline',
      label: 'How soon are you looking to buy?',
      type: 'single-choice',
      required: true,
      options: [
        { label: 'As soon as possible', value: 'asap' },
        { label: '1–3 months', value: '1_3_months' },
        { label: '3–6 months', value: '3_6_months' },
        { label: 'Just exploring my options', value: 'exploring' },
      ],
    },
    {
      id: 'state',
      label: 'What state will the property be in?',
      type: 'text',
      placeholder: 'e.g. Texas',
      required: true,
    },
  ],

  leadCapture: {
    headline: 'Claim your VA benefit — get a free rate quote.',
    subheadline:
      'A VA-certified mortgage specialist will review your eligibility within one business day.',
    ctaLabel: 'Get My Free VA Quote',
    privacyNote: 'Your information is 100% secure and never shared without your permission.',
  },

  thankYou: {
    headline: 'Thank you for your service.',
    body: 'Your VA loan details have been received. A VA mortgage specialist will contact you shortly to walk you through your options and next steps.',
    callToAction: {
      label: 'Or call us directly:',
      phone: '(800) 555-0200',
    },
  },

  theme: {
    primary: '#1E3A5F',
    primaryDark: '#162C47',
    primaryLight: '#EEF2F7',
    accent: '#D97706',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#111827',
    textMuted: '#6B7280',
    border: '#CBD5E1',
    isDark: false,
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// DSCR FUNNEL — Real Estate Investors
// Route: /dscr
// Theme: premium dark, indigo / emerald
// ─────────────────────────────────────────────────────────────────────────────
export const dscrFunnel: FunnelConfig = {
  id: 'dscr',
  companyName: 'MortgagePro',

  intro: {
    badge: 'DSCR Investor Loan',
    headline: "Finance Your Next Rental With the Property's Own Cash Flow",
    subheadline:
      'No W-2s. No tax returns required. See if you qualify in under 60 seconds.',
    ctaLabel: 'Check My Eligibility →',
    trustItems: [
      'No income verification',
      'Close in as little as 21 days',
      'Loans from $100K to $5M+',
    ],
  },

  questions: [
    {
      id: 'property_type',
      label: 'What type of investment property are you financing?',
      type: 'single-choice',
      required: true,
      options: [
        { label: 'Single-Family Rental', value: 'sfr' },
        { label: 'Multi-Family (2–4 units)', value: 'multi_family' },
        { label: 'Short-Term Rental (Airbnb / VRBO)', value: 'str' },
        { label: '5+ Units / Mixed-Use', value: 'commercial' },
      ],
    },
    {
      id: 'properties_owned',
      label: 'How many investment properties do you currently own?',
      type: 'single-choice',
      required: true,
      options: [
        { label: 'None — this is my first', value: 'first' },
        { label: '1–3 properties', value: '1_3' },
        { label: '4–10 properties', value: '4_10' },
        { label: '10+ properties', value: '10_plus' },
      ],
    },
    {
      id: 'loan_amount',
      label: 'What is the estimated loan amount?',
      type: 'number',
      placeholder: 'e.g. 300000',
      required: true,
    },
    {
      id: 'credit_score',
      label: 'What is your estimated credit score?',
      type: 'single-choice',
      required: true,
      options: [
        { label: '740 or above', value: '740_plus' },
        { label: '700–739', value: '700_739' },
        { label: '660–699', value: '660_699' },
        { label: 'Below 660', value: 'below_660' },
      ],
    },
    {
      id: 'monthly_rent',
      label: 'What is the expected monthly rent for this property?',
      type: 'number',
      placeholder: 'e.g. 2500',
      required: true,
    },
  ],

  leadCapture: {
    headline: 'Almost done — get your DSCR rate quote.',
    subheadline:
      'A DSCR lending specialist will reach out within one business day with your rate scenario.',
    ctaLabel: 'Get My Investor Rate',
    privacyNote: 'Your information is secure and never sold or shared without consent.',
  },

  thankYou: {
    headline: 'Application received.',
    body: 'A DSCR investment loan specialist will contact you within one business day to review your scenario and provide a rate quote.',
    callToAction: {
      label: 'For urgent inquiries:',
      phone: '(800) 555-0300',
    },
  },

  theme: {
    primary: '#6366F1',
    primaryDark: '#4F46E5',
    primaryLight: 'rgba(99, 102, 241, 0.15)',
    accent: '#10B981',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    textMuted: '#94A3B8',
    border: '#334155',
    isDark: true,
  },
}

// ── Lookup map ────────────────────────────────────────────────────────────────
export const funnels: Record<string, FunnelConfig> = {
  fha: fhaFunnel,
  va: vaFunnel,
  dscr: dscrFunnel,
}
