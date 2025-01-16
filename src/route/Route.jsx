import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import JoinUs from "../auth/joinUs/JoinUs";
import Register from "../auth/register/Register";
import MainLayout from "../layout/MainLayout";
import AvailableCamp from "../page/availableCamp/AvailableCamp";
import CampDetails from "../page/campDeatil/CampDetails";
import Error from "../page/error/Error";
import Home from "../page/home/Home";

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
        loader: async ({ params }) => {
          const { data } = await axios(
            `${import.meta.env.VITE_BASE_URL}/camp/${params.id}`
          );
          return data?.data || {};
        },
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
]);
