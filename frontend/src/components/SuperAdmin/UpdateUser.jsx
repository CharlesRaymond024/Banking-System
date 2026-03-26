import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import {
  HiUser,
  HiMail,
  HiPhone,
  HiLockClosed,
  HiOfficeBuilding,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";

const Field = ({ label, icon: Icon, children }) => (
  <div>
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

const inputCls =
  "w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 outline-none transition-all duration-150 hover:border-blue-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-100";

const UpdateUser = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const token = auth?.accessToken;

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch(`/user/get/${id}`, token);

  const {
    data: banks,
    loading: banksLoading,
    error: banksError,
  } = useFetch("/bank/get", token);

  const { data, loading, error, updateData } = useUpdate(
    `/user/${id}/update`,
    token,
  );

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    bank: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        bank: user.bank || "",
      });
    }
  }, [user]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateData(userData);
  };

  if (userLoading)
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
        <span className="text-sm font-medium">Loading user…</span>
      </div>
    );

  if (userError)
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <HiXCircle className="mx-auto mb-2 text-red-400" size={36} />
          <p className="text-red-500 font-medium">Failed to load user</p>
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
        <div className="mb-8 flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
            <MdManageAccounts size={28} className="text-white" />
          </div>
          <div>
            <h1
              className="text-2xl font-bold text-slate-800"
              style={{
                fontFamily: "'Sora', 'DM Sans', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Update User
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Modify user information below
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm shadow-slate-200 border border-slate-100 overflow-hidden">
          <div className="px-6 pt-6 pb-2 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <HiUser size={15} className="text-blue-500" />
              User Information
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-5">
            <Field label="First Name" icon={HiUser}>
              <input
                name="firstname"
                placeholder="First Name"
                value={userData.firstname}
                onChange={handleUserChange}
                required
                className={inputCls}
              />
            </Field>

            <Field label="Last Name" icon={HiUser}>
              <input
                name="lastname"
                placeholder="Last Name"
                value={userData.lastname}
                onChange={handleUserChange}
                required
                className={inputCls}
              />
            </Field>

            <Field label="Email" icon={HiMail}>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={userData.email}
                onChange={handleUserChange}
                required
                className={inputCls}
              />
            </Field>

            <Field label="Phone" icon={HiPhone}>
              <input
                name="phone"
                placeholder="Phone Number"
                value={userData.phone}
                onChange={handleUserChange}
                required
                className={inputCls}
              />
            </Field>

            <Field label="Password" icon={HiLockClosed}>
              <input
                name="password"
                type="password"
                placeholder="New Password (optional)"
                value={userData.password}
                onChange={handleUserChange}
                className={inputCls}
              />
            </Field>

            <Field label="Bank" icon={HiOfficeBuilding}>
              <select
                name="bank"
                value={userData.bank}
                onChange={handleUserChange}
                required
                className={inputCls}
              >
                <option value="">
                  {banksLoading ? "Loading banks…" : "Select Bank"}
                </option>
                {banks &&
                  banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
              </select>
            </Field>

            {banksError && (
              <p className="col-span-2 text-red-500 text-xs font-medium">
                Failed to load banks
              </p>
            )}

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
                "Update User"
              )}
            </button>

            {/* Feedback */}
            {error && (
              <div className="col-span-2 flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium">
                <HiXCircle size={16} />
                {error?.message || "Update failed"}
              </div>
            )}
            {data && (
              <div className="col-span-2 flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl px-4 py-3 text-sm font-medium">
                <HiCheckCircle size={16} />
                User updated successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
