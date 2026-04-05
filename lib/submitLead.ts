// ─────────────────────────────────────────────────────────────────────────────
// lib/submitLead.ts
//
// Lead submission service. Calls the internal API route which handles
// forwarding to your webhook, CRM, or email service.
//
// To connect your lead delivery:
//  - Set LEAD_WEBHOOK_URL in .env.local (Zapier, Make, n8n, etc.)
//  - Or extend app/api/submit-lead/route.ts to call your CRM SDK directly.
// ─────────────────────────────────────────────────────────────────────────────

export interface LeadData {
  name: string
  phone: string
  email: string
}

export interface SubmissionPayload extends LeadData {
  funnel: string                   // fha | va | dscr
  answers: Record<string, string>  // questionId → selected value
  submittedAt: string              // ISO 8601 timestamp
  pageUrl?: string
  referrer?: string
}

/**
 * Submit a lead to the internal /api/submit-lead route.
 * Throws on HTTP error so callers can surface a user-facing error message.
 */
export async function submitLead(
  funnel: string,
  answers: Record<string, string>,
  lead: LeadData
): Promise<void> {
  const payload: SubmissionPayload = {
    ...lead,
    funnel,
    answers,
    submittedAt: new Date().toISOString(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
  }

  const response = await fetch('/api/submit-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error((data as { error?: string }).error ?? 'Submission failed. Please try again.')
  }
}
