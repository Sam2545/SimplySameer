import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <p className="sidebar-brand-name">Sameer</p>
        <p className="sidebar-brand-title">Web Developer</p>
      </div>
      <Link to="/" className="sidebar-home-btn">Home</Link>
      <ul className="sidebar-nav">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/about#skills">My Skills</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="sidebar-social">
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
        <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">⌘</a>
        <a href="#" aria-label="RSS">⊕</a>
      </div>
      <span className="sidebar-scroll">scroll down ↓</span>
    </aside>
  )
}
