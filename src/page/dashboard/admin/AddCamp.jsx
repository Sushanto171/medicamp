import { Button, Input, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

import { compareAsc, format } from "date-fns";
import toast from "react-hot-toast";
import { BiPlusMedical } from "react-icons/bi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "./../../../components/SectionTitle";
import TimePicker from "./../../../components/TimePicker";
import { uploadPhotoDB } from "./../../../utilities/utilities";

const AddCamp = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [formFile, setFormFile] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (camp) => {
    camp.time = time;
    // validate date
    const compareDate = compareAsc(new Date(), new Date(startDate));
    if (compareDate === 1) {
      return toast.error("The date must be in the future");
    }
    camp.date = format(new Date(startDate), "yyyy-MM-dd");
    camp.participantCount = 0;
    camp.campFees = parseInt(camp.campFees);

    try {
      setLoading(true);
      // save image to imgbb
      const url = await uploadPhotoDB(formFile);
      if (!url) return toast.error("Something error.Please try again");
      camp.image = url;

      // post on db
      const { data } = await axiosSecure.post("/camps", camp);
      toast.success(data?.message);
      reset();
      setFormFile(null);
      setImage(null);
      setImageName("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (image?.name) {
      const name = image?.name?.slice(0, 7);
      const type = image?.name?.slice(image.name.length - 3, image.name.length);
      setImageName(name + "... ." + type);
    }
  }, [image]);

  return (
    <div>
      <SectionTitle my={6} title="Create a New Camp" />
      <div className="p-4 max-w-2xl mx-auto bg-white dark:bg-background rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Camp Name */}
          <div>
            <Input
              label="Camp Name*"
              {...register("campName", { required: "Camp Name is required" })}
              placeholder="Enter camp name"
              className="w-full"
            />
            {errors.campName && (
              <p className="text-red-500 text-sm">{errors.campName.message}</p>
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
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Camp Fees */}
          <div>
            <Input
              label="Camp Fees*"
              type="number"
              {...register("campFees", { required: "Camp Fees is required" })}
              placeholder="Enter camp fees"
              className="w-full"
            />
            {errors.campFees && (
              <p className="text-red-500 text-sm">{errors.campFees.message}</p>
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
                accept="image/*"
                type="file"
                {...register("image", { required: "Image is required" })}
                className="w-full hidden"
                onChange={(e) => [
                  setImage(e.target.files[0]),
                  setFormFile(e.target.files),
                ]}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
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
                className="w-full px-2 border-primary/50 dark:bg-background  py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary "
              />
            </div>

            {/* Time */}
            <div className="relative pt-0.5 flex-1 min-w-40">
              <span className="absolute bg-white text-[11px] left-2 -top-1.5 text-gray-700 px-0.5">
                Time*
              </span>
              <TimePicker setTime={setTime} />
            </div>
          </div>

          {/* Description */}
          <div>
            <Textarea
              label="Description*"
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
          <div className="text-center">
            <Button
              type="submit"
              className="bg-primary w-full text-white hover:bg-primary/80 flex items-center justify-center"
            >
              {loading && <BiPlusMedical className="animate-spin size-4" />}
              Save Camp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCamp;
