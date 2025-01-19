/* eslint-disable react/prop-types */
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart({ chartData }) {
  const chartInfo = chartData.map((item) => ({
    name: item.campName,
    participants: item.participantCount,
    fees: item.campFees,
    feedbacks: item.totalFeedbacks,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={chartInfo}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="feedbacks"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="fees" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="participants" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
