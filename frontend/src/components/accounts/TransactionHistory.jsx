import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaExchangeAlt,
  FaSearch,
  FaEye,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaRandom,
} from "react-icons/fa";

const TransactionHistory = () => {
  const { account, loading: accountLoading } = useOutletContext();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = auth?.accessToken;

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const accountData = Array.isArray(account) ? account[0] : account;
  const account_id = accountData?.id;

  const { data, loading, error } = useFetch(
    account_id ? `/transaction/get/account/${account_id}` : null,
    accessToken,
  );

  const transactions = data?.transactions ?? data ?? [];

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.account?.includes(search) ||
      tx.from_acct_no?.includes(search) ||
      String(tx.amount).includes(search);
    const matchesType =
      typeFilter === "all" || tx.transaction_type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const typeMeta = (type) => {
    switch (type) {
      case "deposit":
        return {
          cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
          icon: <FaArrowDown size={10} />,
        };
      case "withdrawal":
        return {
          cls: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
          icon: <FaArrowUp size={10} />,
        };
      case "transfer":
        return {
          cls: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
          icon: <FaRandom size={10} />,
        };
      default:
        return { cls: "bg-gray-100 text-gray-600", icon: null };
    }
  };

  const statusMeta = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
      case "failed":
        return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const amountColor = (type) => {
    if (type === "deposit") return "text-emerald-600";
    if (type === "withdrawal") return "text-rose-600";
    return "text-gray-800";
  };

  if (accountLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400 animate-pulse">Loading account…</p>
      </div>
    );
  }

  return (
    <div className="px-1 py-2">
      {/* ── Header ── */}
      <div className="mb-6 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Transaction history
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            All your account transactions
          </p>
        </div>

        {/* summary pill */}
        <span className="text-xs font-medium bg-green-50 text-green-700 ring-1 ring-green-200 px-3 py-1.5 rounded-full self-center">
          {transactions.length} total
        </span>
      </div>

      {/* ── Filters ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {/* Search */}
        <div className="lg:col-span-2 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-green-300 focus-within:border-green-400 transition-all">
          <FaSearch size={13} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by account or amount…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm outline-none w-full text-gray-700 placeholder-gray-400 bg-transparent"
          />
        </div>

        {/* Type */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-4 py-2.5 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
        >
          <option value="all">All types</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="transfer">Transfer</option>
        </select>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-4 py-2.5 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
        >
          <option value="all">All status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* ── States ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 animate-pulse">
            Loading transactions…
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
            <FaExchangeAlt size={20} className="text-rose-400" />
          </div>
          <p className="text-sm font-medium text-gray-700">
            Failed to load transactions
          </p>
          <p className="text-xs text-gray-400">
            Please check your connection and try again.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <FaExchangeAlt size={22} className="opacity-30" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            No transactions found
          </p>
          <p className="text-xs text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-600">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-white/80 uppercase tracking-wider w-10">
                    #
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-white/80 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-white/80 uppercase tracking-wider hidden md:table-cell">
                    From → To
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-white/80 uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                  <th className="px-5 py-3.5 text-center text-xs font-semibold text-white/80 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filtered.map((tx, index) => {
                  const { cls: typeCls, icon: typeIcon } = typeMeta(
                    tx.transaction_type,
                  );
                  return (
                    <tr
                      key={tx.id}
                      className="hover:bg-gray-50/70 transition-colors group"
                    >
                      {/* # */}
                      <td className="px-5 py-4 text-xs text-gray-400 font-medium">
                        {index + 1}
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeCls}`}
                        >
                          {typeIcon}
                          {tx.transaction_type}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4 text-right">
                        <span
                          className={`font-semibold text-sm tabular-nums ${amountColor(
                            tx.transaction_type,
                          )}`}
                        >
                          ₦{Number(tx.amount).toLocaleString()}
                        </span>
                      </td>

                      {/* From → To */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="font-mono text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                          {tx.from_acct_no ?? "—"}&nbsp;→&nbsp;
                          {tx.to_acct_no ?? "—"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusMeta(
                            tx.status,
                          )}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              tx.status === "completed"
                                ? "bg-emerald-500"
                                : tx.status === "pending"
                                  ? "bg-amber-500"
                                  : "bg-rose-500"
                            }`}
                          />
                          {tx.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="text-xs text-gray-500">
                          {new Date(tx.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            title="View details"
                            onClick={() =>
                              navigate(
                                `${location.pathname.replace(/\/$/, "")}/${tx.id}`,
                                { state: tx },
                              )
                            }
                            className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-700 transition-all border border-blue-100"
                          >
                            <FaEye size={13} />
                          </button>
                          <button
                            title="Delete"
                            className="p-2 rounded-lg bg-rose-50 text-rose-400 hover:bg-rose-100 hover:text-rose-600 transition-all border border-rose-100"
                          >
                            <FaTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50">
            <p className="text-xs text-gray-400">
              Showing{" "}
              <span className="font-medium text-gray-600">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-600">
                {transactions.length}
              </span>{" "}
              transactions
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
