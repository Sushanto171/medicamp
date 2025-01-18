/* eslint-disable react/prop-types */
import { Avatar } from "@material-tailwind/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";

const DashboardNavbar = ({ setIsCollapsed, isCollapsed }) => {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAdmin();

  const { user, loading } = useAuth();
  const handleAvatar = () => {
    if (isAdmin) {
      navigate("/dashboard/organizer-profile");
    }
    if (!isAdmin && user) {
      navigate("/dashboard/participant-profile");
    }
  };
  if (loading || isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <nav className="h-20 sticky top-0 flex justify-between bg-primary/80 z-50 backdrop-blur-lg">
      {/* Logo */}
      <div className="flex items-center justify-center max-w-64 w-full  ">
        <Link to="/">
          <img className="w-40" src={logo} alt="logo" />
        </Link>
      </div>
      {/* Heading */}
      <div className="flex gap-3 items-end border-b h-full border-gray-400 p-2 pr-10">
        <div className="flex flex-col">
          <span className="text-white text-sm opacity-80 leading-none text-right">
            Welcome!
          </span>
          <h4 className="sm:text-xl truncate text-white leading-snug">
            {user?.displayName || "Anonymous"}
          </h4>
        </div>
        <Avatar
          onClick={handleAvatar}
          referrerPolicy="no-referrer"
          src={
            user?.photoURL ||
            "https://img.icons8.com/?size=100&id=20750&format=png&color=000000"
          }
          alt="avatar"
          withBorder={true}
          className="p-0.5 border-white/90 cursor-pointer"
        />
      </div>
      {/* Sidebar toggle button */}
      <button
        className="sm:hidden p-3 text-white"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <AiOutlineMenu size={24} />
        ) : (
          <AiOutlineClose size={24} />
        )}
      </button>
    </nav>
  );
};

export default DashboardNavbar;
