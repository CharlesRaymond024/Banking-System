import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import {
  HiArrowLeft,
  HiUser,
  HiOfficeBuilding,
  HiCreditCard,
  HiCurrencyDollar,
  HiCheckCircle,
  HiXCircle,
  HiShieldCheck,
  HiShieldExclamation,
  HiBadgeCheck,
} from "react-icons/hi";
import { MdAccountBalance, MdAccountBalanceWallet } from "react-icons/md";

const InfoCard = ({ label, value, icon: Icon, valueClass = "" }) => (
  <div className="group relative bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-3xl opacity-60" />
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="mt-0.5 flex-shrink-0 w-8 h-8 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
          <Icon size={16} />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className={`font-semibold text-slate-800 truncate ${valueClass}`}>
          {value}
        </p>
      </div>
    </div>
  </div>
);

const StatusBadge = ({
  label,
  active,
  activeText,
  inactiveText,
  ActiveIcon,
  InactiveIcon,
}) => (
  <div className="group relative bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
      {label}
    </p>
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-red-50 text-red-600 border border-red-200"
      }`}
    >
      {active
        ? ActiveIcon && <ActiveIcon size={14} />
        : InactiveIcon && <InactiveIcon size={14} />}
      {active ? activeText : inactiveText}
    </div>
  </div>
);

const AccountDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth?.accessToken;

  const {
    data: account,
    loading,
    error,
  } = useFetch(`/account/get/${id}`, token);

  if (loading)
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
        <span className="text-sm font-medium">Loading account details…</span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <HiXCircle className="mx-auto mb-2 text-red-400" size={36} />
          <p className="text-red-500 font-medium">Failed to load account</p>
        </div>
      </div>
    );

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background:
          "linear-gradient(135deg, #f0f4ff 0%, #fafbff 60%, #f0f7ff 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/accounts")}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-6 group"
          >
            <HiArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back to Accounts
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <MdAccountBalance size={26} className="text-white" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold text-slate-800"
                style={{
                  fontFamily: "'Sora', 'DM Sans', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Account Details
              </h1>
              {account && (
                <p className="text-sm text-slate-400 mt-0.5 font-mono">
                  #{account.accountNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {account && (
          <div className="space-y-4">
            {/* Main grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                label="Account Name"
                value={account.accountName}
                icon={MdAccountBalanceWallet}
              />
              <InfoCard
                label="Account Number"
                value={account.accountNumber}
                icon={HiCreditCard}
              />
              <InfoCard
                label="Account Type"
                value={
                  account.accountType?.charAt(0).toUpperCase() +
                  account.accountType?.slice(1)
                }
                icon={HiBadgeCheck}
              />
              <InfoCard
                label="Owner"
                value={
                  `${account.User?.firstname ?? ""} ${account.User?.lastname ?? ""}`.trim() ||
                  "—"
                }
                icon={HiUser}
              />
              <InfoCard
                label="Bank"
                value={account.Bank?.name || "—"}
                icon={HiOfficeBuilding}
              />
              <InfoCard
                label="Balance"
                value={`${account.balance?.toLocaleString() ?? 0} ${account.currency}`}
                icon={HiCurrencyDollar}
              />
              <InfoCard
                label="Currency"
                value={account.currency}
                icon={HiCurrencyDollar}
              />
            </div>

            {/* Status row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatusBadge
                label="Account Status"
                active={account.isActive}
                activeText="Active"
                inactiveText="Inactive"
                ActiveIcon={HiCheckCircle}
                InactiveIcon={HiXCircle}
              />
              <StatusBadge
                label="Suspension Status"
                active={!account.isSuspended}
                activeText="Not Suspended"
                inactiveText="Suspended"
                ActiveIcon={HiShieldCheck}
                InactiveIcon={HiShieldExclamation}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
