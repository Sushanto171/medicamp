import {
  FaClipboardList,
  FaPlusCircle,
  FaTasks,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
const navLinks = [
  {
    to: "/dashboard/organizer-profile",
    icon: "FaUserCircle", // Use icon name as a string
    label: "Organizer Profile",
  },
  {
    to: "/dashboard/add-camp",
    icon: "FaPlusCircle",
    label: "Add A Camp",
  },
  {
    to: "/dashboard/manage-camps",
    icon: "FaTasks",
    label: "Manage Camps",
  },
  {
    to: "/dashboard/manage-registered-camps",
    icon: "FaClipboardList",
    label: "Manage Registered Camps",
  },
];

const iconMapping = {
  FaUserCircle: FaUserCircle,
  FaPlusCircle: FaPlusCircle,
  FaTasks: FaTasks,
  FaClipboardList: FaClipboardList,
};
const AdminNavlink = () => {
  return (
    <div className="dashboard-sidebar bg-secondary  p-6 shadow-lg">
      <ul className="space-y-4">
        {navLinks.map((link, i) => {
          const Icon = iconMapping[link.icon];
          return (
            <li key={i}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-300" : "text-white"
                  } hover:text-blue-200 transition flex items-center`
                }
              >
                <Icon className=" mr-3" />
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminNavlink;
