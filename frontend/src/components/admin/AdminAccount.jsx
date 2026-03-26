import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { BsWallet2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AdminAccount = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const bankId = auth?.user?.bank;
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const {
    data: accountsData,
    loading,
    error,
  } = useFetch(bankId ? `/account/get-by-bank/${bankId}` : null, token);

  const accounts = accountsData ?? [];

  const filtered = accounts.filter((acc) => {
    const matchesSearch =
      acc.accountName?.toLowerCase().includes(search.toLowerCase()) ||
      acc.accountNumber?.includes(search);
    const matchesType = typeFilter === "all" || acc.accountType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Accounts</h1>
        <p className="text-sm text-gray-400 mt-1">
          All accounts under your bank
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm sm:col-span-2">
          <FaSearch size={13} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by account name or number..."
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
          <option value="savings">Savings</option>
          <option value="current">Current</option>
        </select>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 mb-3">
        Showing{" "}
        <span className="font-semibold text-blue-700">
          {filtered?.length ?? 0}
        </span>{" "}
        account{filtered?.length !== 1 ? "s" : ""}
      </p>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
          Failed to load accounts. Please try again.
        </div>
      )}

      {/* Table */}
      {/* Table */}
      {!loading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-800 text-white text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Account Name</th>
                <th className="px-5 py-4">Account Number</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Owner</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-400">
                    <BsWallet2 size={36} className="mx-auto mb-2 opacity-20" />
                    No accounts found
                  </td>
                </tr>
              ) : (
                filtered?.map((acc, index) => (
                  <tr
                    key={acc.id}
                    className="hover:bg-blue-50 transition duration-150"
                  >
                    <td className="px-5 py-4 text-gray-400">{index + 1}</td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs shadow shrink-0">
                          {acc.accountName?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-700 truncate">
                          {acc.accountName}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-mono text-gray-500 text-xs">
                      {acc.accountNumber}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          acc.accountType === "savings"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {acc.accountType}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-500 text-xs">
                      {acc.user?.firstname
                        ? `${acc.user.firstname} ${acc.user.lastname}`
                        : (acc.user ?? "—")}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          acc.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {acc.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => navigate(`/admin/accounts/get/${acc.id}`)} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow">
                          <FaEye size={11} />
                          View
                        </button>

                        <button
                        onClick={() => navigate(`/admin/accounts/update/${acc.id}`)}
                        className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 transition-all text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow">
                          <FaEdit size={11} />
                          Edit
                        </button>

                        <button className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 active:scale-95 transition-all text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow">
                          <FaTrash size={11} />
                          Delete
                        </button>
                      </div>
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

export default AdminAccount;
