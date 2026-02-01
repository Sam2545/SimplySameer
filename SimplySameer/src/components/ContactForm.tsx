import { useState } from 'react'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

export type ContactFormData = z.infer<typeof contactSchema>

const initialValues: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormData>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage('')

    const result = contactSchema.safeParse(values)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {}
      result.error.errors.forEach((err) => {
        const path = err.path[0] as keyof ContactFormData
        if (path && !fieldErrors[path]) fieldErrors[path] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus('error')
        setStatusMessage(data.error ?? `Request failed (${res.status})`)
        return
      }

      setStatus('success')
      setStatusMessage('Thanks! Your message was sent.')
      setValues(initialValues)
    } catch {
      setStatus('error')
      setStatusMessage('Network error. Please try again.')
    }
  }

  const isLoading = status === 'loading'

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-xl"
      noValidate
    >
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
        >
          Name <span className="text-[var(--color-accent-red)]">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          disabled={isLoading}
          autoComplete="name"
          className="w-full px-4 py-2.5 rounded-[var(--radius)] bg-white/5 border border-white/10 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors disabled:opacity-60"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-[var(--color-accent-red)]" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
        >
          Email <span className="text-[var(--color-accent-red)]">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          disabled={isLoading}
          autoComplete="email"
          className="w-full px-4 py-2.5 rounded-[var(--radius)] bg-white/5 border border-white/10 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors disabled:opacity-60"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-[var(--color-accent-red)]" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
        >
          Subject <span className="text-[var(--color-text-muted)]">(optional)</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={values.subject ?? ''}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-2.5 rounded-[var(--radius)] bg-white/5 border border-white/10 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors disabled:opacity-60"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
        >
          Message <span className="text-[var(--color-accent-red)]">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={values.message}
          onChange={handleChange}
          disabled={isLoading}
          rows={5}
          className="w-full px-4 py-2.5 rounded-[var(--radius)] bg-white/5 border border-white/10 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors disabled:opacity-60 resize-y min-h-[120px]"
          placeholder="Your message..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-[var(--color-accent-red)]" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {statusMessage && (
        <p
          role="alert"
          className={`text-sm ${
            status === 'success'
              ? 'text-[var(--color-accent)]'
              : 'text-[var(--color-accent-red)]'
          }`}
        >
          {statusMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2.5 rounded-[var(--radius)] font-medium text-[var(--color-bg)] bg-[var(--color-accent)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}
