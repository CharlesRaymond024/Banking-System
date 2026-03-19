import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";

export default function AdminDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const accessToken = auth?.accessToken;

  const {
    data: admin,
    loading,
    error,
  } = useFetch(`/user/get/${id}`, accessToken);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/superadmin/admins")}
        className="mb-6 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg shadow-sm transition"
      >
        ← Back
      </button>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">Failed to load admin</p>
      ) : !admin ? (
        <p>No admin found</p>
      ) : (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          {/* HEADER */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={admin?.Bank?.logo}
              alt="bank logo"
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {admin.firstname} {admin.lastname}
              </h2>
              <p className="text-sm text-gray-500">{admin.email}</p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium text-gray-700">{admin.phone}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Role</span>
              <span className="text-blue-600 font-semibold">{admin.roles}</span>
            </div>

            <div className="flex justify-between border-b pb-2 items-center">
              <span className="text-gray-500">Bank</span>
              <div className="flex items-center gap-2">
                <img
                  src={admin?.Bank?.logo}
                  alt="bank"
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium text-gray-700">
                  {admin?.Bank?.name || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Status</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  admin.isSuspended
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {admin.isSuspended ? "Suspended" : "Active"}
              </span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => navigate(`/superadmin/admins/edit/${admin.id}`)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </button>

            <button
              onClick={() => console.log("Delete admin:", admin.id)}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
