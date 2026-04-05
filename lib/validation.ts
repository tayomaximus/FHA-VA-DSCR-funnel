// ─────────────────────────────────────────────────────────────────────────────
// lib/validation.ts
// Client-side form validation helpers used by QuestionStep and LeadCaptureForm.
// ─────────────────────────────────────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean
  message?: string
}

export function validateName(value: string): ValidationResult {
  const trimmed = value.trim()
  if (!trimmed) return { valid: false, message: 'Please enter your full name.' }
  if (trimmed.length < 2) return { valid: false, message: 'Name must be at least 2 characters.' }
  if (!/^[\p{L}\s'\-\.]+$/u.test(trimmed)) return { valid: false, message: 'Please enter a valid name.' }
  return { valid: true }
}

export function validatePhone(value: string): ValidationResult {
  const digits = value.replace(/\D/g, '')
  if (!value.trim()) return { valid: false, message: 'Please enter your phone number.' }
  if (digits.length < 10) return { valid: false, message: 'Please enter a valid 10-digit phone number.' }
  return { valid: true }
}

export function validateEmail(value: string): ValidationResult {
  if (!value.trim()) return { valid: false, message: 'Please enter your email address.' }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value.trim())) return { valid: false, message: 'Please enter a valid email address.' }
  return { valid: true }
}

export function validateRequired(value: string): ValidationResult {
  if (!value.trim()) return { valid: false, message: 'Please complete this field.' }
  return { valid: true }
}

export function validateNumber(value: string): ValidationResult {
  if (!value.trim()) return { valid: false, message: 'Please enter an amount.' }
  const num = Number(value.replace(/[,\s]/g, ''))
  if (isNaN(num) || num <= 0) return { valid: false, message: 'Please enter a valid positive number.' }
  return { valid: true }
}
