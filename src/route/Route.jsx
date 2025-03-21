import { createBrowserRouter } from "react-router-dom";
import JoinUs from "../auth/joinUs/JoinUs";
import Register from "../auth/register/Register";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import AboutUs from "../page/AboutUs";
import AvailableCamp from "../page/availableCamp/AvailableCamp";
import CampDetails from "../page/campDeatil/CampDetails";
import CareerPage from "../page/careear/Career";
import Error from "../page/error/Error";
import Home from "../page/home/Home";
import Services from "../page/Services";
import AddCamp from "./../page/dashboard/admin/AddCamp";
import ManageCamps from "./../page/dashboard/admin/ManageCamps";
import ManageRegisteredCamps from "./../page/dashboard/admin/ManageRegisteredCamps";
import OrganizerProfile from "./../page/dashboard/admin/OrganizerProfile";
import Analytics from "./../page/dashboard/user/Analytics";
import ParticipantProfile from "./../page/dashboard/user/ParticipantProfile";
import PaymentHistory from "./../page/dashboard/user/PaymentHistory";
import RegisteredCamps from "./../page/dashboard/user/RegisteredCamps";
import AdminRoute from "./AdminRoute";
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
        path: "/career",
        element: <CareerPage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/Services",
        element: <Services />,
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
    children: [
      // organizer
      {
        path: "/dashboard/organizer-profile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <OrganizerProfile />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-registered-camps",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageRegisteredCamps />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-camp",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddCamp />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-camps",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCamps />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/analytics",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      // participant
      {
        path: "/dashboard/participant-profile",
        element: (
          <PrivateRoute>
            <ParticipantProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/registered-camps",
        element: (
          <PrivateRoute>
            <RegisteredCamps />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
