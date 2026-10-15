// Oxirgi 6 oy: daromad va xarajat juft ustunlari
export default function MonthlyBars({ data }) {
  const max = Math.max(1, ...data.flatMap((d) => [d.income, d.expense]));
  const W = 520;
  const H = 210;
  const pad = 20;
  const slot = (W - pad * 2) / data.length;
  const bw = slot * 0.26;
  const base = H - 32;
  const h = (v) => (v / max) * (H - 70);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label="Oxirgi 6 oy daromad va xarajati">
      <line x1={pad} x2={W - pad} y1={base} y2={base} stroke="var(--line)" />
      {data.map((d, i) => {
        const x = pad + i * slot + slot / 2;
        return (
          <g key={d.key}>
            <rect x={x - bw - 2} y={base - h(d.income)} width={bw} height={Math.max(h(d.income), 2)} rx="3" fill="var(--income)" />
            <rect x={x + 2} y={base - h(d.expense)} width={bw} height={Math.max(h(d.expense), 2)} rx="3" fill="var(--expense)" />
            <text x={x} y={H - 10} textAnchor="middle" className="chart-label" fontWeight={d.active ? 700 : 400}>{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
