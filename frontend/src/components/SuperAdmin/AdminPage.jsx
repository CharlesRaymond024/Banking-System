import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import Spinner from "../../assets/spinner.gif";

// Recharts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AdminPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const accessToken = auth?.accessToken;

  const { data: users, loading, error } = useFetch("/user/get", accessToken);

  // ✅ Always return array
  const admins = Array.isArray(users)
    ? users.filter((user) => user.roles === "Admin")
    : [];

  // Generate mock activity data
  const activityData = admins.map((admin) => ({
    name: `${admin.firstname}`,
    actions: Math.floor(Math.random() * 50) + 1, // replace with real activity counts from backend if available
  }));

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Admins</h1>

        <button
          onClick={() => navigate("/superadmin/create-admin")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Admin
        </button>
      </div>

      {/* ACTIVITY GRAPH */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Admin Activity
        </h2>

        {admins.length === 0 ? (
          <p className="text-gray-500 text-center">No activity to display</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={activityData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="actions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <img
            src={Spinner}
            alt="Loading..."
            className="w-10 h-10 animate-spin"
          />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">Failed to load admins</p>
      ) : admins.length === 0 ? (
        <p className="text-center text-gray-500">No admins found</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {admins.map((admin) => (
            <div
              key={admin.id}
              onClick={() => navigate(`/superadmin/admins/${admin.id}`)}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {admin.firstname} {admin.lastname}
                </p>
                <p className="text-sm text-gray-500">{admin.email}</p>
              </div>

              <span className="text-blue-600 text-sm font-medium">
                View Details →
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
