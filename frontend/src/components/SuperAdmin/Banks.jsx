import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineOfficeBuilding,
  HiOutlinePencilAlt,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineArrowRight,
  HiXCircle,
} from "react-icons/hi";
import { MdAccountBalance } from "react-icons/md";

const Bank = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("/bank/get", auth?.accessToken);

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
        <span className="text-sm font-medium">Loading banks…</span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <HiXCircle className="mx-auto mb-2 text-red-400" size={36} />
          <p className="text-red-500 font-medium">Error fetching banks</p>
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
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
            <MdAccountBalance size={20} className="text-white" />
          </div>
          <div>
            <h1
              className="text-xl font-bold text-slate-800"
              style={{
                fontFamily: "'Sora', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Banks
            </h1>
            <p className="text-xs text-slate-400">
              {data?.length ?? 0} registered{" "}
              {data?.length === 1 ? "bank" : "banks"}
            </p>
          </div>
        </div>
      </div>

      {/* Bank Cards */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((bank, index) => (
            <div
              key={bank.id || index}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Card top accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-blue-400" />

              <div className="p-5 flex flex-col flex-1">
                {/* Logo + Name */}
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 overflow-hidden">
                    {bank.logo ? (
                      <img
                        src={bank.logo}
                        alt={bank.name}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <MdAccountBalance size={28} className="text-blue-400" />
                    )}
                  </div>
                  <h2
                    className="text-base font-bold text-slate-800 text-center"
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {bank.name}
                  </h2>
                  {bank.description && (
                    <p className="text-xs text-slate-400 text-center mt-1 line-clamp-2 leading-relaxed">
                      {bank.description}
                    </p>
                  )}
                </div>

                {/* Status badge */}
                <div className="flex justify-center mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                      bank.isSuspended
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        bank.isSuspended ? "bg-red-400" : "bg-emerald-500"
                      }`}
                    />
                    {bank.isSuspended ? "Suspended" : "Active"}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs text-slate-500 mb-5">
                  {bank.email && (
                    <div className="flex items-center gap-2">
                      <HiOutlineMail
                        size={13}
                        className="text-slate-400 flex-shrink-0"
                      />
                      <span className="truncate">{bank.email}</span>
                    </div>
                  )}
                  {bank.phone && (
                    <div className="flex items-center gap-2">
                      <HiOutlinePhone
                        size={13}
                        className="text-slate-400 flex-shrink-0"
                      />
                      <span>{bank.phone}</span>
                    </div>
                  )}
                  {bank.address && (
                    <div className="flex items-start gap-2">
                      <HiOutlineLocationMarker
                        size={13}
                        className="text-slate-400 flex-shrink-0 mt-0.5"
                      />
                      <span className="leading-relaxed">{bank.address}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <button
                    onClick={() => navigate(`/superadmin/bank/${bank.id}`)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-semibold py-2.5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 transition-all duration-200 active:scale-95"
                  >
                    View Bank Details
                    <HiOutlineArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => navigate(`/superadmin/bank/update/${bank.id}`)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-95"
                  >
                    Edit Bank
                    <HiOutlinePencilAlt size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {data?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
          <HiOutlineOfficeBuilding size={40} className="opacity-40" />
          <p className="text-sm font-medium">No banks registered yet</p>
        </div>
      )}
    </div>
  );
};

export default Bank;
