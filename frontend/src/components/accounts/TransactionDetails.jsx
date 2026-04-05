import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaHashtag,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaInfoCircle,
  FaArrowDown,
  FaArrowUp,
  FaRandom,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaCopy,
} from "react-icons/fa";
import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const TransactionDetails = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [copied, setCopied] = useState(null);

  const accessToken = auth?.accessToken;

  const { data, loading, error } = useFetch(
    `/transaction/get/${id}`,
    accessToken
  );

  const tx = data?.transaction ?? data ?? location.state ?? null;

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  const typeMeta = (type) => {
    switch (type) {
      case "deposit":
        return {
          cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
          icon: <FaArrowDown size={11} />,
          amountCls: "text-emerald-600",
        };
      case "withdrawal":
        return {
          cls: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
          icon: <FaArrowUp size={11} />,
          amountCls: "text-rose-600",
        };
      case "transfer":
        return {
          cls: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
          icon: <FaRandom size={11} />,
          amountCls: "text-gray-800",
        };
      default:
        return { cls: "bg-gray-100 text-gray-600", icon: null, amountCls: "text-gray-800" };
    }
  };

  const statusMeta = (status) => {
    switch (status) {
      case "completed":
        return {
          cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
          dot: "bg-emerald-500",
          icon: <FaCheckCircle size={13} />,
        };
      case "pending":
        return {
          cls: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
          dot: "bg-amber-500",
          icon: <FaClock size={13} />,
        };
      case "failed":
        return {
          cls: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
          dot: "bg-rose-500",
          icon: <FaTimesCircle size={13} />,
        };
      default:
        return { cls: "bg-gray-100 text-gray-600", dot: "bg-gray-400", icon: null };
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400 animate-pulse">
          Loading transaction…
        </p>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !tx) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
          <FaExchangeAlt size={20} className="text-rose-400" />
        </div>
        <p className="text-sm font-medium text-gray-700">
          Failed to load transaction
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-green-600 hover:underline mt-1"
        >
          Go back
        </button>
      </div>
    );
  }

  const { cls: typeCls, icon: typeIcon, amountCls } = typeMeta(tx.transaction_type);
  const { cls: statusCls, icon: statusIcon } = statusMeta(tx.status);

  /* ── Reusable field row ── */
  const Field = ({ label, value, mono = false, copyable = false }) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span
          className={`text-sm text-gray-800 break-all ${
            mono ? "font-mono text-xs bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100 block w-full" : ""
          }`}
        >
          {value ?? "—"}
        </span>
        {copyable && value && (
          <button
            onClick={() => copyToClipboard(value, label)}
            className="flex-shrink-0 p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy"
          >
            <FaCopy size={11} />
          </button>
        )}
      </div>
      {copied === label && (
        <span className="text-xs text-green-500 font-medium">Copied!</span>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-1 py-2">
      {/* ── Back ── */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-5 group"
      >
        <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
          <FaArrowLeft size={11} />
        </span>
        Back to history
      </button>

      {/* ── Main Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* ── Card Header ── */}
        <div className="px-6 pt-6 pb-5 border-b border-gray-50">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                Transaction details
              </h1>
              <p className="text-xs font-mono text-gray-400 mt-1">#{tx.id}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${typeCls}`}
              >
                {typeIcon}
                {tx.transaction_type}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusCls}`}
              >
                {statusIcon}
                {tx.status}
              </span>
            </div>
          </div>

          {/* Amount hero */}
          <div className="mt-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Amount
            </p>
            <p className={`text-4xl font-bold tabular-nums ${amountCls}`}>
              ₦{Number(tx.amount).toLocaleString()}
            </p>
          </div>
        </div>

        {/* ── From → To Flow ── */}
        <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/40">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Flow
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">From</p>
              <p className="font-mono text-sm font-semibold text-gray-700 truncate">
                {tx.from_acct_no ?? "—"}
              </p>
            </div>

            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-600 flex items-center justify-center shadow-sm">
              <FaArrowUp size={12} className="text-white rotate-45" />
            </div>

            <div className="flex-1 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">To</p>
              <p className="font-mono text-sm font-semibold text-gray-700 truncate">
                {tx.to_acct_no ?? "—"}
              </p>
            </div>
          </div>
        </div>

        {/* ── Detail Fields ── */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Transaction ID" value={tx.id} mono copyable />
            <Field label="Account" value={tx.account} mono copyable />
            <Field label="Reference" value={tx.reference} mono copyable />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Date &amp; time
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <FaCalendarAlt size={12} className="text-gray-400 flex-shrink-0" />
                <span>
                  {new Date(tx.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                  {" · "}
                  {new Date(tx.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div className="sm:col-span-2">
              <Field label="Description" value={tx.description} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TransactionDetails;