import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { TiInfoLarge } from "react-icons/ti";
import Pagination from "../../../components/Pagination";
import SectionTitle from "../../../components/SectionTitle";
import LiveSearch from "../../shared/LiveSearch";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ParticipantCancel from "../../shared/ParticipantCancel";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: participants = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["participants", currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/participants?search=${search}&page=${currentPage - 1}`
      );
      setTotalData(data?.totalData);
      return data?.data;
    },
  });

  const handleConfirm = async (id) => {
    // Update confirmation status in database

    const { data } = await axiosSecure.patch(
      `/confirmation-participant/${id}`,
      {
        confirmationStatus: true,
      }
    );
    toast.success(data.message);
    refetch();
  };

  if (isLoading || loading) return <LoadingSpinner />;
  return (
    <div className="">
      <LiveSearch
        data={participants}
        refetch={refetch}
        keywordName={"participants"}
        searchKey={setSearch}
        placeholder="Search by camp name or participants name"
        handleLoading={setLoading}
      />
      <SectionTitle my={6} title="Participant Registration Table" />
      <div className="overflow-x-auto w-[calc(100vw-50px)] sm:w-[calc(100vw-280px)] max-w-screen-lg ">
        <table className="table-auto border-collapse border border-gray-300 w-full min-w-max dark:text-gray-200">
          <thead>
            <tr>
              <th className="border p-2 bg-secondary dark:border-gray-700 text-white">
                #
              </th>
              <th className="border p-2 bg-secondary dark:border-gray-700 text-white">
                Camp Name
              </th>
              <th className="border p-2 bg-secondary dark:border-gray-700 text-white">
                Camp Fees
              </th>
              <th className="border p-2 bg-secondary dark:border-gray-700 text-white">
                Participant Name
              </th>
              <th className="border p-2 bg-secondary dark:border-gray-700 text-white">
                Payment Status
              </th>
              <th className="border p-2 bg-secondary dark:border-gray-700 text-white">
                Confirmation Status
              </th>
              <th className="border p-2 bg-secondary dark:border-gray-700 text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {participants.map((camp, i) => (
              <tr
                key={camp._id}
                className={`${
                  i % 2 !== 0 ? "bg-accent/10" : ""
                } hover:-translate-x-0.5 text-center`}
              >
                <td className="border dark:border-gray-800 p-1 text-text dark:text-gray-200">
                  {i + 1 * currentPage * 10 - 9}
                </td>
                <td className="border dark:border-gray-800 p-1 text-text dark:text-gray-200">
                  {camp.campName.slice(0, 25)}
                  {camp.campName.length > 24 && ".."}
                </td>
                <td className="border dark:border-gray-800 p-1 text-text dark:text-gray-200">
                  ${camp.campFees}
                </td>
                <td
                  title={camp.participantEmail}
                  className=" p-1 text-text dark:text-gray-200 flex "
                >
                  {camp.participantName} <TiInfoLarge />
                </td>
                <td className="border dark:border-gray-800 p-1 text-text dark:text-gray-200">
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
                <td className="border dark:border-gray-800 p-1 text-text dark:text-gray-200">
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
                <td className="w-40 grid grid-cols-2 p-2">
                  <button
                    onClick={() => handleConfirm(camp._id)}
                    disabled={
                      camp.confirmationStatus || camp.paymentStatus === false
                    }
                    title={
                      (!camp.paymentStatus ? "Participant did not pay" : "") ||
                      (camp.confirmationStatus
                        ? "Participant already confirmed"
                        : "")
                    }
                    className={` py-1 rounded-sm text-white ${
                      camp.paymentStatus === false || camp.confirmationStatus
                        ? "cursor-not-allowed bg-gray-400 px-0.5"
                        : " bg-secondary/60 dark:border-gray-700 hover:bg-secondary/70 px-2"
                    }`}
                  >
                    {!camp.confirmationStatus ? (
                      "Confirm"
                    ) : (
                      <p className="text-sm">Confirmed</p>
                    )}
                  </button>
                  <ParticipantCancel
                    camp={camp}
                    refetch={refetch}
                    disabled={camp.paymentStatus && camp.confirmationStatus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      {totalData > 10 && (
        <Pagination
          data={participants}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalData={totalData}
        />
      )}
    </div>
  );
};

export default ManageRegisteredCamps;
