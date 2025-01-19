/* eslint-disable react/prop-types */
import { FaCampground, FaDollarSign, FaUsers } from "react-icons/fa";

const AnalyticsOverview = ({ totalCamps, totalParticipants, revenue }) => {
  const analyticsData = [
    {
      title: "Total Camps",
      value: totalCamps,
      icon: <FaCampground className="text-4xl text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "Total Participants",
      value: totalParticipants,
      icon: <FaUsers className="text-4xl text-white" />,
      color: "bg-green-500",
    },
    {
      title: "Total Revenue",
      value: `$${revenue}`,
      icon: <FaDollarSign className="text-4xl text-white" />,
      color: "bg-yellow-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {analyticsData.map((data, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg shadow-lg text-white flex items-center ${data.color}`}
        >
          <div className="mr-4">{data.icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{data.title}</h3>
            <p className="text-3xl font-bold">{data.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsOverview;
