import { Link } from 'react-router-dom';
import { LOGO } from '../data.js';

export default function Footer({ compact = false }) {
  if (compact) {
    return (
      <footer className="site-footer">
        <div className="wrap footer-bar-inner">
          <span>© 2026 Minimalist Gaming. All rights reserved.</span>
          <span>hello@example.com · +8801000-000000</span>
        </div>
      </footer>
    );
  }

  return (
    <footer id="contact" className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <img src={LOGO} alt="Minimalist Gaming" />
          <p>Premium gaming mousepads engineered for performance and designed for minimalists.</p>
          <p className="mono" style={{ fontSize: 11, lineHeight: 1.7, color: 'var(--mut2)' }}>
            Alex Rahman, Managing Director
            <br />
            Jordan Hasan, Co-founder
          </p>
        </div>
        <div className="footer-col">
          <span className="footer-label">Quick Links</span>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/custom">Custom</Link>
          <Link to="/#about">About Us</Link>
          <Link to="/#faq">FAQ</Link>
          <Link to="/#contact">Contact Us</Link>
        </div>
        <div className="footer-col">
          <span className="footer-label">Policies</span>
          <a href="#faq">Terms &amp; Conditions</a>
          <a href="#faq">Privacy Policy</a>
          <a href="#faq">Return &amp; Refund Policy</a>
        </div>
        <div className="footer-col footer-contact">
          <span className="footer-label">Contact</span>
          <span>
            hello@example.com
            <br />
            +8801000-000000
          </span>
          <span>House # 12, Road # 5, Sample Housing, Demo City, Dhaka-1000, Bangladesh</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--mut2)' }}>
            Trade License: TRAD/DNCC/000000/2025
            <br />
            Delivery: Dhaka 5 days · Outside 10 days
          </span>
        </div>
      </div>
      <div className="footer-bar">
        <div className="wrap footer-bar-inner">
          <span>© 2026 Minimalist Gaming. All rights reserved.</span>
          <div className="socials">
            <a href="https://example.com/facebook" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://example.com/instagram" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://example.com/youtube" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a href="https://example.com/tiktok" target="_blank" rel="noreferrer">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
