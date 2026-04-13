import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import {
  MdAccountBalanceWallet,
  MdTrendingUp,
  MdTrendingDown,
  MdSwapHoriz,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";

// ── helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => Number(n).toLocaleString();

const StatCard = ({ icon, label, value, color, sub, trend }) => (
  <div
    className="relative rounded-2xl p-5 border flex flex-col gap-3 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
    style={{
      background: "linear-gradient(135deg, #111827 0%, #0d1220 100%)",
      borderColor: "rgba(255,255,255,0.07)",
    }}
  >
    {/* Glow blob */}
    <div
      className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-2xl pointer-events-none"
      style={{ background: color }}
    />

    {/* Icon */}
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: `${color}22`, border: `1px solid ${color}33` }}
    >
      <span style={{ color }}>{icon}</span>
    </div>

    {/* Value */}
    <div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-bold text-white leading-none">{value}</p>
    </div>

    {/* Sub / trend */}
    {(sub || trend) && (
      <p className="text-xs text-slate-500">
        {trend === "up" && <MdArrowUpward className="inline text-emerald-400 mr-0.5" size={12} />}
        {trend === "down" && <MdArrowDownward className="inline text-red-400 mr-0.5" size={12} />}
        {sub}
      </p>
    )}
  </div>
);

// ── mock activity data ────────────────────────────────────────────────────────
const mockActivity = [
  { id: 1, type: "deposit",    label: "Salary Credit",        amount: "+₦450,000", date: "Today, 09:41 AM",    color: "#10b981" },
  { id: 2, type: "withdrawal", label: "ATM Withdrawal",       amount: "-₦20,000",  date: "Today, 08:15 AM",    color: "#f43f5e" },
  { id: 3, type: "transfer",   label: "Transfer to Savings",  amount: "-₦100,000", date: "Yesterday, 06:30 PM",color: "#a78bfa" },
  { id: 4, type: "deposit",    label: "Freelance Payment",    amount: "+₦85,000",  date: "Apr 11, 02:00 PM",   color: "#10b981" },
  { id: 5, type: "withdrawal", label: "Utility Bill",         amount: "-₦12,500",  date: "Apr 10, 11:20 AM",   color: "#f43f5e" },
];

const typeIcon = {
  deposit:    <MdTrendingUp size={16} />,
  withdrawal: <MdTrendingDown size={16} />,
  transfer:   <MdSwapHoriz size={16} />,
};

const typeBadge = {
  deposit:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  withdrawal: "bg-red-500/10 text-red-400 border-red-500/20",
  transfer:   "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

// ── mock quick-stats bar ──────────────────────────────────────────────────────
const mockQuickStats = [
  { label: "Total Balance",   value: "₦2,340,000", note: "Across all accounts",   color: "#f59e0b" },
  { label: "Monthly Income",  value: "₦535,000",   note: "+12% from last month",  color: "#10b981" },
  { label: "Monthly Spend",   value: "₦132,500",   note: "-4% from last month",   color: "#f43f5e" },
  { label: "Savings Rate",    value: "75.2%",       note: "Of monthly income",     color: "#a78bfa" },
];

// ─────────────────────────────────────────────────────────────────────────────

const UserDashBoard = () => {
  const { auth } = useContext(AuthContext);
  const user_id = auth?.user?.id;
  const token = auth?.accessToken;

  const { data: accounts } = useFetch(
    user_id ? `/account/get-by-user/${user_id}` : null,
    token,
  );
  const { data: transactions } = useFetch(
    user_id ? `/transaction/get/user/${user_id}` : null,
    token,
  );

  const totalAccounts     = accounts?.length || 0;
  const totalTransactions = transactions?.length || 0;
  const deposits     = transactions?.filter((tx) => tx.transaction_type === "deposit")    || [];
  const withdrawals  = transactions?.filter((tx) => tx.transaction_type === "withdrawal") || [];
  const transfers    = transactions?.filter((tx) => tx.transaction_type === "transfer")   || [];
  const totalDeposits    = deposits.length;
  const totalWithdrawals = withdrawals.length;
  const totalTransfers   = transfers.length;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8" style={{ color: "#e2e8f0" }}>

      {/* ── Greeting ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <p className="text-sm text-slate-500 font-medium mb-0.5">{greeting()},</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {auth?.user?.firstname || "User"} <span className="text-amber-400">👋</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Here's what's happening with your finances today.</p>
        </div>
        <span className="text-xs text-slate-600 border border-slate-800 rounded-lg px-3 py-1.5 w-fit">
          {new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      {/* ── Quick Stats Bar ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {mockQuickStats.map(({ label, value, note, color }) => (
          <div
            key={label}
            className="rounded-2xl p-4 border"
            style={{
              background: "linear-gradient(135deg, #111827 0%, #0d1220 100%)",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">{label}</p>
            <p className="text-xl font-bold" style={{ color }}>{value}</p>
            <p className="text-xs text-slate-600 mt-1">{note}</p>
          </div>
        ))}
      </div>

      {/* ── Stat Cards ───────────────────────────────────────────────── */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-slate-600 font-semibold mb-4">
          Account Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            icon={<FaLayerGroup size={18} />}
            label="My Accounts"
            value={fmt(totalAccounts)}
            color="#f59e0b"
            sub="Active accounts"
          />
          <StatCard
            icon={<MdSwapHoriz size={20} />}
            label="Transactions"
            value={fmt(totalTransactions)}
            color="#38bdf8"
            sub="All time total"
          />
          <StatCard
            icon={<MdTrendingUp size={20} />}
            label="Total Deposits"
            value={fmt(totalDeposits)}
            color="#10b981"
            trend="up"
            sub="Inbound credits"
          />
          <StatCard
            icon={<MdTrendingDown size={20} />}
            label="Withdrawals"
            value={fmt(totalWithdrawals)}
            color="#f43f5e"
            trend="down"
            sub="Outbound debits"
          />
          <StatCard
            icon={<MdAccountBalanceWallet size={20} />}
            label="Transfers"
            value={fmt(totalTransfers)}
            color="#a78bfa"
            sub="Between accounts"
          />
        </div>
      </div>

      {/* ── Recent Activity ───────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
            Recent Activity
          </h2>
          <button className="text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium">
            View all →
          </button>
        </div>

        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #111827 0%, #0d1220 100%)",
            borderColor: "rgba(255,255,255,0.07)",
          }}
        >
          <ul className="divide-y divide-slate-800/60">
            {mockActivity.map((tx, i) => (
              <li
                key={tx.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-slate-800/30 transition-colors duration-150"
              >
                {/* Icon + label */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${typeBadge[tx.type]}`}
                  >
                    {typeIcon[tx.type]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{tx.label}</p>
                    <p className="text-xs text-slate-600">{tx.date}</p>
                  </div>
                </div>

                {/* Amount + badge */}
                <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: tx.color }}
                  >
                    {tx.amount}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border capitalize font-medium ${typeBadge[tx.type]}`}
                  >
                    {tx.type}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom Spacer for mobile nav ─────────────────────────────── */}
      <div className="h-4" />
    </div>
  );
};

export default UserDashBoard;