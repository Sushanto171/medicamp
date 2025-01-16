import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import AdminNavlink from "../page/dashboard/admin/AdminNavlink";
import UserNavLink from "../page/dashboard/user/UserNavLink";
const DashboardLayout = () => {
  const { isAdmin } = useAdmin();
  const { user } = useAuth();
  console.log(isAdmin);
  return (
    <>
      <div className="flex">
        {/* menu */}
        <div className="max-w-64 w-full bg-secondary pb-3 items-center h-screen sticky top-0 overflow-y-auto flex flex-col justify-between ">
          {/* heading */}
          <div className="flex  gap-3 items-end border-b py-8 border-gray-400  bg-primary/80 p-2 w-full">
            <Avatar
              referrerPolicy="no-referrer"
              src={user?.photoURL}
              alt="avatar"
              withBorder={true}
              className="p-0.5 border-white/90"
            />
            <div className="flex flex-col ">
              <span className="text-white text-sm opacity-80 leading-none">
                Welcome!
              </span>
              <h4 className="text-2xl truncate text-white leading-snug">
                {user?.displayName.split(" ")[0]}
              </h4>
            </div>
          </div>
          {/* body */}
          <div className="flex-1">
            {/* Organizer */}
            <AdminNavlink />
            {/* User */}
            <UserNavLink />
          </div>

          <Link to="/">
            <img className="w-40" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="h-[2000px]"></div>
      </div>
    </>
  );
};

export default DashboardLayout;
