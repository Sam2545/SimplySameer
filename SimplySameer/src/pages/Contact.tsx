import { ContactForm } from '../components/ContactForm'

export function Contact() {
  return (
    <div className="main-content">
      <div className="page-content">
        <h1>Contact</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Get in touch. Send a message and I’ll get back to you.
        </p>
        <ContactForm />
      </div>
    </div>
  )
}
