import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { FaBell, FaArrowLeft } from "react-icons/fa";

const NotificationDetails = () => {
  const { notification_id } = useParams();
  const navigate = useNavigate();

  const { auth } = useAuth();
  const token = auth?.accessToken;

  const { data, loading, error } = useFetch(
    notification_id ? `/notification/get/${notification_id}` : null,
    token,
  );

  const notification = data?.data || data; // handle flexible backend response

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
          Failed to load notification.
        </div>
      )}

      {/* Content */}
      {!loading && !error && notification && (
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
          {/* Icon + Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <FaBell size={18} />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Notification Details
              </h1>

              {notification.type && (
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded capitalize">
                  {notification.type}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              {notification.description}
            </p>
          </div>

          {/* Time */}
          <div className="text-xs text-gray-400">
            {notification.time
              ? new Date(notification.time).toLocaleString()
              : "No timestamp"}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && !notification && (
        <div className="text-center text-gray-400 py-20">
          Notification not found
        </div>
      )}
    </div>
  );
};

export default NotificationDetails;
