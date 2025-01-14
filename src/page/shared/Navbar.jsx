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

import React from "react";
import { Link, NavLink } from "react-router-dom";
import log from "../../assets/logo.png";
import Container from "./../../components/Container";

// profile menu component
const profileMenuItems = [
  {
    label: "User Name",
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

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="white"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-white p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
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
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
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
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export function ComplexNavbar() {
  const user = false;

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
          to="/available-camp"
        >
          Available Camp
        </NavLink>
      </li>
    </>
  );
  return (
    <Navbar className="py-4 bg-primary rounded-none text-white px-0 m-0">
      <Container>
        <div className=" w-full relative mx-auto flex items-center justify-between ">
          <div className="flex-1 flex items-center">
            {/* logo */}
            <div className="w-36 ">
              <Button variant="text" className="p-0">
                <img src={log} />
              </Button>
            </div>
            {/* navigation */}
            <ul className=" flex-1 flex justify-center items-center gap-4">
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
      </Container>
    </Navbar>
  );
}
