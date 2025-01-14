import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AvailableCamp from "../page/availableCamp/AvailableCamp";
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
        path: "/available-camp",
        element: <AvailableCamp />,
      },
    ],
  },
]);
