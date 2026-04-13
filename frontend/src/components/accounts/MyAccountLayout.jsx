import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaExchangeAlt,
  FaHistory,
  FaUsers,
  FaFileAlt,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";

export default function MyAccountLayout() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const accessToken = auth?.accessToken;

  const { data: account, loading } = useFetch(
    auth?.user?.id ? `/account/get-by-user/${auth.user.id}` : null,
    accessToken,
  );

  const handleBack = () => navigate(-1);

  const navItems = [
    {
      to: "details",
      icon: <FaUserCircle size={15} />,
      label: "Account Details",
    },
    { to: "transfer", icon: <FaExchangeAlt size={15} />, label: "Transfer" },
    {
      to: "transactions/history",
      icon: <FaHistory size={15} />,
      label: "Transaction History",
    },
    { to: "joint", icon: <FaUsers size={15} />, label: "Joint Account" },
    { to: "report", icon: <FaFileAlt size={15} />, label: "Report" },
    { to: "profile", icon: <FaUser size={15} />, label: "User Profile" },
  ];

  const initials = auth?.user?.firstname?.charAt(0)?.toUpperCase();

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#0b0f1a",
        color: "#e2e8f0",
      }}
    >
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-5 md:px-8 py-4 border-b border-slate-800/70"
        style={{
          background: "rgba(11,15,26,0.92)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Left: back + title */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-700/60 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-700/50 px-3 py-2 rounded-xl transition-all duration-200"
          >
            <FaArrowLeft size={11} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            <h1 className="text-sm font-semibold text-slate-300 tracking-tight">
              My Banking Dashboard
            </h1>
          </div>
        </div>

        {/* Right: user chip */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs text-slate-600 leading-none mb-0.5">
              Welcome back
            </span>
            <span className="text-sm font-semibold text-slate-200">
              {auth?.user?.firstname}
            </span>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff",
              boxShadow: "0 0 0 2px rgba(16,185,129,0.25)",
            }}
          >
            {initials}
          </div>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <aside
          className="hidden md:flex w-60 flex-col shrink-0 border-r border-slate-800/70 px-4 py-6"
          style={{
            background: "linear-gradient(160deg, #0d1220 0%, #0b0f1a 100%)",
          }}
        >
          <div className="flex items-center gap-2 mb-7 px-1">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shadow"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
              }}
            >
              MA
            </div>
            <h2 className="text-sm font-bold text-slate-200 tracking-tight">
              My Account
            </h2>
          </div>

          <p className="text-[10px] uppercase tracking-widest text-slate-700 font-semibold px-1 mb-3">
            Navigation
          </p>

          <nav className="flex flex-col gap-1">
            {navItems.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 text-emerald-400 border border-emerald-500/30 shadow shadow-emerald-900/10"
                      : "text-slate-500 hover:bg-slate-800/60 hover:text-slate-300"
                  }`
                }
              >
                <span className="shrink-0">{icon}</span>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Sidebar footer hint */}
          <div className="mt-auto pt-6 border-t border-slate-800/60">
            <p className="text-[10px] text-slate-700 text-center">
              © {new Date().getFullYear()} Legion Bank
            </p>
          </div>
        </aside>

        {/* ── Main Content ─────────────────────────────────────────── */}
        <main
          className="flex-1 overflow-auto px-5 md:px-8 py-6"
          style={{ background: "#0e1422" }}
        >
          <Outlet context={{ account, loading }} />
        </main>
      </div>

      {/* ── Mobile Bottom Nav ────────────────────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 grid border-t border-slate-800"
        style={{
          gridTemplateColumns: `repeat(${navItems.length}, 1fr)`,
          background: "rgba(11,15,26,0.97)",
          backdropFilter: "blur(12px)",
        }}
      >
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-medium transition-colors duration-200 ${
                isActive
                  ? "text-emerald-400"
                  : "text-slate-600 hover:text-slate-400"
              }`
            }
          >
            {icon}
            <span className="leading-none truncate w-full text-center px-1">
              {label.split(" ")[0]}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* ── Footer (desktop) ─────────────────────────────────────────── */}
      <footer
        className="hidden md:block border-t border-slate-800/70 text-center py-4 text-xs text-slate-700"
        style={{ background: "rgba(11,15,26,0.80)" }}
      >
        © {new Date().getFullYear()} Legion Bank · All rights reserved.
      </footer>
    </div>
  );
}
