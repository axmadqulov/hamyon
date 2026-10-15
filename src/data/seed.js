import { shiftMonth, currentMonth, todayISO } from "../utils/format";

// Oxirgi 6 oy uchun namunaviy operatsiyalar
const FACTORS = [1, 0.92, 1.08, 0.97, 1.04, 1.12]; // 0 = joriy oy

const TEMPLATE = [
  ["income", "maosh", 6500000, 5, "Oylik maosh"],
  ["expense", "kommunal", 420000, 8, "Svet, gaz, suv"],
  ["expense", "oziq", 850000, 3, "Bozor"],
  ["expense", "oziq", 620000, 14, "Supermarket"],
  ["expense", "transport", 260000, 9, "Taksi va yoqilg'i"],
  ["expense", "kongil", 300000, 12, "Kino va kafe"],
  ["expense", "salomatlik", 180000, 17, "Dorixona"],
  ["expense", "kiyim", 450000, 20, "Kiyim-kechak"],
  ["income", "qoshimcha", 1200000, 18, "Frilans loyiha"],
  ["expense", "boshqa", 150000, 22, "Turli xarajatlar"],
];

export function makeSeed() {
  const today = todayISO();
  const txs = [];
  FACTORS.forEach((f, i) => {
    const key = shiftMonth(currentMonth(), -i);
    TEMPLATE.forEach(([type, category, base, day, note]) => {
      if (type === "income" && category === "qoshimcha" && i % 2 === 1) return;
      const amount = type === "income" && category === "maosh" ? base : Math.round((base * f) / 1000) * 1000;
      const date = `${key}-${String(day).padStart(2, "0")}`;
      if (date > today) return;
      txs.push({ id: crypto.randomUUID(), type, category, amount, date, note });
    });
  });
  return {
    transactions: txs,
    budgets: { oziq: 1600000, transport: 300000, kongil: 350000, kiyim: 400000 },
  };
}
