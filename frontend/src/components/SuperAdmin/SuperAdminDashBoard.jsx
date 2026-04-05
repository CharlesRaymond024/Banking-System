import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { FaUsers, FaExchangeAlt } from "react-icons/fa";
import { MdAdminPanelSettings, MdAccountBalance } from "react-icons/md";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const txVolumeData = [
  { month: "Nov", credits: 3200, debits: 2100 },
  { month: "Dec", credits: 3800, debits: 2600 },
  { month: "Jan", credits: 4100, debits: 2900 },
  { month: "Feb", credits: 3600, debits: 2400 },
  { month: "Mar", credits: 4700, debits: 3100 },
  { month: "Apr", credits: 5200, debits: 3800 },
];

const userGrowthData = [
  { month: "Nov", users: 3200 },
  { month: "Dec", users: 3490 },
  { month: "Jan", users: 3780 },
  { month: "Feb", users: 4010 },
  { month: "Mar", users: 4450 },
  { month: "Apr", users: 4821 },
];

const recentTransactions = [
  { id: "TXN-00123", user: "Amara Okonkwo", amount: "₦182,000", type: "Credit", status: "Completed", date: "Apr 9, 2026" },
  { id: "TXN-00122", user: "Kemi Adeyemi",   amount: "₦45,500",  type: "Debit",  status: "Pending",   date: "Apr 9, 2026" },
  { id: "TXN-00121", user: "Jide Babatunde", amount: "₦310,000", type: "Credit", status: "Completed", date: "Apr 8, 2026" },
  { id: "TXN-00120", user: "Taiwo Fashola",  amount: "₦9,800",   type: "Debit",  status: "Failed",    date: "Apr 8, 2026" },
  { id: "TXN-00119", user: "Ngozi Chukwu",   amount: "₦67,250",  type: "Credit", status: "Completed", date: "Apr 7, 2026" },
  { id: "TXN-00118", user: "Emeka Nwosu",    amount: "₦120,000", type: "Debit",  status: "Completed", date: "Apr 7, 2026" },
];

const topUsers = [
  { name: "Amara Okonkwo", txCount: 142, volume: "₦2.4M", initials: "AO", color: "bg-blue-100 text-blue-700" },
  { name: "Kemi Adeyemi",  txCount: 118, volume: "₦1.9M", initials: "KA", color: "bg-purple-100 text-purple-700" },
  { name: "Jide Babatunde",txCount: 97,  volume: "₦1.6M", initials: "JB", color: "bg-teal-100 text-teal-700" },
  { name: "Ngozi Chukwu",  txCount: 85,  volume: "₦1.1M", initials: "NC", color: "bg-amber-100 text-amber-700" },
  { name: "Taiwo Fashola", txCount: 74,  volume: "₦890K", initials: "TF", color: "bg-rose-100 text-rose-700" },
];

const txStatusData = [
  { label: "Completed", pct: 78, color: "bg-emerald-500" },
  { label: "Pending",   pct: 14, color: "bg-amber-400" },
  { label: "Failed",    pct: 8,  color: "bg-red-400" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatCard = ({ label, value, loading, error, icon: Icon, accent }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
      {loading ? (
        <div className="h-7 w-16 bg-slate-100 rounded animate-pulse" />
      ) : error ? (
        <p className="text-sm text-red-500 font-medium">Failed to load</p>
      ) : (
        <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
      )}
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">{children}</h2>
);

const statusStyle = {
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Pending:   "bg-amber-50 text-amber-700 border border-amber-200",
  Failed:    "bg-red-50 text-red-600 border border-red-200",
};

const typeStyle = {
  Credit: "text-emerald-600 font-semibold",
  Debit:  "text-red-500 font-semibold",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="font-semibold text-slate-600 mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const SuperAdminDashboard = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;

  const { data: usersData,        loading: usersLoading,        error: usersError        } = useFetch("/user/get", token);
  const { data: transactionsData, loading: transactionsLoading, error: transactionsError } = useFetch("/transaction/get", token);
  const { data: adminsData,       loading: adminsLoading,       error: adminsError       } = useFetch("/user/get-by-role/Admin", token);
  const { data: accountsData,     loading: accountsLoading,     error: accountsError     } = useFetch("/account/get", token);

  const stats = {
    totalUsers:        usersData?.totalUsers         ?? "—",
    totalAdmins:       adminsData?.length            ?? "—",
    totalTransactions: transactionsData?.totalTransactions ?? "—",
    totalAccounts:     accountsData?.length          ?? "—",
  };

  const cards = [
    { label: "Total Users",     value: stats.totalUsers,        loading: usersLoading,        error: usersError,        icon: FaUsers,             accent: "bg-blue-500" },
    { label: "Total Admins",    value: stats.totalAdmins,       loading: adminsLoading,        error: adminsError,       icon: MdAdminPanelSettings, accent: "bg-purple-500" },
    { label: "Transactions",    value: stats.totalTransactions, loading: transactionsLoading,  error: transactionsError, icon: FaExchangeAlt,       accent: "bg-emerald-600" },
    { label: "Total Accounts",  value: stats.totalAccounts,     loading: accountsLoading,      error: accountsError,     icon: MdAccountBalance,    accent: "bg-amber-500" },
  ];

  return (
    <div className="space-y-8">

      {/* ── Page Heading ─────────────────────────────────────── */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Overview</h1>
        <p className="text-sm text-slate-400 mt-0.5">Welcome back — here's what's happening today.</p>
      </div>

      {/* ── Stat Cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => <StatCard key={card.label} {...card} />)}
      </div>

      {/* ── Charts Row ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Transaction Volume */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <SectionTitle>Transaction Volume — Last 6 Months</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={txVolumeData} barSize={14} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
              <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 12, color: "#64748b" }} />
              <Bar dataKey="credits" name="Credits" fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="debits"  name="Debits"  fill="#e11d48" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <SectionTitle>User Growth</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(1)}K`} domain={["auto", "auto"]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="users" name="Users" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 3, fill: "#7c3aed" }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bottom Row ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <SectionTitle>Recent Transactions</SectionTitle>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {["ID", "User", "Amount", "Type", "Status", "Date"].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 px-2 pb-2 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-2 py-3 font-mono text-xs text-slate-400">{tx.id}</td>
                    <td className="px-2 py-3 font-medium text-slate-700 whitespace-nowrap">{tx.user}</td>
                    <td className="px-2 py-3 font-semibold text-slate-800">{tx.amount}</td>
                    <td className={`px-2 py-3 text-xs ${typeStyle[tx.type]}`}>{tx.type}</td>
                    <td className="px-2 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-400 whitespace-nowrap">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Top Active Users */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <SectionTitle>Top Active Users</SectionTitle>
            <div className="space-y-3">
              {topUsers.map((u, i) => (
                <div key={u.name} className="flex items-center gap-3">
                  <span className="text-xs text-slate-300 font-bold w-4 shrink-0">{i + 1}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${u.color}`}>
                    {u.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{u.name}</p>
                    <p className="text-[10px] text-slate-400">{u.txCount} transactions</p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 shrink-0">{u.volume}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Status Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <SectionTitle>Transaction Status</SectionTitle>
            <div className="space-y-3">
              {txStatusData.map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 font-medium">{label}</span>
                    <span className="text-slate-700 font-bold">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SuperAdminDashboard;