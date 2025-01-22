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
    <div className="">
      {/* navbar */}
      <div className="bg-primary">
        <ComplexNavbar />
      </div>
      {/* outlet */}
      <div className="min-h-[calc(100vh-280px)]">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
