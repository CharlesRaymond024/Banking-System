const SuperAdminDashboard = () => {

  const stats = {
    totalUsers: 1200,
    totalAdmins: 12,
    totalTransactions: 5400,
    totalAccounts: 1300,
  };

  return (
    <div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Users */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {stats.totalUsers}
          </p>
        </div>

        {/* Admins */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm">Total Admins</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {stats.totalAdmins}
          </p>
        </div>

        {/* Transactions */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm">Transactions</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {stats.totalTransactions}
          </p>
        </div>

        {/* Accounts */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm">Total Accounts</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {stats.totalAccounts}
          </p>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminDashboard;