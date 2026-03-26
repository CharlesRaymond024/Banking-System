import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const SingleBankRevenue = () => {
  const { bank_id } = useParams();
  const { auth } = useAuth();
  const token = auth?.accessToken;

  const { data, loading } = useFetch(
    `/bank/get/revenue/bank/${bank_id}`,
    token
  );

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!data) {
    return <p className="text-center mt-10">No data</p>;
  }

  const chartData =
    data.transactions?.map((tx, index) => ({
      name: `Tx ${index + 1}`,
      amount: Number(tx.amount) || 0
    })) || [];

  const CustomDot = ({ cx, cy, payload }) => {
    let color = "red";

    if (payload.amount > 2000000) {
      color = "green";
    } else if (payload.amount >= 100000) {
      color = "yellow";
    }

    return <circle cx={cx} cy={cy} r={6} fill={color} stroke="black" />;
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">
          {data.bank} Details
        </h1>

        <div className="flex gap-10 mt-4">
          <div>
            <p className="text-gray-500">Transactions</p>
            <h2 className="text-xl font-semibold">
              {data.totalTransactions}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-xl font-semibold">
              ₦{data.totalRevenue.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="mb-4 font-semibold">Transaction Graph</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#4f46e5"
              dot={<CustomDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default SingleBankRevenue;