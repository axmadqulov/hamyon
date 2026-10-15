import { useFinance } from "../store/FinanceContext";
import { EXPENSE_CATS } from "../data/constants";
import BudgetBar from "../components/BudgetBar";
import { monthLabel } from "../utils/format";

export default function Budgets() {
  const { state, dispatch, month, spentByCat } = useFinance();

  return (
    <>
      <header className="page-head">
        <h1>Byudjet</h1>
        <p className="muted">Har bir kategoriya uchun oylik limit. {monthLabel(month)} holati ko'rsatilgan.</p>
      </header>

      <ul className="budget-cards">
        {EXPENSE_CATS.map((c) => {
          const limit = state.budgets[c.id] || 0;
          return (
            <li key={c.id} className="panel">
              <label>
                {c.label} uchun oylik limit (so'm)
                <input
                  type="number" min="0" step="10000" inputMode="numeric"
                  value={limit || ""}
                  placeholder="Limit yo'q"
                  onChange={(e) => dispatch({ type: "SET_BUDGET", category: c.id, limit: Number(e.target.value) })}
                />
              </label>
              {limit > 0 ? (
                <BudgetBar label={c.label} color={c.color} spent={spentByCat[c.id] || 0} limit={limit} />
              ) : (
                <p className="muted">Bu oy sarflandi: {new Intl.NumberFormat("en-US").format(spentByCat[c.id] || 0).replace(/,/g, " ")} so'm</p>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
