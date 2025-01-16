import { NavLink } from "react-router-dom";
// Import icons from react-icons
import {
  FaChartBar,
  FaClipboardList,
  FaMoneyBillWave,
  FaUserCircle,
} from "react-icons/fa";

const UserNavLink = () => {
  return (
    <div className="dashboard-sidebar bg-secondary p-6 shadow-lg">
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaChartBar className="text-white mr-3" />
          <NavLink
            to="/dashboard/analytics"
            activeClassName="text-blue-300 font-semibold"
            className="text-white hover:text-blue-200 transition"
          >
            Analytics
          </NavLink>
        </li>
        <li className="flex items-center">
          <FaUserCircle className="text-white mr-3" />
          <NavLink
            to="/dashboard/participant-profile"
            activeClassName="text-blue-300 font-semibold"
            className="text-white hover:text-blue-200 transition"
          >
            Participant Profile
          </NavLink>
        </li>
        <li className="flex items-center">
          <FaClipboardList className="text-white mr-3" />
          <NavLink
            to="/dashboard/registered-camps"
            activeClassName="text-blue-300 font-semibold"
            className="text-white hover:text-blue-200 transition"
          >
            Registered Camps
          </NavLink>
        </li>
        <li className="flex items-center">
          <FaMoneyBillWave className="text-white mr-3" />
          <NavLink
            to="/dashboard/payment-history"
            activeClassName="text-blue-300 font-semibold"
            className="text-white hover:text-blue-200 transition"
          >
            Payment History
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserNavLink;
