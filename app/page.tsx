// Home page — not shown to ad traffic (they land on /fha, /va, or /dscr directly)
// This page is a development convenience to navigate between funnels.

import Link from 'next/link'

const funnels = [
  {
    href: '/fha',
    label: 'FHA Buyer Funnel',
    description: 'First-time buyers · 3.5% down · Clean blue/green theme',
    color: '#1D64D0',
    bg: '#EFF6FF',
  },
  {
    href: '/va',
    label: 'VA Buyer Funnel',
    description: 'Veterans & active duty · $0 down · Navy/gold theme',
    color: '#1E3A5F',
    bg: '#EEF2F7',
  },
  {
    href: '/dscr',
    label: 'DSCR Investor Funnel',
    description: 'Real estate investors · No income verification · Dark premium theme',
    color: '#6366F1',
    bg: '#EEF2FF',
  },
]

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#111827' }}>
        Mortgage Funnel Pages
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '40px', fontSize: '15px' }}>
        Select a funnel to preview
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '480px',
        }}
      >
        {funnels.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            style={{
              display: 'block',
              padding: '20px 24px',
              borderRadius: '12px',
              background: f.bg,
              border: `1px solid ${f.color}22`,
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '17px',
                fontWeight: 600,
                color: f.color,
                marginBottom: '4px',
              }}
            >
              {f.label}
            </span>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>{f.description}</span>
          </Link>
        ))}
      </div>

      <p style={{ marginTop: '48px', fontSize: '12px', color: '#9CA3AF' }}>
        Ad traffic lands directly on /fha · /va · /dscr
      </p>
    </main>
  )
}
