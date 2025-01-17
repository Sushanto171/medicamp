import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../page/dashboard/DashboardNavbar";
import DashboardSidebar from "../page/dashboard/DashboardSidebar";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar collapsed state

  return (
    <>
      {/* Navbar */}
      <DashboardNavbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar isCollapsed={isCollapsed} />

        {/* Main Content */}
        <div className="flex-1 h-[2000px] p-5">
          {/* Your main content goes here */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
