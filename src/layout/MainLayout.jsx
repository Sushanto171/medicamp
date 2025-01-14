import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      {/* navbar */}
      {/* outlet */}
      <Outlet />
      {/* footer */}
    </div>
  );
};

export default MainLayout;
