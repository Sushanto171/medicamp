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
const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const {
    data: registered = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registered", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/participant/${user?.email}`);
      return data?.data;
    },
    enabled: !!user?.email,
  });
  console.log(search);

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
        <h3 className="text-lg font-medium text-text">No data available.</h3>
      ) : (
        <div className="overflow-x-auto w-[calc(100vw-50px)] sm:w-[calc(100vw-280px)] max-w-screen-lg">
          <table className="table-auto border-collapse border border-gray-300 w-full min-w-max">
            <thead>
              <tr>
                <th className="border p-2 bg-secondary text-white">#</th>
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
                  className={`${i % 2 !== 0 ? "bg-accent/10" : ""} text-center`}
                >
                  <td className="border p-1 text-text">{i + 1}</td>
                  <td className="border p-1 text-text">
                    {camp.campName.slice(0, 25)}
                    {camp.campName.length > 24 && ".."}
                  </td>
                  <td className="border p-1 text-text">${camp.campFees}</td>
                  <td className="border p-1 text-text">
                    {camp.participantName}
                  </td>
                  <td className={` border p-1 text-text`}>
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
                  <td className="border p-1 text-text">
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
    </div>
  );
};

export default RegisteredCamps;
