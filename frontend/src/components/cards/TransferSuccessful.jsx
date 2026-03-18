import { CheckCircleIcon } from "lucide-react"; // optional icon from lucide-react

const TransferSuccessful = ({ amount, receiverName, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-3xl p-8 w-96 max-w-full text-center shadow-xl border border-green-100 animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="text-green-600 w-16 h-16" />
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold text-green-700 mb-3">
          Transfer Successful
        </h2>

        {/* Message */}
        <p className="text-gray-700 mb-6 text-lg">
          ₦{Number(amount).toLocaleString()} was sent to{" "}
          <span className="font-medium">{receiverName}</span>.
        </p>

        {/* OK Button */}
        <button
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default TransferSuccessful;
