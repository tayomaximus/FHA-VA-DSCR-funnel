// app/fha/page.tsx
// FHA Buyer Funnel — First-time buyers, 3.5% down, blue/green theme
// Ad traffic landing page: /fha

import type { Metadata } from 'next'
import FunnelPage from '@/components/FunnelPage'
import { fhaFunnel } from '@/config/funnels'

export const metadata: Metadata = {
  title: 'FHA Home Loan | Check Your Eligibility',
  description: 'Own a home with as little as 3.5% down. Find out how much you qualify for in under 60 seconds.',
  robots: { index: false, follow: false },
}

export default function FHAPage() {
  return <FunnelPage config={fhaFunnel} />
}
