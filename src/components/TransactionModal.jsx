import { useEffect, useRef, useState } from "react";
import { Trash2, X } from "lucide-react";
import { EXPENSE_CATS, INCOME_CATS } from "../data/constants";
import { todayISO } from "../utils/format";

export default function TransactionModal({ tx, onSave, onDelete, onClose }) {
  const isEdit = Boolean(tx?.id);
  const [form, setForm] = useState({
    type: tx?.type ?? "expense",
    amount: tx?.amount ? String(tx.amount) : "",
    category: tx?.category ?? "oziq",
    date: tx?.date ?? todayISO(),
    note: tx?.note ?? "",
  });
  const [error, setError] = useState("");
  const amountRef = useRef(null);

  useEffect(() => {
    amountRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const cats = form.type === "expense" ? EXPENSE_CATS : INCOME_CATS;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function setType(type) {
    const list = type === "expense" ? EXPENSE_CATS : INCOME_CATS;
    setForm((f) => ({ ...f, type, category: list[0].id }));
  }

  function submit(e) {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!amount || amount <= 0) return setError("Summani 0 dan katta kiriting");
    if (!form.date) return setError("Sanani tanlang");
    onSave({ ...(isEdit ? { id: tx.id } : {}), ...form, amount, note: form.note.trim() });
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={submit} role="dialog" aria-modal="true" aria-label="Operatsiya">
        <header className="modal-head">
          <h2>{isEdit ? "Operatsiyani tahrirlash" : "Yangi operatsiya"}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Yopish"><X size={18} /></button>
        </header>

        <div className="segmented" role="radiogroup" aria-label="Turi">
          <button type="button" role="radio" aria-checked={form.type === "expense"} className={form.type === "expense" ? "on-expense" : ""} onClick={() => setType("expense")}>Xarajat</button>
          <button type="button" role="radio" aria-checked={form.type === "income"} className={form.type === "income" ? "on-income" : ""} onClick={() => setType("income")}>Daromad</button>
        </div>

        <label>
          Summa (so'm)
          <input ref={amountRef} type="number" min="1" step="1000" inputMode="numeric" value={form.amount} onChange={set("amount")} aria-invalid={Boolean(error)} />
        </label>

        <div className="grid-2">
          <label>
            Kategoriya
            <select value={form.category} onChange={set("category")}>
              {cats.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </label>
          <label>
            Sana
            <input type="date" value={form.date} max={todayISO()} onChange={set("date")} />
          </label>
        </div>

        <label>
          Izoh
          <input value={form.note} onChange={set("note")} placeholder="Ixtiyoriy" />
        </label>

        {error && <p className="error" role="alert">{error}</p>}

        <footer className="modal-foot">
          {isEdit && (
            <button type="button" className="btn btn-danger" onClick={() => onDelete(tx.id)}><Trash2 size={16} /> O'chirish</button>
          )}
          <span className="spacer" />
          <button type="button" className="btn" onClick={onClose}>Bekor qilish</button>
          <button type="submit" className="btn btn-primary">Saqlash</button>
        </footer>
      </form>
    </div>
  );
}
