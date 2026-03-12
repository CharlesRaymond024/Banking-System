
const MyAccountDashBoard = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">Welcome to Your Account</h2>

      <p className="text-gray-700 mb-4">
        Here you can manage all your account activities. You can:
      </p>

      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>View your account details including account name, number, and balance.</li>
        <li>Make transfers to other accounts.</li>
        <li>Check your transaction history.</li>
        <li>Manage joint accounts and add new users if applicable.</li>
        <li>Generate reports for your account activity.</li>
      </ul>

      <p className="mt-6 text-gray-600 italic">
        Use the tabs above to navigate between different sections of your account.
      </p>
    </div>
  );
};

export default MyAccountDashBoard;