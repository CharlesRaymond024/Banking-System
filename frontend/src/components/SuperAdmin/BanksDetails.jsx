import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaExchangeAlt,
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { BsWallet2 } from "react-icons/bs";
import { MdAdminPanelSettings, MdAccountBalance } from "react-icons/md";
import { useState } from "react";

const BanksDetails = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const { bank_id } = useParams();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const { data: bankData, loading: bankLoading } = useFetch(
    `/bank/get/${bank_id}`,
    token,
  );

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useFetch(`/user/get-by-bank/${bank_id}`, token);

  const {
    data: accountsData,
    loading: accountsLoading,
    error: accountsError,
  } = useFetch(`/account/get-by-bank/${bank_id}`, token);

  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
  } = useFetch(`/transaction/get/bank/${bank_id}`, token);

  const allUsers = usersData ?? [];
  const admins = allUsers.filter((u) => u.roles === "Admin");
  const regularUsers = allUsers.filter((u) => u.roles === "User");
  const transactions = transactionsData?.transactions ?? transactionsData ?? [];

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const cards = [
    {
      key: "users",
      label: "Total Users",
      value: usersLoading ? null : usersError ? "—" : regularUsers.length,
      loading: usersLoading,
      error: usersError,
      icon: <FaUsers size={22} className="text-green-700" />,
      bg: "bg-green-50",
      border: "border-green-100",
      dropdownContent: regularUsers,
      renderItem: (user) => (
        <div
          key={user.id}
          className="flex items-center gap-3 py-2.5 px-3 hover:bg-green-50 rounded-lg transition"
        >
          <div className="w-7 h-7 rounded-full bg-green-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {user.firstname?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              {user.firstname} {user.lastname}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <span
            className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
              user.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {user.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      ),
    },
    {
      key: "admins",
      label: "Total Admins",
      value: usersLoading ? null : usersError ? "—" : admins.length,
      loading: usersLoading,
      error: usersError,
      icon: <MdAdminPanelSettings size={24} className="text-emerald-700" />,
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      dropdownContent: admins,
      renderItem: (admin) => (
        <div
          key={admin.id}
          className="flex items-center gap-3 py-2.5 px-3 hover:bg-emerald-50 rounded-lg transition"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {admin.firstname?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              {admin.firstname} {admin.lastname}
            </p>
            <p className="text-xs text-gray-400 truncate">{admin.email}</p>
          </div>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-700 shrink-0">
            Admin
          </span>
        </div>
      ),
    },
    {
      key: "accounts",
      label: "Total Accounts",
      value: accountsLoading
        ? null
        : accountsError
          ? "—"
          : (accountsData?.length ?? 0),
      loading: accountsLoading,
      error: accountsError,
      icon: <BsWallet2 size={22} className="text-teal-700" />,
      bg: "bg-teal-50",
      border: "border-teal-100",
      dropdownContent: accountsData ?? [],
      renderItem: (account) => (
        <div
          key={account.id}
          className="flex items-center gap-3 py-2.5 px-3 hover:bg-teal-50 rounded-lg transition"
        >
          <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {account.accountName?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              {account.accountName}
            </p>
            <p className="text-xs text-gray-400 font-mono">
              {account.accountNumber}
            </p>
          </div>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium bg-teal-100 text-teal-700 shrink-0 capitalize">
            {account.accountType}
          </span>
        </div>
      ),
    },
    {
      key: "transactions",
      label: "Total Transactions",
      value: transactionsLoading
        ? null
        : transactionsError
          ? "—"
          : transactions.length,
      loading: transactionsLoading,
      error: transactionsError,
      icon: <FaExchangeAlt size={20} className="text-lime-700" />,
      bg: "bg-lime-50",
      border: "border-lime-100",
      dropdownContent: transactions,
      renderItem: (tx) => (
        <div
          key={tx.id}
          className="flex items-center gap-3 py-2.5 px-3 hover:bg-lime-50 rounded-lg transition"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              tx.transaction_type === "deposit"
                ? "bg-green-100 text-green-700"
                : tx.transaction_type === "withdrawal"
                  ? "bg-red-100 text-red-600"
                  : "bg-purple-100 text-purple-700"
            }`}
          >
            <FaExchangeAlt size={12} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate capitalize">
              {tx.transaction_type}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {tx.description ?? "—"}
            </p>
          </div>
          <span className="ml-auto text-sm font-bold text-gray-800 shrink-0">
            ₦
            {Number(tx.amount).toLocaleString("en-NG", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium text-sm mb-6 transition"
      >
        <FaArrowLeft size={13} />
        Back to Banks
      </button>

      {/* Bank Banner */}
      <div className="bg-green-900 text-white rounded-2xl p-6 mb-8 flex justify-between items-center shadow-md">
        <div>
          {bankLoading ? (
            <div className="h-7 w-48 bg-white/20 rounded-lg animate-pulse mb-2" />
          ) : (
            <h1 className="text-2xl font-bold">
              {bankData?.name ?? `Bank #${bank_id}`}
            </h1>
          )}
          <p className="text-green-300 text-sm mt-1">Bank Overview</p>
        </div>
        <div className="p-3 bg-white/10 rounded-xl">
          <MdAccountBalance size={32} className="text-white" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {cards.map((card) => (
          <div
            key={card.key}
            className={`${card.bg} border ${card.border} rounded-2xl shadow-sm overflow-hidden`}
          >
            {/* Card Header */}
            <div className="p-5 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm shrink-0">
                {card.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-500 text-sm">{card.label}</p>
                {card.loading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded-lg animate-pulse mt-1" />
                ) : card.error ? (
                  <p className="text-sm text-red-500 mt-1">Failed to load</p>
                ) : (
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {card.value}
                  </p>
                )}
              </div>
            </div>

            {/* Dropdown Toggle */}
            {!card.loading &&
              !card.error &&
              card.dropdownContent?.length > 0 && (
                <button
                  onClick={() => toggleDropdown(card.key)}
                  className="w-full flex items-center justify-between px-5 py-2.5 border-t border-white/60 text-xs font-medium text-gray-500 hover:text-gray-700 transition bg-white/40 hover:bg-white/60"
                >
                  <span>
                    {openDropdown === card.key ? "Hide" : "View"} details
                  </span>
                  {openDropdown === card.key ? (
                    <FaChevronUp size={11} />
                  ) : (
                    <FaChevronDown size={11} />
                  )}
                </button>
              )}

            {/* Dropdown List */}
            {openDropdown === card.key && (
              <div className="bg-white border-t border-gray-100 max-h-56 overflow-y-auto px-2 py-2">
                {card.dropdownContent?.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    No data available
                  </p>
                ) : (
                  card.dropdownContent.map((item) => card.renderItem(item))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BanksDetails;
