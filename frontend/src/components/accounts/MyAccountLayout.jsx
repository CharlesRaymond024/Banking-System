import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaExchangeAlt,
  FaHistory,
  FaUsers,
  FaFileAlt,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";

export default function MyAccountLayout() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";

  const activeStyle = "bg-green-500 text-white shadow";

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="bg-black/70 backdrop-blur-md border-b border-gray-800 px-8 py-4 flex justify-between items-center shadow-md">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-white"
          >
            <FaArrowLeft />
            Back
          </button>

          <h1 className="text-lg font-semibold text-green-400">
            My Banking Dashboard
          </h1>
        </div>

        {/* Right Section */}
        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full font-bold shadow-md uppercase">
            {auth?.user?.firstname?.charAt(0)}
          </div>

          {/* User Info */}
          <div className="flex flex-col leading-tight">
            <span className="text-xs text-gray-400">Welcome</span>
            <span className="text-sm font-semibold text-white">
              {auth?.user?.accountName || auth?.user?.firstname}
            </span>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 bg-black/80 backdrop-blur-md border-r border-gray-800 p-5">
          <h2 className="text-xl font-semibold mb-6 text-green-400">
            My Account
          </h2>

          <nav className="flex flex-col gap-2">
            <NavLink
              to="details"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : "hover:bg-gray-800"}`
              }
            >
              <FaUserCircle />
              Account Details
            </NavLink>

            <NavLink
              to="transfer"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : "hover:bg-gray-800"}`
              }
            >
              <FaExchangeAlt />
              Transfer
            </NavLink>

            <NavLink
              to="transactions"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : "hover:bg-gray-800"}`
              }
            >
              <FaHistory />
              Transaction History
            </NavLink>

            <NavLink
              to="joint"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : "hover:bg-gray-800"}`
              }
            >
              <FaUsers />
              Joint Account
            </NavLink>

            <NavLink
              to="report"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : "hover:bg-gray-800"}`
              }
            >
              <FaFileAlt />
              Report
            </NavLink>

            {/* USER PROFILE TAB */}
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : "hover:bg-gray-800"}`
              }
            >
              <FaUser />
              User Profile
            </NavLink>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 bg-white text-black">
          <Outlet />
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-black/70 backdrop-blur-md border-t border-gray-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} MyBank. All rights reserved.
      </footer>
    </div>
  );
}
