import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
import { useFetch } from "../../hooks/useFetch"; // ✅ ADD THIS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCustomerCare = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth?.accessToken;

  const { data, loading, error, postData } = usePost(
    "/user/create",
    token
  );

  // ✅ Fetch banks
  const { data: bankData } = useFetch("/bank/get", token);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    roles: "CustomerCare",
    bank: "", // ✅ ADD THIS
    isActive: true,
    isSuspended: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await postData(formData);

    if (res) {
      toast.success("Customer Care created successfully!");

      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        roles: "CustomerCare",
        bank: "", // reset
        isActive: true,
        isSuspended: false,
      });

      setTimeout(() => {
        navigate("/superadmin/support");
      }, 1500);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.message || "Error creating user");
    }
  }, [error]);

  const banks = bankData || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <ToastContainer position="top-right" />

      <div className="w-full max-w-2xl backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-2xl font-semibold">
            Create Customer Care
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            ← Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            required
          />

          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            required
          />

          {/* Role */}
          <input
            type="text"
            value="CustomerCare"
            disabled
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-gray-300 cursor-not-allowed"
          />

          {/* ✅ Bank Dropdown */}
          <select
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none"
          >
            <option value="" className="text-black">
              Select Bank
            </option>

            {banks.map((bank) => (
              <option
                key={bank.id}
                value={bank.id}
                className="text-black"
              >
                {bank.name}
              </option>
            ))}
          </select>

          {/* Toggles */}
          <div className="flex items-center justify-between text-white text-sm">
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
            className={`w-full py-3 rounded-lg font-medium transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Creating..." : "Create CustomerCare"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomerCare;