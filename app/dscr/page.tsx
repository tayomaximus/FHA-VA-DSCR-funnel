// app/dscr/page.tsx
// DSCR Investor Funnel — Real estate investors, no income verification, dark premium theme
// Ad traffic landing page: /dscr

import type { Metadata } from 'next'
import FunnelPage from '@/components/FunnelPage'
import { dscrFunnel } from '@/config/funnels'

export const metadata: Metadata = {
  title: 'DSCR Investment Loan | No Income Verification',
  description: 'Finance your next rental property using its own cash flow. No W-2s or tax returns required.',
  robots: { index: false, follow: false },
}

export default function DSCRPage() {
  return <FunnelPage config={dscrFunnel} />
}
