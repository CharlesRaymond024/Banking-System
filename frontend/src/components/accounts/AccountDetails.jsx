import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Spinner from "../../assets/spinner.gif";

const AccountDetails = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [showBalance, setShowBalance] = useState(true);

  if (!auth || !auth.user?.id) {
    return <p className="text-gray-700 text-center mt-6">Loading account...</p>;
  }

  const user_id = auth.user.id;

  const {
    data: accounts,
    loading,
    error,
  } = useFetch(`/account/get-by-user/${user_id}`, auth?.accessToken);

  const account = accounts?.[0]; // assume 1 account per user

  if (loading)
    return <img src={Spinner} alt="Loading..." className="w-16 h-16 mx-auto" />;

  if (error) {
    return (
      <p className="text-red-500 text-center mt-6">
        Failed to load account details
      </p>
    );
  }

  if (!account) {
    return (
      <p className="text-gray-700 text-center mt-4">
        No account found for this user.
      </p>
    );
  }

  

  return (
    <div className="px-4 md:px-0">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-yellow-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300"
      >
        ← Back
      </button>

      {/* Account Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-green-700">
          Account Details
        </h2>

        <div className="space-y-4 text-gray-800">
          {/* Account Name */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-medium text-gray-600 mb-1">Account Name</p>
            <p className="text-lg font-semibold">{account.accountName}</p>
          </div>

          {/* Account Number */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-medium text-gray-600 mb-1">Account Number</p>
            <p className="text-lg font-semibold">{account.accountNumber}</p>
          </div>

          {/* Balance */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-600 mb-1">Balance</p>
              <p className="text-lg font-semibold">
                {showBalance
                  ? `$${account.balance.toLocaleString()}`
                  : "******"}
              </p>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-600 hover:text-gray-900"
              aria-label={showBalance ? "Hide Balance" : "Show Balance"}
            >
              {showBalance ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>

          {/* Status */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
            <p className="font-medium text-gray-600 mb-0">Status</p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                account.isSuspended
                  ? "bg-red-100 text-red-700"
                  : account.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {account.isSuspended
                ? "Suspended"
                : account.isActive
                  ? "Active"
                  : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
