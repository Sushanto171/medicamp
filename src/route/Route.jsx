import { createBrowserRouter } from "react-router-dom";
import JoinUs from "../auth/joinUs/JoinUs";
import Register from "../auth/register/Register";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import AvailableCamp from "../page/availableCamp/AvailableCamp";
import CampDetails from "../page/campDeatil/CampDetails";
import Error from "../page/error/Error";
import Home from "../page/home/Home";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/available-camps",
        element: <AvailableCamp />,
      },
      {
        path: "/camp-details/:id",

        element: <CampDetails />,
      },
      {
        path: "/join-us",
        element: <JoinUs />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  // dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
  },
]);
