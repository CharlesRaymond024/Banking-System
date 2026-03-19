import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";

const SuperAdminDashboard = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useFetch("/user/get", token);
  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
  } = useFetch("/transaction/get", token);
  //console.log("Transactions data:", transactionsData);
  const {
    data: adminsData,
    loading: adminsLoading,
    error: adminsError,
  } = useFetch("/user/get-by-role/Admin", token);
  const {
    data: accountsData,
    loading: accountsLoading,
    error: accountsError,
  } = useFetch("/account/get", token);

  const stats = {
    totalUsers: usersData?.length ?? "—",
    totalAdmins: adminsData?.length ?? "—",
    totalTransactions: transactionsData?.transactions?.length ?? "—", // ← fix,
    totalAccounts: accountsData?.length ?? "—",
  };

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      loading: usersLoading,
      error: usersError,
    },
    {
      label: "Total Admins",
      value: stats.totalAdmins,
      loading: adminsLoading,
      error: adminsError,
    },
    {
      label: "Transactions",
      value: stats.totalTransactions,
      loading: transactionsLoading,
      error: transactionsError,
    },
    {
      label: "Total Accounts",
      value: stats.totalAccounts,
      loading: accountsLoading,
      error: accountsError,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm">{card.label}</h3>

            {card.loading ? (
              <p className="text-3xl font-bold text-green-700 mt-2 animate-pulse">
                ...
              </p>
            ) : card.error ? (
              <p className="text-sm text-red-500 mt-2">Failed to load</p>
            ) : (
              <p className="text-3xl font-bold text-green-700 mt-2">
                {card.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
