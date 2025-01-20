import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import "react-awesome-button/dist/styles.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiPlusMedical } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import * as yup from "yup";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../socialLogin/SocialLogin";
import SectionTitle from "./../../components/SectionTitle";
const schema = yup.object({
  password: yup.string().required("Password is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function JoinUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const captchaRef = useRef(null);
  const [isDisable, setIsDisable] = useState(true);
  const { joinNow, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = async (data) => {
    try {
      await joinNow(data.email, data.password);
      toast.success("Log in Success");
      reset();
      navigate(`${state ? state : "/"}`);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // captcha validate
  const handleCaptcha = () => {
    const captcha = captchaRef.current.value;
    if (captcha.length === 6) {
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
              label="Email*"
              color="teal"
              placeholder="Type Email.. "
              {...register("email")}
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
              label="Password*"
              color="teal"
              type="password"
              placeholder="Type password.."
              {...register("password")}
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
            type="submit"
            className={`bg-primary hover:bg-secondary mt-4 flex items-center justify-center gap-2 
              `}
          >
            {loading && <BiPlusMedical className="animate-spin size-4" />}
            Join Now
          </Button>
        </form>
        <SocialLogin state={state} />
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
