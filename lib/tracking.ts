// ─────────────────────────────────────────────────────────────────────────────
// lib/tracking.ts
//
// Tracking utility for Google Analytics 4, Google Ads, and Google Tag Manager.
//
// Setup:
//  1. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local
//  2. Uncomment the gtag <script> tags in app/layout.tsx
//  3. Set per-funnel Google Ads conversion IDs in .env.local
//     (NEXT_PUBLIC_GADS_CONVERSION_ID_FHA, _VA, _DSCR)
//
// All event functions are safe to call server-side (they no-op when window
// is not defined), so you can import them anywhere without guards.
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer?: any[]
  }
}

// ── Internal helper ────────────────────────────────────────────────────────────

function fireEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return

  // Google Analytics 4 / Google Ads via gtag.js
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }

  // Google Tag Manager via dataLayer (works alongside or instead of gtag)
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...params })
  }
}

// ── Public tracking events ─────────────────────────────────────────────────────

/**
 * Fired when a user clicks the CTA on the intro screen.
 * Map to a GA4 goal or awareness conversion in Google Ads.
 */
export function trackFunnelStarted(funnelId: string): void {
  fireEvent('funnel_started', { funnel_id: funnelId })
}

/**
 * Fired when a user advances past each question.
 * Useful for drop-off analysis in GA4 funnel reports.
 */
export function trackStepCompleted(
  funnelId: string,
  stepNumber: number,
  questionId: string,
  answer: string
): void {
  fireEvent('step_completed', {
    funnel_id: funnelId,
    step_number: stepNumber,
    question_id: questionId,
    answer_value: answer,
  })
}

/**
 * Fired on successful lead form submission.
 * This is your PRIMARY conversion event — map this to a Google Ads conversion action.
 *
 * Per-funnel conversion IDs are read from env vars:
 *   NEXT_PUBLIC_GADS_CONVERSION_ID_FHA / _VA / _DSCR
 *   NEXT_PUBLIC_GADS_CONVERSION_LABEL_FHA / _VA / _DSCR
 */
export function trackLeadSubmitted(funnelId: string): void {
  fireEvent('lead_submitted', { funnel_id: funnelId })

  // Fire Google Ads conversion event if IDs are configured
  const key = funnelId.toUpperCase()
  const conversionId = process.env[`NEXT_PUBLIC_GADS_CONVERSION_ID_${key}`]
  const conversionLabel = process.env[`NEXT_PUBLIC_GADS_CONVERSION_LABEL_${key}`]

  if (conversionId && conversionLabel && typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
      value: 1.0,
      currency: 'USD',
    })
  }
}

/**
 * Fired when the Thank You screen is displayed.
 * Used to confirm the full funnel completion in analytics.
 */
export function trackThankYouViewed(funnelId: string): void {
  fireEvent('thank_you_viewed', { funnel_id: funnelId })
}
