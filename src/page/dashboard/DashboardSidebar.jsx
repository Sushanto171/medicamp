/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { AiOutlineLogout } from "react-icons/ai";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "./../../hooks/useAdmin";
import AdminNavlink from "./admin/AdminNavlink";
import UserNavLink from "./user/UserNavLink";

const DashboardSidebar = ({ isCollapsed }) => {
  const { isAdmin } = useAdmin();
  const { user } = useAuth();
  return (
    <div
      className={`${
        isCollapsed ? "hidden sm:flex" : "flex"
      } flex-col max-w-64 w-full bg-secondary pb-3 h-[calc(100vh-80px)] sticky top-20 overflow-y-auto justify-between`}
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
      </div>

      <div className="text-left w-full px-4 py-3">
        <Button
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
