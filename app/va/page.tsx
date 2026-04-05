// app/va/page.tsx
// VA Buyer Funnel — Veterans & active duty, $0 down, navy/gold theme
// Ad traffic landing page: /va

import type { Metadata } from 'next'
import FunnelPage from '@/components/FunnelPage'
import { vaFunnel } from '@/config/funnels'

export const metadata: Metadata = {
  title: 'VA Home Loan | $0 Down for Veterans',
  description: '$0 down. No PMI. Check your VA loan eligibility in under 60 seconds — no credit pull required.',
  robots: { index: false, follow: false },
}

export default function VAPage() {
  return <FunnelPage config={vaFunnel} />
}
