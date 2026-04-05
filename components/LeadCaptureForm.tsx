'use client'

// components/LeadCaptureForm.tsx
// Final step of the funnel: collects name, phone, and email.
// Validates on submit and surfaces friendly error messages.

import { useState } from 'react'
import type { FunnelConfig } from '@/config/funnels'
import type { LeadData } from '@/lib/submitLead'
import { validateName, validatePhone, validateEmail } from '@/lib/validation'

interface LeadCaptureFormProps {
  config: FunnelConfig
  onSubmit: (data: LeadData) => Promise<void>
  onBack: () => void
  isSubmitting: boolean
  submitError: string | null
}

export default function LeadCaptureForm({
  config,
  onSubmit,
  onBack,
  isSubmitting,
  submitError,
}: LeadCaptureFormProps) {
  const { leadCapture, theme } = config

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nameResult = validateName(name)
    const phoneResult = validatePhone(phone)
    const emailResult = validateEmail(email)

    if (!nameResult.valid || !phoneResult.valid || !emailResult.valid) {
      setErrors({
        name: nameResult.valid ? undefined : nameResult.message,
        phone: phoneResult.valid ? undefined : phoneResult.message,
        email: emailResult.valid ? undefined : emailResult.message,
      })
      return
    }

    setErrors({})
    await onSubmit({ name: name.trim(), phone: phone.trim(), email: email.trim() })
  }

  const fieldStyle = (hasError: boolean): React.CSSProperties => ({
    display: 'block',
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    lineHeight: '1.5',
    borderRadius: '10px',
    border: `2px solid ${hasError ? '#EF4444' : theme.border}`,
    backgroundColor: theme.surface,
    color: theme.text,
    outline: 'none',
    fontFamily: 'inherit',
  })

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = theme.primary
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, hasError: boolean) => {
    e.currentTarget.style.borderColor = hasError ? '#EF4444' : theme.border
  }

  return (
    <div className="w-full">
      <h2
        className="text-xl font-semibold mb-2 leading-snug sm:text-2xl"
        style={{ color: theme.text }}
      >
        {leadCapture.headline}
      </h2>
      <p className="text-sm mb-6" style={{ color: theme.textMuted }}>
        {leadCapture.subheadline}
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="lead-name"
            className="block text-sm font-medium mb-1"
            style={{ color: theme.text }}
          >
            Full Name
          </label>
          <input
            id="lead-name"
            type="text"
            placeholder="First and last name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }))
            }}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, !!errors.name)}
            style={fieldStyle(!!errors.name)}
            autoComplete="name"
            autoFocus
          />
          {errors.name && (
            <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="lead-phone"
            className="block text-sm font-medium mb-1"
            style={{ color: theme.text }}
          >
            Phone Number
          </label>
          <input
            id="lead-phone"
            type="tel"
            placeholder="(555) 000-0000"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }))
            }}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, !!errors.phone)}
            style={fieldStyle(!!errors.phone)}
            autoComplete="tel"
            inputMode="tel"
          />
          {errors.phone && (
            <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="lead-email"
            className="block text-sm font-medium mb-1"
            style={{ color: theme.text }}
          >
            Email Address
          </label>
          <input
            id="lead-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors((p) => ({ ...p, email: undefined }))
            }}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, !!errors.email)}
            style={fieldStyle(!!errors.email)}
            autoComplete="email"
            inputMode="email"
          />
          {errors.email && (
            <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Submit error */}
        {submitError && (
          <p className="text-sm text-center" style={{ color: '#EF4444' }}>
            {submitError}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-1 py-4 text-base font-semibold rounded-xl"
          style={{
            backgroundColor: isSubmitting ? theme.textMuted : theme.primary,
            color: '#FFFFFF',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            fontSize: '17px',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) e.currentTarget.style.backgroundColor = theme.primaryDark
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) e.currentTarget.style.backgroundColor = theme.primary
          }}
        >
          {isSubmitting ? 'Submitting…' : leadCapture.ctaLabel}
        </button>

        {/* Privacy note */}
        <p className="text-xs text-center" style={{ color: theme.textMuted }}>
          🔒 {leadCapture.privacyNote}
        </p>
      </form>

      {/* Back link */}
      <button
        onClick={onBack}
        disabled={isSubmitting}
        className="mt-4 text-sm"
        style={{ color: theme.textMuted, display: 'block' }}
      >
        ← Back
      </button>
    </div>
  )
}
