import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import LoadingGif from "../../assets/spinner.gif";
import { useNavigate } from "react-router-dom";

const SuperAdminUsers = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useFetch("/user/get", auth?.accessToken);

  const { data: banks, loading: banksLoading } = useFetch(
    "/bank/get",
    auth?.accessToken,
  );

  // function to convert bank id → bank name
  const getBankName = (bankId) => {
    const bank = banks?.find((b) => b.id === bankId);
    return bank ? bank.name : "N/A";
  };

  const totalUsers = users?.length || 0;

  const activeUsers = users?.filter((user) => user.isActive).length || 0;

  if (usersLoading || banksLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <img src={LoadingGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  if (usersError) {
    return <p className="text-red-500">{usersError}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-gray-500 text-sm">Total Users:</h3>
          <p className="text-3xl font-bold text-green-700">{totalUsers}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-gray-500 text-sm">Active Users:</h3>
          <p className="text-3xl font-bold text-green-700">{activeUsers}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/superadmin/CreateUserandAccount")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create User & Account
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Bank</th>
              <th className="p-4">Role</th>
              <th className="p-4">Active Users</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  {user.firstname} {user.lastname}
                </td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">{user.phone || "N/A"}</td>

                <td className="p-4">{getBankName(user.bank)}</td>

                <td className="p-4">{user.roles}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/superadmin/users/${user.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>

                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                    Disable
                  </button>

                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminUsers;
