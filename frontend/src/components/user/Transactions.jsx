import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import Spinner from "../../assets/spinner.gif";
import { FaArrowUp, FaArrowDown, FaExchangeAlt } from "react-icons/fa";
import { MdOutlineReceiptLong } from "react-icons/md";

const UserTransactions = () => {
  const { auth } = useContext(AuthContext);
  const user_id = auth?.user?.id;

  const {
    data: transactions,
    loading,
    error,
  } = useFetch(
    user_id ? `/transaction/get/user/${user_id}` : null,
    auth?.accessToken,
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <span className="text-red-400 text-xl">!</span>
        </div>
        <p className="text-red-400 text-sm font-medium">
          Failed to load transactions
        </p>
        <p className="text-slate-600 text-xs">Please try refreshing the page</p>
      </div>
    );
  }

  const recentTransactions = transactions?.slice(0, 5);

  const getIcon = (type) => {
    if (type === "deposit")
      return <FaArrowDown size={13} className="text-emerald-400" />;
    if (type === "withdrawal")
      return <FaArrowUp size={13} className="text-red-400" />;
    return <FaExchangeAlt size={13} className="text-sky-400" />;
  };

  const getTypeMeta = (type) => {
    if (type === "deposit")
      return {
        color: "#10b981",
        bg: "rgba(16,185,129,0.1)",
        border: "rgba(16,185,129,0.2)",
        text: "text-emerald-400",
      };
    if (type === "withdrawal")
      return {
        color: "#f43f5e",
        bg: "rgba(244,63,94,0.1)",
        border: "rgba(244,63,94,0.2)",
        text: "text-red-400",
      };
    return {
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.1)",
      border: "rgba(56,189,248,0.2)",
      text: "text-sky-400",
    };
  };

  const getStatusStyle = (status) => {
    if (status === "completed")
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (status === "pending")
      return "bg-amber-500/10  text-amber-400  border-amber-500/20";
    return "bg-red-500/10    text-red-400    border-red-500/20";
  };

  const cardBase = {
    background: "linear-gradient(135deg, #111827 0%, #0d1220 100%)",
    borderColor: "rgba(255,255,255,0.07)",
  };

  const LoadingCell = ({ colSpan }) => (
    <tr>
      <td colSpan={colSpan} className="py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src={Spinner} alt="Loading..." className="w-8 h-8 opacity-70" />
          <span className="text-xs text-slate-600">Loading transactions…</span>
        </div>
      </td>
    </tr>
  );

  const EmptyCell = ({ colSpan, message }) => (
    <tr>
      <td colSpan={colSpan} className="py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl border border-slate-800 bg-slate-900 flex items-center justify-center">
            <MdOutlineReceiptLong size={22} className="text-slate-700" />
          </div>
          <p className="text-slate-600 text-sm">{message}</p>
        </div>
      </td>
    </tr>
  );

  return (
    <div
      className="space-y-8 pb-20 md:pb-6"
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        color: "#e2e8f0",
      }}
    >
      {/* ── Page Title ─────────────────────────────────────────────── */}
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-600 font-semibold mb-1">
          Finance
        </p>
        <h1
          className="text-2xl md:text-3xl font-bold text-white tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Transaction History
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          A complete record of all your account activity.
        </p>
      </div>

      {/* ── Recent Transactions ────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
            Recent Activity
          </h2>
          <span className="text-xs text-slate-700 border border-slate-800 rounded-lg px-2.5 py-1">
            Last 5
          </span>
        </div>

        <div className="rounded-2xl border overflow-hidden" style={cardBase}>
          {loading ? (
            <div className="flex justify-center items-center py-12 gap-3">
              <img
                src={Spinner}
                alt="Loading..."
                className="w-8 h-8 opacity-70"
              />
              <span className="text-xs text-slate-600">
                Fetching recent transactions…
              </span>
            </div>
          ) : recentTransactions && recentTransactions.length > 0 ? (
            <ul className="divide-y divide-slate-800/60">
              {recentTransactions.map((tx) => {
                const meta = getTypeMeta(tx.transaction_type);
                return (
                  <li
                    key={tx.id}
                    className="flex items-center justify-between px-5 py-4 hover:bg-slate-800/30 transition-colors duration-150"
                  >
                    {/* Left */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0"
                        style={{
                          background: meta.bg,
                          borderColor: meta.border,
                        }}
                      >
                        {getIcon(tx.transaction_type)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-200 capitalize">
                          {tx.transaction_type}
                        </p>
                        <p className="text-xs text-slate-600 truncate max-w-[180px]">
                          {tx.description || "—"}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                      <span className={`text-sm font-bold ${meta.text}`}>
                        {tx.transaction_type === "withdrawal" ? "-" : "+"}₦
                        {tx.amount?.toLocaleString()}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border capitalize font-medium ${getStatusStyle(tx.status)}`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <MdOutlineReceiptLong size={28} className="text-slate-700" />
              <p className="text-slate-600 text-sm">No recent transactions</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Full Transaction Table ──────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
            All Transactions
          </h2>
          {transactions?.length > 0 && (
            <span className="text-xs text-slate-700 border border-slate-800 rounded-lg px-2.5 py-1">
              {transactions.length} total
            </span>
          )}
        </div>

        {/* Scrollable table wrapper */}
        <div className="rounded-2xl border overflow-hidden" style={cardBase}>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[720px]">
              {/* Head */}
              <thead>
                <tr
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {[
                    "Account",
                    "Type",
                    "Amount",
                    "To Account",
                    "Status",
                    "User",
                    "Description",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-[10px] uppercase tracking-widest font-semibold text-slate-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {loading ? (
                  <LoadingCell colSpan={7} />
                ) : transactions && transactions.length > 0 ? (
                  transactions.map((tx, idx) => {
                    const meta = getTypeMeta(tx.transaction_type);
                    return (
                      <tr
                        key={tx.id}
                        className="border-t transition-colors duration-150 hover:bg-slate-800/30"
                        style={{ borderColor: "rgba(255,255,255,0.05)" }}
                      >
                        {/* Account */}
                        <td className="px-5 py-4">
                          <span className="text-xs font-mono text-slate-400 bg-slate-800/60 border border-slate-700/50 rounded-lg px-2.5 py-1">
                            {tx.from_acct_no || "—"}
                          </span>
                        </td>

                        {/* Type */}
                        <td className="px-5 py-4">
                          <div
                            className="flex items-center gap-2 w-fit px-2.5 py-1 rounded-xl border text-xs font-semibold capitalize"
                            style={{
                              background: meta.bg,
                              borderColor: meta.border,
                              color: meta.color,
                            }}
                          >
                            {getIcon(tx.transaction_type)}
                            {tx.transaction_type}
                          </div>
                        </td>

                        {/* Amount */}
                        <td
                          className={`px-5 py-4 text-sm font-bold ${meta.text}`}
                        >
                          {tx.transaction_type === "withdrawal" ? "-" : "+"}₦
                          {tx.amount?.toLocaleString()}
                        </td>

                        {/* To Account */}
                        <td className="px-5 py-4">
                          {tx.to_acct_no ? (
                            <span className="text-xs font-mono text-slate-400 bg-slate-800/60 border border-slate-700/50 rounded-lg px-2.5 py-1">
                              {tx.to_acct_no}
                            </span>
                          ) : (
                            <span className="text-slate-700">—</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold capitalize ${getStatusStyle(tx.status)}`}
                          >
                            {tx.status}
                          </span>
                        </td>

                        {/* User */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                              style={{
                                background: "rgba(16,185,129,0.15)",
                                color: "#10b981",
                              }}
                            >
                              {tx.User?.firstname?.charAt(0)?.toUpperCase() ||
                                "?"}
                            </div>
                            <span className="text-xs text-slate-400 truncate max-w-[100px]">
                              {tx.User?.firstname} {tx.User?.lastname}
                            </span>
                          </div>
                        </td>

                        {/* Description */}
                        <td className="px-5 py-4 text-xs text-slate-600 max-w-[160px] truncate">
                          {tx.description || "—"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <EmptyCell colSpan={7} message="No transactions found" />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTransactions;
