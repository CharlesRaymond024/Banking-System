import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import api from "../../api/axios";
import { toast } from "react-toastify";
import {
  MdAccountBalance,
  MdDashboard,
  MdPeople,
  MdAccountBalanceWallet,
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose,
  MdAssessment,
} from "react-icons/md";

const navItems = [
  { to: "/customercare", label: "Dashboard", icon: <MdDashboard size={20} /> },
  { to: "/customercare/users", label: "Users", icon: <MdPeople size={20} /> },
  { to: "/customercare/banks", label: "Banks", icon: <MdAccountBalanceWallet size={20} /> },
  { to: "/customercare/reports", label: "Reports", icon: <MdAssessment size={20} /> },
  { to: "/customercare/settings", label: "Settings", icon: <MdSettings size={20} /> },
];

const CustomerCareLayout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await api.post("/auth/logout");
    } catch (_) {
      // silent
    } finally {
      setAuth({});
      navigate("/login");
      setLoggingOut(false);
    }
  };

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`
        flex flex-col h-full bg-slate-900 text-white
        ${mobile ? "w-72" : "w-64"}
      `}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700/60">
        <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
          <MdAccountBalance size={18} className="text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-green-400 uppercase tracking-widest leading-none">
            Legion Bank
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Customer Care</p>
        </div>
        {mobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-slate-400 hover:text-white transition-colors"
          >
            <MdClose size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2">
          Menu
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/customercare"}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-green-500/15 text-green-400 border border-green-500/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-700/60">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-150 disabled:opacity-50"
        >
          <MdLogout size={20} />
          {loggingOut ? "Signing out…" : "Log out"}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-slate-100 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <MdMenu size={20} />
          </button>
          <div className="hidden lg:block" />
          <p className="text-sm font-semibold text-slate-700 lg:hidden">
            Legion Bank
          </p>
          <div className="w-8 lg:hidden" />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerCareLayout;