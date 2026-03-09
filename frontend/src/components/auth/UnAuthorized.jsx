import { Link } from "react-router-dom";

export default function Unauthorized() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">Unauthorized</h2>
                <p className="text-gray-600 mb-8">You don't have permission to access this resource.</p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}