import { useRef, useState } from 'react';
import { CUSTOM_SIZES, bd } from '../data.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function Custom() {
  const inputRef = useRef(null);
  const [file, setFile] = useState({ src: null, name: '', w: 0, h: 0 });
  const [zoom, setZoom] = useState(100);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const drag = useRef(null);

  const loadFile = (picked) => {
    if (!picked || !/^image\//.test(picked.type)) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setFile({ src: reader.result, name: picked.name, w: img.naturalWidth, h: img.naturalHeight });
        setZoom(100);
        setOffset({ x: 0, y: 0 });
        setSubmitted(false);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(picked);
  };

  const quality = () => {
    const need = CUSTOM_SIZES[size].px;
    if (!file.src) {
      return { title: 'No file yet', note: 'Upload an image to check its print resolution.', color: 'var(--mut2)', border: 'var(--line2)' };
    }
    const r = Math.min(file.w / need[0], file.h / need[1]);
    if (r >= 0.9) {
      return { title: `Excellent — ${file.w} × ${file.h} px`, note: 'Full 200 DPI coverage at this pad size. Ready to print.', color: '#6fe89a', border: '#2a4a37' };
    }
    if (r >= 0.55) {
      return { title: `Good — ${file.w} × ${file.h} px`, note: 'Prints cleanly at normal viewing distance. Fine detail may soften slightly.', color: '#e8d76f', border: '#4a452a' };
    }
    return { title: `Too low — ${file.w} × ${file.h} px`, note: `This file will look soft or pixelated. Send at least ${need[0]} × ${need[1]} px.`, color: '#e86f7a', border: '#4a2a30' };
  };

  const q = quality();
  const spec = CUSTOM_SIZES[size];

  const onMove = (e) => {
    if (!drag.current) return;
    const point = e.touches ? e.touches[0] : e;
    setOffset({
      x: drag.current.ox + (point.clientX - drag.current.x),
      y: drag.current.oy + (point.clientY - drag.current.y)
    });
  };

  const startDrag = (e) => {
    e.preventDefault();
    const point = e.touches ? e.touches[0] : e;
    drag.current = { x: point.clientX, y: point.clientY, ox: offset.x, oy: offset.y };
  };

  const endDrag = () => {
    drag.current = null;
  };

  return (
    <div className="page">
      <Header />
      <section className="wrap page-hero">
        <div className="kicker">
          <span className="kicker-line" />
          Build your own
        </div>
        <h1>Custom Mousepad Preview</h1>
        <p>Upload a high-resolution image and see it on the pad before you order. Drag to reposition, zoom to crop.</p>
      </section>

      <section className="wrap custom-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="pad-stage">
            <div
              className="pad"
              style={{ aspectRatio: spec.ratio }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                loadFile(e.dataTransfer.files[0]);
              }}
              onMouseMove={onMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchMove={onMove}
              onTouchEnd={endDrag}
            >
              {file.src ? (
                <img
                  className="art"
                  src={file.src}
                  alt="Custom artwork preview"
                  draggable={false}
                  onMouseDown={startDrag}
                  onTouchStart={startDrag}
                  style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom / 100})` }}
                />
              ) : (
                <div className="pad-empty">
                  <span className="kicker" style={{ color: '#7a7a9c' }}>
                    Drop an image here
                  </span>
                  <button className="btn btn-primary" style={{ padding: '12px 26px' }} onClick={() => inputRef.current?.click()}>
                    Choose image
                  </button>
                  <span className="mono" style={{ fontSize: 11, color: '#5f5f80' }}>
                    PNG or JPG · 7087 × 3150 px recommended
                  </span>
                </div>
              )}
              <div className="pad-stitch" />
              <div className="pad-shade" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button className="btn btn-ghost" style={{ padding: '10px 18px', fontSize: 13, fontWeight: 600 }} onClick={() => inputRef.current?.click()}>
              Upload image
            </button>
            <button
              className="btn btn-ghost"
              style={{ padding: '10px 18px', fontSize: 13, color: 'var(--mut)' }}
              onClick={() => {
                setFile({ src: null, name: '', w: 0, h: 0 });
                setZoom(100);
                setOffset({ x: 0, y: 0 });
                setSubmitted(false);
              }}
            >
              Reset
            </button>
            <span className="card-meta" style={{ textTransform: 'uppercase' }}>
              {file.src ? file.name : 'No file selected'}
            </span>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            hidden
            onChange={(e) => loadFile(e.target.files[0])}
          />
        </div>

        <div className="custom-controls">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="footer-label">Pad size</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CUSTOM_SIZES.map((s, i) => (
                <button key={s.label} className={`size-btn${i === size ? ' active' : ''}`} onClick={() => setSize(i)}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{s.label}</span>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--mut)' }}>
                    {bd(s.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="footer-label">Zoom</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--mut)' }}>
                {zoom}%
              </span>
            </div>
            <input type="range" min="100" max="300" step="1" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
            <span style={{ fontSize: 12, color: 'var(--mut2)', lineHeight: 1.5 }}>Drag the artwork on the pad to reposition it.</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="footer-label">Print quality</span>
            <div className="quality" style={{ borderColor: q.border }}>
              <span className="quality-dot" style={{ background: q.color }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{q.title}</span>
                <span style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--mut)' }}>{q.note}</span>
              </div>
            </div>
          </div>

          <div className="totals">
            <div className="totals-row">
              <span>Custom print</span>
              <span>{bd(spec.price)}</span>
            </div>
            <div className="totals-row">
              <span>Production</span>
              <span>3–4 days</span>
            </div>
            <div className="totals-grand">
              <strong>Total</strong>
              <strong>{bd(spec.price)}</strong>
            </div>
          </div>

          <button
            className="btn btn-primary"
            disabled={!file.src}
            style={{ padding: 15, fontSize: 15, opacity: file.src ? 1 : 0.45 }}
            onClick={() => file.src && setSubmitted(true)}
          >
            {submitted ? "Request sent — we'll call you" : 'Order this design'}
          </button>
          <span style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--mut2)' }}>
            Our team reviews every custom file and confirms by phone before printing.
          </span>
        </div>
      </section>
      <Footer compact />
    </div>
  );
}
