import { Button } from "@material-tailwind/react";
import { FaFacebookF } from "react-icons/fa";

const LoginWithFacebook = () => {
  return (
    <div className="w-full flex justify-center">
      <Button
        className="flex items-center gap-2 border border-accent hover:bg-accent"
        variant="text"
      >
        <FaFacebookF size={18} color="blue" />{" "}
        <span className="hidden sm:block">Log in with Facebook</span>
      </Button>
    </div>
  );
};

export default LoginWithFacebook;
