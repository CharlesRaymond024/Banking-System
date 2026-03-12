import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import Spinner from "../../assets/spinner.gif";

import { FaArrowUp, FaArrowDown, FaExchangeAlt } from "react-icons/fa";

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
      <p className="text-red-500 text-center mt-6">
        Failed to load transactions
      </p>
    );
  }

  

  const recentTransactions = transactions?.slice(0, 5);

  const getIcon = (type) => {
    if (type === "deposit") return <FaArrowDown className="text-green-600" />;
    if (type === "withdrawal") return <FaArrowUp className="text-red-500" />;
    return <FaExchangeAlt className="text-blue-500" />;
  };

  const getAmountColor = (type) => {
    if (type === "deposit") return "text-green-600";
    if (type === "withdrawal") return "text-red-500";
    return "text-blue-600";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Transaction History
      </h1>

      {/* RECENT TRANSACTIONS BOX */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Transactions
        </h2>

        {loading ? (
          <div className="flex justify-center py-8 items-center">
            <img src={Spinner} alt="Loading..." className="w-10 h-10" />
          </div>
        ) : (
          <div className="space-y-4">
            {recentTransactions && recentTransactions.length > 0 ? (
              recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xl">
                      {getIcon(tx.transaction_type)}
                    </div>

                    <div>
                      <p className="font-medium capitalize">
                        {tx.transaction_type}
                      </p>

                      <p className="text-xs text-gray-500">{tx.description}</p>
                    </div>
                  </div>

                  <p
                    className={`font-semibold ${getAmountColor(
                      tx.transaction_type,
                    )}`}
                  >
                    ₦{tx.amount?.toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center p-6">
                No recent transactions
              </p>
            )}
          </div>
        )}
      </div>

      {/* FULL TRANSACTION TABLE */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Account</th>
              <th className="p-4">Type</th>
              <th className="p-4">Amount</th>
              <th className="p-4">To Account</th>
              <th className="p-4">Status</th>
              <th className="p-4">User</th>
              <th className="p-4">Description</th>
            </tr>
          </thead>

          <tbody>
            {transactions && transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.id} className="border-t hover:bg-gray-50">
                  {/* Account */}
                  <td className="p-4 font-medium">{tx.from_acct_no || "-"}</td>

                  {/* Type */}
                  <td className="p-4 flex items-center gap-2 capitalize">
                    {getIcon(tx.transaction_type)}
                    {tx.transaction_type}
                  </td>

                  {/* Amount */}
                  <td
                    className={`p-4 font-semibold ${getAmountColor(
                      tx.transaction_type,
                    )}`}
                  >
                    ₦{tx.amount?.toLocaleString()}
                  </td>

                  {/* To Account */}
                  <td className="p-4">{tx.to_acct_no || "-"}</td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tx.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : tx.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>

                  {/* User */}
                  <td className="p-4">
                    {tx.User?.firstname} {tx.User?.lastname}
                  </td>

                  {/* Description */}
                  <td className="p-4 text-gray-500 text-sm">
                    {tx.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTransactions;
