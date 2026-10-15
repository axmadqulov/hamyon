import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useFinance } from "../store/FinanceContext";
import { EXPENSE_CATS, catById } from "../data/constants";
import DonutChart from "../components/DonutChart";
import MonthlyBars from "../components/MonthlyBars";
import BudgetBar from "../components/BudgetBar";
import TransactionModal from "../components/TransactionModal";
import { formatDate, monthKey, monthLabel, money, shiftMonth, shortMonth } from "../utils/format";

export default function Dashboard() {
  const { state, dispatch, month, monthTx, income, expense, balance, spentByCat, sum } = useFinance();
  const [adding, setAdding] = useState(false);

  const slices = useMemo(
    () =>
      EXPENSE_CATS.map((c) => ({ id: c.id, label: c.label, color: c.color, value: spentByCat[c.id] || 0 }))
        .filter((s) => s.value > 0)
        .sort((a, b) => b.value - a.value),
    [spentByCat]
  );

  const months = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const key = shiftMonth(month, i - 5);
        const list = state.transactions.filter((t) => monthKey(t.date) === key);
        return { key, label: shortMonth(key), income: sum(list, "income"), expense: sum(list, "expense"), active: key === month };
      }),
    [state.transactions, month, sum]
  );

  const recent = [...monthTx].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const budgeted = EXPENSE_CATS.filter((c) => state.budgets[c.id]);
  const saved = income - expense;

  return (
    <>
      <header className="page-head row-between">
        <div>
          <h1>Boshqaruv paneli</h1>
          <p className="muted">{monthLabel(month)}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setAdding(true)}><Plus size={16} /> Operatsiya qo'shish</button>
      </header>

      <div className="stats">
        <div className="stat"><span>Umumiy balans</span><strong>{money(balance)}</strong></div>
        <div className="stat"><span>Daromad</span><strong className="c-income">{money(income)}</strong></div>
        <div className="stat"><span>Xarajat</span><strong className="c-expense">{money(expense)}</strong></div>
        <div className="stat"><span>{saved >= 0 ? "Tejaldi" : "Kamomad"}</span><strong className={saved >= 0 ? "c-income" : "c-expense"}>{money(Math.abs(saved))}</strong></div>
      </div>

      <div className="panels">
        <section className="panel">
          <h2>Xarajatlar tarkibi</h2>
          <DonutChart slices={slices} />
        </section>

        <section className="panel">
          <h2>Oxirgi 6 oy</h2>
          <MonthlyBars data={months} />
          <p className="legend-inline"><span className="dot" style={{ background: "var(--income)" }} /> Daromad <span className="dot" style={{ background: "var(--expense)" }} /> Xarajat</p>
        </section>

        <section className="panel">
          <div className="row-between"><h2>Byudjet holati</h2><Link to="/budgets" className="link">Sozlash</Link></div>
          {budgeted.length === 0 ? (
            <p className="empty">Limit qo'yilmagan. Byudjet bo'limida kategoriyalarga oylik limit belgilang.</p>
          ) : (
            <div className="budget-list">
              {budgeted.map((c) => (
                <BudgetBar key={c.id} label={c.label} color={c.color} spent={spentByCat[c.id] || 0} limit={state.budgets[c.id]} />
              ))}
            </div>
          )}
        </section>

        <section className="panel">
          <div className="row-between"><h2>So'nggi operatsiyalar</h2><Link to="/transactions" className="link">Hammasi</Link></div>
          {recent.length === 0 ? (
            <p className="empty">Bu oyda operatsiya yo'q.</p>
          ) : (
            <ul className="tx-mini">
              {recent.map((t) => (
                <li key={t.id}>
                  <span className="dot" style={{ background: catById(t.category)?.color }} />
                  <span className="grow">{t.note || catById(t.category)?.label}<small className="muted"> · {formatDate(t.date)}</small></span>
                  <span className={t.type === "income" ? "c-income" : "c-expense"}>{t.type === "income" ? "+" : "−"}{money(t.amount)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {adding && (
        <TransactionModal
          onSave={(tx) => { dispatch({ type: "ADD", tx }); setAdding(false); }}
          onClose={() => setAdding(false)}
        />
      )}
    </>
  );
}
