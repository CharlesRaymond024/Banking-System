import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import LoadingGif from "../../assets/spinner.gif";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Bank = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch("/bank/get", auth?.accessToken);
  console.log(data);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Banks</h1>

      {/* Error */}
      {error && <p className="text-red-500 mb-4">Error fetching banks</p>}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <img src={LoadingGif} alt="Loading..." className="w-12 h-12" />
        </div>
      )}

      {/* Content */}
      {data && (
        <>
          {/* Total Count */}
          <p className="mb-6 text-gray-600 font-medium">
            Total Banks:{" "}
            <span className="text-green-700 font-bold">
              {data?.banks?.length}
            </span>
          </p>

          {/* Bank Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((bank, index) => (
              <div
                key={bank.id || index}
                className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition duration-300"
              >
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                {/* Name */}
                <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
                  {bank.name}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-500 text-center mb-4">
                  {bank.description}
                </p>

                {/* Details */}
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Email:</span> {bank.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {bank.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> {bank.address}
                  </p>
                </div>

                {/* Status */}
                <div className="mt-4 flex justify-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      bank.isSuspended
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {bank.isSuspended ? "Suspended" : "Active"}
                  </span>
                </div>

                {/* Button */}
                <div className="mt-5">
                  <button
                    onClick={() => navigate(`/superadmin/bank/${bank.id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-95 transition-all duration-200 text-white text-sm font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg"
                  >
                    View Bank Details
                    <FiArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Bank;
