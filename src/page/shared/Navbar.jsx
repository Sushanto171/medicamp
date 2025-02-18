import {
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import "./navbar.css";

import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import log from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import { scrollToTop } from "../../utilites/utilites";
import Container from "./../../components/Container";
import LoadingSpinner from "./LoadingSpinner";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOutUser, setDark, dark } = useAuth();
  const navigate = useNavigate();
  // profile menu component
  const profileMenuItems = [
    {
      label: user?.displayName,
      icon: UserCircleIcon,
    },
    {
      label: "Dashboard",
      icon: Cog6ToothIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <label title="Theme" className="switch mr-1">
        <input onClick={() => setDark(!dark)} type="checkbox" />
        <span className="dark"></span>
      </label>

      <MenuHandler>
        <Button
          variant="text"
          color="white"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            title="Menu"
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-white p-0.5"
            referrerPolicy="no-referrer"
            src={
              user?.photoURL ||
              "https://img.icons8.com/?size=100&id=20750&format=png&color=000000"
            }
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {/* mobile link */}
        <ul className="px-4 border-b-2 border-accent flex flex-col mb-4 gap-3 py-4 sm:hidden">
          <li className="w-full">
            <NavLink
              className={({ isActive }) => `${isActive ? "underline" : ""} `}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to="/available-camps"
            >
              Available Camps
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to="/career"
            >
              Career
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to="/about-us"
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to="/services"
            >
              Services
            </NavLink>
          </li>
        </ul>
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          const isMiddleItem = key === 1;
          const isFirstItem = key === 0;

          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                onClick={() =>
                  isLastItem
                    ? signOutUser()
                    : isMiddleItem
                    ? navigate("/dashboard")
                    : () => {}
                }
                as="span"
                variant="small"
                className={`${
                  isFirstItem ? "cursor-default" : ""
                } font-normal w-full`}
                color={`${isLastItem ? "red" : "inherit"}`}
              >
                {label || "Anonymous user"}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export function ComplexNavbar() {
  const { user, loading } = useAuth();
  useEffect(() => {
    scrollToTop();
  }, []);
  const navLink = (
    <>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/available-camps"
        >
          Available Camps
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/career"
        >
          Career
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/about-us"
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/services"
        >
          Services
        </NavLink>
      </li>
    </>
  );
  if (loading) return <LoadingSpinner auth={false} />;
  return (
    <Container>
      <Navbar className="py-4 bg-primary rounded-none text-white px-0 m-0 w-full border-0 shadow-none">
        <div className=" w-full relative mx-auto flex items-center justify-between ">
          <div className="flex-1 flex items-center">
            {/* logo */}
            <div className="w-36 ">
              <Link to="/">
                <Button variant="text" className="p-0">
                  <img src={log} />
                </Button>
              </Link>
            </div>
            {/* navigation */}
            <ul className="hidden  flex-1 sm:flex justify-center items-center gap-4">
              {navLink}
            </ul>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <ProfileMenu />
              </>
            ) : (
              <>
                <Link to="/join-us">
                  <Button
                    size="sm"
                    className="text-black border border-white hover:bg-[#135D66]  bg-accent px-2 text-sm "
                  >
                    <span>Join Us</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Navbar>
    </Container>
  );
}
