import { Outlet, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../providers/AuthProvider";

import {
  MdDashboard,
  MdAdminPanelSettings,
  MdSupportAgent,
  MdAccountBalance,
  MdAccountBalanceWallet,
} from "react-icons/md";
import { FaUsers, FaExchangeAlt, FaChartLine } from "react-icons/fa";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/superadmin", icon: MdDashboard, label: "Dashboard", end: true },
  { to: "/superadmin/myaccount", icon: MdAccountBalanceWallet, label: "My Account" },
  { to: "/superadmin/users", icon: FaUsers, label: "Users" },
  { to: "/superadmin/admins", icon: MdAdminPanelSettings, label: "Admins" },
  { to: "/superadmin/transactions", icon: FaExchangeAlt, label: "Transactions" },
  { to: "/superadmin/support", icon: MdSupportAgent, label: "Customer Care" },
  { to: "/superadmin/bank", icon: MdAccountBalance, label: "Bank" },
  { to: "/superadmin/revenue", icon: FaChartLine, label: "Revenue" },
  { to: "/superadmin/settings", icon: IoSettings, label: "Settings" },
];

const SuperAdminDashboardLayout = () => {
  const { auth } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = auth?.user?.firstname?.charAt(0).toUpperCase() ?? "A";

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-white/15 text-white"
        : "text-white/60 hover:bg-white/10 hover:text-white"
    }`;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-4 pt-6 pb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-400 flex items-center justify-center">
            <MdAccountBalance size={16} className="text-emerald-950" />
          </div>
          <div>
            <p className="text-white font-bold text-base leading-none">Legion Bank</p>
            <p className="text-white/40 text-[10px] mt-0.5 tracking-widest uppercase">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        <p className="text-white/30 text-[10px] font-semibold tracking-widest uppercase px-3 mb-2">Main</p>
        {NAV_ITEMS.slice(0, 5).map(({ to, icon: Icon, label, end }) => (
          <NavLink key={to} to={to} end={end} className={navClass} onClick={() => setSidebarOpen(false)}>
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
        <p className="text-white/30 text-[10px] font-semibold tracking-widest uppercase px-3 mt-5 mb-2">Management</p>
        {NAV_ITEMS.slice(5).map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={navClass} onClick={() => setSidebarOpen(false)}>
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 mt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-emerald-950 text-sm font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold truncate">{auth?.user?.firstname ?? "Admin"}</p>
            <p className="text-white/40 text-[10px] truncate">{auth?.user?.email ?? ""}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-white/40 hover:text-red-400 transition-colors duration-200 p-1"
          >
            <FiLogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 bg-[#0a2e1a] flex-col shrink-0 fixed top-0 left-0 h-screen z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-60 bg-[#0a2e1a] z-50 flex flex-col transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <FiX size={20} />
        </button>
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-slate-500 hover:text-slate-800 p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={20} />
            </button>
            <h2 className="text-sm font-semibold text-slate-700 hidden sm:block">Super Admin Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-700 leading-none">{auth?.user?.firstname}</span>
              <span className="text-[10px] text-slate-400 mt-0.5">{auth?.user?.email}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 active:scale-95 transition-all duration-200 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200"
            >
              <FiLogOut size={13} />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboardLayout;