import {
  FaClipboardList,
  FaPlusCircle,
  FaTasks,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminNavlink = () => {
  return (
    <div className="dashboard-sidebar bg-secondary  p-6 shadow-lg">
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaUserCircle className="text-white mr-3" />
          <NavLink
            to="/dashboard/organizer-profile"
            activeClassName="text-blue-300 font-semibold"
            className="text-white hover:text-blue-200 transition"
          >
            Organizer Profile
          </NavLink>
        </li>
        <li className="flex items-center">
          <FaPlusCircle className="text-white mr-3" />
          <NavLink
            to="/dashboard/add-camp"
            activeClassName="text-blue-300 font-semibold"
            className="text-white hover:text-blue-200 transition"
          >
            Add A Camp
          </NavLink>
        </li>
        <li className="flex items-center">
          <FaTasks className="text-white mr-3" />
          <NavLink
            to="/dashboard/manage-camps"
            activeClassName="text-blue-300 font-semibold"
            className="text-white hover:text-blue-200 transition"
          >
            Manage Camps
          </NavLink>
        </li>
        <li className="flex items-center">
          <FaClipboardList className="text-white mr-3" />
          <NavLink
            to="/dashboard/manage-registered-camps"
            activeClassName="text-blue-300 font-semibold"
            className="text-white hover:text-blue-200 transition"
          >
            Manage Registered Camps
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavlink;
