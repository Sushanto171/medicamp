import { Outlet } from "react-router-dom";
import { FooterWithLogo } from "../page/shared/Footer";
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
      <FooterWithLogo />
    </div>
  );
};

export default MainLayout;
