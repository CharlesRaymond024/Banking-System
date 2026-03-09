import { useNavigate } from 'react-router-dom';

export default function Page404() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-2xl font-semibold text-gray-600 mb-2">Page Not Found</p>
                <p className="text-gray-500 mb-8">Sorry, the page you're looking for doesn't exist.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}