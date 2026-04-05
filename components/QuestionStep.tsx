'use client'

// components/QuestionStep.tsx
// Renders a single question: either a single-choice button group
// or a text / number / phone / email input.
//
// Single-choice: auto-advances after 300ms (visual confirmation → next step).
// Text inputs: validated on "Next" button click or Enter key.

import { useState } from 'react'
import type { Question, FunnelTheme } from '@/config/funnels'
import { validateRequired, validateNumber, validatePhone, validateEmail, type ValidationResult } from '@/lib/validation'

interface QuestionStepProps {
  question: Question
  value: string          // previously saved answer (for back-navigation)
  theme: FunnelTheme
  onAnswer: (value: string) => void  // auto-advance (single-choice)
  onNext: (value: string) => void    // manual advance (text inputs)
  onBack: () => void
}

export default function QuestionStep({
  question,
  value,
  theme,
  onAnswer,
  onNext,
  onBack,
}: QuestionStepProps) {
  const [localValue, setLocalValue] = useState(value)
  const [error, setError] = useState<string | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(value || null)
  const [isAdvancing, setIsAdvancing] = useState(false)

  // Single-choice: select → visual feedback → auto-advance after 300ms
  const handleOptionSelect = (optionValue: string) => {
    if (isAdvancing) return
    setSelectedOption(optionValue)
    setIsAdvancing(true)
    setTimeout(() => onAnswer(optionValue), 300)
  }

  // Text inputs: validate then advance
  const handleNext = () => {
    const v = localValue.trim()
    let result: ValidationResult = { valid: true }

    if (question.type === 'number') result = validateNumber(v)
    else if (question.type === 'phone') result = validatePhone(v)
    else if (question.type === 'email') result = validateEmail(v)
    else result = validateRequired(v)

    if (!result.valid) {
      setError(result.message ?? 'Please complete this field.')
      return
    }
    setError(null)
    onNext(v)
  }

  const isSingleChoice = question.type === 'single-choice'
  const isTextInput = !isSingleChoice

  // Shared input style — colors driven by theme via inline styles
  const inputBase: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    lineHeight: '1.5',
    borderRadius: '10px',
    border: `2px solid ${error ? '#EF4444' : theme.border}`,
    backgroundColor: theme.surface,
    color: theme.text,
    outline: 'none',
    fontFamily: 'inherit',
  }

  return (
    <div className="w-full">
      {/* Question label */}
      <h2
        className="text-xl font-semibold mb-6 leading-snug sm:text-2xl"
        style={{ color: theme.text }}
      >
        {question.label}
      </h2>

      {/* ── Single choice ────────────────────────────────────────────── */}
      {isSingleChoice && question.options && (
        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.value
            return (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                disabled={isAdvancing}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  textAlign: 'left',
                  fontSize: '16px',
                  fontWeight: isSelected ? 600 : 400,
                  borderRadius: '10px',
                  border: `2px solid ${isSelected ? theme.primary : theme.border}`,
                  backgroundColor: isSelected ? theme.primary : theme.surface,
                  color: isSelected ? '#FFFFFF' : theme.text,
                  cursor: isAdvancing ? 'default' : 'pointer',
                  transition: 'border-color 0.12s ease, background-color 0.12s ease',
                  fontFamily: 'inherit',
                }}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      )}

      {/* ── Text / Number / Phone / Email input ──────────────────────── */}
      {isTextInput && (
        <div>
          <input
            type={
              question.type === 'email' ? 'email'
              : question.type === 'phone' ? 'tel'
              : 'text'
            }
            inputMode={
              question.type === 'number' ? 'numeric'
              : question.type === 'phone' ? 'tel'
              : undefined
            }
            placeholder={question.placeholder ?? ''}
            value={localValue}
            onChange={(e) => {
              setLocalValue(e.target.value)
              if (error) setError(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleNext()
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = theme.primary
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error ? '#EF4444' : theme.border
            }}
            style={inputBase}
            autoFocus
            autoComplete={
              question.type === 'phone' ? 'tel'
              : question.type === 'email' ? 'email'
              : 'off'
            }
          />

          {error && (
            <p className="mt-2 text-sm" style={{ color: '#EF4444' }}>
              {error}
            </p>
          )}

          <button
            onClick={handleNext}
            className="w-full mt-4 py-4 text-base font-semibold rounded-xl"
            style={{
              backgroundColor: theme.primary,
              color: '#FFFFFF',
              fontFamily: 'inherit',
              fontSize: '16px',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.primaryDark
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.primary
            }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* ── Back navigation ──────────────────────────────────────────── */}
      <button
        onClick={onBack}
        className="mt-5 text-sm"
        style={{ color: theme.textMuted, display: 'block' }}
      >
        ← Back
      </button>
    </div>
  )
}
