export const CATEGORIES = [
  { id: "oziq", label: "Oziq-ovqat", kind: "expense", color: "#d1495b" },
  { id: "transport", label: "Transport", kind: "expense", color: "#e9a23b" },
  { id: "kommunal", label: "Kommunal", kind: "expense", color: "#3d7ea6" },
  { id: "kongil", label: "Ko'ngilochar", kind: "expense", color: "#8e5ea2" },
  { id: "salomatlik", label: "Salomatlik", kind: "expense", color: "#2e9e83" },
  { id: "kiyim", label: "Kiyim", kind: "expense", color: "#c2613a" },
  { id: "boshqa", label: "Boshqa", kind: "expense", color: "#7a8793" },
  { id: "maosh", label: "Maosh", kind: "income", color: "#0e7c66" },
  { id: "qoshimcha", label: "Qo'shimcha daromad", kind: "income", color: "#4aa37a" },
  { id: "sovga", label: "Sovg'a", kind: "income", color: "#8bbf6a" },
];

export const EXPENSE_CATS = CATEGORIES.filter((c) => c.kind === "expense");
export const INCOME_CATS = CATEGORIES.filter((c) => c.kind === "income");
export const catById = (id) => CATEGORIES.find((c) => c.id === id);
