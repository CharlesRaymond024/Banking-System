import { Outlet, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard, MdAccountBalanceWallet } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { IoSettings } from "react-icons/io5";

const UserLayout = () => {
  const { auth } = useContext(AuthContext);

  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold mb-10 text-blue-400">
            Legion Bank
          </h1>

          <nav className="flex flex-col gap-3">
            <NavLink to="/user" className={navClass}>
              <MdDashboard size={20} />
              Overview
            </NavLink>

            <NavLink to="/user/myaccount" className={navClass}>
              <MdAccountBalanceWallet size={20} />
              My Account
            </NavLink>

            <NavLink to="/user/transactions" className={navClass}>
              <FaHistory size={20} />
              Transaction History
            </NavLink>

            <NavLink to="/user/settings" className={navClass}>
              <IoSettings size={20} />
              Settings
            </NavLink>
          </nav>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-400 border-t border-gray-700 pt-4">
          <p>© {new Date().getFullYear()} Legion Bank</p>
          <p className="text-xs opacity-60">User Dashboard</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg shadow-sm rounded-xl px-6 py-4 mb-6 flex justify-between items-center border border-gray-200">
          {/* Left: Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            User Dashboard
          </h2>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* User Info */}
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-700">
                {auth?.user?.firstname}
              </span>
              <span className="text-xs text-gray-500">{auth?.user?.email}</span>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
              {auth?.user?.firstname?.charAt(0).toUpperCase()}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
            >
              <FiLogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
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

export default UserLayout;
