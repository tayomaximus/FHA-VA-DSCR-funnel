// ─────────────────────────────────────────────────────────────────────────────
// lib/submitLead.ts
//
// Lead submission — posts to the internal Next.js API route (/api/submit-lead),
// which forwards the payload to the GHL Inbound Webhook server-side.
// Webhook URL is set via LEAD_WEBHOOK_URL in .env.local (never exposed to browser).
// ─────────────────────────────────────────────────────────────────────────────

export interface LeadData {
  name: string
  phone: string
  email: string
}

export interface SubmissionPayload extends LeadData {
  funnel: string
  answers: Record<string, string>
  submittedAt: string
  pageUrl?: string
  referrer?: string
}

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
    throw new Error(data.error ?? 'Submission failed. Please try again.')
  }
}
