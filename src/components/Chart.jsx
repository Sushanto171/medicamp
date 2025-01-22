/* eslint-disable react/prop-types */
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart({ chartData = [] }) {
  const data = chartData.map((item) => ({
    name: item.campName,
    fees: item.campFees,
    feedbacks: item.totalFeedbacks,
    participants: item.participantCount,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="feedbacks" stackId="a" fill="#8884d8" />
        <Bar dataKey="participants" stackId="a" fill="#82ca9d" />
        <Bar dataKey="fees" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
}
