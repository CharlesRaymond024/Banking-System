import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

const CustomerCareDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth?.accessToken;

  const { data, loading, error } = useFetch(`/user/get/${id}`, token);

  const user = data || {};

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft />
          Back
        </button>

        <button
          onClick={() => navigate(`/superadmin/customer-care/${id}/update`)}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          <FaEdit />
          Edit
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Failed to load user</p>}

      {!loading && !error && (
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
          {/* User Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-xl font-bold text-green-700">
              {user.firstname?.[0]}
              {user.lastname?.[0]}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500">First Name</p>
              <p className="font-medium text-gray-800">{user.firstname}</p>
            </div>

            <div>
              <p className="text-gray-500">Last Name</p>
              <p className="font-medium text-gray-800">{user.lastname}</p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{user.email}</p>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">{user.phone}</p>
            </div>

            <div>
              <p className="text-gray-500">Role</p>
              <p className="font-medium text-gray-800">{user.roles}</p>
            </div>

            {/* Status */}
            <div>
              <p className="text-gray-500">Status</p>

              {user.isSuspended ? (
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  Suspended
                </span>
              ) : user.isActive ? (
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Active
                </span>
              ) : (
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                  Inactive
                </span>
              )}
            </div>
          </div>

          {/* Bank Section */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Bank Information
            </h3>

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
              {user.Bank?.logo && (
                <img
                  src={user.Bank.logo}
                  alt="bank logo"
                  className="w-12 h-12 object-cover rounded-lg"
                />
              )}

              <div>
                <p className="font-medium text-gray-800">
                  {user.Bank?.name || "No Bank Assigned"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCareDetails;
