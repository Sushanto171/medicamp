import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FeedbackModal } from "../../../components/modal/FeedbackModal";
import useAuth from "../../../hooks/useAuth";
import LiveSearch from "../../shared/LiveSearch";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ParticipantCancel from "../../shared/ParticipantCancel";
import PayModal from "./../../../components/modal/PayModal";
import SectionTitle from "./../../../components/SectionTitle";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

import useIntersectionObserver from "../../../hooks/useObserve";
import Pagination from "./../../../components/Pagination";
const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  const { isVisible, elementRef } = useIntersectionObserver(0);
  const {
    data: registered = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registered", user?.email, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/participant/${user?.email}?search=${search}&page=${currentPage - 1}`
      );
      setTotalData(data?.totalData || 0);
      return data?.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading || loading) return <LoadingSpinner />;
  return (
    <div>
      <LiveSearch
        data={registered}
        searchKey={setSearch}
        refetch={refetch}
        keywordName={"registered"}
        placeholder="Search by camp name"
        handleLoading={setLoading}
      />
      <SectionTitle my={6} title="Explore Registered Camps" />
      {registered.length <= 0 ? (
        <h3 className="text-lg font-medium  ">No data available.</h3>
      ) : (
        <div className="overflow-x-auto w-[calc(100vw-50px)] sm:w-[calc(100vw-280px)] max-w-screen-lg">
          <table
            ref={elementRef}
            className={`table-auto border-collapse border border-gray-300 w-full min-w-max dark:text-gray-300 ${
              isVisible ? "animate__animated animate__lightSpeedInRight" : ""
            }`}
          >
            <thead>
              <tr className="border p-2 bg-secondary text-white ">
                <th className="px-4">#</th>
                <th className="border p-2 bg-secondary text-white">
                  Camp Name
                </th>
                <th className="border p-2 bg-secondary text-white">
                  Camp Fees
                </th>
                <th className="border p-2 bg-secondary text-white">
                  Participant Name
                </th>
                <th className="border p-2 bg-secondary text-white">
                  Payment Status
                </th>
                <th className="border p-2 bg-secondary text-white">
                  Confirmation Status
                </th>
                <th className="border p-2 bg-secondary text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registered.map((camp, i) => (
                <tr
                  key={camp._id}
                  className={`${
                    i % 2 !== 0 ? "bg-accent/10" : ""
                  } text-center dark:text-gray-300`}
                >
                  <td className="border p-1 ">
                    {" "}
                    {i + 1 * currentPage * 10 - 9}
                  </td>
                  <td className="border p-1 ">
                    {camp.campName.slice(0, 25)}
                    {camp.campName.length > 24 && ".."}
                  </td>
                  <td className="border p-1 ">${camp.campFees}</td>
                  <td className="border p-1 ">{camp.participantName}</td>
                  <td className={` border p-1 `}>
                    <span
                      className={` px-2 py-0.5 rounded-sm ${
                        camp.paymentStatus
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {camp.paymentStatus ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="border p-1 ">
                    <span
                      className={` px-2 py-0.5 rounded-sm ${
                        camp.confirmationStatus
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {camp.confirmationStatus ? "Confirmed" : "Pending"}
                    </span>
                  </td>
                  <td className="w-40 grid grid-cols-2 p-2 border-b">
                    {/* payment modal*/}
                    <PayModal camp={camp} refetch={refetch} />
                    {!camp.confirmationStatus ? (
                      <>
                        <ParticipantCancel
                          camp={camp}
                          refetch={refetch}
                          disabled={camp.paymentStatus}
                        />
                      </>
                    ) : (
                      <>
                        {/* feedback button */}
                        <FeedbackModal camp={camp} />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {totalData > 10 && (
        <Pagination
          totalData={totalData}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default RegisteredCamps;
