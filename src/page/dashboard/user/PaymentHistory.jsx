import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "../../../components/Pagination";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useIntersectionObserver from "../../../hooks/useObserve";
import LiveSearch from "../../shared/LiveSearch";
import LoadingSpinner from "../../shared/LoadingSpinner";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const { isVisible, elementRef } = useIntersectionObserver(0);

  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments", user?.email, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/payments-history/${user?.email}?search=${search}&page=${
          currentPage - 1
        }`
      );
      setTotalData(data?.totalData || 0);

      return data?.data;
    },
  });
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
          <table
            ref={elementRef}
            className={`table-auto border-collapse border border-gray-300 w-full min-w-max dark:text-gray-300 ${
              isVisible ? "animate__animated animate__lightSpeedInRight" : ""
            }`}
          >
            {" "}
            <thead className="bg-secondary text-white">
              <tr>
                <th className="px-6 py-3 border border-gray-300">#</th>
                <th className="px-6 py-3 border border-gray-300">Camp Name</th>
                <th className="px-6 py-3 border border-gray-300">Camp Fees</th>
                <th className="px-6 py-3 border border-gray-300">
                  Transaction ID
                </th>
                <th className="px-6 py-3 border border-gray-300">
                  Payment Status
                </th>
                <th className="px-6 py-3 border border-gray-300">
                  Confirmation Status
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={`${
                    index % 2 !== 0 ? "bg-accent/10" : ""
                  } hover:-translate-x-0.5 text-center`}
                >
                  <td className="border border-gray-300 dark:border-gray-800 px-4 py-2">
                    {index + 1 * currentPage * 10 - 9}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-800 px-4 py-2">
                    {payment.campName}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-800 px-4 py-2">
                    ${payment.campFees}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-800 px-4 py-2">
                    {payment.transactionID}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-800 px-4 py-2">
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
      {totalData > 10 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalData={totalData}
        />
      )}
    </>
  );
};

export default PaymentHistory;
