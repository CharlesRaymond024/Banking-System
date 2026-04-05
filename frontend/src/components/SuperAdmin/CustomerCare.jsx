import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // ✅ icons

const CustomerCare = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `/user/get-by-role/CustomerCare`,
    token
  );

  const users = useMemo(() => {
    return data || [];
  }, [data]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User deleted successfully");
      window.location.reload();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6">
      {/* Header + Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Customer Care Users
        </h1>

        <button
          onClick={() => navigate("/superadmin/create-customer-care")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow-md transition"
        >
          + Create
        </button>
      </div>

      {loading && <p className="text-gray-500 text-sm">Loading users...</p>}
      {error && <p className="text-red-500 text-sm">Failed to load users</p>}

      {!loading && !error && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            
            {/* Table Head */}
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">First Name</th>
                <th className="px-6 py-4">Last Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Bank</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-700">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 font-medium">
                      {user.firstname}
                    </td>

                    <td className="px-6 py-4">{user.lastname}</td>

                    <td className="px-6 py-4">{user.email}</td>

                    <td className="px-6 py-4">{user.phone}</td>

                    {/* Bank */}
                    <td className="px-6 py-4">
                      {user.Bank?.name || "—"}
                    </td>

                    <td className="px-6 py-4 capitalize">
                      {user.roles}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {user.isSuspended ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          Suspended
                        </span>
                      ) : user.isActive ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">

                        {/* View */}
                        <button
                          onClick={() =>
                            navigate(`/superadmin/customer-care/${user.id}`)
                          }
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="View"
                        >
                          <FaEye />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate(`/superadmin/customer-care/${user.id}/update`)
                          }
                          className="text-yellow-600 hover:text-yellow-800 transition"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-6 text-center text-gray-500"
                  >
                    No customer care users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerCare;