import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaExchangeAlt, FaSearch } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const bankId = auth?.user?.bank;
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { data: usersData, loading, error } = useFetch(
    bankId ? `/user/get-by-bank/${bankId}` : null,
    token
  );

  const filtered = usersData?.filter((user) => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
          <p className="text-sm text-gray-400 mt-1">
            All users under your bank
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm w-64">
          <FaSearch size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
          Failed to load users. Please try again.
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <>
          <p className="text-sm text-gray-500 mb-3">
            Showing{" "}
            <span className="font-semibold text-blue-700">
              {filtered?.length ?? 0}
            </span>{" "}
            user{filtered?.length !== 1 ? "s" : ""}
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-800 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">#</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filtered?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-gray-400">
                      <MdPerson size={40} className="mx-auto mb-2 opacity-30" />
                      No users found
                    </td>
                  </tr>
                ) : (
                  filtered?.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-blue-50 transition duration-150"
                    >
                      <td className="px-5 py-4 text-gray-400 font-medium">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs shadow">
                            {user.firstname?.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-700">
                            {user.firstname} {user.lastname}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-gray-500">{user.email}</td>
                      <td className="px-5 py-4 text-gray-500">{user.phone}</td>

                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {user.roles}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() =>
                            navigate(`/admin/users/${user.id}/transactions`, {
                              state: { user }, // ← pass user data so we don't need another fetch
                            })
                          }
                          className="flex items-center gap-2 mx-auto bg-blue-700 hover:bg-blue-800 active:scale-95 transition-all duration-200 text-white text-xs font-medium px-4 py-2 rounded-lg shadow"
                        >
                          <FaExchangeAlt size={12} />
                          View Transactions
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminUsers;