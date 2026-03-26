import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  HiArrowLeft,
  HiUser,
  HiOfficeBuilding,
  HiCreditCard,
  HiCurrencyDollar,
  HiLockClosed,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";
import { MdAccountBalance, MdAccountBalanceWallet } from "react-icons/md";

const Field = ({ label, icon: Icon, children, span = false }) => (
  <div className={span ? "col-span-2" : ""}>
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Icon size={15} />
        </span>
      )}
      {children}
    </div>
  </div>
);

const inputCls = (hasIcon = true, disabled = false) =>
  `w-full rounded-xl border text-sm font-medium outline-none transition-all duration-150
  ${hasIcon ? "pl-9" : "pl-4"} pr-4 py-2.5
  ${
    disabled
      ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
      : "bg-white border-slate-200 text-slate-800 hover:border-blue-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
  }`;

const UpdateUserAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth?.accessToken;

  const {
    data: account,
    loading: accountLoading,
    error: accountError,
  } = useFetch(id ? `/account/get/${id}` : null, token);

  const { data, loading, error, updateData } = useUpdate(
    id ? `/account/${id}/update` : null,
    token,
  );

  const [accountData, setAccountData] = useState({
    accountName: "",
    accountNumber: "",
    accountType: "savings",
    currency: "",
    transferPin: "",
    isActive: false,
    isSuspended: false,
  });

  useEffect(() => {
    if (account) {
      setAccountData({
        accountName: account.accountName || "",
        accountNumber: account.accountNumber || "",
        accountType: account.accountType || "savings",
        currency: account.currency || "",
        transferPin: "",
        isActive: account.isActive || false,
        isSuspended: account.isSuspended || false,
      });
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAccountData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      accountName: accountData.accountName,
      accountNumber: accountData.accountNumber,
      accountType: accountData.accountType,
      currency: accountData.currency,
      isActive: accountData.isActive,
      isSuspended: accountData.isSuspended,
    };
    if (accountData.transferPin) payload.transferPin = accountData.transferPin;
    await updateData(payload);
  };

  useEffect(() => {
    if (data) toast.success("Account updated successfully");
    if (error) toast.error(error?.message || "Update failed");
  }, [data, error]);

  if (accountLoading)
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
        <span className="text-sm font-medium">Loading account…</span>
      </div>
    );

  if (accountError)
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <HiXCircle className="mx-auto mb-2 text-red-400" size={36} />
          <p className="text-red-500 font-medium">Failed to load account</p>
        </div>
      </div>
    );

  if (!account) return null;

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
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-6 group"
          >
            <HiArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back
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
                Update Account
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Edit account details below
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm shadow-slate-200 border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-5">
            {/* Editable fields */}
            <Field label="Account Name" icon={MdAccountBalanceWallet}>
              <input
                name="accountName"
                value={accountData.accountName}
                onChange={handleChange}
                placeholder="Account Name"
                required
                className={inputCls()}
              />
            </Field>

            <Field label="Account Number" icon={HiCreditCard}>
              <input
                name="accountNumber"
                value={accountData.accountNumber}
                onChange={handleChange}
                placeholder="Account Number"
                required
                className={inputCls()}
              />
            </Field>

            <Field label="Account Type" icon={HiCreditCard}>
              <select
                name="accountType"
                value={accountData.accountType}
                onChange={handleChange}
                className={inputCls()}
              >
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="fixed">Fixed</option>
              </select>
            </Field>

            <Field label="Currency" icon={HiCurrencyDollar}>
              <input
                name="currency"
                value={accountData.currency}
                onChange={handleChange}
                placeholder="e.g. USD, NGN"
                className={inputCls()}
              />
            </Field>

            <Field label="New Transfer PIN (optional)" icon={HiLockClosed}>
              <input
                name="transferPin"
                type="password"
                value={accountData.transferPin}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
                className={inputCls()}
              />
            </Field>

            {/* Read-only fields */}
            <Field label="Owner" icon={HiUser}>
              <input
                value={
                  account?.User
                    ? `${account.User.firstname} ${account.User.lastname}`
                    : "No user"
                }
                disabled
                className={inputCls(true, true)}
              />
            </Field>

            <Field label="Bank" icon={HiOfficeBuilding}>
              <input
                value={account?.Bank?.name || "No bank"}
                disabled
                className={inputCls(true, true)}
              />
            </Field>

            <Field label="Balance" icon={HiCurrencyDollar}>
              <input
                value={`${account?.balance?.toLocaleString() ?? 0} ${account?.currency}`}
                disabled
                className={inputCls(true, true)}
              />
            </Field>

            {/* Toggles */}
            <div className="col-span-2 grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={accountData.isActive}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 rounded-full peer-checked:bg-emerald-500 transition-colors duration-200" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5" />
                </div>
                <span className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
                  <HiCheckCircle size={15} className="text-emerald-500" />
                  Active
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isSuspended"
                    checked={accountData.isSuspended}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 rounded-full peer-checked:bg-red-500 transition-colors duration-200" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5" />
                </div>
                <span className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
                  <HiXCircle size={15} className="text-red-400" />
                  Suspended
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="col-span-2 mt-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-2xl transition-all duration-200 shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
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
                  Updating…
                </>
              ) : (
                "Update Account"
              )}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        toastClassName="!rounded-2xl !text-sm !font-medium !shadow-lg"
        progressClassName="!bg-blue-400"
      />
    </div>
  );
};

export default UpdateUserAccount;
