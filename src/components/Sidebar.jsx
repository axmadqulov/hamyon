import { NavLink } from "react-router-dom";
import { ArrowLeftRight, LayoutDashboard, PiggyBank, Wallet } from "lucide-react";
import MonthPicker from "./MonthPicker";

const links = [
  { to: "/", label: "Boshqaruv paneli", icon: LayoutDashboard },
  { to: "/transactions", label: "Operatsiyalar", icon: ArrowLeftRight },
  { to: "/budgets", label: "Byudjet", icon: PiggyBank },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand"><Wallet size={24} aria-hidden /> Hamyon</div>

      <MonthPicker />

      <nav className="nav" aria-label="Asosiy menyu">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"} className="nav-link">
            <Icon size={18} aria-hidden />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
