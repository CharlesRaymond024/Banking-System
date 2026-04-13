import { Outlet, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard, MdAccountBalanceWallet } from "react-icons/md";
import { FaHistory, FaBell } from "react-icons/fa";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { useFetch } from "../../hooks/useFetch";

const UserLayout = () => {
  const { auth } = useContext(AuthContext);
  const logout = useLogout();
  const navigate = useNavigate();
  const token = auth?.accessToken;
  const userId = auth?.user?.id;

  const { data } = useFetch(userId ? `/notification/unread/all` : null, token);

  const unreadCount = data?.data?.notifications?.length || 0;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
      isActive
        ? "bg-gradient-to-r from-amber-500/20 to-amber-400/10 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-900/10"
        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
    }`;

  const initials = auth?.user?.firstname?.charAt(0).toUpperCase();

  return (
    <div
      className="flex min-h-screen"
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#0b0f1a",
      }}
    >
      {/* Sidebar */}
      <aside
        className="hidden md:flex w-64 flex-col justify-between px-5 py-7 border-r border-slate-800/70"
        style={{
          background: "linear-gradient(160deg, #0d1220 0%, #0b0f1a 100%)",
        }}
      >
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-10 px-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <span className="text-slate-900 font-black text-xs">LB</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Legion <span className="text-amber-400">Bank</span>
            </span>
          </div>

          <p className="text-xs uppercase tracking-widest text-slate-600 font-semibold px-1 mb-3">
            Menu
          </p>

          <nav className="flex flex-col gap-1">
            <NavLink to="/user" end className={navClass}>
              <MdDashboard size={18} />
              Overview
            </NavLink>
            <NavLink to="/user/myaccount" className={navClass}>
              <MdAccountBalanceWallet size={18} />
              My Account
            </NavLink>
            <NavLink to="/user/transactions" className={navClass}>
              <FaHistory size={16} />
              Transactions
            </NavLink>
            <NavLink to="/user/settings" className={navClass}>
              <IoSettings size={18} />
              Settings
            </NavLink>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 pt-5">
          <div className="flex items-center gap-3 px-1 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-900 text-sm shadow-md shadow-amber-900/20 shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate">
                {auth?.user?.firstname}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {auth?.user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 hover:border-red-400/40 transition-all duration-200"
          >
            <FiLogOut size={15} />
            Sign Out
          </button>
          <p className="text-center text-xs text-slate-700 mt-4">
            © {new Date().getFullYear()} Legion Bank
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-5 md:px-8 py-4 border-b border-slate-800/70 backdrop-blur-md"
          style={{ background: "rgba(11,15,26,0.85)" }}
        >
          {/* Mobile Brand */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-slate-900 font-black text-xs">LB</span>
            </div>
            <span className="text-white font-bold text-base">
              Legion <span className="text-amber-400">Bank</span>
            </span>
          </div>

          {/* Desktop Title */}
          <h2 className="hidden md:block text-lg font-semibold text-slate-200 tracking-tight">
            User Dashboard
          </h2>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Notification */}
            <button
              onClick={() => navigate("/user/notifications")}
              className="relative w-9 h-9 rounded-xl border border-slate-700/60 bg-slate-800/40 hover:bg-slate-700/50 flex items-center justify-center transition-all duration-200"
            >
              <FaBell className="text-slate-400" size={14} />

              {/* ✅ ONLY show if unread exists */}
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full ring-1 ring-slate-900"></span>
              )}
            </button>

            {/* User Info (desktop) */}
            <div className="hidden sm:flex flex-col text-right mr-1">
              <span className="text-sm font-semibold text-slate-200">
                {auth?.user?.firstname}
              </span>
              <span className="text-xs text-slate-500">
                {auth?.user?.email}
              </span>
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-900 text-sm shadow-md shrink-0">
              {initials}
            </div>

            {/* Logout (desktop) */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all duration-200"
            >
              <FiLogOut size={13} />
              Logout
            </button>
          </div>
        </header>

        {/* Mobile Bottom Nav */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex justify-around items-center py-3 border-t border-slate-800 backdrop-blur-md"
          style={{ background: "rgba(11,15,26,0.95)" }}
        >
          {[
            {
              to: "/user",
              icon: <MdDashboard size={20} />,
              label: "Overview",
              end: true,
            },
            {
              to: "/user/myaccount",
              icon: <MdAccountBalanceWallet size={20} />,
              label: "Account",
            },
            {
              to: "/user/transactions",
              icon: <FaHistory size={18} />,
              label: "History",
            },
            {
              to: "/user/settings",
              icon: <IoSettings size={20} />,
              label: "Settings",
            },
          ].map(({ to, icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-amber-400"
                    : "text-slate-500 hover:text-slate-300"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Page Content */}
        <div className="flex-1 px-5 md:px-8 py-6 pb-24 md:pb-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
