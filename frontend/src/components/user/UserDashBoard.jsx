import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";

const UserDashBoard = () => {
  const { auth } = useContext(AuthContext);

  const user_id = auth?.user?.id;
  const token = auth?.accessToken;

  // Get accounts
  const { data: accounts } = useFetch(
    user_id ? `/account/get-by-user/${user_id}` : null,
    token,
  );

  // Get user transactions
  const { data: transactions } = useFetch(
    user_id ? `/transaction/get/user/${user_id}` : null,
    token,
  );

  const totalAccounts = accounts?.length || 0;
  const totalTransactions = transactions?.length || 0;

  // Filter transaction types
  const deposits =
    transactions?.filter((tx) => tx.transaction_type === "deposit") || [];

  const withdrawals =
    transactions?.filter((tx) => tx.transaction_type === "withdrawal") || [];

  const transfers =
    transactions?.filter((tx) => tx.transaction_type === "transfer") || [];

  // Total number of each transaction type
  const totalDeposits = deposits.length;
  const totalWithdrawals = withdrawals.length;
  const totalTransfers = transfers.length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Accounts */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">My Accounts</h3>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {totalAccounts}
          </p>
        </div>

        {/* Transactions */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">Transactions</h3>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {totalTransactions}
          </p>
        </div>

        {/* Deposits */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">Total Deposits</h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {totalDeposits.toLocaleString()}
          </p>
        </div>

        {/* Withdrawals */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">Total Withdrawals</h3>

          <p className="text-3xl font-bold text-red-500 mt-2">
            {totalWithdrawals.toLocaleString()}
          </p>
        </div>

        {/* Transfers */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">Total Transfers</h3>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {totalTransfers.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
