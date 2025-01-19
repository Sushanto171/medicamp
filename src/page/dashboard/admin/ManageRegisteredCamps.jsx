import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TiInfoLarge } from "react-icons/ti";
import SectionTitle from "../../../components/SectionTitle";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ParticipantCancel from "../../shared/ParticipantCancel";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: participants = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => {
      const { data } = await axiosSecure("/participants");
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

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="">
      <SectionTitle my={6} title="Participant Registration Table" />
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
            {participants.map((camp, i) => (
              <tr
                key={camp._id}
                className={`${i % 2 !== 0 ? "bg-accent/10" : ""}  text-center`}
              >
                <td className="border p-1 text-text">{i + 1}</td>
                <td className="border p-1 text-text">
                  {camp.campName.slice(0, 25)}
                  {camp.campName.length > 24 && ".."}
                </td>
                <td className="border p-1 text-text">${camp.campFees}</td>
                <td
                  title={camp.participantEmail}
                  className="border p-1 text-text flex "
                >
                  {camp.participantName} <TiInfoLarge />
                </td>
                <td className="border p-1 text-text">
                  {camp.paymentStatus ? "Paid" : "Unpaid"}
                </td>
                <td className="border p-1 text-text">
                  {camp.confirmationStatus ? "Confirmed" : "Pending"}
                </td>
                <td className="w-40 grid grid-cols-2 p-2">
                  <button
                    onClick={() => handleConfirm(camp._id)}
                    disabled={
                      camp.confirmationStatus || camp.paymentStatus === false
                    }
                    title={
                      (!camp.paymentStatus && "Participant did not pay") ||
                      (camp.confirmationStatus &&
                        "Participant already confirmed")
                    }
                    className={` py-1   rounded-sm text-white ${
                      camp.paymentStatus === false || camp.confirmationStatus
                        ? "cursor-not-allowed bg-gray-400 px-0.5"
                        : " bg-secondary/60 hover:bg-secondary/70 px-2"
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
    </div>
  );
};

export default ManageRegisteredCamps;
