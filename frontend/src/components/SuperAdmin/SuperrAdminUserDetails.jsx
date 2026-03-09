import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import Spinner from "../../assets/spinner.gif";

const SuperAdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const {
    data: user,
    loading,
    error,
  } = useFetch(`/user/get/${id}`, auth?.accessToken);

  const { data: banks, loading: banksLoading } = useFetch(
    "/bank/get",
    auth?.accessToken,
  );

  if (loading || banksLoading)
    return <img src={Spinner} alt="Loading..." className="w-16 h-16" />;

  if (error) {
    return (
      <p className="text-red-500 text-center">Failed to load user details</p>
    );
  }
  const bankName = Array.isArray(banks)
    ? banks.find((bank) => bank.id === user?.bank)?.name || "N/A"
    : "N/A";

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate("/superadmin/users")}
        className="mb-6 bg-yellow-600 hover:bg-green-700 px-4 py-4 rounded transition duration-300"
      >
        ← Back to Users
      </button>
      

      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-green-700">User Details</h2>

        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {user?.firstname} {user?.lastname}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>Phone:</strong> {user?.phone || "N/A"}
          </p>

          <p>
            <strong>Bank:</strong> {user?.bank} {bankName}
          </p>

          <p>
            <strong>Role:</strong> {user?.roles}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                user?.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user?.isActive ? "Active" : "Inactive"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminUserDetails;
