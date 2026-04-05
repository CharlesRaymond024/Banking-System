import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const UpdateCustomerCare = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth?.accessToken;

  // Fetch user
  const { data: userData, loading: userLoading } = useFetch(
    `/user/get/${id}`,
    token,
  );

  // Fetch banks
  const { data: bankData } = useFetch("/bank/get", token);

  // Update hook
  const { data, loading, error, updateData } = useUpdate(
    `/user/${id}/update`,
    token,
  );

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    roles: "CustomerCare",
    bank_id: "",
    isActive: true,
    isSuspended: false,
  });

  // ✅ Prefill form when user loads
  useEffect(() => {
    if (userData) {
      setFormData({
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        email: userData.email || "",
        phone: userData.phone || "",
        password: "", // don't preload password
        roles: userData.roles || "CustomerCare",
        bank_id: userData.bank || "", // 👈 your backend uses "bank"
        isActive: userData.isActive,
        isSuspended: userData.isSuspended,
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: remove empty password
    const payload = { ...formData };
    if (!payload.password) delete payload.password;

    await updateData(payload);
  };

  // ✅ Success
  useEffect(() => {
    if (data) {
      toast.success("Customer Care updated successfully!");

      setTimeout(() => {
        navigate("/superadmin/support");
      }, 1500);
    }
  }, [data, navigate]);

  // ❌ Error
  useEffect(() => {
    if (error) {
      toast.error(error?.message || "Update failed");
    }
  }, [error]);

  const banks = bankData || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <ToastContainer position="top-right" />

      <div className="w-full max-w-2xl backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white"
          >
            <FaArrowLeft />
            Back
          </button>

          <h1 className="text-white text-xl font-semibold">
            Update Customer Care
          </h1>
        </div>

        {userLoading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
              required
            />

            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white"
              required
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white"
              required
            />

            {/* Password (optional) */}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password (optional)"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white"
            />

            {/* Role */}
            <input
              type="text"
              value="CustomerCare"
              disabled
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-gray-300"
            />

            {/* Bank */}
            <select
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white"
              required
            >
              <option value="" className="text-black">
                Select Bank
              </option>

              {banks.map((bank) => (
                <option key={bank.id} value={bank.id} className="text-black">
                  {bank.name}
                </option>
              ))}
            </select>

            {/* Toggles */}
            <div className="flex justify-between text-white text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                Active
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isSuspended"
                  checked={formData.isSuspended}
                  onChange={handleChange}
                />
                Suspended
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium ${
                loading
                  ? "bg-gray-500"
                  : "bg-yellow-500 hover:bg-yellow-600 text-white"
              }`}
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateCustomerCare;
