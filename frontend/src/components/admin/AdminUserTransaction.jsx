import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaExchangeAlt, FaSearch, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const AdminUserTransactions = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const { userId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = state?.user;

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data, loading, error } = useFetch(
    `/transaction/get/user/${userId}`,
    token
  );

  const transactions = data?.transactions ?? data ?? [];

  const filtered = transactions?.filter((tx) => {
    const matchesSearch =
      tx.description?.toLowerCase().includes(search.toLowerCase()) ||
      tx.from_acct_no?.includes(search) ||
      tx.to_acct_no?.includes(search);

    const matchesType =
      typeFilter === "all" || tx.transaction_type === typeFilter;

    return matchesSearch && matchesType;
  });

  const typeBadge = (type) => {
    switch (type) {
      case "transfer":   return "bg-purple-100 text-purple-700";
      case "deposit":    return "bg-green-100 text-green-700";
      case "withdrawal": return "bg-red-100 text-red-700";
      default:           return "bg-gray-100 text-gray-600";
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "pending":   return "bg-yellow-100 text-yellow-700";
      case "failed":    return "bg-red-100 text-red-600";
      default:          return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium text-sm transition"
        >
          <FaArrowLeft size={14} />
          Back to Users
        </button>

        <div className="h-5 w-px bg-gray-300" />

        {user && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow">
              {user.firstname?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {user.firstname} {user.lastname}
              </h1>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm w-64">
          <FaSearch size={13} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search description or account..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="text-sm bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm outline-none text-gray-700"
        >
          <option value="all">All Types</option>
          <option value="transfer">Transfer</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>

        <p className="text-sm text-gray-500 ml-auto">
          <span className="font-semibold text-blue-700">
            {filtered?.length ?? 0}
          </span>{" "}
          transaction{filtered?.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
          Failed to load transactions. Please try again.
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-800 text-white text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">From</th>
                <th className="px-5 py-4">To</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered?.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-400">
                    <FaExchangeAlt size={36} className="mx-auto mb-2 opacity-20" />
                    No transactions found
                  </td>
                </tr>
              ) : (
                filtered?.map((tx, index) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-blue-50 transition duration-150"
                  >
                    <td className="px-5 py-4 text-gray-400">{index + 1}</td>

                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${typeBadge(tx.transaction_type)}`}>
                        {tx.transaction_type}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-semibold text-gray-800">
                      ₦{Number(tx.amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                    </td>

                    <td className="px-5 py-4 text-gray-500 font-mono text-xs">
                      {tx.from_acct_no ?? "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-500 font-mono text-xs">
                      {tx.to_acct_no ?? "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-500 max-w-xs truncate">
                      {tx.description ?? "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(tx.createdAt).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserTransactions;