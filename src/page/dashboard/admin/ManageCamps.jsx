import toast from "react-hot-toast";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle";
import useCamps from "../../../hooks/useCamps";
import LoadingSpinner from "../../shared/LoadingSpinner";
import CampUpdateModal from "./../../../components/modal/CampUpdateModal";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const ManageCamps = () => {
  const { camps, isLoading, refetch } = useCamps({ home: false });
  const axiosSecure = useAxiosSecure();
  if (isLoading) return <LoadingSpinner />;

  const sweetAlert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0B383D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await HandleDelete(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const HandleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/camp/${id}`);
      refetch();
      if (data.deletedCount > 0) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <SectionTitle my={6} title="All Camps" />
      <div className="overflow-x-auto">
        {/* Table for large screens */}
        <p className="border w-fit p-1 bg-secondary text-white rounded-t-md border-b-0 text-sm px-3">
          Total Camps: ({camps.length})
        </p>
        <table className="table-auto w-full border border-collapse border-gray-300 hidden lg:table">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left truncate">
                Camp Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Camp Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left truncate">
                Date & Time
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Location
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left truncate">
                Healthcare Professional
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    className="w-20 h-16 object-cover rounded-md"
                    alt={camp.campName + "s image"}
                    src={camp.image}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {camp.campName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {camp.date}: {camp.time}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {camp.location}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {camp.healthcareProfessional}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2 items-center ">
                  <div className="flex gap-2">
                    <CampUpdateModal refetch={refetch} camp={camp} />
                    <button
                      onClick={() => sweetAlert(camp._id)}
                      className="bg-red-400 text-white px-2 py-0.5 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Card layout for small screens */}
        <div className="lg:hidden space-y-4 w-full">
          {camps.map((camp, index) => (
            <div
              key={camp._id}
              className="border  border-gray-300 rounded p-2 shadow-md"
            >
              <div className="w-fit h-fit p-1 border rounded-md mb-2 object-top">
                <img
                  className="h-28 w-full object-cover rounded-md"
                  src={camp.image}
                  alt={camp.campName + "s photo"}
                />
              </div>
              <p className="font-bold text-lg ">
                {index + 1}. {camp.campName}
              </p>
              <p className="text-sm text-gray-600 ">
                <strong>Date & Time:</strong> {camp.date}: {camp.time}
              </p>
              <p className="text-sm text-gray-600 ">
                <strong>Location:</strong> {camp.location}
              </p>
              <p className="text-sm text-gray-600 ">
                <strong>Healthcare Professional:</strong>{" "}
                {camp.healthcareProfessional}
              </p>
              <div className="mt-4 flex space-x-2">
                <CampUpdateModal refetch={refetch} camp={camp} />
                <button
                  onClick={() => sweetAlert(camp._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageCamps;
