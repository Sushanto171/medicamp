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
import { scrollToTop } from "../../utilities/utilities";
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
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const captchaRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [isDisable, setIsDisable] = useState(true);
  const { joinNow, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [credentialShow, setCredentialShow] = useState(false);
  const [autoForm, setAutoForm] = useState({
    email: "",
    password: "",
  });

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

  useEffect(() => {
    scrollToTop();
    setTimeout(() => {
      setCredentialShow(true);
    }, 1000);
  }, []);

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

  useEffect(() => {
    if (autoForm.email && autoForm.password) {
      setValue("email", autoForm.email);
      setValue("password", autoForm.password);
    }
  }, [autoForm, setValue]);
  return (
    <>
      {/* popup */}
      <div className="flex justify-center">
        <div
          className={`w-6/12 min-w-fit mx-auto h-40 bg-accent-dark fixed z-50 transition-all duration-1000 rounded-b-lg shadow-2xl px-10 ${
            credentialShow ? "top-0" : "-top-[200px]"
          } `}
        >
          <h4 className="text-center text-2xl text-white font-medium mt-4">
            Auto Credentials
          </h4>

          <div className="flex justify-center items-center gap-5 my-4">
            <button
              onClick={() =>
                setAutoForm({
                  email: "info@medicamp.com",
                  password: "123Ab@",
                })
              }
              className="px-4 py-2 text-white shadow-md bg-primary rounded-md"
            >
              Organizer
            </button>
            <button
              onClick={() =>
                setAutoForm({
                  email: "joystick.query@gmail.com",
                  password: "123Ab@",
                })
              }
              className="px-4 py-2 text-white shadow-md bg-primary rounded-md"
            >
              Participant
            </button>
          </div>
          <div className="text-right ">
            <button
              className="btn h-2 block right-0 "
              onClick={() => setCredentialShow(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-lg mx-auto h-full justify-center border border-secondary rounded-md my-8 p-8">
        <SectionTitle title="Join Now" className="flex-none" />
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
            {/* email relate error  */}
            {errors.email && (
              <span className="text-red-400 text-xs">Email is required</span>
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
            {/* password related error */}
            {errors.password && (
              <span className="text-red-400 text-xs">Password is required</span>
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
