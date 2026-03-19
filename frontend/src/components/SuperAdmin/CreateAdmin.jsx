import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import { toast } from "react-toastify";

export default function CreateAdmin() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const accessToken = auth?.accessToken;

  // 🔥 Fetch banks
  const {
    data: banks,
    loading: banksLoading,
    error: banksError,
  } = useFetch("/bank/get", accessToken);

  const { postData: createUser, loading } = usePost(
    "/user/create",
    accessToken,
  );

  const [adminData, setAdminData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    bank: "",
    roles: "Admin", // force role
  });

  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(adminData);

      toast.success("Admin created successfully!");

      setTimeout(() => {
        navigate("/superadmin/admins");
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Failed to create admin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Admin</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-4">
              Admin Information
            </h2>

            <div className="grid grid-cols-2 gap-5">
              <input
                name="firstname"
                placeholder="First Name"
                value={adminData.firstname}
                onChange={handleChange}
                className="input"
                required
              />

              <input
                name="lastname"
                placeholder="Last Name"
                value={adminData.lastname}
                onChange={handleChange}
                className="input"
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={adminData.email}
                onChange={handleChange}
                className="input"
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                value={adminData.phone}
                onChange={handleChange}
                className="input"
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={adminData.password}
                onChange={handleChange}
                className="input"
                required
              />

              {/* 🔥 BANK SELECT */}
              <select
                name="bank"
                value={adminData.bank}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">
                  {banksLoading ? "Loading banks..." : "Select Bank"}
                </option>

                {Array.isArray(banks) &&
                  banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
              </select>

              {banksError && (
                <p className="text-red-500 text-sm col-span-2">
                  Failed to load banks
                </p>
              )}

              {/* ROLE (readonly) */}
              <input
                name="role"
                value="Admin"
                readOnly
                className="input bg-gray-100 cursor-not-allowed col-span-2"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate("/superadmin/admins")}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Go Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
