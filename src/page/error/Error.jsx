import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Oops! Page Not Found</p>
      <p className="text-lg mt-2 text-center">
        The page you&lsquo;re looking for doesn&lsquo;t exist.
      </p>
      <Button className="border bg-primary  mt-6" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </div>
  );
};

export default Error;
