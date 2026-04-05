// ─────────────────────────────────────────────────────────────────────────────
// app/api/submit-lead/route.ts
//
// API route that receives lead submissions and forwards them to your
// configured destination(s).
//
// Supported integrations (configure via .env.local):
//   LEAD_WEBHOOK_URL — POST to any webhook (Zapier, Make, n8n, GoHighLevel, etc.)
//
// To add a CRM or email service, add your SDK call in the marked section below.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'

interface LeadPayload {
  name: string
  phone: string
  email: string
  funnel: string
  answers: Record<string, string>
  submittedAt: string
  pageUrl?: string
  referrer?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadPayload

    // Basic validation
    if (!body.name || !body.email || !body.phone || !body.funnel) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Development: log full payload to console for easy inspection
    if (process.env.NODE_ENV === 'development') {
      console.log('\n─── Lead Submission ───────────────────────────')
      console.log(JSON.stringify(body, null, 2))
      console.log('────────────────────────────────────────────────\n')
    }

    // ── Webhook forwarding ─────────────────────────────────────────────────
    // Works with Zapier, Make (Integromat), n8n, GoHighLevel webhooks, etc.
    const webhookUrl = process.env.LEAD_WEBHOOK_URL
    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!webhookRes.ok) {
        // Log but don't fail — lead is captured regardless
        console.error('[LeadSubmission] Webhook returned', webhookRes.status)
      }
    }

    // ── ADD YOUR CRM / EMAIL SERVICE BELOW ────────────────────────────────
    //
    // Example: GoHighLevel (GHL) Contact API
    // const ghlRes = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstName: body.name.split(' ')[0],
    //     lastName: body.name.split(' ').slice(1).join(' '),
    //     email: body.email,
    //     phone: body.phone,
    //     source: `Funnel - ${body.funnel.toUpperCase()}`,
    //   }),
    // })
    //
    // Example: HubSpot
    // Example: Salesforce
    // Example: SendGrid / Mailchimp
    // ─────────────────────────────────────────────────────────────────────

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[LeadSubmission] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
