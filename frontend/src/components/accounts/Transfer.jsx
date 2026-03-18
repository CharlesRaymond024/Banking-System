import { useState, useEffect, useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import AuthContext from "../../providers/AuthProvider";
import TransferSuccessful from "../cards/TransferSuccessful";
import TransferDecline from "../cards/TransferDecline";

const Transfer = () => {
  const { auth } = useContext(AuthContext);

  // 🔹 STATE
  const [selectedBank, setSelectedBank] = useState("");
  const [isValidAccount, setIsValidAccount] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const [transferStatus, setTransferStatus] = useState(null); // "success" | "fail" | null
  const [transferResult, setTransferResult] = useState({
    amount: "",
    receiverName: "",
  });
  const [failMessage, setFailMessage] = useState("");

  const [formData, setFormData] = useState({
    from_acct_no: "",
    to_acct_no: "",
    amount: "",
    description: "",
    transferPin: "",
  });

  const user_id = auth?.user?.id;
  const token = auth?.accessToken;

  // 🔹 FETCHES
  const { data: accountData } = useFetch(
    user_id ? `/account/get-by-user/${user_id}` : null,
    token,
  );

  const { data: banks } = useFetch("/bank/get", token);

  const { data: bankAccounts } = useFetch(
    selectedBank ? `/account/get-by-bank/${selectedBank}` : null,
    token,
  );

  const { postData, loading } = usePost("/transaction/transfer", token);

  // 🔹 Set sender account
  useEffect(() => {
    if (accountData?.length > 0) {
      setFormData((prev) => ({
        ...prev,
        from_acct_no: accountData[0].accountNumber,
      }));
    }
  }, [accountData]);

  // 🔹 Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "to_acct_no") {
      setIsValidAccount(false);
      setReceiverName("");
      setError("");
    }
  };

  // 🔹 Reset when bank changes
  useEffect(() => {
    setIsValidAccount(false);
    setReceiverName("");
    setError("");
  }, [selectedBank]);

  // 🔹 VALIDATION
  useEffect(() => {
    if (!selectedBank || !formData.to_acct_no || !bankAccounts) return;

    if (formData.to_acct_no === formData.from_acct_no) {
      setError("You cannot transfer to your own account");
      setIsValidAccount(false);
      setReceiverName("");
      return;
    }

    setChecking(true);

    const match = bankAccounts.find(
      (acc) => acc.accountNumber === formData.to_acct_no,
    );

    if (match) {
      setIsValidAccount(true);
      setReceiverName(match.accountName);
      setError("");
    } else {
      setIsValidAccount(false);
      setReceiverName("");
      setError("Account not linked to selected bank");
    }

    setChecking(false);
  }, [selectedBank, formData.to_acct_no, formData.from_acct_no, bankAccounts]);

  // 🔹 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || !formData.from_acct_no) return;

    if (formData.to_acct_no === formData.from_acct_no) {
      setFailMessage("You cannot transfer to your own account");
      setTransferStatus("fail");
      return;
    }

    if (!isValidAccount) {
      setFailMessage("Invalid account for selected bank");
      setTransferStatus("fail");
      return;
    }

    const response = await postData({
      account: formData.from_acct_no,
      transaction_type: "transfer",
      amount: formData.amount,
      description: formData.description,
      from_acct_no: formData.from_acct_no,
      to_acct_no: formData.to_acct_no,
      user: user_id,
      transferPin: formData.transferPin,
    });

    if (response?.success) {
      setTransferResult({ amount: formData.amount, receiverName });
      setTransferStatus("success");

      // Reset form
      setFormData({
        from_acct_no: accountData?.[0]?.accountNumber || "",
        to_acct_no: "",
        amount: "",
        description: "",
        transferPin: "",
      });
      setSelectedBank("");
      setIsValidAccount(false);
      setReceiverName("");
      setError("");
    } else {
      setFailMessage(response?.message || "Transfer failed");
      setTransferStatus("fail");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-green-800">Transfer Money</h2>
          <p className="text-gray-500 text-sm mt-1">
            Send money securely to another account
          </p>
        </div>

        {/* Sender */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-6">
          <p className="text-sm text-gray-500">From Account</p>
          <p className="text-lg font-semibold text-gray-800">
            {formData.from_acct_no}
          </p>

          {accountData?.[0]?.balance && (
            <p className="text-sm text-green-600 mt-1 font-medium">
              Balance: ₦{Number(accountData[0].balance).toLocaleString()}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">-- Select Bank --</option>
            {banks?.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>

          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                name="to_acct_no"
                value={formData.to_acct_no}
                onChange={handleChange}
                disabled={checking}
                required
                placeholder="Enter recipient account number"
                className={`w-full p-3 pr-32 border rounded-lg outline-none transition
        ${error ? "border-red-500" : isValidAccount ? "border-green-500" : "border-gray-300"}
        ${checking ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
      `}
              />

              {/* Right side status inside input */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                {checking && <span className="text-gray-500">Checking...</span>}

                {!checking && error && (
                  <span className="text-red-500">Invalid</span>
                )}

                {!checking && isValidAccount && (
                  <span className="text-green-600">✔</span>
                )}
              </div>
            </div>

            {/* Receiver Name BELOW */}
            {!checking && isValidAccount && (
              <p className="mt-2 text-sm text-green-600 font-medium">
                Receiver: {receiverName}
              </p>
            )}

            {!checking && error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>
          {isValidAccount && (
            <>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
                placeholder="Amount"
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                placeholder="Description"
              />
              <input
                type="password"
                name="transferPin"
                value={formData.transferPin}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
                placeholder="Transfer PIN"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold ${
                  loading
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {loading ? "Processing..." : "Transfer Money"}
              </button>
            </>
          )}
        </form>

        {/* SUCCESS & FAIL MODALS */}
        {transferStatus === "success" && (
          <TransferSuccessful
            amount={transferResult.amount}
            receiverName={transferResult.receiverName}
            onClose={() => setTransferStatus(null)}
          />
        )}

        {transferStatus === "fail" && (
          <TransferDecline
            errorMessage={failMessage}
            onClose={() => setTransferStatus(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Transfer;
