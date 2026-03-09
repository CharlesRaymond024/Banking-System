import { Outlet, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";

const SuperAdminDashboardLayout = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-10">Legion Bank</h1>

        <nav className="flex flex-col gap-4">
          <NavLink
            to="/superadmin"
            className="hover:bg-green-700 p-4 rounded transition duration-500"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/superadmin/users"
            className="hover:bg-green-700 p-4 rounded transition duration-500"
          >
            Users
          </NavLink>

          <NavLink
            to="/superadmin/admins"
            className="hover:bg-green-700 p-4 rounded transition duration-500"
          >
            Admins
          </NavLink>

          <NavLink
            to="/superadmin/transactions"
            className="hover:bg-green-700 p-4 rounded transition duration-500"
          >
            Transactions
          </NavLink>

          <NavLink
            to="/superadmin/support"
            className="hover:bg-green-700 p-4 rounded transition duration-500"
          >
            Customer Care
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Super Admin Dashboard
          </h2>

          <div className="flex items-center gap-4">
            {/* Username */}
            <span className="hidden sm:block text-sm font-medium opacity-90">
              {auth?.user?.firstname}
            </span>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-white text-green-700 flex items-center justify-center font-bold shadow-md cursor-pointer hover:scale-105 transition-transform duration-200">
              {auth?.user?.firstname?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminDashboardLayout;
