/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

import toast from "react-hot-toast";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export function JoinCampModal({ campDetails, refetch }) {
  const handleOpen = () => setOpen(!open);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    age: "",
    phoneNumber: "",
    gender: "",
    emergencyContact: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      (formData.participantName = user?.displayName),
        (formData.participantEmail = user?.email),
        (formData.participantPhoto = user?.photoURL);
      formData.campID = campDetails._id;
      formData.paymentStatus = false;
      formData.confirmationStatus = "Pending";

      // save data to db
      const { data } = await axiosSecure.post(
        `/participants/${campDetails._id}`,
        formData
      );
      toast.success(data?.message);
      refetch();
      handleOpen(); // Close modal after submission
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() =>
          user ? handleOpen() : navigate("/join-us", { state: pathname })
        }
        variant="text"
        className="flex items-center gap-1 bg-secondary text-white hover:text-primary border border-b-4 border-secondary group relative pr-12 hover:bg-accent/10"
      >
        Join Camp
        <IoIosArrowRoundForward className="text-2xl group-hover:right-3 absolute right-5 transition-all" />
      </Button>

      {/* Modal */}
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="p-2 h-[80%] overflow-x-auto"
      >
        <DialogHeader className="relative">
          <Typography variant="h4" className="text-primary text-center w-full">
            Join Camp
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="p-2  bg-white shadow-md rounded-lg space-y-2"
        >
          <h3 className="text-lg font-semibold">Participant info:</h3>
          {/* Editable Fields */}
          <div className="sm:grid grid-cols-2 gap-2 ">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Participant Name
              </label>
              <input
                type="text"
                name="participantName"
                value={user?.displayName}
                readOnly
                className="w-full px-4 py-1 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Participant Email
              </label>
              <input
                type="email"
                name="participantEmail"
                value={user?.email}
                readOnly
                className="w-full px-4 py-1 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age*
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-1 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number*
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-1 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender*
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Emergency Contact*
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="w-full px-4 py-1 border rounded-md"
                required
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold">Camp info:</h3>
          {/* Read-Only Fields */}
          <div className="gap-2 sm:grid grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Camp Name
              </label>
              <input
                type="text"
                value={campDetails.campName}
                readOnly
                className="w-full px-4 py-1 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Camp Fees
              </label>
              <input
                type="text"
                value={
                  campDetails.campFees ? `$${campDetails.campFees}` : "Free"
                }
                readOnly
                className="w-full px-4 py-1 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={campDetails.location}
                readOnly
                className="w-full px-4 py-1 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Healthcare Professional
              </label>
              <input
                type="text"
                value={campDetails.healthcareProfessional}
                readOnly
                className="w-full px-4 py-1 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="submit"
              variant="text"
              className="bg-primary text-white hover:bg-primary/90"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
