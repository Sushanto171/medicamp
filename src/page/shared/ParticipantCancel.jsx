/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ParticipantCancel = ({ camp, refetch, disabled }) => {
  const axiosSecure = useAxiosSecure();
  const handleCancel = (id, campID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0b383d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(
          `/delete-participant/${id}/${campID}`
        );
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <button
      onClick={() => handleCancel(camp._id, camp.campID)}
      disabled={disabled}
      title={
        camp.confirmationStatus
          ? "Participant already confirmed"
          : disabled
          ? "Payment already made; cancellation not allowed."
          : ""
      }
      className={`ml-2 px-2 py-1   rounded-sm text-white  ${
        disabled
          ? "cursor-not-allowed bg-gray-400"
          : "bg-red-400 hover:bg-red-600"
      }`}
    >
      Cancel
    </button>
  );
};

export default ParticipantCancel;
