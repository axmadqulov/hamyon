import { money } from "../utils/format";

// Kategoriyalar bo'yicha xarajat — kutubxonasiz SVG halqa diagramma
export default function DonutChart({ slices }) {
  const total = slices.reduce((n, s) => n + s.value, 0);
  const R = 56;
  const C = 2 * Math.PI * R;
  let offset = 0;

  if (total === 0) return <p className="empty">Bu oyda xarajat yo'q.</p>;

  return (
    <div className="donut">
      <svg viewBox="0 0 160 160" role="img" aria-label="Xarajatlar kategoriyalar bo'yicha">
        <g transform="rotate(-90 80 80)">
          {slices.map((s) => {
            const len = (s.value / total) * C;
            const el = (
              <circle key={s.id} cx="80" cy="80" r={R} fill="none" stroke={s.color} strokeWidth="22"
                strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} />
            );
            offset += len;
            return el;
          })}
        </g>
        <text x="80" y="76" textAnchor="middle" className="donut-sub">Jami</text>
        <text x="80" y="94" textAnchor="middle" className="donut-total">{Math.round(total / 1000).toLocaleString("en-US").replace(/,/g, " ")}k</text>
      </svg>

      <ul className="legend">
        {slices.map((s) => (
          <li key={s.id}>
            <span className="dot" style={{ background: s.color }} />
            <span className="grow">{s.label}</span>
            <span className="muted">{Math.round((s.value / total) * 100)}%</span>
            <span>{money(s.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
