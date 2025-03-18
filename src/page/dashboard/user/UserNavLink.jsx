import { NavLink } from "react-router-dom";
// Import icons from react-icons
import {
  FaChartBar,
  FaClipboardList,
  FaMoneyBillWave,
  FaUserCircle,
} from "react-icons/fa";

const userNavLinks = [
  // {
  //   to: "/dashboard/analytics",
  //   icon: "FaChartBar",
  //   label: "Analytics",
  // },
  {
    to: "/dashboard/participant-profile",
    icon: "FaUserCircle",
    label: "Participant Profile",
  },
  {
    to: "/dashboard/registered-camps",
    icon: "FaClipboardList",
    label: "Registered Camps",
  },
  {
    to: "/dashboard/payment-history",
    icon: "FaMoneyBillWave",
    label: "Payment History",
  },
];

const iconMapping = {
  FaChartBar: FaChartBar,
  FaUserCircle: FaUserCircle,
  FaClipboardList: FaClipboardList,
  FaMoneyBillWave: FaMoneyBillWave,
};

const UserNavLink = () => {
  return (
    <div className="dashboard-sidebar bg-secondary p-6 shadow-lg">
      <ul className="space-y-4">
        {userNavLinks.map((link, i) => {
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

export default UserNavLink;
