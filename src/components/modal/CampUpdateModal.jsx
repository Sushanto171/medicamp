import {
  Button,
  Dialog,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

import { format } from "date-fns";
import SectionTitle from "../SectionTitle";
import TimePicker from "../TimePicker";

const CampUpdateModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.time = time;
    data.data = format(new Date(startDate), "yyyy-MM-dd");
    console.log(data);
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
        <SectionTitle title="Update Camp info" />
        <div className="p-4 max-w-2xl mx-auto">
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
                  {...register("image", { required: "Image is required" })}
                  className="w-full hidden"
                  onChange={(e) => setImage(e.target.files[0])}
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
                  className="w-full border-primary/50 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary "
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
                className="bg-primary w-full text-white hover:bg-primary/80"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CampUpdateModal;
