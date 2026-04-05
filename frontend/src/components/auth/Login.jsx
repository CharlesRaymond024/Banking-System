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
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <ToastContainer toastClassName="!rounded-2xl !text-sm !font-medium" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-transparent" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-900/30 overflow-hidden">
          {/* Green top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-green-600 via-green-500 to-green-400" />

          <div className="p-7">
            {/* Logo + Header inline */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                <MdAccountBalance size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest leading-none">
                  Legion Bank
                </p>
                <p
                  className="text-lg font-bold text-slate-800 leading-tight"
                  style={{
                    fontFamily: "'Sora', 'DM Sans', sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Welcome back
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
                  Email
                </label>
                <div className="relative">
                  <HiOutlineMail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={data.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 outline-none transition-all hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
                  Password
                </label>
                <div className="relative">
                  <HiOutlineLockClosed
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={data.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 outline-none transition-all hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <HiOutlineEyeOff size={15} />
                    ) : (
                      <HiOutlineEye size={15} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={persist}
                      onChange={togglePersist}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-200 rounded-full peer-checked:bg-green-500 transition-colors duration-200" />
                    <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-4" />
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-green-600 hover:text-green-800 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md active:scale-[0.99] flex items-center justify-center text-sm mt-1"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-white/40 mt-4 font-medium">
          © {new Date().getFullYear()} Legion Bank · Secure Portal
        </p>
      </div>
    </div>
  );
};

export default Login;
