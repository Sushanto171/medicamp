/* eslint-disable react/prop-types */
import { Avatar } from "@material-tailwind/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { NotificationsMenu } from "../../components/Notification";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";

const DashboardNavbar = ({ setIsCollapsed, isCollapsed }) => {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAdmin();

  const { user, loading, dark, setDark } = useAuth();
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
    <nav className="h-20 sticky top-0 flex justify-end sm:justify-between bg-primary/80 z-50 backdrop-blur-lg ">
      {/* Logo */}
      <div className=" items-center justify-center max-w-64 w-full hidden sm:flex ">
        <Link to="/">
          <img className="w-40" src={logo} alt="logo" />
        </Link>
      </div>

      {/* Heading */}
      <div className="flex gap-3 items-center h-full p-2 pr-10">
        <div title="Theme" className="hidden sm:block">
          <label className="switch scale-75 mb-0 mt-2 ">
            <input onClick={() => setDark(!dark)} type="checkbox" />
            <span className="dark"></span>
          </label>
        </div>
        {/* notification */}
        <div title="Notification" className="hidden sm:block">
          <NotificationsMenu />
        </div>
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
          title="Profile"
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
