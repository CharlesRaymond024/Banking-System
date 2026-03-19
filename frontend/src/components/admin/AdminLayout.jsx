import { Outlet, NavLink } from "react-router-dom";
import { MdDashboard, MdAccountBalance } from "react-icons/md";
import { FaUsers, FaExchangeAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { IoSettings } from "react-icons/io5"

const AdminLayout = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition duration-300 font-medium text-sm ${
      isActive
        ? "bg-white text-blue-700 shadow-md"
        : "text-white hover:bg-blue-600"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-blue-800 text-white flex flex-col justify-between py-8 px-4">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 mb-10 px-2">
            <MdAccountBalance size={28} className="text-white" />
            <h1 className="text-xl font-extrabold tracking-wide">
              Legion Bank
            </h1>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2">
            <NavLink to="/admin" end className={navClass}>
              <MdDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink to="/admin/users" className={navClass}>
              <FaUsers size={18} />
              Users
            </NavLink>

            <NavLink to="/admin/transactions" className={navClass}>
              <FaExchangeAlt size={18} />
              Transactions
            </NavLink>

            <NavLink to="/admin/accounts" className={navClass}>
              <BsWallet2 size={18} />
              Accounts
            </NavLink>

            <NavLink to="/admin/settings" className={navClass}>
              <IoSettings size={20} />
              Settings
            </NavLink>
          </nav>
        </div>

        {/* Footer */}
        <div className="text-xs text-blue-200 border-t border-blue-600 pt-4 px-2">
          <p>© {new Date().getFullYear()} Legion Bank</p>
          <p className="opacity-60">Admin Panel</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Admin Dashboard</h2>
            <p className="text-xs text-gray-400">
              {auth?.user?.bank
                ? `Bank ID: ${auth.user.bank}`
                : "No bank assigned"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Avatar + Name */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow">
                {auth?.user?.firstname?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-700">
                  {auth?.user?.firstname} {auth?.user?.lastname}
                </p>
                <p className="text-xs text-gray-400">{auth?.user?.email}</p>
              </div>
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
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
