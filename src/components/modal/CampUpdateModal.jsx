/* eslint-disable react/prop-types */
import { Button, Dialog, Input, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

import { format } from "date-fns";

import toast from "react-hot-toast";
import { BiPlusMedical } from "react-icons/bi";
import SectionTitle from "../SectionTitle";
import TimePicker from "../TimePicker";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { uploadPhotoDB } from "./../../utilities/utilities";

const CampUpdateModal = ({ camp, refetch }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState(camp?.date);
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (updatedCamp) => {
    updatedCamp.time = time;
    updatedCamp.date = format(new Date(startDate), "yyyy-MM-dd");
    updatedCamp.campFees = parseInt(updatedCamp.campFees);
    try {
      setLoading(true);
      // if organizer change image then save to db or not save
      if (image) {
        const url = await uploadPhotoDB(image);
        updatedCamp.image = url;
      } else {
        updatedCamp.image = camp.image;
      }

      // finally update
      const { data } = await axiosSecure.patch(
        `/update-camp/${camp._id}`,
        updatedCamp
      );
      toast.success(data.message);
      handleOpen();
      refetch();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (image?.name) {
      const name = image?.name?.slice(0, 8);
      const type = image?.name?.slice(image.name.length - 3, image.name.length);
      setImageName(name + "... ." + type);
    }
  }, [image]);
  return (
    <>
      <Button
        onClick={handleOpen}
        className="px-3 py-0.5 rounded-sm bg-secondary/70 hover:bg-secondary/90"
      >
        Edit
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="max-h-[80%] overflow-x-auto"
      >
        <SectionTitle my={6} title="Update Camp info" />
        <div className="p-4 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Camp Name */}
            <div>
              <Input
                label="Camp Name*"
                {...register("campName", { required: "Camp Name is required" })}
                placeholder="Enter camp name"
                defaultValue={camp?.campName}
                className="w-full"
              />
              {errors.campName && (
                <p className="text-red-500 text-sm">
                  {errors.campName.message}
                </p>
              )}
            </div>

            {/* Healthcare Professional */}
            <div>
              <Input
                label="Healthcare Professional Name*"
                {...register("healthcareProfessional", {
                  required: "Healthcare Professional name is required",
                })}
                placeholder="Enter healthcare professional name"
                className="w-full"
                defaultValue={camp?.healthcareProfessional}
              />
              {errors.healthcareProfessional && (
                <p className="text-red-500 text-sm">
                  {errors.healthcareProfessional.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <Input
                label="Location*"
                {...register("location", { required: "Location is required" })}
                placeholder="Enter location"
                className="w-full"
                defaultValue={camp?.location}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Camp Fees */}
            <div>
              <Input
                label="Camp Fees*"
                {...register("campFees", { required: "Camp Fees is required" })}
                placeholder="Enter camp fees"
                className="w-full"
                defaultValue={camp?.campFees}
              />
              {errors.campFees && (
                <p className="text-red-500 text-sm">
                  {errors.campFees.message}
                </p>
              )}
            </div>

            {/* grid */}
            <div className="flex items-center flex-wrap gap-5 sm:space-y-0 justify-between">
              {/* Image */}
              <div className="flex-1 min-w-40">
                <label
                  htmlFor="image"
                  className="text-sm border w-full flex items-center text-center justify-center border-primary/50 py-2.5 rounded-md px-1 bg-accent text-primary"
                >
                  {imageName && imageName !== undefined
                    ? `${imageName} / ${(image?.size / 1024).toFixed(2)} KB`
                    : "Upload Image"}
                </label>
                <input
                  id="image"
                  type="file"
                  className="w-full hidden"
                  onChange={(e) => setImage(e.target.files)}
                />
              </div>
              {/* Date */}
              <div className="relative flex-1 min-w-40 w-full">
                <span className="absolute bg-white text-[11px] left-2 -top-2 text-gray-700 px-0.5 z-10">
                  Date*
                </span>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full px-3 border-primary/50 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary "
                />
              </div>

              {/* Time */}
              <div className="relative pt-0.5 flex-1 min-w-40">
                <span className="absolute bg-white text-[11px] left-2 -top-1.5 text-gray-700 px-0.5">
                  Time*
                </span>
                <TimePicker defaultTime={camp?.time} setTime={setTime} />
              </div>
            </div>

            {/* Description */}
            <div>
              <Textarea
                label="Description*"
                defaultValue={camp?.description}
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center flex gap-2">
              <Button
                type="submit"
                className="bg-primary w-full flex items-center justify-center text-white hover:bg-primary/80"
              >
                {loading && <BiPlusMedical className="animate-spin size-4" />}
                Submit
              </Button>
              <Button onClick={handleOpen} className="mr-1 bg-accent">
                <span>Cancel</span>
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default CampUpdateModal;
