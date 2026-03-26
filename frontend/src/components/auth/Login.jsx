import bgImage from "../../assets/images/loginpage-pic.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { MdAccountBalance } from "react-icons/md";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", data);
      const mainRole = res.data.user.roles;
      setAuth({ ...res.data, role: mainRole });
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
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePersist = () => setPersist((prev) => !prev);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-end px-6 md:px-16"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <ToastContainer toastClassName="!rounded-2xl !text-sm !font-medium" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-transparent" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-900/30 overflow-hidden">
          {/* ✅ GREEN Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-green-600 via-green-500 to-green-400" />

          <div className="p-8 md:p-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-300/40">
                <MdAccountBalance size={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Legion Bank
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  DashBoard Portal
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-7">
              <h2
                className="text-2xl font-bold text-slate-800 mb-1"
                style={{
                  fontFamily: "'Sora', 'DM Sans', sans-serif",
                  letterSpacing: "-0.025em",
                }}
              >
                Welcome back
              </h2>
              <p className="text-sm text-slate-400">
                Sign in to your account to continue
              </p>
            </div>

            {/* ✅ FORM WRAPPED BELOW HEADER */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <HiOutlineMail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      value={data.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 placeholder-slate-300 outline-none transition-all duration-150 hover:border-blue-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <HiOutlineLockClosed
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={data.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 placeholder-slate-300 outline-none transition-all duration-150 hover:border-blue-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <HiOutlineEyeOff size={16} />
                      ) : (
                        <HiOutlineEye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={persist}
                        onChange={togglePersist}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 rounded-full peer-checked:bg-blue-500 transition-colors duration-200" />
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-4" />
                    </div>
                    <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-2xl transition-all duration-200 shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? "Signing in…" : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/50 mt-5 font-medium">
          © {new Date().getFullYear()} Legion Bank · Secure Portal
        </p>
      </div>
    </div>
  );
};

export default Login;
