import { useState } from 'react';
import { QUIZ, quizResult, bd } from '../data.js';

export default function Quiz({ onOrder }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  if (step >= QUIZ.length) {
    const result = quizResult(answers);
    return (
      <div className="quiz-wrap" style={{ width: '100%' }}>
        <span className="kicker">Your match</span>
        <div className="quiz-result">
          <img src={result.product.img} alt={result.product.name} />
          <div className="quiz-result-copy">
            <h3 style={{ margin: 0, fontSize: 28 }}>{result.title}</h3>
            <p style={{ margin: 0, color: 'var(--mut)', lineHeight: 1.6 }}>{result.copy}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
              <strong>{result.product.name}</strong>
              <span style={{ color: 'var(--accink)', fontWeight: 700 }}>{bd(result.product.price)}</span>
            </div>
            <div className="cta-row">
              <button className="btn btn-primary" style={{ padding: '12px 22px' }} onClick={() => onOrder(result.product)}>
                Quick Order
              </button>
              <button className="btn btn-ghost" style={{ padding: '12px 22px' }} onClick={() => { setStep(0); setAnswers({}); }}>
                Retake quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = QUIZ[step];
  return (
    <div className="quiz-wrap">
      <span className="kicker">
        Question {step + 1} / {QUIZ.length}
      </span>
      <h3 style={{ margin: 0, fontSize: 28 }}>{q.q}</h3>
      <div className="quiz-options">
        {q.options.map((opt) => (
          <button
            key={opt.id}
            className={`quiz-opt${answers[q.id] === opt.id ? ' active' : ''}`}
            onClick={() => {
              setAnswers((a) => ({ ...a, [q.id]: opt.id }));
              setStep((s) => s + 1);
            }}
          >
            <span>{opt.label}</span>
            <small>{opt.hint}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
