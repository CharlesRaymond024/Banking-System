import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AllBanksRevenue = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const navigate = useNavigate();

  const { data, loading } = useFetch(
    "/bank/get/banks/revenue",
    token
  );
  

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!data || data.length == 0) {
    return <p className="text-center mt-10">No data available</p>;
  }
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Banks Revenue Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((bank, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold mb-2">
              {bank.bank}
            </h2>

            <p className="text-gray-500 mb-4">
              Total Revenue
            </p>

            <h3 className="text-xl font-bold mb-4">
              ₦{bank.totalRevenue.toLocaleString()}
            </h3>

            <button
              onClick={() => navigate(`/superadmin/revenue/${bank.bank_id}`)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBanksRevenue;