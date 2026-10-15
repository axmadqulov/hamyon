import { useMemo, useState } from "react";
import { Download, Plus, Search } from "lucide-react";
import { useFinance } from "../store/FinanceContext";
import { CATEGORIES, catById } from "../data/constants";
import TransactionModal from "../components/TransactionModal";
import { formatDate, money, monthLabel, toCSV } from "../utils/format";

export default function Transactions() {
  const { dispatch, month, monthTx } = useFinance();
  const [type, setType] = useState("all");
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null); // {} = yangi, {tx} = tahrirlash

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return monthTx
      .filter((t) => (type === "all" || t.type === type) && (cat === "all" || t.category === cat) && (!q || t.note.toLowerCase().includes(q)))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [monthTx, type, cat, query]);

  function save(tx) {
    dispatch({ type: tx.id ? "UPDATE" : "ADD", tx });
    setModal(null);
  }

  function remove(id) {
    if (window.confirm("Operatsiya o'chirilsinmi?")) {
      dispatch({ type: "DELETE", id });
      setModal(null);
    }
  }

  function exportCSV() {
    const blob = new Blob([toCSV(list)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hamyon-${month}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <header className="page-head row-between">
        <div>
          <h1>Operatsiyalar</h1>
          <p className="muted">{monthLabel(month)} · {list.length} ta</p>
        </div>
        <div className="actions">
          <button className="btn" onClick={exportCSV} disabled={list.length === 0}><Download size={16} /> CSV</button>
          <button className="btn btn-primary" onClick={() => setModal({})}><Plus size={16} /> Qo'shish</button>
        </div>
      </header>

      <div className="toolbar">
        <label className="search">
          <Search size={16} aria-hidden />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Izoh bo'yicha qidirish" aria-label="Izoh bo'yicha qidirish" />
        </label>
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Turi bo'yicha filtr">
          <option value="all">Daromad va xarajat</option>
          <option value="income">Faqat daromad</option>
          <option value="expense">Faqat xarajat</option>
        </select>
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Kategoriya bo'yicha filtr">
          <option value="all">Barcha kategoriyalar</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      {list.length === 0 ? (
        <p className="empty">Mos operatsiya topilmadi. Filtrlarni o'zgartiring yoki yangi operatsiya qo'shing.</p>
      ) : (
        <div className="panel table-wrap">
          <table>
            <thead>
              <tr><th>Sana</th><th>Kategoriya</th><th>Izoh</th><th className="num">Summa</th></tr>
            </thead>
            <tbody>
              {list.map((t) => {
                const c = catById(t.category);
                return (
                  <tr key={t.id} tabIndex={0} onClick={() => setModal({ tx: t })} onKeyDown={(e) => e.key === "Enter" && setModal({ tx: t })}>
                    <td>{formatDate(t.date)}</td>
                    <td><span className="dot" style={{ background: c?.color }} /> {c?.label}</td>
                    <td className="muted">{t.note}</td>
                    <td className={"num " + (t.type === "income" ? "c-income" : "c-expense")}>{t.type === "income" ? "+" : "−"}{money(t.amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modal && <TransactionModal tx={modal.tx} onSave={save} onDelete={remove} onClose={() => setModal(null)} />}
    </>
  );
}
