import { money } from "../utils/format";

export default function BudgetBar({ label, color, spent, limit }) {
  const pct = limit ? Math.min(100, Math.round((spent / limit) * 100)) : 0;
  const over = limit > 0 && spent > limit;
  const near = !over && pct >= 85;

  return (
    <div className="budget-bar">
      <div className="row-between">
        <span><span className="dot" style={{ background: color }} /> {label}</span>
        <span className={over ? "is-over" : "muted"}>
          {money(spent)} / {money(limit)}
        </span>
      </div>
      <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div style={{ width: pct + "%", background: over ? "var(--expense)" : near ? "var(--warn)" : color }} />
      </div>
      {over && <p className="error">Limitdan {money(spent - limit)} oshdi</p>}
    </div>
  );
}
