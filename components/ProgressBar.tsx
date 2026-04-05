// components/ProgressBar.tsx
// Fixed top progress bar showing funnel completion percentage.

interface ProgressBarProps {
  progress: number      // 0–100
  primaryColor: string  // CSS color value from funnel theme
}

export default function ProgressBar({ progress, primaryColor }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress))

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: 'rgba(128, 128, 128, 0.15)',
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${clamped}%`,
          backgroundColor: primaryColor,
          transition: 'width 0.3s ease',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  )
}
