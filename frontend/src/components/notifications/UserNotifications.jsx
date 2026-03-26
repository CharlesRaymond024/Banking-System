import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { FaBell } from "react-icons/fa";
import { useMemo } from "react";
import { FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserNotifications = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const userId = auth?.user?.id;

  const {
    data: notificationsData,
    loading,
    error,
  } = useFetch(userId ? `/notification/get-by-user/${userId}` : null, token);

  const notifications = useMemo(
    () => notificationsData?.data?.notifications || [],
    [notificationsData],
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <p className="text-sm text-gray-400 mt-1">
          All your recent activities and updates
        </p>
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
          Failed to load notifications.
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y">
          {notifications.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <FaBell size={40} className="mx-auto mb-3 opacity-20" />
              No notifications yet
            </div>
          ) : (
            notifications.map((note, index) => (
              <div
                key={index}
                className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <FaBell size={14} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm text-gray-700 font-medium">
                    {note.description}
                  </p>

                  {/* Type */}
                  {note.type && (
                    <span className="inline-block mt-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded capitalize">
                      {note.type}
                    </span>
                  )}

                  {/* Time */}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(note.time).toLocaleString()}
                  </p>

                  {/* View Button Centered */}
                  <div className="flex justify-center mt-3">
                    <NavLink
                      to={`/user/notifications/${note.id}`}
                      className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow"
                    >
                      <FaEye size={11} />
                      View
                    </NavLink>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserNotifications;
