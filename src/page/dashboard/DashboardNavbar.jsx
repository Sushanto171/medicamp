/* eslint-disable react/prop-types */
import { Avatar } from "@material-tailwind/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";

const DashboardNavbar = ({ setIsCollapsed, isCollapsed }) => {
  // Sidebar collapsed state

  const { user } = useAuth();

  return (
    <nav className="h-20 sticky top-0 flex justify-between bg-primary/80 z-50">
      {/* Logo */}
      <div className="flex items-center justify-center max-w-64 w-full md:border-r ">
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
            {user?.displayName}
          </h4>
        </div>
        <Avatar
          referrerPolicy="no-referrer"
          src={user?.photoURL}
          alt="avatar"
          withBorder={true}
          className="p-0.5 border-white/90"
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
