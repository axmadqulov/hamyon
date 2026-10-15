import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { makeSeed } from "../data/seed";
import { currentMonth, monthKey } from "../utils/format";

const KEY = "hamyon:v1";
const Ctx = createContext(null);

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* buzilgan ma'lumot */
  }
  return makeSeed();
}

function reducer(s, a) {
  switch (a.type) {
    case "ADD":
      return { ...s, transactions: [{ ...a.tx, id: crypto.randomUUID() }, ...s.transactions] };
    case "UPDATE":
      return { ...s, transactions: s.transactions.map((t) => (t.id === a.tx.id ? { ...t, ...a.tx } : t)) };
    case "DELETE":
      return { ...s, transactions: s.transactions.filter((t) => t.id !== a.id) };
    case "SET_BUDGET": {
      const budgets = { ...s.budgets };
      if (!a.limit || a.limit <= 0) delete budgets[a.category];
      else budgets[a.category] = a.limit;
      return { ...s, budgets };
    }
    case "IMPORT":
      return a.data;
    case "RESET":
      return makeSeed();
    default:
      return s;
  }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, load);
  const [month, setMonth] = useState(currentMonth());

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* xotira to'lgan */
    }
  }, [state]);

  const value = useMemo(() => {
    const sum = (list, type) => list.filter((t) => t.type === type).reduce((n, t) => n + t.amount, 0);
    const monthTx = state.transactions.filter((t) => monthKey(t.date) === month);
    const income = sum(monthTx, "income");
    const expense = sum(monthTx, "expense");
    const balance = sum(state.transactions, "income") - sum(state.transactions, "expense");

    const spentByCat = {};
    monthTx.filter((t) => t.type === "expense").forEach((t) => {
      spentByCat[t.category] = (spentByCat[t.category] || 0) + t.amount;
    });

    return { state, dispatch, month, setMonth, monthTx, income, expense, balance, spentByCat, sum };
  }, [state, month]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFinance() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFinance faqat FinanceProvider ichida ishlaydi");
  return ctx;
}
