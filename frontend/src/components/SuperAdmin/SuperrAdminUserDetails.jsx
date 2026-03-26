import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import {
  HiArrowLeft,
  HiUser,
  HiMail,
  HiPhone,
  HiOfficeBuilding,
  HiShieldCheck,
  HiCheckCircle,
  HiXCircle,
  HiBadgeCheck,
} from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";

const DetailRow = ({ label, value, icon: Icon, badge }) => (
  <div className="flex items-start gap-4 py-4 border-b border-slate-50 last:border-0">
    <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
      {Icon && <Icon size={15} />}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      {badge ? (
        badge
      ) : (
        <p className="text-sm font-semibold text-slate-800">{value || "—"}</p>
      )}
    </div>
  </div>
);

const SuperAdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const {
    data: user,
    loading,
    error,
  } = useFetch(`/user/get/${id}`, auth?.accessToken);
  const { data: banks, loading: banksLoading } = useFetch(
    "/bank/get",
    auth?.accessToken,
  );

  if (loading || banksLoading)
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
        <span className="text-sm font-medium">Loading user details…</span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <HiXCircle className="mx-auto mb-2 text-red-400" size={36} />
          <p className="text-red-500 font-medium">
            Failed to load user details
          </p>
        </div>
      </div>
    );

  const bankName = Array.isArray(banks)
    ? banks.find((b) => b.id === user?.bank)?.name || "N/A"
    : "N/A";

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background:
          "linear-gradient(135deg, #f0f4ff 0%, #fafbff 60%, #f0f7ff 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/superadmin/users")}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-6 group"
          >
            <HiArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back to Users
          </button>

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200 flex-shrink-0">
              <span
                className="text-white text-xl font-bold"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {user?.firstname?.[0]}
                {user?.lastname?.[0]}
              </span>
            </div>
            <div>
              <h1
                className="text-2xl font-bold text-slate-800"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {user?.firstname} {user?.lastname}
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Detail Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <MdManageAccounts size={16} className="text-blue-500" />
            <h2 className="text-sm font-semibold text-slate-700">
              User Details
            </h2>
          </div>

          <div className="px-6 py-2">
            <DetailRow
              label="Full Name"
              icon={HiUser}
              value={`${user?.firstname ?? ""} ${user?.lastname ?? ""}`.trim()}
            />
            <DetailRow
              label="Email Address"
              icon={HiMail}
              value={user?.email}
            />
            <DetailRow
              label="Phone"
              icon={HiPhone}
              value={user?.phone || "N/A"}
            />
            <DetailRow label="Bank" icon={HiOfficeBuilding} value={bankName} />
            <DetailRow
              label="Role"
              icon={HiShieldCheck}
              badge={
                <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {user?.roles}
                </span>
              }
            />
            <DetailRow
              label="Status"
              icon={HiBadgeCheck}
              badge={
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                    user?.isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-red-50 text-red-600 border border-red-200"
                  }`}
                >
                  {user?.isActive ? (
                    <HiCheckCircle size={13} />
                  ) : (
                    <HiXCircle size={13} />
                  )}
                  {user?.isActive ? "Active" : "Inactive"}
                </span>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminUserDetails;
