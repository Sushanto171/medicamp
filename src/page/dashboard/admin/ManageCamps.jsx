import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Pagination from "../../../components/Pagination";
import SectionTitle from "../../../components/SectionTitle";
import useCamps from "../../../hooks/useCamps";
import LiveSearch from "../../shared/LiveSearch";
import LoadingSpinner from "../../shared/LoadingSpinner";
import CampUpdateModal from "./../../../components/modal/CampUpdateModal";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const ManageCamps = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { camps, isLoading, refetch, totalData } = useCamps({
    home: false,
    search,
    page: currentPage - 1,
    available: false,
  });
  const axiosSecure = useAxiosSecure();

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
      const { data } = await axiosSecure.delete(`/delete-camp/${id}`);
      refetch();
      if (data.deletedCount > 0) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (loading || isLoading) return <LoadingSpinner />;
  return (
    <>
      <LiveSearch
        refetch={refetch}
        searchKey={setSearch}
        keywordName={"allCamps"}
        data={camps}
        handleLoading={setLoading}
      />
      <SectionTitle my={6} title="All Camps" />
      <div className="overflow-x-auto">
        {/* Table for large screens */}
        <div className="overflow-x-auto w-[calc(100vw-50px)] sm:w-[calc(100vw-280px)] max-w-screen-lg">
          <table className="table-auto border-collapse border border-gray-300 w-full min-w-max">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  #
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Camp Image
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Camp Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Date & Time
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Location
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
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
                      alt={`${camp.campName} image`}
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
                  <td className="border border-gray-300 px-4 py-2 space-x-2 items-center">
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
        </div>
        {/* pagination */}
        {totalData > 10 && (
          <Pagination
            totalData={totalData}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </>
  );
};

export default ManageCamps;
