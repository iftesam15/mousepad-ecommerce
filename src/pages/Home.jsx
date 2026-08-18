import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BANNERS, FEATURED, MARQUEE, FAQ } from '../data.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ProductCard from '../components/ProductCard.jsx';
import OrderModal from '../components/OrderModal.jsx';
import Quiz from '../components/Quiz.jsx';

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [order, setOrder] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [quizOn, setQuizOn] = useState(false);
  const n = BANNERS.length;

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n, slide]);

  const go = (i) => setSlide(((i % n) + n) % n);

  return (
    <div className="page">
      <Header />

      <section className="hero">
        <div className="hero-inner">
          {BANNERS.map((b, i) => (
            <img key={b.alt} src={b.src} alt={b.alt} style={{ opacity: i === slide ? 1 : 0 }} />
          ))}
          <button className="hero-nav prev" onClick={() => go(slide - 1)} aria-label="Previous">
            ←
          </button>
          <button className="hero-nav next" onClick={() => go(slide + 1)} aria-label="Next">
            →
          </button>
          <div className="hero-dots">
            {BANNERS.map((b, i) => (
              <button
                key={b.alt}
                onClick={() => go(i)}
                style={{ background: i === slide ? 'var(--acc)' : 'rgba(255,255,255,0.35)' }}
                aria-label={b.alt}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="wrap headline">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="kicker">
            <span className="kicker-line" />
            Dhaka, Bangladesh · Since 2021
          </div>
          <h1>
            Game
            <br />
            Unapologetically
          </h1>
          <p>Premium minimalist gaming mousepads engineered for peak performance.</p>
          <div className="cta-row">
            <Link to="/products" className="btn btn-primary">
              Shop Mousepads
            </Link>
            <a href="#quiz" className="btn btn-ghost">
              Know Your Skates
            </a>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <strong>6,000+</strong>
            <span>Orders shipped</span>
          </div>
          <div className="stat">
            <strong>1,000+</strong>
            <span>Happy clients</span>
          </div>
          <div className="stat">
            <strong>2021</strong>
            <span>Est. Dhaka</span>
          </div>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((g) => (
            <div className="marquee-group" key={g}>
              {MARQUEE.flatMap((t) => [
                <span key={`${g}-${t}`}>{t}</span>,
                <span key={`${g}-d-${t}`} className="diamond">
                  ◆
                </span>
              ])}
            </div>
          ))}
        </div>
      </div>

      <section id="products" className="wrap" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <div className="section-head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="kicker" style={{ display: 'inline-flex' }}>
              The Collection
            </span>
            <h2>Featured Mousepads</h2>
          </div>
          <Link to="/products" className="link-more">
            View all 18 designs →
          </Link>
        </div>
        <div className="product-grid">
          {FEATURED.map((p) => (
            <ProductCard key={p.name} product={p} onOrder={setOrder} />
          ))}
        </div>
      </section>

      <section id="about" className="band">
        <div className="wrap about-grid">
          <div className="about-copy">
            <span className="kicker">Since 2021</span>
            <h2>Built in Dhaka for desks that stay loud and clean.</h2>
            <p>
              Minimalist Gaming started as two friends — Alex Rahman and Jordan Hasan — printing
              pads they actually wanted on their own setups. The brief has not changed: one XL spec, stitched
              edges, and artwork that holds up after thousands of hours.
            </p>
            <p>
              Ready-made designs ship from Demo City. Custom files are reviewed by the same team, then
              printed locally. Hide leather, glass MG Glide, and cloth weave all live under the same roof.
            </p>
          </div>
          <div className="about-facts">
            <div className="about-fact">
              <strong>One spec</strong>
              <span>900 × 400 mm XL cloth pads with a non-slip rubber base and anti-fray stitch.</span>
            </div>
            <div className="about-fact">
              <strong>Made to order customs</strong>
              <span>Upload art, crop on the pad, and we confirm print quality by phone before ink hits cloth.</span>
            </div>
            <div className="about-fact">
              <strong>Cash on delivery</strong>
              <span>Dhaka in 5 days, nationwide in 10. We call every order before dispatch.</span>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="wrap faq-grid">
        <div>
          <span className="kicker">Support</span>
          <h2>FAQ</h2>
        </div>
        <div>
          {FAQ.map((item, i) => (
            <div className="faq-item" key={item.q}>
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                {item.q}
                <span>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i ? <p>{item.a}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <section id="quiz" className="band">
        <div className="wrap band-inner" style={{ alignItems: quizOn ? 'stretch' : 'center', flexDirection: quizOn ? 'column' : undefined }}>
          {!quizOn ? (
            <>
              <div className="band-copy">
                <span className="kicker">Not sure what to pick?</span>
                <h2>Know Your Skates</h2>
                <p>
                  Take our 60-second quiz and we'll match you with the surface, size, and glide that fits your
                  aim style.
                </p>
              </div>
              <button
                className="btn btn-primary"
                style={{ flexShrink: 0, fontSize: 15, padding: '16px 36px' }}
                onClick={() => setQuizOn(true)}
              >
                Take the Quiz
              </button>
            </>
          ) : (
            <Quiz onOrder={setOrder} />
          )}
        </div>
      </section>

      <Footer />
      {order ? <OrderModal product={order} onClose={() => setOrder(null)} /> : null}
    </div>
  );
}
