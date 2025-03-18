/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaGithubAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { saveUserDataDB } from "../../utilities/utilities";

const LoginWithGithub = ({ state }) => {
  const { LoginWithGithub, setLoading } = useAuth();

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleLogin = async () => {
    try {
      const { user } = await LoginWithGithub();
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <Button
        onClick={handleLogin}
        className="flex items-center gap-2 border border-accent hover:bg-accent"
        variant="text"
      >
        <FaGithubAlt size={18} color="blue" />{" "}
        <span className="hidden sm:block">Log in with Github</span>
      </Button>
    </div>
  );
};

export default LoginWithGithub;
