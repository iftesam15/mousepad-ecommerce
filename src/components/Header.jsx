import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { LOGO } from '../data.js';
import { useTheme } from '../ThemeContext.jsx';

const LINKS = [
  { to: '/', label: 'Home', hash: '' },
  { to: '/products', label: 'Products' },
  { to: '/custom', label: 'Custom' },
  { to: '/#about', label: 'About' },
  { to: '/#faq', label: 'FAQ' },
  { to: '/#quiz', label: 'Quiz' },
  { to: '/#contact', label: 'Contact' }
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (link) => {
    if (link.to === '/') return location.pathname === '/' && !location.hash;
    if (link.to.startsWith('/#')) return location.pathname === '/' && location.hash === link.to.slice(1);
    return location.pathname === link.to;
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img src={LOGO} alt="Minimalist Gaming" />
        </Link>
        <nav className="nav">
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={isActive(link) ? 'active' : undefined}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☼' : '☾'}
          </button>
          <Link to="/products" className="shop-btn">
            Shop Now
          </Link>
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </header>
      <div className={`mobile-nav${open ? ' open' : ''}`}>
        {LINKS.map((link) => (
          <Link key={link.label} to={link.to} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link to="/products" onClick={() => setOpen(false)}>
          Shop Now
        </Link>
      </div>
    </>
  );
}
