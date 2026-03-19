import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaExchangeAlt, FaSearch, FaPrint } from "react-icons/fa";

const AdminTransactions = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const bankId = auth?.user?.bank;

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, loading, error } = useFetch(
    bankId ? `/transaction/get/bank/${bankId}` : null,
    token,
  );

  const transactions = data?.transactions ?? data ?? [];

  const filtered = transactions?.filter((tx) => {
    const matchesSearch =
      tx.description?.toLowerCase().includes(search.toLowerCase()) ||
      tx.from_acct_no?.includes(search) ||
      tx.to_acct_no?.includes(search) ||
      tx.account?.includes(search);
    const matchesType =
      typeFilter === "all" || tx.transaction_type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const typeBadge = (type) => {
    switch (type) {
      case "transfer":
        return "bg-purple-100 text-purple-700";
      case "deposit":
        return "bg-green-100 text-green-700";
      case "withdrawal":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handlePrint = (tx) => {
    const printWindow = window.open("", "_blank", "width=700,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Transaction Receipt</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; padding: 40px; color: #1f2937; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #1d4ed8; padding-bottom: 16px; }
            .header h1 { font-size: 22px; color: #1d4ed8; font-weight: bold; }
            .header p { font-size: 13px; color: #6b7280; margin-top: 4px; }
            .badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
            .completed { background: #dcfce7; color: #15803d; }
            .pending { background: #fef9c3; color: #a16207; }
            .failed { background: #fee2e2; color: #dc2626; }
            .transfer { background: #f3e8ff; color: #7e22ce; }
            .deposit { background: #dcfce7; color: #15803d; }
            .withdrawal { background: #fee2e2; color: #dc2626; }
            .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
            .row .label { color: #6b7280; }
            .row .value { font-weight: 600; color: #111827; }
            .amount { font-size: 28px; font-weight: bold; color: #1d4ed8; text-align: center; margin: 20px 0; }
            .section { margin-bottom: 24px; }
            .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em; margin-bottom: 12px; }
            .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Legion Bank</h1>
            <p>Official Transaction Receipt</p>
          </div>
          <div class="amount">
            ₦${Number(tx.amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </div>
          <div class="section">
            <div class="section-title">Transaction Details</div>
            <div class="row"><span class="label">Transaction ID</span><span class="value">#${tx.id}</span></div>
            <div class="row"><span class="label">Type</span><span class="value"><span class="badge ${tx.transaction_type}">${tx.transaction_type}</span></span></div>
            <div class="row"><span class="label">Status</span><span class="value"><span class="badge ${tx.status}">${tx.status}</span></span></div>
            <div class="row"><span class="label">Description</span><span class="value">${tx.description ?? "—"}</span></div>
            <div class="row"><span class="label">Date</span><span class="value">${new Date(tx.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</span></div>
          </div>
          <div class="section">
            <div class="section-title">Account Details</div>
            <div class="row"><span class="label">Account Number</span><span class="value">${tx.account ?? "—"}</span></div>
            <div class="row"><span class="label">From Account</span><span class="value">${tx.from_acct_no ?? "—"}</span></div>
            <div class="row"><span class="label">To Account</span><span class="value">${tx.to_acct_no ?? "—"}</span></div>
          </div>
          <div class="footer">
            <p>Thank you for banking with Legion Bank</p>
            <p>Generated on ${new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <p className="text-sm text-gray-400 mt-1">
          All transactions in your bank
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm col-span-1 sm:col-span-2 lg:col-span-2">
          <FaSearch size={13} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search account or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Type Filter */}
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

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm outline-none text-gray-700"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 mb-3">
        Showing{" "}
        <span className="font-semibold text-blue-700">
          {filtered?.length ?? 0}
        </span>{" "}
        transaction{filtered?.length !== 1 ? "s" : ""}
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
          Failed to load transactions. Please try again.
        </div>
      )}

      {/* Cards — mobile */}
      {!loading && !error && (
        <>
          {/* Mobile Cards */}
          <div className="flex flex-col gap-3 lg:hidden">
            {filtered?.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <FaExchangeAlt size={36} className="mx-auto mb-2 opacity-20" />
                No transactions found
              </div>
            ) : (
              filtered?.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3"
                >
                  {/* Top row */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize w-fit ${typeBadge(tx.transaction_type)}`}
                      >
                        {tx.transaction_type}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        #{tx.id} ·{" "}
                        {new Date(tx.createdAt).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      ₦
                      {Number(tx.amount).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div>
                      <p className="text-gray-400 mb-0.5">From</p>
                      <p className="font-mono font-medium text-gray-700">
                        {tx.from_acct_no ?? "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-0.5">To</p>
                      <p className="font-mono font-medium text-gray-700">
                        {tx.to_acct_no ?? "—"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400 mb-0.5">Description</p>
                      <p className="font-medium text-gray-700 truncate">
                        {tx.description ?? "—"}
                      </p>
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge(tx.status)}`}
                    >
                      {tx.status}
                    </span>
                    <button
                      onClick={() => handlePrint(tx)}
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 active:scale-95 transition-all duration-200 text-white text-xs font-medium px-3 py-1.5 rounded-lg"
                    >
                      <FaPrint size={11} />
                      Print
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-800 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-4">#</th>
                  <th className="px-4 py-4">Type</th>
                  <th className="px-4 py-4">Amount</th>
                  <th className="px-4 py-4">From → To</th>
                  <th className="px-4 py-4">Description</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4 text-center">Receipt</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filtered?.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-gray-400">
                      <FaExchangeAlt
                        size={36}
                        className="mx-auto mb-2 opacity-20"
                      />
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filtered?.map((tx, index) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-blue-50 transition duration-150"
                    >
                      <td className="px-4 py-4 text-gray-400">{index + 1}</td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${typeBadge(tx.transaction_type)}`}
                        >
                          {tx.transaction_type}
                        </span>
                      </td>

                      <td className="px-4 py-4 font-semibold text-gray-800 whitespace-nowrap">
                        ₦
                        {Number(tx.amount).toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                        })}
                      </td>

                      {/* Merged From → To column */}
                      <td className="px-4 py-4 text-gray-500 font-mono text-xs">
                        <span>{tx.from_acct_no ?? "—"}</span>
                        <span className="mx-1 text-gray-300">→</span>
                        <span>{tx.to_acct_no ?? "—"}</span>
                      </td>

                      <td className="px-4 py-4 text-gray-500 max-w-[160px] truncate">
                        {tx.description ?? "—"}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge(tx.status)}`}
                        >
                          {tx.status}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(tx.createdAt).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handlePrint(tx)}
                          className="flex items-center gap-2 mx-auto bg-gray-700 hover:bg-gray-800 active:scale-95 transition-all duration-200 text-white text-xs font-medium px-3 py-2 rounded-lg shadow"
                        >
                          <FaPrint size={11} />
                          Print
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminTransactions;
