import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const BAD_REQUEST = 400
const METHOD_NOT_ALLOWED = 405
const INTERNAL_SERVER_ERROR = 500

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(METHOD_NOT_ALLOWED).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const myEmail = process.env.MY_EMAIL

  if (!apiKey || !myEmail) {
    res.status(INTERNAL_SERVER_ERROR).json({
      error: 'Server misconfiguration: missing RESEND_API_KEY or MY_EMAIL',
    })
    return
  }

  const body = req.body
  if (!body || typeof body !== 'object') {
    res.status(BAD_REQUEST).json({ error: 'Invalid request body' })
    return
  }

  const { name, email, subject, message } = body as Record<string, unknown>

  if (typeof name !== 'string' || !name.trim()) {
    res.status(BAD_REQUEST).json({ error: 'Name is required' })
    return
  }
  if (typeof email !== 'string' || !email.trim()) {
    res.status(BAD_REQUEST).json({ error: 'Email is required' })
    return
  }
  if (typeof message !== 'string' || !message.trim()) {
    res.status(BAD_REQUEST).json({ error: 'Message is required' })
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    res.status(BAD_REQUEST).json({ error: 'Invalid email format' })
    return
  }

  const subjectLine =
    typeof subject === 'string' && subject.trim()
      ? subject.trim()
      : 'Portfolio contact (no subject)'

  const html = `
    <h2>New message from your portfolio</h2>
    <p><strong>From:</strong> ${escapeHtml(name.trim())}</p>
    <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subjectLine)}</p>
    <hr />
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message.trim()).replace(/\n/g, '<br />')}</p>
  `.trim()

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: myEmail,
      replyTo: email.trim(),
      subject: `[Portfolio] ${subjectLine}`,
      html,
    })

    if (error) {
      res.status(INTERNAL_SERVER_ERROR).json({
        error: error.message || 'Failed to send email',
      })
      return
    }

    res.status(200).json({ success: true, id: data?.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(INTERNAL_SERVER_ERROR).json({ error: message })
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (ch) => map[ch] ?? ch)
}
