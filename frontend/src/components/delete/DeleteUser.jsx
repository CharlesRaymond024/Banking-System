import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDelete from "../../hooks/useDelete";
import useAuth from "../../hooks/useAuth";

const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { loading, error, deleteData } = useDelete("/user", auth?.accessToken);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      navigate("/superadmin/users");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const handleDelete = async () => {
    const result = await deleteData(`${id}/delete`);
    if (result !== undefined) {
      setCountdown(3);
    }
  };

  const handleCancel = () => navigate("/superadmin/users");

  const isDeleted = countdown !== null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Delete User</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            {isDeleted ? (
              "User has been deleted successfully."
            ) : (
              <>
                You're about to permanently delete user{" "}
                <span className="font-semibold text-gray-800">#{id}</span>. This
                action cannot be undone.
              </>
            )}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-5">
            <svg
              className="mt-0.5 shrink-0"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>
              {typeof error === "string"
                ? error
                : error?.message || "An error occurred. Please try again."}
            </span>
          </div>
        )}

        {/* Success */}
        {isDeleted && (
          <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-600 rounded-lg px-4 py-3 text-sm mb-5">
            <svg
              className="shrink-0"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>
              Redirecting to user list in <strong>{countdown}</strong>s…
            </span>
          </div>
        )}

        {/* Actions */}
        {!isDeleted ? (
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                  Deleting…
                </>
              ) : (
                "Delete User"
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/superadmin/users")}
            className="w-full py-2.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition mt-1"
          >
            Go to User List
          </button>
        )}
      </div>
    </div>
  );
};

export default DeleteUser;
