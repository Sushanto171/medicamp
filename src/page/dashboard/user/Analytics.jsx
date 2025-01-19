import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AnalyticsOverview from "../../../components/AnalyticsOverview";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner";
import Chart from "./../../../components/Chart";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const [revenue, setRevenue] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalCamps, setTotalCamps] = useState(0);
  const [chartData, setChartData] = useState([]);

  const { data: analytics = {}, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const { data } = await axiosSecure("/analytics-overview");
      return data;
    },
  });
  useEffect(() => {
    setRevenue(analytics.revenue);
    setTotalParticipants(analytics.totalParticipants);
    setTotalCamps(analytics.totalCamps);
    setChartData(analytics.chartData);
  }, [analytics]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      {/* brief overview*/}
      <AnalyticsOverview {...{ revenue, totalParticipants, totalCamps }} />

      <Chart chartData={chartData} />
    </div>
  );
};

export default Analytics;
