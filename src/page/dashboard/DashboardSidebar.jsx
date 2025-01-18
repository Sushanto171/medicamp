/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";
import { AiFillProduct, AiOutlineLogout } from "react-icons/ai";
import { FcHome } from "react-icons/fc";
import { IoSettings } from "react-icons/io5";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "./../../hooks/useAdmin";
import AdminNavlink from "./admin/AdminNavlink";

import LoadingSpinner from "./../shared/LoadingSpinner";
import UserNavLink from "./user/UserNavLink";

const DashboardSidebar = ({ isCollapsed }) => {
  const { isAdmin, isLoading } = useAdmin();
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAdmin) {
      navigate("/dashboard/manage-camps");
    }
    if (!isAdmin && user) {
      navigate("/dashboard/analytics");
    }
  }, [isAdmin, user, navigate]);

  if (isLoading || loading) return <LoadingSpinner />;
  return (
    <div
      className={`${
        isCollapsed ? "hidden sm:flex" : "flex"
      } flex-col max-w-64 w-full bg-secondary pb-3 h-[calc(100vh-80px)] fixed sm:sticky sm:top-20 overflow-y-auto justify-between z-20`}
    >
      <div className="flex-1">
        {isAdmin && user ? (
          <>
            <AdminNavlink />
          </>
        ) : user ? (
          <UserNavLink />
        ) : (
          <Navigate to="/" />
        )}
        <div className="px-6">
          <ul className="flex flex-col gap-2 my-6">
            <li>
              <NavLink
                to={"/"}
                className={`flex items-center gap-3 font-medium text-white/80`}
              >
                <FcHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/available-camps"}
                className={`flex items-center gap-3 font-medium text-white/80`}
              >
                <AiFillProduct />
                Available Camps
              </NavLink>
            </li>
            <li>
              <button
                title="Under Development"
                disabled
                className={`flex items-center gap-3 font-medium text-white/80 cursor-not-allowed `}
              >
                <IoSettings />
                Setting
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-left w-full px-4 py-3">
        <Button
          onClick={signOutUser}
          variant={"text"}
          className="flex items-center gap-3 font-medium text-md border border-transparent text-red-300 w-full bg-primary/60 hover:bg-primary hover:border-accent"
        >
          <AiOutlineLogout /> Sign out
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
