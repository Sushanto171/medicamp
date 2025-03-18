/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { saveUserDataDB } from "../../utilities/utilities";

const LoginWithGoogle = ({ state }) => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleLogin = async () => {
    try {
      const { user } = await loginWithGoogle();
      toast.success("User has login");
      navigate(`${state ? state : "/"}`);
      const userData = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        role: "user",
      };
      await saveUserDataDB(userData, axiosPublic);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full text-center flex justify-center items-center">
      <Button
        onClick={handleLogin}
        className="flex items-center gap-2 border border-accent hover:bg-accent"
        variant="text"
      >
        <FcGoogle size={20} />
        <span className="hidden sm:block"> Log in with Google</span>
      </Button>
    </div>
  );
};

export default LoginWithGoogle;
