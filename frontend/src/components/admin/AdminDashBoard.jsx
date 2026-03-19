import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { FaUsers, FaExchangeAlt } from "react-icons/fa";
import { BsWallet2 } from "react-icons/bs";
import { MdAccountBalance } from "react-icons/md";

const AdminDashboard = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const bankId = auth?.user?.bank;

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
      icon: <FaUsers size={22} className="text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "Transactions",
      value:
        transactionsData?.transactions?.length ??
        transactionsData?.length ??
        "—",
      loading: transactionsLoading,
      error: transactionsError,
      icon: <FaExchangeAlt size={22} className="text-purple-600" />,
      bg: "bg-purple-50",
    },
    {
      label: "Total Accounts",
      value: accountsData?.length ?? "—",
      loading: accountsLoading,
      error: accountsError,
      icon: <BsWallet2 size={22} className="text-green-600" />,
      bg: "bg-green-50",
    },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-blue-800 text-white rounded-2xl p-6 mb-6 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {auth?.user?.firstname}!
          </h1>
          <p className="text-blue-200 text-sm mt-1">
            Here's what's happening in your bank today.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
          <MdAccountBalance size={20} />
          {bankLoading ? (
            <span className="text-sm animate-pulse">Loading...</span>
          ) : (
            <span className="text-sm font-semibold">
              {bankData?.name ?? `Bank ID: ${bankId}`}
            </span>
          )}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`${card.bg} p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4`}
          >
            <div className="p-3 bg-white rounded-xl shadow-sm">{card.icon}</div>

            <div>
              <p className="text-gray-500 text-sm">{card.label}</p>

              {card.loading ? (
                <p className="text-2xl font-bold text-gray-800 mt-1 animate-pulse">
                  ...
                </p>
              ) : card.error ? (
                <p className="text-sm text-red-500 mt-1">Failed to load</p>
              ) : (
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {card.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
