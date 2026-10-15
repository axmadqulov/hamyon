const MONTHS = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
const SHORT = ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"];

export function money(n) {
  const sign = n < 0 ? "−" : "";
  return sign + String(Math.round(Math.abs(n))).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
}

export function toISO(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const todayISO = () => toISO(new Date());
export const monthKey = (iso) => iso.slice(0, 7);
export const currentMonth = () => monthKey(todayISO());

export function shiftMonth(key, n) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1 + n, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function monthLabel(key) {
  const [y, m] = key.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function shortMonth(key) {
  return SHORT[Number(key.split("-")[1]) - 1];
}

export function formatDate(iso) {
  const [, m, d] = iso.split("-").map(Number);
  return `${d} ${SHORT[m - 1]}`;
}

export function toCSV(rows) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = ["Sana", "Turi", "Kategoriya", "Summa", "Izoh"].map(esc).join(",");
  const body = rows.map((r) => [r.date, r.type === "income" ? "Daromad" : "Xarajat", r.category, r.amount, r.note].map(esc).join(","));
  return "\ufeff" + [head, ...body].join("\n");
}
