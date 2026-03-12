import bgImage from "../../assets/images/loginpage-pic.jpg";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../../providers/AuthProvider";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", data);
      console.log("FULL RESPONSE:", res.data);
      console.log("USER:", res.data.user);
      console.log("ROLES:", res.data.user.roles);
      console.log("TYPE OF ROLES:", typeof res.data.user.roles);
      console.log("FIRST ROLE:", res.data.user.roles);

      const mainRole = res.data.user.roles;

      setAuth({
        ...res.data,
        role: mainRole,
      });
      console.log("Login response:", res.data);
      console.log("User main role:", mainRole);

      // ===== Navigate based on role =====
      switch (mainRole) {
        case "SuperAdmin":
          navigate("/superadmin");
          break;
        case "Admin":
          navigate("/admin");
          break;
        case "CustomerCare":
          navigate("/customercare");
          break;
        case "User":
          navigate("/user");
          break;
        default:
          navigate("/unauthorized");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-end px-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <ToastContainer />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-2">Welcome Back</h2>

        <p className="text-gray-600 mb-6">Login to your Legion Bank account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              value={data.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={data.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button" className="text-green-700 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
