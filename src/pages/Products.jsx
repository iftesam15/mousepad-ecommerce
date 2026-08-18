import { useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../data.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ProductCard from '../components/ProductCard.jsx';
import OrderModal from '../components/OrderModal.jsx';

export default function Products() {
  const [filter, setFilter] = useState('All');
  const [order, setOrder] = useState(null);
  const shown = filter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  return (
    <div className="page">
      <Header />
      <section className="wrap page-hero">
        <div className="kicker">
          <span className="kicker-line" />
          The Collection
        </div>
        <h1>All Mousepads</h1>
        <p>{PRODUCTS.length} designs. One spec: 900 × 400 mm, stitched edges, non-slip base.</p>
        <div className="filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-btn${c === filter ? ' active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingTop: 24, paddingBottom: 88 }}>
        <div className="product-grid">
          {shown.map((p) => (
            <ProductCard key={p.name} product={p} onOrder={setOrder} />
          ))}
        </div>
      </section>
      <Footer compact />
      {order ? <OrderModal product={order} onClose={() => setOrder(null)} /> : null}
    </div>
  );
}
