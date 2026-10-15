import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFinance } from "../store/FinanceContext";
import { currentMonth, monthLabel, shiftMonth } from "../utils/format";

export default function MonthPicker() {
  const { month, setMonth } = useFinance();
  const atNow = month >= currentMonth();

  return (
    <div className="month-picker" role="group" aria-label="Oyni tanlash">
      <button className="icon-btn" onClick={() => setMonth(shiftMonth(month, -1))} aria-label="Oldingi oy">
        <ChevronLeft size={18} />
      </button>
      <span aria-live="polite">{monthLabel(month)}</span>
      <button className="icon-btn" onClick={() => setMonth(shiftMonth(month, 1))} disabled={atNow} aria-label="Keyingi oy">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
