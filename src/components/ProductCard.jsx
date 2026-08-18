import { bd } from '../data.js';

export default function ProductCard({ product, onOrder }) {
  return (
    <div className="card">
      <div className="card-media">
        <img src={product.img} alt={product.name} />
        {product.low ? <span className="badge">Low stock</span> : null}
      </div>
      <div className="card-body">
        <div className="card-row">
          <span className="card-name">{product.name}</span>
          <span className="card-price">{bd(product.price)}</span>
        </div>
        <div className="card-row" style={{ alignItems: 'center' }}>
          <span className="card-meta">900 × 400 MM · IN STOCK</span>
          <button className="card-order" onClick={() => onOrder(product)}>
            Quick Order
          </button>
        </div>
      </div>
    </div>
  );
}
