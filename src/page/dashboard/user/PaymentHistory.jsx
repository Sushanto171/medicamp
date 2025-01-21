import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LiveSearch from "../../shared/LiveSearch";
import LoadingSpinner from "../../shared/LoadingSpinner";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/payments-history/${user?.email}`);
      return data?.data;
    },
  });
  console.log(search);
  if (isLoading || loading) return <LoadingSpinner />;
  return (
    <>
      <LiveSearch
        data={payments}
        searchKey={setSearch}
        refetch={refetch}
        keywordName={"payments"}
        placeholder="Search by camp name"
        handleLoading={setLoading}
      />
      <SectionTitle title="Payment History" my={6} />
      {payments.length <= 0 ? (
        <h3 className="text-lg font-medium text-text">No history available</h3>
      ) : (
        <div className="overflow-x-auto w-[calc(100vw-50px)] sm:w-[calc(100vw-280px)] max-w-screen-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="px-6 py-3 border-b">#</th>
                <th className="px-6 py-3 border-b">Camp Name</th>
                <th className="px-6 py-3 border-b">Camp Fees</th>
                <th className="px-6 py-3 border-b">Transaction ID</th>
                <th className="px-6 py-3 border-b">Payment Status</th>
                <th className="px-6 py-3 border-b">Confirmation Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 text-text`}
                >
                  <td className="px-6 py-4 text-center border-b">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-center border-b">
                    {payment.campName}
                  </td>
                  <td className="px-6 py-4 text-center border-b">
                    ${payment.campFees}
                  </td>
                  <td className="px-6 py-4 text-center border-b">
                    {payment.transactionID}
                  </td>
                  <td className="px-6 py-4 text-center border-b">
                    <span
                      className={`px-3 py-1 rounded ${
                        payment.paymentStatus
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {payment.paymentStatus ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center border-b">
                    <span
                      className={`px-3 py-1 rounded ${
                        payment.confirmationStatus
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.confirmationStatus ? "Confirmed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default PaymentHistory;
