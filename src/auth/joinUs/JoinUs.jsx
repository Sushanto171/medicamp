import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import "react-awesome-button/dist/styles.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import * as yup from "yup";
import SectionTitle from "./../../components/SectionTitle";
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function JoinUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const captchaRef = useRef(null);
  const [isDisable, setIsDisable] = useState(true);

  const onSubmit = (data) => {
    toast.success(data);
  };

  // captcha validate
  const handleCaptcha = () => {
    const captcha = captchaRef.current.value;
    if (captcha.length === 6) {
      console.log(captcha);
      if (validateCaptcha(captcha) === true) {
        loadCaptchaEnginge(6);
        setIsDisable(false);
        captchaRef.current.value = "";
      } else {
        toast.error("Captcha Does Not Match");
        captchaRef.current.value = "";
        setIsDisable(true);
      }
    }
  };
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [captchaRef]);

  return (
    <>
      <div className="max-w-lg mx-auto h-full justify-center border border-secondary rounded-md my-8 p-8">
        <SectionTitle title="Join Now" />
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
            {/* name relate error  */}
            {errors.name && (
              <span className="text-red-400 text-xs">Name is required</span>
            )}
          </div>
          <div>
            {/*email filed*/}
            <Input
              variant="standard"
              label="Email*"
              color="teal"
              placeholder="Type Email.."
              {...register("email")}
            />
            {/* email related error */}
            {errors.email && (
              <span className="text-red-400 text-xs">Email is required</span>
            )}
          </div>
          {/* captcha */}
          <div className="">
            <LoadCanvasTemplate />
          </div>
          <div className="w-full">
            <Input
              inputRef={captchaRef}
              placeholder="Enter Captcha Value"
              color="teal"
              variant="standard"
              label="Captcha*"
              onChange={handleCaptcha}
            />
          </div>

          <Button
            disabled={isDisable}
            type="submit"
            className={`bg-primary hover:bg-secondary mt-4 ${
              isDisable ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Join Now
          </Button>
        </form>
        <p className="text-sm mt-2 opacity-70">
          Not have an account?{" "}
          <Link to="/register" className="border-b border-secondary">
            Register
          </Link>
        </p>
      </div>
    </>
  );
}
