import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../providers/AuthProvider";
import { useFetch } from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import { toast } from "react-toastify";

export default function CreateUserAndAccount() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const accessToken = auth?.accessToken;

  const [generatedAccountNumber, setGeneratedAccountNumber] = useState("");

  const {
    data: banks,
    loading: banksLoading,
    error: banksError,
  } = useFetch("/bank/get", accessToken);
  const { postData: createUser, loading: userLoading } = usePost(
    "/user/create",
    accessToken,
  );
  const { postData: createAccount, loading: accountLoading } = usePost(
    "/account/create",
    accessToken,
  );

  const [createdUser, setCreatedUser] = useState(null);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    bank: "",
  });

  const [accountData, setAccountData] = useState({
    accountName: "",
    accountType: "",
    accountNumber: "",
    user: "",
    transferPin: "",
  });

  const handleUserChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccountChange = (e) => {
    setAccountData({
      ...accountData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // CREATE USER
      const newUser = await createUser(userData);
      setCreatedUser(newUser);

      // CREATE ACCOUNT
      const accountRes = await createAccount({
        ...accountData,
        user: newUser.id,
      });

      // store generated account number
      if (accountRes) {
        setGeneratedAccountNumber(accountRes.accountNumber);

      }
      
      toast.success("User and account created successfully!");
      

      setTimeout(() => {
        navigate("/superadmin/users");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create User & Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* USER SECTION */}
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-4">
              User Information
            </h2>

            <div className="grid grid-cols-2 gap-5">
              <input
                name="firstname"
                placeholder="First Name"
                value={userData.firstname}
                onChange={handleUserChange}
                className="input"
                required
              />

              <input
                name="lastname"
                placeholder="Last Name"
                value={userData.lastname}
                onChange={handleUserChange}
                className="input"
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleUserChange}
                className="input"
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                value={userData.phone}
                onChange={handleUserChange}
                className="input"
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleUserChange}
                className="input"
                required
              />

              <select
                name="bank"
                value={userData.bank}
                onChange={handleUserChange}
                className="input"
                required
              >
                <option value="">
                  {banksLoading ? "Loading banks..." : "Select Bank"}
                </option>

                {banks &&
                  banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
              </select>
              {banksError && (
                <p className="text-red-500 text-sm">Failed to load banks</p>
              )}
            </div>
          </div>

          {/* ACCOUNT SECTION */}
          <div>
            <h2 className="text-lg font-semibold text-green-600 mb-4">
              Account Information
            </h2>

            <div className="grid grid-cols-2 gap-5">
              <input
                name="accountName"
                placeholder="Account Name"
                value={accountData.accountName}
                onChange={handleAccountChange}
                className="input"
                required
              />

              <input
                name="accountNumber"
                placeholder="Account number will be generated automatically"
                value={generatedAccountNumber || ""}
                readOnly
                className="input bg-gray-100 cursor-not-allowed"
              />

              <select
                name="accountType"
                value={accountData.accountType}
                onChange={handleAccountChange}
                className="input"
                required
              >
                <option value="">Account Type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="fixed">Fixed</option>
              </select>

              <select
                name="user"
                value={accountData.user}
                onChange={handleAccountChange}
                className="input"
              >
                <option value="">
                  {createdUser
                    ? `${createdUser.firstname} ${createdUser.lastname}`
                    : "User will appear after creation"}
                </option>
              </select>

              <input
                name="transferPin"
                placeholder="Transfer Pin"
                value={accountData.transferPin}
                onChange={handleAccountChange}
                className="input"
                required
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate("/superadmin/users")}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Go Back
            </button>

            <button
              type="submit"
              disabled={userLoading || accountLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {userLoading || accountLoading
                ? "Creating..."
                : "Create User & Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
