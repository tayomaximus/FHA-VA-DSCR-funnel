'use client'

// components/FunnelPage.tsx
// Main funnel orchestrator. Manages phase state, step progression,
// tracking events, and renders the correct sub-component per phase.
//
// Phases:
//   intro    → headline + CTA (no progress bar)
//   question → one question at a time (with progress bar)
//   lead     → name / phone / email form (with progress bar)
//   done     → thank you screen

import { useState } from 'react'
import type { FunnelConfig } from '@/config/funnels'
import type { LeadData } from '@/lib/submitLead'
import { submitLead } from '@/lib/submitLead'
import {
  trackFunnelStarted,
  trackStepCompleted,
  trackLeadSubmitted,
  trackThankYouViewed,
} from '@/lib/tracking'
import Link from 'next/link'
import ProgressBar from './ProgressBar'
import QuestionStep from './QuestionStep'
import LeadCaptureForm from './LeadCaptureForm'
import ThankYouState from './ThankYouState'

type Phase = 'intro' | 'question' | 'lead' | 'done'

interface FunnelPageProps {
  config: FunnelConfig
}

export default function FunnelPage({ config }: FunnelPageProps) {
  const { theme, questions, intro } = config

  const [phase, setPhase] = useState<Phase>('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Progress bar percentage
  // Range: 0 (intro) → ~14% (first q) → ~86% (lead form) → 100% (done)
  const totalProgressSteps = questions.length + 2 // questions + lead step + done step
  const progressValue =
    phase === 'intro' ? 0
    : phase === 'question' ? ((step + 1) / totalProgressSteps) * 100
    : phase === 'lead' ? ((questions.length + 1) / totalProgressSteps) * 100
    : 100

  // ── Event handlers ──────────────────────────────────────────────────────────

  const handleStart = () => {
    trackFunnelStarted(config.id)
    setPhase('question')
    setStep(0)
  }

  // Called by QuestionStep when an answer is confirmed (both auto-advance and manual)
  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    trackStepCompleted(config.id, step + 1, questionId, value)

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setPhase('lead')
    }
  }

  const handleBack = () => {
    if (phase === 'question') {
      if (step > 0) {
        setStep(step - 1)
      } else {
        setPhase('intro')
      }
    } else if (phase === 'lead') {
      setPhase('question')
      setStep(questions.length - 1)
    }
  }

  const handleLeadSubmit = async (leadData: LeadData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      await submitLead(config.id, answers, leadData)
      trackLeadSubmitted(config.id)
      setPhase('done')
      trackThankYouViewed(config.id)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentQuestion = questions[step]

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.background,
        color: theme.text,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Fixed progress bar (hidden on intro and done) */}
      {(phase === 'question' || phase === 'lead') && (
        <ProgressBar progress={progressValue} primaryColor={theme.primary} />
      )}

      {/* Header */}
      <header
        style={{
          padding: '16px 24px',
          borderBottom:
            phase !== 'intro' && phase !== 'done'
              ? `1px solid ${theme.border}`
              : 'none',
        }}
      >
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: theme.primary,
              letterSpacing: '-0.01em',
            }}
          >
            {/* Replace with your logo or company name */}
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              {config.companyName}
            </Link>
          </span>
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          maxWidth: '480px',
          width: '100%',
          margin: '0 auto',
          padding: '32px 24px 48px',
        }}
      >
        {/* ── Intro ───────────────────────────────────────────────────── */}
        {phase === 'intro' && (
          <div key="intro" className="animate-fadeUp">
            {intro.badge && (
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5"
                style={{
                  backgroundColor: theme.primaryLight,
                  color: theme.primary,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {intro.badge}
              </span>
            )}

            <h1
              className="text-3xl font-bold leading-tight mb-4 sm:text-4xl"
              style={{ color: theme.text, letterSpacing: '-0.02em' }}
            >
              {intro.headline}
            </h1>

            <p
              className="text-base leading-relaxed mb-8 sm:text-lg"
              style={{ color: theme.textMuted }}
            >
              {intro.subheadline}
            </p>

            {/* Trust signals */}
            <ul
              className="mb-8"
              style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, listStyle: 'none', margin: '0 0 32px' }}
            >
              {intro.trustItems.map((item) => (
                <li
                  key={item}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: theme.textMuted }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: theme.accent,
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Primary CTA */}
            <button
              onClick={handleStart}
              style={{
                width: '100%',
                padding: '18px 24px',
                fontSize: '17px',
                fontWeight: 600,
                borderRadius: '12px',
                backgroundColor: theme.primary,
                color: '#FFFFFF',
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.primaryDark
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.primary
              }}
            >
              {intro.ctaLabel}
            </button>
          </div>
        )}

        {/* ── Question ────────────────────────────────────────────────── */}
        {phase === 'question' && currentQuestion && (
          // key changes on every step → component remounts → animation replays + local state resets
          <div key={`q-${step}`} className="animate-fadeUp">
            {/* Step counter */}
            <p
              className="text-xs font-medium mb-4"
              style={{ color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}
            >
              Question {step + 1} of {questions.length}
            </p>
            <QuestionStep
              question={currentQuestion}
              value={answers[currentQuestion.id] ?? ''}
              theme={theme}
              onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
              onNext={(value) => handleAnswer(currentQuestion.id, value)}
              onBack={handleBack}
            />
          </div>
        )}

        {/* ── Lead capture ────────────────────────────────────────────── */}
        {phase === 'lead' && (
          <div key="lead" className="animate-fadeUp">
            <LeadCaptureForm
              config={config}
              onSubmit={handleLeadSubmit}
              onBack={handleBack}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          </div>
        )}

        {/* ── Done / Thank you ────────────────────────────────────────── */}
        {phase === 'done' && (
          <div key="done" className="animate-fadeUp">
            <ThankYouState config={config} />
          </div>
        )}
      </main>

      {/* Footer — minimal trust line */}
      {phase !== 'done' && (
        <footer
          className="text-center text-xs py-6 px-4"
          style={{ color: theme.textMuted, borderTop: `1px solid ${theme.border}` }}
        >
          © {new Date().getFullYear()} {config.companyName} · Licensed Mortgage Lender ·{' '}
          <a href="#" style={{ color: theme.textMuted }}>
            Privacy Policy
          </a>
        </footer>
      )}
    </div>
  )
}
