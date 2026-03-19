import { Outlet, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";

import {
  MdDashboard,
  MdAdminPanelSettings,
  MdSupportAgent,
  MdAccountBalance,
  MdAccountBalanceWallet,
} from "react-icons/md";
import { FaUsers, FaExchangeAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboardLayout = () => {
  const { auth } = useContext(AuthContext);

  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded transition duration-300 ${
      isActive ? "bg-green-700" : "hover:bg-green-700"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col justify-between p-6">
        {/* Top */}
        <div>
          <h1 className="text-2xl font-bold mb-10">Legion Bank</h1>

          <nav className="flex flex-col gap-3">
            <NavLink to="/superadmin" className={navClass}>
              <MdDashboard size={20} />
              Dashboard
            </NavLink>

            {/* MyAccount tab */}
            <NavLink to="/superadmin/myaccount" className={navClass}>
              <MdAccountBalanceWallet size={20} />
              My Account
            </NavLink>

            <NavLink to="/superadmin/users" className={navClass}>
              <FaUsers size={20} />
              Users
            </NavLink>

            <NavLink to="/superadmin/admins" className={navClass}>
              <MdAdminPanelSettings size={20} />
              Admins
            </NavLink>

            <NavLink to="/superadmin/transactions" className={navClass}>
              <FaExchangeAlt size={20} />
              Transactions
            </NavLink>

            <NavLink to="/superadmin/support" className={navClass}>
              <MdSupportAgent size={20} />
              Customer Care
            </NavLink>

            <NavLink to="/superadmin/bank" className={navClass}>
              <MdAccountBalance size={20} />
              Bank
            </NavLink>

            <NavLink to="/superadmin/settings" className={navClass}>
              <IoSettings size={20} />
              Settings
            </NavLink>
          </nav>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-300 border-t border-green-700 pt-4">
          <p>© {new Date().getFullYear()} Legion Bank</p>
          <p className="text-xs opacity-70">Super Admin Panel</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Super Admin Dashboard
          </h2>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-700">
                {auth?.user?.firstname}
              </span>
              <span className="text-xs text-gray-500">{auth?.user?.email}</span>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold shadow-md">
              {auth?.user?.firstname?.charAt(0).toUpperCase()}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200 text-white text-sm font-medium px-3 py-2 rounded-lg shadow"
            >
              <FiLogOut size={15} />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboardLayout;
