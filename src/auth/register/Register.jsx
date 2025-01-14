import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@material-tailwind/react";
import "react-awesome-button/dist/styles.css";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import SectionTitle from "./../../components/SectionTitle";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be 6 character or longer")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Password must include at least one uppercase letter, and one lowercase letter"
    ),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  photo: yup
    .mixed()
    .test("file-required", "Photo is required", (value) => {
      return value && value.length > 0;
    })
    .required("Photo is required"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const photo = useWatch({
    control,
    name: "photo",
  });
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="max-w-lg mx-auto h-full justify-center border border-secondary rounded-md my-8 p-8">
        <SectionTitle title="Register Now" />
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-8"
        >
          {/* name filed */}
          <div>
            <Input
              variant="standard"
              label="Name*"
              color="teal"
              placeholder="Type Name.. "
              {...register("name")}
            />
            {/* error  */}
            {errors.name && (
              <span className="text-red-400 text-xs">
                {errors.name?.message}
              </span>
            )}
          </div>
          {/* email filed */}
          <div>
            <Input
              variant="standard"
              label="Email*"
              color="teal"
              placeholder="Type Email.."
              {...register("email")}
            />
            {/* error  */}
            {errors.email && (
              <span className="text-red-400 text-xs">
                {errors?.password?.message}
              </span>
            )}
          </div>
          {/* password filed */}
          <div>
            <Input
              variant="standard"
              label="Password*"
              color="teal"
              placeholder="Type password.."
              {...register("password")}
            />
            {/* error  */}
            {errors.password && (
              <span className="text-red-400 text-xs">
                {errors?.password?.message}
              </span>
            )}
          </div>
          {/* photo filed */}
          <div className="relative mt-2">
            <Input
              accept="image/*"
              id="photo-input"
              className="hidden"
              variant="standard"
              label="Photo*"
              color="teal"
              type="file"
              {...register("photo")}
            />
            <label
              htmlFor="photo-input"
              className="absolute top-2 border-b w-full border-gray-400 hover:border-secondary focus:border-secondary"
            >
              <span className="bg-accent px-2 py-0.5 rounded-sm text-white mr-2">
                Upload
              </span>
              <span className="opacity-70">{photo && photo[0].name}</span>
            </label>
            {/* error  */}
            {errors.photo && (
              <span className="text-red-400 text-xs">
                {errors?.photo?.message}
              </span>
            )}
          </div>
          <Button type="submit" className="bg-primary hover:bg-secondary mt-4">
            Join Now
          </Button>
        </form>
      </div>
    </>
  );
}
