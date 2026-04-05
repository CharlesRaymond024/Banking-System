import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import {
  FaUsers,
  FaExchangeAlt,
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaUserPlus,
  FaFileAlt,
  FaEllipsisH,
} from "react-icons/fa";
import { BsWallet2, BsBank2 } from "react-icons/bs";
import { MdTrendingUp } from "react-icons/md";

/* ── Mock activity feed ── */
const mockActivity = [
  {
    id: 1,
    type: "user",
    icon: <FaUserPlus size={13} className="text-blue-500" />,
    bg: "bg-blue-50",
    title: "New user registered",
    name: "Emeka Okafor",
    time: "2 mins ago",
    status: "new",
  },
  {
    id: 2,
    type: "report",
    icon: <FaFileAlt size={13} className="text-amber-500" />,
    bg: "bg-amber-50",
    title: "Report submitted",
    name: "Transaction dispute #4821",
    time: "14 mins ago",
    status: "pending",
  },
  {
    id: 3,
    type: "tx",
    icon: <FaExchangeAlt size={13} className="text-violet-500" />,
    bg: "bg-violet-50",
    title: "Transfer flagged",
    name: "₦450,000 — Acct 0198234411",
    time: "1 hr ago",
    status: "flagged",
  },
  {
    id: 4,
    type: "user",
    icon: <FaUserPlus size={13} className="text-blue-500" />,
    bg: "bg-blue-50",
    title: "New user registered",
    name: "Aisha Bello",
    time: "2 hrs ago",
    status: "new",
  },
  {
    id: 5,
    type: "report",
    icon: <FaFileAlt size={13} className="text-amber-500" />,
    bg: "bg-amber-50",
    title: "Report resolved",
    name: "Loan query #3390",
    time: "3 hrs ago",
    status: "resolved",
  },
];

/* ── Mock notifications ── */
const mockNotifications = [
  { id: 1, text: "3 new users need verification", time: "Just now", unread: true },
  { id: 2, text: "Transaction dispute escalated", time: "5 mins ago", unread: true },
  { id: 3, text: "System maintenance at 2:00 AM", time: "1 hr ago", unread: false },
  { id: 4, text: "Monthly report is ready", time: "Yesterday", unread: false },
];

const statusPill = (status) => {
  switch (status) {
    case "new":
      return "bg-blue-50 text-blue-600 ring-1 ring-blue-200";
    case "pending":
      return "bg-amber-50 text-amber-600 ring-1 ring-amber-200";
    case "flagged":
      return "bg-rose-50 text-rose-600 ring-1 ring-rose-200";
    case "resolved":
      return "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const CustomerCareDashBoard = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const bankId = auth?.user?.bank;
  const userName = auth?.user?.firstName ?? "Agent";

  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useFetch(bankId ? `/user/get-by-bank/${bankId}` : null, token);

  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
  } = useFetch(bankId ? `/transaction/get/bank/${bankId}` : null, token);

  const {
    data: accountsData,
    loading: accountsLoading,
    error: accountsError,
  } = useFetch(bankId ? `/account/get-by-bank/${bankId}` : null, token);

  const { data: bankData, loading: bankLoading } = useFetch(
    bankId ? `/bank/get/${bankId}` : null,
    token,
  );

  const cards = [
    {
      label: "Total Users",
      value: usersData?.length ?? "—",
      loading: usersLoading,
      error: usersError,
      icon: <FaUsers size={20} className="text-blue-600" />,
      iconBg: "bg-blue-50",
      trend: "+12 this week",
      trendUp: true,
    },
    {
      label: "Transactions",
      value:
        transactionsData?.transactions?.length ??
        transactionsData?.length ??
        "—",
      loading: transactionsLoading,
      error: transactionsError,
      icon: <FaExchangeAlt size={20} className="text-violet-600" />,
      iconBg: "bg-violet-50",
      trend: "+38 today",
      trendUp: true,
    },
    {
      label: "Total Accounts",
      value: accountsData?.length ?? "—",
      loading: accountsLoading,
      error: accountsError,
      icon: <BsWallet2 size={20} className="text-emerald-600" />,
      iconBg: "bg-emerald-50",
      trend: "+5 this week",
      trendUp: true,
    },
    {
      label: "Bank",
      value: bankLoading ? "—" : (bankData?.name ?? "—"),
      loading: bankLoading,
      error: null,
      icon: <BsBank2 size={20} className="text-amber-600" />,
      iconBg: "bg-amber-50",
      trend: "Active",
      trendUp: true,
    },
  ];

  return (
    <div className="min-h-full">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
            Overview
          </p>
          <h1
            className="text-2xl font-bold text-slate-800 tracking-tight"
            style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
          >
            Good morning, {userName} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Here's what's happening at your branch today.
          </p>
        </div>

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((p) => !p)}
            className="relative w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all shadow-sm"
          >
            <FaBell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-12 z-40 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
                <p className="text-sm font-semibold text-slate-700">
                  Notifications
                </p>
                <span className="text-xs text-slate-400">
                  {unreadCount} unread
                </span>
              </div>
              <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 flex items-start gap-3 ${
                      n.unread ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <span
                      className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                        n.unread ? "bg-blue-500" : "bg-slate-200"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-700 font-medium leading-snug">
                        {n.text}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-slate-50">
                <button className="text-xs text-green-600 font-semibold hover:text-green-800 transition-colors">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}
              >
                {card.icon}
              </div>
              <FaEllipsisH size={13} className="text-slate-300 mt-1" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                {card.label}
              </p>
              {card.loading ? (
                <div className="h-7 w-16 bg-slate-100 rounded-lg animate-pulse" />
              ) : card.error ? (
                <p className="text-sm text-rose-400 font-medium">Error</p>
              ) : (
                <p className="text-2xl font-bold text-slate-800 tabular-nums">
                  {card.value}
                </p>
              )}
              <div className="flex items-center gap-1 mt-2">
                <MdTrendingUp
                  size={13}
                  className={card.trendUp ? "text-emerald-500" : "text-rose-400"}
                />
                <span className="text-xs text-slate-400">{card.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Activity Feed ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
            <p className="text-sm font-semibold text-slate-700">
              Recent activity
            </p>
            <button className="text-xs text-green-600 font-semibold hover:text-green-800 transition-colors">
              View all
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {mockActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/60 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-600 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{item.name}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusPill(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[11px] text-slate-300 hidden sm:block">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats panel */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50">
            <p className="text-sm font-semibold text-slate-700">
              Today's summary
            </p>
          </div>
          <div className="p-5 space-y-4">
            {[
              {
                label: "Issues resolved",
                value: 14,
                icon: <FaCheckCircle size={14} className="text-emerald-500" />,
                bar: "bg-emerald-400",
                pct: 70,
              },
              {
                label: "Pending reports",
                value: 6,
                icon: <FaFileAlt size={14} className="text-amber-500" />,
                bar: "bg-amber-400",
                pct: 30,
              },
              {
                label: "Flagged transactions",
                value: 3,
                icon: <FaTimesCircle size={14} className="text-rose-500" />,
                bar: "bg-rose-400",
                pct: 15,
              },
              {
                label: "New users today",
                value: 8,
                icon: <FaUserPlus size={14} className="text-blue-500" />,
                bar: "bg-blue-400",
                pct: 40,
              },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    {s.icon}
                    <span className="text-xs text-slate-600 font-medium">
                      {s.label}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {s.value}
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.bar} rounded-full`}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mini calendar tag */}
          <div className="mx-5 mb-5 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest mb-0.5">
              Today
            </p>
            <p className="text-sm font-bold text-slate-700">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCareDashBoard;