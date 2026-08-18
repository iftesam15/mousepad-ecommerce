import { useState } from 'react';
import { ZONES, bd } from '../data.js';

export default function OrderModal({ product, onClose }) {
  const [qty, setQty] = useState(1);
  const [zone, setZone] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [error, setError] = useState('');

  if (!product) return null;

  const total = product.price * qty;
  const z = ZONES[zone];

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError('Name, phone, and address are required.');
      return;
    }
    if (!agreed) return;
    setError('');
    setPlaced(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {placed ? (
          <div className="success">
            <span className="kicker">Order received</span>
            <h3 style={{ margin: 0, fontSize: 28 }}>We'll call to confirm</h3>
            <p style={{ margin: 0, color: 'var(--mut)', lineHeight: 1.6 }}>
              {form.name}, your {product.name} × {qty} is queued for {z.name.toLowerCase()} delivery.
              Cash on delivery · {bd(total)}.
            </p>
            <button className="btn btn-primary" style={{ padding: '14px 28px' }} onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="modal-summary">
              <span className="footer-label">Your order</span>
              <img src={product.img} alt={product.name} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 600 }}>{product.name}</span>
                <span className="card-meta">900 × 400 MM · STITCHED EDGE</span>
              </div>
              <div className="qty-row">
                <span className="footer-label">Quantity</span>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span style={{ fontSize: 16, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(9, q + 1))}>+</button>
              </div>
              <div className="totals">
                <div className="totals-row">
                  <span>Unit price</span>
                  <span>{bd(product.price)}</span>
                </div>
                <div className="totals-row">
                  <span>Delivery</span>
                  <span>
                    {z.name} · {z.days.toLowerCase()}
                  </span>
                </div>
                <div className="totals-grand">
                  <strong>Total</strong>
                  <strong>{bd(total)}</strong>
                </div>
              </div>
            </div>
            <div className="modal-form">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Checkout</h3>
                  <span style={{ fontSize: 13, color: 'var(--mut)' }}>
                    Cash on delivery. We call to confirm before dispatch.
                  </span>
                </div>
                <button
                  onClick={onClose}
                  style={{ background: 'none', border: 'none', color: 'var(--mut)', fontSize: 22, cursor: 'pointer' }}
                >
                  ×
                </button>
              </div>
              <div className="two-col">
                <label className="field">
                  Full name
                  <input value={form.name} onChange={update('name')} placeholder="Your name" />
                </label>
                <label className="field">
                  Phone
                  <input value={form.phone} onChange={update('phone')} type="tel" placeholder="01XXXXXXXXX" />
                </label>
              </div>
              <label className="field">
                Email (optional)
                <input value={form.email} onChange={update('email')} type="email" placeholder="you@example.com" />
              </label>
              <label className="field">
                Delivery address
                <textarea value={form.address} onChange={update('address')} rows={2} placeholder="House, road, area" />
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span className="footer-label">Delivery zone</span>
                <div className="two-col">
                  {ZONES.map((item, i) => (
                    <button
                      key={item.name}
                      className={`zone-btn${i === zone ? ' active' : ''}`}
                      onClick={() => setZone(i)}
                    >
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</span>
                      <span className="card-meta">{item.days}</span>
                    </button>
                  ))}
                </div>
              </div>
              <label className="agree">
                <input type="checkbox" checked={agreed} onChange={() => setAgreed((v) => !v)} />
                <span>
                  I read and agree to the <a href="#faq">Terms &amp; Conditions</a>,{' '}
                  <a href="#faq">Privacy Policy</a>, and <a href="#faq">Return &amp; Refund Policy</a>.
                </span>
              </label>
              {error ? <span style={{ color: '#e86f7a', fontSize: 13 }}>{error}</span> : null}
              <div className="form-actions">
                <button className="btn btn-ghost" onClick={onClose}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  disabled={!agreed}
                  style={{ opacity: agreed ? 1 : 0.45 }}
                  onClick={submit}
                >
                  Place Order · {bd(total)}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
