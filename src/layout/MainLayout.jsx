import { Outlet } from "react-router-dom";

import Footer from "./../page/shared/Footer";
import { ComplexNavbar } from "./../page/shared/Navbar";

const MainLayout = () => {
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
