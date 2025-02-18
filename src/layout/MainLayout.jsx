import { Outlet } from "react-router-dom";

import { useEffect } from "react";
import { scrollToTop } from "../utilites/utilites";
import Footer from "./../page/shared/Footer";
import { ComplexNavbar } from "./../page/shared/Navbar";

const MainLayout = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="relative">
      {/* navbar */}
      <div className="bg-primary dark:text-white  sticky top-0 z-50">
        <ComplexNavbar />
      </div>
      {/* outlet */}
      <div className="min-h-[calc(100vh-280px)] dark:bg-background-dark !dark:text-white">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
