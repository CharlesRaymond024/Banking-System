import {
  FaUserCircle,
  FaExchangeAlt,
  FaHistory,
  FaUsers,
  FaFileAlt,
  FaUser,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <FaUserCircle size={20} />,
    title: "Account Details",
    desc: "View your account name, number, balance, and account type at a glance.",
    to: "details",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
  },
  {
    icon: <FaExchangeAlt size={20} />,
    title: "Make a Transfer",
    desc: "Send funds to other accounts securely with real-time processing.",
    to: "transfer",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.2)",
  },
  {
    icon: <FaHistory size={20} />,
    title: "Transaction History",
    desc: "Review a full log of your past deposits, withdrawals, and transfers.",
    to: "transactions/history",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
  {
    icon: <FaUsers size={20} />,
    title: "Joint Account",
    desc: "Manage joint accounts and add or remove co-owners when applicable.",
    to: "joint",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
  },
  {
    icon: <FaFileAlt size={20} />,
    title: "Generate Reports",
    desc: "Export detailed activity reports for any date range on your account.",
    to: "report",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.2)",
  },
  {
    icon: <FaUser size={20} />,
    title: "User Profile",
    desc: "Update your personal information, contact details, and preferences.",
    to: "profile",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
];

const MyAccountDashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-20 md:pb-6">
      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden px-6 py-8 md:px-10 md:py-10 border"
        style={{
          background:
            "linear-gradient(130deg, #0d2318 0%, #0b1a14 50%, #0d1a25 100%)",
          borderColor: "rgba(16,185,129,0.2)",
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #10b981, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-40 h-32 rounded-full pointer-events-none opacity-10 blur-2xl"
          style={{
            background: "radial-gradient(circle, #38bdf8, transparent 70%)",
          }}
        />

        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
            style={{
              background: "rgba(16,185,129,0.12)",
              borderColor: "rgba(16,185,129,0.3)",
              color: "#10b981",
            }}
          >
            <FaShieldAlt size={10} />
            Secure Dashboard
          </div>
        </div>

        <h2
          className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Welcome to Your <br className="hidden sm:block" />
          <span style={{ color: "#10b981" }}>Account Centre</span>
        </h2>

        <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
          Everything you need to manage your finances is in one place. Navigate
          using the sidebar or explore the sections below.
        </p>
      </div>

      {/* ── Section Label ───────────────────────────────────────────── */}
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-600 font-semibold mb-4">
          What you can do
        </p>

        {/* ── Feature Cards Grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {features.map(({ icon, title, desc, to, color, bg, border }) => (
            <button
              key={to}
              onClick={() => navigate(to)}
              className="group text-left rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #111827 0%, #0d1220 100%)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = border;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border transition-all duration-200"
                style={{ background: bg, borderColor: border, color }}
              >
                {icon}
              </div>

              {/* Text */}
              <h3 className="text-sm font-semibold text-slate-200 mb-1.5 group-hover:text-white transition-colors">
                {title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-500 transition-colors">
                {desc}
              </p>

              {/* Arrow */}
              <div
                className="flex items-center gap-1 mt-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                style={{ color }}
              >
                Go to {title.split(" ")[0]}
                <FaArrowRight size={10} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Footer Tip ──────────────────────────────────────────────── */}
      <div
        className="flex items-start gap-3 rounded-xl px-5 py-4 border"
        style={{
          background: "rgba(16,185,129,0.04)",
          borderColor: "rgba(16,185,129,0.12)",
        }}
      >
        <FaShieldAlt
          className="shrink-0 mt-0.5"
          size={14}
          style={{ color: "#10b981" }}
        />
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="text-slate-400 font-medium">Tip: </span>
          Use the sidebar tabs on desktop or the bottom navigation on mobile to
          quickly jump between sections of your account.
        </p>
      </div>
    </div>
  );
};

export default MyAccountDashBoard;
