import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import useUpdate from "../../hooks/useUpdate";
import {
  FaBell,
  FaEye,
  FaCheck,
  FaEnvelopeOpen,
  FaArrowLeft,
} from "react-icons/fa";
import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserNotifications = () => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const userId = auth?.user?.id;

  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedId, setSelectedId] = useState(null);
  const [actionType, setActionType] = useState(null);

  // 🔄 Fetch
  const {
    data: notificationsData,
    loading,
    error,
  } = useFetch(
    userId
      ? filter === "unread"
        ? `/notification/unread/all`
        : `/notification/get-by-user/${userId}`
      : null,
    token,
    refreshKey,
  );

  const notifications = useMemo(
    () => notificationsData?.data?.notifications || [],
    [notificationsData],
  );

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const refresh = () => setRefreshKey((prev) => prev + 1);

  // ✅ Hooks
  const { updateData: markAllUpdate } = useUpdate(
    userId ? `/notification/mark-all-as-read/${userId}` : null,
    token,
  );

  const dynamicUrl =
    selectedId && actionType === "read"
      ? `/notification/mark-as-read/${selectedId}`
      : selectedId && actionType === "unread"
        ? `/notification/mark-as-unread/${selectedId}`
        : null;

  const { updateData: updateSingle } = useUpdate(dynamicUrl, token);

  // Actions
  const markAllAsRead = async () => {
    try {
      await markAllUpdate();
      toast.success("All notifications marked as read");
      refresh();
    } catch {
      toast.error("Failed to mark all as read");
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      setSelectedId(id);
      setActionType("read");

      await updateSingle();
      toast.success("Marked as read");
      refresh();
    } catch {
      toast.error("Failed");
    }
  };

  const handleMarkAsUnread = async (id) => {
    try {
      setSelectedId(id);
      setActionType("unread");

      await updateSingle();
      toast.info("Marked as unread");
      refresh();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-500 text-sm">Failed to load notifications</div>
      )}

      {/* List */}
      {!loading && !error && (
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-slate-400 hover:text-white flex items-center gap-2"
            >
              <FaArrowLeft size={12} />
              Back
            </button>

            <h2 className="text-lg font-semibold text-slate-200">
              Notifications
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 mb-5">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-xs rounded-lg ${
                filter === "all"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1 text-xs rounded-lg ${
                filter === "unread"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              Unread
            </button>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="ml-auto text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                <FaCheck size={10} />
                Mark all
              </button>
            )}
          </div>

          {/* List */}
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <FaBell size={28} className="mx-auto mb-2 opacity-30" />
                No notifications
              </div>
            ) : (
              notifications.map((note) => (
                <div
                  key={note.id}
                  className={`p-4 rounded-xl border backdrop-blur-md transition ${
                    !note.read
                      ? "bg-amber-500/10 border-amber-500/20"
                      : "bg-slate-800/40 border-slate-700/50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-slate-200 font-medium">
                      {note.description}
                    </p>

                    {!note.read ? (
                      <button
                        onClick={() => handleMarkAsRead(note.id)}
                        className="text-amber-400 text-xs hover:underline"
                      >
                        Read
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkAsUnread(note.id)}
                        className="text-slate-400 text-xs hover:text-white"
                      >
                        Unread
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(note.time).toLocaleString()}
                  </p>

                  <NavLink
                    to={`/user/notifications/${note.id}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs text-amber-400 hover:underline"
                  >
                    <FaEye size={10} />
                    View details
                  </NavLink>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNotifications;
