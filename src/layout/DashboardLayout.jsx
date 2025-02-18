import { useState } from "react";
import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import DashboardNavbar from "../page/dashboard/DashboardNavbar";
import DashboardSidebar from "../page/dashboard/DashboardSidebar";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Sidebar collapsed state
  const handleClose = () => setIsCollapsed(!isCollapsed);
  return (
    <>
      {/* Navbar */}
      <DashboardNavbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className="flex relative">
        {/* Sidebar */}
        <DashboardSidebar handleClose={handleClose} isCollapsed={isCollapsed} />

        {/* Main Content */}
        <div className="flex-1 p-5 dark:bg-background-dark">
          {/* Your main content goes here */}
          <Container>
            <div className="dark:bg-background-dark">
              <Outlet />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
