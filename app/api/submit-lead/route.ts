// ─────────────────────────────────────────────────────────────────────────────
// app/api/submit-lead/route.ts
//
// Server-side proxy: receives the lead payload from the browser and forwards
// it to the GHL Inbound Webhook. Keeps the webhook URL server-side only.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL

  if (!webhookUrl) {
    console.error('[submit-lead] LEAD_WEBHOOK_URL is not set.')
    return NextResponse.json(
      { error: 'Submission is not configured. Please contact support.' },
      { status: 500 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const ghlRes = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!ghlRes.ok) {
    console.error('[submit-lead] GHL webhook responded with', ghlRes.status)
    return NextResponse.json(
      { error: 'Submission failed. Please try again.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
