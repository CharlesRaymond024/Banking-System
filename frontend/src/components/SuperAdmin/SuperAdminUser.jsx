import { useContext, useState } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineUsers,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}
    >
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p
        className="text-3xl font-bold text-slate-800"
        style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.03em" }}
      >
        {value}
      </p>
    </div>
  </div>
);

const SuperAdminUsers = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Pagination + Filter state
  const [page, setPage] = useState(1);
  const [role, setRole] = useState("");
  const limit = 10;

  // ✅ Fetch with pagination + role filter
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useFetch(
    `/user/get?page=${page}&limit=${limit}${role ? `&role=${role}` : ""}`,
    auth?.accessToken,
  );

  const { data: banks, loading: banksLoading } = useFetch(
    "/bank/get",
    auth?.accessToken,
  );

  const users = usersData?.users || [];
  const totalUsers = usersData?.totalUsers || 0;
  const currentPage = usersData?.currentPage || 1;
  const totalPages = usersData?.totalPages || 1;

  const getBankName = (bankId) => {
    const bank = banks?.find((b) => b.id === bankId);
    return bank ? bank.name : "N/A";
  };

  const activeUsers = users.filter((u) => u.isActive).length || 0;

  const handleNext = () => {
    if (currentPage < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setPage((prev) => prev - 1);
  };

  if (usersLoading || banksLoading)
    return (
      <div className="flex items-center justify-center min-h-64 gap-3 text-slate-400">
        <svg
          className="animate-spin w-5 h-5 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <span className="text-sm font-medium">Loading users…</span>
      </div>
    );

  if (usersError)
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-red-500 font-medium">{usersError}</p>
      </div>
    );

  return (
    <div
      className="min-h-screen p-6 space-y-6"
      style={{
        background:
          "linear-gradient(135deg, #f0f4ff 0%, #fafbff 60%, #f0f7ff 100%)",
      }}
    >
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
          <MdManageAccounts size={22} className="text-white" />
        </div>
        <div>
          <h1
            className="text-xl font-bold text-slate-800"
            style={{
              fontFamily: "'Sora', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Users
          </h1>
          <p className="text-xs text-slate-400">Manage all registered users</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          label="Total Users"
          value={totalUsers}
          icon={HiOutlineUsers}
          color="bg-gradient-to-br from-blue-500 to-blue-700"
        />
        <StatCard
          label="Active Users"
          value={activeUsers}
          icon={HiOutlineUsers}
          color="bg-gradient-to-br from-emerald-500 to-emerald-700"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">All Users</h2>

          {/* ✅ FILTER + BUTTON (MATCHES UI) */}
          <div className="flex items-center gap-2">
            <select
              value={role}
              onChange={(e) => {
                setPage(1);
                setRole(e.target.value);
              }}
              className="text-xs font-semibold border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Roles</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="CustomerCare">CustomerCare</option>
            </select>

            <button
              onClick={() => navigate("/superadmin/CreateUserandAccount")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md shadow-blue-200 transition-all duration-200 active:scale-95"
            >
              <HiOutlinePlus size={14} />
              Create User & Account
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {[
                  "Name",
                  "Email",
                  "Phone",
                  "Bank",
                  "Role",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/70 transition-colors duration-100"
                >
                  <td className="px-5 py-3.5 text-sm font-semibold text-slate-700 whitespace-nowrap">
                    {user.firstname} {user.lastname}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">
                    {user.email}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">
                    {user.phone || "N/A"}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500 whitespace-nowrap">
                    {getBankName(user.bank)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {user.roles}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        user.isActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.isActive ? "bg-emerald-500" : "bg-red-400"
                        }`}
                      />
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => navigate(`/superadmin/users/${user.id}`)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <HiOutlineEye size={15} />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/superadmin/users/update/${user.id}`)
                        }
                        className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                      >
                        <HiOutlinePencil size={15} />
                      </button>
                      <button
                      onClick={() =>
                        navigate(`/superadmin/${user.id}/delete`)
                      }
                      className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                        <HiOutlineTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="py-16 text-center text-slate-400 text-sm">
              No users found.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Showing {totalUsers === 0 ? 0 : (currentPage - 1) * limit + 1}–
            {(currentPage - 1) * limit + users.length} of {totalUsers}
          </p>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                currentPage === 1
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                currentPage === totalPages
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminUsers;
