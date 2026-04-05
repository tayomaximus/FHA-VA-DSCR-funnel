// components/ThankYouState.tsx
// Success screen displayed after a lead is submitted.

import type { FunnelConfig } from '@/config/funnels'

interface ThankYouStateProps {
  config: FunnelConfig
}

export default function ThankYouState({ config }: ThankYouStateProps) {
  const { thankYou, theme } = config

  return (
    <div
      className="flex flex-col items-center justify-center text-center px-4"
      style={{ minHeight: '60vh', paddingTop: '48px', paddingBottom: '64px' }}
    >
      {/* Check icon */}
      <div
        className="flex items-center justify-center rounded-full mb-6"
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: theme.primaryLight,
          flexShrink: 0,
        }}
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke={theme.accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1
        className="text-3xl font-bold mb-3 leading-tight"
        style={{ color: theme.text }}
      >
        {thankYou.headline}
      </h1>

      <p
        className="text-base leading-relaxed max-w-sm"
        style={{ color: theme.textMuted }}
      >
        {thankYou.body}
      </p>

      {thankYou.callToAction && (
        <div className="mt-8 flex flex-col items-center gap-1">
          <span className="text-sm" style={{ color: theme.textMuted }}>
            {thankYou.callToAction.label}
          </span>
          <a
            href={`tel:${thankYou.callToAction.phone.replace(/\D/g, '')}`}
            className="text-2xl font-semibold"
            style={{ color: theme.primary, textDecoration: 'none' }}
          >
            {thankYou.callToAction.phone}
          </a>
        </div>
      )}
    </div>
  )
}
