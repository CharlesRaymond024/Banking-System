import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import useAuth from "../../hooks/useAuth";
import {
  HiOfficeBuilding,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiDocumentText,
  HiCheckCircle,
  HiXCircle,
  HiArrowLeft,
} from "react-icons/hi";
import { MdAccountBalance } from "react-icons/md";

/* Reusable Field Component */
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

const UpdateBank = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth?.accessToken;

  const {
    data: bank,
    loading: bankLoading,
    error: bankError,
  } = useFetch(`/bank/get/${id}`, token);

  const { data, loading, error, updateData } = useUpdate(
    `/bank/${id}/update`,
    token,
  );

  const [bankData, setBankData] = useState({
    name: "",
    description: "",
    logo: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (bank) {
      setBankData({
        name: bank.name || "",
        description: bank.description || "",
        logo: bank.logo || "",
        email: bank.email || "",
        phone: bank.phone || "",
        address: bank.address || "",
      });
    }
  }, [bank]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateData(bankData);
  };

  if (bankLoading)
    return (
      <div className="flex items-center justify-center min-h-64 gap-3 text-slate-400">
        <svg className="animate-spin w-5 h-5 text-blue-500" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span className="text-sm font-medium">Loading bank…</span>
      </div>
    );

  if (bankError)
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <HiXCircle className="mx-auto mb-2 text-red-400" size={36} />
          <p className="text-red-500 font-medium">Failed to load bank</p>
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
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <MdAccountBalance size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Update Bank</h1>
              <p className="text-sm text-slate-400">Modify bank information</p>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <HiArrowLeft />
            Back
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 pt-6 pb-2 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <HiOfficeBuilding size={15} className="text-blue-500" />
              Bank Information
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-5">
            <Field label="Bank Name" icon={HiOfficeBuilding}>
              <input
                name="name"
                value={bankData.name}
                onChange={handleChange}
                className={inputCls}
                required
              />
            </Field>

            <Field label="Email" icon={HiMail}>
              <input
                name="email"
                value={bankData.email}
                onChange={handleChange}
                className={inputCls}
              />
            </Field>

            <Field label="Phone" icon={HiPhone}>
              <input
                name="phone"
                value={bankData.phone}
                onChange={handleChange}
                className={inputCls}
              />
            </Field>

            <Field label="Logo URL" icon={HiDocumentText}>
              <input
                name="logo"
                value={bankData.logo}
                onChange={handleChange}
                className={inputCls}
              />
            </Field>

            <div className="col-span-2">
              <Field label="Address" icon={HiLocationMarker}>
                <input
                  name="address"
                  value={bankData.address}
                  onChange={handleChange}
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="col-span-2">
              <Field label="Description" icon={HiDocumentText}>
                <textarea
                  name="description"
                  value={bankData.description}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="col-span-2 mt-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 text-white font-semibold py-3 rounded-2xl shadow-md shadow-blue-200 transition flex items-center justify-center gap-2 text-sm"
            >
              {loading ? "Updating..." : "Update Bank"}
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
                Bank updated successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBank;

// route to update a bank by ID
// /bank/:id/update
