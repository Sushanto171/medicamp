import { useQuery } from "@tanstack/react-query";
import { FeedbackModal } from "../../../components/modal/FeedbackModal";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ParticipantCancel from "../../shared/ParticipantCancel";
import PayModal from "./../../../components/modal/PayModal";
import SectionTitle from "./../../../components/SectionTitle";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
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

  console.log(registered);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <SectionTitle my={6} title="Explore Registered Camps" />
      <div className="overflow-x-auto w-[calc(100vw-50px)] sm:w-[calc(100vw-280px)] max-w-screen-lg">
        <table className="table-auto border-collapse border border-gray-300 w-full min-w-max">
          <thead>
            <tr>
              <th className="border p-2 bg-secondary text-white">#</th>
              <th className="border p-2 bg-secondary text-white">Camp Name</th>
              <th className="border p-2 bg-secondary text-white">Camp Fees</th>
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
                <td className="border p-1 text-text">{camp.participantName}</td>
                <td className="border p-1 text-text">
                  {camp.paymentStatus ? "Paid" : "Unpaid"}
                </td>
                <td className="border p-1 text-text">
                  {camp.confirmationStatus ? "Confirmed" : "Pending"}
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
    </div>
  );
};

export default RegisteredCamps;
