import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="main-content">
      <div className="hero-tags">
        <span className="hero-tag hero-tag-1">&lt;html&gt;</span>
        <span className="hero-tag hero-tag-2">&lt;body&gt;</span>
        <span className="hero-tag hero-tag-3">&lt;h1&gt;</span>
        <span className="hero-tag hero-tag-4">&lt;p&gt;</span>
        <span className="hero-tag hero-tag-5">&lt;/h1&gt;</span>
        <span className="hero-tag hero-tag-6">&lt;/p&gt;</span>
      </div>

      <button type="button" className="sound-toggle" aria-label="Sound off">
        <span className="sound-icon" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </span>
        <span>Sound OFF</span>
      </button>

      <section className="home-hero">
        <h1>
          <span className="hero-line">Hi,</span>
          <span className="hero-line">I'm Sameer,</span>
          <span className="hero-line">web developer</span>
        </h1>
        <p className="home-hero-subtitle">
          Front End Developer / WordPress Expert
        </p>
        <Link to="/contact" className="btn-contact">
          Contact me!
        </Link>
      </section>

      <span className="main-scroll">scroll down ↓</span>
    </div>
  )
}
