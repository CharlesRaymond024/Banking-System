import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AllTransactions = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, loading, error } = useFetch(
    `/transaction/get?page=${page}&limit=${limit}`,
    token,
  );

  const transactions = useMemo(() => {
    return data?.transactions || [];
  }, [data]);

  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 1;
  const totalTransactions = data?.totalTransactions || 0;

  const handleNext = () => {
    if (currentPage < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
        All Transactions
      </h1>

      {loading && <p className="text-gray-500 text-sm">Loading...</p>}
      {error && <p className="text-red-500 text-sm">Failed to load</p>}

      {!loading && !error && (
        <>
          {/* ✅ RESPONSIVE WRAPPER */}
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="min-w-[800px] w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="px-3 py-3">S/N</th>
                  <th className="px-3 py-3">Account</th>
                  <th className="px-3 py-3 hidden sm:table-cell">Account No</th>
                  <th className="px-3 py-3">Type</th>
                  <th className="px-3 py-3">Amount</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3 hidden md:table-cell">From</th>
                  <th className="px-3 py-3 hidden md:table-cell">To</th>
                  <th className="px-3 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {transactions.length > 0 ? (
                  transactions.map((trx, index) => (
                    <tr key={trx.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 font-medium">
                        {(currentPage - 1) * limit + index + 1}
                      </td>

                      <td className="px-3 py-3 font-medium truncate max-w-[120px]">
                        {trx.Account?.accountName || "—"}
                      </td>

                      <td className="px-3 py-3 hidden sm:table-cell">
                        {trx.account}
                      </td>

                      <td className="px-3 py-3 capitalize">
                        {trx.transaction_type}
                      </td>

                      <td className="px-3 py-3 font-semibold">${trx.amount}</td>

                      <td className="px-3 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            trx.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : trx.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {trx.status}
                        </span>
                      </td>

                      <td className="px-3 py-3 hidden md:table-cell">
                        {trx.from_acct_no || "—"}
                      </td>

                      <td className="px-3 py-3 hidden md:table-cell">
                        {trx.to_acct_no || "—"}
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() =>
                              navigate(`/transactions/get/${trx.id}`)
                            }
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <FaEye />
                          </button>

                          <button className="text-yellow-600 hover:text-yellow-800 text-sm">
                            <FaEdit />
                          </button>

                          <button className="text-red-600 hover:text-red-800 text-sm">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ✅ PAGINATION */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3">
            <p className="text-xs md:text-sm text-gray-600">
              Showing{" "}
              {totalTransactions === 0 ? 0 : (currentPage - 1) * limit + 1}–
              {(currentPage - 1) * limit + transactions.length} of{" "}
              {totalTransactions}
            </p>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllTransactions;
